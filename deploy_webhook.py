import paramiko
import sys

ip = "5.78.140.232"
username = "root"
password = "cva4ssuHmUbr9dspAAhx1"

webhook_js = """
const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

const SECRET = 'mindseed_secreto_123';
const PORT = 9000;

http.createServer((req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        let sig = "sha256=" + crypto.createHmac('sha256', SECRET).update(body).digest('hex');
        if (req.headers['x-hub-signature-256'] === sig) {
            console.log("Recebido Webhook válido. Atualizando sistema...");
            exec('cd /var/www/mindseed && git pull origin main && npm install && npm run build && pm2 restart mindseed', (err, stdout, stderr) => {
                if (err) console.error(err);
                console.log(stdout);
            });
            res.writeHead(200);
            res.end('OK');
        } else {
            console.log("Assinatura inválida!");
            res.writeHead(403);
            res.end('Forbidden');
        }
    });
}).listen(PORT, () => console.log('Webhook running on port ' + PORT));
"""

commands = [
    "mkdir -p /var/www/webhook",
    "cat << 'EOF' > /var/www/webhook/server.js\n" + webhook_js + "\nEOF",
    "cd /var/www/webhook && pm2 delete mindseed-webhook || true",
    "cd /var/www/webhook && pm2 start server.js --name 'mindseed-webhook'",
    "pm2 save",
    
    # Injetando a rota /webhook no arquivo do nginx 
    # sem quebrar a configuração do Certbot (procura location / e insere antes)
    "grep -q '/webhook' /etc/nginx/sites-available/mindseed || sed -i '/location \/ {/i \\    location /webhook {\\n        proxy_pass http://localhost:9000;\\n    }\\n' /etc/nginx/sites-available/mindseed",
    "nginx -t",
    "systemctl restart nginx"
]

try:
    print(f"Instalando Webhook na VPS {ip}...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(ip, username=username, password=password, timeout=10)
    
    for cmd in commands:
        print(f"Executando: {cmd}")
        stdin, stdout, stderr = ssh.exec_command(cmd)
        
        exit_status = stdout.channel.recv_exit_status()
        output = stdout.read().decode('utf-8', errors='replace').strip()
        error = stderr.read().decode('utf-8', errors='replace').strip()
        
        if output:
            print(output.encode(sys.stdout.encoding, errors='replace').decode(sys.stdout.encoding))
        if error:
            print(f"ERROR/WARN: {error.encode(sys.stdout.encoding, errors='replace').decode(sys.stdout.encoding)}")
            
    ssh.close()
    print("\\nWebhook instalado com sucesso no servidor.")
except Exception as e:
    print(f"Falha: {e}")
    sys.exit(1)
