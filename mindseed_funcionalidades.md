# Visão Geral das Funcionalidades do Ecossistema MindSeed 360

A plataforma MindSeed é um ecossistema completo de predição e performance mental voltado para esportes de alto rendimento. A arquitetura foi desenhada em 4 pilares de acesso (Público, Gestor, Atleta, Família), seguindo uma estética luxuosa (*Gold Executive*) para atrair clubes e investidores.

Abaixo, o escopo completo do que foi construído e implantado:

---

## 1. Módulo Público (Acesso Aberto)
Responsável por apresentar o produto e converter leads.
- **Landing Page Comercial**: Página de vendas focada no conceito "Antecipe Crises. Potencialize Atletas", detalhando a proposta de valor do Dashboard Executivo, Painéis Individuais e LGPD.
- **Autenticação Segura**: Tela de Login (roteada e não imposta na raiz) com a nova identidade visual MindSeed e redefinição de senha (*Forgot Password*).
- **Adequação Legal**: Espaço preparado para exibição rápida de Termos de Uso e Política de Privacidade.

---

## 2. Portal do Gestor / Investidor (Acesso Admin)
Visão central em formato de "Radar 360º" para o departamento médico, diretores ou investidores monitorarem o ativo (elenco) e evitarem prejuízos.

- **Dashboard Institucional**:
  - Resumo de métricas da equipe (Esgotamento, Impulsividade Média, Pressão).
  - Tabela de "Top Riscos" (Lista de Atletas em Zona de Perigo, ordenados pela gravidade).
  - Componente de Gráfico de Tendência (Histórico da variação do MindScore do elenco).
- **Perfil Aprofundado (Drill-Down)**:
  - Visão raio-x de um atleta específico.
  - Fotografia circular, Gráficos radiais finos (Doughnuts) para Impulsividade, Maturidade Positiva, Sobrecarga e Luto Clínico.
  - Emulador do **AI Coach** que imprime 3 Recomendações Estratégicas em texto com base nos dados.
- **Central de Comparativo**:
  - Seleção de dois atletas lado a lado para "Decisão de Negócio" (ex: "Quem joga a final? Quem eu vendo agora?").
  - Gráfico Radar (Teia de Aranha) sobrepondo o cognitivo de ambos.
- **Central de Alertas Críticos**:
  - Sistema de priorização Semáforo (Verde = Resolvido, Amarelo = Atenção, Vermelho = Crise).
  - Cards detalhados de alertas (ex: "Sinal de Luto", "Impulsividade Extrema") com botão modal "Ver Detalhes" para ler o diagnóstico da IA.
- **Geração de Relatório de Diretoria**:
  - Rota interna preparada para extrair o Dashboard em PDF e mandar direto para a diretoria, provando o valor do software.

---

## 3. App do Atleta (Acesso Individual Mobile-First)
Ambiente pessoal para que o jogador preencha seus dados de recuperação e absorva o conteúdo gerado por IA.

- **Assessment Diário (RPE)**:
  - Formulário fluido (estilo Typeform) composto por perguntas rápidas (Sono, Estresse, Energia, Foco).
  - Sistema de estrelas (Rating) responsivo.
  - Tela final com campo livre de texto (Notas / Diário de Bordo) onde ele pode apontar dores.
- **Meus Testes (Psicometria Aprofundada)**:
  - Prateleira para realização quinzenal/mensal de inventários densos (Ex: MBI de Burnout).
  - Sistema de bloqueio (Trava temporal liberando testes apenas no dia certo).
  - Gamificação: Mostra quantos "Pontos Mind" o atleta ganha por responder.
- **Mind & Foco (Conteúdo / Hub Netflix)**:
  - Exibição de um Protocolo Personalizado criado pelo **AI Coach** que pede uma intervenção clara (Ex: "Descompressão Tática: 5min de respiração; 60min Detox Digital").
  - Biblioteca visual (Micro-Learning) contendo pílulas em vídeo / áudio sobre Foco e Controle Emocional (A Química da Decisão, O Mito da Pressão, etc).
- **Minha Conta (Perfil)**:
  - Placar das Conquistas (ex: "12 dias Seguidos + 450 Pontos Mind") validando a gamificação.
  - Gráfico Evolutivo Exclusivo: Onde o atleta pode monitorar o seu próprio histórico de RPE (taxa de esforço/recuperação) através de um gráfico de linha.
  - Central "Wearables": Tela que indica integrações simuladas ou ativas (Apple Health Sync OK, ou botão "Conectar Oura Ring").

---

## 4. App da Família / Controle Parental (Acesso Legal)
Criado especificamente para aprovação jurídica de clubes (LGPD) em cenários de atletas menores de idade na base. Remove toda a complexidade clínica e exibe apenas conformidade.

- **Overview Pessoal (Quem eu Acompanho)**:
  - Foto do atleta menor vinculado a ele e um carimbo oficial ("Psicológico Ok").
- **Termômetro de Descanso**:
  - Bloco visual mostrando exclusivamente as horas de sono / rotina com parecer otimista.
- **Nível de Esgotamento Pediátrico**:
  - Barra de progresso amigável, sem uso de diagnósticos densos ("Estresse Baixo - Sem risco imediato").
- **Repositório de Documentos Clínicos**:
  - Botões para a família realizar download legal de laudos oficiais chancelados pelo Psicólogo do Clube (Pareceres Trimestrais em formato PDF).

---

## 5. O Motor Invisível (Back-End PsychoAnalytics)
Toda essa estrutura não é estática. A lógica já está inserida no banco de dados e nos servidores.

- **MindScore Engine**: Conforme o atleta preenche estrelinhas, um Job de servidor converte aquilo num score numérico, cruza com algoritmos fixos e cria um Alerta de gravidade que brota automaticamente no painel Vermelho do Gestor.
- **Endpoints "Ocos" de Expansão (Microserviços Internos)**:
  - `/api/ai/coach/protocol` (Pronto para receber código que chama a OpenAI ChatGPT e responde no App do Atleta).
  - `/api/wearables/webhook` (Pronto para receber dados da API de Relógios e misturar no cálculo do risco).
- **Estética Global**: Implementação do Theming em CSS Nativo (sem amarras do Tailwind default) centralizado num arquivo `app.css` (Gold Executive `var(--accent-primary) = #D4AF37`) forçando as 4 pontas da aplicação a ficarem com o mesmo Design System Premium de preto profundo, creme e dourado.
