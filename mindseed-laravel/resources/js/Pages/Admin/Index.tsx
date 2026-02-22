import Topbar from "@/Components/MindSeed/Topbar";
import AdminLayout from "./layout";
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
    Filler
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
);

export default function AdminDashboard({ stats }: { stats: any }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const donutData = {
        labels: ['Estáveis', 'Em Atenção', 'Risco Crítico'],
        datasets: [
            {
                data: [65, 25, 10],
                backgroundColor: [
                    '#10B981', // Success
                    '#F59E0B', // Warning
                    '#EF4444'  // Danger
                ],
                borderWidth: 0,
                hoverOffset: 4
            }
        ]
    };

    const donutOptions = {
        cutout: '75%',
        plugins: {
            legend: { position: 'bottom' as const, labels: { color: 'var(--text-main)', usePointStyle: true, padding: 20 } },
            tooltip: {
                backgroundColor: 'var(--bg-card)',
                titleColor: 'var(--text-main)',
                bodyColor: 'var(--text-muted)',
                borderColor: 'var(--border-color)',
                borderWidth: 1,
            }
        }
    };

    const sparklineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false, min: 0, max: 100 } },
        elements: { point: { radius: 0 } }
    };

    const sparklineData = (color: string) => ({
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [{
            data: [60, 65, 58, 70, 75, 72, 85],
            borderColor: color,
            borderWidth: 2,
            tension: 0.4
        }]
    });

    if (!mounted) return null;

    return (
        <AdminLayout title="Dashboard Institucional">
            <Topbar title="Dashboard Institucional" subtitle="Visão Executiva do Elenco Profissional" />

            <div className="p-6 overflow-auto">

                {/* KPI CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    {/* Card 1 */}
                    <div className="card-glass border border-[#D4AF37]/30 p-5 rounded-2xl flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider mb-1">Atletas Monitorados</p>
                                <h3 className="text-2xl font-bold font-sans">{stats?.totalAthletes ?? 84}</h3>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[var(--success)]/20 text-[var(--success)] flex items-center justify-center">
                                <i className="fa-solid fa-arrow-trend-up text-sm"></i>
                            </div>
                        </div>
                        <div className="h-12 w-full mt-2">
                            <Line data={sparklineData('#10B981')} options={sparklineOptions} />
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-2"><span className="text-[var(--success)] font-bold">+5%</span> vs mês passado</p>
                    </div>

                    {/* Card 2 */}
                    <div className="card-glass border border-[#D4AF37]/30 p-5 rounded-2xl flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider mb-1">Consistência sob Pressão</p>
                                <h3 className="text-2xl font-bold font-sans">{stats?.avgPressure ?? 0}%</h3>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[var(--warning)]/20 text-[var(--warning)] flex items-center justify-center">
                                <i className="fa-solid fa-brain text-sm"></i>
                            </div>
                        </div>
                        <div className="h-12 w-full mt-2">
                            <Line data={sparklineData('#F59E0B')} options={sparklineOptions} />
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-2"><span className="text-[var(--warning)] font-bold">Média</span> do elenco</p>
                    </div>

                    {/* Card 3 */}
                    <div className="card-glass border-4 border-[#D4AF37]/10 border-l-[#EF4444] p-5 rounded-2xl flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider mb-1">Risco Comportamental</p>
                                <h3 className="text-2xl font-bold font-sans">{stats?.burnoutRiskCount > 0 ? 'Alta' : 'Baixa'}</h3>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[var(--danger)]/20 text-[var(--danger)] flex items-center justify-center">
                                <i className="fa-solid fa-triangle-exclamation text-sm"></i>
                            </div>
                        </div>
                        <div className="h-12 w-full mt-2">
                            <Line data={sparklineData('#EF4444')} options={sparklineOptions} />
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-2"><span className="text-[var(--danger)] font-bold">{stats?.burnoutRiskCount}</span> atletas em Esgotamento</p>
                    </div>

                    {/* Card 4 */}
                    <div className="card-glass border border-[#D4AF37]/30 p-5 rounded-2xl flex flex-col justify-between bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-main)]">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider mb-1">Alertas (Críticos)</p>
                                <h3 className="text-2xl font-bold font-sans text-[var(--danger)]">{stats?.criticalAlerts ?? 3}</h3>
                            </div>
                        </div>
                        <div className="flex -space-x-3 mt-4">
                            <img className="w-10 h-10 rounded-full border-2 border-[var(--bg-card)]" src="https://ui-avatars.com/api/?name=Lucas+M&background=EF4444&color=fff" alt="A1" />
                            <img className="w-10 h-10 rounded-full border-2 border-[var(--bg-card)]" src="https://ui-avatars.com/api/?name=João+S&background=F59E0B&color=fff" alt="A2" />
                            <img className="w-10 h-10 rounded-full border-2 border-[var(--bg-card)]" src="https://ui-avatars.com/api/?name=Pedro+G&background=F59E0B&color=fff" alt="A3" />
                        </div>
                        <p className="text-xs text-[var(--accent-primary)] font-semibold mt-4 cursor-pointer hover:underline">Ver Central de Alertas &rarr;</p>
                    </div>
                </div>

                {/* MAIN PANELS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Chart Panel */}
                    <div className="card-glass border border-[#D4AF37]/30 p-6 rounded-2xl lg:col-span-2 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">Mapeamento Psicométrico do Elenco</h3>
                            <select className="bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-[var(--accent-primary)]">
                                <option>Últimos 30 dias</option>
                                <option>Esta Temporada</option>
                            </select>
                        </div>
                        <div className="flex-1 min-h-[300px] flex items-center justify-center relative">
                            <div className="w-[280px] h-[280px]">
                                <Doughnut data={donutData} options={donutOptions as any} />
                            </div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                                <span className="text-3xl font-bold text-[var(--text-main)]">38</span>
                                <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-semibold mt-1">Atletas Mapeados</span>
                            </div>
                        </div>
                    </div>

                    {/* Top Risks */}
                    <div className="card-glass border border-[#D4AF37]/30 p-6 rounded-2xl flex flex-col">
                        <h3 className="text-lg font-bold mb-6 text-[#D4AF37]">Top 3 Riscos Ocultos</h3>
                        <div className="flex flex-col gap-4">

                            <div className="flex items-center gap-4 p-3 rounded-xl border border-[var(--border-color)] hover:bg-[var(--bg-main)] transition-colors cursor-pointer">
                                <img src="https://ui-avatars.com/api/?name=Lucas+Moura&background=1E293B&color=fff" alt="L" className="w-12 h-12 rounded-full" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm">Lucas Moura</h4>
                                    <p className="text-xs text-[var(--text-muted)]">Impacto Emocional / Queda de Vigor</p>
                                </div>
                                <span className="px-2 py-1 bg-[var(--danger)]/10 text-[var(--danger)] rounded text-xs font-bold border border-[var(--danger)]/20">-28%</span>
                            </div>

                            <div className="flex items-center gap-4 p-3 rounded-xl border border-[var(--border-color)] hover:bg-[var(--bg-main)] transition-colors cursor-pointer">
                                <img src="https://ui-avatars.com/api/?name=Roberto+Dias&background=1E293B&color=fff" alt="R" className="w-12 h-12 rounded-full" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm">Roberto Dias</h4>
                                    <p className="text-xs text-[var(--text-muted)]">Fadiga Mental Absoluta</p>
                                </div>
                                <span className="px-2 py-1 bg-[var(--danger)]/10 text-[var(--danger)] rounded text-xs font-bold border border-[var(--danger)]/20">-22%</span>
                            </div>

                            <div className="flex items-center gap-4 p-3 rounded-xl border border-[var(--border-color)] hover:bg-[var(--bg-main)] transition-colors cursor-pointer">
                                <img src="https://ui-avatars.com/api/?name=Joao+Silva&background=1E293B&color=fff" alt="J" className="w-12 h-12 rounded-full" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm">João Silva</h4>
                                    <p className="text-xs text-[var(--text-muted)]">Oscilação sob pressão</p>
                                </div>
                                <span className="px-2 py-1 bg-[var(--warning)]/10 text-[var(--warning)] rounded text-xs font-bold border border-[var(--warning)]/20">-15%</span>
                            </div>

                        </div>
                        <button className="mt-auto pt-4 text-sm text-[var(--accent-primary)] font-semibold hover:underline text-center w-full">Ver todos os relatórios detalhados</button>
                    </div>

                </div>

                {/* HEATMAP / MATRIZ DE RISCO */}
                <div className="mt-10 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold"><i className="fa-solid fa-layer-group text-[#D4AF37] mr-2"></i> Matriz de Risco Oculto</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Matriz Visual */}
                        <div className="card-glass border border-[#D4AF37]/30 p-8 rounded-2xl lg:col-span-2 flex items-center justify-center">

                            <div className="relative w-full max-w-lg aspect-auto">
                                {/* Matriz 3x3 */}
                                <div className="grid grid-cols-3 grid-rows-3 gap-2 h-72">
                                    {/* Linha 1: Foco Baixo */}
                                    <div className="bg-[#EF4444]/20 border border-[#EF4444]/50 rounded-lg text-center flex flex-col justify-center items-center p-2 transition-all hover:bg-[#EF4444]/40 cursor-pointer">
                                        <span className="text-xs font-bold text-[#EF4444]">Fadiga Extrema</span>
                                        <span className="text-[10px] text-white mt-1 font-semibold">Lucas, Marcos</span>
                                    </div>
                                    <div className="bg-[#F59E0B]/20 border border-[#F59E0B]/50 rounded-lg text-center flex flex-col justify-center items-center p-2 transition-all hover:bg-[#F59E0B]/40 cursor-pointer">
                                        <span className="text-xs font-bold text-[#F59E0B]">Cansaço Alto</span>
                                    </div>
                                    <div className="bg-[#10B981]/20 border border-[#10B981]/50 rounded-lg text-center flex flex-col justify-center items-center p-2 transition-all hover:bg-[#10B981]/40 cursor-pointer">
                                        <span className="text-xs font-bold text-[#10B981]">Desatento</span>
                                        <span className="text-[10px] text-white mt-1 font-semibold">João S.</span>
                                    </div>

                                    {/* Linha 2: Foco Médio */}
                                    <div className="bg-[#EF4444]/20 border border-[#EF4444]/50 rounded-lg text-center flex flex-col justify-center items-center p-2 transition-all hover:bg-[#EF4444]/40 cursor-pointer">
                                        <span className="text-xs font-bold text-[#EF4444]">Risco de Lesão</span>
                                    </div>
                                    <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg text-center flex flex-col justify-center items-center p-2 transition-all hover:bg-[#10B981]/30 cursor-pointer">
                                        <span className="text-xs font-bold text-white">Manutenção</span>
                                        <span className="text-[10px] text-[#A3A3A3] mt-1 font-semibold">14 Atletas</span>
                                    </div>
                                    <div className="bg-[#10B981]/20 border border-[#10B981]/50 rounded-lg text-center flex flex-col justify-center items-center p-2 transition-all hover:bg-[#10B981]/40 cursor-pointer">
                                        <span className="text-xs font-bold text-[#10B981]">Estável</span>
                                        <span className="text-[10px] text-white mt-1 font-semibold">Thiago L.</span>
                                    </div>

                                    {/* Linha 3: Foco Alto */}
                                    <div className="bg-[#F59E0B]/20 border border-[#F59E0B]/50 rounded-lg text-center flex flex-col justify-center items-center p-2 transition-all hover:bg-[#F59E0B]/40 cursor-pointer">
                                        <span className="text-xs font-bold text-[#F59E0B]">Mental Forte, Corpo Exausto</span>
                                    </div>
                                    <div className="bg-[#10B981]/20 border border-[#10B981]/50 rounded-lg text-center flex flex-col justify-center items-center p-2 transition-all hover:bg-[#10B981]/40 cursor-pointer">
                                        <span className="text-xs font-bold text-[#10B981]">Boa Forma</span>
                                        <span className="text-[10px] text-white mt-1 font-semibold">12 Atletas</span>
                                    </div>
                                    <div className="bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/50 rounded-lg text-center flex flex-col justify-center items-center p-2 shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all hover:bg-[var(--accent-primary)]/40 cursor-pointer">
                                        <span className="text-xs font-bold text-[#D4AF37]">Peak Performance</span>
                                        <span className="text-[10px] text-white mt-1 font-semibold">Pedro Gomes (+4)</span>
                                    </div>
                                </div>
                                {/* Eixos */}
                                <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-[#A3A3A3] font-bold tracking-widest whitespace-nowrap">CARGA FÍSICA (FADIGA) &rarr;</div>
                                <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 text-[10px] text-[#A3A3A3] font-bold tracking-widest whitespace-nowrap">FOCO COGNITIVO &rarr;</div>
                            </div>

                        </div>

                        {/* Legenda / Detalhes */}
                        <div className="card-glass border border-[#D4AF37]/30 p-6 rounded-2xl flex flex-col justify-center">
                            <h4 className="font-bold text-sm mb-4">Interpretação da Matriz</h4>
                            <p className="text-xs text-[var(--text-muted)] mb-5 leading-relaxed">
                                Esta vista cruza biomarcadores físicos (fadiga muscular + sono) com os índices cognitivos preditivos da plataforma.
                            </p>
                            <ul className="text-xs space-y-3 text-[#A3A3A3]">
                                <li className="flex items-start"><span className="inline-block mt-0.5 min-w-[12px] h-3 rounded-sm bg-[var(--accent-primary)]/40 border border-[var(--accent-primary)] mr-3"></span> <div><strong className="text-white">Peak Performance:</strong> Zona ideal para titularidade em finais e clássicos.</div></li>
                                <li className="flex items-start"><span className="inline-block mt-0.5 min-w-[12px] h-3 rounded-sm bg-[#EF4444]/40 border border-[#EF4444] mr-3"></span> <div><strong className="text-white">Fadiga Extrema:</strong> Risco agudo de lesão e erro tático. Recomenda-se corte ou Recovery intensivo.</div></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout >
    );
}
