"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { Site } from "@/types/content";

type Props = {
  menu: Site["header"]["menu"];
  ctaPrimary: Site["header"]["ctaPrimary"];
  ctaSecondary: Site["header"]["ctaSecondary"];
  topbar: Site["topbar"];
};

export function MobileNav({ menu, ctaPrimary, ctaSecondary, topbar }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [subExpanded, setSubExpanded] = useState<Set<string>>(new Set());

  const close = useCallback(() => {
    setIsOpen(false);
    setExpanded(new Set());
    setSubExpanded(new Set());
  }, []);

  const toggleExpanded = (id: string, setter: typeof setExpanded) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Esc to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Открыть меню"
        aria-expanded={isOpen}
        className="hidden size-11 items-center justify-center rounded-md border border-grey2 text-text1 transition-colors hover:border-brand1 hover:text-brand1 max-bp-lg:inline-flex"
      >
        <Menu size={22} strokeWidth={1.8} />
      </button>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "fixed inset-0 z-[300] bg-black/40 transition-opacity duration-200",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Drawer */}
      <aside
        aria-label="Мобильное меню"
        className={cn(
          "fixed inset-y-0 right-0 z-[301] flex w-full max-w-[420px] flex-col bg-white shadow-2xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-grey2 px-5 py-4">
          <span className="text-[14px] font-bold text-text1">Меню</span>
          <button
            type="button"
            onClick={close}
            aria-label="Закрыть меню"
            className="inline-flex size-11 items-center justify-center rounded-md border border-grey2 text-text1 hover:border-brand1 hover:text-brand1"
          >
            <X size={20} strokeWidth={1.8} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <nav className="flex flex-col" aria-label="Основная навигация">
            {menu.map((item) => {
              if (item.type === "link") {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="flex min-h-11 items-center px-3 py-3 text-[15px] font-semibold text-text1 transition-colors hover:text-brand1"
                  >
                    {item.label}
                  </Link>
                );
              }

              const isExp = expanded.has(item.id);
              return (
                <div key={item.id} className="border-b border-grey2 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => toggleExpanded(item.id, setExpanded)}
                    aria-expanded={isExp}
                    className="flex min-h-11 w-full items-center justify-between gap-3 px-3 py-3 text-[15px] font-semibold text-text1"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      strokeWidth={1.8}
                      className={cn("text-text2 transition-transform", isExp && "rotate-180")}
                    />
                  </button>
                  {isExp && (
                    <div className="flex flex-col gap-0.5 pb-3">
                      {item.columns.map((col, ci) => (
                        <div key={ci}>
                          {col.label && (
                            <div className="mt-2 px-4 pb-1 text-[11px] font-extrabold uppercase tracking-[0.6px] text-text2">
                              {col.label}
                            </div>
                          )}
                          {col.items.map((sub, si) => {
                            if (sub.type === "link") {
                              return (
                                <Link
                                  key={sub.href + si}
                                  href={sub.href}
                                  onClick={close}
                                  className="flex min-h-11 items-center px-6 py-2.5 text-[14px] text-text1 transition-colors hover:bg-grey1 hover:text-brand1"
                                >
                                  {sub.label}
                                </Link>
                              );
                            }
                            const hasSub = sub.subItems && sub.subItems.length > 0;
                            const subId = `${item.id}:${sub.label}`;
                            const isSubExp = subExpanded.has(subId);
                            if (!hasSub) {
                              return (
                                <Link
                                  key={subId}
                                  href={sub.href ?? "#"}
                                  onClick={close}
                                  className="flex min-h-11 items-center gap-3 px-4 py-2.5 text-[14px] text-text1 transition-colors hover:bg-grey1"
                                >
                                  {sub.icon && (
                                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-brand1-bg text-brand1">
                                      <Icon name={sub.icon} size={16} />
                                    </span>
                                  )}
                                  <span>
                                    <span className="block font-semibold">{sub.label}</span>
                                    {sub.description && (
                                      <span className="block text-[11px] text-text2">
                                        {sub.description}
                                      </span>
                                    )}
                                  </span>
                                </Link>
                              );
                            }
                            return (
                              <div key={subId}>
                                <button
                                  type="button"
                                  onClick={() => toggleExpanded(subId, setSubExpanded)}
                                  aria-expanded={isSubExp}
                                  className="flex min-h-11 w-full items-center gap-3 px-4 py-2.5 text-left text-[14px] text-text1 transition-colors hover:bg-grey1"
                                >
                                  {sub.icon && (
                                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-brand1-bg text-brand1">
                                      <Icon name={sub.icon} size={16} />
                                    </span>
                                  )}
                                  <span className="flex-1">
                                    <span className="block font-semibold">{sub.label}</span>
                                    {sub.description && (
                                      <span className="block text-[11px] text-text2">
                                        {sub.description}
                                      </span>
                                    )}
                                  </span>
                                  <ChevronDown
                                    size={14}
                                    strokeWidth={1.8}
                                    className={cn("text-text2 transition-transform", isSubExp && "rotate-180")}
                                  />
                                </button>
                                {isSubExp &&
                                  sub.subItems!.map((leaf) => (
                                    <Link
                                      key={leaf.href}
                                      href={leaf.href}
                                      onClick={close}
                                      className="flex min-h-11 items-center px-12 py-2 text-[13px] text-text1 transition-colors hover:bg-grey1 hover:text-brand1"
                                    >
                                      {leaf.label}
                                    </Link>
                                  ))}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {topbar.length > 0 && (
            <div className="mt-6 border-t border-grey2 pt-4">
              <div className="mb-2 px-3 text-[11px] font-extrabold uppercase tracking-[0.6px] text-text2">
                Информация
              </div>
              {topbar.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="flex min-h-11 items-center px-3 py-2 text-[13px] text-text2 transition-colors hover:text-brand1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <footer className="border-t border-grey2 p-4">
          <div className="flex flex-col gap-2">
            <Button href={ctaPrimary.href} variant="primary" className="w-full">
              {ctaPrimary.label}
            </Button>
            <Button href={ctaSecondary.href} variant="secondary" className="w-full">
              {ctaSecondary.label}
            </Button>
          </div>
        </footer>
      </aside>
    </>
  );
}
