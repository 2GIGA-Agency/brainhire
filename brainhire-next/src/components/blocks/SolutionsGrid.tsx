import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/interactive/Reveal";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./_SectionHeading";
import type { BlockOf } from "./_types";

type Props = BlockOf<"SolutionsGrid">;

export function SolutionsGrid({ tag, title, titleHtml, items, bgGrey }: Props) {
  return (
    <section
      className={cn(
        "py-20 max-bp-lg:py-14",
        bgGrey ? "border-y border-grey2 bg-grey1" : "bg-white",
      )}
    >
      <Container>
        <SectionHeading tag={tag} title={title} titleHtml={titleHtml} />
        <div className="mt-12 grid grid-cols-4 gap-4 max-bp-xl:grid-cols-2 max-bp-sm:grid-cols-1">
          {items.map((it, i) => (
            <Reveal key={it.href} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <Link
                href={it.href}
                className="group relative flex h-full flex-col rounded-card border border-grey2 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand1 hover:shadow-md"
              >
                {it.badge && (
                  <span className="absolute right-4 top-4 inline-flex rounded-full bg-brand2-bg px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.4px] text-brand2">
                    {it.badge}
                  </span>
                )}
                <span className="mb-4 inline-flex size-12 items-center justify-center rounded-[10px] bg-brand1-bg text-brand1 transition-colors group-hover:bg-brand1 group-hover:text-white">
                  <Icon name={it.icon} size={24} />
                </span>
                <h3 className="mb-2 text-[16px] font-bold text-text1 group-hover:text-brand1">
                  {it.label}
                </h3>
                <p className="mb-4 flex-1 text-[13px] leading-[1.6] text-text2">{it.body}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand1">
                  Подробнее
                  <ArrowRight
                    size={14}
                    strokeWidth={2}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
