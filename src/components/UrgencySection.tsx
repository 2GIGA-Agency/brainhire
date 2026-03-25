export default function UrgencySection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
      <div className="orb-warm w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-amber-500/20 bg-amber-500/[0.03] text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-amber-500/15 flex items-center justify-center mx-auto mb-6">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FBBF24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>

          <div className="section-badge section-badge-warm mx-auto mb-6">
            Прямо сейчас
          </div>

          <h2 className="section-headline text-white mb-6 max-w-2xl mx-auto">
            Пока вы думаете —
            <br />
            <span className="gradient-text-warm">конкуренты нанимают</span>
          </h2>

          <p className="text-slate-300 text-xl leading-relaxed mb-4 max-w-xl mx-auto">
            Если прямо сейчас вам нужно нанять 5–10 человек на склад —
            у вас буквально нет времени на ручной отбор резюме.
          </p>

          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Каждый день промедления — это товары, которые не отгружаются.
            Заказы, которые уходят к конкурентам. Рейтинг, который падает.
            <br />
            <span className="text-amber-400 font-semibold">
              Дайте ИИ-рекрутеру задачу сегодня — и завтра утром получите
              первых кандидатов.
            </span>
          </p>

          {/* Counter block */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            {[
              { value: "247", label: "Компаний уже используют BrainHire", color: "text-indigo-400" },
              { value: "1 840", label: "Вакансий закрыто в этом месяце", color: "text-cyan-400" },
              { value: "3.1 дня", label: "Среднее время закрытия вакансии", color: "text-emerald-400" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className={`text-3xl font-black ${item.color}`}>{item.value}</div>
                <div className="text-slate-500 text-sm mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#demo" className="btn-cta">
              <span>Запустить ИИ-рекрутера прямо сейчас</span>
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
          </div>
          <p className="text-slate-500 text-sm mt-4">
            Первые 14 дней бесплатно · Без карты · Запуск за 10 минут
          </p>
        </div>
      </div>
    </section>
  );
}
