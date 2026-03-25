export default function ProblemSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="orb-warm w-[500px] h-[500px] top-0 left-[20%] opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Badge */}
        <div className="text-center mb-12">
          <span className="section-badge section-badge-warm">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            Узнаёте себя?
          </span>
        </div>

        {/* Headline */}
        <h2 className="section-headline text-center text-white mb-4 max-w-3xl mx-auto">
          Сценарий, который{" "}
          <span className="gradient-text-warm">стоит вам денег</span>{" "}
          каждый день
        </h2>
        <p className="text-center text-slate-400 text-lg max-w-2xl mx-auto mb-16">
          Проблема не в кандидатах. Проблема в том, что вы тратите на отбор время,
          которого нет.
        </p>

        {/* Pain points timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              ),
              title: "Нет рекрутера — некому заниматься",
              desc: "Или рекрутер есть, но перегружен. Собственник сам смотрит резюме в 11 вечера после того, как разгрёб операционку.",
              color: "border-red-500/20 bg-red-500/5",
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
                  <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                  <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />
                  <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />
                  <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" />
                  <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
                  <path d="M10 9.5c0 .83-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5S2.67 8 3.5 8h5c.83 0 1.5.67 1.5 1.5z" />
                  <path d="M8.5 5H10V3.5c0-.83-.67-1.5-1.5-1.5S7 2.67 7 3.5 7.67 5 8.5 5z" />
                </svg>
              ),
              title: "200+ откликов — и всё не то",
              desc: "Сотни резюме комплектовщиков без опыта, без нужных навыков. Найти одного подходящего — как иголку в стоге сена.",
              color: "border-amber-500/20 bg-amber-500/5",
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3h18v18H3z" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              ),
              title: "Склад встаёт — деньги уходят",
              desc: "Каждый день без укомплектованного склада — это просроченные заказы, штрафы маркетплейса, потерянный рейтинг и злые клиенты.",
              color: "border-red-500/20 bg-red-500/5",
            },
          ].map((item, i) => (
            <div key={i} className={`glass-card rounded-2xl p-6 border ${item.color} relative overflow-hidden`}>
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2 leading-tight">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Cost calculation block */}
        <div className="glass-card rounded-3xl p-8 md:p-10 border border-red-500/15 bg-red-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-500/5 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="flex-1">
                <div className="section-badge section-badge-warm mb-4">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Считаем потери
                </div>
                <h3 className="text-white text-2xl font-bold mb-3">
                  Сколько стоит 2 недели простоя?
                </h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  При обороте маркетплейса от 3 млн ₽/мес каждый день задержки найма
                  может обходиться в{" "}
                  <span className="text-red-400 font-semibold">100 000–500 000 ₽</span> упущенной
                  выручки и штрафов.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  А стандартный процесс найма через ручной отбор занимает{" "}
                  <span className="text-amber-400 font-semibold">10–14 рабочих дней</span> — это
                  2 полные недели, пока склад работает в половину силы.
                </p>
              </div>

              {/* Comparison */}
              <div className="flex flex-col gap-3 w-full md:w-auto md:min-w-[280px]">
                <div className="glass-card rounded-xl p-4 border border-red-500/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Обычный найм</span>
                    <span className="text-xs font-semibold text-red-400">Сейчас</span>
                  </div>
                  <div className="text-2xl font-black text-red-400">14 дней</div>
                  <div className="text-xs text-slate-500 mt-1">от публикации до выхода</div>
                </div>
                <div className="flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </div>
                <div className="glass-card rounded-xl p-4 border border-emerald-500/20 bg-emerald-500/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">BrainHire</span>
                    <span className="text-xs font-semibold text-emerald-400">С ИИ</span>
                  </div>
                  <div className="text-2xl font-black text-emerald-400">3 дня</div>
                  <div className="text-xs text-slate-500 mt-1">первые кандидаты утром</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
