import {
  Shield,
  Zap,
  Layers,
  Target,
  TrendingUp,
  Headphones,
  FileText,
  Play,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/interactive/Reveal";

type LogoItem = {
  href: string;
  render: () => React.ReactNode;
};

const LOGOS: LogoItem[] = [
  {
    href: "https://itpeoplegroup.ru/",
    render: () => (
      <span className="border-2 border-[#1a1a1a] px-2 py-1 text-[12px] font-extrabold uppercase tracking-[1.5px] text-[#1a1a1a]">
        IT PEOPLE
      </span>
    ),
  },
  {
    href: "https://moby.estate/",
    render: () => (
      <span className="text-[17px] font-extrabold tracking-[-0.5px] text-[#2b4de3]">
        {"●● moby"}
      </span>
    ),
  },
  {
    href: "https://neyrox.com/",
    render: () => (
      <span className="text-[15px] font-bold tracking-[-0.3px] text-[#111]">
        neyrox
      </span>
    ),
  },
  {
    href: "https://idaproject.com/",
    render: () => (
      <span className="text-[14px] font-bold tracking-[-0.3px] text-[#c0392b]">
        ida<span className="text-[#222]">project</span>
      </span>
    ),
  },
  {
    href: "https://prodamus.ru/",
    render: () => (
      <span className="text-[15px] font-bold tracking-[-0.3px] text-[#6c3db5]">
        prodamus
      </span>
    ),
  },
  {
    href: "https://www.hr-rocket.ru/",
    render: () => (
      <span className="text-[14px] font-extrabold tracking-[0.5px] text-[#1a1a1a]">
        HR<span className="text-[#e03030]">{"⚡"}</span>ROCKET
      </span>
    ),
  },
  {
    href: "https://livecargo.ru/",
    render: () => (
      <span className="text-[14px] font-bold tracking-[-0.3px] text-[#1a5c3a]">
        live<span className="text-[#27ae60]">cargo</span>
      </span>
    ),
  },
  {
    href: "https://ledgo.ru/",
    render: () => (
      <span className="text-[16px] font-black tracking-[-0.5px] text-[#f39c12]">
        LED<span className="text-[#e67e22]">GO</span>
      </span>
    ),
  },
  {
    href: "https://www.penoplex.ru/",
    render: () => (
      <span className="text-[13px] font-extrabold tracking-[0.5px] text-[#e03030]">
        PENOPLEX
      </span>
    ),
  },
  {
    href: "https://pshb.ru/",
    render: () => (
      <span className="text-[13px] font-extrabold tracking-[1px] text-[#1a3a8a]">
        ПШБ
      </span>
    ),
  },
  {
    href: "https://www.simbirsoft.com/",
    render: () => (
      <span className="text-[18px] font-extrabold tracking-[-0.5px] text-[#1a1a2e]">
        Simbir<span className="text-[#e03030]">S</span>oft
      </span>
    ),
  },
  {
    href: "https://bssys.com/",
    render: () => (
      <span className="rounded bg-[#1a3a8a] px-[10px] py-[5px] text-[15px] font-black tracking-[1px] text-white">
        BSS
      </span>
    ),
  },
  {
    href: "https://3logic.ru/",
    render: () => (
      <span className="text-[15px] font-extrabold leading-[1.2] tracking-[-0.3px] text-[#1a1a1a]">
        3<span className="text-[#e03030]">LOGIC</span>
        <br />
        <span className="text-[9px] font-semibold tracking-[1px] text-[#555]">
          GROUP
        </span>
      </span>
    ),
  },
];

const TIMELINE = [
  {
    year: "2024",
    text:
      "Ноябрь — запуск MVP платформы BRaiN HR. Основание ООО «НДК», первые пользователи и тестирование ключевых гипотез.",
  },
  {
    year: "2025",
    text:
      "Появление основных функций: ИИ-скрининг резюме, видеоинтервью с ИИ-аватаром, оценка персонала. Выход на рынок и первые клиенты.",
  },
  {
    year: "2026",
    text:
      "Партнёрства и интеграции с крупнейшими компаниями России — МТС, Tenchat. Масштабирование платформы и расширение отраслевых решений.",
  },
];

const ADVANTAGES = [
  {
    Icon: Shield,
    title: "Российская разработка",
    text:
      "Полностью отечественная платформа. Данные хранятся на территории РФ в соответствии с 152-ФЗ.",
  },
  {
    Icon: Zap,
    title: "Быстрое внедрение",
    text:
      "Подключение за 1-2 дня без сложных интеграций. Система готова к работе сразу после регистрации.",
  },
  {
    Icon: Layers,
    title: "Отраслевая адаптация",
    text:
      "Специализированные решения для IT, финансов, производства, медицины и ритейла.",
  },
  {
    Icon: Target,
    title: "Объективная оценка",
    text:
      "ИИ-алгоритмы исключают субъективность из процесса отбора. Решения основаны на данных.",
  },
  {
    Icon: TrendingUp,
    title: "Масштабируемость",
    text:
      "От 10 до 10 000 вакансий в месяц. Платформа растёт вместе с вашим бизнесом.",
  },
  {
    Icon: Headphones,
    title: "Поддержка 24/7",
    text:
      "Персональный менеджер, техподдержка и помощь в настройке процессов.",
  },
];

const MEDIA = [
  {
    href: "https://secrets.tbank.ru/blogi-kompanij/cifrovizaciya-hr-processov/",
    logo: (
      <svg width="80" height="32" viewBox="0 0 80 32" fill="none" aria-hidden="true">
        <rect width="80" height="32" rx="4" fill="#FFDD2D" />
        <text
          x="40"
          y="21"
          textAnchor="middle"
          fontFamily="Montserrat,Arial,sans-serif"
          fontSize="14"
          fontWeight="800"
          fill="#333"
        >
          T Bank
        </text>
      </svg>
    ),
    title: "Цифровизация HR-процессов",
    source: "secrets.tbank.ru",
  },
  {
    href: "https://spark.ru/startup/spark-news/blog/245949/v-rossii-prezentovana-novaya-platforma-brain-hr",
    logo: (
      <svg width="80" height="32" viewBox="0 0 80 32" fill="none" aria-hidden="true">
        <rect width="80" height="32" rx="4" fill="#FF6600" />
        <text
          x="40"
          y="21"
          textAnchor="middle"
          fontFamily="Montserrat,Arial,sans-serif"
          fontSize="14"
          fontWeight="800"
          fill="#fff"
        >
          Spark
        </text>
      </svg>
    ),
    title: "В России презентована новая платформа BRaiN HR",
    source: "spark.ru",
  },
  {
    href: "https://www.cnews.ru/news/line/2025-02-14_novaya_platforma_brain_hr",
    logo: (
      <svg width="80" height="32" viewBox="0 0 80 32" fill="none" aria-hidden="true">
        <rect width="80" height="32" rx="4" fill="#CC0000" />
        <text
          x="40"
          y="21"
          textAnchor="middle"
          fontFamily="Montserrat,Arial,sans-serif"
          fontSize="14"
          fontWeight="800"
          fill="#fff"
        >
          CNews
        </text>
      </svg>
    ),
    title: "Новая платформа BRaiN HR для автоматизации найма",
    source: "cnews.ru",
  },
];

const LEADERS = [
  {
    img: "/assets/team/dmitriy.webp",
    name: "Дмитрий Сухвал",
    role: "Основатель",
    bio: "Предприниматель в сфере ИИ-технологий, основатель ООО «НДК» и платформы BRaiN HR. Образование в области экономики и управления, резидент Сколково.",
    social: { href: "https://tenchat.ru/4817715", label: "TenChat" },
  },
  {
    img: "/assets/team/boris.webp",
    name: "Борис Горштейн",
    role: "CPO & Сооснователь",
    bio: "Сооснователь и продуктовый директор. По образованию юрист, прошёл путь через стартап-экосистему Сан-Франциско. Отвечает за продуктовую стратегию платформы.",
    social: { href: "https://tenchat.ru/BRaiNhire", label: "TenChat" },
  },
  {
    img: "/assets/team/ignat.webp",
    name: "Игнат Сапожников",
    role: "CTO",
    bio: "Технический директор, отвечает за разработку и архитектуру платформы BRaiN HR.",
    social: { href: "https://tenchat.ru/4777353", label: "TenChat" },
  },
];

export function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-white pt-[88px] pb-14 max-bp-xs:pt-[72px] max-bp-xs:pb-10">
        <Container>
          <div className="mb-6 flex items-center gap-2 text-[13px] text-text2">
            <a
              href="https://brainhire.ru/"
              className="text-brand1 transition-colors hover:underline"
            >
              Главная
            </a>
            <span className="text-text2">/</span>
            <span className="text-text2">О компании</span>
          </div>
          <h1 className="mb-4 text-[clamp(36px,5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.2px] text-text1">
            О компании
          </h1>
          <p className="max-w-[640px] text-[17px] leading-[1.7] text-text2">
            BRaiN HR — ИИ-платформа для автоматизации найма и управления
            персоналом. Мы помогаем компаниям нанимать быстрее, дешевле и
            качественнее.
          </p>

          {/* Video player */}
          <div className="relative mt-8 max-w-[800px] overflow-hidden rounded-[14px] shadow-[0_8px_48px_rgba(17,38,58,0.16)]">
            <div className="group relative aspect-video cursor-pointer overflow-hidden rounded-[14px] bg-[#1a2a3a]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://brainhire.ru/images/videoPreview.avif"
                alt="Демонстрация платформы BRaiN HR"
                className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(17,38,58,0.1)] to-[rgba(17,38,58,0.35)] transition-colors group-hover:from-[rgba(17,38,58,0.15)] group-hover:to-[rgba(17,38,58,0.5)]" />
              <div className="absolute inset-0 z-[2] flex items-center justify-center">
                <span className="flex size-[72px] items-center justify-center rounded-full bg-brand1 p-4 shadow-[0_4px_32px_rgba(64,150,255,0.5)] transition-all group-hover:scale-110 group-hover:shadow-[0_8px_48px_rgba(64,150,255,0.65)]">
                  <Play size={32} fill="white" stroke="white" />
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CLIENT BRANDS */}
      <section className="border-y border-grey2 bg-grey1 py-8">
        <Container className="mb-3">
          <div className="text-center text-[12px] font-bold uppercase tracking-[1px] text-text2">
            Нам доверяют компании — технологические лидеры из разных отраслей
          </div>
        </Container>
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-grey1 to-transparent" />
          <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-grey1 to-transparent" />
          <div className="flex w-max animate-ticker">
            {[...LOGOS, ...LOGOS].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[68px] shrink-0 items-center justify-center px-9 leading-[1.2] opacity-60 transition-opacity hover:opacity-100 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-grey2"
              >
                {item.render()}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* HISTORY / TIMELINE */}
      <section className="bg-white py-20">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            История создания и развития
          </h2>
          <p className="mt-6 mb-12 max-w-[800px] text-[15px] leading-[1.72] text-text2">
            BRaiN HR основан в 2024 году командой специалистов в области ИИ и
            HR-технологий. Мы увидели, что процесс найма в большинстве компаний
            остаётся ручным, медленным и субъективным — и решили это изменить.
          </p>

          {/* Desktop timeline (>960) */}
          <div className="relative mt-12 flex gap-0 max-bp-lg:hidden">
            <div className="absolute left-0 right-0 top-7 z-0 h-[3px] bg-grey2" />
            {TIMELINE.map((t) => (
              <div key={t.year} className="relative flex-1 px-3">
                <div className="relative top-[21px] z-[1] mx-auto mb-5 size-4 rounded-full border-[3px] border-brand1-bg bg-brand1" />
                <div>
                  <div className="mt-9 mb-2 text-center text-[clamp(28px,3vw,36px)] font-black text-brand1">
                    {t.year}
                  </div>
                  <div className="text-center text-[14px] leading-[1.6] text-text2">
                    {t.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile timeline (<=960) */}
          <div className="relative mt-12 hidden flex-col gap-0 max-bp-lg:flex">
            <div className="absolute bottom-0 left-7 top-0 z-0 w-[3px] bg-grey2" />
            {TIMELINE.map((t) => (
              <div key={t.year} className="relative flex items-start gap-5 pb-8">
                <div className="relative z-[1] mt-1 ml-[21px] size-4 shrink-0 rounded-full border-[3px] border-brand1-bg bg-brand1" />
                <div>
                  <div className="mb-2 text-[clamp(28px,3vw,36px)] font-black text-brand1">
                    {t.year}
                  </div>
                  <div className="text-[14px] leading-[1.6] text-text2">
                    {t.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* MISSION */}
      <section className="bg-grey1 py-20">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Миссия компании
          </h2>
          <div className="mt-6 mb-6 rounded-card border-l-4 border-brand1 bg-white p-8 shadow-soft max-bp-sm:p-6">
            <p className="text-[18px] font-semibold leading-[1.6] text-text1 max-bp-sm:text-base">
              Мы трансформируем процесс найма и управления персоналом с помощью
              технологий искусственного интеллекта, освобождая время
              HR-специалистов и владельцев бизнеса.
            </p>
          </div>
          <p className="max-w-[800px] text-[15px] leading-[1.72] text-text2">
            Наши продукты помогают быстро нанимать сотрудников, адаптировать их
            под стандарты компании, управлять их развитием и эффективно
            использовать человеческий капитал. Решения от BRaiN HR подходят для
            любого типа бизнеса: от небольших стартапов до крупных корпораций.
          </p>
        </Container>
      </section>

      {/* ADVANTAGES */}
      <section className="bg-white py-20">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Преимущества компании
          </h2>
          <div className="mt-10 grid grid-cols-3 gap-6 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
            {ADVANTAGES.map(({ Icon: AdvIcon, title, text }, i) => (
              <Reveal key={title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div
                  className="h-full rounded-card border border-grey2 bg-white p-8 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand1 hover:shadow-[0_8px_32px_rgba(64,150,255,0.15)] max-bp-xs:p-6"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-brand1-bg">
                    <AdvIcon size={24} stroke="#4096FF" strokeWidth={1.8} />
                  </div>
                  <h3 className="mb-2 text-[16px] font-bold text-text1">
                    {title}
                  </h3>
                  <p className="text-[14px] leading-[1.65] text-text2">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* СМИ О НАС */}
      <section className="bg-grey1 py-20">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            СМИ о нас
          </h2>
          <div className="mt-10 grid grid-cols-3 gap-6 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
            {MEDIA.map((m, i) => (
              <Reveal key={m.href} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col gap-4 rounded-card border border-grey2 bg-white p-8 no-underline shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand1 hover:shadow-[0_8px_32px_rgba(64,150,255,0.15)]"
                >
                  <div className="flex h-8 items-center">{m.logo}</div>
                  <div className="text-[15px] font-bold leading-[1.4] text-text1">
                    {m.title}
                  </div>
                  <div className="mt-auto text-[13px] font-semibold text-brand1">
                    {m.source}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CERTIFICATES */}
      <section className="bg-white py-20">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Сертификаты и свидетельства
          </h2>
          <p className="mt-6 max-w-[800px] text-[15px] leading-[1.72] text-text2">
            BRaiN HR — зарегистрированное программное обеспечение. Платформа
            соответствует требованиям российского законодательства.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
            {/* Cert 1 — link with image */}
            <a
              href="/assets/docs/kartochka-reestra.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer overflow-hidden rounded-card border border-grey2 bg-white text-inherit no-underline shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand1 hover:shadow-[0_8px_32px_rgba(64,150,255,0.15)]"
            >
              <div className="flex aspect-[210/297] w-full items-center justify-center bg-grey1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/docs/kartochka-reestra-preview.webp"
                  alt="Карточка записи реестра российского ПО"
                  className="block h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="px-4 py-[14px]">
                <div className="text-[14px] font-bold leading-[1.4] text-text1">
                  Карточка записи реестра российского ПО
                </div>
              </div>
            </a>

            {/* Cert 2 — placeholder */}
            <div className="block cursor-pointer overflow-hidden rounded-card border border-grey2 bg-white shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand1 hover:shadow-[0_8px_32px_rgba(64,150,255,0.15)]">
              <div className="flex aspect-[210/297] w-full items-center justify-center bg-grey1">
                <div className="flex flex-col items-center gap-3 text-text2">
                  <FileText size={48} strokeWidth={1.5} className="opacity-40" />
                  <span className="text-[12px] font-semibold">Документ</span>
                </div>
              </div>
              <div className="px-4 py-[14px]">
                <div className="text-[14px] font-bold leading-[1.4] text-text1">
                  Членство в АЛРИИ
                </div>
              </div>
            </div>

            {/* Cert 3 — Ответ по Заявке Сколково */}
            <a
              href="/assets/docs/otvet-po-zayavke.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer overflow-hidden rounded-card border border-grey2 bg-white text-inherit no-underline shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand1 hover:shadow-[0_8px_32px_rgba(64,150,255,0.15)]"
            >
              <div className="flex aspect-[210/297] w-full items-center justify-center bg-grey1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/docs/otvet-po-zayavke-preview.webp"
                  alt="Ответ по Заявке — Свидетельство резидента Сколково"
                  className="block h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="px-4 py-[14px]">
                <div className="text-[14px] font-bold leading-[1.4] text-text1">
                  Свидетельство резидента Сколково
                </div>
              </div>
            </a>
          </div>
        </Container>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-grey1 py-20">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Руководство компании
          </h2>
          <div className="mt-10 grid grid-cols-3 gap-6 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
            {LEADERS.map((l, i) => (
              <Reveal key={l.name} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div
                  className="h-full rounded-card border border-grey2 bg-white p-8 text-center shadow-soft transition-all duration-200 hover:border-brand1 hover:shadow-md max-bp-xs:p-6"
                >
                  <div className="mx-auto mb-4 flex size-20 items-center justify-center overflow-hidden rounded-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={l.img}
                      alt={l.name}
                      className="h-full w-full rounded-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="mb-1 text-[16px] font-bold text-text1">
                    {l.name}
                  </div>
                  <div className="mb-3 text-[13px] font-semibold text-brand1">
                    {l.role}
                  </div>
                  <p className="text-[14px] leading-[1.6] text-text2">{l.bio}</p>
                  <a
                    href={l.social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand1 no-underline hover:underline"
                  >
                    {l.social.label}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* TEAM & OFFICE */}
      <section className="bg-white py-20">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Наш коллектив
          </h2>
          <p className="mt-6 mb-10 max-w-[800px] text-[15px] leading-[1.72] text-text2">
            В команде BRaiN HR — специалисты по машинному обучению, HR-эксперты,
            разработчики и дизайнеры. Мы объединены общей целью: сделать найм
            быстрым, объективным и доступным для каждой компании.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/team/team-photo.webp"
            alt="Команда BRaiN HR"
            className="mb-8 block w-full rounded-card border border-grey2"
            loading="lazy"
          />
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-grey1 py-20 text-center">
        <Container>
          <h2 className="mb-4 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Готовы трансформировать найм?
          </h2>
          <p className="mb-8 text-[17px] leading-[1.7] text-text2">
            Начните с бесплатного пилота — первые 100 кандидатов без оплаты.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="https://brainhire.ru/signup" variant="hero-primary">
              100 кандидатов бесплатно
            </Button>
            <Button href="https://brainhire.ru/contacts" variant="hero-outline">
              Связаться с нами
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
