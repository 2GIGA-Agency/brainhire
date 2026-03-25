export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Background orbs */}
      <div className="orb-primary w-[700px] h-[700px] top-[-200px] left-[-200px] opacity-60" />
      <div className="orb-cyan w-[500px] h-[500px] bottom-[-100px] right-[-100px] opacity-50" />
      <div className="orb-warm w-[400px] h-[400px] top-[30%] right-[10%] opacity-30" />

      {/* Grid dots background */}
      <div className="absolute inset-0 grid-dots opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Industry badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="section-badge section-badge-warm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Для маркетплейсов
          </span>
          <span className="text-slate-500 text-xs hidden sm:inline">
            Wildberries · Ozon · Яндекс Маркет · AliExpress
          </span>
        </div>

        {/* Main headline */}
        <h1 className="hero-headline text-white mb-6 max-w-4xl mx-auto">
          Пока вы читаете{" "}
          <span className="gradient-text-warm">отклики</span> —
          <br />
          <span className="text-slate-300">товары не отгружаются</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
          Дайте ИИ-рекрутеру задачу прямо сейчас. Он пришлёт вам{" "}
          <span className="text-white font-semibold">3 готовых кандидата</span>{" "}
          завтра утром — проверенных, проинтервьюированных, готовых выйти на склад.
        </p>

        <p className="text-base text-slate-500 mb-10">
          Не теряйте деньги на простоях. Склад заработает через{" "}
          <span className="text-amber-400 font-semibold">3 дня</span>, а не через 2 недели.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="#demo" className="btn-cta w-full sm:w-auto">
            <span>Запустить ИИ-рекрутера</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#how-it-works" className="btn-secondary w-full sm:w-auto">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
            </svg>
            Как это работает
          </a>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#34D399">
                <path d="M20 6L9 17l-5-5" stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            Без технических навыков
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            Запуск за 10 минут
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            Публикация на hh.ru, Avito, SuperJob
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            14 дней бесплатно
          </div>
        </div>
      </div>

      {/* Hero visual — dashboard mockup */}
      <div className="relative z-10 mt-16 max-w-4xl mx-auto w-full px-4">
        <div className="glass-card rounded-2xl p-1 shadow-2xl shadow-indigo-500/10">
          <div className="glass-card rounded-xl overflow-hidden">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="flex-1 mx-4 h-6 rounded-md bg-white/5 flex items-center px-3">
                <span className="text-xs text-slate-500">app.brainhire.ru/dashboard</span>
              </div>
            </div>
            {/* Dashboard content */}
            <div className="p-6 bg-[#0B1020]">
              {/* Header row */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-white font-semibold text-lg">ИИ-рекрутер активен</div>
                  <div className="text-slate-500 text-sm mt-0.5">Вакансия: Комплектовщик на склад · 08:42</div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-xs font-medium">Работает</span>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { label: "Откликов получено", value: "247", color: "text-white" },
                  { label: "Проверено ИИ", value: "247", color: "text-indigo-400" },
                  { label: "Прошли интервью", value: "31", color: "text-cyan-400" },
                  { label: "Готовы к найму", value: "3", color: "text-emerald-400" },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card rounded-xl p-3 text-center">
                    <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-xs text-slate-500 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Candidates */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Топ кандидаты — готовы к выходу на работу
                </div>
                {[
                  {
                    name: "Алексей К.",
                    role: "Комплектовщик",
                    match: 97,
                    status: "Готов",
                    statusColor: "bg-emerald-500/20 text-emerald-400",
                    time: "Может выйти завтра",
                  },
                  {
                    name: "Дмитрий В.",
                    role: "Комплектовщик",
                    match: 94,
                    status: "Готов",
                    statusColor: "bg-emerald-500/20 text-emerald-400",
                    time: "Может выйти послезавтра",
                  },
                  {
                    name: "Николай Р.",
                    role: "Комплектовщик",
                    match: 91,
                    status: "Готов",
                    statusColor: "bg-emerald-500/20 text-emerald-400",
                    time: "Через 3 дня",
                  },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {c.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium">{c.name}</div>
                      <div className="text-slate-500 text-xs">{c.time}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs text-slate-500">Совпадение</div>
                        <div className="text-sm font-bold text-white">{c.match}%</div>
                      </div>
                      <div
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${c.statusColor}`}
                      >
                        {c.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
