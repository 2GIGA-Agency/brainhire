import { Icon } from "@/components/ui/Icon";

type Source = {
  icon: string;
  title: string;
  sub: string;
  score?: string;
  tone?: "top" | "pending";
};

type Props = {
  title?: string;
  sources?: Source[];
  footer?: string;
};

const DEFAULT: Required<Props> = {
  title: "Источники кандидатов",
  sources: [
    {
      icon: "message-square",
      title: "Telegram-чат",
      sub: "Ссылка отправлена → интервью пройдено",
      score: "92%",
      tone: "top",
    },
    {
      icon: "users",
      title: "Рекомендация коллеги",
      sub: "Ссылка отправлена → интервью пройдено",
      score: "88%",
      tone: "top",
    },
    {
      icon: "bar-chart-3",
      title: "Фриланс-биржа",
      sub: "Ссылка отправлена → ожидает",
      score: "—",
      tone: "pending",
    },
  ],
  footer: "Единая оценка для всех кандидатов — <b>независимо от источника</b>",
};

export function SourcesMockup(props: Props = {}) {
  const d = { ...DEFAULT, ...props };
  return (
    <div className="bg-white p-5 max-bp-sm:p-3.5">
      <div className="mb-4 text-[15px] font-semibold text-text1">{d.title}</div>
      <div className="flex flex-col gap-2.5">
        {d.sources.map((s, i) => {
          const isTop = (s.tone ?? "top") === "top";
          return (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-[8px] border px-3 py-3 ${
                isTop
                  ? "border-brand1/20 bg-brand1-bg"
                  : "border-grey2 bg-grey1"
              }`}
            >
              <div
                className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full ${
                  isTop ? "bg-brand1 text-white" : "bg-grey2 text-text2"
                }`}
              >
                <Icon name={s.icon} size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12px] font-bold text-text1">{s.title}</div>
                <div className="truncate text-[10px] text-text2">{s.sub}</div>
              </div>
              <div
                className={`shrink-0 text-[11px] font-bold ${
                  isTop ? "text-brand1" : "text-text2"
                }`}
              >
                {s.score ?? "—"}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="mt-3 rounded-md border border-grey2 bg-grey1 px-3 py-2.5 text-[11px] leading-[1.5] text-text2 [&_b]:text-brand1"
        dangerouslySetInnerHTML={{ __html: d.footer }}
      />
    </div>
  );
}
