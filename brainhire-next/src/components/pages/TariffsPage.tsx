import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RoiCalculator } from "@/components/interactive/RoiCalculator";
import { Reveal } from "@/components/interactive/Reveal";
import {
  Check,
  Shield,
  Edit3,
  BarChart2,
  Video,
  Target,
  MessageSquare,
  Star,
  Calendar,
  Clock,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────
   Tariff data — 1:1 из pages/pricing.html
   ────────────────────────────────────────────────────────────────── */

type Tariff = {
  name: string;
  volume: string;
  priceMonthly: string;
  priceYearly: string;
  perMonthYearly: string;
  features: string[];
  ctaVariant: "outline" | "primary";
  featured?: boolean;
  badge?: string;
};

const chatTariffs: Tariff[] = [
  {
    name: "AI CORE",
    volume: "300 диалогов",
    priceMonthly: "9 000",
    priceYearly: "97 200",
    perMonthYearly: "8 100 руб./мес",
    features: ["Текстовые ИИ-диалоги", "Автоматический скрининг", "Перенос остатков"],
    ctaVariant: "outline",
  },
  {
    name: "AI PRO",
    volume: "1 000 диалогов",
    priceMonthly: "25 000",
    priceYearly: "270 000",
    perMonthYearly: "22 500 руб./мес",
    features: [
      "Текстовые ИИ-диалоги",
      "Автоматический скрининг",
      "Перенос остатков",
      "Приоритетная поддержка",
    ],
    ctaVariant: "primary",
  },
  {
    name: "AI ULTRA",
    volume: "3 000 диалогов",
    priceMonthly: "60 000",
    priceYearly: "648 000",
    perMonthYearly: "54 000 руб./мес",
    features: [
      "Текстовые ИИ-диалоги",
      "Автоматический скрининг",
      "Перенос остатков",
      "Приоритетная поддержка",
      "Персональный менеджер",
    ],
    ctaVariant: "primary",
    featured: true,
    badge: "Для крупных компаний",
  },
];

const interviewTariffs: Tariff[] = [
  {
    name: "Interview CORE",
    volume: "50 ИИ-видеоинтервью",
    priceMonthly: "10 000",
    priceYearly: "108 000",
    perMonthYearly: "9 000 руб./мес",
    features: ["Видеоинтервью с ИИ", "Аналитика и отчёты", "Перенос остатков"],
    ctaVariant: "outline",
  },
  {
    name: "Interview PRO",
    volume: "150 ИИ-видеоинтервью",
    priceMonthly: "27 000",
    priceYearly: "291 600",
    perMonthYearly: "24 300 руб./мес",
    features: [
      "Видеоинтервью с ИИ",
      "Аналитика и отчёты",
      "Перенос остатков",
      "Приоритетная поддержка",
    ],
    ctaVariant: "primary",
  },
  {
    name: "Interview ULTRA",
    volume: "500 ИИ-видеоинтервью",
    priceMonthly: "80 000",
    priceYearly: "864 000",
    perMonthYearly: "72 000 руб./мес",
    features: [
      "Видеоинтервью с ИИ",
      "Аналитика и отчёты",
      "Перенос остатков",
      "Приоритетная поддержка",
      "Персональный менеджер",
    ],
    ctaVariant: "primary",
    featured: true,
    badge: "Для крупных компаний",
  },
];

const fullTariffs: Tariff[] = [
  {
    name: "Full Start",
    volume: "300 диалогов + 30 интервью",
    priceMonthly: "15 000",
    priceYearly: "162 000",
    perMonthYearly: "13 500 руб./мес",
    features: ["Чат + Интервью", "Единый пакет"],
    ctaVariant: "outline",
  },
  {
    name: "Full CORE",
    volume: "600 диалогов + 60 интервью",
    priceMonthly: "27 000",
    priceYearly: "291 600",
    perMonthYearly: "24 300 руб./мес",
    features: ["Чат + Интервью", "Единый пакет"],
    ctaVariant: "outline",
  },
  {
    name: "Full PRO",
    volume: "1 000 диалогов + 200 интервью",
    priceMonthly: "60 000",
    priceYearly: "648 000",
    perMonthYearly: "54 000 руб./мес",
    features: ["Чат + Интервью", "Единый пакет", "Приоритетная поддержка"],
    ctaVariant: "primary",
  },
  {
    name: "Full ULTRA",
    volume: "2 000 диалогов + 400 интервью",
    priceMonthly: "104 000",
    priceYearly: "1 123 200",
    perMonthYearly: "93 600 руб./мес",
    features: [
      "Чат + Интервью",
      "Единый пакет",
      "Приоритетная поддержка",
      "Персональный менеджер",
    ],
    ctaVariant: "primary",
    featured: true,
    badge: "Максимальный пакет",
  },
];

const freeFeatures = [
  { icon: Edit3, label: "Создание вакансий" },
  { icon: BarChart2, label: "Скрининг резюме" },
  { icon: Video, label: "Запись и хранение видеоинтервью" },
  { icon: Target, label: "Анализ и оценка от ИИ" },
  { icon: MessageSquare, label: "Обратная связь кандидатам" },
];

const faqItems = [
  {
    q: "Можно ли менять тариф?",
    a: "Да, можно перейти на другой тариф в любой момент. При повышении вы получите доступ к новым возможностям сразу.",
  },
  {
    q: "Что входит бесплатно?",
    a: "Создание вакансий, скрининг резюме, запись видеоинтервью, ИИ-анализ и обратная связь кандидатам — бесплатно во всех тарифах.",
  },
  {
    q: "Остатки переносятся?",
    a: "Да, неиспользованные диалоги и интервью переходят на следующий период при условии продления тарифа.",
  },
  {
    q: "Есть ли пробный период?",
    a: "Да, первые 100 кандидатов — бесплатно. Этого достаточно, чтобы оценить качество платформы.",
  },
  {
    q: "Как работает годовая подписка?",
    a: "При годовой оплате вы получаете скидку 10% и фиксированную стоимость на весь год.",
  },
];

/* ──────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────── */

export function TariffsPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-white px-0 pt-[88px] pb-12">
        <Container>
          <h1 className="mb-4 text-[clamp(36px,5vw,56px)] font-black leading-[1.08] tracking-[-1.5px] text-text1">
            Тарифы BRaiN HR <em className="not-italic text-brand1">2026</em>
          </h1>
          <p className="max-w-[540px] text-[17px] leading-[1.7] text-text2">
            Платите только за масштабирование. Выберите тариф, который подходит вашему бизнесу.
          </p>
        </Container>
      </section>

      {/* БЕСПЛАТНО ВО ВСЕХ ТАРИФАХ */}
      <section className="bg-white pb-2">
        <Container>
          <div className="flex items-center gap-10 rounded-card border border-grey2 bg-grey1 px-9 py-8 max-bp-lg:flex-col max-bp-lg:gap-5 max-bp-sm:px-5 max-bp-sm:py-6">
            <div className="max-w-[280px] shrink-0 max-bp-lg:max-w-full">
              <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-brand1/25 bg-brand1-bg px-4 py-1.5 text-[13px] font-bold text-brand1">
                <Shield size={16} strokeWidth={2} />
                Бесплатно во всех тарифах
              </div>
              <p className="m-0 text-[13px] leading-[1.6] text-text2">
                Базовые ИИ-инструменты включены без дополнительной платы — вы платите только за
                диалоги и интервью.
              </p>
            </div>
            <div className="flex flex-1 flex-wrap gap-2 max-bp-sm:flex-col">
              {freeFeatures.map((feat, i) => {
                const Ico = feat.icon;
                return (
                  <Reveal key={feat.label} delay={((i % 3) + 1) as 1 | 2 | 3}>
                    <div
                      className="flex items-center gap-2 rounded-full border border-grey2 bg-white px-[18px] py-2.5 text-[13px] font-semibold text-text1 transition-all duration-200 hover:border-brand1 hover:shadow-[0_2px_8px_rgba(64,150,255,0.1)]"
                    >
                      <Ico size={18} strokeWidth={1.8} className="shrink-0 text-brand1" />
                      <span>{feat.label}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* PILL TOGGLE (статичный, помесячно активна) */}
      <section className="bg-white pt-12">
        <Container>
          <div className="mb-12 flex items-center justify-center gap-4">
            {/* TODO Phase 5: интерактивное переключение помесячно/годовой */}
            <div className="relative inline-flex rounded-full border border-grey2 bg-grey1 p-1">
              <span
                className="absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full bg-white shadow-[0_1px_4px_rgba(17,38,58,0.1),0_2px_8px_rgba(17,38,58,0.06)]"
                aria-hidden="true"
              />
              <span className="relative z-[2] cursor-default px-6 py-2.5 text-[14px] font-semibold text-text1 select-none whitespace-nowrap max-bp-sm:px-4 max-bp-sm:py-2 max-bp-sm:text-[13px]">
                Помесячно
              </span>
              <span className="relative z-[2] cursor-default px-6 py-2.5 text-[14px] font-semibold text-text2 select-none whitespace-nowrap max-bp-sm:px-4 max-bp-sm:py-2 max-bp-sm:text-[13px]">
                Годовой
              </span>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold text-brand1">
              -10% при годовом
            </span>
          </div>
        </Container>
      </section>

      {/* TARIFF GROUPS (BRaiN CHAT, INTERVIEW, FULL, AVATAR) */}
      <section className="bg-white pb-6">
        <Container>
          <TariffGroup
            title="BRaiN CHAT"
            description="Автоматизация первичного контакта. Текстовые диалоги для обработки входящего потока кандидатов."
            tariffs={chatTariffs}
          />
          <TariffGroup
            title="BRaiN INTERVIEW"
            description="Глубинная оценка. Проведение структурированных видеоинтервью с ИИ-аналитикой."
            tariffs={interviewTariffs}
          />
          <TariffGroup
            title="Комплексные решения: BRaiN CHAT + Interview"
            description="Бесшовная автоматизация воронки найма «под ключ». Диалоги + видеоинтервью в одном пакете."
            tariffs={fullTariffs}
            cols={4}
          />

          {/* REAL TIME AVATAR */}
          <div className="mb-8">
            <div className="mb-2 inline-flex items-center gap-3 text-[24px] font-extrabold tracking-[-0.5px] text-text1">
              <span
                aria-hidden="true"
                className="block h-6 w-1 rounded-[2px] bg-brand1"
              />
              BRaiN REAL TIME AVATAR
            </div>
            <p className="m-0 max-w-[600px] text-[15px] leading-[1.6] text-text2">
              Эффект живого присутствия для ключевых собеседований. Идеально для финальных этапов
              отбора и оценки топ-менеджмента.
            </p>
          </div>
          <div className="relative flex items-center gap-12 overflow-hidden rounded-card border-[1.5px] border-grey2 bg-white p-10 shadow-soft transition-colors duration-300 hover:border-brand2 hover:shadow-[0_8px_32px_rgba(255,116,1,0.1)] max-bp-lg:flex-col max-bp-lg:gap-6 max-bp-lg:text-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 h-[200px] w-[200px] bg-[radial-gradient(circle,rgba(255,116,1,0.06)_0%,transparent_70%)]"
            />
            <div className="relative z-[1] flex-1">
              <div className="mb-3 text-[22px] font-extrabold text-text1">
                Real-time собеседование с ИИ-аватаром
              </div>
              <p className="mb-4 text-[14px] leading-[1.7] text-text2">
                Адаптивное интервью до 45 минут с анализом мимики, soft skills и поведенческих
                паттернов. Максимальная вовлечённость кандидата с полной ИИ-аналитикой.
              </p>
              <a
                href="https://brainhire.ru/signup"
                className="inline-flex w-auto items-center justify-center rounded-[8px] border-none bg-brand2 px-7 py-3 text-[14px] font-bold text-white shadow-[0_2px_8px_rgba(255,116,1,0.25)] transition-all duration-200 hover:bg-[#e56800] hover:shadow-[0_6px_20px_rgba(255,116,1,0.35)]"
              >
                Запросить демо
              </a>
            </div>
            <div className="relative z-[1] shrink-0 text-center">
              <div className="mb-2 text-[48px] font-black leading-none tracking-[-2px] text-brand2 max-bp-lg:text-[36px]">
                3 000 руб.
              </div>
              <div className="text-[13px] text-text2">за 1 собеседование (до 45 мин)</div>
            </div>
          </div>
        </Container>
      </section>

      {/* ГАРАНТИЯ СОХРАНЕНИЯ БЮДЖЕТА */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <div className="mb-3 inline-flex items-center rounded-full bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[0.8px] text-brand1">
            Гарантия сохранения бюджета
          </div>
          <h2 className="mb-3 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Ваши инвестиции <em className="not-italic text-brand1">не сгорают</em>
          </h2>
          <p className="mb-0 max-w-[720px] text-[15px] leading-[1.72] text-text2">
            Система переноса остатков — гибкое планирование ресурсов при сезонных колебаниях найма.
            Вы используете всё, за что заплатили.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-5 max-bp-lg:grid-cols-1">
            <Reveal delay={1}>
              <GuaranteeCard
                icon={<Calendar size={22} strokeWidth={1.8} className="text-brand1" />}
                title="Месячный тариф"
                text="Остаток неиспользованных диалогов и интервью переходит на следующий месяц при условии продления тарифа."
              />
            </Reveal>
            <Reveal delay={2}>
              <GuaranteeCard
                icon={<Clock size={22} strokeWidth={1.8} className="text-brand1" />}
                title="Годовой тариф"
                text="Остаток переходит на следующий год при продлении контракта. Экономия до 10% и фиксация стоимости."
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* КАКОЙ ТАРИФ ПОДХОДИТ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Какой тариф подходит <em className="not-italic text-brand1">вашему бизнесу?</em>
          </h2>
          <div className="mt-10 grid grid-cols-3 gap-5 max-bp-lg:grid-cols-1">
            <Reveal delay={1}>
              <FitCard
                tier="Start / Core"
                forText="Для стартапов и небольшого найма"
                focus="Фокус: Экономия ресурсов рекрутера"
              />
            </Reveal>
            <Reveal delay={2}>
              <FitCard
                tier="Pro"
                forText="Для растущих компаний и среднего бизнеса"
                focus="Фокус: Увеличение пропускной способности воронки"
              />
            </Reveal>
            <Reveal delay={3}>
              <FitCard
                tier="Ultra"
                forText="Для крупных департаментов и массового найма"
                focus="Фокус: Максимальная автоматизация и масштаб"
              />
            </Reveal>
          </div>
          <p className="mt-6 text-[13px] text-text2">
            Рекомендуем годовое подключение для фиксации стоимости и упрощения бюджетирования.
          </p>
        </Container>
      </section>

      {/* КАЛЬКУЛЯТОР */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <div className="mb-3 inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
            Калькулятор экономии
          </div>
          <h2 className="mb-3 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Рассчитайте выгоду
            <br />
            <em className="not-italic text-brand1">на одной вакансии</em>
          </h2>
          <p className="mb-8 max-w-[720px] text-[15px] leading-[1.72] text-text2">
            Введите ваши данные — калькулятор покажет, сколько вы экономите с BRaiN HR на каждой
            вакансии.
          </p>

          <RoiCalculator />
        </Container>
      </section>

      {/* CTA */}
      <section className="border-y border-grey2 bg-[linear-gradient(135deg,var(--color-brand1-bg)_0%,white_50%,var(--color-brand2-bg)_100%)] py-20 max-bp-lg:py-14">
        <Container>
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="mb-4 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
              Не уверены, какой тариф выбрать?
            </h2>
            <p className="mb-8 text-[15px] leading-[1.72] text-text2">
              Получите персональный расчёт экономии для вашего объёма найма. Первые 100 кандидатов —
              бесплатно.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="https://brainhire.ru/signup" variant="hero-primary">
                100 кандидатов бесплатно
                <ArrowRight size={16} strokeWidth={1.8} />
              </Button>
              <Button href="https://brainhire.ru/contacts" variant="hero-outline">
                Получить консультацию
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ — two-col, нативный <details> для интерактивности без JS */}
      <section className="bg-white py-20 max-bp-lg:py-14">
        <Container>
          <div className="grid grid-cols-[1fr_1.5fr] items-start gap-16 max-bp-lg:grid-cols-1 max-bp-lg:gap-8">
            <div>
              <div className="mb-3 inline-flex items-center rounded-full bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[0.8px] text-brand1">
                Частые вопросы
              </div>
              <h2 className="mb-3 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
                Ответы на <em className="not-italic text-brand1">важные вопросы</em>
              </h2>
              <p className="text-[15px] leading-[1.72] text-text2">
                Не нашли ответ? Напишите нам — ответим в течение часа.
              </p>
            </div>
            <div className="flex flex-col">
              {faqItems.map((item, idx) => (
                <details
                  key={idx}
                  className="group border-b border-dashed border-grey2 first:border-t [&[open]_.faq-chev]:rotate-180 [&[open]_.faq-chev]:text-brand1"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-[15px] font-bold text-text1 transition-colors hover:text-brand1 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <ChevronDown
                      className="faq-chev size-5 shrink-0 text-text2 transition-transform duration-300"
                      strokeWidth={2}
                    />
                  </summary>
                  <div className="pb-5 text-[14px] leading-[1.7] text-text2">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Subcomponents
   ────────────────────────────────────────────────────────────────── */

type TariffGroupProps = {
  title: string;
  description: string;
  tariffs: Tariff[];
  cols?: 3 | 4;
};

function TariffGroup({ title, description, tariffs, cols = 3 }: TariffGroupProps) {
  const gridCls =
    cols === 4
      ? "grid grid-cols-4 gap-5 mb-[72px] max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1"
      : "grid grid-cols-3 gap-5 mb-[72px] max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1";

  return (
    <>
      <div className="mb-8">
        <div className="mb-2 inline-flex items-center gap-3 text-[24px] font-extrabold tracking-[-0.5px] text-text1">
          <span aria-hidden="true" className="block h-6 w-1 rounded-[2px] bg-brand1" />
          {title}
        </div>
        <p className="m-0 max-w-[600px] text-[15px] leading-[1.6] text-text2">{description}</p>
      </div>
      <div className={gridCls}>
        {tariffs.map((t, i) => (
          <Reveal key={t.name} delay={((i % 3) + 1) as 1 | 2 | 3}>
            <TariffCard tariff={t} />
          </Reveal>
        ))}
      </div>
    </>
  );
}

function TariffCard({ tariff }: { tariff: Tariff }) {
  const cardCls = tariff.featured
    ? "relative z-[2] flex h-full flex-col overflow-hidden rounded-card border-[1.5px] border-brand2 bg-white shadow-[0_4px_24px_rgba(255,116,1,0.15)] transition-all duration-300 scale-[1.03] hover:shadow-[0_12px_40px_rgba(255,116,1,0.2)] hover:-translate-y-1.5 max-bp-lg:scale-100 max-bp-lg:hover:translate-y-0 max-bp-lg:hover:-translate-y-1.5"
    : "flex h-full flex-col overflow-hidden rounded-card border-[1.5px] border-grey2 bg-white shadow-soft transition-all duration-300 hover:border-brand1 hover:shadow-[0_8px_32px_rgba(64,150,255,0.12)] hover:-translate-y-1.5";

  const btnCls =
    tariff.ctaVariant === "primary"
      ? tariff.featured
        ? "block w-full text-center rounded-[8px] border-none bg-brand2 px-5 py-3.5 text-[14px] font-bold text-white shadow-[0_2px_8px_rgba(255,116,1,0.25)] transition-all duration-200 hover:bg-[#e56800] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,116,1,0.35)] mt-auto"
        : "block w-full text-center rounded-[8px] border-none bg-brand1 px-5 py-3.5 text-[14px] font-bold text-white shadow-[0_2px_8px_rgba(64,150,255,0.25)] transition-all duration-200 hover:bg-brand1-h hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(64,150,255,0.35)] mt-auto"
      : "block w-full text-center rounded-[8px] border-[1.5px] border-brand1 bg-white px-5 py-3.5 text-[14px] font-bold text-brand1 transition-all duration-200 hover:bg-brand1 hover:text-white mt-auto";

  return (
    <div className={cardCls}>
      {tariff.featured && tariff.badge && (
        <div className="flex items-center justify-center gap-1.5 bg-brand2 py-2 text-[11px] font-bold uppercase tracking-[0.5px] text-white">
          <Star size={14} strokeWidth={2} />
          {tariff.badge}
        </div>
      )}
      <div className="flex flex-1 flex-col px-6 py-7">
        <div className="mb-1 text-[20px] font-extrabold text-text1">{tariff.name}</div>
        <div className="mb-6 flex items-center gap-1.5 text-[13px] font-medium text-text2">
          <span
            aria-hidden="true"
            className="block size-1.5 rounded-full bg-brand1 opacity-50"
          />
          {tariff.volume}
        </div>
        <hr className="m-0 mb-6 h-px border-0 bg-grey2" />
        <div className="mb-1 text-[36px] font-black leading-none tracking-[-1.5px] text-brand1">
          {tariff.priceMonthly} <span className="text-[16px] font-semibold tracking-normal">руб.</span>
        </div>
        <div className="mb-2 text-[12px] font-medium text-text2">в месяц</div>
        <div className="mb-5 text-[13px] text-text2">
          или <b className="font-bold text-text1">{tariff.priceYearly} руб./год</b>
          {" "}
          <span className="text-brand1 font-bold">({tariff.perMonthYearly})</span>
        </div>
        <ul className="m-0 mb-6 flex list-none flex-col gap-2.5 p-0">
          {tariff.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-[13px] leading-[1.5] text-text2"
            >
              <Check
                size={14}
                strokeWidth={2}
                className="mt-[2px] shrink-0 text-brand1"
              />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <a href="https://brainhire.ru/signup" className={btnCls}>
          Подключить
        </a>
      </div>
    </div>
  );
}

function GuaranteeCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex h-full items-start gap-4 rounded-card border-[1.5px] border-grey2 bg-white p-7 shadow-soft transition-all duration-300 hover:border-brand1 hover:shadow-[0_8px_24px_rgba(64,150,255,0.1)] hover:-translate-y-1">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-[10px] border border-brand1/20 bg-brand1-bg">
        {icon}
      </div>
      <div>
        <div className="mb-1.5 text-[15px] font-bold text-text1">{title}</div>
        <div className="text-[13px] leading-[1.6] text-text2">{text}</div>
      </div>
    </div>
  );
}

function FitCard({
  tier,
  forText,
  focus,
}: {
  tier: string;
  forText: string;
  focus: string;
}) {
  return (
    <div className="h-full rounded-card border-[1.5px] border-grey2 bg-white p-7 shadow-soft transition-all duration-300 hover:border-brand1 hover:shadow-[0_8px_24px_rgba(64,150,255,0.1)] hover:-translate-y-1">
      <div className="mb-1.5 text-[18px] font-extrabold text-text1">{tier}</div>
      <div className="mb-3.5 text-[13px] leading-[1.5] text-text2">{forText}</div>
      <div className="rounded-[8px] border border-brand1/20 bg-brand1-bg px-3.5 py-2 text-[12px] font-bold leading-[1.4] text-brand1">
        {focus}
      </div>
    </div>
  );
}

