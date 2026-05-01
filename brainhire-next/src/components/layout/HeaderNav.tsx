"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MegaPanel } from "./MegaPanel";
import { cn } from "@/lib/cn";
import type { Site } from "@/types/content";

type Props = {
  menu: Site["header"]["menu"];
  ctaPrimary: Site["header"]["ctaPrimary"];
  ctaSecondary: Site["header"]["ctaSecondary"];
};

const CLOSE_DELAY = 120;

export function HeaderNav({ menu, ctaPrimary, ctaSecondary }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [subOpenId, setSubOpenId] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const cancelSubClose = useCallback(() => {
    if (subCloseTimer.current) {
      clearTimeout(subCloseTimer.current);
      subCloseTimer.current = null;
    }
  }, []);

  const closeAll = useCallback(() => {
    setOpenId(null);
    setSubOpenId(null);
    cancelClose();
    cancelSubClose();
  }, [cancelClose, cancelSubClose]);

  const openMega = useCallback(
    (id: string) => {
      cancelClose();
      setSubOpenId(null);
      setOpenId(id);
    },
    [cancelClose],
  );

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setOpenId(null);
      setSubOpenId(null);
      closeTimer.current = null;
    }, CLOSE_DELAY);
  }, [cancelClose]);

  const handleSubEnter = useCallback(
    (id: string) => {
      cancelSubClose();
      setSubOpenId(id);
    },
    [cancelSubClose],
  );

  const handleSubLeave = useCallback(() => {
    cancelSubClose();
    subCloseTimer.current = setTimeout(() => {
      setSubOpenId(null);
      subCloseTimer.current = null;
    }, CLOSE_DELAY);
  }, [cancelSubClose]);

  // Esc → close all
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeAll]);

  return (
    <div className="flex flex-1 items-center max-bp-lg:hidden">
      <nav className="flex h-16 items-stretch" aria-label="Основная навигация">
        {menu.map((item) => {
          if (item.type === "link") {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center whitespace-nowrap border-b-2 border-transparent px-3.5 text-[14px] font-medium text-text2 transition-colors hover:border-brand1 hover:text-text1"
              >
                {item.label}
              </Link>
            );
          }

          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => openMega(item.id)}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={isOpen}
                className={cn(
                  "inline-flex h-16 items-center gap-1 whitespace-nowrap border-b-2 px-3.5 text-[14px] font-medium transition-colors",
                  isOpen
                    ? "border-brand1 text-text1"
                    : "border-transparent text-text2 hover:border-brand1 hover:text-text1",
                )}
              >
                {item.label}
                <ChevronDown
                  size={12}
                  strokeWidth={1.6}
                  className={cn("opacity-60 transition-transform", isOpen && "rotate-180 opacity-100")}
                />
              </button>
              <MegaPanel
                item={item}
                isOpen={isOpen}
                subOpenId={subOpenId}
                onPanelEnter={cancelClose}
                onPanelLeave={scheduleClose}
                onSubEnter={handleSubEnter}
                onSubLeave={handleSubLeave}
                onLinkClick={closeAll}
              />
            </div>
          );
        })}
      </nav>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        <Button href={ctaPrimary.href} variant="primary">
          {ctaPrimary.label}
        </Button>
        <Button href={ctaSecondary.href} variant="secondary">
          {ctaSecondary.label}
        </Button>
      </div>
    </div>
  );
}
