# MindSeed - Plataforma de Inteligência Preditiva Esportiva

Bem-vindo ao repositório oficial da **MindSeed**. Esta aplicação é construída com **Next.js 14**, **Tailwind CSS** e **Chart.js** para oferecer painéis analíticos de alta performance para o esporte.

## Visão Geral da MVP (Fase 2)

A aplicação conta com um poderoso **Design System Baseado em Variáveis CSS**, permitindo mudança fluída e instantânea entre o Tema Claro (Apple Health / Clínico) e o Tema Escuro (Tech / Navy Deep). Ambas as paletas foram curadas para transmitir autoridade científica e tecnologia imersiva.

### Telas Disponíveis:
*   **Landing Page**: `mindseed.omniforge.com.br/`
*   **Login**: `mindseed.omniforge.com.br/login`
*   **Dashboard Gestor (Admin)**: `mindseed.omniforge.com.br/admin`
    *   Dashboard Executivo (MindSet Geral do Elenco)
    *   Perfil Individual (Raio-X de Atleta)
    *   Comparativo Estratégico (Radar de Titularidade)
    *   Central Semafórica de Alertas de Risco (Burnout/Luto)
*   **Portal do Atleta**: `mindseed.omniforge.com.br/atleta`
*   **Portal Família (Base)**: `mindseed.omniforge.com.br/familia`
*   **Termos LGPD**: `mindseed.omniforge.com.br/termos`

## Deploy Automatizado
Este repositório possui Integração Contínua (CI/CD) com a VPS. 
Qualquer `git push origin main` feito acionará o Webhook (Node.js na porta 9000), efetuando download automático do código, `npm build` e reinício da máquina via PM2.
