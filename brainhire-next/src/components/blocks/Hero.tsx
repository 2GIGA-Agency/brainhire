import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { InlineHtml } from "@/components/ui/InlineHtml";
import { Icon } from "@/components/ui/Icon";
import { Check, ArrowRight } from "lucide-react";
import type { BlockOf } from "./_types";

type Props = BlockOf<"Hero">;

export function Hero({ badge, title, titleHtml, sub, primaryCta, secondaryCta, proof, pipeline }: Props) {
  return (
    <section className="bg-white py-20 max-bp-lg:py-14">
      <Container className="grid grid-cols-[1fr_440px] items-center gap-[72px] max-bp-xl:grid-cols-1 max-bp-xl:gap-12">
        <div>
          {badge && (
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand1/30 bg-brand1-bg px-3.5 py-1.5 text-[12px] font-bold text-brand1">
              <span className="size-1.5 rounded-full bg-brand1 animate-pulse-dot" />
              {badge}
            </span>
          )}

          {titleHtml ? (
            <InlineHtml
              as="h1"
              html={title}
              className="text-[clamp(36px,4vw,52px)] font-extrabold leading-[1.1] tracking-[-1.2px] text-text1 [&_em]:not-italic [&_em]:text-brand1"
            />
          ) : (
            <h1 className="text-[clamp(36px,4vw,52px)] font-extrabold leading-[1.1] tracking-[-1.2px] text-text1">
              {title}
            </h1>
          )}

          {sub && (
            <p className="mt-5 max-w-[540px] text-[17px] leading-[1.7] text-text2">{sub}</p>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {primaryCta && (
                <Button href={primaryCta.href} variant="hero-primary">
                  {primaryCta.label}
                  <ArrowRight size={16} strokeWidth={1.8} />
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="hero-outline">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}

          {proof && proof.length > 0 && (
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              {proof.map((p) => (
                <li key={p} className="flex items-center gap-[7px] text-[13px] font-medium text-text2">
                  <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-brand1 bg-brand1-bg text-brand1">
                    <Check size={10} strokeWidth={2.2} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>

        {pipeline && <PipelineCard {...pipeline} />}
      </Container>
    </section>
  );
}

type PipelineProps = NonNullable<Props["pipeline"]>;

function PipelineCard({ title, stages, footer }: PipelineProps) {
  const badgeTone: Record<NonNullable<PipelineProps["stages"][number]["badgeTone"]>, string> = {
    grey: "bg-grey1 text-text2 border-grey2",
    blue: "bg-brand1-bg text-brand1 border-brand1/20",
    orange: "bg-brand2-bg text-brand2 border-brand2/30",
    teal: "bg-brand1-bg text-brand3 border-brand3/20",
  };

  return (
    <aside className="overflow-hidden rounded-card border border-grey2 bg-white shadow-md">
      <div className="flex items-center gap-3 border-b border-grey2 bg-grey1 px-5 py-3.5 text-[12px] font-semibold text-text2">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FD6B5B]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span>{title}</span>
      </div>
      <div className="flex flex-col gap-2 p-3.5">
        {stages.map((stage) => (
          <div
            key={stage.title}
            className="flex items-center justify-between gap-3 rounded-[10px] border border-grey2 bg-grey1 px-3.5 py-2.5"
          >
            <div className="flex items-center gap-3">
              {stage.icon && (
                <span className="text-brand1">
                  <Icon name={stage.icon} size={22} />
                </span>
              )}
              <div>
                <div className="text-[13px] font-bold text-text1">{stage.title}</div>
                {stage.meta && <div className="text-[11px] text-text2">{stage.meta}</div>}
              </div>
            </div>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold whitespace-nowrap ${
                badgeTone[stage.badgeTone ?? "grey"]
              }`}
            >
              {stage.badge}
            </span>
          </div>
        ))}
      </div>
      {footer && (
        <div className="flex items-center gap-2 border-t border-grey2 bg-brand1-bg px-3.5 py-3 text-[12px] font-medium text-text1">
          <InlineHtml html={footer} className="[&_strong]:text-brand1" />
        </div>
      )}
    </aside>
  );
}
