import paramiko
import sys
import time

ip = "5.78.140.232"
username = "root"
password = "cva4ssuHmUbr9dspAAhx1"

commands = [
    # Update and install basic tools
    "apt-get update && apt-get install -y curl git nginx python3-certbot-nginx",
    
    # Install Node.js v20
    "curl -fsSL https://deb.nodesource.com/setup_20.x | bash -",
    "apt-get install -y nodejs",
    
    # Install PM2 globally
    "npm install -g pm2",
    
    # Verify installations
    "node -v",
    "npm -v",
    "nginx -v",
    "pm2 -v"
]

try:
    print(f"Connecting to {ip}...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(ip, username=username, password=password, timeout=10)
    print("Connection successful! Running setup commands...\n")
    
    for cmd in commands:
        print(f"Executing: {cmd}")
        stdin, stdout, stderr = ssh.exec_command(cmd)
        
        # Wait for command to finish and print output
        exit_status = stdout.channel.recv_exit_status()
        output = stdout.read().decode('utf-8')
        error = stderr.read().decode('utf-8')
        
        if output:
            print(output.strip().encode(sys.stdout.encoding, errors='replace').decode(sys.stdout.encoding))
        if error:
            print(f"ERROR/WARN: {error.strip().encode(sys.stdout.encoding, errors='replace').decode(sys.stdout.encoding)}")
            
        if exit_status != 0:
            print(f"Command failed with exit status {exit_status}")
            
    ssh.close()
    print("\nVPS Initial Setup Completed.")
except Exception as e:
    print(f"Connection failed: {e}")
    sys.exit(1)
