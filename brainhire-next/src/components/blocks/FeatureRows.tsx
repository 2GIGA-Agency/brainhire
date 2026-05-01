import { Container } from "@/components/ui/Container";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./_SectionHeading";
import { MockupByKey } from "./_mockups";
import type { BlockOf } from "./_types";

type Props = BlockOf<"FeatureRows">;

export function FeatureRows({ tag, title, titleHtml, sub, rows, bgGrey }: Props) {
  return (
    <section
      className={cn(
        "py-20 max-bp-lg:py-14",
        bgGrey && "border-y border-grey2 bg-grey1",
      )}
    >
      <Container>
        <SectionHeading tag={tag} title={title} titleHtml={titleHtml} sub={sub} />
        <div className="mt-12 flex flex-col">
          {rows.map((row, idx) => {
            const reverse = row.side === "right";
            return (
              <div
                key={idx}
                className="grid grid-cols-2 items-center gap-14 border-b border-grey2 py-14 last:border-b-0 max-bp-lg:grid-cols-1 max-bp-lg:gap-8"
              >
                <div className={reverse ? "order-2 max-bp-lg:order-2" : "order-1 max-bp-lg:order-2"}>
                  <BrowserShell>
                    <MockupByKey name={row.mockupKey} data={row.mockupData} />
                  </BrowserShell>
                </div>
                <div className={reverse ? "order-1 max-bp-lg:order-1" : "order-2 max-bp-lg:order-1"}>
                  {row.num && (
                    <div className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.5px] text-brand1">
                      {row.num}
                    </div>
                  )}
                  <h3
                    className="mb-3 text-[clamp(20px,2vw,26px)] font-extrabold leading-[1.2] tracking-[-0.4px] text-text1"
                    dangerouslySetInnerHTML={{ __html: row.title }}
                  />
                  <p
                    className="mb-4 text-[14px] leading-[1.72] text-text2"
                    dangerouslySetInnerHTML={{ __html: row.body }}
                  />
                  {row.bullets && row.bullets.length > 0 && (
                    <ul className="mb-5 flex flex-col gap-2">
                      {row.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-[13px] font-medium text-text1"
                        >
                          <Check
                            size={16}
                            strokeWidth={2.5}
                            className="mt-0.5 shrink-0 text-brand1"
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  {(row.cta || row.ctaSecondary) && (
                    <div className="flex flex-wrap items-center gap-3">
                      {row.cta && (
                        <a
                          href={row.cta.href}
                          target={row.cta.external ? "_blank" : undefined}
                          rel={row.cta.external ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center gap-1.5 rounded-[8px] bg-brand1 px-5 py-2.5 text-[13px] font-bold text-white shadow-soft transition-all hover:-translate-y-px hover:bg-brand1-h hover:shadow-md"
                        >
                          {row.cta.label}
                        </a>
                      )}
                      {row.ctaSecondary && (
                        <a
                          href={row.ctaSecondary.href}
                          target={row.ctaSecondary.external ? "_blank" : undefined}
                          rel={row.ctaSecondary.external ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center gap-1.5 rounded-[8px] border border-brand1 bg-white px-5 py-2.5 text-[13px] font-bold text-brand1 transition-all hover:bg-brand1-bg"
                        >
                          {row.ctaSecondary.label}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function BrowserShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-card border border-grey2 bg-white shadow-md">
      <div className="flex gap-1.5 border-b border-grey2 bg-grey1 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#FD6B5B]" />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="size-2.5 rounded-full bg-[#28C840]" />
      </div>
      {children}
    </div>
  );
}
