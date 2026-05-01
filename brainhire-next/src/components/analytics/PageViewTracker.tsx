"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

/**
 * Я.Метрика и GTM ловят первичную загрузку через свои inline-скрипты,
 * но клиентскую навигацию Next.js (router.push) — нет. Этот хук шлёт hit
 * на каждое изменение pathname/search.
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const url = searchParams?.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}
