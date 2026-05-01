import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/interactive/Reveal";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./_SectionHeading";
import type { BlockOf } from "./_types";

type Props = BlockOf<"TrustIndicators">;

export function TrustIndicators({ tag, title, titleHtml, cards, partner, bgWhite }: Props) {
  return (
    <section
      className={cn(
        "py-20 max-bp-lg:py-14",
        bgWhite ? "bg-white" : "bg-grey1",
      )}
    >
      <Container>
        <SectionHeading tag={tag} title={title} titleHtml={titleHtml} />

        <div className="mt-12 grid grid-cols-3 gap-4 max-bp-md:grid-cols-1">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <article className="h-full rounded-card border border-grey2 bg-white p-7 shadow-soft transition-colors hover:border-brand1">
                <span className="mb-4 inline-flex size-12 items-center justify-center rounded-[10px] bg-brand1-bg text-brand1">
                  <Icon name={c.icon} size={26} />
                </span>
                <h3 className="mb-2 text-[16px] font-bold text-text1">{c.title}</h3>
                <p className="text-[13px] leading-[1.6] text-text2">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {partner && (
          <div className="mt-10 rounded-card border border-grey2 bg-white p-8 shadow-soft max-bp-md:p-6">
            <div className="grid grid-cols-[2fr_1fr] gap-10 max-bp-lg:grid-cols-1 max-bp-lg:gap-6">
              <div>
                <div className="mb-2 inline-flex items-center rounded-full bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[0.6px] text-brand1">
                  Технологический партнёр · {partner.name}
                </div>
                <p className="text-[14px] leading-[1.65] text-text2">{partner.description}</p>
                {partner.cta && (
                  <div className="mt-4">
                    <Button href={partner.cta.href} variant={partner.cta.variant ?? "secondary"}>
                      {partner.cta.label}
                    </Button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 gap-3 self-center">
                {partner.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-[10px] border border-grey2 bg-grey1 px-4 py-3"
                  >
                    <div className="text-[16px] font-extrabold text-brand1">{m.value}</div>
                    <div className="mt-0.5 text-[11px] leading-[1.4] text-text2">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
