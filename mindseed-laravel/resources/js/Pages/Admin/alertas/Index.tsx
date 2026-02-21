import Topbar from "@/Components/MindSeed/Topbar";
import AdminLayout from "../layout";
import { useState } from "react";

export default function Alerts() {
    const [modalOpen, setModalOpen] = useState(false);
    const [filter, setFilter] = useState("all"); // 'all', 'critical', 'warning'

    const alerts = [
        {
            id: 1,
            name: "Lucas Moura",
            pos: "Lateral Direito",
            avatar: "https://ui-avatars.com/api/?name=Lucas+Moura&background=1E293B&color=fff",
            status: "critical",
            statusLabel: "Imediato",
            reason: "Luto Agudo / Desfoco",
            icon: "fa-cloud-bolt",
            metric: "- 28%",
            action: "Ver Detalhes"
        },
        {
            id: 2,
            name: "Roberto Dias",
            pos: "Zagueiro",
            avatar: "https://ui-avatars.com/api/?name=Roberto+Dias&background=1E293B&color=fff",
            status: "critical",
            statusLabel: "Imediato",
            reason: "Risco Elevado de Burnout",
            icon: "fa-fire",
            metric: "- 22%",
            action: "Ver Detalhes"
        },
        {
            id: 3,
            name: "João Silva",
            pos: "Atacante",
            avatar: "https://ui-avatars.com/api/?name=Joao+Silva&background=1E293B&color=fff",
            status: "warning",
            statusLabel: "Atenção",
            reason: "Oscilação Incomum",
            icon: "fa-arrows-up-down",
            metric: "- 15%",
            action: "Acompanhar"
        },
        {
            id: 4,
            name: "Pedro Gomes",
            pos: "Zagueiro",
            avatar: "https://ui-avatars.com/api/?name=Pedro+Gomes&background=1E293B&color=fff",
            status: "stable",
            statusLabel: "Estável",
            reason: "Foco Consolidado",
            icon: "fa-shield-halved",
            metric: "+ 4%",
            action: "Relatório"
        }
    ];

    const filteredAlerts = alerts.filter(a => filter === "all" ? true : a.status === filter);

    return (
        <AdminLayout title="Central de Alertas Semafóricos">
            <Topbar title="Central de Alertas Semafóricos" subtitle="Monitoramento ativo de quedas de performance, burnout e luto" />

            <div className="p-6 overflow-auto">

                {/* FILTERS */}
                <div className="flex gap-3 mb-6">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors border ${filter === "all" ? "bg-[#D4AF37] border-[#D4AF37] text-white" : "border-[#D4AF37]/30 text-[var(--text-main)] hover:bg-[var(--bg-card)]"}`}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setFilter("critical")}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors border ${filter === "critical" ? "bg-[var(--danger)] border-[var(--danger)] text-white" : "border-[var(--danger)] text-[var(--danger)] hover:bg-[var(--danger)]/10"}`}
                    >
                        Críticos (2)
                    </button>
                    <button
                        onClick={() => setFilter("warning")}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors border ${filter === "warning" ? "bg-[var(--warning)] border-[var(--warning)] text-white" : "border-[var(--warning)] text-[var(--warning)] hover:bg-[var(--warning)]/10"}`}
                    >
                        Atenção (1)
                    </button>
                </div>

                {/* ALERTS LIST */}
                <div className="card-glass p-6 rounded-2xl flex flex-col gap-4">

                    {/* Header Row */}
                    <div className="hidden md:flex justify-between text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider px-4 pb-2 border-b border-[var(--border-color)]">
                        <span className="w-24">Status</span>
                        <span className="w-1/4">Atleta</span>
                        <span className="w-1/4">Motivo Principal</span>
                        <span className="w-24 text-center">Oscilação</span>
                        <span className="w-32 text-right">Ação</span>
                    </div>

                    {filteredAlerts.map((alert) => (
                        <div
                            key={alert.id}
                            className={`flex flex-col md:flex-row items-center justify-between p-4 rounded-xl border border-[#D4AF37]/30 bg-[var(--bg-main)] hover:-translate-y-1 transition-transform shadow-sm ${alert.status === 'critical' ? 'border-l-4 border-l-[var(--danger)] bg-[var(--danger)]/5' :
                                alert.status === 'warning' ? 'border-l-4 border-l-[var(--warning)] bg-[var(--warning)]/5' :
                                    'border-l-4 border-l-[var(--success)] bg-[var(--success)]/5'
                                }`}
                        >

                            <div className="w-full md:w-24 flex items-center gap-2 mb-2 md:mb-0">
                                <span className={`w-3 h-3 rounded-full ${alert.status === 'critical' ? 'bg-[var(--danger)] shadow-[0_0_10px_var(--danger)]' :
                                    alert.status === 'warning' ? 'bg-[var(--warning)] shadow-[0_0_10px_var(--warning)]' :
                                        'bg-[var(--success)]'
                                    }`}></span>
                                <span className="font-bold text-sm">{alert.statusLabel}</span>
                            </div>

                            <div className="w-full md:w-1/4 flex items-center gap-3 mb-4 md:mb-0">
                                <img src={alert.avatar} alt={alert.name} className="w-10 h-10 rounded-full border border-[var(--border-color)]" />
                                <div>
                                    <h4 className="font-bold text-sm">{alert.name}</h4>
                                    <p className="text-xs text-[var(--text-muted)]">{alert.pos}</p>
                                </div>
                            </div>

                            <div className="w-full md:w-1/4 text-sm font-semibold mb-4 md:mb-0 flex items-center gap-2">
                                <i className={`fa-solid ${alert.icon} text-[var(--text-muted)]`}></i> {alert.reason}
                            </div>

                            <div className={`w-full md:w-24 text-center font-bold text-lg mb-4 md:mb-0 font-sans ${alert.status === 'critical' ? 'text-[var(--danger)]' :
                                alert.status === 'warning' ? 'text-[var(--warning)]' :
                                    'text-[var(--success)]'
                                }`}>
                                {alert.metric}
                            </div>

                            <div className="w-full md:w-32 text-right">
                                {alert.status === 'critical' ? (
                                    <button onClick={() => setModalOpen(true)} className="w-full md:w-auto px-4 py-2 border border-[var(--danger)] text-[var(--danger)] text-sm font-bold rounded-lg hover:bg-[var(--danger)] hover:text-white transition-colors">
                                        <i className="fa-solid fa-eye mr-1"></i> {alert.action}
                                    </button>
                                ) : (
                                    <button className="w-full md:w-auto px-4 py-2 border border-[#D4AF37]/50 text-[#D4AF37] text-sm font-bold rounded-lg hover:bg-[#D4AF37]/10 transition-colors">
                                        <i className="fa-solid fa-chart-line mr-1"></i> {alert.action}
                                    </button>
                                )}
                            </div>

                        </div>
                    ))}

                </div>
            </div>

            {/* MODAL CRÍTICO */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-[var(--bg-card)] border-t-8 border-t-[var(--danger)] border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(2EF4444,0.15)] rounded-2xl w-full max-w-lg overflow-hidden flex flex-col transform animate-in slide-in-from-bottom-5">

                        <div className="p-5 flex justify-between items-center border-b border-[#D4AF37]/20">
                            <h2 className="text-xl font-bold text-[var(--danger)] flex items-center gap-2">
                                <i className="fa-solid fa-triangle-exclamation"></i> Sinalização de Crise: Lucas Moura
                            </h2>
                            <button onClick={() => setModalOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text-main)] w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--bg-main)] transition-colors">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <div className="p-6 flex flex-col gap-4">
                            <div className="p-4 bg-[var(--bg-main)] border border-[#D4AF37]/30 rounded-xl">
                                <h4 className="font-bold text-[#D4AF37] mb-2">Diagnóstico do Sistema</h4>
                                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                                    Foi detectada uma queda de <strong className="text-[var(--text-main)]">28% na estabilidade volitiva</strong> do atleta nos últimos 15 dias. O padrão de respostas indica fadiga emocional severa e propensão a lesões na reta final do campeonato.
                                </p>
                            </div>

                            <div className="p-4 bg-[var(--danger)]/10 border border-[var(--danger)]/30 rounded-xl">
                                <h4 className="font-bold text-[var(--danger)] mb-2">Recomendação Ativa</h4>
                                <p className="text-sm text-[var(--text-main)] font-semibold leading-relaxed">
                                    O atleta NÃO deve ser relacionado para jogos de eliminação direta nesta semana. O risco de erro impulsivo ou travamento cognitivo é superior a 75%.
                                </p>
                            </div>
                        </div>

                        <div className="p-5 bg-[var(--bg-main)] border-t border-[#D4AF37]/20 flex justify-end gap-3">
                            <button onClick={() => setModalOpen(false)} className="px-5 py-2 font-bold text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
                                Ignorar (Assumir Risco)
                            </button>
                            <button className="px-5 py-2 bg-gradient-to-r from-[var(--danger)] to-[#991b1b] text-white font-bold text-sm rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-[var(--danger)]/30">
                                Iniciar Intervenção MindSeed
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
