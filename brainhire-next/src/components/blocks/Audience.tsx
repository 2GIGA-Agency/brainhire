"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "./_SectionHeading";
import { cn } from "@/lib/cn";
import type { BlockOf } from "./_types";

type Props = BlockOf<"Audience">;

export function Audience({ tag, title, titleHtml, sub, items }: Props) {
  const [active, setActive] = useState(0);
  const item = items[active] ?? items[0];

  if (!item) return null;

  return (
    <section className="bg-white py-20 max-bp-lg:py-14">
      <Container>
        <SectionHeading tag={tag} title={title} titleHtml={titleHtml} sub={sub} />

        <div
          className="mt-10 flex flex-wrap gap-2.5"
          role="tablist"
          aria-label="Целевые аудитории"
        >
          {items.map((it, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={it.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(idx)}
                className={cn(
                  "min-h-11 cursor-pointer rounded-full border-[1.5px] px-6 py-3 text-[14px] font-bold transition-all max-bp-sm:px-4 max-bp-sm:py-2.5 max-bp-sm:text-[13px]",
                  isActive
                    ? "border-brand1 bg-brand1 text-white"
                    : "border-grey2 bg-white text-text2 hover:border-brand1 hover:text-brand1",
                )}
              >
                {it.label}
              </button>
            );
          })}
        </div>

        <article
          key={item.label}
          role="tabpanel"
          className="mt-8 rounded-[16px] border border-grey2 bg-white p-12 shadow-soft max-bp-md:p-7"
        >
          <h3 className="text-[clamp(22px,2.5vw,30px)] font-extrabold leading-[1.25] tracking-[-0.5px] text-text1">
            {item.title}
          </h3>
          <p className="mt-4 max-w-[620px] text-[15px] leading-[1.7] text-text2">{item.body}</p>

          {item.checks.length > 0 && (
            <ul className="mt-6 flex flex-col gap-2.5">
              {item.checks.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-2.5 text-[14px] font-medium text-text1"
                >
                  <Check size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-brand1" />
                  {c}
                </li>
              ))}
            </ul>
          )}

          {item.stats.length > 0 && (
            <div className="mt-8 flex flex-wrap items-end gap-x-12 gap-y-5 border-t border-grey2 pt-7">
              {item.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-[36px] font-extrabold leading-none text-brand1 max-bp-sm:text-[28px]">
                    {s.value}
                  </div>
                  <div className="mt-2 text-[13px] text-text2">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </article>
      </Container>
    </section>
  );
}
