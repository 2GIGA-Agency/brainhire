"use client";

import { useMemo, useState } from "react";
import { Award, Star, Trophy } from "lucide-react";

/**
 * Калькулятор партнёрского cashback. Уровни и ставки 1:1 из старого
 * pages/hr-cashback.html:
 *   Bronze (<= 100 000 ₽)         → 15%
 *   Silver  (100 001 – 500 000 ₽) → 20%
 *   Gold    (> 500 000 ₽)         → 25%
 */

type Tier = {
  name: "Bronze" | "Silver" | "Gold";
  percent: number;
  range: string;
  Icon: typeof Award;
};

const TIERS: Tier[] = [
  { name: "Bronze", percent: 15, range: "до 100 000 ₽", Icon: Award },
  { name: "Silver", percent: 20, range: "100 000 – 500 000 ₽", Icon: Star },
  { name: "Gold", percent: 25, range: "от 500 000 ₽", Icon: Trophy },
];

function detectTier(amount: number): Tier {
  if (amount > 500_000) return TIERS[2]!;
  if (amount > 100_000) return TIERS[1]!;
  return TIERS[0]!;
}

const fmt = (n: number) =>
  n.toLocaleString("ru-RU").replace(/,/g, " ") + " ₽";

export function CashbackCalculator() {
  const [amount, setAmount] = useState(300_000);

  const tier = useMemo(() => detectTier(amount), [amount]);
  const income = useMemo(() => Math.round(amount * (tier.percent / 100)), [amount, tier]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Number.parseInt(e.target.value.replace(/\D/g, ""), 10);
    setAmount(Number.isFinite(raw) ? raw : 0);
  };

  return (
    <div className="rounded-card border border-grey2 bg-white p-8 shadow-soft max-bp-sm:p-6">
      <label
        htmlFor="cashback-amount"
        className="mb-2 block text-[14px] font-semibold text-text1"
      >
        Сумма продаж (₽)
      </label>
      <input
        type="text"
        id="cashback-amount"
        inputMode="numeric"
        value={amount.toLocaleString("ru-RU").replace(/,/g, " ")}
        onChange={onChange}
        placeholder="Например, 300 000"
        className="mb-5 w-full rounded-[8px] border border-grey2 px-4 py-3 text-[16px] outline-none transition-colors focus:border-brand1 focus:shadow-[0_0_0_3px_var(--color-brand1-bg)]"
      />

      <div className="mb-3 flex items-center justify-between rounded-sm bg-grey1 px-4 py-3">
        <span className="text-[14px] text-text2">Ваш уровень:</span>
        <span className="text-[14px] font-bold text-text1">{tier.name}</span>
      </div>
      <div className="mb-3 flex items-center justify-between rounded-sm bg-grey1 px-4 py-3">
        <span className="text-[14px] text-text2">Комиссионная ставка:</span>
        <span className="text-[14px] font-bold text-text1">{tier.percent}%</span>
      </div>

      <div className="mt-5 mb-6 flex items-center justify-between rounded-sm bg-brand1-bg p-4">
        <span className="text-[15px] font-semibold text-text1">Ваш доход:</span>
        <span className="text-[28px] font-black text-brand1">{fmt(income)}</span>
      </div>

      <div className="mt-4 flex flex-col gap-2 rounded-sm bg-grey1 p-4">
        {TIERS.map((t) => {
          const active = t.name === tier.name;
          return (
            <span
              key={t.name}
              className={[
                "flex items-center gap-2 text-[13px] leading-[1.5] transition-colors",
                active ? "font-bold text-text1" : "text-text2",
              ].join(" ")}
            >
              <t.Icon
                size={18}
                strokeWidth={1.8}
                className={active ? "min-w-[18px] text-brand1" : "min-w-[18px] text-text2"}
              />
              {t.name} — {t.range} ({t.percent}%)
            </span>
          );
        })}
      </div>

      <a
        href="https://brainhire.ru/signup"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex w-full items-center justify-center rounded-[8px] bg-brand1 px-5 py-4 text-[15px] font-bold text-white shadow-soft transition-all hover:-translate-y-px hover:bg-brand1-h hover:shadow-md"
      >
        Стать партнёром
      </a>
    </div>
  );
}
