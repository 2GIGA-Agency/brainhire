import type { LucideIcon, LucideProps } from "lucide-react";
import * as Icons from "lucide-react";

type IconProps = Omit<LucideProps, "ref"> & {
  name: string;
};

const ICON_REGISTRY = Icons as unknown as Record<string, LucideIcon>;

function toPascal(name: string): string {
  return name
    .split(/[-_\s]+/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

export function Icon({ name, size = 22, strokeWidth = 1.8, ...rest }: IconProps) {
  const Component = ICON_REGISTRY[toPascal(name)];
  if (!Component) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`<Icon> unknown name: "${name}"`);
    }
    return null;
  }
  return <Component size={size} strokeWidth={strokeWidth} {...rest} />;
}
