import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/interactive/Reveal";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./_SectionHeading";
import type { BlockOf } from "./_types";

type Props = BlockOf<"RolesGrid">;

export function RolesGrid({ tag, title, titleHtml, sub, items, bgWhite, bgGrey }: Props) {
  return (
    <section
      className={cn(
        "py-20 max-bp-lg:py-14",
        bgGrey && "border-y border-grey2 bg-grey1",
        bgWhite && "bg-white",
      )}
    >
      <Container>
        <SectionHeading tag={tag} title={title} titleHtml={titleHtml} sub={sub} />
        <div className="mt-12 grid grid-cols-2 gap-5 max-bp-md:grid-cols-1">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <article className="h-full rounded-card border border-grey2 bg-white p-7 shadow-soft transition-all duration-200 hover:border-brand1 hover:shadow-md max-bp-sm:p-5">
                <span className="mb-4 inline-flex size-12 items-center justify-center rounded-[10px] bg-brand1-bg text-brand1">
                  <Icon name={it.icon} size={28} />
                </span>
                <h3 className="text-[18px] font-extrabold leading-[1.3] text-text1">{it.title}</h3>
                <p className="mt-3 text-[13px] leading-[1.6] text-text2">{it.duties}</p>
                {it.criteria.length > 0 && (
                  <>
                    <div className="mt-5 mb-2 text-[11px] font-bold uppercase tracking-[0.6px] text-text2">
                      {it.criteriaLabel ?? "ИИ оценивает:"}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {it.criteria.map((c) => (
                        <span
                          key={c}
                          className="inline-flex rounded-full border border-brand1/20 bg-brand1-bg px-2.5 py-1 text-[11px] font-bold text-brand1"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
