import paramiko
import sys

ip = "5.78.140.232"
username = "root"
password = "cva4ssuHmUbr9dspAAhx1"

commands = [
    "pm2 status",
    "pm2 logs mindseed-webhook --lines 20 --nostream",
    "cat /var/www/webhook/server.js"
]

try:
    print(f"Buscando logs na VPS {ip}...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(ip, username=username, password=password, timeout=10)
    
    for cmd in commands:
        print(f"\n--- Output de: {cmd} ---")
        stdin, stdout, stderr = ssh.exec_command(cmd)
        
        output = stdout.read().decode('utf-8', errors='replace').strip()
        error = stderr.read().decode('utf-8', errors='replace').strip()
        
        if output:
            print(output.encode(sys.stdout.encoding, errors='replace').decode(sys.stdout.encoding))
        if error:
            print(f"ERROR/WARN: {error.encode(sys.stdout.encoding, errors='replace').decode(sys.stdout.encoding)}")
            
    ssh.close()
except Exception as e:
    print(f"Falha: {e}")
    sys.exit(1)
