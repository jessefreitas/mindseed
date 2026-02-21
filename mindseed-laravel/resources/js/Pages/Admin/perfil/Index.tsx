import Topbar from "@/Components/MindSeed/Topbar";
import AdminLayout from "../layout";
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function IndividualProfile() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const evolutionData = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
            {
                label: 'Estabilidade Emocional (%)',
                data: [85, 82, 88, 79, 65, 58], // Queda clara no final
                borderColor: '#0EA5E9', // var(--accent-primary)
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                tension: 0.4,
                borderWidth: 3,
                pointBackgroundColor: (context: any) => {
                    const val = context.dataset.data[context.dataIndex];
                    return val < 70 ? '#EF4444' : '#0EA5E9'; // Danger red se < 70
                },
                pointBorderColor: 'var(--bg-main)',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }
        ]
    };

    const evolutionOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'var(--bg-card)',
                titleColor: 'var(--text-main)',
                bodyColor: 'var(--text-muted)',
                borderColor: 'var(--border-color)',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
            }
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                grid: { color: 'var(--border-color)' },
                ticks: { color: 'var(--text-muted)' }
            },
            x: {
                grid: { display: false },
                ticks: { color: 'var(--text-muted)' }
            }
        }
    };

    const createDoughnutData = (value: number, color: string) => ({
        labels: ['Preenchido', 'Restante'],
        datasets: [{
            data: [value, 100 - value],
            backgroundColor: [color, 'rgba(255, 255, 255, 0.05)'],
            borderWidth: 0,
            cutout: '75%',
        }]
    });

    const doughnutOptions = {
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        maintainAspectRatio: false,
    };

    const metrics = [
        { label: "Impulsividade Crônica", value: 82, color: "#EF4444" }, // Danger
        { label: "Maturidade Positiva", value: 65, color: "#D4AF37" }, // Gold
        { label: "Consistência sob Pressão", value: 58, color: "#F59E0B" }, // Warning
        { label: "Controle Cognitivo", value: 90, color: "#10B981" }, // Success
    ];

    if (!mounted) return null;

    return (
        <AdminLayout title="Perfil Individual">
            <Topbar title="Perfil Individual" subtitle="Raio-X Psicométrico de Arthur Gomes" />

            <div className="p-6 overflow-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* SIDEBAR DO ATLETA */}
                    <div className="lg:col-span-1">
                        <div className="card-glass border border-[#D4AF37]/30 p-6 rounded-2xl flex flex-col items-center text-center">
                            <div className="relative mb-4">
                                <img src="https://ui-avatars.com/api/?name=Arthur+Gomes&background=0F172A&color=fff&size=150" alt="Arthur" className="w-32 h-32 rounded-full border-4 border-[#D4AF37]/50 shadow-lg" />
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-[var(--danger)] rounded-full border-2 border-[var(--bg-card)] shadow-sm"></div>
                            </div>
                            <h2 className="text-xl font-bold mb-1">Arthur Gomes</h2>
                            <p className="text-sm text-[var(--accent-primary)] font-semibold mb-1">Meio-Campista</p>
                            <p className="text-xs text-[var(--text-muted)] mb-6">23 anos • Camisa 10</p>

                            <div className="w-full bg-[var(--bg-main)] border border-[var(--danger)]/30 rounded-xl p-4 mb-6">
                                <span className="text-[var(--danger)] font-bold text-sm block mb-1">Status: ALERTA CRÍTICO</span>
                                <p className="text-xs text-[var(--text-muted)]">Queda abrupta de retenção emocional detectada nos últimos 15 dias.</p>
                            </div>

                            <button className="w-full py-2.5 bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] font-semibold rounded-lg hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] transition-colors text-sm">
                                Baixar Laudo PDF
                            </button>
                        </div>
                    </div>

                    {/* AREA PRINCIPAL DE DADOS */}
                    <div className="lg:col-span-3 flex flex-col gap-6">

                        {/* GRAFICO EVOLUTIVO */}
                        <div className="card-glass border border-[#D4AF37]/30 p-6 rounded-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-[#D4AF37]">Evolução de Estabilidade Emocional</h3>
                                <span className="text-xs bg-[var(--danger)]/10 text-[var(--danger)] border border-[var(--danger)]/20 px-3 py-1 rounded-full font-bold">
                                    Queda de 21%
                                </span>
                            </div>
                            <div className="w-full h-[250px]">
                                <Line data={evolutionData as any} options={evolutionOptions} />
                            </div>
                        </div>

                        {/* METRICS DOUGHNUT CARDS */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {metrics.map((m, idx) => (
                                <div key={idx} className="card-glass border border-[#D4AF37]/30 p-5 rounded-2xl flex flex-col items-center justify-center gap-3 text-center">
                                    <div className="relative w-24 h-24">
                                        <Doughnut data={createDoughnutData(m.value, m.color)} options={doughnutOptions as any} />
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <span className="text-xl font-bold font-sans" style={{ color: m.color }}>{m.value}%</span>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wide leading-tight mt-2">{m.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* RECOMENDAÇÕES */}
                        <div className="card-glass p-6 rounded-2xl border-l-4 border-l-[var(--danger)] border-y border-r border-y-[#D4AF37]/20 border-r-[#D4AF37]/20 bg-gradient-to-r from-[var(--danger)]/5 to-transparent">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <i className="fa-solid fa-brain text-[var(--danger)]"></i> Recomendações Estratégicas (IA)
                            </h3>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1 space-y-3">
                                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                                        A análise preditiva aponta uma <span className="text-[#D4AF37] font-semibold">exaustão volitiva grave</span>. O atleta apresenta os mesmos traços comportamentais estruturais verificados no período pré-lesão de 2024.
                                    </p>
                                    <p className="text-sm text-[var(--text-main)] font-semibold">
                                        Ação sugerida: Poupar do próximo jogo fora de casa e iniciar protocolo de descanso cognitivo (Nível 2).
                                    </p>
                                </div>
                                <div className="md:w-64 border-l border-[#D4AF37]/30 pl-6 flex flex-col justify-center">
                                    <span className="text-xs font-bold text-[#D4AF37] uppercase mb-2 drop-shadow-sm">Janela de Negociação</span>
                                    <div className="bg-[var(--danger)]/10 border border-[var(--danger)]/20 text-[var(--danger)] text-center py-2 rounded-lg text-sm font-bold">
                                        Risco de Desvalorização
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}
