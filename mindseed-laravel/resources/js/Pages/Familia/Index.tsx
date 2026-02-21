import FamilyLayout from './layout';

export default function FamilyHome({ familyData }: { familyData: any }) {
    return (
        <FamilyLayout title="Acesso Família / Tutor">
            <div className="p-4 md:p-8 max-w-4xl mx-auto w-full flex flex-col gap-6">

                <div>
                    <h2 className="text-2xl font-bold font-sans">Bem-vindo, {familyData?.user?.name?.split(' ')[0] || 'Marcos'} 👋</h2>
                    <p className="text-sm text-[var(--text-muted)]">Acompanhamento do atleta da base ligado a você (Lei Geral de Proteção de Dados - Menor).</p>
                </div>

                {/* ATLETA VINCULADO */}
                <div className="card-glass p-6 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src={`https://ui-avatars.com/api/?name=${familyData?.athlete?.name || 'Caio+Silva'}&background=1E293B&color=fff`} alt={familyData?.athlete?.name || "Caio"} className="w-16 h-16 rounded-full border-2 border-[var(--border-color)]" />
                        <div>
                            <h3 className="font-bold text-lg">{familyData?.athlete?.name || 'Caio Silva'}</h3>
                            <p className="text-sm text-[var(--text-muted)]">{familyData?.athlete?.team || 'Sub-17'} • {familyData?.athlete?.sport || 'Clube Master'}</p>
                        </div>
                    </div>
                    <span className="bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20 px-3 py-1 rounded-full text-xs font-bold">
                        Psicológico Ok
                    </span>
                </div>

                {/* DASHBOARD RESUMO PARA PAIS (VISÃO SIMPLIFICADA) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="bg-[var(--bg-main)] border border-[var(--border-color)] p-5 rounded-xl">
                        <h4 className="font-bold mb-4 flex items-center gap-2 text-[var(--text-main)]">
                            <i className="fa-solid fa-bed text-[var(--accent-secondary)]"></i> Rotina de Descanso
                        </h4>
                        <div className="flex items-end gap-2 mb-1">
                            <span className="text-3xl font-extrabold font-serif">8.2<span className="text-sm">h</span></span>
                            <span className="text-sm text-[var(--text-muted)] mb-1">Média semanal</span>
                        </div>
                        <p className="text-xs text-[var(--success)] font-bold">O sono de Caio está adequado para sua categoria.</p>
                    </div>

                    <div className="bg-[var(--bg-main)] border border-[var(--border-color)] p-5 rounded-xl">
                        <h4 className="font-bold mb-4 flex items-center gap-2 text-[var(--text-main)]">
                            <i className="fa-solid fa-scale-balanced text-[var(--warning)]"></i> Risco de Esgotamento
                        </h4>
                        <div className="w-full h-3 bg-[var(--border-color)] rounded-full overflow-hidden mb-3">
                            <div className="h-full bg-[var(--success)] w-[15%]"></div>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-2 font-medium">Nível de estresse mapeado em "Baixo". Sem risco imediato detectado pela IA.</p>
                    </div>

                </div>

                {/* RELATÓRIOS E AVISOS */}
                <div className="mt-4">
                    <h3 className="text-lg font-bold mb-4"><i className="fa-solid fa-file-pdf"></i> Laudos Pedagógicos (Clube)</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl hover:bg-[var(--bg-main)] transition-colors cursor-pointer">
                            <div>
                                <h5 className="font-bold text-sm">Parecer Trimestral - Março 2026</h5>
                                <span className="text-xs text-[var(--text-muted)]">Liberado pela psicóloga do clube</span>
                            </div>
                            <button className="text-[var(--accent-primary)] hover:underline text-sm font-bold">Baixar PDF</button>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl hover:bg-[var(--bg-main)] transition-colors cursor-pointer">
                            <div>
                                <h5 className="font-bold text-sm">Parecer Trimestral - Dezembro 2025</h5>
                                <span className="text-xs text-[var(--text-muted)]">Liberado pela psicóloga do clube</span>
                            </div>
                            <button className="text-[var(--accent-primary)] hover:underline text-sm font-bold">Baixar PDF</button>
                        </div>
                    </div>
                </div>
            </div>
        </FamilyLayout>
    );
}
