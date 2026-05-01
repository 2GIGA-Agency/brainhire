// Тонкая прослойка над Yandex.Metrika и Google Tag Manager.
// ID счётчика и GTM-контейнер взяты из старой React-версии (frontend-react).

export const YM_COUNTER_ID = 99950315;
export const GTM_ID = "GTM-TXMBV9VM";

/**
 * Имена целей в Я.Метрике взяты из старой React-версии 1:1, чтобы сохранить
 * непрерывность статистики. Не семантические — это автогенерация CSS-modules
 * именно тех форм. Менять нельзя — потеряем историческую конверсию.
 */
export const YM_GOALS = {
  /** submit главной демо-формы (лиды) */
  leadForm: "sent_form_SolutionForm_form__JYK9w",
  /** submit формы логина */
  login: "sent_form_SelectDomain_form__ef_Zj",
  /** submit формы регистрации */
  signup: "sent_form_SignUp_form__J_nFy",
} as const;

export type GoalName = (typeof YM_GOALS)[keyof typeof YM_GOALS];

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Безопасный вызов цели Я.Метрики (no-op при AdBlock или SSR). */
export function reachGoal(goal: GoalName): void {
  if (typeof window === "undefined") return;
  if (typeof window.ym === "function") {
    window.ym(YM_COUNTER_ID, "reachGoal", goal);
  }
  // GTM-аналог — отправляем то же событие в dataLayer
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: goal });
  }
}

/** Hit на смену маршрута в SPA (Next.js client navigation). */
export function trackPageView(url: string): void {
  if (typeof window === "undefined") return;
  if (typeof window.ym === "function") {
    window.ym(YM_COUNTER_ID, "hit", url);
  }
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: "pageview", page: url });
  }
}
