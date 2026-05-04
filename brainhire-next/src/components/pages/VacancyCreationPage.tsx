import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FaqAccordion, type FaqItem } from "@/components/ui/FaqAccordion";
import { LeadForm } from "@/components/interactive/LeadForm";
import { AudienceTabs, type AudienceItem } from "@/components/interactive/AudienceTabs";
import { Reveal } from "@/components/interactive/Reveal";
import {
  ArrowRight,
  Clock,
  AlertTriangle,
  UserX,
  FileText,
  Edit3,
  Zap,
  BarChart3,
  Send,
  Search,
  CheckCircle2,
  Info,
  Check,
  XCircle,
  BarChart2,
  MessageSquare,
  Video,
  Layers,
} from "lucide-react";

const TICKER_ITEMS = [
  { Icon: Zap, label: "Генерация за 30 секунд" },
  { Icon: BarChart2, label: "SEO-оптимизация" },
  { Icon: BarChart3, label: "Адаптация под hh.ru" },
  { Icon: Send, label: "Мультиязычная генерация" },
  { Icon: FileText, label: "Анализ текста" },
  { Icon: Layers, label: "Библиотека шаблонов" },
];

const PAINS = [
  {
    Icon: Clock,
    title: "2+ часа на одну вакансию",
    text: "Рекрутер тратит 2-4 часа на подготовку текста одной вакансии. При нескольких открытых позициях — это целые рабочие дни на написание описаний вместо работы с кандидатами.",
  },
  {
    Icon: AlertTriangle,
    title: "Шаблонные тексты не привлекают",
    text: "Скопированные описания вакансий выглядят одинаково и не выделяются среди конкурентов. Кандидаты пролистывают шаблонные тексты, не находя уникального предложения.",
  },
  {
    Icon: UserX,
    title: "Поток нерелевантных откликов",
    text: "Нечёткие формулировки в описании вакансии привлекают неподходящих кандидатов. Рекрутер тратит время на обработку откликов, которые не соответствуют требованиям.",
  },
  {
    Icon: FileText,
    title: "Нет единого стандарта",
    text: "Каждый рекрутер пишет вакансии в своём стиле. Нет единого корпоративного стандарта, тексты различаются по качеству и структуре, что размывает бренд работодателя.",
  },
];

const STATS = [
  { num: "30 сек", desc: "генерация полного\nописания вакансии" },
  { num: "3x", desc: "больше откликов\nна вакансию" },
  { num: "70%", desc: "меньше времени\nна создание вакансий" },
  { num: "100+", desc: "готовых шаблонов\nдля разных отраслей" },
];

const STEPS = [
  {
    num: "Шаг 1",
    time: "10 сек",
    Icon: Edit3,
    title: "Укажите должность и отрасль",
    text: "Введите название позиции, отрасль и ключевые требования. Достаточно минимальных вводных — ИИ сделает остальное",
  },
  {
    num: "Шаг 2",
    time: "30 сек",
    Icon: Zap,
    title: "ИИ генерирует описание",
    text: "Искусственный интеллект создаёт полное описание вакансии с обязанностями, требованиями, условиями и SEO-оптимизацией",
  },
  {
    num: "Шаг 3",
    time: "2 мин",
    Icon: Edit3,
    title: "Настройте под себя",
    text: "Отредактируйте текст, добавьте детали о компании или измените акценты. Полный контроль над финальным результатом",
  },
  {
    num: "Шаг 4",
    time: "авто",
    Icon: Send,
    title: "Опубликуйте на площадках",
    text: "Вакансия автоматически адаптируется под формат каждой площадки и публикуется на hh.ru и других платформах",
  },
];

const LOGO_ITEMS = [
  {
    href: "https://www.simbirsoft.com/",
    el: (
      <span className="text-[18px] font-extrabold tracking-[-0.5px] text-[#1a1a2e]">
        Simbir<span className="text-[#e03030]">S</span>oft
      </span>
    ),
  },
  {
    href: "https://bssys.com/",
    el: (
      <span className="rounded-[4px] bg-[#1a3a8a] px-2.5 py-[5px] text-[15px] font-black tracking-[1px] text-white">
        BSS
      </span>
    ),
  },
  {
    href: "https://3logic.ru/",
    el: (
      <span className="text-[15px] font-extrabold tracking-[-0.3px] text-[#1a1a1a]">
        3<span className="text-[#e03030]">LOGIC</span>
        <br />
        <span className="text-[9px] font-semibold tracking-[1px] text-[#555]">
          GROUP
        </span>
      </span>
    ),
  },
  {
    href: "https://kazan.rt.ru/",
    el: (
      <span className="text-[13px] font-bold tracking-[0.5px] text-[#1a1a1a]">
        РОСТЕЛЕКОМ
      </span>
    ),
  },
  {
    href: "https://e-flops.ru/",
    el: (
      <span className="text-[16px] font-extrabold tracking-[-0.5px] text-[#222]">
        e<span className="text-brand1">-</span>flops
      </span>
    ),
  },
  {
    href: "https://itpeoplegroup.ru/",
    el: (
      <span className="border-2 border-[#1a1a1a] px-2 py-1 text-[12px] font-extrabold uppercase tracking-[1.5px] text-[#1a1a1a]">
        IT PEOPLE
      </span>
    ),
  },
  {
    href: "https://moby.estate/",
    el: (
      <span className="text-[17px] font-extrabold tracking-[-0.5px] text-[#2b4de3]">
        moby
      </span>
    ),
  },
  {
    href: "https://www.hr-rocket.ru/",
    el: (
      <span className="text-[14px] font-extrabold tracking-[0.5px] text-[#1a1a1a]">
        HR ROCKET
      </span>
    ),
  },
  {
    href: "https://prodamus.ru/",
    el: (
      <span className="text-[15px] font-bold tracking-[-0.3px] text-[#6c3db5]">
        prodamus
      </span>
    ),
  },
  {
    href: "https://www.penoplex.ru/",
    el: (
      <span className="text-[13px] font-extrabold tracking-[0.5px] text-[#e03030]">
        PENOPLEX
      </span>
    ),
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Как работает генератор вакансий BRaiN HR?",
    a: "Генератор вакансий BRaiN HR использует передовые языковые модели для создания профессиональных описаний вакансий. Вы указываете должность, отрасль и ключевые требования, а ИИ за 30 секунд формирует полный текст с обязанностями, требованиями, условиями работы и SEO-оптимизацией. Текст можно редактировать и адаптировать перед публикацией.",
  },
  {
    q: "Можно ли редактировать созданный текст вакансии?",
    a: "Да, сгенерированную вакансию можно полностью редактировать. Вы можете изменить любой раздел — обязанности, требования, условия, — добавить детали о компании или скорректировать тон текста. ИИ генерирует основу, а вы доводите её до идеала. Также можно запросить повторную генерацию с другими акцентами.",
  },
  {
    q: "Сколько стоит использование генератора описаний вакансий?",
    a: "Генератор вакансий доступен в рамках подписки на платформу BRaiN HR. Вы можете попробовать создание первых вакансий бесплатно, чтобы оценить качество генерации. Подробности о тарифах и возможностях каждого плана доступны на странице тарифов или по запросу у менеджера.",
  },
  {
    q: "Как работают шаблоны вакансий и можно ли создавать свои?",
    a: "В библиотеке доступно более 100 готовых шаблонов для различных отраслей и позиций. Вы можете использовать их как основу для генерации, адаптируя под свои задачи. Также система автоматически сохраняет ваши успешные описания вакансий — они становятся корпоративными шаблонами, которые можно использовать повторно для ускорения работы.",
  },
  {
    q: "Поддерживает ли генератор мультиязычное создание вакансий?",
    a: "Да, BRaiN HR поддерживает генерацию вакансий на нескольких языках одновременно. Вы можете создать описание на русском и сразу получить версию на английском, немецком или других языках. Нейросеть учитывает культурные особенности и стандарты рынка труда каждой страны, что позволяет эффективно искать кандидатов на международном рынке без привлечения переводчиков.",
  },
  {
    q: "Как работает SEO-оптимизация текста вакансии?",
    a: "ИИ автоматически анализирует, какие ключевые слова и фразы используют кандидаты при поиске работы, и встраивает их в текст вакансии. При этом сохраняется естественность изложения — текст не выглядит как набор ключевых слов. Оптимизация увеличивает видимость вакансии в поисковой выдаче на hh.ru и других площадках, привлекая больше релевантных кандидатов.",
  },
  {
    q: "Как вакансия адаптируется под разные площадки размещения?",
    a: "Каждая площадка — hh.ru, Avito Работа, SuperJob — имеет свои требования к формату, длине текста и структуре описания. BRaiN HR автоматически трансформирует одно описание вакансии в несколько форматов с учётом особенностей каждой платформы. Вам не нужно вручную переделывать текст — система делает это мгновенно.",
  },
  {
    q: "Заменяет ли ИИ-генератор рекрутера при создании вакансий?",
    a: "Нет, ИИ не заменяет рекрутера, а расширяет его возможности. Генератор берёт на себя рутинную работу по написанию текста, а рекрутер фокусируется на стратегических задачах — определении требований, коммуникации с нанимающими менеджерами и работе с кандидатами. Финальное решение о публикации всегда остаётся за человеком.",
  },
];

const AUDIENCES: AudienceItem[] = [
  {
    tab: "HR-специалистам",
    title: (
      <>
        Создавайте вакансии{" "}
        <em className="not-italic text-brand1">в 10 раз быстрее</em>
      </>
    ),
    body: "Вместо часов на написание текста — 30 секунд на генерацию профессионального описания вакансии. Освободите время для работы с кандидатами и стратегических задач подбора.",
    checks: [
      "Генерация полного описания вакансии за 30 секунд",
      "Автоматическая проверка на дискриминационные формулировки",
      "SEO-оптимизация для привлечения большего числа откликов",
    ],
    stats: [
      { num: "30 сек", desc: "генерация\nвакансии" },
      { num: "3x", desc: "больше\nоткликов" },
      { num: "70%", desc: "экономия\nвремени" },
    ],
  },
  {
    tab: "Рекрутинговым агентствам",
    title: (
      <>
        Масштабируйте создание вакансий{" "}
        <em className="not-italic text-brand1">для всех клиентов</em>
      </>
    ),
    body: "Генерируйте профессиональные описания вакансий для десятков клиентов одновременно. Единый стандарт качества текстов при любом объёме работы.",
    checks: [
      "Параллельная генерация вакансий по всем проектам",
      "Адаптация стиля под бренд каждого клиента",
      "Библиотека шаблонов для всех отраслей",
    ],
    stats: [
      { num: "10x", desc: "больше\nвакансий" },
      { num: "100+", desc: "шаблонов\nпо отраслям" },
    ],
  },
  {
    tab: "Руководителям отделов",
    title: (
      <>
        Публикуйте вакансии{" "}
        <em className="not-italic text-brand1">без помощи HR</em>
      </>
    ),
    body: "Руководители отделов могут самостоятельно создавать профессиональные описания вакансий без привлечения HR-специалистов. ИИ учитывает специфику должности и отрасли.",
    checks: [
      "Создание вакансии без специальных навыков копирайтинга",
      "Учёт специфики технических и узкопрофильных позиций",
      "Автоматическое соответствие корпоративному стилю",
    ],
    stats: [
      { num: "0", desc: "навыков\nкопирайтинга" },
      { num: "30 сек", desc: "до готовой\nвакансии" },
    ],
  },
  {
    tab: "Стартапам",
    title: (
      <>
        Наймите команду быстро{" "}
        <em className="not-italic text-brand1">без выделенного HR</em>
      </>
    ),
    body: "В стартапах нет времени на написание идеальных вакансий. ИИ создаёт профессиональные описания за секунды — фаундеры фокусируются на продукте, а не на копирайтинге.",
    checks: [
      "Профессиональные вакансии без HR-отдела",
      "Мультиязычные описания для международного найма",
      "Привлечение большего числа кандидатов за счёт SEO",
    ],
    stats: [
      { num: "3x", desc: "больше\nоткликов" },
      { num: "5+", desc: "языков\nгенерации" },
    ],
  },
  {
    tab: "Кадровым центрам",
    title: (
      <>
        Стандартизируйте вакансии{" "}
        <em className="not-italic text-brand1">во всех филиалах</em>
      </>
    ),
    body: "Единый генератор вакансий для всех подразделений и регионов. Все описания соответствуют корпоративным стандартам и лучшим практикам рекрутинга.",
    checks: [
      "Единый стандарт описаний для всех подразделений",
      "Централизованная библиотека корпоративных шаблонов",
      "Масштабирование без потери качества текстов",
    ],
    stats: [
      { num: "1", desc: "стандарт\nдля всех" },
      { num: "10 ч", desc: "экономия\nв неделю" },
    ],
  },
];

export function VacancyCreationPage() {
  return (
    <main>
      {/* ═══ 1. HERO ═══ */}
      <section className="bg-white py-20 pb-[88px] max-bp-lg:py-14">
        <Container className="grid grid-cols-[1fr_440px] items-center gap-[72px] max-bp-lg:grid-cols-1 max-bp-lg:gap-10">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand1/30 bg-brand1-bg py-[5px] pl-2.5 pr-3.5 text-[12px] font-semibold tracking-[0.3px] text-brand1">
              <span className="size-1.5 rounded-full bg-brand1 animate-pulse-dot" />
              Для рекрутеров, HR-директоров и нанимающих менеджеров
            </span>
            <h1 className="text-[clamp(36px,4vw,52px)] font-extrabold leading-[1.1] tracking-[-1.2px] text-text1">
              Создание вакансий
              <br />с помощью ИИ
              <br />
              <em className="not-italic text-brand1">за секунды</em>
            </h1>
            <p className="mt-5 max-w-[500px] text-[17px] font-normal leading-[1.7] text-text2">
              Генератор вакансий BRaiN HR автоматически создаёт профессиональное описание вакансии на основе ваших требований. Сократите время на подготовку текста вакансии с нескольких часов до 30 секунд
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="https://brainhire.ru/signup" variant="hero-primary" external>
                Создать вакансию бесплатно
                <ArrowRight size={16} strokeWidth={1.8} />
              </Button>
              <Button href="#form" variant="hero-outline">
                Хочу демонстрацию
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-6">
              {[
                "30 секунд на генерацию",
                "SEO-оптимизация для job-бордов",
                "Мультиязычная генерация",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-[7px] text-[13px] font-medium text-text2"
                >
                  <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-brand1 bg-brand1-bg">
                    <Check size={9} strokeWidth={2.5} className="text-brand1" />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* VACANCY CARD */}
          <div className="overflow-hidden rounded-card border border-grey2 bg-white shadow-md">
            <div className="flex items-center gap-2 border-b border-grey2 bg-grey1 px-[18px] py-3.5 text-[12px] font-semibold text-text2">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#FD6B5B]" />
                <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="size-2.5 rounded-full bg-[#28C840]" />
              </div>
              <span>Новая вакансия — Финансовый аналитик</span>
            </div>
            <div className="flex flex-col gap-2.5 p-3.5">
              {[
                { label: "Должность", value: "Финансовый аналитик" },
                { label: "Отрасль", value: "Финтех" },
                { label: "Уровень", value: "Middle / Senior" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2.5 rounded-sm border border-grey2 bg-grey1 px-3.5 py-2.5"
                >
                  <span className="min-w-[65px] text-[11px] font-semibold text-text2">
                    {f.label}
                  </span>
                  <span className="text-[12px] font-semibold text-text1">
                    {f.value}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2 rounded-sm border border-brand1/15 bg-brand1/[0.04] px-3.5 py-2.5 text-[11px] font-semibold text-brand1">
                <span className="size-1.5 rounded-full bg-brand1 animate-pulse-dot" />
                ИИ генерирует описание...
              </div>
              <div className="rounded-sm border border-grey2 bg-white px-3.5 py-2.5">
                <div className="mb-1.5 text-[11px] font-bold text-text1">
                  Обязанности
                </div>
                {[
                  "Анализ финансовых показателей и подготовка отчетности",
                  "Построение финансовых моделей и прогнозов",
                  "Оценка инвестиционных проектов и рисков",
                ].map((item) => (
                  <div
                    key={item}
                    className="relative pl-3 text-[11px] leading-[1.6] text-text2 before:absolute before:left-0 before:top-[7px] before:size-1 before:rounded-full before:bg-brand1"
                  >
                    {item}
                  </div>
                ))}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {["Excel / Power BI", "SQL", "Фин. моделирование"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-brand1/25 bg-brand1-bg px-2 py-[3px] text-[10px] font-semibold text-brand1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-0.5 flex items-center gap-[7px] rounded-sm border border-brand1/25 bg-brand1-bg px-3.5 py-2.5 text-[12px] font-medium leading-[1.4] text-brand3">
                <Clock size={14} strokeWidth={1.8} className="shrink-0 text-brand1" />
                <span className="flex-1">
                  Готово за <strong className="font-bold text-brand1">30 секунд</strong> — опубликовано на 3 площадках
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ ТИКЕР ═══ */}
      <div className="overflow-hidden border-y border-grey2 bg-grey1 py-3.5">
        <div className="flex w-max animate-ticker">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map(({ Icon, label }, i) => (
            <div
              key={i}
              className="flex items-center gap-2 whitespace-nowrap px-8 text-[13px] font-medium text-text2"
            >
              <span className="flex shrink-0 items-center text-brand1">
                <Icon size={16} strokeWidth={1.8} />
              </span>
              <b className="font-semibold text-text1">{label}</b>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ 2. ПРОБЛЕМЫ / БОЛИ ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Почему создание вакансий вручную
            <br />
            <em className="not-italic text-brand1">тормозит подбор</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Некачественное описание вакансии приводит к потоку нерелевантных откликов и потере лучших кандидатов.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 max-bp-lg:grid-cols-1">
            {PAINS.map(({ Icon: PainIcon, title, text }, i) => (
              <Reveal key={title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <article
                  className="h-full rounded-card border border-grey2 bg-white p-7 shadow-soft transition-all hover:border-brand1 hover:shadow-md"
                >
                  <span className="mb-3.5 inline-flex text-brand1">
                    <PainIcon size={26} strokeWidth={1.8} />
                  </span>
                  <div className="mb-2 text-[16px] font-bold text-text1">{title}</div>
                  <div className="text-[14px] leading-[1.65] text-text2">{text}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 3. STATS BAR ═══ */}
      <div className="border-y border-grey2 bg-grey1 py-12">
        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-4 gap-0 px-6 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-2">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div
                className="border-r border-grey2 px-12 py-8 max-bp-sm:px-5 max-bp-sm:py-5 text-left last:border-r-0 max-bp-sm:border-b max-bp-sm:border-r-0 max-bp-sm:last:border-b-0"
              >
                <div className="mb-3 text-[48px] font-extrabold leading-none tracking-[-2px] text-text1">
                  <span className="text-brand1">{s.num}</span>
                </div>
                <div className="whitespace-pre-line text-[13px] font-medium leading-[1.55] text-text2">
                  {s.desc}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto w-full max-w-[1240px] px-6 pt-4 text-center">
          <p className="text-[11px] leading-[1.5] text-text2">
            *По данным клиентов BRaiN HR, 2025-2026.
          </p>
        </div>
      </div>

      {/* ═══ 4. КАК ЭТО РАБОТАЕТ ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container>
          <span className="inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
            Как это работает
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Создание вакансии с ИИ:
            <br />
            <em className="not-italic text-brand1">4 простых шага</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            От идеи до публикации на всех площадках — за считанные минуты.
          </p>
          <div className="mt-12 grid grid-cols-4 gap-4 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <article
                  className="h-full rounded-card border border-grey2 bg-white p-6 shadow-soft transition-all hover:border-brand1 hover:shadow-md"
                >
                  <div className="mb-3 flex items-center justify-between text-[12px] font-bold text-text2">
                    <span>{s.num}</span>
                    <span className="rounded-full bg-brand1-bg px-2 py-0.5 text-[10px] font-bold text-brand1">
                      {s.time}
                    </span>
                  </div>
                  <span className="mb-3 inline-flex text-brand1">
                    <s.Icon size={26} strokeWidth={1.8} />
                  </span>
                  <div className="mb-2 text-[15px] font-bold text-text1">{s.title}</div>
                  <div className="text-[13px] leading-[1.6] text-text2">{s.text}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 6. СРАВНЕНИЕ ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Ускорьте создание вакансий
            <br />
            <em className="not-italic text-brand1">с помощью искусственного интеллекта</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Ручная подготовка описаний отнимает часы и не гарантирует качество. Сравните сами.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 max-bp-lg:grid-cols-1">
            {/* Bad column */}
            <div className="overflow-hidden rounded-card border border-grey2 bg-white shadow-soft">
              <div className="flex items-center gap-2.5 border-b border-grey2 bg-grey1 px-6 py-4 text-[14px] font-bold text-text2">
                <Info size={16} strokeWidth={1.8} />
                Ручной метод
              </div>
              <div className="py-1">
                {[
                  { Icon: Clock, text: "2-4 часа на подготовку текста одной вакансии" },
                  { Icon: Info, text: "Риск ошибок и дискриминационных формулировок" },
                  { Icon: UserX, text: "Необходимость адаптировать описание вакансии под каждую площадку вручную" },
                  { Icon: FileText, text: "Сложность поддержания единого стиля текста" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 border-b border-grey1 px-6 py-3 text-[14px] text-text2 last:border-b-0"
                  >
                    <span className="mt-0.5 shrink-0 text-[#F04438]">
                      <item.Icon size={18} strokeWidth={1.8} />
                    </span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <div
                className="flex items-center gap-2 border-t border-grey2 bg-grey1 px-[22px] py-3.5 text-[13px] font-bold"
                style={{ color: "#FF7401" }}
              >
                <Clock size={18} strokeWidth={1.8} />
                Долго, рискованно, нет единого стандарта
              </div>
            </div>

            {/* Good column */}
            <div className="overflow-hidden rounded-card border border-brand1 bg-white shadow-soft">
              <div className="flex items-center gap-2.5 border-b border-brand1/20 bg-brand1-bg px-6 py-4 text-[14px] font-bold text-brand3">
                <CheckCircle2 size={16} strokeWidth={1.8} />
                Автоматизация BRaiN HR
                <span className="rounded-full bg-brand1 px-2.5 py-[3px] text-[11px] font-bold text-white">
                  Рекомендуем
                </span>
              </div>
              <div className="py-1">
                {[
                  { Icon: Zap, text: "30 секунд на генерацию полного описания вакансии" },
                  { Icon: BarChart2, text: "Автоматический анализ текста на соответствие требованиям и best practices" },
                  { Icon: FileText, text: "Мгновенная адаптация под все площадки размещения вакансий" },
                  { Icon: Search, text: "Единый фирменный стиль и профессиональный текст вакансии" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 border-b border-grey1 px-6 py-3 text-[14px] text-text1 last:border-b-0"
                  >
                    <span className="mt-0.5 shrink-0 text-brand1">
                      <item.Icon size={18} strokeWidth={1.8} />
                    </span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 border-t border-brand1/20 bg-brand1-bg px-[22px] py-3.5 text-[13px] font-bold text-brand1">
                <Zap size={18} strokeWidth={1.8} />
                Быстро, профессионально, единый стандарт
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ ЛОГО-СЛАЙДЕР ═══ */}
      <div className="border-y border-grey2 bg-white py-8">
        <Container>
          <div className="mb-6 text-center text-[12px] font-semibold uppercase tracking-[1px] text-text2">
            Нам доверяют 50+ компаний
          </div>
        </Container>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
          <div className="flex w-max animate-ticker items-center gap-0 [animation-duration:30s] hover:[animation-play-state:paused]">
            {[...LOGO_ITEMS, ...LOGO_ITEMS].map((logo, i) => (
              <a
                key={i}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[68px] shrink-0 items-center justify-center whitespace-nowrap border-r border-grey2 px-9 leading-tight opacity-60 transition-opacity last:border-r-0 hover:opacity-100"
              >
                {logo.el}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ 8. КОМУ БУДЕТ ПОЛЕЗЕН ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container>
          <span className="inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
            Кому подойдёт
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Кому будет полезен генератор описаний вакансий
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Экономьте до 10 часов в неделю на создание вакансий
          </p>

          <AudienceTabs audiences={AUDIENCES} />
        </Container>
      </section>

      {/* ═══ ВОЗМОЖНОСТИ ПЛАТФОРМЫ ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container>
          <span className="inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
            Возможности платформы
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Возможности платформы
            <br />
            <em className="not-italic text-brand1">для создания вакансий</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Полный набор инструментов для генерации, оптимизации и публикации профессиональных описаний вакансий.
          </p>

          {/* Feature Row 1: Мгновенная генерация (mock left, text right) */}
          <FeatureRow
            num="01"
            title="Мгновенная генерация вакансий"
            desc="Искусственный интеллект создаёт полное описание вакансии за 30 секунд. Просто укажите должность и ключевые требования — система сформирует структурированный текст с обязанностями, требованиями и условиями работы. Сгенерированную вакансию можно редактировать или полностью менять на свое усмотрение. Генерация вакансий теперь не требует часов работы рекрутеров"
            checks={[
              "Полное описание с обязанностями, требованиями и условиями",
              "Генерация за 30 секунд по минимальным вводным",
              "Полная свобода редактирования результата",
            ]}
            mock={
              <div className="p-4">
                <div className="flex border-b border-grey2">
                  {["Генерация", "Шаблоны", "Публикация"].map((t, i) => (
                    <span
                      key={t}
                      className={
                        "-mb-px border-b-2 px-3.5 py-2.5 text-[11px] font-semibold " +
                        (i === 0
                          ? "border-brand1 text-brand1"
                          : "border-transparent text-text2")
                      }
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="p-3.5">
                  <EditorField label="Должность" value="Frontend-разработчик" />
                  <EditorField label="Отрасль" value="Финтех" />
                  <EditorField label="Уровень" value="Middle / Senior" />
                  <div className="mt-2.5 rounded-md border border-brand1/[0.12] bg-brand1/[0.04] p-2.5">
                    <div className="mb-1 text-[11px] font-bold text-text1">
                      Сгенерированное описание
                    </div>
                    <div className="text-[10px] leading-[1.6] text-text2">
                      Обязанности: разработка клиентской части финтех-приложений, оптимизация производительности, код-ревью. Требования: React, TypeScript, 3+ года опыта.
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-brand1/20 bg-brand1-bg px-2 py-0.5 text-[10px] font-semibold text-brand1">
                      <Zap size={10} strokeWidth={2} />
                      Сгенерировано за 30 сек
                    </div>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {["React", "TypeScript", "Финтех", "Middle+"].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-grey2 bg-grey1 px-2 py-[3px] text-[10px] font-semibold text-text2"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            }
          />

          {/* Feature Row 2: Умный анализ (text left, mock right) */}
          <FeatureRow
            reversed
            num="02"
            title="Умный анализ текста"
            desc="Система проводит анализ текста на соответствие лучшим практикам рекрутинга. BRaiN HR проверяет описание вакансии на наличие дискриминационных формулировок, оценивает привлекательность предложения и даёт рекомендации по улучшению. Анализ текста помогает создавать вакансии, которые привлекают больше откликов"
            checks={[
              "Проверка на дискриминационные и некорректные формулировки",
              "Оценка привлекательности предложения для кандидатов",
              "Рекомендации по улучшению текста вакансии",
            ]}
            mock={
              <div>
                <div className="border-b border-grey2 px-3.5 pb-2 pt-3 text-[13px] font-bold text-text1">
                  Анализ текста вакансии
                </div>
                <div className="flex flex-col gap-2 p-3.5">
                  <QCard
                    text="Привлекательность предложения"
                    badge="92%"
                    badgeColor="basic"
                    meta="Выше среднего по рынку"
                  />
                  <QCard
                    text="Инклюзивность формулировок"
                    badge="100%"
                    badgeColor="basic"
                    meta="Нет дискриминации"
                  />
                  <QCard
                    text="Чёткость требований"
                    badge="85%"
                    badgeColor="advanced"
                    meta="Рекомендация: уточнить стек"
                  />
                  <div className="px-3 py-2 text-center">
                    <span className="inline-flex items-center gap-1 rounded-full border border-brand1/20 bg-brand1-bg px-2 py-0.5 text-[10px] font-semibold text-brand1">
                      <Zap size={10} strokeWidth={2} />
                      Анализ завершён
                    </span>
                  </div>
                </div>
              </div>
            }
          />

          {/* Feature Row 3: Адаптация (mock left) */}
          <FeatureRow
            num="03"
            title="Адаптация под площадки"
            desc="Генератор вакансий автоматически адаптирует текст вакансии под требования различных платформ: hh.ru и других популярных площадок. Одно описание вакансии трансформируется в несколько форматов с учётом особенностей каждой площадки"
            checks={[
              "Автоматическая адаптация под hh.ru, Avito, SuperJob",
              "Учёт ограничений и требований каждой платформы",
              "Одно описание — несколько форматов публикации",
            ]}
            mock={
              <div className="p-4">
                <div className="flex border-b border-grey2">
                  {["Площадки", "Форматы", "Статус"].map((t, i) => (
                    <span
                      key={t}
                      className={
                        "-mb-px border-b-2 px-3.5 py-2.5 text-[11px] font-semibold " +
                        (i === 0
                          ? "border-brand1 text-brand1"
                          : "border-transparent text-text2")
                      }
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="p-3.5">
                  <EditorField label="hh.ru" value="Адаптировано" valueClass="text-brand1" />
                  <EditorField label="Avito" value="Адаптировано" valueClass="text-brand1" />
                  <EditorField label="SuperJob" value="Адаптировано" valueClass="text-brand1" />
                  <div className="mt-2.5 rounded-md border border-brand1/[0.12] bg-brand1/[0.04] p-2.5">
                    <div className="mb-1 text-[11px] font-bold text-text1">
                      Автоматическая адаптация
                    </div>
                    <div className="text-[10px] leading-[1.6] text-text2">
                      Текст вакансии адаптирован под требования каждой площадки: ограничения по длине, структура, ключевые слова.
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-brand1/20 bg-brand1-bg px-2 py-0.5 text-[10px] font-semibold text-brand1">
                      <Zap size={10} strokeWidth={2} />
                      3 формата подготовлены
                    </div>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {["hh.ru", "Avito Работа", "SuperJob"].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-grey2 bg-grey1 px-2 py-[3px] text-[10px] font-semibold text-text2"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            }
          />

          {/* Feature Row 4: SEO-оптимизация (text left, mock right) */}
          <FeatureRow
            reversed
            num="04"
            title="SEO-оптимизация текста"
            desc="Создание вакансий с учётом поисковой оптимизации увеличивает видимость ваших предложений. ИИ автоматически внедряет релевантные ключевые слова в текст, сохраняя естественность изложения и привлекательность для кандидатов"
            checks={[
              "Автоматическое внедрение релевантных ключевых слов",
              "Повышение видимости вакансии в поисковой выдаче",
              "Сохранение естественности и читаемости текста",
            ]}
            mock={
              <div>
                <div className="border-b border-grey2 px-3.5 pb-2 pt-3 text-[13px] font-bold text-text1">
                  SEO-анализ вакансии
                </div>
                <div className="flex flex-col gap-2 p-3.5">
                  <QCard
                    text="Ключевые слова: 12 найдено"
                    badge="Оптимально"
                    badgeColor="basic"
                    meta="Плотность 3.2%"
                  />
                  <QCard
                    text="Видимость в поиске: высокая"
                    badge="+47%"
                    badgeColor="basic"
                    meta="vs средний текст"
                  />
                  <QCard
                    text="Естественность текста: 95%"
                    badge="Отлично"
                    badgeColor="basic"
                    meta="Нет переспама"
                  />
                  <div className="px-3 py-2 text-center">
                    <span className="inline-flex items-center gap-1 rounded-full border border-brand1/20 bg-brand1-bg px-2 py-0.5 text-[10px] font-semibold text-brand1">
                      <Zap size={10} strokeWidth={2} />
                      SEO-оптимизация выполнена
                    </span>
                  </div>
                </div>
              </div>
            }
          />

          {/* Feature Row 5: Библиотека шаблонов (mock left) */}
          <FeatureRow
            num="05"
            title="Библиотека шаблонов"
            desc="Используйте готовые шаблоны для создания вакансий в различных отраслях. Система сохраняет успешные описания вакансий и предлагает их в качестве основы для новых публикаций, ускоряя процесс подбора персонала"
            checks={[
              "100+ готовых шаблонов для разных отраслей",
              "Сохранение успешных описаний как корпоративных шаблонов",
              "Быстрый старт на основе проверенных текстов",
            ]}
            mock={
              <div className="p-4">
                <div className="flex border-b border-grey2">
                  {["Шаблоны", "Мои шаблоны"].map((t, i) => (
                    <span
                      key={t}
                      className={
                        "-mb-px border-b-2 px-3.5 py-2.5 text-[11px] font-semibold " +
                        (i === 0
                          ? "border-brand1 text-brand1"
                          : "border-transparent text-text2")
                      }
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="p-3.5">
                  <EditorField label="Отрасль" value="IT / Финтех / Ритейл" />
                  <EditorField
                    label="Категория"
                    value="Разработка, Аналитика, Менеджмент"
                  />
                  <div className="mt-2.5 rounded-md border border-brand1/[0.12] bg-brand1/[0.04] p-2.5">
                    <div className="mb-1 text-[11px] font-bold text-text1">
                      Популярные шаблоны
                    </div>
                    <div className="text-[10px] leading-[1.6] text-text2">
                      Frontend-разработчик (IT), Финансовый аналитик (Финтех), Менеджер по продажам (Ритейл), Product Owner (IT).
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-brand1/20 bg-brand1-bg px-2 py-0.5 text-[10px] font-semibold text-brand1">
                      <Zap size={10} strokeWidth={2} />
                      100+ шаблонов доступно
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          {/* Feature Row 6: Мультиязычная (text left, mock right) */}
          <FeatureRow
            reversed
            isLast
            num="06"
            title="Мультиязычная генерация вакансий нейросетью"
            desc="BRaiN HR создаёт текст на нескольких языках одновременно. Генерация вакансий нейросетью на русском, английском и других языках позволяет искать кандидатов на международном рынке без привлечения переводчиков"
            checks={[
              "Генерация на русском, английском и других языках",
              "Одновременное создание текста на нескольких языках",
              "Без привлечения переводчиков и лингвистов",
            ]}
            mock={
              <div>
                <div className="border-b border-grey2 px-3.5 pb-2 pt-3 text-[13px] font-bold text-text1">
                  Мультиязычная генерация
                </div>
                <div className="flex flex-col gap-2 p-3.5">
                  <QCard
                    text="Русский — Frontend-разработчик"
                    badge="Готово"
                    badgeColor="basic"
                    meta="hh.ru"
                  />
                  <QCard
                    text="English — Frontend Developer"
                    badge="Готово"
                    badgeColor="basic"
                    meta="LinkedIn, Indeed"
                  />
                  <QCard
                    text="Deutsch — Frontend-Entwickler"
                    badge="Генерация..."
                    badgeColor="advanced"
                    meta="StepStone"
                  />
                  <div className="px-3 py-2 text-center">
                    <span className="inline-flex items-center gap-1 rounded-full border border-brand1/20 bg-brand1-bg px-2 py-0.5 text-[10px] font-semibold text-brand1">
                      <Zap size={10} strokeWidth={2} />
                      3 языка одновременно
                    </span>
                  </div>
                </div>
              </div>
            }
          />
        </Container>
      </section>

      {/* ═══ CROSS-SELL ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container>
          <span className="inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
            Другие возможности BRaiN HR
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Вакансия создана — <em className="not-italic text-brand1">что дальше?</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            BRaiN HR автоматизирует весь цикл найма — от создания вакансии до финального решения.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-4 max-bp-lg:grid-cols-1">
            {[
              {
                href: "/ai-resume-analysis",
                Icon: BarChart3,
                title: "ИИ-анализ резюме",
                text: "Автоматический скрининг и скоринг откликов. Обработка сотен резюме одновременно с объективной оценкой кандидатов.",
              },
              {
                href: "https://brainhire.ru/ai-videointerview",
                Icon: Video,
                title: "ИИ-видеоинтервью",
                text: "Первичное интервью с каждым кандидатом без участия рекрутера. Видео-ответы, прокторинг и оценка компетенций.",
              },
              {
                href: "https://brainhire.ru/ai-staff-scoring",
                Icon: MessageSquare,
                title: "ИИ-оценка персонала",
                text: "Объективная оценка soft skills и компетенций. Единые критерии для всех кандидатов без предвзятости.",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <a
                  href={c.href}
                  className="block h-full rounded-card border border-grey2 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-brand1 hover:shadow-md"
                >
                  <div className="mb-4 text-brand1">
                    <c.Icon size={26} strokeWidth={1.8} />
                  </div>
                  <div className="mb-2 text-[16px] font-extrabold text-text1">
                    {c.title}
                  </div>
                  <div className="mb-4 text-[13px] leading-[1.6] text-text2">
                    {c.text}
                  </div>
                  <span className="flex items-center gap-1 text-[13px] font-bold text-brand1">
                    Подробнее <ArrowRight size={14} strokeWidth={1.8} />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ CTA + ФОРМА ═══ */}
      <div id="form" className="border-y border-grey2 bg-white py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container className="grid grid-cols-2 items-start gap-20 max-bp-xl:grid-cols-1 max-bp-xl:gap-12">
          <div>
            <span className="inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
              Попробуйте сами
            </span>
            <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
              Получите доступ к генератору вакансий{" "}
              <em className="not-italic text-brand1">уже сегодня</em>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.72] text-text2">
              Создайте первую вакансию за 30 секунд — убедитесь в качестве ИИ-генерации.
            </p>
            <ul className="mt-7 flex flex-col gap-3">
              {[
                {
                  Icon: Zap,
                  strong: "Генерация вакансии за 30 секунд",
                  body: "Профессиональное описание по минимальным вводным",
                },
                {
                  Icon: Send,
                  strong: "SEO-оптимизация и адаптация под площадки",
                  body: "Максимальная видимость на hh.ru и других платформах",
                },
                {
                  Icon: MessageSquare,
                  strong: "Мультиязычная генерация и библиотека шаблонов",
                  body: "100+ шаблонов и поддержка нескольких языков",
                },
              ].map(({ Icon: PtIcon, strong, body }, i) => (
                <Reveal key={strong} as="li" delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div
                    className="flex items-start gap-4 rounded-[10px] border border-grey2 bg-grey1 px-4 py-3.5"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-brand1/20 bg-brand1-bg text-brand1">
                      <PtIcon size={18} strokeWidth={1.8} />
                    </span>
                    <div className="text-[13px] text-text2">
                      <strong className="block text-text1">{strong}</strong>
                      {body}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <LeadForm
            title="Получите доступ к генератору вакансий"
            subtitle="Создайте первую вакансию бесплатно"
            submitLabel="Получить доступ бесплатно"
            leadType="vacancy-creation"
          />
        </Container>
      </div>

      {/* ═══ FAQ ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container>
          <h2 className="mb-12 text-center text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Ответы на часто задаваемые вопросы
          </h2>
          <FaqAccordion items={FAQ_ITEMS} />
        </Container>
      </section>
    </main>
  );
}

/* ───────── Helpers ───────── */

type FeatureRowProps = {
  num: string;
  title: string;
  desc: string;
  checks: string[];
  mock: React.ReactNode;
  reversed?: boolean;
  isLast?: boolean;
};

function FeatureRow({ num, title, desc, checks, mock, reversed, isLast }: FeatureRowProps) {
  return (
    <div
      className={
        "grid grid-cols-2 items-center gap-14 py-14 max-bp-lg:grid-cols-1 max-bp-lg:gap-8 " +
        (isLast ? "" : "border-b border-grey2")
      }
    >
      <div className={reversed ? "max-bp-lg:order-1 order-2" : "order-1"}>
        <div className="overflow-hidden rounded-card border border-grey2 bg-white shadow-[0_8px_40px_rgba(17,38,58,0.12)]">
          <div className="flex items-center gap-1.5 border-b border-grey2 bg-grey1 px-3.5 py-2.5">
            <span className="size-2.5 rounded-full bg-[#FD6B5B]" />
            <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="size-2.5 rounded-full bg-[#28C840]" />
          </div>
          {mock}
        </div>
      </div>
      <div className={reversed ? "max-bp-lg:order-2 order-1" : "order-2"}>
        <div className="mb-2.5 text-[11px] font-extrabold uppercase tracking-[2px] text-brand1">
          {num}
        </div>
        <h3 className="mb-3.5 text-[clamp(20px,2vw,26px)] font-extrabold leading-[1.25] tracking-[-0.4px] text-text1">
          {title}
        </h3>
        <p className="mb-5 text-[14px] leading-[1.72] text-text2">{desc}</p>
        <div className="flex flex-col gap-2">
          {checks.map((c) => (
            <div
              key={c}
              className="flex items-start gap-2 text-[13px] font-medium leading-[1.4] text-text1"
            >
              <Check
                size={14}
                strokeWidth={2.5}
                className="mt-0.5 shrink-0 text-brand1"
              />
              {c}
            </div>
          ))}
        </div>
        <a
          href="#form"
          className="mt-5 inline-flex items-center gap-1.5 rounded-[8px] border-[1.5px] border-brand1 bg-white px-[22px] py-2.5 text-[13px] font-bold text-brand1 transition-all hover:-translate-y-px hover:bg-brand1 hover:text-white hover:shadow-[0_4px_16px_rgba(64,150,255,0.3)]"
        >
          Попробовать
        </a>
      </div>
    </div>
  );
}

type EditorFieldProps = {
  label: string;
  value: string;
  valueClass?: string;
};

function EditorField({ label, value, valueClass }: EditorFieldProps) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="min-w-[60px] text-[10px] font-semibold text-text2">
        {label}
      </span>
      <span
        className={
          "flex-1 rounded-md border border-grey2 bg-grey1 px-2.5 py-[5px] text-[11px] font-semibold " +
          (valueClass ?? "text-text1")
        }
      >
        {value}
      </span>
    </div>
  );
}

type QCardProps = {
  text: string;
  badge: string;
  badgeColor: "basic" | "advanced";
  meta: string;
};

function QCard({ text, badge, badgeColor, meta }: QCardProps) {
  return (
    <div className="rounded-md border border-grey2 bg-white px-3 py-2.5">
      <div className="mb-1.5 text-[11px] font-semibold leading-[1.5] text-text1">
        {text}
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className={
            "rounded-full px-2 py-0.5 text-[9px] font-bold " +
            (badgeColor === "basic"
              ? "bg-brand1-bg text-brand1"
              : "bg-brand2-bg text-brand2")
          }
        >
          {badge}
        </span>
        <span className="text-[9px] font-medium text-text2">{meta}</span>
      </div>
    </div>
  );
}



