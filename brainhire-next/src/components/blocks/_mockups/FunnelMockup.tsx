type Tone = "brand1" | "brand2" | "brand3" | "grey";

type Stat = {
  value: string;
  label: string;
  tone?: Tone;
};

type Props = {
  title?: string;
  stats?: Stat[];
  footer?: string;
};

const TONE_BG: Record<Tone, string> = {
  brand1: "bg-brand1-bg border-brand1/20 text-brand1",
  brand2: "bg-brand2-bg border-brand2/20 text-brand2",
  brand3: "bg-brand3/[0.08] border-brand3/20 text-brand3",
  grey: "bg-grey1 border-grey2 text-text2",
};

const DEFAULT: Required<Props> = {
  title: "Все вакансии в одном окне",
  stats: [
    { value: "84", label: "Откликов", tone: "brand1" },
    { value: "22", label: "Релевантных", tone: "brand1" },
    { value: "8", label: "Прошли интервью", tone: "brand2" },
    { value: "3", label: "Финалисты", tone: "brand3" },
  ],
  footer: "Вакансия: <b>Менеджер по продажам</b> | Закрыта за <b>4 дня</b>",
};

export function FunnelMockup(props: Props = {}) {
  const d = { ...DEFAULT, ...props };
  return (
    <div className="bg-white p-5 max-bp-sm:p-3.5">
      <div className="mb-4 text-[15px] font-semibold text-text1">{d.title}</div>
      <div className="mb-3 grid grid-cols-2 gap-2.5">
        {d.stats.map((s, i) => (
          <div
            key={i}
            className={`rounded-[8px] border px-3 py-3 text-center ${TONE_BG[s.tone ?? "brand1"]}`}
          >
            <div className="text-[24px] font-black leading-none">{s.value}</div>
            <div className="mt-0.5 text-[10px] text-text2">{s.label}</div>
          </div>
        ))}
      </div>
      <div
        className="rounded-md border border-grey2 bg-grey1 px-3 py-2.5 text-[11px] leading-[1.5] text-text2 [&_b]:text-brand1"
        dangerouslySetInnerHTML={{ __html: d.footer }}
      />
    </div>
  );
}
