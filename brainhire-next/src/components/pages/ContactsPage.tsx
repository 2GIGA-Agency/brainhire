import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/interactive/LeadForm";
import { Reveal } from "@/components/interactive/Reveal";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
} from "lucide-react";

export function ContactsPage() {
  return (
    <>
      {/* ═══ BLOCK 1: BREADCRUMBS + HERO ═══ */}
      <section className="bg-white pt-[88px] pb-12 max-bp-xs:pt-[72px] max-bp-xs:pb-8">
        <Container>
          <div className="mb-6 flex items-center gap-2 text-[13px] text-text2">
            <a
              href="https://brainhire.ru/"
              className="text-brand1 transition-colors hover:underline"
            >
              Главная
            </a>
            <span className="text-text2">/</span>
            <span className="text-text2">Контакты</span>
          </div>
          <h1 className="mb-4 text-[clamp(36px,5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.2px] text-text1">
            Контакты
          </h1>
          <p className="max-w-[640px] text-[17px] leading-[1.7] text-text2">
            Свяжитесь с нами любым удобным способом. Мы всегда на связи и готовы
            помочь.
          </p>
        </Container>
      </section>

      {/* ═══ BLOCK 2: MAIN CONTACTS ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <div className="grid grid-cols-2 items-stretch gap-8 max-bp-lg:grid-cols-1">
            {/* Left column: Contact cards */}
            <div className="flex flex-col gap-5">
              <Reveal delay={1}>
                <ContactCard
                  icon={<MapPin className="size-[22px] stroke-brand1" strokeWidth={1.8} />}
                  title="Адрес офиса"
                >
                  <p className="m-0 text-[14px] leading-[1.6] text-text2">
                    142005, Московская область, г. Домодедово, мкр. Центральный,
                    ул. Кирова, д. 7, к.1, пом. 0011, офис 5
                  </p>
                </ContactCard>
              </Reveal>

              <Reveal delay={2}>
                <ContactCard
                  icon={<Phone className="size-[22px] stroke-brand1" strokeWidth={1.8} />}
                  title="Телефон"
                >
                  <p className="m-0 text-[14px] leading-[1.6] text-text2">
                    <a
                      href="tel:+74958591070"
                      className="text-brand1 transition-colors hover:underline"
                    >
                      +7 (495) 859-10-70
                    </a>
                  </p>
                  <p className="mt-1 text-[13px] leading-[1.6] text-text2">
                    Офис ООО «НДК»
                  </p>
                </ContactCard>
              </Reveal>

              <Reveal delay={3}>
                <ContactCard
                  icon={<Mail className="size-[22px] stroke-brand1" strokeWidth={1.8} />}
                  title="Электронная почта"
                >
                  <p className="m-0 text-[14px] leading-[1.6] text-text2">
                    Общие вопросы:{" "}
                    <a
                      href="mailto:info@brainhire.ru"
                      className="text-brand1 transition-colors hover:underline"
                    >
                      info@brainhire.ru
                    </a>
                  </p>
                  <p className="mt-1 text-[14px] leading-[1.6] text-text2">
                    Техническая поддержка:{" "}
                    <a
                      href="mailto:support@brainhire.ru"
                      className="text-brand1 transition-colors hover:underline"
                    >
                      support@brainhire.ru
                    </a>
                  </p>
                </ContactCard>
              </Reveal>

              <Reveal delay={1}>
                <ContactCard
                  icon={<Clock className="size-[22px] stroke-brand1" strokeWidth={1.8} />}
                  title="Режим работы"
                >
                  <p className="m-0 text-[14px] leading-[1.6] text-text2">
                    Офис: Пн — Пт с 10:00 до 18:00
                  </p>
                  <p className="mt-1 text-[14px] leading-[1.6] text-text2">
                    Техподдержка: Пн — Пт с 10:00 до 19:00
                  </p>
                  <p className="mt-1 text-[14px] leading-[1.6] text-text2">
                    Сб — Вс: выходные
                  </p>
                </ContactCard>
              </Reveal>
            </div>

            {/* Right column: Map */}
            <div className="relative overflow-hidden rounded-card border border-grey2 bg-grey1 max-bp-lg:min-h-[320px]">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A1e22cf4a6539cd8bc913ded1398ad7bbd6fa4bbbf67f8d75e6f292822d26b078&amp;source=constructor"
                width="500"
                height="400"
                frameBorder={0}
                className="absolute inset-0 h-full w-full border-0"
                title="Yandex Maps — BRaiN HR офис"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ BLOCK 3: DEPARTMENTS TABLE ═══ */}
      <section className="bg-white py-20">
        <Container>
          <h2 className="mb-8 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Связь с отделами
          </h2>
          <div className="overflow-hidden rounded-card border border-grey2 bg-white shadow-soft max-bp-xs:overflow-x-auto">
            <table className="w-full border-collapse text-[14px]">
              <thead>
                <tr>
                  <th className="border-b border-grey2 bg-grey1 px-6 py-3.5 text-left font-semibold text-text1 max-bp-sm:px-3.5 max-bp-sm:py-2.5 max-bp-sm:text-[13px]">
                    Отдел
                  </th>
                  <th className="border-b border-grey2 bg-grey1 px-6 py-3.5 text-left font-semibold text-text1 max-bp-sm:px-3.5 max-bp-sm:py-2.5 max-bp-sm:text-[13px]">
                    Телефон
                  </th>
                  <th className="border-b border-grey2 bg-grey1 px-6 py-3.5 text-left font-semibold text-text1 max-bp-sm:px-3.5 max-bp-sm:py-2.5 max-bp-sm:text-[13px]">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-brand1-bg">
                  <td className="border-b border-grey2 px-6 py-3.5 leading-[1.5] text-text1 max-bp-sm:px-3.5 max-bp-sm:py-2.5 max-bp-sm:text-[13px]">
                    Отдел продаж
                  </td>
                  <td className="border-b border-grey2 px-6 py-3.5 leading-[1.5] text-text1 max-bp-sm:px-3.5 max-bp-sm:py-2.5 max-bp-sm:text-[13px]">
                    <a href="tel:+74958591070" className="text-brand1 hover:underline">
                      +7 (495) 859-10-70
                    </a>
                  </td>
                  <td className="border-b border-grey2 px-6 py-3.5 leading-[1.5] text-text1 max-bp-sm:px-3.5 max-bp-sm:py-2.5 max-bp-sm:text-[13px]">
                    <a href="mailto:info@brainhire.ru" className="text-brand1 hover:underline">
                      info@brainhire.ru
                    </a>
                  </td>
                </tr>
                <tr className="hover:bg-brand1-bg">
                  <td className="border-b border-grey2 px-6 py-3.5 leading-[1.5] text-text1 max-bp-sm:px-3.5 max-bp-sm:py-2.5 max-bp-sm:text-[13px]">
                    Техническая поддержка
                  </td>
                  <td className="border-b border-grey2 px-6 py-3.5 leading-[1.5] text-text1 max-bp-sm:px-3.5 max-bp-sm:py-2.5 max-bp-sm:text-[13px]">
                    <a href="tel:+74958591070" className="text-brand1 hover:underline">
                      +7 (495) 859-10-70
                    </a>
                  </td>
                  <td className="border-b border-grey2 px-6 py-3.5 leading-[1.5] text-text1 max-bp-sm:px-3.5 max-bp-sm:py-2.5 max-bp-sm:text-[13px]">
                    <a href="mailto:support@brainhire.ru" className="text-brand1 hover:underline">
                      support@brainhire.ru
                    </a>
                  </td>
                </tr>
                <tr className="hover:bg-brand1-bg">
                  <td className="px-6 py-3.5 leading-[1.5] text-text1 max-bp-sm:px-3.5 max-bp-sm:py-2.5 max-bp-sm:text-[13px]">
                    Партнёрская программа
                  </td>
                  <td className="px-6 py-3.5 leading-[1.5] text-text1 max-bp-sm:px-3.5 max-bp-sm:py-2.5 max-bp-sm:text-[13px]">
                    <a href="tel:+74958591070" className="text-brand1 hover:underline">
                      +7 (495) 859-10-70
                    </a>
                  </td>
                  <td className="px-6 py-3.5 leading-[1.5] text-text1 max-bp-sm:px-3.5 max-bp-sm:py-2.5 max-bp-sm:text-[13px]">
                    <a href="mailto:info@brainhire.ru" className="text-brand1 hover:underline">
                      info@brainhire.ru
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* ═══ SOCIAL MEDIA + MESSENGERS ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <h2 className="mb-8 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Мы в социальных сетях
          </h2>

          <div className="mb-10 flex flex-wrap gap-4 max-bp-sm:flex-col">
            <Reveal delay={1}>
              <a
                href="https://vk.com/brain_hr"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2.5 rounded-card border border-grey2 bg-white px-6 py-3.5 text-[14px] font-semibold text-text1 shadow-soft transition-all hover:border-brand1 hover:bg-brand1-bg hover:shadow-md max-bp-sm:w-full max-bp-sm:justify-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="#4096FF"
                  stroke="none"
                  className="size-[22px] shrink-0"
                >
                  <path d="M21.547 7h-3.29a.743.743 0 00-.655.392s-1.312 2.416-1.734 3.23C14.734 12.813 14 12.126 14 11.11V7.603A1.104 1.104 0 0012.896 6.5h-2.474a1.982 1.982 0 00-1.75.813s1.255-.204 1.255 1.49c0 .42.022 1.626.04 2.64a.73.73 0 01-1.272.503 21.54 21.54 0 01-2.498-4.543.693.693 0 00-.63-.403H2.214a.554.554 0 00-.555.603c0 .138 0 .25.024.39 1.298 6.154 5.538 9.5 9.79 9.5h1.202c.596 0 .724-.332.724-.803v-1.567c0-.356.298-.642.655-.617a12.3 12.3 0 011.938.588 22.078 22.078 0 002.26 1.46c.263.134.546.254.79.254h2.56a.554.554 0 00.555-.603c0-1.22-2.62-3.553-2.62-3.553 1.204-1.224 2.98-3.542 3.01-4.316v-.392z" />
                </svg>
                ВКонтакте
              </a>
            </Reveal>

            <Reveal delay={2}>
              <a
                href="https://t.me/BRaiN_HR"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2.5 rounded-card border border-grey2 bg-white px-6 py-3.5 text-[14px] font-semibold text-text1 shadow-soft transition-all hover:border-brand1 hover:bg-brand1-bg hover:shadow-md max-bp-sm:w-full max-bp-sm:justify-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="#4096FF"
                  stroke="none"
                  className="size-[22px] shrink-0"
                >
                  <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Telegram
              </a>
            </Reveal>

            <Reveal delay={3}>
              <a
                href="https://www.instagram.com/brain_hire/"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2.5 rounded-card border border-grey2 bg-white px-6 py-3.5 text-[14px] font-semibold text-text1 shadow-soft transition-all hover:border-brand1 hover:bg-brand1-bg hover:shadow-md max-bp-sm:w-full max-bp-sm:justify-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4096FF"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-[22px] shrink-0"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                Instagram
              </a>
            </Reveal>

            <Reveal delay={1}>
              <a
                href="https://www.linkedin.com/company/105875559/"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2.5 rounded-card border border-grey2 bg-white px-6 py-3.5 text-[14px] font-semibold text-text1 shadow-soft transition-all hover:border-brand1 hover:bg-brand1-bg hover:shadow-md max-bp-sm:w-full max-bp-sm:justify-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="#4096FF"
                  stroke="none"
                  className="size-[22px] shrink-0"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </Reveal>
          </div>

          {/* Messenger */}
          <div className="flex max-w-[500px] items-center gap-4 rounded-card bg-brand1-bg px-6 py-5">
            <div className="flex size-11 min-w-11 items-center justify-center rounded-full bg-brand1">
              <MessageSquare
                className="size-[22px] stroke-white"
                strokeWidth={1.8}
                fill="none"
              />
            </div>
            <div className="text-[14px] leading-[1.5] text-text1">
              Напишите нам в Telegram для быстрой связи:{" "}
              <a
                href="https://t.me/BRaiN_HR"
                target="_blank"
                rel="noopener"
                className="font-semibold text-brand1 hover:underline"
              >
                @BRaiN_HR
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ BLOCK 4: LEGAL DETAILS ═══ */}
      <section className="bg-white py-20">
        <Container>
          <h2 className="mb-8 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Реквизиты компании
          </h2>
          <div className="rounded-card border border-grey2 bg-white p-8 shadow-soft max-bp-xs:p-5">
            <div className="grid grid-cols-2 gap-x-12 gap-y-6 max-bp-sm:grid-cols-1">
              <LegalItem label="Полное наименование">
                Общество с ограниченной ответственностью «НДК»
              </LegalItem>
              <LegalItem label="Сокращённое наименование">ООО «НДК»</LegalItem>
              <LegalItem label="ИНН">5009132924</LegalItem>
              <LegalItem label="ОГРН">1225000105010</LegalItem>
              <LegalItem
                label="Юридический адрес"
                className="col-span-2 max-bp-sm:col-span-1"
              >
                142005, Московская область, г. Домодедово, мкр. Центральный, ул.
                Кирова, д. 7, к.1, пом. 0011, офис 5
              </LegalItem>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ BLOCK 5: CONTACT FORM ═══ */}
      <section className="bg-grey1 py-20">
        <Container>
          <h2 className="mb-2 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Форма обратной связи
          </h2>
          <p className="mb-8 max-w-[520px] text-[15px] leading-[1.7] text-text2">
            Оставьте заявку, и мы свяжемся с вами в рабочее время.
          </p>

          <div className="max-w-[680px]">
            <LeadForm
              title="Свяжитесь с нами"
              subtitle="Заполните форму, и мы свяжемся с вами в рабочее время."
              submitLabel="Отправить"
              leadType="contacts"
            />
          </div>
        </Container>
      </section>
    </>
  );
}

type ContactCardProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

function ContactCard({ icon, title, children }: ContactCardProps) {
  return (
    <div className="flex h-full items-start gap-4 rounded-card border border-grey2 bg-white p-6 shadow-soft transition-shadow hover:shadow-md max-bp-xs:flex-col max-bp-xs:gap-3">
      <div className="flex size-11 min-w-11 items-center justify-center rounded-full bg-brand1-bg">
        {icon}
      </div>
      <div>
        <h3 className="mb-2 text-[15px] font-bold text-text1">{title}</h3>
        {children}
      </div>
    </div>
  );
}

type LegalItemProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

function LegalItem({ label, children, className = "" }: LegalItemProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span className="text-[13px] font-medium text-text2">{label}</span>
      <span className="text-[15px] font-semibold leading-[1.5] text-text1">
        {children}
      </span>
    </div>
  );
}
