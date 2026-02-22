import AthleteLayout from './layout';
import { Head } from '@inertiajs/react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

import { useState } from 'react';

export default function Perfil({ athlete }: { athlete: any }) {
    const [syncing, setSyncing] = useState(false);

    const syncOura = async () => {
        if (!athlete) {
            alert('ID do atleta não encontrado.');
            return;
        }
        setSyncing(true);
        try {
            await fetch('/api/wearables/webhook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    athlete_id: athlete.id,
                    heart_rate_variability: 25, // Simulated critical HRV
                    sleep_score: 40,
                    device_type: 'Oura Ring Gen3'
                })
            });
            alert('Wearable Oura Ring sincronizado!\nAlerta de Risco Somático disparado para a Gestão.');
        } catch (e) {
            console.error(e);
        }
        setSyncing(false);
    };

    // Mock evolutive data for the Athlete
    const labels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
    const recoveryData = {
        labels,
        datasets: [
            {
                label: 'Recuperação (RPE)',
                data: [65, 59, 80, 81, 56, 45, 40],
                borderColor: '#D4AF37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#000',
                pointBorderColor: '#D4AF37',
                pointRadius: 4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: {
                display: false,
                min: 0,
                max: 100,
            },
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                },
                ticks: {
                    color: '#A3A3A3',
                    font: { size: 10 }
                }
            }
        },
    };

    return (
        <AthleteLayout title="Minha Conta">
            <Head title="Minha Conta" />

            <div className="p-4 md:p-8 max-w-2xl mx-auto w-full pb-24">

                {/* Header Profile */}
                <div className="flex flex-col items-center justify-center mb-8 mt-4 text-center">
                    <div className="relative mb-3">
                        <img src="https://ui-avatars.com/api/?name=Lucas+Moura&background=D4AF37&color=000" alt="Avatar" className="w-24 h-24 rounded-full border-4 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-[var(--danger)] border-2 border-[#000] rounded-full flex items-center justify-center">
                            <i className="fa-solid fa-exclamation text-[10px] text-white"></i>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold font-sans">Lucas Moura</h2>
                    <p className="text-sm text-[var(--accent-primary)] font-bold">Atleta Sub-20</p>
                </div>

                {/* MindScore & Gamification */}
                <div className="flex gap-4 mb-8">
                    <div className="flex-1 card-glass p-4 rounded-2xl flex flex-col items-center justify-center gap-1">
                        <span className="text-3xl font-bold text-white">450</span>
                        <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Pontos Mind</span>
                    </div>
                    <div className="flex-1 card-glass p-4 rounded-2xl flex flex-col items-center justify-center gap-1 border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.1)] focus-within:">
                        <div className="flex items-center gap-1 text-[#D4AF37]">
                            <i className="fa-solid fa-fire text-lg"></i>
                            <span className="text-3xl font-bold">12</span>
                        </div>
                        <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Dias Seguidos</span>
                    </div>
                </div>

                {/* Timeline Evolutiva */}
                <h3 className="font-bold text-lg mb-4">Minha Recuperação</h3>
                <div className="card-glass p-5 rounded-2xl mb-8">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <h4 className="text-sm font-bold text-white">Curva de 7 dias</h4>
                            <p className="text-xs text-[var(--danger)] font-bold"><i className="fa-solid fa-arrow-trend-down mr-1"></i> Queda de Vigor</p>
                        </div>
                        <button className="text-[10px] bg-[#222222] text-[#A3A3A3] px-3 py-1 rounded-lg">Detalhar</button>
                    </div>
                    <div className="h-40 w-full relative">
                        <Line options={chartOptions as any} data={recoveryData} />
                    </div>
                </div>

                {/* Wearables Integration */}
                <h3 className="font-bold text-lg mb-4">Conectar Dispositivos</h3>
                <div className="space-y-3">
                    <div className="card-glass p-4 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                <i className="fa-brands fa-apple text-black text-xl"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Apple Health</h4>
                                <p className="text-[10px] text-[var(--success)] font-bold">Sincronizado há 2h</p>
                            </div>
                        </div>
                        <div className="w-12 h-6 bg-[#D4AF37] rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full"></div>
                        </div>
                    </div>

                    <div className="card-glass p-4 rounded-2xl flex items-center justify-between opacity-50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#111] border border-[#333] flex items-center justify-center">
                                <div className="w-4 h-4 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Oura Ring</h4>
                                <p className="text-[10px] text-[var(--text-muted)]">Não Conectado</p>
                            </div>
                        </div>
                        <button
                            onClick={syncOura}
                            disabled={syncing}
                            className="text-[10px] font-bold text-black bg-white hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {syncing ? 'Sincronizando...' : 'Conectar / Sync'}
                        </button>
                    </div>
                </div>

            </div>
        </AthleteLayout>
    );
}
