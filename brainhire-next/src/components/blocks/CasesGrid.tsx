import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/interactive/Reveal";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./_SectionHeading";
import type { BlockOf } from "./_types";

type Props = BlockOf<"CasesGrid">;

export function CasesGrid({ tag, title, titleHtml, items, cta, bgGrey }: Props) {
  return (
    <section
      className={cn(
        "py-20 max-bp-lg:py-14",
        bgGrey ? "border-y border-grey2 bg-grey1" : "border-y border-grey2 bg-white",
      )}
    >
      <Container>
        <SectionHeading tag={tag} title={title} titleHtml={titleHtml} />
        <div className="mt-12 grid grid-cols-3 gap-4 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
          {items.map((item, i) => (
            <Reveal key={item.href + item.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-card border border-grey2 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand1 hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="rounded-full border border-brand1/20 bg-brand1-bg px-2.5 py-0.5 text-[11px] font-bold text-brand1">
                    {item.tag}
                  </span>
                  <span className="text-[11px] font-medium text-text2">{item.date}</span>
                </div>
                <h3 className="mb-2 text-[16px] font-extrabold leading-[1.3] text-text1 group-hover:text-brand1">
                  {item.title}
                </h3>
                <p className="mb-4 text-[13px] leading-[1.6] text-text2">{item.body}</p>
                <div className="mt-auto flex items-center justify-between border-t border-grey1 pt-3.5 text-[12px]">
                  {item.author && <span className="text-text2">{item.author}</span>}
                  {item.readTime && <span className="text-text2">⏱ {item.readTime}</span>}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        {cta && (
          <div className="mt-10 text-center">
            <Button href={cta.href} variant="hero-primary">
              {cta.label}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
