import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { cn } from "@/lib/cn";
import type { BlockOf } from "./_types";

type Props = BlockOf<"FAQ">;

/**
 * JSON-driven FAQ-блок. Использует общий <FaqAccordion /> — единый дизайн
 * со страницами /ai-* (5 features). Native <details>, smooth grid-row anim.
 */
export function FAQ({ title, items, bgGrey }: Props) {
  return (
    <section
      className={cn(
        "py-20 max-bp-lg:py-14",
        bgGrey ? "border-y border-grey2 bg-grey1" : "border-t border-grey2 bg-white",
      )}
    >
      <Container>
        <h2 className="mb-12 text-center text-[clamp(26px,3vw,38px)] font-extrabold tracking-[-0.7px] text-text1">
          {title}
        </h2>
        <FaqAccordion items={items} />
      </Container>
    </section>
  );
}
