import { Container } from "@/components/ui/Container";
import { Construction } from "lucide-react";
import { cn } from "@/lib/cn";
import type { BlockOf } from "./_types";

type Props = BlockOf<"Placeholder">;

export function Placeholder({ title, note, bgWhite }: Props) {
  return (
    <section
      className={cn(
        "border-y border-dashed border-grey2 py-14",
        bgWhite ? "bg-white" : "bg-grey1/50",
      )}
    >
      <Container className="text-center">
        <div className="mx-auto mb-4 inline-flex size-12 items-center justify-center rounded-full bg-brand1-bg text-brand1">
          <Construction size={22} strokeWidth={1.8} />
        </div>
        <h3 className="text-[18px] font-bold text-text1">{title}</h3>
        {note && <p className="mx-auto mt-2 max-w-[540px] text-[13px] text-text2">{note}</p>}
      </Container>
    </section>
  );
}
