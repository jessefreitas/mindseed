import AthleteLayout from './layout';
import { Head, Link } from '@inertiajs/react';

export default function Testes() {
    return (
        <AthleteLayout title="Meus Testes">
            <Head title="Meus Testes" />

            <div className="p-4 md:p-8 max-w-2xl mx-auto w-full pb-24">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold font-sans">Mapeamento Cognitivo</h2>
                    <p className="text-sm text-[var(--text-muted)]">Avaliações profundas para calibrar seu Radar Preditivo</p>
                </div>

                <div className="space-y-4">
                    {/* Active Test */}
                    <div className="card-glass p-5 rounded-2xl relative overflow-hidden border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                        <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                            Recomendado Hoje
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex flex-shrink-0 items-center justify-center text-xl">
                                <i className="fa-solid fa-brain"></i>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-tight mb-1 text-[#D4AF37]">Inventário de Burnout (MBI)</h3>
                                <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-2">
                                    Avaliação padrão ouro para medir exaustão emocional, despersonalização e realização profissional.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-[var(--text-muted)]"><i className="fa-regular fa-clock mr-1"></i> 12 min</span>
                                    <button className="text-xs font-bold text-black bg-[#D4AF37] hover:bg-[#BCA339] px-4 py-1.5 rounded-lg transition-colors">
                                        Iniciar Teste
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Locked/Future Tests */}
                    <div className="card-glass p-5 rounded-2xl opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[var(--border-color)] text-[var(--text-muted)] flex flex-shrink-0 items-center justify-center text-xl">
                                <i className="fa-solid fa-compress"></i>
                            </div>
                            <div className="w-full">
                                <h3 className="font-bold text-lg leading-tight mb-1">Escala de Resiliência sob Pressão</h3>
                                <p className="text-xs text-[var(--text-muted)] mb-3">
                                    Mede a capacidade de manter o foco tático após erros graves.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-[var(--text-muted)]"><i className="fa-solid fa-lock mr-1"></i> Disponível dia 15</span>
                                    <span className="text-[10px] font-bold text-[var(--text-muted)]">+ 50 Pontos Mind</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-glass p-5 rounded-2xl opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[var(--border-color)] text-[var(--text-muted)] flex flex-shrink-0 items-center justify-center text-xl">
                                <i className="fa-solid fa-scale-balanced"></i>
                            </div>
                            <div className="w-full">
                                <h3 className="font-bold text-lg leading-tight mb-1">Traços de Impulsividade Urgente</h3>
                                <p className="text-xs text-[var(--text-muted)] mb-3">
                                    Mapeia a tendência de tomada de decisão não calculada em finais de partida.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-[var(--text-muted)]"><i className="fa-solid fa-lock mr-1"></i> Disponível Mês Que Vem</span>
                                    <span className="text-[10px] font-bold text-[var(--text-muted)]">+ 100 Pontos Mind</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AthleteLayout>
    );
}
