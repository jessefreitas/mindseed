import { Link, usePage } from "@inertiajs/react";

export default function Sidebar() {
    const { url: pathname } = usePage();

    const links = [
        { href: "/admin", label: "Dashboard Geral", icon: "fa-chess-board" },
        { href: "/admin/analytics", label: "Data Discovery", icon: "fa-flask" },
        { href: "/admin/perfil", label: "Perfil Individual", icon: "fa-user-astronaut" },
        { href: "/admin/comparativo", label: "Comparativo", icon: "fa-scale-balanced" },
        { href: "/admin/alertas", label: "Alertas", icon: "fa-triangle-exclamation", alert: 2 },
    ];

    return (
        <aside className="w-64 bg-[var(--bg-card)] border-r border-[var(--border-color)] flex flex-col h-screen fixed left-0 top-0 transition-colors z-20">
            <div className="p-6 border-b border-[var(--border-color)]">
                <h1 className="flex items-center gap-2 font-bold text-xl text-[var(--accent-primary)] mb-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    MINDSEED
                </h1>
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Inteligência Preditiva</span>
            </div>

            <nav className="flex-1 p-4 flex flex-col gap-2">
                {links.map((lnk) => {
                    const isActive = pathname === lnk.href;
                    return (
                        <Link
                            key={lnk.href}
                            href={lnk.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                ? "bg-[var(--accent-primary)] text-white shadow-md"
                                : "text-[var(--text-muted)] hover:bg-[var(--bg-main)] hover:text-[var(--text-main)]"
                                }`}
                        >
                            <i className={`fa-solid ${lnk.icon} w-5 text-center`}></i>
                            {lnk.label}
                            {lnk.alert && (
                                <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-white text-[var(--danger)]' : 'bg-[var(--danger)] text-white'}`}>
                                    {lnk.alert}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-[var(--border-color)]">
                <div className="flex items-center gap-3 mb-4">
                    <img src="https://ui-avatars.com/api/?name=Diretor&background=D4AF37&color=000" alt="User" className="w-10 h-10 rounded-full border border-[var(--border-color)]" />
                    <div className="flex flex-col">
                        <span className="text-sm font-bold">Diretoria</span>
                        <span className="text-xs text-[var(--text-muted)]">Clube Master</span>
                    </div>
                </div>
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border border-[var(--danger)] text-[var(--danger)] hover:bg-[var(--danger)] hover:text-white transition-colors"
                >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    Sair do Sistema
                </Link>
            </div>
        </aside>
    );
}
