import { Sparkles, Plus } from "lucide-react";

type Step = { label: string; variant?: "done" | "active" | "idle" };

type Props = {
  breadcrumb?: string;
  title?: string;
  steps?: Step[];
  cardTitle?: string;
  cardSub?: string;
  infoText?: string;
  infoItems?: string[];
  controlsLabel?: string;
  primaryBtn?: string;
  secondaryBtn?: string;
};

const DEFAULT: Required<Props> = {
  breadcrumb: "BRAIN / Вакансии / Создание вакансии",
  title: "Создание вакансии",
  steps: [
    { label: "✓ Описание вакансии", variant: "done" },
    { label: "✓ Тестирование", variant: "done" },
    { label: "3 Интервью", variant: "active" },
    { label: "4 Предпросмотр", variant: "idle" },
  ],
  cardTitle: "Интервью",
  cardSub: "Добавьте вопросы вручную или сгенерируйте с помощью ИИ",
  infoText: "Вы можете выбрать один из способов создания вопросов:",
  infoItems: [
    "<b>Генерация вопросов с помощью ИИ</b> — выберите количество и нажмите «Сгенерировать»",
    "<b>Добавление вопросов вручную</b> — создайте поля самостоятельно",
    "<b>Комбинированный режим</b> — совместите оба подхода",
  ],
  controlsLabel: "Количество вопросов, которые создаст ИИ: <b>10</b>",
  primaryBtn: "Сгенерировать вопросы с ИИ",
  secondaryBtn: "Добавить вопрос вручную",
};

export function VacancyMockup(props: Props = {}) {
  const d = { ...DEFAULT, ...props };
  return (
    <div className="bg-white p-5 max-bp-sm:p-3.5">
      <div className="mb-3">
        <div className="text-[11px] font-medium text-text2">{d.breadcrumb}</div>
        <div className="mt-1 text-[18px] font-extrabold text-text1">{d.title}</div>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {d.steps.map((s, i) => (
          <Pill key={i} variant={s.variant ?? "idle"}>
            {s.label}
          </Pill>
        ))}
      </div>

      <div className="rounded-[10px] border border-grey2 bg-grey1 p-4">
        <div className="text-[14px] font-bold text-text1">{d.cardTitle}</div>
        <div className="mt-1 text-[12px] text-text2">{d.cardSub}</div>

        <div className="mt-3 rounded-[8px] bg-brand1-bg/60 p-3 text-[12px] leading-[1.55] text-text1">
          <div className="font-medium">{d.infoText}</div>
          <ul className="mt-1.5 flex flex-col gap-1">
            {d.infoItems.map((it, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: `• ${it}` }} />
            ))}
          </ul>
        </div>

        <div className="mt-3">
          <div
            className="text-[11px] font-medium text-text2 [&_b]:text-text1"
            dangerouslySetInnerHTML={{ __html: d.controlsLabel }}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex items-center gap-1.5 rounded-[6px] bg-brand1 px-3 py-2 text-[12px] font-bold text-white"
            >
              <Sparkles size={14} strokeWidth={2} />
              {d.primaryBtn}
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex items-center gap-1.5 rounded-[6px] border border-grey2 bg-white px-3 py-2 text-[12px] font-semibold text-text1"
            >
              <Plus size={14} strokeWidth={2} />
              {d.secondaryBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({
  variant,
  children,
}: {
  variant: "done" | "active" | "idle";
  children: React.ReactNode;
}) {
  const cls =
    variant === "active"
      ? "bg-brand1 text-white border-brand1"
      : variant === "done"
        ? "bg-brand1-bg text-brand1 border-brand1/20"
        : "bg-white text-text2 border-grey2";
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold ${cls}`}
    >
      {children}
    </span>
  );
}
