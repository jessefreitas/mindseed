import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

interface FamilyProps extends PageProps {
    athlete: {
        id: number;
        name: string;
        status: 'stable' | 'warning' | 'critical';
        avatar: string | null;
    } | null;
    tips: Array<{
        icon: string;
        color: string;
        title: string;
        description: string;
    }>;
}

export default function Dashboard({ auth, athlete, tips }: FamilyProps) {
    const user = auth.user;

    const getStatusColor = (status: string | undefined) => {
        if (status === 'critical') return 'text-[var(--danger)]';
        if (status === 'warning') return 'text-[var(--warning)]';
        return 'text-[var(--success)]';
    };

    const getStatusGlow = (status: string | undefined) => {
        if (status === 'critical') return 'shadow-[0_0_20px_rgba(239,68,68,0.3)] border-[#EF4444]/50';
        if (status === 'warning') return 'shadow-[0_0_20px_rgba(245,158,11,0.3)] border-[#F59E0B]/50';
        return 'shadow-[0_0_20px_rgba(16,185,129,0.3)] border-[#10B981]/50';
    };

    const getStatusText = (status: string | undefined) => {
        if (status === 'critical') return 'Exige Repouso e Acolhimento';
        if (status === 'warning') return 'Atenção ao Desgaste';
        return 'Pronto e Saudável';
    };

    return (
        <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] font-sans flex flex-col items-center py-10 px-4">
            <Head title="Portal da Família" />

            <div className="w-full max-w-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold font-sans">Olá, {user.name}</h1>
                        <p className="text-sm text-[var(--text-muted)]">Portal da Família MindSeed</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] overflow-hidden flex items-center justify-center bg-[var(--bg-card)]">
                        <i className="fa-solid fa-house-chimney text-[#D4AF37]"></i>
                    </div>
                </div>

                {!athlete ? (
                    <div className="card-glass p-8 text-center rounded-2xl border border-[var(--border-color)]">
                        <i className="fa-solid fa-link-slash text-4xl text-[var(--text-muted)] mb-4"></i>
                        <h3 className="text-lg font-bold">Nenhum atleta vinculado</h3>
                        <p className="text-sm text-[var(--text-muted)] mt-2">Peça para a comissão técnica enviar o convite de vinculação da sua conta ao atleta.</p>
                    </div>
                ) : (
                    <>
                        {/* Athlete Status Card */}
                        <div className={`card-glass p-6 rounded-3xl border-2 transition-all duration-500 mb-8 flex flex-col items-center text-center ${getStatusGlow(athlete.status)}`}>
                            <img
                                src={athlete.avatar || `https://ui-avatars.com/api/?name=${athlete.name}&background=1E293B&color=fff`}
                                alt={athlete.name}
                                className="w-24 h-24 rounded-full border-4 border-white dark:border-[var(--bg-card)] shadow-lg mb-4"
                            />
                            <h2 className="text-xl font-bold">{athlete.name}</h2>
                            <p className="text-xs uppercase tracking-widest text-[#A3A3A3] font-bold mt-1">Status Atual</p>

                            <div className="mt-3 py-2 px-6 rounded-full bg-[var(--bg-main)] border border-[var(--border-color)] inline-block">
                                <span className={`font-bold text-sm ${getStatusColor(athlete.status)}`}>
                                    <i className="fa-solid fa-circle text-[8px] align-middle mr-2"></i>
                                    {getStatusText(athlete.status)}
                                </span>
                            </div>
                        </div>

                        {/* Psychoeducational Tips */}
                        <h3 className="font-bold text-lg mb-4">Recomendações de Apoio</h3>
                        <div className="space-y-4">
                            {tips.map((tip, idx) => (
                                <div key={idx} className="card-glass p-5 rounded-2xl flex gap-4 border border-[var(--border-color)]">
                                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-[var(--bg-main)] border border-[var(--border-color)] ${tip.color}`}>
                                        <i className={`fa-solid ${tip.icon}`}></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm mb-1">{tip.title}</h4>
                                        <p className="text-xs text-[#A3A3A3] leading-relaxed">{tip.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <div className="mt-10 text-center">
                    <button className="text-[10px] text-[#A3A3A3] hover:text-white transition-colors" onClick={() => window.location.href = '/logout'}>Sair da Conta</button>
                    <p className="text-[10px] text-[#444] mt-2">Dados protegidos sob política de privacidade LGPD</p>
                </div>
            </div>
        </div>
    );
}
