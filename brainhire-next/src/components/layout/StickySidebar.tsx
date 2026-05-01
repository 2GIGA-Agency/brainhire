import { Calendar, Calculator, Phone, Mail } from "lucide-react";
import type { ComponentType } from "react";

type IconKey = "calendar" | "calculator" | "phone" | "mail";
type Variant = "primary" | "accent" | "secondary";

type Item = {
  href: string;
  title: string;
  label: string;
  icon: IconKey;
  variant: Variant;
};

const ICONS: Record<IconKey, ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  calendar: Calendar,
  calculator: Calculator,
  phone: Phone,
  mail: Mail,
};

type Props = { items?: Item[] };

const DEFAULT_ITEMS: Item[] = [
  { href: "#form", icon: "calendar", title: "Запросить демо", label: "Запросить демо", variant: "primary" },
  { href: "/calculator", icon: "calculator", title: "Калькулятор экономии", label: "Калькулятор экономии", variant: "accent" },
  { href: "tel:+74958591070", icon: "phone", title: "+7 (495) 859-10-70", label: "+7 (495) 859-10-70", variant: "secondary" },
  { href: "mailto:info@brainhire.ru", icon: "mail", title: "info@brainhire.ru", label: "info@brainhire.ru", variant: "secondary" },
];

const VARIANT_CLS: Record<Variant, string> = {
  primary: "bg-brand1 text-white hover:bg-brand1-h",
  accent: "bg-brand2 text-white hover:bg-[#ff8c2e]",
  secondary: "bg-white text-text2 hover:bg-grey1 hover:text-brand1",
};

/**
 * Sticky-sidebar справа: 4 CTA-кнопки в едином контейнере.
 * 1:1 с pages/solutions/hr.html (.sticky-sidebar / .sticky-btn).
 * На ≤768px скрыта.
 */
export function StickySidebar({ items = DEFAULT_ITEMS }: Props) {
  return (
    <aside
      aria-label="Быстрые контакты"
      className="group fixed right-0 top-1/2 z-[90] flex -translate-y-1/2 flex-col overflow-hidden rounded-l-[14px] shadow-[-4px_4px_24px_rgba(17,38,58,0.12)] max-bp-md:hidden"
    >
      {items.map((item, idx) => {
        const Icon = ICONS[item.icon];
        return (
          <a
            key={item.href}
            href={item.href}
            title={item.title}
            className={`relative flex items-center gap-3 px-[15px] py-3.5 transition-[background-color,color,padding] duration-[350ms] ease-[cubic-bezier(.4,0,.2,1)] hover:pr-5 ${VARIANT_CLS[item.variant]} ${
              idx > 0
                ? "before:pointer-events-none before:absolute before:left-3 before:right-3 before:top-0 before:h-px before:bg-grey2 before:transition-opacity before:duration-200 hover:before:opacity-0"
                : ""
            }`}
          >
            <Icon size={18} strokeWidth={1.8} className="shrink-0 transition-transform duration-200 hover:scale-110" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-[12px] font-semibold opacity-0 transition-[max-width,opacity] duration-[350ms] ease-[cubic-bezier(.4,0,.2,1)] group-hover:max-w-[220px] group-hover:opacity-100">
              {item.label}
            </span>
          </a>
        );
      })}
    </aside>
  );
}
