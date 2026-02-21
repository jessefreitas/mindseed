import paramiko
import sys

ip = "5.78.140.232"
username = "root"
password = "cva4ssuHmUbr9dspAAhx1"
domain = "mindseed.omniforge.com.br"
email = "jesse.vieira.freitas@gmail.com"

nginx_conf = f"""
server {{
    listen 80;
    server_name {domain};

    location / {{
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }}
}}
"""

commands = [
    # Clone or pull repo
    "if [ ! -d '/var/www/mindseed' ]; then git clone https://github.com/jessefreitas/mindseed.git /var/www/mindseed; else cd /var/www/mindseed && git pull origin main; fi",
    
    # Install deps and build
    "cd /var/www/mindseed && npm install",
    "cd /var/www/mindseed && npm run build",
    
    # Stop existing pm2 and start anew
    "pm2 delete mindseed || true",
    "cd /var/www/mindseed && pm2 start npm --name 'mindseed' -- start",
    "pm2 save",
    
    # Configure Nginx
    f"cat << 'EOF' > /etc/nginx/sites-available/mindseed\n{nginx_conf}\nEOF",
    "ln -sf /etc/nginx/sites-available/mindseed /etc/nginx/sites-enabled/",
    "rm -f /etc/nginx/sites-enabled/default",
    "nginx -t",
    "systemctl restart nginx",
    
    # Run Certbot SSL
    f"certbot --nginx -d {domain} --non-interactive --agree-tos -m {email} --redirect"
]

try:
    print(f"Connecting to {ip} for Deploy...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(ip, username=username, password=password, timeout=10)
    
    for cmd in commands:
        print(f"Executing: {cmd}")
        stdin, stdout, stderr = ssh.exec_command(cmd)
        
        exit_status = stdout.channel.recv_exit_status()
        output = stdout.read().decode('utf-8', errors='replace')
        error = stderr.read().decode('utf-8', errors='replace')
        
        if output:
            print(output.strip().encode(sys.stdout.encoding, errors='replace').decode(sys.stdout.encoding))
        if error:
            print(f"ERROR/WARN: {error.strip().encode(sys.stdout.encoding, errors='replace').decode(sys.stdout.encoding)}")
            
        if exit_status != 0:
            print(f"Command failed with exit status {exit_status}")
            
    ssh.close()
    print("\nVPS Deployment and SSL Setup Completed.")
except Exception as e:
    print(f"Deploy failed: {e}")
    sys.exit(1)
