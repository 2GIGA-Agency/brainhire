"use client";

import { useMemo, useState } from "react";
import { Star } from "lucide-react";

export type ReviewCategory = "recruiting" | "screening" | "automation";

export type Review = {
  text: string;
  result: string;
  authorInitials: string;
  authorName: string;
  authorTitle: string;
  category: ReviewCategory;
  categoryLabel: string;
  avatarTone: "blue" | "orange" | "teal";
};

type FilterId = "all" | ReviewCategory;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "recruiting", label: "Рекрутинг" },
  { id: "screening", label: "Скрининг резюме" },
  { id: "automation", label: "Автоматизация" },
];

const AVATAR_TONE: Record<Review["avatarTone"], string> = {
  blue: "bg-brand1",
  orange: "bg-brand2",
  teal: "bg-brand3",
};

const CATEGORY_PILL: Record<ReviewCategory, string> = {
  recruiting: "bg-brand1-bg text-brand1",
  screening: "bg-brand2-bg text-brand2",
  automation: "bg-brand3/10 text-brand3",
};

type Props = { reviews: Review[] };

export function ReviewsList({ reviews }: Props) {
  const [active, setActive] = useState<FilterId>("all");

  const visible = useMemo(
    () => (active === "all" ? reviews : reviews.filter((r) => r.category === active)),
    [active, reviews],
  );

  return (
    <>
      {/* Filter pills */}
      <div className="mb-10 mt-6 flex flex-wrap justify-start gap-2">
        {FILTERS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={[
                "inline-flex items-center rounded-full border px-5 py-2.5 text-[13px] font-semibold transition-colors max-bp-sm:px-4 max-bp-sm:py-2 max-bp-sm:text-[12px]",
                isActive
                  ? "border-brand1 bg-brand1 text-white"
                  : "border-grey2 bg-white text-text2 hover:border-brand1 hover:text-brand1",
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-card border border-grey2 bg-white px-6 py-12 text-center text-[14px] text-text2">
          В этой категории пока нет отзывов.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6 max-bp-lg:grid-cols-2 max-bp-md:grid-cols-2 max-bp-sm:grid-cols-1">
          {visible.map((review, i) => (
            <article
              key={`${review.authorName}-${i}`}
              className="flex flex-col rounded-card border border-grey2 bg-white px-6 pt-7 pb-[22px] transition-[border-color,box-shadow] duration-200 hover:border-brand1 hover:shadow-[0_4px_24px_rgba(17,38,58,0.12)]"
            >
              <div className="mb-3.5 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={16} fill="#FF7401" stroke="none" />
                ))}
              </div>

              <p className="mb-5 flex-1 text-[14px] leading-[1.65] text-text1">
                {review.text}
              </p>

              <div className="mb-4 rounded-sm border border-brand1/20 bg-brand1-bg px-3.5 py-2 text-[12px] font-bold leading-[1.4] text-brand1">
                {review.result}
              </div>

              <div className="mb-2.5 flex items-center gap-2.5">
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white ${AVATAR_TONE[review.avatarTone]}`}
                >
                  {review.authorInitials}
                </div>
                <div>
                  <div className="text-[13px] font-bold text-text1">{review.authorName}</div>
                  <div className="text-[12px] leading-[1.4] text-text2">{review.authorTitle}</div>
                </div>
              </div>

              <span
                className={`self-start rounded-full px-2.5 py-[3px] text-[11px] font-semibold ${CATEGORY_PILL[review.category]}`}
              >
                {review.categoryLabel}
              </span>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
