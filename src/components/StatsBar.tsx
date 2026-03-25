export default function StatsBar() {
  const stats = [
    {
      value: "3",
      unit: "дня",
      label: "до первых готовых кандидатов",
      color: "gradient-text",
    },
    {
      value: "52%",
      unit: "",
      label: "времени рекрутера освобождается",
      color: "gradient-text",
    },
    {
      value: "23",
      unit: "часа",
      label: "экономии на просмотре резюме",
      color: "gradient-text",
    },
    {
      value: "×5",
      unit: "",
      label: "быстрее закрытие вакансии",
      color: "gradient-text",
    },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6 overflow-hidden">
      <div className="separator-glow mb-12" />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex items-end justify-center gap-1 mb-2">
                <span className={`number-big ${stat.color}`}>{stat.value}</span>
                {stat.unit && (
                  <span className="text-slate-400 text-xl font-semibold mb-2">
                    {stat.unit}
                  </span>
                )}
              </div>
              <p className="text-slate-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="separator-glow mt-12" />
    </section>
  );
}
