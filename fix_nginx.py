import paramiko

# VPS Details
host = '5.78.140.232'
username = 'root'
password = 'cva4ssuHmUbr9dspAAhx1'

nginx_conf = """server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    root /var/www/mindseed/mindseed-laravel/public;
    index index.php index.html index.htm;
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \\.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
"""

def fix_nginx():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(hostname=host, username=username, password=password)
        
        # Write new config
        command = f"cat << 'EOF' > /etc/nginx/sites-available/mindseed\\n{nginx_conf}\\nEOF"
        client.exec_command(command)
        
        # Test and reload
        commands = [
            "nginx -t",
            "systemctl restart nginx"
        ]
        for cmd in commands:
            stdin, stdout, stderr = client.exec_command(cmd)
            stdout.channel.recv_exit_status()
            
        print("Nginx updated to default_server and restarted.")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    fix_nginx()
