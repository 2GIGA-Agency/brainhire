import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/interactive/Reveal";
import { ArrowRight } from "lucide-react";

/* ────────────────────────────────────────────────────────────────────
   Static data
   ──────────────────────────────────────────────────────────────────── */

type LogoItem = {
  label: string;
  href: string;
  html: string;
};

const LOGOS: LogoItem[] = [
  {
    label: "РОСТЕЛЕКОМ",
    href: "https://kazan.rt.ru/",
    html: `<span style="font-size:13px;font-weight:700;color:#1a1a1a;letter-spacing:0.5px;">РОСТЕЛЕКОМ</span>`,
  },
  {
    label: "e-flops",
    href: "https://e-flops.ru/",
    html: `<span style="font-size:16px;font-weight:800;color:#222;letter-spacing:-0.5px;">e<span style="color:#4096FF;">-</span>flops</span>`,
  },
  {
    label: "IT PEOPLE",
    href: "https://itpeoplegroup.ru/",
    html: `<span style="font-size:12px;font-weight:800;color:#1a1a1a;letter-spacing:1.5px;text-transform:uppercase;border:2px solid #1a1a1a;padding:4px 8px;">IT PEOPLE</span>`,
  },
  {
    label: "moby",
    href: "https://moby.estate/",
    html: `<span style="font-size:17px;font-weight:800;color:#2b4de3;letter-spacing:-0.5px;">●● moby</span>`,
  },
  {
    label: "neyrox",
    href: "https://neyrox.com/",
    html: `<span style="font-size:15px;font-weight:700;color:#111;letter-spacing:-0.3px;">neyrox</span>`,
  },
  {
    label: "idaproject",
    href: "https://idaproject.com/",
    html: `<span style="font-size:14px;font-weight:700;color:#c0392b;letter-spacing:-0.3px;">ida<span style="color:#222;">project</span></span>`,
  },
  {
    label: "prodamus",
    href: "https://prodamus.ru/",
    html: `<span style="font-size:15px;font-weight:700;color:#6c3db5;letter-spacing:-0.3px;">prodamus</span>`,
  },
  {
    label: "HR ROCKET",
    href: "https://www.hr-rocket.ru/",
    html: `<span style="font-size:14px;font-weight:800;color:#1a1a1a;letter-spacing:0.5px;">HR<span style="color:#e03030;">⚡</span>ROCKET</span>`,
  },
  {
    label: "livecargo",
    href: "https://livecargo.ru/",
    html: `<span style="font-size:14px;font-weight:700;color:#1a5c3a;letter-spacing:-0.3px;">live<span style="color:#27ae60;">cargo</span></span>`,
  },
  {
    label: "LEDGO",
    href: "https://ledgo.ru/",
    html: `<span style="font-size:16px;font-weight:900;color:#f39c12;letter-spacing:-0.5px;">LED<span style="color:#e67e22;">GO</span></span>`,
  },
  {
    label: "SimbirSoft",
    href: "https://www.simbirsoft.com/",
    html: `<span style="font-size:18px;font-weight:800;color:#1a1a2e;letter-spacing:-0.5px;">Simbir<span style="color:#e03030;">S</span>oft</span>`,
  },
  {
    label: "BSS",
    href: "https://bssys.com/",
    html: `<span style="background:#1a3a8a;color:#fff;font-size:15px;font-weight:900;padding:5px 10px;border-radius:4px;letter-spacing:1px;">BSS</span>`,
  },
  {
    label: "3LOGIC GROUP",
    href: "https://3logic.ru/",
    html: `<span style="font-size:15px;font-weight:800;color:#1a1a1a;letter-spacing:-0.3px;line-height:1;">3<span style="color:#e03030;">LOGIC</span><br><span style="font-size:9px;font-weight:600;color:#555;letter-spacing:1px;">GROUP</span></span>`,
  },
  {
    label: "PENOPLEX",
    href: "https://www.penoplex.ru/",
    html: `<span style="font-size:13px;font-weight:800;color:#e03030;letter-spacing:0.5px;">PENOPLEX</span>`,
  },
  {
    label: "ПШБ",
    href: "https://pshb.ru/",
    html: `<span style="font-size:13px;font-weight:800;color:#1a3a8a;letter-spacing:1px;">ПШБ</span>`,
  },
];

const FILTER_TABS = [
  { id: "all", label: "Все" },
  { id: "it", label: "IT" },
  { id: "finance", label: "Финансы" },
  { id: "production", label: "Производство" },
  { id: "medicine", label: "Медицина" },
  { id: "retail", label: "Ритейл" },
] as const;

type CaseTagKey = "it" | "finance" | "production" | "medicine" | "retail";

type Metric = { num: string; label: string };

type CaseItem = {
  category: CaseTagKey;
  tagLabel: string;
  title: string;
  problem: string;
  metrics: Metric[];
  quoteText: string;
  quoteAuthor: string;
  quoteTitle: string;
  href: string;
};

const CASES: CaseItem[] = [
  {
    category: "it",
    tagLabel: "IT",
    title: "Автоматизация подбора технических специалистов",
    problem:
      "Компания испытывала острую нехватку разработчиков, тестировщиков и DevOps-инженеров. Цикл найма составлял 2-3 месяца, 60% кандидатов отказывались из-за длительного процесса.",
    metrics: [
      { num: "-67%", label: "время найма" },
      { num: "+78%", label: "качество подбора" },
      { num: "в 5 раз", label: "рост команды" },
      { num: "180→450", label: "специалистов" },
    ],
    quoteText:
      "«Сократили время найма на 67% и существенно снизили нагрузку на technical-лидов, которые теперь встречаются только с предквалифицированными специалистами.»",
    quoteAuthor: "Елена Петрова",
    quoteTitle: "Head of People",
    href: "/case/it",
  },
  {
    category: "finance",
    tagLabel: "Финансы",
    title: "Трансформация процессов найма в финансовом секторе",
    problem:
      "Банк столкнулся с критическими вызовами в подборе персонала. Кандидаты проходили до 7 этапов отбора за 60-90 дней. Требовался найм 150-200 специалистов ежеквартально для новых отделений.",
    metrics: [
      { num: "-71%", label: "цикл найма" },
      { num: "+76%", label: "качество отбора" },
      { num: "в 8 раз", label: "рост персонала" },
      { num: "3 200→6 800", label: "сотрудников" },
    ],
    quoteText:
      "«Сократили цикл найма более чем на 70%, при этом значительно улучшили качество отбора. Видим снижение текучести на 58% среди сотрудников, нанятых через новую систему.»",
    quoteAuthor: "Марина Волкова",
    quoteTitle: "Директор по управлению талантами",
    href: "/case/finance",
  },
  {
    category: "production",
    tagLabel: "Производство",
    title: "Автоматизация подбора производственного персонала",
    problem:
      "Критическая нехватка производственного персонала. Требовалось закрывать 150-200 вакансий ежемесячно. 35% новых сотрудников увольнялись в первые 3 месяца. 4 рекрутера не справлялись с потоком.",
    metrics: [
      { num: "-65%", label: "время найма" },
      { num: "+72%", label: "удержание" },
      { num: "в 9 раз", label: "рост штата" },
      { num: "3 300→8 500", label: "сотрудников" },
    ],
    quoteText:
      "«Сократили время закрытия вакансий на 65% и значительно повысили качество подбора. Система помогла масштабировать найм без пропорционального увеличения HR-команды.»",
    quoteAuthor: "Александра Михайлова",
    quoteTitle: "HR-директор",
    href: "/case/production",
  },
  {
    category: "medicine",
    tagLabel: "Медицина",
    title: "Оптимизация найма медицинского персонала",
    problem:
      "Острый дефицит врачей — особенно узких специалистов. Процесс найма 3-4 месяца. Сложная верификация квалификации. 30% среднего медперсонала увольнялись в первые полгода.",
    metrics: [
      { num: "-69%", label: "время найма" },
      { num: "+83%", label: "охват специалистов" },
      { num: "в 6 раз", label: "рост персонала" },
      { num: "1 100→2 400", label: "специалистов" },
    ],
    quoteText:
      "«Ускорили процесс найма на 69% и значительно расширили воронку кандидатов. Система находит специалистов, о которых мы даже не знали, и оценивает их квалификацию ещё до первого контакта.»",
    quoteAuthor: "Анна Козлова",
    quoteTitle: "Руководитель HR-департамента",
    href: "/case/medicine",
  },
  {
    category: "retail",
    tagLabel: "Ритейл",
    title: "Масштабный подбор персонала в регионах",
    problem:
      "Агрессивное расширение сети: 300-400 вакансий ежемесячно по всей стране. Только 15% откликнувшихся доходили до оффера. 40% новых сотрудников увольнялись в первые 2 месяца.",
    metrics: [
      { num: "-73%", label: "время закрытия" },
      { num: "+85%", label: "охват кандидатов" },
      { num: "в 11 раз", label: "эффективность" },
      { num: "2 100→12 000", label: "наймов/год" },
    ],
    quoteText:
      "«Сократили время найма на 73% и существенно улучшили качество подбора. Теперь открытие новых магазинов не сдерживается дефицитом персонала.»",
    quoteAuthor: "Дмитрий Соколов",
    quoteTitle: "Руководитель департамента HR",
    href: "/case/retail",
  },
];

const CASE_TAG_CLASSES: Record<CaseTagKey, string> = {
  it: "bg-brand1 text-white",
  finance: "bg-brand2 text-white",
  production: "bg-brand3 text-white",
  medicine: "bg-[#f0fdf4] text-[#16a34a]",
  retail: "bg-[#faf5ff] text-[#9333ea]",
};

type SummaryItem = {
  num: string;
  label: string;
  pillLabel: string;
  pillClass: string;
};

const SUMMARY: SummaryItem[] = [
  {
    num: "в 5×",
    label: "Рост команды разработки за 12 месяцев",
    pillLabel: "IT",
    pillClass: "bg-brand1-bg text-brand1",
  },
  {
    num: "в 8×",
    label: "Масштабирование штата банка за 18 месяцев",
    pillLabel: "Финансы",
    pillClass: "bg-brand2-bg text-brand2",
  },
  {
    num: "в 9×",
    label: "Рост производственного штата за 24 месяца",
    pillLabel: "Производство",
    pillClass: "bg-[rgba(18,83,109,0.1)] text-brand3",
  },
  {
    num: "в 6×",
    label: "Расширение медицинского персонала за 18 месяцев",
    pillLabel: "Медицина",
    pillClass: "bg-[#f0fdf4] text-[#16a34a]",
  },
  {
    num: "в 11×",
    label: "Рост эффективности найма в ритейле за 12 месяцев",
    pillLabel: "Ритейл",
    pillClass: "bg-[#faf5ff] text-[#9333ea]",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Как начать пилот?",
    a: "Зарегистрируйтесь и получите 100 бесплатных кандидатов для оценки платформы. Подключение занимает 1-2 дня.",
  },
  {
    q: "Сколько длится внедрение?",
    a: "Система готова к работе сразу после регистрации. Полная настройка под ваши процессы — 1-2 дня с менеджером.",
  },
  {
    q: "Подходит ли BRaiN HR для нашей отрасли?",
    a: "Да, платформа адаптируется под любую отрасль — от IT до производства и медицины. Это подтверждают кейсы выше.",
  },
  {
    q: "Какие результаты ожидать?",
    a: "Клиенты сокращают время найма на 60-73% и снижают текучесть на 25-58% уже в первые месяцы использования.",
  },
];

/* ────────────────────────────────────────────────────────────────────
   Component
   ──────────────────────────────────────────────────────────────────── */

export function CaseHubPage() {
  const doubledLogos = [...LOGOS, ...LOGOS];

  return (
    <main>
      {/* ═══ 1. HERO ═══ */}
      <section className="bg-white pt-[88px] pb-14">
        <Container>
          <h1 className="mb-4 text-[clamp(36px,5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.2px] text-text1">
            Кейсы внедрения <em className="not-italic text-brand1">BRaiN HR</em>
          </h1>
          <p className="max-w-[640px] text-[17px] leading-[1.7] text-text2">
            Как компании из разных отраслей ускорили найм и снизили расходы с помощью ИИ-автоматизации
          </p>
        </Container>
      </section>

      {/* ═══ 2. LOGOS SLIDER ═══ */}
      <section className="border-y border-grey2 bg-white py-8">
        <Container>
          <div className="mb-5 text-center text-[12px] font-semibold uppercase tracking-[1px] text-text2">
            Нам доверяют компании из разных отраслей
          </div>
        </Container>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-20 bg-gradient-to-l from-white to-transparent" />
          <div className="flex w-max items-center animate-ticker hover:[animation-play-state:paused]">
            {doubledLogos.map((logo, i) => (
              <a
                key={i}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={logo.label}
                className="inline-flex h-[68px] shrink-0 items-center justify-center whitespace-nowrap border-r border-grey2 px-9 leading-[1.2] opacity-60 transition-opacity hover:opacity-100 last:border-r-0"
                dangerouslySetInnerHTML={{ __html: logo.html }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. FILTERS + CASE CARDS ═══ */}
      <section className="border-b border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Все кейсы
          </h2>

          {/* Filter pills — статичные, активна «Все» (Phase 5: интерактивность) */}
          <div className="mt-6 mb-10 flex flex-wrap justify-start gap-2">
            {FILTER_TABS.map((tab) => {
              const isActive = tab.id === "all";
              return (
                <button
                  key={tab.id}
                  type="button"
                  disabled
                  className={`inline-flex items-center rounded-full border px-[22px] py-2.5 text-[13px] font-semibold transition-all max-bp-sm:px-4 max-bp-sm:py-2 max-bp-sm:text-[12px] ${
                    isActive
                      ? "border-brand1 bg-brand1 text-white"
                      : "cursor-not-allowed border-grey2 bg-grey1 text-text2"
                  }`}
                  title={
                    isActive
                      ? undefined
                      : "Интерактивная фильтрация появится в Фазе 5"
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-7">
            {CASES.map((c, idx) => (
              <Reveal key={c.title} delay={((idx % 3) + 1) as 1 | 2 | 3}>
                <article
                  className="h-full rounded-card border border-grey2 bg-white px-9 py-8 shadow-soft transition-[border-color,box-shadow] duration-200 hover:border-brand1 max-bp-lg:px-5 max-bp-lg:py-6"
                >
                <span
                  className={`mb-4 inline-block rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.5px] ${CASE_TAG_CLASSES[c.category]}`}
                >
                  {c.tagLabel}
                </span>

                <h3 className="mb-3 text-[20px] font-extrabold leading-[1.3] text-text1">
                  {c.title}
                </h3>

                <p className="mb-6 max-w-[800px] text-[14px] leading-[1.7] text-text2">
                  {c.problem}
                </p>

                <div className="mb-6 grid grid-cols-4 gap-4 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-2 max-bp-xs:grid-cols-1">
                  {c.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-sm border border-grey2 bg-grey1 px-2 py-4 text-center"
                    >
                      <div className="mb-1 text-[24px] font-black leading-[1.2] text-brand1 max-bp-sm:text-[20px]">
                        {m.num}
                      </div>
                      <div className="text-[12px] font-medium leading-[1.4] text-text2">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-5 rounded-sm border-l-[3px] border-brand1 bg-brand1-bg px-6 py-5">
                  <div className="mb-2.5 text-[14px] italic leading-[1.7] text-text1">
                    {c.quoteText}
                  </div>
                  <div className="text-[13px] font-bold text-text1">
                    {c.quoteAuthor}
                  </div>
                  <div className="text-[12px] text-text2">{c.quoteTitle}</div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={c.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand1 px-[22px] py-2.5 text-[13px] font-semibold text-brand1 transition-colors duration-200 hover:bg-brand1 hover:text-white"
                  >
                    Читать полностью
                    <ArrowRight size={14} strokeWidth={1.8} />
                  </Link>
                </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 4. SUMMARY RESULTS ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Результаты наших клиентов
          </h2>

          <div className="mt-10 grid grid-cols-5 gap-5 max-bp-lg:grid-cols-3 max-bp-md:grid-cols-2 max-bp-xs:grid-cols-1">
            {SUMMARY.map((s, i) => (
              <Reveal key={s.label} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div
                  className="h-full rounded-card border border-grey2 bg-white px-4 pt-7 pb-5 text-center shadow-soft"
                >
                  <div className="mb-2 text-[32px] font-black leading-[1.2] text-brand1">
                    {s.num}
                  </div>
                  <div className="mb-3 text-[13px] leading-[1.5] text-text2">
                    {s.label}
                  </div>
                  <span
                    className={`inline-block rounded-full px-2.5 py-[3px] text-[10px] font-bold uppercase tracking-[0.3px] ${s.pillClass}`}
                  >
                    {s.pillLabel}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 5. CTA ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <div className="mx-auto max-w-[720px] text-center">
            <h2 className="mb-4 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
              Хотите таких же результатов?
            </h2>
            <p className="mx-auto mb-8 max-w-[520px] text-[15px] leading-[1.72] text-text2">
              Начните с бесплатного пилота — первые 100 кандидатов без оплаты
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-bp-xs:flex-col max-bp-xs:items-center">
              <Button href="https://brainhire.ru/signup" variant="hero-primary" external>
                100 кандидатов бесплатно
              </Button>
              <Button href="https://brainhire.ru/demo" variant="hero-outline" external>
                Получить демо
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ 6. FAQ — два столбца ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14">
        <Container>
          <div className="grid grid-cols-[1fr_1.5fr] items-start gap-16 max-bp-lg:grid-cols-1 max-bp-lg:gap-8">
            <div>
              <h2 className="mb-3 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
                Частые <em className="not-italic text-brand1">вопросы</em>
              </h2>
              <p className="text-[15px] leading-[1.72] text-text2">
                Ответы на популярные вопросы о внедрении и использовании BRaiN HR
              </p>
            </div>

            <div className="flex flex-col">
              {FAQ.map(({ q, a }, i) => (
                <details
                  key={q}
                  className={`group border-b border-dashed border-grey2 ${i === 0 ? "border-t" : ""}`}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-[15px] font-bold text-text1 transition-colors hover:text-brand1 [&::-webkit-details-marker]:hidden">
                    <span>{q}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-5 shrink-0 text-text2 transition-transform duration-300 group-open:rotate-180 group-open:text-brand1"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="pb-5 text-[14px] leading-[1.7] text-text2">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
