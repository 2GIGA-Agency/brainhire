import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getSite } from "@/lib/site";
import type { Social } from "@/types/content";

const SOCIAL_LABELS: Record<Social["id"], string> = {
  vk: "В",
  telegram: "Т",
  instagram: "I",
  linkedin: "in",
  youtube: "Y",
};

const SOCIAL_TITLES: Record<Social["id"], string> = {
  vk: "ВКонтакте",
  telegram: "Telegram",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
};

export function Footer() {
  const { brand, footer } = getSite();

  return (
    <footer className="border-t border-grey2 bg-grey1 pt-16">
      <Container>
        <div className="grid grid-cols-[1.4fr_1.3fr_1fr_1fr_1.3fr] gap-10 pb-10 border-b border-grey2 max-bp-xl:grid-cols-2 max-bp-md:grid-cols-1">
          {/* Бренд */}
          <div>
            <Link href="/" className="mb-4 inline-flex items-center" aria-label={brand.name}>
              <Image
                src={brand.logo}
                alt={brand.name}
                width={161}
                height={44}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-[13px] leading-[1.75] text-text2">
              {footer.description}
            </p>
            <div className="mt-4 flex gap-2">
              {footer.socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={SOCIAL_TITLES[s.id]}
                  className="inline-flex size-9 items-center justify-center rounded-md border border-grey2 bg-white text-[13px] font-semibold text-text2 transition-all hover:border-brand1/30 hover:bg-brand1-bg hover:text-brand1"
                >
                  {SOCIAL_LABELS[s.id]}
                </a>
              ))}
            </div>
          </div>

          {/* Колонки ссылок */}
          {footer.columns.map((col) => (
            <div key={col.title}>
              <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.8px] text-text1">
                {col.title}
              </div>
              <div className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[13px] text-text2 transition-colors hover:text-brand1"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Контакты */}
          <div>
            <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.8px] text-text1">
              Контакты
            </div>
            <div className="mb-[18px]">
              <a
                href={`tel:${footer.contacts.phone.replace(/[^+\d]/g, "")}`}
                className="block text-[16px] font-bold text-brand1 transition-colors hover:text-brand1-h"
              >
                {footer.contacts.phone}
              </a>
              {footer.contacts.phoneSub && (
                <span className="text-[12px] text-text2">{footer.contacts.phoneSub}</span>
              )}
            </div>
            <div className="mb-[18px]">
              <span className="mb-1 block text-[12px] font-semibold text-text2">
                Электронная почта:
              </span>
              <a
                href={`mailto:${footer.contacts.email}`}
                className="text-[13px] text-text1 transition-colors hover:text-brand1"
              >
                {footer.contacts.email}
              </a>
            </div>
            <div>
              <span className="mb-1 block text-[12px] font-semibold text-text2">Адрес:</span>
              <span className="text-[12px] leading-[1.6] text-text2">
                {footer.contacts.address}
              </span>
            </div>
          </div>
        </div>

        <div className="py-5">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <span className="text-[12px] text-text2">{footer.legal.copyright}</span>
            <div className="flex flex-wrap gap-6">
              {footer.legal.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[12px] text-text2 transition-colors hover:text-brand1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          {footer.legal.docs && footer.legal.docs.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-10">
              {footer.legal.docs.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[12px] text-text2 transition-colors hover:text-brand1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </footer>
  );
}
