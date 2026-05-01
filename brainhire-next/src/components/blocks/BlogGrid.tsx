import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/interactive/Reveal";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./_SectionHeading";
import type { BlockOf } from "./_types";

type Props = BlockOf<"BlogGrid">;

export function BlogGrid({ tag, title, titleHtml, cta, items, bgWhite }: Props) {
  return (
    <section
      className={cn(
        "py-20 max-bp-lg:py-14",
        bgWhite ? "bg-white" : "border-t border-grey2 bg-grey1",
      )}
    >
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading tag={tag} title={title} titleHtml={titleHtml} align="left" />
          {cta && (
            <Button href={cta.href} variant="secondary" className="shrink-0">
              {cta.label}
            </Button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-6 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <Link
                href={item.href}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-grey2 bg-white shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand1 hover:shadow-md"
              >
              <div
                className="relative flex aspect-[16/9] items-center justify-center"
                style={item.cover?.gradient ? { background: item.cover.gradient } : undefined}
              >
                {item.cover?.icon && (
                  <span className="text-white/90">
                    <Icon name={item.cover.icon} size={52} strokeWidth={1.8} />
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col px-5 py-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full border border-brand1/20 bg-brand1-bg px-2.5 py-0.5 text-[11px] font-bold text-brand1">
                    {item.tag}
                  </span>
                  <span className="text-[11px] font-medium text-text2">{item.date}</span>
                </div>
                <h3 className="mb-2 text-[16px] font-extrabold leading-[1.35] text-text1 group-hover:text-brand1">
                  {item.title}
                </h3>
                <p className="mb-4 flex-1 text-[13px] leading-[1.65] text-text2">{item.body}</p>
                <div className="mt-auto flex items-center justify-between border-t border-grey1 pt-3.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand1-bg text-[9px] font-extrabold text-brand1">
                      {item.authorInitials}
                    </span>
                    <span className="text-[12px] font-semibold text-text1">{item.author}</span>
                  </div>
                  <div className="flex gap-3 text-[12px] text-text2">
                    {item.likes && <span>♡ {item.likes}</span>}
                    <span>⏱ {item.readTime}</span>
                  </div>
                </div>
              </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
