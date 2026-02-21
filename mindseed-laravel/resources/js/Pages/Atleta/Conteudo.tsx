import AthleteLayout from './layout';
import { Head, Link } from '@inertiajs/react';

export default function Conteudo() {
    return (
        <AthleteLayout title="Mind & Foco">
            <Head title="Mind & Foco" />

            <div className="p-4 md:p-8 max-w-2xl mx-auto w-full pb-24">
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-bold font-sans">Mind & Foco</h2>
                        <p className="text-sm text-[var(--text-muted)]">Otimize seu cérebro para a Alta Performance</p>
                    </div>
                </div>

                {/* AI Coach Protocol - Highlight */}
                <div className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border-2 border-[#D4AF37] p-6 rounded-3xl mb-8 relative shadow-[0_0_30px_rgba(212,175,55,0.15)] overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] rounded-full blur-[80px] opacity-20"></div>

                    <div className="flex items-center gap-2 mb-4">
                        <i className="fa-solid fa-robot text-[#D4AF37]"></i>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Protocolo AI Coach: Ativo</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-white">Descompressão Tática (Nível 2)</h3>
                    <p className="text-sm text-[#A3A3A3] mb-5">
                        Baseado na sua queda de 28% na estabilidade volitiva, a inteligência da MindSeed gerou este micro-protocolo para recalibrar seu foco antes do sono.
                    </p>

                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-between bg-black/50 border border-[#D4AF37]/30 hover:border-[#D4AF37] p-3 rounded-xl transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <i className="fa-solid fa-play text-xs"></i>
                                </div>
                                <span className="text-sm font-bold text-white">Respiração Guiada (Box Breathing)</span>
                            </div>
                            <span className="text-xs font-bold text-[#A3A3A3]">5 min</span>
                        </button>
                        <button className="w-full flex items-center justify-between bg-black/50 border border-[#222222] hover:border-[#D4AF37]/50 p-3 rounded-xl transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#222222] text-[#A3A3A3] flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <i className="fa-solid fa-ban text-xs"></i>
                                </div>
                                <span className="text-sm font-bold text-white">Detox Digital (Telas off)</span>
                            </div>
                            <span className="text-xs font-bold text-[#A3A3A3]">60 min</span>
                        </button>
                    </div>
                </div>

                {/* Video Feed */}
                <h3 className="font-bold text-lg mb-4">Micro-Learning <span className="text-[var(--text-muted)] font-normal text-sm ml-2">Pílulas de 3 minutos</span></h3>
                <div className="grid grid-cols-2 gap-4">
                    {/* Video Card 1 */}
                    <div className="flex flex-col gap-2 group cursor-pointer">
                        <div className="w-full h-32 bg-[var(--border-color)] rounded-2xl relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <i className="fa-regular fa-circle-play text-3xl text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"></i>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                3:45
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm leading-tight text-white group-hover:text-[#D4AF37] transition-colors">A Química da Decisão</h4>
                            <p className="text-[10px] text-[var(--text-muted)]">Neurociência Aplicada</p>
                        </div>
                    </div>

                    {/* Video Card 2 */}
                    <div className="flex flex-col gap-2 group cursor-pointer">
                        <div className="w-full h-32 bg-[var(--border-color)] rounded-2xl relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <i className="fa-regular fa-circle-play text-3xl text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"></i>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                4:12
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm leading-tight text-white group-hover:text-[#D4AF37] transition-colors">O Mito da Pressão</h4>
                            <p className="text-[10px] text-[var(--text-muted)]">Psicologia Esportiva</p>
                        </div>
                    </div>
                </div>
            </div>
        </AthleteLayout>
    );
}
