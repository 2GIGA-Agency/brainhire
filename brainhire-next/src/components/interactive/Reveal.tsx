"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Тег обёртки, по умолчанию div. */
  as?: ElementType;
  /** Доп. классы. */
  className?: string;
  /** Задержка появления — конвертируется в data-d атрибут (1|2|3). */
  delay?: 1 | 2 | 3;
};

/**
 * Reveal-анимация при попадании в viewport.
 * Стили на data-reveal/data-visible определены в globals.css.
 * При prefers-reduced-motion элемент сразу видим (без анимации).
 */
export function Reveal({ children, as: Tag = "div", className, delay }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.dataset.visible = "true";
      return;
    }

    // Если элемент уже находится во viewport на момент монтирования
    // (или после SPA-навигации) — помечаем сразу, не дожидаясь IO callback,
    // который в hydration-race может проспать initial entry.
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      el.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dataDelay = delay ? { "data-d": String(delay) } : {};

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      {...dataDelay}
      {...(className ? { className } : {})}
    >
      {children}
    </Tag>
  );
}
