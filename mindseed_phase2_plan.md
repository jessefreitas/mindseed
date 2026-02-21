# MindSeed - Master Plan (Fase 2)

## Novos Requisitos (Baseados no Áudio)
O cliente solicitou uma expansão massiva do escopo inicial (que era apenas os mockups do painel). Agora precisamos desenhar e desenvolver a estrutura completa da plataforma e prepará-la para produção.

### 1. Refatoração Visual (Design System)
- O cliente achou a identidade atual (Preto/Dourado) um pouco "pesada" ou "excessiva".
- **Nova Direção**: Cores mais "vivas" e modernas. Necessidade de criar um **Modo Dark** e um **Modo Light** com paletas que transmitam performance e ciência, mas com mais energia.

### 2. Arquitetura da Plataforma
A plataforma deve conter os seguintes módulos consolidados:
1. **Landing Page Pública**: Apresentação do produto, proposta de valor, captação de leads.
2. **Sistema de Autenticação (Login/Senha)**: Para segregar os níveis de acesso.
3. **Painel do Administrador/Gestor**: (O que já começamos a esboçar, mas agora com a nova identidade visual).
4. **Painel do Atleta**: Visão restrita para o próprio jogador acompanhar sua evolução e responder aos assessments.
5. **Painel da Família (Controle Parental)**: Acesso específico para pais/responsáveis de atletas menores de idade acompanharem o desenvolvimento e riscos.
6. **Políticas e Conformidade**: Páginas de Termos de Uso e Políticas de Privacidade (LGPD/GDPR compliance).

### 3. Infraestrutura e Deploy
- Hospedar todo o ecossistema (Landing Page + Plataforma) na VPS do usuário.
- Configurar domínios, roteamento e acesso.

## Plano de Ação Imediato
1. **Design**: Gerar novas imagens conceituais (Mockups IA) mostrando o painel em Modo Claro e Modo Escuro com cores vivas (ex: Azul tech, Verde Neon, etc) para o cliente escolher o novo caminho visual.
2. **Aprovação Visual**: Confirmar a nova paleta.
3. **Estruturação do Repositório**: Refatorar o que foi feito na Fase 1 para acomodar páginas públicas e a lógica de múltiplos painéis.
