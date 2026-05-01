import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/interactive/Reveal";
import { SectionHeading } from "./_SectionHeading";
import type { BlockOf } from "./_types";

import { cn } from "@/lib/cn";

type Props = BlockOf<"Steps">;

export function Steps({ tag, title, titleHtml, sub, steps, bgWhite }: Props) {
  return (
    <section
      className={cn(
        "py-20 max-bp-lg:py-14",
        bgWhite ? "bg-white" : "border-y border-grey2 bg-grey1",
      )}
    >
      <Container>
        <SectionHeading tag={tag} title={title} titleHtml={titleHtml} sub={sub} />
        <div
          className={cn(
            "mt-12 grid gap-4 max-bp-xl:grid-cols-2 max-bp-sm:grid-cols-1",
            steps.length >= 5 ? "grid-cols-5" : "grid-cols-4",
          )}
        >
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <article className="h-full rounded-card border border-grey2 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand1 hover:shadow-md">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.5px] text-brand1">
                    {step.num}
                  </span>
                  {step.time && (
                    <span className="rounded-full bg-brand1-bg px-2 py-0.5 text-[10px] font-bold text-brand1">
                      {step.time}
                    </span>
                  )}
                </div>
                {step.icon && (
                  <span className="mb-3 inline-flex text-brand1">
                    <Icon name={step.icon} size={26} />
                  </span>
                )}
                <h3 className="mb-2 text-[15px] font-bold text-text1">{step.title}</h3>
                <p className="text-[13px] leading-[1.6] text-text2">{step.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
