import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "hero-primary" | "hero-outline";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
};

type ButtonButtonProps = CommonProps & {
  href?: undefined;
  external?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

type ButtonProps = LinkButtonProps | ButtonButtonProps;

const base =
  "inline-flex items-center justify-center gap-2 rounded-[8px] font-semibold transition-all duration-200 select-none whitespace-nowrap";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand1 text-white px-5 py-2.5 text-sm hover:bg-brand1-h hover:-translate-y-px hover:shadow-soft",
  secondary:
    "bg-white text-text1 border border-grey2 px-5 py-2.5 text-sm hover:border-brand1 hover:text-brand1 hover:bg-brand1-bg",
  "hero-primary":
    "bg-brand1 text-white px-8 py-4 text-[15px] font-bold shadow-soft hover:bg-brand1-h hover:-translate-y-0.5 hover:shadow-md",
  "hero-outline":
    "bg-white text-text1 border border-grey2 px-8 py-[15px] text-[15px] font-bold hover:border-brand1 hover:text-brand1",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", className, children } = props;
  const classes = cn(base, variantClasses[variant], className);

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
