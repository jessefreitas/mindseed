"use client";
import Topbar from "@/components/Topbar";
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export default function Comparison() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const radarData = {
        labels: [
            'Estabilidade',
            'Foco Pós-Erro',
            'Decisão sob Pressão',
            'Maturidade',
            'Controle Reflexo'
        ],
        datasets: [
            {
                label: 'Pedro Gomes',
                data: [85, 92, 88, 80, 75],
                backgroundColor: 'rgba(14, 165, 233, 0.2)', // var(--accent-primary) translúcido
                borderColor: '#0EA5E9',
                pointBackgroundColor: '#0EA5E9',
                pointBorderColor: 'var(--bg-main)',
                borderWidth: 2,
                pointRadius: 4
            },
            {
                label: 'João Silva',
                data: [62, 74, 65, 50, 85],
                backgroundColor: 'rgba(100, 116, 139, 0.1)', // text-muted translúcido
                borderColor: 'var(--text-muted)',
                pointBackgroundColor: 'var(--text-muted)',
                pointBorderColor: 'var(--bg-main)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 4
            }
        ]
    };

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: { color: 'var(--border-color)' },
                grid: { color: 'var(--border-color)' },
                pointLabels: {
                    color: 'var(--text-main)',
                    font: { size: 11, family: "inherit" }
                },
                ticks: { display: false, min: 0, max: 100 }
            }
        },
        plugins: {
            legend: { position: 'top' as const, labels: { color: 'var(--text-main)', usePointStyle: true, padding: 20 } },
            tooltip: {
                backgroundColor: 'var(--bg-card)',
                titleColor: 'var(--accent-primary)',
                bodyColor: 'var(--text-muted)',
                borderColor: 'var(--border-color)',
                borderWidth: 1,
                padding: 12
            }
        }
    };

    if (!mounted) return null;

    return (
        <>
            <Topbar title="Comparativo Estratégico" subtitle="Tomada de Decisão: Pedro Gomes vs João Silva" />

            <div className="p-6 overflow-auto">
                <div className="flex flex-col gap-6">

                    {/* HEADERS COMPARATIVOS */}
                    <div className="card-glass p-6 rounded-2xl flex items-center justify-between">
                        {/* Athlete A */}
                        <div className="flex items-center gap-4 flex-1">
                            <img src="https://ui-avatars.com/api/?name=Pedro+Gomes&background=0F172A&color=fff&size=80" alt="Pedro" className="w-20 h-20 rounded-full border-2 border-[var(--accent-primary)]" />
                            <div>
                                <h3 className="text-xl font-bold font-sans">Pedro Gomes</h3>
                                <span className="text-sm font-semibold text-[var(--success)] border border-[var(--success)] px-2 py-0.5 rounded-full bg-[var(--success)]/10">Titular (1ª Opção)</span>
                            </div>
                        </div>

                        <div className="px-8 font-bold text-2xl text-[var(--accent-primary)] opacity-50 font-serif italic">
                            VS
                        </div>

                        {/* Athlete B */}
                        <div className="flex items-center gap-4 justify-end flex-1">
                            <div className="text-right">
                                <h3 className="text-xl font-bold font-sans">João Silva</h3>
                                <span className="text-sm font-semibold text-[var(--warning)] border border-[var(--warning)] px-2 py-0.5 rounded-full bg-[var(--warning)]/10">Reserva (Em Atenção)</span>
                            </div>
                            <img src="https://ui-avatars.com/api/?name=Joao+Silva&background=64748B&color=fff&size=80" alt="João" className="w-20 h-20 rounded-full border-2 border-[var(--text-muted)] border-dashed" />
                        </div>
                    </div>

                    {/* BODY (MÉTRICAS + RADAR) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Lista de Metricas */}
                        <div className="card-glass p-6 rounded-2xl flex flex-col gap-2">
                            <h3 className="text-lg font-bold mb-4">Geração de Valor (MindSet)</h3>

                            <div className="flex justify-between items-center py-3 border-b border-[var(--border-color)] group hover:bg-[var(--bg-main)] px-2 rounded transition-colors">
                                <span className="w-16 font-bold text-lg text-[var(--success)]">85%</span>
                                <span className="flex-1 text-center text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold">Estabilidade Emocional</span>
                                <span className="w-16 font-bold text-lg text-right text-[var(--danger)]">62%</span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-[var(--border-color)] group hover:bg-[var(--bg-main)] px-2 rounded transition-colors">
                                <span className="w-16 font-bold text-lg text-[var(--success)]">92%</span>
                                <span className="flex-1 text-center text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold">Foco Pós-Erro</span>
                                <span className="w-16 font-bold text-lg text-right text-[var(--warning)]">74%</span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-[var(--border-color)] group hover:bg-[var(--bg-main)] px-2 rounded transition-colors">
                                <span className="w-16 font-bold text-lg text-[var(--success)]">88%</span>
                                <span className="flex-1 text-center text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold">Decisão sob Pressão</span>
                                <span className="w-16 font-bold text-lg text-right text-[var(--danger)]">65%</span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-[var(--border-color)] group hover:bg-[var(--bg-main)] px-2 rounded transition-colors">
                                <span className="w-16 font-bold text-lg text-[var(--success)]">80%</span>
                                <span className="flex-1 text-center text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold">Maturidade Volitiva</span>
                                <span className="w-16 font-bold text-lg text-right text-[var(--danger)]">50%</span>
                            </div>

                            <div className="flex justify-between items-center py-3 group hover:bg-[var(--bg-main)] px-2 rounded transition-colors">
                                <span className="w-16 font-bold text-lg text-[var(--warning)]">75%</span>
                                <span className="flex-1 text-center text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold">Controle Reflexo Impulsivo</span>
                                <span className="w-16 font-bold text-lg text-right text-[var(--success)]">85%</span>
                            </div>

                            {/* PARECER PREDITIVO */}
                            <div className="mt-6 p-4 rounded-xl border border-[var(--accent-primary)]/40 bg-gradient-to-r from-[var(--bg-card)] to-[var(--accent-primary)]/10">
                                <h4 className="text-[var(--accent-primary)] font-bold mb-2 flex items-center gap-2">
                                    <i className="fa-solid fa-brain"></i> Parecer Preditivo MindSeed
                                </h4>
                                <p className="text-sm text-[var(--text-main)] leading-relaxed">
                                    A arquitetura mental de <strong>Pedro Gomes</strong> apresenta resiliência 38% superior em cenários de eliminação (Mata-mata). <strong>João Silva</strong> possui leve vantagem reflexa, mas seu coeficiente de "Decisão sob Pressão" o torna uma opção de alto risco para titularidade absoluta nesta reta final.
                                </p>
                                <div className="flex gap-4 mt-4">
                                    <button className="flex-1 py-2 bg-[var(--text-main)] text-[var(--bg-main)] font-bold rounded-lg text-sm hover:opacity-90 transition-opacity">
                                        Confirmar Titularidade (P)
                                    </button>
                                    <button className="flex-1 py-2 bg-[var(--bg-main)] border border-[var(--border-color)] font-bold rounded-lg text-sm hover:border-[var(--text-main)] transition-colors">
                                        Gerar Relatório de Venda (J)
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Radar Chart */}
                        <div className="card-glass p-6 rounded-2xl flex items-center justify-center min-h-[400px]">
                            <div className="w-full h-full relative">
                                <Radar data={radarData} options={radarOptions} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
