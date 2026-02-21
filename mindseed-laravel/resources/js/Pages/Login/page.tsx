"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock login delay
        setTimeout(() => {
            // For now, redirect to the Admin Dashboard (to be developed)
            router.push("/admin");
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 px-4">
            <div className="w-full max-w-md p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl relative overflow-hidden">

                {/* Decorative flair */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)]"></div>

                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">MindSeed Login</h2>
                    <p className="text-sm text-[var(--text-muted)] mt-1">Acesso à Plataforma de Inteligência</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">E-mail ou CPF</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all"
                            placeholder="gestor@clube.com"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-medium">Senha</label>
                            <a href="#" className="text-xs text-[var(--accent-primary)] hover:underline">Esqueceu a senha?</a>
                        </div>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-2 rounded-lg font-bold bg-[var(--text-main)] text-[var(--bg-main)] hover:opacity-90 transition-opacity disabled:opacity-70 flex justify-center"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-[var(--bg-main)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : "Entrar na Plataforma"}
                    </button>
                </form>

                <div className="mt-8 text-center text-xs text-[var(--text-muted)]">
                    Proteger dados é nossa prioridade. <br />
                    Veja nossa <a href="/termos" className="text-[var(--accent-primary)] hover:underline">Política de Privacidade (LGPD)</a>.
                </div>
            </div>
        </div>
    );
}
