import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export type FaqItem = { q: string; a: string };

type Props = {
  items: FaqItem[];
  className?: string;
};

/**
 * Единый FAQ-аккордеон. 1:1 с pages/shared/components.css `.faq-*`:
 *   max-width 860px, padding 22px y, иконка Plus 22px (rotate-45 при open),
 *   border-b grey2 между пунктами + border-t на первом, hover/open → brand1,
 *   плавная развёртка ответа через grid-template-rows: 0fr → 1fr (0.35s).
 *
 * Native <details>/<summary> — работает без JS, плавная анимация —
 * чисто CSS (поддерживается во всех evergreen-браузерах).
 */
export function FaqAccordion({ items, className }: Props) {
  return (
    <ul className={cn("mx-auto max-w-[860px]", className)}>
      {items.map((item, i) => (
        <li key={i} className="border-b border-grey2 first:border-t">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-[22px] text-left text-[15px] font-semibold text-text1 transition-colors hover:text-brand1 group-open:text-brand1 [&::-webkit-details-marker]:hidden">
              <span>{item.q}</span>
              <Plus
                size={22}
                strokeWidth={1.8}
                className="shrink-0 text-grey4 transition-transform duration-300 group-hover:text-brand1 group-open:rotate-45 group-open:text-brand1"
              />
            </summary>
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[350ms] ease-out group-open:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <p className="max-w-[780px] pb-[22px] text-[14px] leading-[1.75] text-text2">
                  {item.a}
                </p>
              </div>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
