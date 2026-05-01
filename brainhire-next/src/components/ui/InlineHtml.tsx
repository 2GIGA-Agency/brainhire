import type { ElementType, ComponentProps } from "react";

type InlineHtmlProps<T extends ElementType> = {
  as?: T;
  html: string;
  className?: string;
} & Omit<ComponentProps<T>, "as" | "className" | "dangerouslySetInnerHTML" | "children">;

/**
 * Безопасно для контента из репозитория (JSON под git, code review).
 * Поддерживает простой inline-HTML: <em>, <br>, <strong>.
 */
export function InlineHtml<T extends ElementType = "span">({
  as,
  html,
  className,
  ...rest
}: InlineHtmlProps<T>) {
  const Tag = (as ?? "span") as ElementType;
  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
      {...rest}
    />
  );
}
