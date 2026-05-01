import { Activity } from "lucide-react";

type Props = {
  tabs?: string[];
  activeTabIndex?: number;
  avatarLabel?: string;
  analysis?: Array<{ label: string; value: number }>;
};

const DEFAULT: Required<Props> = {
  tabs: ["Интервью", "Тестирование", "Real-time avatar"],
  activeTabIndex: 2,
  avatarLabel: "ИИ-аватар BRaiN HR",
  analysis: [
    { label: "Уверенность", value: 82 },
    { label: "Коммуникация", value: 74 },
    { label: "Культурный фит", value: 91 },
    { label: "Стрессоустойчивость", value: 68 },
  ],
};

export function AvatarMockup(props: Props = {}) {
  const d = { ...DEFAULT, ...props };
  return (
    <div className="bg-white">
      <div className="flex border-b border-grey2 bg-grey1 px-5">
        {d.tabs.map((t, i) => (
          <Tab key={t} active={i === d.activeTabIndex}>
            {t}
          </Tab>
        ))}
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-4 max-bp-sm:grid-cols-1">
          <div className="flex aspect-square flex-col items-center justify-center gap-3 rounded-[12px] bg-gradient-to-br from-brand3 to-[#1a6b8a] text-white">
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-white/20 text-brand1-bg">
              <Activity size={28} strokeWidth={1.8} className="text-white" />
            </span>
            <div className="text-[12px] font-semibold uppercase tracking-[0.5px] text-white/90">
              {d.avatarLabel}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-3 rounded-[12px] border border-grey2 bg-grey1 p-4">
            {d.analysis.map((row) => (
              <div key={row.label} className="grid grid-cols-[100px_1fr_36px] items-center gap-2">
                <div className="text-[11px] font-semibold text-text2">{row.label}</div>
                <div className="h-2 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-brand1"
                    style={{ width: `${row.value}%` }}
                  />
                </div>
                <div className="text-right text-[12px] font-bold text-brand1">{row.value}%</div>
              </div>
            ))}
          </div>
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
