import paramiko

host = '5.78.140.232'
username = 'root'
password = 'cva4ssuHmUbr9dspAAhx1'

def read_logs():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(hostname=host, username=username, password=password)
        commands = [
            "tail -n 20 /var/log/nginx/error.log",
            "tail -n 20 /var/log/nginx/access.log",
            "ls -la /var/run/php/"
        ]
        for cmd in commands:
            print(f"\\n--- {cmd} ---")
            stdin, stdout, stderr = client.exec_command(cmd)
            print(stdout.read().decode('utf-8'))
            err = stderr.read().decode('utf-8')
            if err:
                print("ERR:", err)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    read_logs()
