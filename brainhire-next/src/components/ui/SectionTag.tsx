import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionTagProps = {
  children: ReactNode;
  className?: string;
};

export function SectionTag({ children, className }: SectionTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[0.8px] text-brand1",
        className,
      )}
    >
      {children}
    </span>
  );
}
