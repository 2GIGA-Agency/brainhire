import { getSite } from "@/lib/site";

export function UrgencyBanner() {
  const { urgency } = getSite();
  if (!urgency.enabled) return null;

  return (
    <div className="flex items-center justify-center gap-2.5 bg-brand1 px-6 py-2.5 text-[13px] font-medium text-white">
      <span className="inline-block size-2 rounded-full bg-white animate-pulse-dot" />
      <span>{urgency.text}</span>
    </div>
  );
}
