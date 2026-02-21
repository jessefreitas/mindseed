import paramiko
import sys

ip = "5.78.140.232"
username = "root"
password = "cva4ssuHmUbr9dspAAhx1"

try:
    print(f"Connecting to {ip}...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(ip, username=username, password=password, timeout=10)
    print("Connection successful!")
    
    stdin, stdout, stderr = ssh.exec_command("uname -a && uptime")
    output = stdout.read().decode('utf-8')
    error = stderr.read().decode('utf-8')
    
    print("\n[Output]")
    print(output.strip())
    
    if error:
        print("\n[Error]")
        print(error.strip())
        
    ssh.close()
    sys.exit(0)
except Exception as e:
    print(f"Connection failed: {e}")
    sys.exit(1)
