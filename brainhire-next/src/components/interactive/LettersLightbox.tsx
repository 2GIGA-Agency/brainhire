"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, FileText, Maximize2 } from "lucide-react";
import { Reveal } from "@/components/interactive/Reveal";

export type LetterItem = { company: string; desc: string; imageSrc?: string };

export function LettersLightbox({ letters }: { letters: LetterItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, ox: 0, oy: 0 });
  const imgWrapRef = useRef<HTMLDivElement>(null);

  const resetView = () => { setScale(1); setOffset({ x: 0, y: 0 }); };
  const open = useCallback((i: number) => { setOpenIndex(i); resetView(); }, []);
  const close = useCallback(() => { setOpenIndex(null); resetView(); }, []);

  const prev = useCallback(() => {
    setOpenIndex((idx) => idx !== null ? (idx - 1 + letters.length) % letters.length : null);
    resetView();
  }, [letters.length]);

  const next = useCallback(() => {
    setOpenIndex((idx) => idx !== null ? (idx + 1) % letters.length : null);
    resetView();
  }, [letters.length]);

  const zoomIn = useCallback(() => setScale((s) => Math.min(s + 0.5, 4)), []);
  const zoomOut = useCallback(() => {
    setScale((s) => {
      const next = Math.max(s - 0.5, 1);
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  }, []);

  // Scroll-to-zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.4 : -0.4;
    setScale((s) => {
      const next = Math.max(1, Math.min(4, s + delta));
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  }, []);

  useEffect(() => {
    const el = imgWrapRef.current;
    if (!el || openIndex === null) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [openIndex, handleWheel]);

  // Keyboard
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, prev, next, zoomIn, zoomOut]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = openIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openIndex]);

  // Drag-to-pan
  const onMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, ox: offset.x, oy: offset.y };
    e.preventDefault();
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setOffset({
      x: dragRef.current.ox + (e.clientX - dragRef.current.startX) / scale,
      y: dragRef.current.oy + (e.clientY - dragRef.current.startY) / scale,
    });
  };
  const onMouseUp = () => setDragging(false);

  const current = openIndex !== null ? letters[openIndex] : null;

  return (
    <>
      {/* ─── Letter cards grid ─── */}
      <div className="mt-12 grid grid-cols-4 gap-5 max-bp-lg:grid-cols-2 max-bp-md:grid-cols-1 max-bp-xs:mx-auto max-bp-xs:max-w-[280px]">
        {letters.map((letter, i) => (
          <Reveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
            <div
              className="group h-full cursor-zoom-in overflow-hidden rounded-card border border-grey2 bg-white shadow-soft transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-brand1 hover:shadow-[0_8px_32px_rgba(64,150,255,0.15)]"
              onClick={() => open(i)}
            >
              <div className="relative flex aspect-[210/297] items-center justify-center overflow-hidden bg-grey1">
                {letter.imageSrc ? (
                  <img
                    src={letter.imageSrc}
                    alt={`Благодарственное письмо ${letter.company}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-text2">
                    <FileText size={48} strokeWidth={1.5} className="opacity-40" />
                    <span className="text-[12px] font-semibold">Загрузите скан письма</span>
                  </div>
                )}
                <div className="pointer-events-none absolute bottom-2.5 right-2.5 flex size-8 items-center justify-center rounded-full border border-grey2 bg-white opacity-0 shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-opacity duration-200 group-hover:opacity-100">
                  <Maximize2 size={14} strokeWidth={2} className="text-text1" />
                </div>
              </div>
              <div className="px-4 py-3.5">
                <div className="mb-0.5 text-[14px] font-bold text-text1">{letter.company}</div>
                <div className="text-[12px] leading-[1.4] text-text2">{letter.desc}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ─── Lightbox ─── */}
      {openIndex !== null && current && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/92 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          {/* Top bar */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4">
            <span className="pointer-events-auto text-[15px] font-semibold text-white/90">
              {current.company}
            </span>
            <button
              onClick={close}
              className="pointer-events-auto flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
              aria-label="Закрыть"
            >
              <X size={18} />
            </button>
          </div>

          {/* Prev */}
          {letters.length > 1 && (
            <button
              onClick={prev}
              className="absolute left-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 max-bp-sm:left-2 max-bp-sm:size-9"
              aria-label="Предыдущее письмо"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Image container */}
          <div
            ref={imgWrapRef}
            className="relative select-none overflow-hidden rounded-lg"
            style={{
              width: "min(80vw, 600px)",
              height: "min(88vh, 840px)",
              cursor: scale > 1 ? (dragging ? "grabbing" : "grab") : "default",
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {current.imageSrc && (
              <img
                src={current.imageSrc}
                alt={`Благодарственное письмо ${current.company}`}
                className="pointer-events-none h-full w-full object-contain"
                style={{
                  transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
                  transformOrigin: "center center",
                  transition: dragging ? "none" : "transform 0.15s ease",
                }}
                draggable={false}
              />
            )}
          </div>

          {/* Next */}
          {letters.length > 1 && (
            <button
              onClick={next}
              className="absolute right-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 max-bp-sm:right-2 max-bp-sm:size-9"
              aria-label="Следующее письмо"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Bottom controls */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-sm">
            <button
              onClick={zoomOut}
              disabled={scale <= 1}
              className="flex size-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 disabled:opacity-30"
              aria-label="Уменьшить"
            >
              <ZoomOut size={17} />
            </button>
            <span className="min-w-[40px] text-center text-[12px] font-semibold text-white">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={zoomIn}
              disabled={scale >= 4}
              className="flex size-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 disabled:opacity-30"
              aria-label="Увеличить"
            >
              <ZoomIn size={17} />
            </button>
            <div className="mx-2 h-4 w-px bg-white/25" />
            <span className="text-[11px] text-white/50">
              {openIndex + 1}&thinsp;/&thinsp;{letters.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
