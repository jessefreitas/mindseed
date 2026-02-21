
export default function Topbar({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <header className="flex items-center justify-between p-6 bg-[var(--bg-main)] border-b border-[var(--border-color)] transition-colors">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)]">{title}</h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">{subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
                <button className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </button>
                <button className="px-4 py-2 bg-[var(--text-main)] text-[var(--bg-main)] rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm">
                    Gerar Relatório (PDF)
                </button>
            </div>
        </header>
    );
}
