import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import AthleteLayout from './layout';
import { Link } from '@inertiajs/react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AthleteHome({ athlete }: { athlete: any }) {
    const energy = athlete?.metrics?.[0]?.energy_level || 0;
    const focus = athlete?.metrics?.[0]?.focus_level || 0;

    const energyData = {
        labels: ['Energia Atual', 'Gasto'],
        datasets: [{
            data: [energy, 100 - energy],
            backgroundColor: ['#0EA5E9', 'rgba(14, 165, 233, 0.1)'], // accent-primary
            borderWidth: 0,
            cutout: '80%',
            circumference: 180,
            rotation: 270,
        }]
    };

    const focusData = {
        labels: ['Foco', 'Dispersão'],
        datasets: [{
            data: [focus, 100 - focus],
            backgroundColor: ['#10B981', 'rgba(16, 185, 129, 0.1)'], // accent-tertiary
            borderWidth: 0,
            cutout: '80%',
            circumference: 180,
            rotation: 270,
        }]
    };

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } }
    };

    return (
        <AthleteLayout title="Portal do Atleta">
            <div className="p-4 md:p-8 max-w-5xl mx-auto w-full flex flex-col gap-6">

                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-bold font-sans">Olá, {athlete?.name?.split(' ')[0] || 'Atleta'} 👋</h2>
                        <p className="text-sm text-[var(--text-muted)]">Aqui está o resumo da sua mente hoje.</p>
                    </div>
                    <div className="text-right">
                        <span className="text-3xl font-extrabold text-[var(--accent-primary)] font-serif">8.4</span>
                        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">MindScore</p>
                    </div>
                </div>

                {/* GAMIFICATION & ACTIONS */}
                <div className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                                <i className="fa-solid fa-list-check"></i> Você tem 1 termo pendente
                            </h3>
                            <p className="text-sm text-white/80">Responda ao Assessment Diário de Volição (2 min) antes do treino de hoje.</p>
                        </div>
                        <Link href={route('atleta.assessment')} className="w-full md:w-auto px-6 py-3 bg-white text-[var(--accent-primary)] font-bold rounded-full shadow-md hover:scale-105 transition-transform inline-block text-center cursor-pointer">
                            Iniciar Assessment
                        </Link>
                    </div>
                    {/* Background art */}
                    <i className="fa-solid fa-brain absolute -right-6 -bottom-8 text-8xl text-white/10 rotate-12"></i>
                </div>

                {/* DAILY METRICS OVERVIEW */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    <div className="card-glass p-4 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden text-center h-40">
                        <h4 className="text-xs font-bold text-[var(--text-muted)] mb-2 z-10">Vigor</h4>
                        <div className="w-[120px] h-[60px] absolute bottom-2">
                            <Doughnut data={energyData} options={commonOptions} />
                        </div>
                        <span className="text-2xl font-bold mt-auto z-10 relative bottom-1">{energy}<span className="text-sm">%</span></span>
                    </div>

                    <div className="card-glass p-4 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden text-center h-40">
                        <h4 className="text-xs font-bold text-[var(--text-muted)] mb-2 z-10">Foco</h4>
                        <div className="w-[120px] h-[60px] absolute bottom-2">
                            <Doughnut data={focusData} options={commonOptions} />
                        </div>
                        <span className="text-2xl font-bold mt-auto z-10 relative bottom-1">{focus}<span className="text-sm">%</span></span>
                    </div>

                    <div className="card-glass p-4 rounded-2xl flex flex-col justify-center gap-2 col-span-2 md:col-span-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-[var(--text-muted)]"><i className="fa-solid fa-bed text-[var(--accent-secondary)]"></i> Qualidade do Sono</span>
                            <span className="text-sm font-bold text-[var(--success)]">Boa</span>
                        </div>
                        <div className="w-full h-1.5 bg-[var(--border-color)] rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-[var(--success)] w-[85%] rounded-full"></div>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs font-bold text-[var(--text-muted)]"><i className="fa-solid fa-bolt text-[var(--warning)]"></i> Estresse</span>
                            <span className="text-sm font-bold text-[var(--warning)]">Atenção</span>
                        </div>
                        <div className="w-full h-1.5 bg-[var(--border-color)] rounded-full overflow-hidden">
                            <div className="h-full bg-[var(--warning)] w-[65%] rounded-full"></div>
                        </div>
                    </div>

                </div>

                {/* CONTEÚDO EDUCACIONAL / MIND */}
                <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><i className="fa-solid fa-headphones"></i> Pílulas de Performance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-4 p-4 card-glass rounded-2xl cursor-pointer hover:border-[var(--accent-primary)] transition-colors">
                            <div className="w-14 h-14 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center text-xl">
                                <i className="fa-solid fa-play"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Respiração Tática</h4>
                                <p className="text-xs text-[var(--text-muted)] line-clamp-1">Técnica de 3 minutos para baixar o batimento antes de cobranças de pênalti.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 card-glass rounded-2xl cursor-pointer hover:border-[var(--accent-secondary)] transition-colors">
                            <div className="w-14 h-14 rounded-xl bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] flex items-center justify-center text-xl">
                                <i className="fa-solid fa-play"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Recuperação Pós-Erro</h4>
                                <p className="text-xs text-[var(--text-muted)] line-clamp-1">Como o cérebro lida com a falha visível no primeiro tempo.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AthleteLayout>
    );
}
