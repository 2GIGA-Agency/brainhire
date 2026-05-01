import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FaqAccordion, type FaqItem } from "@/components/ui/FaqAccordion";
import { LeadForm } from "@/components/interactive/LeadForm";
import { AudienceTabs, type AudienceItem } from "@/components/interactive/AudienceTabs";
import { Reveal } from "@/components/interactive/Reveal";
import {
  ArrowRight,
  Check,
  Clock,
  AlertTriangle,
  UserX,
  FileText,
  Zap,
  BarChart3,
  Target,
  Video,
  Settings,
  Users,
  GraduationCap,
  CheckCircle2,
  PlusCircle,
  CircleAlert,
  Send,
  Pencil,
  MessageSquare,
  Activity,
  Search,
} from "lucide-react";

const COMPARE_BAD = [
  { icon: Clock, text: "30-45 дней на проведение полного цикла оценки сотрудников" },
  { icon: CircleAlert, text: "Ручной сбор данных о сотрудниках и субъективная оценка компетенций" },
  { icon: UserX, text: "Разрозненные критерии оценки и сложность сравнения результатов" },
  { icon: FileText, text: "Высокие затраты на организацию процедур оценки" },
  { icon: Clock, text: "Задержки в обратной связи и формировании планов развития персонала" },
];

const COMPARE_GOOD = [
  { icon: Zap, text: "5-10 дней на полный цикл автоматизации оценки компетенций" },
  { icon: Activity, text: "ИИ-анализ с использованием множественных методов оценки и объективная система оценки" },
  { icon: FileText, text: "Мгновенное формирование результатов оценки с детальной аналитикой" },
  { icon: Search, text: "Автоматические рекомендации по обучению персонала и развитию сотрудников" },
  { icon: Clock, text: "Унифицированные критерии оценки во всех системах управления персоналом" },
];

/**
 * ИИ-оценка персонала — server component, 1:1 с pages/features/ai-staff-scoring.html.
 * noindex: meta robots="noindex, nofollow" присутствует в HTML.
 * Reveal-анимации, FAQ-аккордеон и audience-tabs — статично (Phase 5).
 * Audience-tabs показаны как стек карточек (без интерактивных табов).
 */
export function StaffScoringPage() {
  return (
    <main>
      {/* ═══ 1. HERO ═══ */}
      <section className="bg-white pt-20 pb-[88px] max-bp-lg:py-14">
        <Container className="grid grid-cols-[1fr_440px] items-center gap-[72px] max-bp-lg:grid-cols-1 max-bp-lg:gap-10">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand1/30 bg-brand1-bg py-[5px] pl-2.5 pr-3.5 text-[12px] font-semibold tracking-[0.3px] text-brand1">
              <span className="size-1.5 rounded-full bg-brand1 animate-pulse-dot" />
              Для HR-директоров, руководителей и корпоративных университетов
            </span>
            <h1 className="mb-5 text-[clamp(36px,4vw,52px)] font-extrabold leading-[1.1] tracking-[-1.2px] text-text1">
              Автоматизированная оценка персонала с помощью{" "}
              <em className="not-italic text-brand1">искусственного интеллекта</em>
            </h1>
            <p className="mb-9 max-w-[500px] text-[17px] font-normal leading-[1.7] text-text2">
              Трансформируйте процесс оценки сотрудников: повысьте объективность, сократите время на процедуры оценки и получите точные данные для развития персонала с помощью автоматизированной системы оценки компетенций
            </p>
            <div className="mb-10 flex flex-wrap gap-3">
              <Button href="https://brainhire.ru/signup" variant="hero-primary" external>
                Оценить 100 сотрудников бесплатно
                <ArrowRight size={16} strokeWidth={1.8} />
              </Button>
              <Button href="#form" variant="hero-outline">
                Хочу демонстрацию
              </Button>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                "Оценка 100 сотрудников бесплатно",
                "6 видов оценки в одной системе",
                "Интеграция с HRM и LMS",
              ].map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-[7px] text-[13px] font-medium text-text2"
                >
                  <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-brand1 bg-brand1-bg text-brand1">
                    <Check size={10} strokeWidth={2.2} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* SCORING CARD */}
          <aside className="overflow-hidden rounded-card border border-grey2 bg-white shadow-md">
            <div className="flex items-center gap-2 border-b border-grey2 bg-grey1 px-[18px] py-3.5 text-[12px] font-semibold text-text2">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#FD6B5B]" />
                <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="size-2.5 rounded-full bg-[#28C840]" />
              </div>
              <span>Оценка сотрудника — Маркетолог</span>
            </div>
            <div className="flex flex-col gap-2.5 p-3.5">
              {[
                { label: "Сотрудник", value: "Петрова М.А." },
                { label: "Должность", value: "Маркетолог" },
                { label: "Тип оценки", value: "Оценка 360 градусов" },
              ].map((field) => (
                <div
                  key={field.label}
                  className="flex items-center gap-2.5 rounded-sm border border-grey2 bg-grey1 px-3.5 py-2.5"
                >
                  <span className="min-w-[65px] text-[11px] font-semibold text-text2">
                    {field.label}
                  </span>
                  <span className="text-[12px] font-semibold text-text1">{field.value}</span>
                </div>
              ))}

              <div className="flex items-center gap-2 rounded-sm border border-brand1/15 bg-brand1/[0.04] px-3.5 py-2.5 text-[11px] font-semibold text-brand1">
                <span className="size-1.5 rounded-full bg-brand1 animate-pulse-dot" />
                ИИ анализирует компетенции...
              </div>

              <div className="rounded-sm border border-grey2 bg-white px-3.5 py-2.5">
                <div className="mb-1.5 text-[11px] font-bold text-text1">
                  Результаты оценки
                </div>
                {[
                  "Коммуникация и работа в команде — 92%",
                  "Аналитическое мышление — 85%",
                  "Лидерские качества — 78%",
                ].map((item) => (
                  <div
                    key={item}
                    className="relative pl-3 text-[11px] leading-[1.6] text-text2 before:absolute before:left-0 before:top-[7px] before:size-1 before:rounded-full before:bg-brand1"
                  >
                    {item}
                  </div>
                ))}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {["Soft skills", "Hard skills", "360", "KPI"].map((tag) => (
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
                  Общая оценка компетенций: <strong className="font-bold text-brand1">85%</strong>{" "}
                  — рекомендован план развития
                </span>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      {/* ═══ ТИКЕР ═══ */}
      <div className="overflow-hidden border-y border-grey2 bg-grey1 py-3.5">
        <div className="flex w-max animate-ticker">
          {[
            { Icon: Zap, label: "Оценка компетенций за дни" },
            { Icon: BarChart3, label: "Оценка 360 градусов" },
            { Icon: BarChart3, label: "Прокторинг тестов" },
            { Icon: Send, label: "Планы развития" },
            { Icon: FileText, label: "Интеграция с HRM" },
            { Icon: FileText, label: "Анализ soft skills" },
            { Icon: Zap, label: "Оценка компетенций за дни" },
            { Icon: BarChart3, label: "Оценка 360 градусов" },
            { Icon: BarChart3, label: "Прокторинг тестов" },
            { Icon: Send, label: "Планы развития" },
            { Icon: FileText, label: "Интеграция с HRM" },
            { Icon: FileText, label: "Анализ soft skills" },
          ].map(({ Icon: TIcon, label }, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap px-8 text-[13px] font-medium text-text2"
            >
              <TIcon size={14} strokeWidth={1.8} className="text-brand1" />
              <b className="font-semibold text-text1">{label}</b>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ 2. ПРОБЛЕМЫ / БОЛИ ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Почему традиционная оценка персонала
            <br />
            <em className="not-italic text-brand1">работает против вас</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Каждый день без автоматизации оценки — это субъективные решения и упущенные возможности для развития сотрудников.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 max-bp-lg:grid-cols-1">
            {[
              {
                Icon: Clock,
                title: "30-45 дней на цикл оценки",
                body:
                  "Полный цикл оценки сотрудников занимает от 30 до 45 дней. Сбор данных, проведение интервью, обработка результатов — всё это отнимает время HR-специалистов и руководителей.",
              },
              {
                Icon: AlertTriangle,
                title: "Субъективность и предвзятость",
                body:
                  "Оценка зависит от личных предпочтений оценщика. Разные руководители оценивают одного сотрудника по-разному, нет единых критериев и стандартов оценки компетенций.",
              },
              {
                Icon: UserX,
                title: "Разрозненные критерии",
                body:
                  "Отсутствие единых стандартов оценки приводит к невозможности сравнения результатов между подразделениями и отслеживания динамики развития персонала.",
              },
              {
                Icon: FileText,
                title: "Нет данных для развития",
                body:
                  "Результаты оценки не трансформируются в конкретные планы развития. Нет аналитики для принятия решений об обучении персонала и карьерном росте сотрудников.",
              },
            ].map(({ Icon: PIcon, title, body }, i) => (
              <Reveal key={title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <article
                  className="h-full rounded-card border border-grey2 bg-white p-7 shadow-soft"
                >
                  <span className="mb-3.5 inline-flex text-brand1">
                    <PIcon size={26} strokeWidth={1.8} />
                  </span>
                  <h3 className="mb-2 text-[16px] font-extrabold text-text1">{title}</h3>
                  <p className="text-[14px] leading-[1.65] text-text2">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 3. STATS BAR ═══ */}
      <div className="border-y border-grey2 bg-grey1 py-12">
        <div className="mx-auto grid max-w-[1240px] grid-cols-4 px-6 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-2">
          {[
            { num: "5-10 дней", desc: "цикл\nоценки" },
            { num: "6 видов", desc: "оценки\nв одной системе" },
            { num: "10 000+", desc: "сотрудников\nодновременно" },
            { num: "360°", desc: "полная картина\nкомпетенций" },
          ].map((stat, i, arr) => (
            <Reveal key={stat.num} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div
                className={`px-12 py-8 text-left max-bp-sm:px-6 max-bp-sm:py-6 ${
                  i < arr.length - 1 ? "border-r border-grey2" : ""
                } max-bp-sm:border-r-0 max-bp-sm:border-b max-bp-sm:border-grey2 max-bp-sm:last:border-b-0`}
              >
                <div className="mb-3 text-[48px] font-extrabold leading-none tracking-[-2px] text-text1">
                  <span className="text-brand1">{stat.num}</span>
                </div>
                <div className="whitespace-pre-line text-[13px] font-medium leading-[1.55] text-text2">
                  {stat.desc}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto max-w-[1240px] px-6 pt-4 text-center">
          <p className="text-[11px] leading-[1.5] text-text2">
            *По данным клиентов BRaiN HR, 2025-2026.
          </p>
        </div>
      </div>

      {/* ═══ 4. ВИДЫ ОЦЕНКИ (6 шагов) ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14">
        <Container>
          <span className="inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
            Виды оценки
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Виды автоматизированной оценки
            <br />
            <em className="not-italic text-brand1">в одной системе</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Полный набор инструментов для оценки персонала — от найма до планирования развития сотрудников.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-4 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
            {[
              {
                num: "Тип 1",
                Icon: FileText,
                title: "Оценка при найме",
                body:
                  "Оценка резюме кандидатов, ИИ-интервью и тестирование компетенций для объективного отбора. Каждый кандидат проходит стандартизированную процедуру оценки с прокторингом.",
              },
              {
                num: "Тип 2",
                Icon: Zap,
                title: "Регулярная оценка работы",
                body:
                  "Периодическая оценка сотрудников по KPI и компетенциям для отслеживания эффективности и выявления потребностей в развитии персонала.",
              },
              {
                num: "Тип 3",
                Icon: Target,
                title: "Оценка 360 градусов",
                body:
                  "Всесторонняя оценка компетенций сотрудников с участием коллег, руководителей и подчиненных для получения объективной картины.",
              },
              {
                num: "Тип 4",
                Icon: GraduationCap,
                title: "Оценка для обучения",
                body:
                  "Определение пробелов в компетенциях сотрудников, формирование программ обучения персонала и измерение результатов после прохождения обучения.",
              },
              {
                num: "Тип 5",
                Icon: BarChart3,
                title: "Оценка для продвижения",
                body:
                  "Автоматизация оценки внутренних кандидатов на повышение, анализ готовности к новым ролям и развитие сотрудников внутри компании.",
              },
              {
                num: "Тип 6",
                Icon: Video,
                title: "Оценка soft skills",
                body:
                  "Анализ поведенческих компетенций, коммуникативных навыков и эмоционального интеллекта через видеоинтервью с ИИ-технологиями.",
              },
            ].map(({ num, Icon: SIcon, title, body }, i) => (
              <Reveal key={num} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <article
                  className="h-full rounded-card border border-grey2 bg-white p-7 shadow-soft"
                >
                  <div className="mb-3 text-[12px] font-bold uppercase tracking-[1px] text-brand1">
                    {num}
                  </div>
                  <span className="mb-3 inline-flex text-brand1">
                    <SIcon size={26} strokeWidth={1.8} />
                  </span>
                  <h3 className="mb-2 text-[16px] font-extrabold text-text1">{title}</h3>
                  <p className="text-[14px] leading-[1.65] text-text2">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 5. ПРЕИМУЩЕСТВА (6 карточек) ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <span className="inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
            Преимущества
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Преимущества автоматизированной оценки
            <br />
            <em className="not-italic text-brand1">персонала с ИИ</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Объективность, скорость и данные для принятия решений о развитии персонала.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-4 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
            {[
              {
                Icon: CheckCircle2,
                title: "Объективность процесса оценки",
                body:
                  "Унифицированные критерии оценки исключают субъективность. Каждый сотрудник оценивается по единым стандартам вне зависимости от оценщика.",
              },
              {
                Icon: Target,
                title: "Высокая точность оценки",
                body:
                  "ИИ анализирует множество параметров одновременно, обеспечивая высокую точность результатов оценки компетенций сотрудников.",
              },
              {
                Icon: Zap,
                title: "Экономия времени на оценку",
                body:
                  "Автоматизация оценки сокращает время проведения полного цикла оценки с 30-45 дней до 5-10 дней без потери качества.",
              },
              {
                Icon: PlusCircle,
                title: "Прозрачность в системе оценки",
                body:
                  "Все участники видят критерии оценки, понимают процесс и получают подробную обратную связь по результатам.",
              },
              {
                Icon: BarChart3,
                title: "Данные для развития персонала",
                body:
                  "Детальная аналитика по результатам оценки формирует основу для индивидуальных планов развития и программ обучения.",
              },
              {
                Icon: Users,
                title: "Масштабируемость для автоматизации",
                body:
                  "Система одинаково эффективна при оценке 10 или 10 000 сотрудников, обеспечивая единое качество процедур оценки.",
              },
            ].map(({ Icon: FIcon, title, body }, i) => (
              <Reveal key={title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <article
                  className="h-full rounded-card border border-grey2 bg-white p-7"
                >
                  <span className="mb-4 inline-flex text-brand1">
                    <FIcon size={26} strokeWidth={1.8} />
                  </span>
                  <h3 className="mb-2.5 text-[16px] font-extrabold leading-[1.3] text-text1">
                    {title}
                  </h3>
                  <p className="text-[13px] leading-[1.65] text-text2">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 6. ПРОЦЕСС В 4 ШАГА ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14">
        <Container>
          <span className="inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
            Как это работает
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Простой процесс автоматизации
            <br />
            <em className="not-italic text-brand1">оценки персонала в 4 шага</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            От настройки критериев до получения планов развития — весь цикл оценки автоматизирован.
          </p>

          <div className="mt-12 grid grid-cols-4 gap-4 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
            {[
              {
                num: "Шаг 1",
                time: "настройка",
                Icon: Settings,
                title: "Настройка критериев оценки",
                body:
                  "HR-специалист настраивает автоматизированную систему оценки: выбирает компетенции сотрудников для оценки, определяет методы оценки и устанавливает критерии оценки в соответствии с целями",
              },
              {
                num: "Шаг 2",
                time: "оценка",
                Icon: Users,
                title: "Прохождение оценки сотрудниками",
                body:
                  "Сотрудники проходят тестирование, видеоинтервью или оценку 360 в удобное время. Система контролирует прохождение процедур оценки и обеспечивает честность процесса",
              },
              {
                num: "Шаг 3",
                time: "анализ",
                Icon: BarChart3,
                title: "ИИ-анализ и формирование результатов",
                body:
                  "Искусственный интеллект анализирует данные о сотрудниках, применяет методы оценки компетенций и формирует результат оценки с детальной аналитикой по каждому участнику",
              },
              {
                num: "Шаг 4",
                time: "развитие",
                Icon: GraduationCap,
                title: "Планы развития и обучение",
                body:
                  "На основе результатов оценки система генерирует рекомендации по обучению персонала, создает индивидуальные планы развития сотрудников и треки для повышения эффективности работы",
              },
            ].map(({ num, time, Icon: StepIcon, title, body }, i) => (
              <Reveal key={num} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <article
                  className="h-full rounded-card border border-grey2 bg-white p-7 shadow-soft"
                >
                  <div className="mb-3 flex items-baseline gap-2">
                    <span className="text-[12px] font-bold uppercase tracking-[1px] text-brand1">
                      {num}
                    </span>
                    <span className="text-[11px] font-semibold text-text2">{time}</span>
                  </div>
                  <span className="mb-3 inline-flex text-brand1">
                    <StepIcon size={26} strokeWidth={1.8} />
                  </span>
                  <h3 className="mb-2 text-[15px] font-extrabold text-text1">{title}</h3>
                  <p className="text-[13px] leading-[1.65] text-text2">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 7. СРАВНЕНИЕ ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Ускорьте процесс оценки
            <br />
            <em className="not-italic text-brand1">с помощью автоматизации</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Традиционная оценка отнимает недели и зависит от субъективности. Сравните сами.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 max-bp-lg:grid-cols-1">
            {/* Traditional */}
            <div className="overflow-hidden rounded-card border border-grey2 bg-white shadow-soft">
              <div className="flex items-center gap-2.5 border-b border-grey2 bg-grey1 px-6 py-4 text-[14px] font-bold text-text2">
                <CircleAlert size={16} strokeWidth={1.8} className="text-text2" />
                Традиционный метод оценки персонала
              </div>
              <div className="py-1">
                {COMPARE_BAD.map(({ icon: ItemIcon, text }) => (
                  <div
                    key={text}
                    className="flex items-start gap-3 border-b border-grey1 px-6 py-3.5 text-[14px] text-text2 last:border-b-0"
                  >
                    <ItemIcon size={18} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[#F04438]" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 border-t border-grey2 bg-grey1 px-6 py-3.5 text-[13px] font-bold text-brand2">
                <Clock size={18} strokeWidth={1.8} />
                Долго, субъективно, нет данных для развития
              </div>
            </div>

            {/* BRaiN HR */}
            <div className="overflow-hidden rounded-card border border-brand1 bg-white shadow-soft">
              <div className="flex items-center gap-2.5 border-b border-brand1/20 bg-brand1-bg px-6 py-4 text-[14px] font-bold text-brand3">
                <CheckCircle2 size={16} strokeWidth={1.8} className="text-brand1" />
                Автоматизированная оценка персонала BRaiN HR
                <span className="ml-auto rounded-full bg-brand1 px-2.5 py-[3px] text-[11px] font-bold text-white">
                  Рекомендуем
                </span>
              </div>
              <div className="py-1">
                {COMPARE_GOOD.map(({ icon: ItemIcon, text }) => (
                  <div
                    key={text}
                    className="flex items-start gap-3 border-b border-grey1 px-6 py-3.5 text-[14px] text-text1 last:border-b-0"
                  >
                    <ItemIcon size={18} strokeWidth={1.8} className="mt-0.5 shrink-0 text-brand1" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 border-t border-brand1/20 bg-brand1-bg px-6 py-3.5 text-[13px] font-bold text-brand1">
                <Zap size={18} strokeWidth={1.8} />
                Быстро, объективно, данные для развития персонала
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ 8. ЛОГО-СЛАЙДЕР ═══ */}
      <div className="border-y border-grey2 bg-white py-8">
        <Container>
          <div className="mb-6 text-center text-[12px] font-semibold uppercase tracking-[1px] text-text2">
            Нам доверяют 50+ компаний
          </div>
        </Container>
        <div className="relative overflow-hidden before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-20 before:bg-gradient-to-r before:from-white before:to-transparent before:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-20 after:bg-gradient-to-l after:from-white after:to-transparent after:pointer-events-none">
          <div className="flex w-max animate-ticker items-center">
            {[
              ...LOGOS,
              ...LOGOS,
            ].map((logo, idx, arr) => (
              <a
                key={idx}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-[68px] shrink-0 items-center justify-center whitespace-nowrap px-9 leading-[1.2] opacity-60 transition-opacity hover:opacity-100 ${
                  idx < arr.length - 1 ? "border-r border-grey2" : ""
                }`}
              >
                {logo.content}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ 9. КОМУ НЕОБХОДИМА АВТОМАТИЗАЦИЯ (audience стек) ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <span className="inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
            Кому подойдёт
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Кому необходима автоматизация
            <br />
            <em className="not-italic text-brand1">оценки персонала</em>
          </h2>
          <p className="mt-3 max-w-[700px] text-[15px] leading-[1.72] text-text2">
            Оптимизация работы с персоналом: автоматизация процесса оценки сотрудников, стандартизация критериев оценки и точная аналитика компетенций сотрудников для принятия решений о развитии, обучении персонала и карьерном росте
          </p>

          <AudienceTabs audiences={AUDIENCES} />
        </Container>
      </section>

      {/* ═══ 10. ВОЗМОЖНОСТИ ПЛАТФОРМЫ — FEAT ROWS ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14">
        <Container>
          <span className="inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
            Возможности платформы
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Автоматизация оценки персонала
            <br />
            <em className="not-italic text-brand1">с помощью технологий ИИ</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Полный цикл оценки сотрудников — от настройки критериев до формирования планов развития.
          </p>

          <div className="mt-12 flex flex-col">
            {/* Row 1 — мокап слева, текст справа */}
            <FeatRow
              num="01"
              title="Автоматизированная система оценки компетенций"
              body="Искусственный интеллект автоматизирует процесс оценки сотрудников через инструменты видеособеседования, Real-Time Аватара и чат бота. HR-специалисты получают решение для оценки, которое анализирует компетенции сотрудников по множественным критериям, включая hard и soft skills. Система обеспечивает высокую точность благодаря унифицированным критериям, исключая человеческий фактор"
              checks={[
                "Оценка hard и soft skills по единым критериям",
                "Видеоинтервью с Real-Time Аватаром и чат-ботом",
                "Исключение человеческого фактора из оценки",
              ]}
              mockup={
                <MockupEditor
                  tabs={["Компетенции", "Оценка", "Отчёт"]}
                  fields={[
                    { label: "Сотрудник", value: "Сидорова А.В." },
                    { label: "Должность", value: "Менеджер проектов" },
                    { label: "Метод", value: "Видеоинтервью + тесты" },
                  ]}
                  generated={{
                    title: "Результаты оценки",
                    text: "Hard skills: 88%. Soft skills: 91%. Лидерство: 85%. Коммуникация: 94%. Рекомендация: план развития лидерских компетенций.",
                    badge: "ИИ проанализировано",
                  }}
                  tags={["Hard skills", "Soft skills", "Лидерство", "Коммуникация"]}
                />
              }
            />

            {/* Row 2 — текст слева, мокап справа */}
            <FeatRow
              reverse
              num="02"
              title="Оценка 360 градусов с ИИ-анализом"
              body="Комплексный метод оценки работы сотрудников, где автоматизированная система оценки собирает обратную связь от коллег, руководителей и подчиненных. ИИ анализирует данные о сотрудниках, формирует объективную картину компетенций и выявляет зоны для развития персонала. Процесс оценки становится прозрачным и структурированным"
              checks={[
                "Сбор обратной связи от коллег, руководителей и подчинённых",
                "ИИ-анализ объективной картины компетенций",
                "Выявление зон для развития персонала",
              ]}
              mockup={
                <MockupCards
                  header="Оценка 360 — Маркетолог"
                  cards={[
                    {
                      text: "Оценка от руководителя — 4.5/5",
                      badge: "Лидерство",
                      badgeTone: "basic",
                      meta: "Высокий потенциал",
                    },
                    {
                      text: "Оценка от коллег — 4.2/5",
                      badge: "Командная работа",
                      badgeTone: "basic",
                      meta: "Надёжный партнёр",
                    },
                    {
                      text: "Оценка от подчинённых — 4.0/5",
                      badge: "Делегирование",
                      badgeTone: "advanced",
                      meta: "Зона роста",
                    },
                  ]}
                  footerBadge="ИИ-анализ завершён"
                />
              }
            />

            {/* Row 3 — мокап слева */}
            <FeatRow
              num="03"
              title="Автоматизация оценки soft skills и поведенческих компетенций"
              body="Уникальная технология оценки soft skills через видеоинтервью с ИИ-аватаром. Система анализирует вербальные и невербальные сигналы, оценивая коммуникативные навыки, эмоциональный интеллект и другие компетенции сотрудников. Результат оценки формируется мгновенно с детальной аналитикой по каждому критерию оценки"
              checks={[
                "Анализ вербальных и невербальных сигналов",
                "Оценка коммуникации и эмоционального интеллекта",
                "Мгновенный результат с детальной аналитикой",
              ]}
              mockup={
                <MockupEditor
                  tabs={["Видеоинтервью", "Анализ", "Результат"]}
                  fields={[
                    { label: "Сотрудник", value: "Козлов Д.М." },
                    { label: "Метод", value: "ИИ-аватар интервью" },
                  ]}
                  generated={{
                    title: "Анализ soft skills",
                    text: "Коммуникация: 92%. Эмоциональный интеллект: 87%. Стрессоустойчивость: 79%. Вербальные сигналы: уверенный тон.",
                    badge: "Мгновенный анализ",
                  }}
                  tags={["Коммуникация", "EQ", "Стресс"]}
                />
              }
            />

            {/* Row 4 — текст слева */}
            <FeatRow
              reverse
              num="04"
              title="Автоматическое тестирование и прокторинг"
              body="Инструмент оценки профессиональных знаний и навыков с встроенной системой прокторинга. Автоматизация оценки включает мгновенную проверку каждого ответа с выявлением использования подсказок и формирование детального отчета о сотрудниках. Процедуры оценки доступны 24/7 для удобного прохождения тестов"
              checks={[
                "Встроенная система прокторинга",
                "Мгновенная проверка с выявлением подсказок",
                "Доступность процедур оценки 24/7",
              ]}
              mockup={
                <MockupCards
                  header="Тестирование с прокторингом"
                  cards={[
                    {
                      text: "Вопрос 1: Управление проектами — Верно",
                      badge: "100%",
                      badgeTone: "basic",
                      meta: "Прокторинг: OK",
                    },
                    {
                      text: "Вопрос 2: Agile-методологии — Частично верно",
                      badge: "60%",
                      badgeTone: "advanced",
                      meta: "Прокторинг: OK",
                    },
                    {
                      text: "Вопрос 3: Финансовый анализ — Верно",
                      badge: "100%",
                      badgeTone: "basic",
                      meta: "Прокторинг: OK",
                    },
                  ]}
                  footerBadge="Тест завершён, подсказки не обнаружены"
                />
              }
            />

            {/* Row 5 — мокап слева */}
            <FeatRow
              num="05"
              title="ИИ-анализ резюме и оценка внутренних кандидатов"
              body="При внутренней ротации система проводит оценку резюме и подсвечивает присутствие навыков действующих сотрудников на соответствие новым позициям. Автоматизированная система оценки сравнивает профили с требованиями вакансий, ускоряя процесс оценки внутренних кандидатов и способствуя развитию сотрудников внутри компании"
              checks={[
                "Оценка соответствия новым позициям",
                "Сравнение профилей с требованиями вакансий",
                "Развитие сотрудников внутри компании",
              ]}
              mockup={
                <MockupEditor
                  tabs={["Внутренняя ротация", "Профили"]}
                  fields={[
                    { label: "Вакансия", value: "Руководитель отдела" },
                    { label: "Кандидат", value: "Иванов К.С. (текущий сотрудник)" },
                  ]}
                  generated={{
                    title: "Соответствие новой позиции",
                    text: "Управленческие навыки: 82%. Опыт проектной работы: 95%. Лидерство: 76%. Рекомендация: развитие управленческих компетенций.",
                    badge: "Анализ внутреннего кандидата",
                  }}
                />
              }
            />

            {/* Row 6 — текст слева */}
            <FeatRow
              reverse
              num="06"
              title="Персонализированные планы развития на основе результатов оценки"
              body="После завершения процедур оценки (прохождения тестирования и интервью с Real-Time Аватаром) ИИ автоматически генерирует индивидуальные рекомендации по обучению персонала. Система формирует программы обучения сотрудников с учетом выявленных пробелов в компетенциях, создавая персональные треки развития персонала для повышения эффективности работы"
              checks={[
                "Автоматическая генерация рекомендаций по обучению",
                "Персональные треки развития персонала",
                "Учёт выявленных пробелов в компетенциях",
              ]}
              mockup={
                <MockupCards
                  header="Индивидуальный план развития"
                  cards={[
                    {
                      text: "Курс: Управление командой — 4 недели",
                      badge: "Лидерство",
                      badgeTone: "basic",
                      meta: "Приоритет: высокий",
                    },
                    {
                      text: "Тренинг: Презентации и публичные выступления",
                      badge: "Коммуникация",
                      badgeTone: "basic",
                      meta: "Приоритет: средний",
                    },
                    {
                      text: "Менторинг: Стратегическое мышление",
                      badge: "Развитие",
                      badgeTone: "advanced",
                      meta: "Приоритет: средний",
                    },
                  ]}
                  footerBadge="План сформирован на основе результатов оценки"
                />
              }
            />
          </div>
        </Container>
      </section>

      {/* ═══ 11. CTA + ФОРМА ═══ */}
      <section
        id="form"
        className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14"
      >
        <Container className="grid grid-cols-2 items-start gap-20 max-bp-lg:grid-cols-1 max-bp-lg:gap-12">
          <div>
            <span className="inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
              Попробуйте сами
            </span>
            <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
              Внедрите автоматизированную оценку персонала{" "}
              <em className="not-italic text-brand1">в вашей компании</em>
            </h2>
            <p className="mt-3 text-[15px] leading-[1.72] text-text2">
              Оцените возможности системы бесплатно — убедитесь, что ИИ оценивает сотрудников быстрее и объективнее.
            </p>
            <ul className="mt-7 flex flex-col gap-3">
              {[
                {
                  Icon: Zap,
                  strong: "Бесплатная оценка первых 100 сотрудников",
                  body: "Без регистрации карты, без обязательств",
                },
                {
                  Icon: Send,
                  strong: "6 видов оценки в одной системе",
                  body: "От найма до планов развития",
                },
                {
                  Icon: MessageSquare,
                  strong: "Интеграция с HRM и LMS",
                  body: "Единая экосистема для управления персоналом",
                },
              ].map(({ Icon: PtIcon, strong, body }, i) => (
                <Reveal key={strong} as="li" delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div
                    className="flex items-start gap-4 rounded-[10px] border border-grey2 bg-grey1 px-4 py-3.5"
                  >
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-brand1/20 bg-brand1-bg text-brand1">
                      <PtIcon size={16} strokeWidth={2} />
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
            title="Получите доступ к ИИ-оценке персонала"
            subtitle="Оценим первых 100 сотрудников бесплатно"
            submitLabel="Получить доступ бесплатно"
            leadType="staff-scoring"
          />
        </Container>
      </section>

      {/* ═══ 12. CROSS-SELL ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14">
        <Container>
          <span className="inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
            Другие возможности BRaiN HR
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Оценка завершена — <em className="not-italic text-brand1">что дальше?</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            BRaiN HR автоматизирует весь цикл работы с персоналом — от создания вакансии до оценки и развития.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-4 max-bp-lg:grid-cols-1">
            {[
              {
                Icon: Pencil,
                title: "ИИ-создание вакансий",
                body: "Генерация профессиональных описаний вакансий за 30 секунд. SEO-оптимизация для job-бордов.",
                href: "/ai-vacancy-creation",
              },
              {
                Icon: BarChart3,
                title: "ИИ-анализ резюме",
                body: "Мгновенный скрининг и скоринг резюме. Автоматическая оценка кандидатов по единым критериям.",
                href: "/ai-resume-analysis",
              },
              {
                Icon: Video,
                title: "ИИ-видеоинтервью",
                body: "Первичное интервью с каждым кандидатом без участия рекрутера. Видео-ответы, прокторинг и оценка компетенций.",
                href: "/ai-videointerview",
              },
            ].map(({ Icon: CIcon, title, body, href }, i) => (
              <Reveal key={title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <a
                  href={href}
                  className="group block h-full rounded-card border border-grey2 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-brand1 hover:shadow-md"
                >
                  <span className="mb-4 inline-flex text-brand1">
                    <CIcon size={26} strokeWidth={1.8} />
                  </span>
                  <div className="mb-2 text-[16px] font-extrabold text-text1">{title}</div>
                  <p className="mb-4 text-[13px] leading-[1.6] text-text2">{body}</p>
                  <span className="inline-flex items-center gap-1 text-[13px] font-bold text-brand1">
                    Подробнее
                    <ArrowRight size={14} strokeWidth={1.8} />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 13. FAQ ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
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

/* ════════════════════════════════════════════════
   SUBCOMPONENTS
   ════════════════════════════════════════════════ */

type FeatRowProps = {
  reverse?: boolean;
  num: string;
  title: string;
  body: string;
  checks: string[];
  mockup: React.ReactNode;
};

function FeatRow({ reverse, num, title, body, checks, mockup }: FeatRowProps) {
  return (
    <div className="grid grid-cols-2 items-center gap-14 border-b border-grey2 py-14 last:border-b-0 max-bp-lg:grid-cols-1 max-bp-lg:gap-8">
      <div
        className={
          reverse
            ? "order-2 max-bp-lg:order-2"
            : "order-1 max-bp-lg:order-2"
        }
      >
        <BrowserShell>{mockup}</BrowserShell>
      </div>
      <div
        className={
          reverse
            ? "order-1 max-bp-lg:order-1"
            : "order-2 max-bp-lg:order-1"
        }
      >
        <div className="mb-2.5 text-[11px] font-extrabold uppercase tracking-[2px] text-brand1">
          {num}
        </div>
        <h3 className="mb-3.5 text-[clamp(20px,2vw,26px)] font-extrabold leading-[1.25] tracking-[-0.4px] text-text1">
          {title}
        </h3>
        <p className="mb-5 text-[14px] leading-[1.72] text-text2">{body}</p>
        <ul className="mb-5 flex flex-col gap-2">
          {checks.map((c) => (
            <li
              key={c}
              className="flex items-start gap-2 text-[13px] font-medium leading-[1.4] text-text1"
            >
              <Check size={14} strokeWidth={2.5} className="mt-0.5 shrink-0 text-brand1" />
              {c}
            </li>
          ))}
        </ul>
        <a
          href="#form"
          className="inline-flex items-center gap-1.5 rounded-sm border-[1.5px] border-brand1 bg-white px-5 py-2.5 text-[13px] font-bold text-brand1 transition-all hover:-translate-y-px hover:bg-brand1 hover:text-white hover:shadow-md"
        >
          Попробовать
        </a>
      </div>
    </div>
  );
}

function BrowserShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-card border border-grey2 bg-white shadow-md">
      <div className="flex gap-1.5 border-b border-grey2 bg-grey1 px-3.5 py-2.5">
        <span className="size-2.5 rounded-full bg-[#FD6B5B]" />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="size-2.5 rounded-full bg-[#28C840]" />
      </div>
      {children}
    </div>
  );
}

type MockupEditorProps = {
  tabs: string[];
  fields: { label: string; value: string }[];
  generated?: { title: string; text: string; badge: string };
  tags?: string[];
};

function MockupEditor({ tabs, fields, generated, tags }: MockupEditorProps) {
  return (
    <div className="p-4">
      <div className="flex border-b border-grey2 -mb-px">
        {tabs.map((tab, i) => (
          <span
            key={tab}
            className={`px-3.5 py-2.5 text-[11px] font-semibold cursor-pointer border-b-2 ${
              i === 0
                ? "text-brand1 border-brand1"
                : "text-text2 border-transparent"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>
      <div className="p-3.5">
        {fields.map((f) => (
          <div key={f.label} className="mb-2 flex items-center gap-2">
            <span className="min-w-[60px] text-[10px] font-semibold text-text2">
              {f.label}
            </span>
            <span className="flex-1 rounded-md border border-grey2 bg-grey1 px-2.5 py-1.5 text-[11px] font-semibold text-text1">
              {f.value}
            </span>
          </div>
        ))}
        {generated && (
          <div className="mt-2.5 rounded-md border border-brand1/15 bg-brand1/[0.04] p-2.5">
            <div className="mb-1 text-[11px] font-bold text-text1">{generated.title}</div>
            <div className="text-[10px] leading-[1.6] text-text2">{generated.text}</div>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-brand1/20 bg-brand1-bg px-2 py-0.5 text-[10px] font-semibold text-brand1">
              <Zap size={10} strokeWidth={2} />
              {generated.badge}
            </span>
          </div>
        )}
        {tags && tags.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-grey2 bg-grey1 px-2 py-[3px] text-[10px] font-semibold text-text2"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

type MockupCardsProps = {
  header: string;
  cards: {
    text: string;
    badge: string;
    badgeTone: "basic" | "advanced";
    meta: string;
  }[];
  footerBadge: string;
};

function MockupCards({ header, cards, footerBadge }: MockupCardsProps) {
  return (
    <div className="p-4">
      <div className="border-b border-grey2 px-3.5 pb-2 pt-3 text-[13px] font-bold text-text1">
        {header}
      </div>
      <div className="flex flex-col gap-2 p-3.5">
        {cards.map((c, i) => (
          <div key={i} className="rounded-md border border-grey2 bg-white px-3 py-2.5">
            <div className="mb-1.5 text-[11px] font-semibold leading-[1.5] text-text1">
              {c.text}
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                  c.badgeTone === "basic"
                    ? "bg-brand1-bg text-brand1"
                    : "bg-brand2-bg text-brand2"
                }`}
              >
                {c.badge}
              </span>
              <span className="text-[9px] font-medium text-text2">{c.meta}</span>
            </div>
          </div>
        ))}
        <div className="px-3 py-2 text-center">
          <span className="inline-flex items-center gap-1 rounded-full border border-brand1/20 bg-brand1-bg px-2 py-0.5 text-[10px] font-semibold text-brand1">
            <Zap size={10} strokeWidth={2} />
            {footerBadge}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════ */

const LOGOS: { href: string; content: React.ReactNode }[] = [
  {
    href: "https://www.simbirsoft.com/",
    content: (
      <span className="text-[18px] font-extrabold tracking-[-0.5px] text-[#1a1a2e]">
        Simbir<span className="text-[#e03030]">S</span>oft
      </span>
    ),
  },
  {
    href: "https://bssys.com/",
    content: (
      <span className="rounded-[4px] bg-[#1a3a8a] px-2.5 py-1.5 text-[15px] font-black tracking-[1px] text-white">
        BSS
      </span>
    ),
  },
  {
    href: "https://3logic.ru/",
    content: (
      <span className="text-[15px] font-extrabold tracking-[-0.3px] text-[#1a1a1a]">
        3<span className="text-[#e03030]">LOGIC</span>
        <br />
        <span className="text-[9px] font-semibold tracking-[1px] text-[#555]">GROUP</span>
      </span>
    ),
  },
  {
    href: "https://kazan.rt.ru/",
    content: (
      <span className="text-[13px] font-bold tracking-[0.5px] text-[#1a1a1a]">РОСТЕЛЕКОМ</span>
    ),
  },
  {
    href: "https://e-flops.ru/",
    content: (
      <span className="text-[16px] font-extrabold tracking-[-0.5px] text-[#222]">
        e<span className="text-brand1">-</span>flops
      </span>
    ),
  },
  {
    href: "https://itpeoplegroup.ru/",
    content: (
      <span className="border-2 border-[#1a1a1a] px-2 py-1 text-[12px] font-extrabold uppercase tracking-[1.5px] text-[#1a1a1a]">
        IT PEOPLE
      </span>
    ),
  },
  {
    href: "https://moby.estate/",
    content: (
      <span className="text-[17px] font-extrabold tracking-[-0.5px] text-[#2b4de3]">moby</span>
    ),
  },
  {
    href: "https://www.hr-rocket.ru/",
    content: (
      <span className="text-[14px] font-extrabold tracking-[0.5px] text-[#1a1a1a]">HR ROCKET</span>
    ),
  },
  {
    href: "https://prodamus.ru/",
    content: (
      <span className="text-[15px] font-bold tracking-[-0.3px] text-[#6c3db5]">prodamus</span>
    ),
  },
  {
    href: "https://www.penoplex.ru/",
    content: (
      <span className="text-[13px] font-extrabold tracking-[0.5px] text-[#e03030]">PENOPLEX</span>
    ),
  },
];

const AUDIENCES: AudienceItem[] = [
  {
    tab: "HR-отделам",
    title: (
      <>
        Проводите оценку сотрудников{" "}
        <em className="not-italic text-brand1">в 5 раз быстрее</em>
      </>
    ),
    body:
      "Вместо недель на организацию процедур оценки — автоматизированная система, которая проводит оценку компетенций сотрудников по единым критериям и формирует детальные отчёты.",
    checks: [
      "Автоматизация всех процедур оценки",
      "Унифицированные критерии оценки для всех подразделений",
      "Детализированные отчёты по каждому сотруднику",
    ],
    stats: [
      { num: "5x", desc: "быстрее\nоценка" },
      { num: "6", desc: "видов\nоценки" },
      { num: "360°", desc: "полная\nкартина" },
    ],
  },
  {
    tab: "Руководителям компаний",
    title: (
      <>
        Принимайте решения{" "}
        <em className="not-italic text-brand1">на основе данных</em>
      </>
    ),
    body:
      "Получайте объективную аналитику по компетенциям сотрудников для принятия решений о продвижении, обучении и развитии. Исключите субъективность из процесса оценки.",
    checks: [
      "Объективная оценка компетенций каждого сотрудника",
      "Прозрачная аналитика для стратегических решений",
      "Автоматические рекомендации по развитию",
    ],
    stats: [
      { num: "10 дней", desc: "полный\nцикл" },
      { num: "100%", desc: "объективность\nданных" },
    ],
  },
  {
    tab: "Корпоративным университетам",
    title: (
      <>
        Измеряйте эффективность{" "}
        <em className="not-italic text-brand1">программ обучения</em>
      </>
    ),
    body:
      "Проводите оценку до и после обучения для измерения прогресса. Формируйте программы обучения персонала на основе выявленных пробелов в компетенциях.",
    checks: [
      "Определение пробелов в компетенциях",
      "Индивидуальные планы развития для каждого сотрудника",
      "Измерение ROI обучения",
    ],
    stats: [
      { num: "10 000+", desc: "сотрудников\nодновременно" },
      { num: "LMS", desc: "интеграция\nс платформами" },
    ],
  },
  {
    tab: "IT-компаниям",
    title: (
      <>
        Оценивайте технических специалистов{" "}
        <em className="not-italic text-brand1">объективно и точно</em>
      </>
    ),
    body:
      "ИИ понимает специфику IT-компетенций и технического стека. Система оценивает hard skills через тестирование с прокторингом и soft skills через видеоинтервью.",
    checks: [
      "Оценка технических навыков с прокторингом",
      "Анализ soft skills через ИИ-видеоинтервью",
      "Персонализированные треки развития",
    ],
    stats: [
      { num: "24/7", desc: "доступ\nк оценке" },
      { num: "6", desc: "видов\nоценки" },
    ],
  },
  {
    tab: "Корпорациям",
    title: (
      <>
        Стандартизируйте оценку{" "}
        <em className="not-italic text-brand1">во всех подразделениях</em>
      </>
    ),
    body:
      "Единые критерии оценки для всех филиалов и департаментов. Масштабируемая система для одновременной оценки тысяч сотрудников с прозрачной аналитикой.",
    checks: [
      "Единый стандарт оценки для всех подразделений",
      "Масштабирование без потери качества оценки",
      "Интеграция с корпоративными HRM и LMS",
    ],
    stats: [
      { num: "1", desc: "стандарт\nдля всех" },
      { num: "10 000+", desc: "сотрудников\nодновременно" },
    ],
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Как автоматизированная система оценки персонала обеспечивает объективность?",
    a: "Система использует унифицированные критерии оценки для всех сотрудников. ИИ анализирует ответы на тестирования и видеоинтервью по заранее определённым параметрам, исключая влияние личных предпочтений оценщика. Каждый сотрудник оценивается по одним и тем же стандартам вне зависимости от подразделения или руководителя.",
  },
  {
    q: "Какие виды оценки персонала поддерживает система?",
    a: "BRaiN HR поддерживает 6 видов оценки: оценка при найме, регулярная оценка работы, оценка 360 градусов, оценка для обучения, оценка для продвижения и оценка soft skills. Каждый вид оценки включает специализированные инструменты — тестирование с прокторингом, видеоинтервью с ИИ-аватаром, сбор обратной связи и анализ компетенций.",
  },
  {
    q: "Можно ли использовать результаты оценки для планирования обучения персонала?",
    a: "Да, это одно из ключевых преимуществ системы. После завершения процедур оценки ИИ автоматически выявляет пробелы в компетенциях и генерирует индивидуальные рекомендации по обучению. Система формирует персональные треки развития для каждого сотрудника и интегрируется с LMS-платформами для отслеживания прогресса.",
  },
  {
    q: "Как часто нужно проводить оценку сотрудников?",
    a: "Частота оценки зависит от целей компании. Рекомендуется проводить полную оценку компетенций 1-2 раза в год, промежуточные проверки по KPI — ежеквартально, а оценку при внутренней ротации — по мере необходимости. Благодаря автоматизации процесс оценки можно проводить значительно чаще без увеличения нагрузки на HR-отдел.",
  },
  {
    q: "Как система обеспечивает конфиденциальность данных о сотрудниках?",
    a: "Все данные о сотрудниках хранятся на защищённых серверах с шифрованием. Доступ к результатам оценки ограничен ролевой моделью — каждый пользователь видит только те данные, которые ему доступны. Система соответствует требованиям ФЗ-152 о персональных данных и обеспечивает полную конфиденциальность процесса оценки.",
  },
  {
    q: "Сколько времени занимает внедрение автоматизированной системы оценки?",
    a: "Базовое внедрение занимает 1-3 дня. Вы настраиваете критерии оценки, загружаете список сотрудников и запускаете первый цикл оценки. Для полной интеграции с корпоративными HRM и LMS-системами может потребоваться до 2 недель. Команда поддержки помогает на каждом этапе внедрения.",
  },
  {
    q: "Можно ли редактировать критерии оценки и задать вес критериям?",
    a: "Да, вы можете полностью настраивать критерии оценки компетенций и задавать вес каждому критерию. Например, для управленческих позиций можно увеличить влияние лидерских качеств, а для технических — hard skills. Также можно создавать разные наборы критериев для разных должностей и подразделений.",
  },
  {
    q: "Можно ли задать эталонные ответы для более точной оценки?",
    a: "Да, система позволяет задавать эталонные (референсные) ответы для тестирования и видеоинтервью. ИИ сравнивает ответы сотрудников с эталонами, что повышает точность оценки. Вы можете задать как точные эталоны, так и описание ожидаемых ключевых тезисов, которые должны присутствовать в ответе.",
  },
  {
    q: "Как настроить ограничения доступа к результатам оценки?",
    a: "В системе реализована гибкая ролевая модель доступа. HR-администратор видит все результаты, руководитель — только своих подчинённых, а сотрудник — только собственные результаты оценки. Вы можете настраивать уровни доступа для каждой роли, определяя, какие данные видны каждому пользователю.",
  },
];
