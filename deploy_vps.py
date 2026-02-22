import paramiko
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

ip = "5.78.140.232"
username = "root"
password = "cva4ssuHmUbr9dspAAhx1"

commands = [
    "apt-get update && apt-get install -y php-cli php-fpm php-sqlite3 php-mbstring php-xml php-curl unzip curl fail2ban",
    "systemctl enable fail2ban && systemctl start fail2ban",
    "if ! command -v composer &> /dev/null; then curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer; fi",
    "git config --global --add safe.directory /var/www/mindseed",
    "cd /var/www/mindseed && git pull origin main",
    "cd /var/www/mindseed/mindseed-laravel && if [ ! -f .env ]; then cp .env.example .env && sed -i 's/DB_CONNECTION=mysql/DB_CONNECTION=sqlite/' .env && touch database/database.sqlite; fi",
    "cd /var/www/mindseed/mindseed-laravel && export COMPOSER_ALLOW_SUPERUSER=1 && composer require barryvdh/laravel-dompdf",
    "cd /var/www/mindseed/mindseed-laravel && export COMPOSER_ALLOW_SUPERUSER=1 && composer install --no-interaction --prefer-dist --optimize-autoloader",
    "cd /var/www/mindseed/mindseed-laravel && php artisan key:generate --force",
    "cd /var/www/mindseed/mindseed-laravel && php artisan migrate:fresh --seed --force",
    "cd /var/www/mindseed/mindseed-laravel && npm install --legacy-peer-deps",
    "cd /var/www/mindseed/mindseed-laravel && npm run build",
    "chown -R www-data:www-data /var/www/mindseed",
    "chmod -R 775 /var/www/mindseed/mindseed-laravel/storage /var/www/mindseed/mindseed-laravel/bootstrap/cache",
    "if [ ! -f /etc/nginx/sites-available/mindseed ]; then printf 'server {\\n    listen 80;\\n    server_name vps;\\n    root /var/www/mindseed/mindseed-laravel/public;\\n    index index.php index.html index.htm;\\n    \\n    location / {\\n        try_files $uri $uri/ /index.php?$query_string;\\n    }\\n\\n    location ~ \\\\.php$ {\\n        include snippets/fastcgi-php.conf;\\n        fastcgi_pass unix:/var/run/php/php-fpm.sock;\\n        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;\\n        include fastcgi_params;\\n    }\\n}\\n' > /etc/nginx/sites-available/mindseed; fi",
    "ln -sf /etc/nginx/sites-available/mindseed /etc/nginx/sites-enabled/ && rm -f /etc/nginx/sites-enabled/default",
    "systemctl restart nginx"
]

try:
    print(f"Deploying Laravel to VPS {ip}...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(ip, username=username, password=password, timeout=10)
    
    for cmd in commands:
        print(f"\\n--- RUNNING: {cmd} ---")
        stdin, stdout, stderr = ssh.exec_command(cmd)
        exit_status = stdout.channel.recv_exit_status()
        
        out = stdout.read().decode('utf-8', errors='replace').strip()
        err = stderr.read().decode('utf-8', errors='replace').strip()
        
        if out: print(out)
        if err: print(f"STDERR: {err}")
        
        if exit_status != 0:
            print(f"Command failed with exit status {exit_status}")
            sys.exit(1)

    ssh.close()
    print("\\nDeploy finished successfully!")
except Exception as e:
    print(f"Connection failed: {e}")
    sys.exit(1)
