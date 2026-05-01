import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/interactive/Reveal";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./_SectionHeading";
import type { BlockOf } from "./_types";

type Props = BlockOf<"FeaturesGrid">;

/**
 * 2-колоночная сетка карточек: иконка слева, текст справа.
 * Соответствует .features-grid + .feature-card в pages/shared/components.css.
 */
export function FeaturesGrid({ tag, title, titleHtml, sub, items, bgWhite, bgGrey }: Props) {
  return (
    <section
      className={cn(
        "py-20 max-bp-lg:py-14",
        bgGrey ? "border-y border-grey2 bg-grey1" : bgWhite ? "bg-white" : "bg-grey1",
      )}
    >
      <Container>
        <SectionHeading tag={tag} title={title} titleHtml={titleHtml} sub={sub} />
        <div className="mt-12 grid grid-cols-2 gap-4 max-bp-md:grid-cols-1">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <article className="flex h-full items-start gap-5 rounded-card border border-grey2 bg-white p-7 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-brand1 hover:shadow-md max-bp-sm:gap-4 max-bp-sm:p-5">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-[10px] border border-brand1/20 bg-brand1-bg text-brand1">
                  <Icon name={it.icon} size={26} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-2 text-[16px] font-bold text-text1">{it.title}</h3>
                  <p className="text-[13px] leading-[1.65] text-text2">{it.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
