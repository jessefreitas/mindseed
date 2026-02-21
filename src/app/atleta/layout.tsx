import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AthleteLayout({ children }: { children: React.ReactNode }) {
    // It's a server component by default, but we'll cheat a bit with a simple client component wrapper if we need usePathname.
    // Actually, layout can be just UI, but let's make a top nav instead of a sidebar for the athlete (mobile first).
    return (
        <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
            {/* Mobile-friendly Top Navbar for Athletes */}
            <header className="bg-[var(--bg-card)] border-b border-[var(--border-color)] p-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-tertiary)] flex items-center justify-center shadow-lg">
                        <i className="fa-solid fa-leaf text-white"></i>
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight">MINDSEED</h1>
                        <p className="text-[10px] text-[var(--accent-primary)] uppercase tracking-widest font-bold">Portal do Atleta</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
                        <i className="fa-regular fa-bell text-xl"></i>
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[var(--danger)] rounded-full border-2 border-[var(--bg-card)]"></span>
                    </button>
                    <img src="https://ui-avatars.com/api/?name=Lucas+Moura&background=0F172A&color=fff" alt="User" className="w-10 h-10 rounded-full border-2 border-[var(--border-color)]" />
                </div>
            </header>

            <main className="flex-1 flex flex-col relative pb-20 md:pb-0">
                {children}
            </main>

            {/* Mobile Bottom Bar (App-like feel) */}
            <nav className="fixed bottom-0 left-0 w-full bg-[var(--bg-card)] border-t border-[var(--border-color)] flex justify-around p-3 z-50 md:hidden">
                <Link href="/atleta" className="flex flex-col items-center gap-1 text-[var(--accent-primary)]">
                    <i className="fa-solid fa-house"></i>
                    <span className="text-[10px] font-bold">Início</span>
                </Link>
                <Link href="/atleta/testes" className="flex flex-col items-center gap-1 text-[var(--text-muted)]">
                    <i className="fa-solid fa-clipboard-check"></i>
                    <span className="text-[10px] font-bold">Testes</span>
                </Link>
                <Link href="/atleta/conteudo" className="flex flex-col items-center gap-1 text-[var(--text-muted)]">
                    <i className="fa-solid fa-play"></i>
                    <span className="text-[10px] font-bold">Mind</span>
                </Link>
                <Link href="/atleta/perfil" className="flex flex-col items-center gap-1 text-[var(--text-muted)]">
                    <i className="fa-solid fa-user"></i>
                    <span className="text-[10px] font-bold">Conta</span>
                </Link>
            </nav>
        </div>
    );
}
