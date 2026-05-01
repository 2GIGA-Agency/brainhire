import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "./_SectionHeading";
import { cn } from "@/lib/cn";
import type { BlockOf } from "./_types";

type Props = BlockOf<"Compare">;

const totalToneMap = {
  red: "text-[#F04438]",
  orange: "text-brand2",
  blue: "text-brand1",
} as const;

export function Compare({ title, titleHtml, sub, bgGrey = true, left, right }: Props) {
  return (
    <section
      className={cn(
        "py-20 max-bp-lg:py-14",
        bgGrey && "bg-grey1 border-y border-grey2",
      )}
    >
      <Container>
        <SectionHeading title={title} titleHtml={titleHtml} sub={sub} />
        <div className="mt-12 grid grid-cols-2 gap-5 max-bp-md:grid-cols-1">
          <CompareCol col={left} accent={false} />
          <CompareCol col={right} accent />
        </div>
      </Container>
    </section>
  );
}

function CompareCol({
  col,
  accent,
}: {
  col: Props["left"] | Props["right"];
  accent: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border bg-white shadow-soft",
        accent ? "border-brand1 shadow-[0_8px_28px_-12px_rgba(64,150,255,0.4)]" : "border-grey2",
      )}
    >
      <div className="flex items-center gap-2 border-b border-grey2 bg-grey1 px-6 py-4 text-[14px] font-bold text-text1">
        <span>{col.header}</span>
        {"badge" in col && col.badge && (
          <span className="ml-auto rounded-full bg-brand1 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.4px] text-white">
            {col.badge}
          </span>
        )}
      </div>
      <ul className="divide-y divide-grey2">
        {col.items.map((item) => (
          <li key={item.title} className="flex items-start gap-3 px-6 py-3.5">
            {item.icon && (
              <span className={cn("mt-0.5 shrink-0", accent ? "text-brand1" : "text-brand2")}>
                <Icon name={item.icon} size={22} />
              </span>
            )}
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-text1">{item.title}</div>
              <div className="text-[12px] text-text2">{item.time}</div>
            </div>
          </li>
        ))}
      </ul>
      <div
        className={cn(
          "border-t border-grey2 bg-grey1/50 px-6 py-3.5 text-[14px] font-bold",
          totalToneMap[col.totalTone ?? "blue"],
        )}
      >
        {col.total}
      </div>
    </div>
  );
}
