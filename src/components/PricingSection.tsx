const plans = [
  {
    name: "Старт",
    price: "9 990",
    period: "в месяц",
    description: "Для небольших маркетплейс-команд и ИП",
    features: [
      "До 3 активных вакансий",
      "Публикация на 2 платформах",
      "ИИ-скоринг резюме",
      "Первичное ИИ-интервью",
      "До 50 интервью в месяц",
      "Email-поддержка",
    ],
    cta: "Начать бесплатно",
    highlighted: false,
    badge: null,
  },
  {
    name: "Бизнес",
    price: "24 990",
    period: "в месяц",
    description: "Для маркетплейсов с регулярным наймом",
    features: [
      "До 15 активных вакансий",
      "Публикация на 5 платформах",
      "ИИ-скоринг резюме",
      "Первичное и Real-time ИИ-интервью",
      "Анализ языка тела и мимики",
      "До 300 интервью в месяц",
      "Приоритетная поддержка 24/7",
      "Интеграция с 1С и amoCRM",
    ],
    cta: "Попробовать 14 дней бесплатно",
    highlighted: true,
    badge: "Популярный",
  },
  {
    name: "Корпорат",
    price: "По запросу",
    period: "",
    description: "Для крупных сетей с несколькими складами",
    features: [
      "Неограниченные вакансии",
      "Все платформы размещения",
      "Полный набор ИИ-функций",
      "Неограниченные интервью",
      "Личный менеджер",
      "Онбординг и обучение команды",
      "Кастомные интеграции",
      "SLA 99.9%",
    ],
    cta: "Связаться с нами",
    highlighted: false,
    badge: null,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="orb-primary w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2 opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-badge mb-4">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
            </svg>
            Тарифы
          </span>
          <h2 className="section-headline text-white mb-4 mt-4 max-w-3xl mx-auto">
            Окупается после первого{" "}
            <span className="gradient-text">закрытого найма</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Сравните стоимость BrainHire с тем, сколько стоит простой склада на 1 день.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-3xl p-8 flex flex-col ${
                plan.highlighted
                  ? "bg-gradient-to-b from-indigo-600/20 to-indigo-600/5 border-2 border-indigo-500/40 shadow-xl shadow-indigo-500/20"
                  : "glass-card"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="gradient-bg px-4 py-1.5 rounded-full text-white text-xs font-bold shadow-lg shadow-indigo-500/30">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <div className="text-slate-400 text-sm font-medium mb-1">{plan.name}</div>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-white text-4xl font-black">
                    {plan.price === "По запросу" ? "" : "₽"}
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-slate-500 text-sm mb-1">{plan.period}</span>
                  )}
                  {plan.price === "По запросу" && (
                    <span className="text-white text-2xl font-bold">По запросу</span>
                  )}
                </div>
                <p className="text-slate-500 text-sm">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.highlighted ? "bg-indigo-500/20" : "bg-emerald-500/15"
                      }`}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={plan.highlighted ? "#818CF8" : "#34D399"}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#demo"
                className={
                  plan.highlighted
                    ? "btn-cta text-center"
                    : "btn-secondary text-center"
                }
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-slate-500 text-sm mt-8">
          Все тарифы включают 14-дневный пробный период · Без привязки карты · Отмена в любой момент
        </p>
      </div>
    </section>
  );
}
