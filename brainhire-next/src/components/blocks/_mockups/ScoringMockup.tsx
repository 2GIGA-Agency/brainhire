type Tone = "top" | "mid" | "low";

type Candidate = {
  initials: string;
  name: string;
  role: string;
  score: string;
  tone?: Tone;
};

type Props = {
  title?: string;
  candidates?: Candidate[];
};

const DEFAULT_CANDIDATES: Candidate[] = [
  { initials: "АМ", name: "Алексей Морозов", role: "Senior Backend · Go, PostgreSQL", score: "98%", tone: "top" },
  { initials: "ЕС", name: "Екатерина Смирнова", role: "Backend · Python, FastAPI", score: "91%", tone: "top" },
  { initials: "ДК", name: "Дмитрий Козлов", role: "Middle · PHP, Laravel", score: "54%", tone: "mid" },
  { initials: "ИП", name: "Иван Петров", role: "Junior · Java", score: "31%", tone: "low" },
];

const SCORE_TONE: Record<Tone, string> = {
  top: "bg-brand1-bg text-brand1",
  mid: "bg-grey1 text-text2",
  low: "bg-brand2-bg text-brand2",
};

const AVATAR_TONE: Record<Tone, { bg: string; fg: string }> = {
  top: { bg: "rgba(64,150,255,0.15)", fg: "#4096FF" },
  mid: { bg: "#F5F6F8", fg: "#717680" },
  low: { bg: "#F5F6F8", fg: "#717680" },
};

export function ScoringMockup({
  title = "Экономьте до <b>23 часов</b> на просмотре резюме и скоринге кандидатов",
  candidates = DEFAULT_CANDIDATES,
}: Props = {}) {
  return (
    <div className="bg-white p-5 max-bp-sm:p-3.5">
      <div
        className="mb-4 text-[15px] font-semibold leading-[1.4] text-text1 [&_b]:text-brand1"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <ul className="flex flex-col gap-2">
        {candidates.map((c, i) => {
          const tone = c.tone ?? "mid";
          const { bg, fg } = AVATAR_TONE[tone];
          return (
            <li
              key={i}
              className={`flex items-center gap-3 rounded-[10px] border bg-white px-3.5 py-2.5 ${
                tone === "top" ? "border-brand1/40 shadow-soft" : "border-grey2"
              }`}
            >
              <span
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-[12px] font-extrabold"
                style={{ background: bg, color: fg }}
              >
                {c.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-bold text-text1">{c.name}</div>
                <div className="truncate text-[11px] text-text2">{c.role}</div>
              </div>
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${SCORE_TONE[tone]}`}
              >
                {c.score}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
