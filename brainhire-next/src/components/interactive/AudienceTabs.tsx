"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Check } from "lucide-react";

export type AudienceItem = {
  tab: string;
  /** Заголовок карточки (можно ReactNode, чтобы поддерживать em внутри title из HTML). */
  title: ReactNode;
  /** Текст-описание под заголовком. */
  body: string;
  /** Чек-список под описанием. */
  checks: string[];
  /** Метрики справа. */
  stats: { num: string; desc: string }[];
};

type Props = {
  audiences: AudienceItem[];
  /** Дополнительные классы на контейнере вкладок. */
  tabsClassName?: string;
  /** Дополнительные классы на карточке. */
  cardClassName?: string;
};

const DEFAULT_TABS_CLS = "mt-10 flex flex-wrap gap-2";
const DEFAULT_CARD_CLS =
  "grid grid-cols-2 items-center gap-12 rounded-card border border-grey2 bg-white p-10 shadow-soft max-bp-lg:grid-cols-1 max-bp-lg:gap-8 max-bp-sm:p-6";

export function AudienceTabs({ audiences, tabsClassName, cardClassName }: Props) {
  const [active, setActive] = useState(0);
  const card = audiences[active] ?? audiences[0];
  if (!card) return null;

  return (
    <>
      <div className={tabsClassName ?? DEFAULT_TABS_CLS}>
        {audiences.map((a, i) => {
          const isActive = i === active;
          return (
            <button
              key={a.tab}
              type="button"
              onClick={() => setActive(i)}
              className={[
                "rounded-full border px-5 py-2.5 text-[13px] font-semibold transition-colors",
                isActive
                  ? "border-brand1 bg-brand1 text-white"
                  : "border-grey2 bg-white text-text2 hover:border-brand1 hover:text-brand1",
              ].join(" ")}
            >
              {a.tab}
            </button>
          );
        })}
      </div>

      <div className={cardClassName ?? DEFAULT_CARD_CLS + " mt-10"}>
        <div>
          <h3 className="mb-4 text-[clamp(22px,2.5vw,30px)] font-extrabold leading-[1.2] tracking-[-0.5px] text-text1">
            {card.title}
          </h3>
          <p className="mb-6 text-[14px] leading-[1.72] text-text2">{card.body}</p>
          <ul className="flex flex-col gap-2.5">
            {card.checks.map((c) => (
              <li
                key={c}
                className="flex items-start gap-2 text-[13px] font-medium leading-[1.4] text-text1"
              >
                <Check
                  size={14}
                  strokeWidth={2.5}
                  className="mt-0.5 shrink-0 text-brand1"
                />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-8">
          {card.stats.map((st) => (
            <div key={`${st.num}-${st.desc}`} className="text-center">
              <div className="text-[36px] font-extrabold leading-none tracking-[-1px] text-brand1">
                {st.num}
              </div>
              <div
                className="mt-1.5 text-[12px] font-medium text-text2"
                style={{ whiteSpace: "pre-line" }}
              >
                {st.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
