export default function ResultsSection() {
  return (
    <section id="results" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="orb-cyan w-[500px] h-[500px] top-0 right-0 opacity-25" />
      <div className="orb-primary w-[400px] h-[400px] bottom-0 left-0 opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-badge section-badge-green mb-4">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 6l-9.5 9.5-5-5L1 18" />
              <path d="M17 6h6v6" />
            </svg>
            Результаты
          </span>
          <h2 className="section-headline text-white mb-4 mt-4 max-w-3xl mx-auto">
            Что изменится в вашем{" "}
            <span className="gradient-text-green">бизнесе</span>
          </h2>
        </div>

        {/* Before vs After */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Before */}
          <div className="glass-card rounded-3xl p-8 border border-red-500/15">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
              <div>
                <div className="text-red-400 font-bold text-sm uppercase tracking-wider">До BrainHire</div>
                <div className="text-slate-500 text-xs">Стандартный найм</div>
              </div>
            </div>
            <ul className="space-y-4">
              {[
                { text: "2 недели поиска кандидатов", time: "14 дней" },
                { text: "Ручной просмотр 200+ резюме", time: "23 часа" },
                { text: "Телефонные обзвоны кандидатов", time: "8 часов" },
                { text: "Собеседования с неподходящими", time: "12 часов" },
                { text: "Склад в простое или неполный штат", time: "≈ убыток" },
              ].map((item, i) => (
                <li key={i} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/60 flex-shrink-0" />
                    <span className="text-slate-400 text-sm">{item.text}</span>
                  </div>
                  <span className="text-red-400 text-xs font-semibold whitespace-nowrap">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">Итого потрачено:</span>
                <span className="text-red-400 font-bold">~43+ часов вашего времени</span>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="glass-card rounded-3xl p-8 border border-emerald-500/20 bg-emerald-500/[0.03]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div>
                <div className="text-emerald-400 font-bold text-sm uppercase tracking-wider">С BrainHire</div>
                <div className="text-slate-500 text-xs">ИИ-рекрутинг</div>
              </div>
            </div>
            <ul className="space-y-4">
              {[
                { text: "Вакансия опубликована", time: "10 минут" },
                { text: "Все резюме проверены ИИ", time: "автоматически" },
                { text: "Топ-кандидаты отобраны", time: "День 1" },
                { text: "Интервью проведены ИИ-аватаром", time: "День 2" },
                { text: "3 готовых кандидата у вас", time: "День 3" },
              ].map((item, i) => (
                <li key={i} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{item.text}</span>
                  </div>
                  <span className="text-emerald-400 text-xs font-semibold whitespace-nowrap">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">Ваше время:</span>
                <span className="text-emerald-400 font-bold">10 минут настройки</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: "🏭",
              title: "Склад не встаёт",
              desc: "Найм за 3 дня вместо 2 недель. Заказы отгружаются вовремя, рейтинг на маркетплейсе не падает.",
              color: "border-cyan-500/20",
              accent: "text-cyan-400",
            },
            {
              icon: "💰",
              title: "Экономия на штрафах",
              desc: "Нет задержек = нет штрафов от маркетплейса за срывы доставки. ROI от внедрения BrainHire уже в первый месяц.",
              color: "border-indigo-500/20",
              accent: "text-indigo-400",
            },
            {
              icon: "🔄",
              title: "Постоянный поток людей",
              desc: "При высокой текучке BrainHire работает непрерывно. Вы всегда знаете, что завтра есть замена для ушедшего.",
              color: "border-emerald-500/20",
              accent: "text-emerald-400",
            },
          ].map((item, i) => (
            <div key={i} className={`glass-card rounded-2xl p-6 border ${item.color} glass-card-hover`}>
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className={`text-lg font-bold mb-2 ${item.accent}`}>{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
