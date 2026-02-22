import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Pages/Admin/layout';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

interface AnalyticsProps {
    filters: {
        position: string | null;
        min_age: string | null;
        max_age: string | null;
        days: number;
    };
    metrics: {
        burnout_percentage: number;
        trendData: Array<{
            date: string;
            avg_impulsivity: number;
            avg_sleep_score: number;
        }>;
        positionHealth: Record<string, Record<string, number>>;
    };
    availablePositions: string[];
}

export default function AnalyticsIndex({ filters, metrics, availablePositions }: AnalyticsProps) {
    const [localFilters, setLocalFilters] = useState(filters);

    const applyFilters = () => {
        router.get('/admin/analytics', localFilters as any, { preserveState: true });
    };

    // Prepare Trend Chart Data
    const trendDates = metrics.trendData.map(d => d.date);
    const trendChartData = {
        labels: trendDates,
        datasets: [
            {
                label: 'Impulsividade Média',
                data: metrics.trendData.map(d => d.avg_impulsivity),
                borderColor: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Qualidade de Sono Normalizada',
                data: metrics.trendData.map(d => d.avg_sleep_score),
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { labels: { color: '#ffffff' } },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#A3A3A3' }
            },
            x: {
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#A3A3A3' }
            }
        }
    };

    return (
        <AdminLayout>
            <Head title="Data Discovery - Analytics" />

            <div className="p-8 pb-32">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold font-sans tracking-tight">Data Discovery</h2>
                        <p className="text-[var(--text-muted)] mt-1 text-sm bg-gradient-to-r from-[#D4AF37] to-[#FBBF24] bg-clip-text text-transparent border-b border-[#D4AF37]/30 pb-1 inline-block">
                            MindSeed PsychoAnalytics Engine
                        </p>
                    </div>
                    {/* Botão de Export simulado (Fase 10) */}
                    <button className="btn-primary flex items-center gap-2">
                        <i className="fa-solid fa-file-export"></i> Exportar Relatório PDF
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filtros Livres */}
                    <div className="col-span-1">
                        <div className="card-glass p-6 rounded-2xl border border-[var(--border-color)]">
                            <h3 className="font-bold mb-4 flex items-center gap-2"><i className="fa-solid fa-filter text-[#D4AF37]"></i> Filtros de Elenco</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs text-[#A3A3A3] mb-1">Posição</label>
                                    <select
                                        className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-white text-sm rounded-lg p-2.5 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                                        value={localFilters.position || ''}
                                        onChange={e => setLocalFilters({ ...localFilters, position: e.target.value || null })}
                                    >
                                        <option value="">Todas as Posições</option>
                                        {availablePositions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-xs text-[#A3A3A3] mb-1">Idade Min</label>
                                        <input type="number" className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-white text-sm rounded-lg p-2.5" placeholder="16" value={localFilters.min_age || ''} onChange={e => setLocalFilters({ ...localFilters, min_age: e.target.value || null })} />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-[#A3A3A3] mb-1">Idade Max</label>
                                        <input type="number" className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-white text-sm rounded-lg p-2.5" placeholder="40" value={localFilters.max_age || ''} onChange={e => setLocalFilters({ ...localFilters, max_age: e.target.value || null })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-[#A3A3A3] mb-1">Período de Análise (Dias)</label>
                                    <input type="number" className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-white text-sm rounded-lg p-2.5" value={localFilters.days} onChange={e => setLocalFilters({ ...localFilters, days: parseInt(e.target.value) || 30 })} />
                                </div>
                                <button onClick={applyFilters} className="w-full mt-4 bg-[#D4AF37] text-black font-bold py-2 px-4 rounded-lg hover:bg-[#FBBF24] transition-colors">
                                    Aplicar Filtros
                                </button>
                            </div>
                        </div>

                        <div className="card-glass p-6 rounded-2xl border border-[var(--border-color)] mt-6 text-center">
                            <h4 className="text-[#A3A3A3] text-sm font-bold uppercase tracking-wider mb-2">Risco Sistêmico do Recorte</h4>
                            <div className="text-5xl font-black text-[#EF4444] mb-1">{metrics.burnout_percentage}%</div>
                            <p className="text-xs text-[#A3A3A3]">Média de Dias em Risco de Burnout no período filtrado.</p>
                        </div>
                    </div>

                    {/* Gráficos Principais */}
                    <div className="col-span-1 lg:col-span-3 space-y-6">

                        {/* Linha de Tendência */}
                        <div className="card-glass p-6 rounded-2xl border border-[var(--border-color)]">
                            <h3 className="font-bold mb-4">Gatilhos Compostos: Privação x Impulsividade</h3>
                            {trendDates.length > 0 ? (
                                <div className="h-72 w-full">
                                    <Line data={trendChartData} options={chartOptions} />
                                </div>
                            ) : (
                                <div className="h-72 flex items-center justify-center text-[#A3A3A3] italic">
                                    Dados insuficientes para este recorte.
                                </div>
                            )}
                        </div>

                        {/* Saúde por Posição */}
                        <div className="card-glass p-6 rounded-2xl border border-[var(--border-color)]">
                            <h3 className="font-bold mb-4">Distribuição de Status Atual por Posição</h3>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-[#A3A3A3] uppercase bg-[var(--bg-main)] border-b border-[var(--border-color)]">
                                        <tr>
                                            <th className="px-6 py-3 rounded-tl-lg">Posição</th>
                                            <th className="px-6 py-3 text-center text-[#10B981]">Estável (Alta Resiliência)</th>
                                            <th className="px-6 py-3 text-center text-[#F59E0B]">Warning (Atenção Tática)</th>
                                            <th className="px-6 py-3 text-center text-[#EF4444]">Crítico (Corte Recomendado)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(metrics.positionHealth).length > 0 ? (
                                            Object.entries(metrics.positionHealth).map(([pos, statuses]) => (
                                                <tr key={pos} className="border-b border-[var(--border-color)]/50 hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4 font-bold">{pos}</td>
                                                    <td className="px-6 py-4 text-center">{statuses['stable'] || 0}</td>
                                                    <td className="px-6 py-4 text-center">{statuses['warning'] || 0}</td>
                                                    <td className="px-6 py-4 text-center">{statuses['critical'] || 0}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan={4} className="text-center py-4 text-[#A3A3A3]">Nenhuma posição analisada...</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
