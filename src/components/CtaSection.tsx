export default function CtaSection() {
  return (
    <section id="demo" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="orb-primary w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="glass-card rounded-3xl p-8 md:p-14 border border-indigo-500/20 overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-600/10 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-cyan-600/5 to-transparent" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              {/* Left content */}
              <div className="flex-1 text-center md:text-left">
                <span className="section-badge mb-5 inline-block">
                  Начните прямо сейчас
                </span>

                <h2 className="section-headline text-white mb-4">
                  3 кандидата —{" "}
                  <span className="gradient-text">завтра утром</span>
                </h2>

                <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
                  Не теряйте деньги на простоях. Зарегистрируйтесь, опишите вакансию
                  за 10 минут — и уже через 3 дня у вас будут готовые люди для выхода
                  на склад.
                </p>

                {/* Form */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="flex-1 px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all text-base"
                  />
                  <a href="#" className="btn-cta whitespace-nowrap">
                    <span>Получить доступ</span>
                    <svg
                      width="16"
                      height="16"
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

                <p className="text-slate-500 text-sm">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                    политикой конфиденциальности
                  </a>
                </p>
              </div>

              {/* Right: Guarantees */}
              <div className="w-full md:w-64 space-y-4">
                {[
                  {
                    icon: "🆓",
                    title: "14 дней бесплатно",
                    desc: "Без карты и скрытых платежей",
                  },
                  {
                    icon: "⚡",
                    title: "Запуск за 10 минут",
                    desc: "Без интеграций и IT-специалиста",
                  },
                  {
                    icon: "🎯",
                    title: "Первые кандидаты за 3 дня",
                    desc: "Гарантируем результат или вернём деньги",
                  },
                  {
                    icon: "🔒",
                    title: "Данные в безопасности",
                    desc: "152-ФЗ, данные хранятся в РФ",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="text-2xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <div className="text-white text-sm font-semibold">
                        {item.title}
                      </div>
                      <div className="text-slate-500 text-xs">{item.desc}</div>
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
