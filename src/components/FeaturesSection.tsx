const features = [
  {
    number: "01",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    iconBg: "from-indigo-600 to-indigo-400",
    badge: "Автоматизация",
    title: "Вакансия создана и опубликована за 5 минут",
    description:
      "ИИ сам пишет привлекательный текст вакансии на основе ваших данных и HR-методик. Точно формулирует требования к комплектовщику, грузчику или курьеру склада — чтобы откликались только нужные люди.",
    points: [
      "Готовый текст вакансии без HR-специалиста",
      "Публикация на hh.ru, Avito, SuperJob одним кликом",
      "Персональная ссылка для распространения",
      "По статистике экономит до 52% рабочего времени",
    ],
    accentColor: "text-indigo-400",
    stat: { value: "52%", label: "экономия времени" },
  },
  {
    number: "02",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="M8 11h6M11 8v6" />
      </svg>
    ),
    iconBg: "from-cyan-600 to-cyan-400",
    badge: "Скоринг кандидатов",
    title: "200 резюме проверены за ночь — вы видите только топ-10",
    description:
      "Забудьте о ручном разборе сотен резюме. ИИ мгновенно анализирует каждый отклик: сопоставляет опыт, навыки и образование с требованиями именно вашей вакансии на складе.",
    points: [
      "Мгновенная обработка каждого нового отклика",
      "Объективный скоринг по степени соответствия",
      "Приоритезированный список лучших кандидатов",
      "Экономия до 23 часов на первичном отборе",
    ],
    accentColor: "text-cyan-400",
    stat: { value: "−23ч", label: "на просмотре резюме" },
  },
  {
    number: "03",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="9" cy="10" r="1" fill="white" />
        <circle cx="12" cy="10" r="1" fill="white" />
        <circle cx="15" cy="10" r="1" fill="white" />
      </svg>
    ),
    iconBg: "from-violet-600 to-violet-400",
    badge: "ИИ-интервью",
    title: "Первичный отбор проходит без вашего участия",
    description:
      "ИИ-интервью задаёт всем кандидатам единые структурированные вопросы. Встроенная система прокторинга выявляет использование сторонних подсказок — честность процесса гарантирована.",
    points: [
      "Стандартизированные вопросы для всех кандидатов",
      "Анализ содержания и качества ответов",
      "Прокторинг: ИИ видит попытки мошенничества",
      "Вы видите только прошедших первый отбор",
    ],
    accentColor: "text-violet-400",
    stat: { value: "100%", label: "объективность оценки" },
  },
  {
    number: "04",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M20 21a8 8 0 1 0-16 0" />
        <path d="M15 8a3 3 0 1 0-3-3" strokeDasharray="2 2" />
        <circle cx="19" cy="8" r="2" fill="white" opacity="0.6" />
      </svg>
    ),
    iconBg: "from-emerald-600 to-emerald-400",
    badge: "Real-time интервью",
    title: "ИИ-аватар оценит кандидата лучше, чем HR-специалист",
    description:
      "Для кандидатов, прошедших первичный отбор, ИИ-аватар проводит динамичное второе интервью. Вопросы адаптируются в реальном времени, система анализирует язык тела и мимику.",
    points: [
      "Вопросы адаптируются под ответы кандидата",
      "Анализ язык тела, мимики и soft skills",
      "Психологический портрет по итогам интервью",
      "Оценка соответствия корпоративной культуре",
    ],
    accentColor: "text-emerald-400",
    stat: { value: "×3", label: "глубже оценка кандидата" },
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="orb-primary w-[600px] h-[600px] top-1/2 left-[-200px] opacity-30 -translate-y-1/2" />
      <div className="orb-cyan w-[400px] h-[400px] top-1/2 right-[-100px] opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-badge mb-4">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Возможности
          </span>
          <h2 className="section-headline text-white mb-4 mt-4 max-w-3xl mx-auto">
            Весь цикл найма — от вакансии до{" "}
            <span className="gradient-text">готового кандидата</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            BrainHire автоматизирует каждый этап подбора. Вы тратите время только
            на финальное решение.
          </p>
        </div>

        {/* Features grid */}
        <div className="space-y-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`glass-card rounded-3xl p-8 md:p-10 glass-card-hover ${
                i % 2 === 0 ? "" : ""
              }`}
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: icon + number + content */}
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className={`feature-icon-wrap bg-gradient-to-br ${feature.iconBg} shadow-lg`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <span className="section-badge mb-2 inline-block">
                        {feature.badge}
                      </span>
                      <div className="text-xs font-bold text-slate-600 font-mono">
                        ЭТАП {feature.number}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-white text-2xl font-bold mb-3 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  <ul className="space-y-2.5">
                    {feature.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#34D399"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </div>
                        <span className="text-slate-300 text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: stat card */}
                <div className="lg:w-48 flex lg:flex-col items-center lg:items-start justify-center gap-6 lg:gap-4">
                  <div className="glass-card rounded-2xl p-6 text-center w-full">
                    <div
                      className={`text-4xl font-black mb-1 ${feature.accentColor}`}
                    >
                      {feature.stat.value}
                    </div>
                    <div className="text-xs text-slate-500">{feature.stat.label}</div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    Работает 24/7
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
