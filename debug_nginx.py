import paramiko
import sys

# VPS Details
host = '5.78.140.232'
username = 'root'
password = 'cva4ssuHmUbr9dspAAhx1'

def run_debug():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(hostname=host, username=username, password=password)
        commands = [
            "nginx -t",
            "ls -la /etc/nginx/sites-enabled/",
            "ls -la /var/www/mindseed/mindseed-laravel/public/",
            "systemctl status nginx --no-pager"
        ]
        for cmd in commands:
            print(f"\\n--- RUNNING: {cmd} ---")
            stdin, stdout, stderr = client.exec_command(cmd)
            print("STDOUT:", stdout.read().decode('utf-8'))
            print("STDERR:", stderr.read().decode('utf-8'))
    except Exception as e:
        print(f"Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    run_debug()
