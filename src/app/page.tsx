export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">

      {/* HEADER */}
      <header className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <span className="font-bold text-2xl tracking-tight">MINDSEED</span>
        </div>
        <nav className="hidden md:flex gap-8 font-medium">
          <a href="#product" className="hover:text-[var(--accent-primary)] transition-colors">Produto</a>
          <a href="#features" className="hover:text-[var(--accent-primary)] transition-colors">Funcionalidades</a>
          <a href="#contact" className="hover:text-[var(--accent-primary)] transition-colors">Contato</a>
        </nav>
        <div className="flex gap-4">
          <a href="/login" className="px-5 py-2 rounded-full font-semibold bg-[var(--accent-primary)] text-white hover:opacity-90 transition-opacity shadow-[0_4px_14px_0_var(--accent-primary)] shadow-opacity-40">
            Acessar Plataforma
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 max-w-5xl mx-auto w-full">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] text-sm font-semibold tracking-wide text-[var(--accent-secondary)]">
          Preditividade & Performance Mental
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          Antecipe Crises. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]">
            Potencialize Atletas.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mb-12">
          A primeira plataforma inteligente do esporte que traduz variáveis comportamentais e emocionais em decisões estratégicas para gestores, clubes e atletas de alto rendimento.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <a href="/login" className="px-8 py-4 rounded-full font-bold text-lg bg-[var(--text-main)] text-[var(--bg-main)] hover:scale-105 transition-transform">
            Conhecer Plataforma
          </a>
          <button className="px-8 py-4 rounded-full font-bold text-lg border-2 border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors">
            Falar com Especialista
          </button>
        </div>
      </main>

      {/* FEATURES MOCK */}
      <section id="features" className="py-20 bg-[var(--bg-card)] mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)] mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Dashboard Executivo</h3>
            <p className="text-[var(--text-muted)]">Visão unificada do plantel com risco de burnout, luto ou quedas de consistência mapeados visualmente.</p>
          </div>
          <div className="p-8 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[var(--accent-secondary)]/10 flex items-center justify-center text-[var(--accent-secondary)] mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Painéis Individuais</h3>
            <p className="text-[var(--text-muted)]">O atleta acessa sua evolução mental e recebe feedbacks automáticos e assessments curáveis diariamente.</p>
          </div>
          <div className="p-8 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[var(--accent-tertiary)]/10 flex items-center justify-center text-[var(--accent-tertiary)] mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">LGPD e Family Control</h3>
            <p className="text-[var(--text-muted)]">Controle integral de proteção de dados e permissões exclusivas para responsáveis de talentos da base (menores).</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-[var(--text-muted)] text-sm border-t border-[var(--border-color)]">
        &copy; {new Date().getFullYear()} MindSeed Inteligência em Alta Performance. Todos os direitos reservados.
      </footer>

    </div>
  );
}
