import { Lock, Video } from "lucide-react";

type Props = {
  tabs?: string[];
  activeTabIndex?: number;
  scoreLabel?: string;
  scoreValue?: string;
  question?: string;
  answer?: string;
  tags?: string[];
};

const DEFAULT: Required<Props> = {
  tabs: ["Интервью", "Тестирование", "Real-time avatar"],
  activeTabIndex: 0,
  scoreLabel: "Оценка интервью:",
  scoreValue: "7.8",
  question:
    "Расскажите о ситуации, когда вы занимались подбором персонала. Какие методы вы использовали для привлечения кандидатов?",
  answer:
    "Я использовал холодный поиск и публиковал вакансии на различных сайтах. Также тестировал различные сторонние сервисы, чтобы проверить их эффективность. Ну и конечно пользовался рекомендациями…",
  tags: ["Прокторинг активен", "Запись ведётся"],
};

const TAG_ICONS: Record<string, React.ReactNode> = {
  "Прокторинг активен": <Lock size={12} strokeWidth={2} className="text-brand1" />,
  "Запись ведётся": <Video size={12} strokeWidth={2} className="text-brand1" />,
};

export function InterviewMockup(props: Props = {}) {
  const d = { ...DEFAULT, ...props };
  return (
    <div className="bg-white max-bp-sm:p-3.5">
      <div className="flex border-b border-grey2 bg-grey1 px-5">
        {d.tabs.map((t, i) => (
          <Tab key={t} active={i === d.activeTabIndex}>
            {t}
          </Tab>
        ))}
      </div>
      <div className="p-5">
        <div className="mb-4 flex items-center gap-2 text-[13px] font-semibold text-text1">
          {d.scoreLabel}
          <span className="inline-flex rounded-md bg-brand1 px-2.5 py-1 text-[12px] font-extrabold text-white">
            {d.scoreValue}
          </span>
        </div>

        <div className="mb-3 rounded-[10px] border border-grey2 bg-grey1 px-4 py-3 text-[13px] leading-[1.55] text-text1">
          <span className="font-semibold text-brand1">Q.</span> {d.question}
        </div>

        <div className="rounded-[10px] border border-grey2 bg-white px-4 py-3 text-[13px] leading-[1.55] text-text2">
          <span className="font-semibold text-text1">A.</span> {d.answer}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {d.tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 rounded-full border border-grey2 bg-grey1 px-2.5 py-1 text-[11px] font-bold text-text1"
            >
              {TAG_ICONS[tag] ?? <Lock size={12} strokeWidth={2} className="text-brand1" />}
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Tab({
  active,
  children,
}: {
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center px-4 py-3 text-[12px] font-semibold ${
        active ? "border-b-2 border-brand1 text-brand1" : "text-text2"
      }`}
    >
      {children}
    </span>
  );
}
