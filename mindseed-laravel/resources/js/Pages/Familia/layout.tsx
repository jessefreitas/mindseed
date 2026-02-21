import { Link, Head } from "@inertiajs/react";

export default function FamilyLayout({ children, title }: { children: React.ReactNode, title?: string }) {
    return (
        <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
            {title && <Head title={title} />}
            <header className="bg-[var(--bg-card)] border-b border-[var(--border-color)] p-4 flex justify-between items-center z-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--warning)] to-[var(--danger)] flex items-center justify-center shadow-lg">
                        <i className="fa-solid fa-users text-white"></i>
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight">MINDSEED</h1>
                        <p className="text-[10px] text-[var(--warning)] uppercase tracking-widest font-bold">Acesso Família / Tutor</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/logout" method="post" as="button" className="relative p-2 text-[var(--bg-main)] bg-[var(--danger)] rounded-full hover:bg-red-600 transition-colors text-xs font-bold px-4">
                        Sair
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex flex-col relative">
                {children}
            </main>
        </div>
    );
}
