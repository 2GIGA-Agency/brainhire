import { VacancyMockup } from "./VacancyMockup";
import { ScoringMockup } from "./ScoringMockup";
import { InterviewMockup } from "./InterviewMockup";
import { AvatarMockup } from "./AvatarMockup";
import { FunnelMockup } from "./FunnelMockup";
import { SourcesMockup } from "./SourcesMockup";

const REGISTRY: Record<string, React.ComponentType<Record<string, unknown>>> = {
  vacancy: VacancyMockup as React.ComponentType<Record<string, unknown>>,
  scoring: ScoringMockup as React.ComponentType<Record<string, unknown>>,
  interview: InterviewMockup as React.ComponentType<Record<string, unknown>>,
  avatar: AvatarMockup as React.ComponentType<Record<string, unknown>>,
  funnel: FunnelMockup as React.ComponentType<Record<string, unknown>>,
  sources: SourcesMockup as React.ComponentType<Record<string, unknown>>,
};

export function MockupByKey({
  name,
  data,
}: {
  name?: string;
  data?: Record<string, unknown>;
}) {
  if (!name) return <FallbackMockup label="мокап" />;
  const Comp = REGISTRY[name];
  if (!Comp) return <FallbackMockup label={name} />;
  return <Comp {...(data ?? {})} />;
}

function FallbackMockup({ label }: { label: string }) {
  return (
    <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-brand1-bg via-white to-grey1 px-6 text-center">
      <span className="text-[12px] font-semibold uppercase tracking-[1px] text-text2">
        Мокап «{label}»
      </span>
    </div>
  );
}

export const MOCKUP_KEYS = Object.keys(REGISTRY);
