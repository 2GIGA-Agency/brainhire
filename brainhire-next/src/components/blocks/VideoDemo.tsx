import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { Activity } from "lucide-react";
import type { BlockOf } from "./_types";

type Props = BlockOf<"VideoDemo">;

export function VideoDemo({
  tag,
  title,
  body,
  badge,
  features,
  stats,
  cta,
  videoSrc,
  poster,
  bgWhite,
}: Props) {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 max-bp-lg:py-14",
        bgWhite ? "bg-white" : "border-y border-grey2 bg-grey1",
      )}
    >
      <Container>
        <div className="grid grid-cols-2 items-center gap-14 max-bp-lg:grid-cols-1 max-bp-lg:gap-8">
          <div>
            {tag && (
              <div className="mb-5 inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[0.8px] text-brand1">
                {tag}
              </div>
            )}
            <h2
              className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1 [&_em]:not-italic [&_em]:text-brand1"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            {body && (
              <p
                className="mt-5 text-[15px] leading-[1.72] text-text2"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            )}

            {features && features.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-3">
                {features.map((f) => (
                  <div
                    key={f.title}
                    className="flex items-start gap-3 rounded-[10px] border border-grey2 bg-white px-4 py-3.5 transition-colors hover:border-brand1/35"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-brand1-bg text-brand1">
                      <Icon name={f.icon} size={18} />
                    </span>
                    <div>
                      <div className="text-[13px] font-bold text-text1">{f.title}</div>
                      <div className="text-[12px] leading-[1.5] text-text2">{f.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {stats && stats.length > 0 && (
              <div className="mt-6 flex divide-x divide-grey2 rounded-card border border-grey2 bg-white">
                {stats.map((s) => (
                  <div key={s.label} className="flex-1 px-6 py-5 text-center">
                    <div className="text-[32px] font-black leading-none text-brand1">{s.value}</div>
                    <div className="mt-1 text-[12px] leading-[1.4] text-text2">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="relative overflow-hidden rounded-card shadow-md">
              {videoSrc ? (
                <video
                  controls
                  preload="metadata"
                  poster={poster}
                  className="block aspect-video w-full bg-black"
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
              ) : (
                <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-brand3 via-brand3/70 to-brand1/30 text-white">
                  <Activity size={64} strokeWidth={1.6} className="opacity-90" />
                  <span className="absolute bottom-4 text-[13px] font-semibold uppercase tracking-[0.8px] opacity-90">
                    Real-time интервью с ИИ-аватаром
                  </span>
                </div>
              )}
              {badge && (
                <span className="pointer-events-none absolute bottom-4 left-5 z-10 inline-flex items-center gap-2 rounded-full bg-white py-2 pl-2.5 pr-4 text-[12px] font-bold text-text1 shadow-[0_4px_16px_rgba(17,38,58,0.15)]">
                  <span className="size-2 shrink-0 rounded-full bg-brand2 shadow-[0_0_0_3px_rgba(255,116,1,0.2)] animate-pulse-dot" />
                  {badge}
                </span>
              )}
            </div>
            {cta && (
              <div className="mt-5">
                <Button href={cta.href} variant="hero-primary" className="w-full">
                  {cta.label}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
