import paramiko

host = '5.78.140.232'
username = 'root'
password = 'cva4ssuHmUbr9dspAAhx1'

def read_config():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(hostname=host, username=username, password=password)
        stdin, stdout, stderr = client.exec_command("cat /etc/nginx/sites-available/mindseed")
        print(stdout.read().decode('utf-8'))
        print("ERR:", stderr.read().decode('utf-8'))
    except Exception as e:
        print(f"Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    read_config()
