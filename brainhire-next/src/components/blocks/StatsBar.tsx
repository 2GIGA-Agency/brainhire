import { Container } from "@/components/ui/Container";
import { InlineHtml } from "@/components/ui/InlineHtml";
import type { BlockOf } from "./_types";

type Props = BlockOf<"StatsBar">;

export function StatsBar({ items, note }: Props) {
  return (
    <div className="border-y border-grey2 bg-grey1 py-12">
      <Container>
        <div className="grid grid-cols-4 max-bp-md:grid-cols-2 max-bp-sm:grid-cols-1">
          {items.map((item, idx) => (
            <div
              key={`${item.value}-${idx}`}
              className="px-8 py-3 max-bp-md:border-b max-bp-md:border-grey2 max-bp-md:last:border-b-0 [&:not(:last-child)]:bp-md:border-r [&:not(:last-child)]:bp-md:border-grey2"
            >
              <div className="text-[48px] font-extrabold leading-[1.05] tracking-[-2px] text-text1">
                <span className="text-brand1">{item.value}</span>
              </div>
              {item.labelHtml ? (
                <InlineHtml
                  html={item.label}
                  className="mt-2 block text-[13px] font-medium text-text2"
                />
              ) : (
                <div className="mt-2 text-[13px] font-medium text-text2">{item.label}</div>
              )}
            </div>
          ))}
        </div>
        {note && (
          <p className="mt-4 text-center text-[11px] leading-[1.5] text-text2">{note}</p>
        )}
      </Container>
    </div>
  );
}
