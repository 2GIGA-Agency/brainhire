"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Play, X, Activity } from "lucide-react";

const DEFAULT_VIDEO =
  "https://storage.yandexcloud.net/brain-public/media/video_landing.mp4";
const DEFAULT_POSTER = "https://brainhire.ru/images/videoPreview.avif";
const STORAGE_KEY = "bh_float_video_dismissed";

type Props = {
  videoSrc?: string;
  poster?: string;
  label?: string;
};

/**
 * Плавающий видео-виджет в левом нижнем углу. 1:1 с pages/solutions/hr.html
 * (.float-video-widget).
 *
 * - Видео автоиграет в пассивном режиме (autoplay+muted+loop+playsInline).
 * - Постер с fallback-градиентом, если картинка не загрузилась.
 * - Hover: scale + overlay с play и подписью «Смотреть демо».
 * - Клик: открывает fullscreen-модалку с тем же видео (со звуком, если разблокирует пользователь).
 * - Кнопка закрытия (✕) скрывает виджет на всю сессию (sessionStorage).
 * - Esc закрывает модалку.
 * - Скрыт на ≤768px? — нет, мобильный вариант 110×110 на ≤600px.
 */
export function FloatVideoWidget({
  videoSrc = DEFAULT_VIDEO,
  poster = DEFAULT_POSTER,
  label = "Смотреть демо",
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [open, setOpen] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setDismissed(sessionStorage.getItem(STORAGE_KEY) === "1");
    }
  }, []);

  // Esc для модалки + блокировка скролла body
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Принудительно запускаем muted-видео в пассивном режиме после монтирования.
  // autoPlay-атрибут даёт хинт браузеру, плюс явный play() чинит редкие случаи
  // (Safari, видео внутри overflow:hidden, эффект, прерванный hydration'ом).
  useEffect(() => {
    if (!mounted) return;
    const v = videoRef.current;
    if (!v) return;

    // Гарантируем muted перед play() — браузер заблокирует автоплей со звуком.
    v.muted = true;
    v.defaultMuted = true;

    const tryPlay = () => {
      const p = v.play();
      if (p !== undefined) {
        p.then(() => setPlaying(true)).catch(() => {});
      } else {
        setPlaying(true);
      }
    };

    // Если видео уже готово к воспроизведению — играем сразу,
    // иначе ждём canplay (HAVE_FUTURE_DATA = 3, HAVE_ENOUGH_DATA = 4).
    if (v.readyState >= 3) {
      tryPlay();
    } else {
      v.addEventListener("canplay", tryPlay, { once: true });
      v.addEventListener("loadeddata", tryPlay, { once: true });
    }

    return () => {
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("loadeddata", tryPlay);
    };
  }, [mounted]);

  if (!mounted || dismissed) return null;

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setDismissed(true);
  };

  return (
    <>
      <div className="fixed bottom-7 left-7 z-[200] flex flex-col items-start animate-[float-in_0.5s_ease_0.8s_both] max-bp-sm:bottom-4 max-bp-sm:left-4">
        {/* Close button (✕) */}
        <button
          type="button"
          onClick={close}
          aria-label="Закрыть виджет"
          className="relative z-[2] mb-1.5 inline-flex size-[22px] cursor-pointer items-center justify-center self-end rounded-full bg-brand1 text-[11px] leading-none text-white transition-colors hover:bg-brand1-h"
        >
          ✕
        </button>

        {/* Video card. Используем div+role=button, потому что <video> внутри
            <button> — невалидный HTML и в Safari может ломать автоплей. */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          aria-label={label}
          className="group relative size-[148px] cursor-pointer overflow-hidden rounded-2xl border-[3px] border-brand1 bg-brand1-bg shadow-[0_8px_32px_rgba(64,150,255,0.4)] transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_12px_40px_rgba(64,150,255,0.55)] max-bp-sm:size-[110px]"
        >
          {/* Poster (image or gradient fallback) */}
          {!playing && (
            <div className="absolute inset-0 z-[1]">
              {!posterFailed ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={poster}
                  alt=""
                  onError={() => setPosterFailed(true)}
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-1.5 bg-[linear-gradient(135deg,#4096FF,#69B1FF)]">
                  <Activity size={40} strokeWidth={1.8} className="text-white" />
                </div>
              )}
            </div>
          )}

          {/* Video (always rendered for autoplay) */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 size-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          {/* Hover overlay (pointer-events-none чтобы не перекрывать клик по карточке) */}
          <div className="pointer-events-none absolute inset-0 z-[3] flex flex-col items-center justify-center gap-1.5 bg-brand1/25 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-brand1 shadow-[0_2px_16px_rgba(64,150,255,0.7)]">
              <Play size={20} strokeWidth={0} fill="currentColor" className="text-white" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.5px] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
              {label}
            </span>
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 px-6 py-6 backdrop-blur-md animate-modal-in"
          >
            <div className="relative w-full max-w-[900px]">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрыть"
                className="absolute -top-11 right-0 inline-flex size-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
              >
                <X size={18} strokeWidth={2} />
              </button>
              <video
                src={videoSrc}
                controls
                autoPlay
                playsInline
                className="block aspect-video w-full rounded-card bg-black shadow-md"
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
