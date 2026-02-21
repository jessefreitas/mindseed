# AGENTS.md

Este arquivo define padroes para agentes de Front-end BMAD e DevOps Full Stack no projeto Mindseed, incluindo praticas de integracao OpenAI.

## 1) Objetivo

- Entregar features com qualidade, rastreabilidade e deploy seguro.
- Evitar retrabalho com fluxo claro de planejamento, implementacao, validacao e revisao.
- Padronizar como agentes colaboram em tarefas front-end, backend, QA e operacao.

## 2) Papeis de Agente

- `frontend-specialist`: UX/UI, componentes, responsividade, acessibilidade, performance web.
- `fullstack-dev`: implementacao end-to-end com foco em ACs e reaproveitamento de codigo existente.
- `devops-engineer`: CI/CD, containerizacao, observabilidade, rollout e rollback.
- `qa-engineer`: testes automatizados (API, E2E, regressao) e criterio de qualidade.
- `orchestrator`: quebra tarefas, define ordem de execucao e integra entregas.

## 3) Fluxo BMAD Recomendado

1. `Descoberta`: entender contexto, requisitos, riscos e dependencias.
2. `Planejamento`: definir ACs, tarefas, escopo e criterio de pronto.
3. `Implementacao`: entregar em incrementos pequenos, seguindo padroes do codigo.
4. `Self-check`: validar tarefas concluidas, ACs cobertos, testes passando e aderencia a padroes.
5. `Adversarial review`: revisar diff completo, listar achados por severidade e corrigir antes de fechar.
6. `Resumo final`: arquivos alterados, testes executados, riscos restantes e proximos passos.

## 4) Boas Praticas Front-end (BMAD)

### Responsividade

- Abordagem `mobile-first` por padrao.
- Breakpoints base:
  - Mobile: `320-767px`
  - Tablet: `768-1023px`
  - Desktop: `1024px+`
- Usar unidades relativas (`rem`, `%`, `vw`, `vh`) quando possivel.
- Testar navegacao e legibilidade em dispositivos reais ou emulacao confiavel.

### Acessibilidade

- Meta minima: `WCAG AA`.
- Contraste minimo `4.5:1` para texto normal.
- Navegacao por teclado completa, com foco visivel.
- HTML semantico + ARIA apenas quando necessario.
- Alvos de toque com pelo menos `44x44px`.
- Incluir validacao com leitor de tela e checagem automatica (axe/lighthouse quando aplicavel).

### Qualidade de UI

- Priorizar componentes reutilizaveis e consistentes.
- Evitar regressao visual em fluxos principais.
- Validar estados: loading, vazio, erro, sucesso.

## 5) Boas Praticas DevOps Full Stack

### CI/CD

- Pipeline minimo por PR:
  1. format
  2. lint
  3. typecheck
  4. test
  5. build (fora de sessao interativa quando Next.js estiver em modo dev)
- Bloquear merge com checks falhando.
- Publicar artefatos de build versionados.

### Deploy e Operacao

- Ambientes separados: `dev`, `staging`, `prod`.
- Configuracao por variaveis de ambiente (sem segredo hardcoded).
- Estrategia de rollout segura (canary/blue-green quando possivel).
- Plano de rollback documentado antes de deploy.
- Health checks e monitoramento pos-deploy obrigatorios.

### Infra e Confiabilidade

- Preferir Infra as Code para recursos criticos.
- Documentar requisitos de deploy, portas, dependencias e jobs.
- Registrar logs tecnicos acionaveis (erro, contexto, correlacao).

## 6) Regras de Sessao de Agente (Front-end)

- Em projetos Next.js, preferir `npm run dev` para manter HMR.
- Evitar `npm run build` durante iteracao interativa de agente quando isso quebrar o estado de desenvolvimento.
- Se dependencias mudarem, atualizar lockfile e reiniciar servidor de desenvolvimento.

## 7) Boas Praticas OpenAI (Integracao)

- Usar SDK oficial e documentacao oficial da OpenAI como fonte primaria.
- Proteger segredos: chaves apenas em variaveis de ambiente/cofre.
- Definir contratos de entrada/saida claros (schema) para reduzir respostas ambiguas.
- Tratar falhas de rede e rate limit com retry exponencial e idempotencia quando aplicavel.
- Manter paridade comportamental entre fluxo com streaming e sem streaming.
- Registrar metadados de chamada (modelo, latencia, tokens, request id) para observabilidade.
- Validar output de ferramenta antes de executar acao sensivel.
- Cobrir integracao com testes automatizados (mock + caminho real controlado).

## 8) Criterio de Pronto

Uma entrega so fecha quando:

- ACs estao cobertos e demonstraveis.
- Testes relevantes passam localmente/CI.
- Achados criticos de review foram resolvidos.
- Impacto de deploy e rollback foi considerado.
- Mudancas e decisoes estao documentadas de forma objetiva.

## 9) Fontes Internas Consultadas

- `D:\vscode\dasboard_scripts\melhorias_dash_html\AGENTS.md`
- `D:\vscode\dasboard_scripts\melhorias_dash_html\_bmad\bmm\workflows\2-plan-workflows\create-ux-design\steps\step-13-responsive-accessibility.md`
- `D:\vscode\dasboard_scripts\melhorias_dash_html\_bmad\bmm\workflows\bmad-quick-flow\quick-dev\steps\step-04-self-check.md`
- `D:\vscode\dasboard_scripts\melhorias_dash_html\_bmad\bmm\workflows\bmad-quick-flow\quick-dev\steps\step-05-adversarial-review.md`
- `D:\vscode\dasboard_scripts\melhorias_dash_html\_bmad\bmm\workflows\qa\automate\instructions.md`
- `D:\vscode\hub_apis\openai-agents-python\AGENTS.md`
- `D:\vscode\hub_apis\agents.md\AGENTS.md`
