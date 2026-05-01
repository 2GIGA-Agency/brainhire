import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import type { BlockOf } from "./_types";

type Props = BlockOf<"Logos">;

export function Logos({ label, items, bgWhite }: Props) {
  if (items.length === 0) return null;
  const doubled = [...items, ...items];
  const fadeFrom = bgWhite ? "from-white" : "from-grey1";
  const fadeFromR = bgWhite ? "from-white" : "from-grey1";

  return (
    <section
      className={cn(
        "py-8",
        bgWhite ? "bg-white" : "border-y border-grey2 bg-grey1",
      )}
    >
      {label && (
        <Container className="mb-5 text-center">
          <div className="text-[12px] font-bold uppercase tracking-[1px] text-text2">
            {label}
          </div>
        </Container>
      )}
      <div className="relative overflow-hidden">
        <div className={cn("absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent", fadeFrom)} />
        <div className={cn("absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent", fadeFromR)} />
        <div className="flex w-max gap-12 animate-ticker">
          {doubled.map((item, i) => {
            const inner = item.html ? (
              <span
                className="opacity-85 transition-opacity hover:opacity-100"
                dangerouslySetInnerHTML={{ __html: item.html }}
              />
            ) : (
              <span className="text-[14px] font-bold text-text1 opacity-80 transition-opacity hover:opacity-100">
                {item.label}
              </span>
            );
            return (
              <div
                key={i}
                aria-label={item.label}
                className="flex h-[52px] shrink-0 items-center justify-center px-6 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-grey2"
              >
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
