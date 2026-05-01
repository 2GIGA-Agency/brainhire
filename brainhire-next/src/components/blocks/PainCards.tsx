import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/interactive/Reveal";
import { SectionHeading } from "./_SectionHeading";
import type { BlockOf } from "./_types";

type Props = BlockOf<"PainCards">;

export function PainCards({ title, titleHtml, sub, items, footnote }: Props) {
  return (
    <section className="py-20 max-bp-lg:py-14">
      <Container>
        <SectionHeading title={title} titleHtml={titleHtml} sub={sub} />
        <div className="mt-12 grid grid-cols-2 gap-4 max-bp-md:grid-cols-1">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <article className="h-full rounded-card border border-grey2 bg-white p-7 shadow-soft transition-all duration-200 hover:border-brand1 hover:shadow-md">
                <span className="mb-3 inline-flex text-brand1">
                  <Icon name={item.icon} size={26} />
                </span>
                <h3 className="mb-2 text-[16px] font-bold text-text1">{item.title}</h3>
                <p className="text-[14px] leading-[1.65] text-text2">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        {footnote && (
          <p className="mt-8 text-[11px] leading-[1.5] text-text2">{footnote}</p>
        )}
      </Container>
    </section>
  );
}
