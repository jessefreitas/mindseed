export default function Terms() {
    return (
        <div className="min-h-screen bg-[var(--bg-card)] text-[var(--text-main)] py-12 px-4 md:px-0">
            <div className="max-w-3xl mx-auto bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl p-8 md:p-12 shadow-sm">
                <h1 className="text-3xl font-bold mb-2">Termos de Uso e Política de Privacidade</h1>
                <p className="text-[var(--text-muted)] text-sm mb-8">Última atualização: 21 de Fevereiro de 2026 (Adequação à LGPD/GDPR)</p>

                <div className="prose prose-sm prose-invert max-w-none space-y-6">
                    <h2 className="text-xl font-bold text-[var(--accent-primary)] border-b border-[var(--border-color)] pb-2">1. Coleta e Tratamento de Dados Pessoais</h2>
                    <p className="text-sm leading-relaxed text-[var(--text-main)]">
                        A <strong>MindSeed</strong> é uma plataforma de inteligência preditiva restrita a ambientes profissionais do esporte.
                        Nós coletamos apenas informações estritamente necessárias, como nome, data de nascimento, histórico psicosocial preenchido via assessment, estatísticas biométricas integráveis e logs de acesso do atleta.
                        <strong>Nenhum dado sensível de natureza médica profunda (prontuários de tratamentos psiquiátricos externos) é exposto ao clube sem autorização expressa documentada.</strong>
                    </p>

                    <h2 className="text-xl font-bold text-[var(--accent-primary)] border-b border-[var(--border-color)] pb-2">2. Compartilhamento e Exposição (LGPD)</h2>
                    <p className="text-sm leading-relaxed text-[var(--text-main)]">
                        Atletas profissionais assinam o termo de adesão presencial junto aos clubes (Agentes de Tratamento).
                        Para atletas da modalidade de <strong>base (menores de 18 anos)</strong>, o acesso completo e a emissão de relatórios exigem consentimento parental (Responsável Legal Master), o qual possui portal exclusivo (`/familia`) para auditar logs de visualização do clube sobre seu dependente.
                    </p>

                    <h2 className="text-xl font-bold text-[var(--accent-primary)] border-b border-[var(--border-color)] pb-2">3. Direitos Titulares (Exclusão e Transparência)</h2>
                    <p className="text-sm leading-relaxed text-[var(--text-main)]">
                        Nos termos da Lei Geral de Proteção de Dados (Lei 13.709/18), o Atleta pode solicitar o bloqueio analítico preditivo imediato entrando em contato com a ouvidoria do seu Clube associado.
                        Em casos de transferência federativa (venda), a carga histórica mental preditiva do atleta **não será enviada ao time de destino automaticamente**, mantendo-se a titularidade intransferível para proteção financeira e biológica.
                    </p>

                    <h2 className="text-xl font-bold text-[var(--accent-primary)] border-b border-[var(--border-color)] pb-2">4. Segurança de IA Preditiva</h2>
                    <p className="text-sm leading-relaxed text-[var(--text-main)]">
                        O modelo gerador das recomendações no Dashboard Executivo é restrito e operado por aproximações de rede neural em cima de comportamento esportivo, **não** se constituindo de laudos oficiais de aptidão mental legal. Exige sempre a validação por um profissional de psicologia do esporte credenciado pelo CRP responsável.
                    </p>
                </div>

                <div className="mt-12 flex justify-center">
                    <a href="/" className="px-6 py-3 font-bold bg-[var(--text-main)] text-[var(--bg-main)] rounded-lg hover:opacity-90">Voltar à Página Inicial</a>
                </div>
            </div>
        </div>
    );
}
