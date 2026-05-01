import { InlineHtml } from "@/components/ui/InlineHtml";
import { cn } from "@/lib/cn";

type Props = {
  title: string;
  titleHtml?: boolean;
  sub?: string;
  tag?: string;
  align?: "center" | "left";
  className?: string;
};

/**
 * Дефолт — left (соответствует .section-title без text-align в reference).
 * Когда нужен центр — пробрасываем align="center" (например FAQ).
 */
export function SectionHeading({
  title,
  titleHtml,
  sub,
  tag,
  align = "left",
  className,
}: Props) {
  const isCenter = align === "center";
  return (
    <div className={cn(isCenter && "text-center", className)}>
      {tag && (
        <div className="mb-4 inline-flex items-center rounded-full bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[0.8px] text-brand1">
          {tag}
        </div>
      )}
      {titleHtml ? (
        <InlineHtml
          as="h2"
          html={title}
          className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1 [&_em]:not-italic [&_em]:text-brand1"
        />
      ) : (
        <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
          {title}
        </h2>
      )}
      {sub && (
        <p
          className={cn(
            "mt-3 max-w-[540px] text-[15px] leading-[1.72] text-text2",
            isCenter && "mx-auto",
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
