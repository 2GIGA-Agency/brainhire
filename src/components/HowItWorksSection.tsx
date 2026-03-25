const steps = [
  {
    number: "1",
    time: "10 минут",
    title: "Расскажите о вакансии",
    description:
      "Заполните простую форму: должность, требования, условия работы. Никаких HR-терминов и сложных систем — только ответы на понятные вопросы.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    color: "from-indigo-500 to-indigo-400",
    bgColor: "bg-indigo-500/10",
  },
  {
    number: "2",
    time: "Автоматически",
    title: "ИИ публикует вакансию везде",
    description:
      "BrainHire создаёт профессиональный текст вакансии и мгновенно публикует его на hh.ru, Avito, SuperJob и других платформах. Охват — максимальный.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
    color: "from-cyan-500 to-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
  {
    number: "3",
    time: "Каждый отклик",
    title: "ИИ скорит и фильтрует резюме",
    description:
      "Каждый новый отклик автоматически анализируется и ранжируется. Нерелевантные отсеиваются. Вы видите только тех, кто реально подходит.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    ),
    color: "from-violet-500 to-violet-400",
    bgColor: "bg-violet-500/10",
  },
  {
    number: "4",
    time: "День 1–2",
    title: "ИИ проводит интервью за вас",
    description:
      "Топ-кандидаты автоматически получают приглашение на ИИ-интервью. Система оценивает их ответы, проверяет честность и формирует итоговый отчёт.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    color: "from-emerald-500 to-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    number: "5",
    time: "Утро 3-го дня",
    title: "Вы получаете 3 готовых кандидата",
    description:
      "Вы открываете утреннее уведомление и видите: 3 кандидата прошли все этапы, готовы к работе, с подробными отчётами. Просто позвоните им.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    color: "from-amber-500 to-orange-400",
    bgColor: "bg-amber-500/10",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="orb-primary w-[500px] h-[500px] bottom-0 right-0 opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-badge mb-4">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
            Как работает
          </span>
          <h2 className="section-headline text-white mb-4 mt-4 max-w-3xl mx-auto">
            От задачи до кандидата —{" "}
            <span className="gradient-text">за 3 дня</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Пока вы занимаетесь бизнесом, BrainHire работает в фоне
            и присылает вам результат.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line on desktop */}
          <div className="hidden md:block absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-indigo-500/50 via-cyan-500/30 to-amber-500/50" />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 md:gap-8 items-start">
                {/* Step number circle */}
                <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg text-white`}>
                  {step.icon}
                  {/* Connector dot */}
                </div>

                {/* Content */}
                <div className="flex-1 glass-card rounded-2xl p-6 glass-card-hover">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-black text-slate-600 font-mono">
                          ШАГ {step.number}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${step.bgColor} text-slate-300`}
                        >
                          {step.time}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-xl">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">
            Итого: вы потратили{" "}
            <span className="text-white font-semibold">10 минут</span> на настройку —
            BrainHire сделал всё остальное
          </p>
          <a href="#demo" className="btn-cta">
            <span>Попробовать прямо сейчас</span>
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
      </div>
    </section>
  );
}
