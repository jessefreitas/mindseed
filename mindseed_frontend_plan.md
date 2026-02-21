# MindSeed Dashboards - Plano de Execução

## Visão Geral
A Mindseed é uma plataforma de performance mental preditiva para o esporte, focada em entregar análises, relatórios e alertas para gestores, treinadores e empresários tomarem decisões assertivas sobre os atletas. 

**Identidade Visual:** Sofisticada, minimalista, autoritária (científica).
**Cores:** Preto (#0B0B0D, #1A1A1D, #2A2A2E), Dourado (#C6A75E, #E5C97B), Off-white/Marfim (#F5F3EE), Vermelho (#C62828), Amarelo (#E0A800), Verde (#2E7D32).

## Telas a Desenvolver

### Tela 1: Dashboard Institucional (Visão Executiva)
*   **Ação Principal:** Visão rápida de risco e oportunidade de todo o elenco.
*   **Componentes:**
    *   Header: Logo, Nome do Clube, Botão "Gerar Relatório".
    *   Cards (4): Estabilidade Emocional, Consistência, Risco Comportamental, Atletas em Atenção.
    *   Gráficos: Pizza/Rosca geral de atletas, Lista "Top 3 Riscos Ocultos".

### Tela 2: Perfil Individual do Atleta
*   **Ação Principal:** Análise profunda de um atleta específico (Raio-X mental).
*   **Componentes:**
    *   Lateral Curta: Foto circular, dados básicos, exportar relatório.
    *   Área Principal: Gráfico de Evolução Mental (linha do tempo).
    *   Cards Horizontais: Estabilidade, Impulsividade, Maturidade, Tomada de Decisão, Resiliência.
    *   Recomendações: Card de intervenção e sugestão.

### Tela 3: Comparativo (Decisão Estratégica)
*   **Ação Principal:** Comparar atletas da mesma posição para negociação/titularidade.
*   **Componentes:**
    *   Layout Split: Atleta A | Atleta B.
    *   Comparativo Lado a Lado: Indicadores numéricos.
    *   Gráfico: Teia/Radar de habilidades cognitivas e emocionais.
    *   Ranking: Marcador visual de quem está mais preparado.

### Tela 4: Alerta / Monitoramento (Semáforo)
*   **Ação Principal:** Monitorar saúde mental (Burnout, Luto, Queda brusca).
*   **Componentes:**
    *   Lista: Cards de atletas com sinalização verde, amarela ou vermelha.
    *   Ação: Botão "Ver Detalhes".
    *   Modal: Ao clicar no detalhe vermelho, mostrar histórico da queda e protocolo de intervenção.

## Próximos Passos
1. Definir o framework frontend (ex: React, Next.js ou HTML/CSS/JS puro se for para integrar em algo existente).
2. Construir a estrutura de estilos base (`globals.css` ou similar com as variáveis de cor).
3. Desenvolver a Tela 1 (Dashboard Institucional).
