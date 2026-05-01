"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Глобальный observer плавного появления секций.
 *
 * Сканирует все `<section>` элементы в DOM, помечает их `data-reveal=""`
 * и подписывает на единственный IntersectionObserver. Когда секция
 * попадает в viewport — выставляет `data-visible="true"` и отписывается.
 *
 * Стили перехода (opacity/translateY) определены в globals.css.
 *
 * Уважает `prefers-reduced-motion` — при включённой настройке элементы
 * сразу показываются как видимые, без анимации.
 *
 * Точечные `<Reveal delay={1|2|3}>` для каскадных эффектов внутри
 * сеток продолжают работать параллельно (используют те же data-атрибуты).
 *
 * Re-сканирует DOM при смене pathname (SPA-навигация в App Router).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Все верхнеуровневые секции страницы. Уже помеченные элементы (через
    // <Reveal>) пропускаем — у них своя обёртка-observer.
    const sections = Array.from(document.querySelectorAll("main section")) as HTMLElement[];

    if (reduced) {
      // Без анимации — просто помечаем как видимые
      for (const el of sections) {
        el.dataset.reveal = "";
        el.dataset.visible = "true";
      }
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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    for (const el of sections) {
      // Если элемент уже находится во viewport на момент монтирования
      // (верх страницы) — подсвечиваем сразу, чтобы не было flash от 0→1.
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
      el.dataset.reveal = "";
      if (inView) {
        el.dataset.visible = "true";
      } else {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
