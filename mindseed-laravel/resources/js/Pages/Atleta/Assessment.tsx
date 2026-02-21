import { useState } from 'react';
import AthleteLayout from './layout';
import { Head, router } from '@inertiajs/react';

export default function Assessment() {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        q_sleep: 3,
        q_stress: 3,
        q_energy: 3,
        q_focus: 3,
        notes: '',
    });

    const questions = [
        { id: 'q_sleep', title: 'Como foi o seu sono esta noite?', low: 'Péssimo', high: 'Excelente', icon: 'fa-bed' },
        { id: 'q_stress', title: 'Qual seu nível de estresse atual?', low: 'Muito Baixo', high: 'Isolado/Esgotado', icon: 'fa-bolt', invertColor: true },
        { id: 'q_energy', title: 'Como você avalia sua energia física?', low: 'Exausto', high: 'Pronto pro Jogo', icon: 'fa-battery-full' },
        { id: 'q_focus', title: 'Qual seu nível de foco e concentração?', low: 'Disperso', high: 'Foco Total', icon: 'fa-crosshairs' },
    ];

    const currentQ = questions[step - 1];

    const handleRating = (val: number) => {
        setAnswers({ ...answers, [currentQ.id]: val });
    };

    const nextStep = () => {
        if (step < questions.length + 1) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('atleta.assessment.store'), answers);
    };

    const renderStars = () => {
        const val = answers[currentQ.id as keyof typeof answers] as number;
        return (
            <div className="flex justify-center gap-2 md:gap-4 my-8">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleRating(star)}
                        className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 ${val >= star
                                ? currentQ.invertColor
                                    ? 'bg-[var(--danger)] text-white scale-110 shadow-lg shadow-[var(--danger)]/50'
                                    : 'bg-[var(--accent-primary)] text-white scale-110 shadow-lg shadow-[var(--accent-primary)]/50'
                                : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/50'
                            }`}
                    >
                        {star}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <AthleteLayout title="Assessment Diário">
            <Head title="Assessment Diário" />

            <div className="p-4 md:p-8 max-w-2xl mx-auto w-full flex flex-col h-full min-h-[80vh]">

                <div className="mb-8">
                    <h2 className="text-2xl font-bold font-sans">Assessment Diário</h2>
                    <p className="text-sm text-[var(--text-muted)]">Mapeamento Rápido de Prontidão (RPE)</p>
                </div>

                <div className="card-glass p-6 md:p-10 rounded-3xl flex flex-col flex-1 relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-[var(--border-color)] rounded-full mb-8 overflow-hidden">
                        <div
                            className="h-full bg-[var(--accent-primary)] transition-all duration-500"
                            style={{ width: `${(step / (questions.length + 1)) * 100}%` }}
                        ></div>
                    </div>

                    {step <= questions.length ? (
                        <>
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 mx-auto bg-[var(--bg-main)] rounded-full flex items-center justify-center mb-4 text-2xl text-[var(--accent-primary)]">
                                    <i className={`fa-solid ${currentQ.icon}`}></i>
                                </div>
                                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Pergunta {step} de {questions.length}</span>
                                <h3 className="text-2xl md:text-3xl font-bold mt-2">{currentQ.title}</h3>
                            </div>

                            {renderStars()}

                            <div className="flex justify-between text-sm font-bold text-[var(--text-muted)] px-2">
                                <span>{currentQ.low}</span>
                                <span>{currentQ.high}</span>
                            </div>

                            <div className="mt-auto pt-8 flex justify-between gap-4">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className={`px-6 py-3 rounded-xl font-bold transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'bg-[var(--bg-card)] border border-[var(--border-color)] hover:text-white'}`}
                                >
                                    Voltar
                                </button>
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex-1 bg-[var(--accent-primary)] text-white px-6 py-3 rounded-xl font-bold hover:bg-[var(--accent-secondary)] transition-all"
                                >
                                    Evoluir <i className="fa-solid fa-arrow-right ml-2"></i>
                                </button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={submit} className="flex flex-col flex-1 h-full text-center">
                            <div className="w-20 h-20 mx-auto bg-[var(--success)]/20 text-[var(--success)] rounded-full flex items-center justify-center mb-6 text-4xl">
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Quase lá!</h3>
                            <p className="text-[var(--text-muted)] mb-8">Quer adicionar alguma observação sobre como você está se sentindo hoje?</p>

                            <textarea
                                className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl p-4 text-white focus:outline-none focus:border-[var(--accent-primary)] resize-none h-32 mb-8"
                                placeholder="Senti uma fisgada na coxa ontem, estou preocupado com o stress da escola..."
                                value={answers.notes}
                                onChange={(e) => setAnswers({ ...answers, notes: e.target.value })}
                            ></textarea>

                            <div className="mt-auto pt-8 flex justify-between gap-4">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-6 py-3 rounded-xl font-bold bg-[var(--bg-card)] border border-[var(--border-color)] hover:text-white transition-all"
                                >
                                    Voltar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-[var(--success)] text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all text-lg shadow-lg shadow-[var(--success)]/30"
                                >
                                    Finalizar e Enviar
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </AthleteLayout>
    );
}
