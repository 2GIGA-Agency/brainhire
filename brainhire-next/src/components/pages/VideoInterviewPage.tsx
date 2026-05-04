import type { ComponentType, ReactNode, SVGProps } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FaqAccordion, type FaqItem } from "@/components/ui/FaqAccordion";
import { LeadForm } from "@/components/interactive/LeadForm";
import { AudienceTabs, type AudienceItem } from "@/components/interactive/AudienceTabs";
import { Reveal } from "@/components/interactive/Reveal";
import {
  Video,
  Clock,
  Calendar,
  AlertTriangle,
  Zap,
  ArrowRight,
  CheckCircle2,
  Check,
  AlertCircle,
  BarChart3,
  Activity,
  FileText,
  Pencil,
  Send,
  ShieldCheck,
} from "lucide-react";

type LucideIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

/**
 * ИИ-видеоинтервью с прокторингом — feature-лендинг.
 * Server Component: 1:1 c pages/features/ai-videointerview.html.
 * Reveal-анимации, audience-табы, FAQ-аккордеон — статично (Phase 5).
 */
export function VideoInterviewPage() {
  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14 max-bp-sm:py-10 max-bp-lg:pb-[88px]">
        <Container className="grid grid-cols-[1fr_440px] items-center gap-[72px] max-bp-lg:grid-cols-1 max-bp-lg:gap-10">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand1/30 bg-brand1-bg py-[5px] pl-2.5 pr-3.5 text-[12px] font-semibold tracking-[0.3px] text-brand1">
              <span className="size-1.5 rounded-full bg-brand1 animate-pulse-dot" />
              Для HR-директоров, рекрутеров и нанимающих менеджеров
            </span>

            <h1 className="mb-5 text-[clamp(36px,4vw,52px)] font-extrabold leading-[1.1] tracking-[-1.2px] text-text1">
              Первичный отбор сотен кандидатов{" "}
              <em className="not-italic text-brand1">с прокторингом</em>
            </h1>

            <p className="mb-9 max-w-[500px] text-[17px] font-normal leading-[1.7] text-text2">
              Кандидаты проходят профессиональный тест с включённой камерой. Прокторинг
              фиксирует подсказки, посторонних и использование ИИ — вы получаете только
              честные результаты.
            </p>

            <div className="mb-10 flex flex-wrap gap-3">
              <Button
                href="https://brainhire.ru/signup"
                variant="hero-primary"
                external
              >
                Попробовать бесплатно
                <ArrowRight size={16} strokeWidth={1.8} />
              </Button>
              <Button href="#form" variant="hero-outline">
                Хочу демонстрацию
              </Button>
            </div>

            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                "Тестирование 24/7",
                "Прокторинг камерой",
                "Сотни кандидатов одновременно",
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

          {/* Interview card */}
          <aside className="overflow-hidden rounded-card border border-grey2 bg-white shadow-md">
            <div className="flex items-center gap-2 border-b border-grey2 bg-grey1 px-[18px] py-3.5 text-[12px] font-semibold text-text2">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#FD6B5B]" />
                <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="size-2.5 rounded-full bg-[#28C840]" />
              </div>
              <span>ИИ-видеоинтервью — Frontend-разработчик</span>
            </div>

            <div className="flex flex-col gap-2.5 p-3.5">
              <div className="rounded-[8px] border border-grey2 bg-white px-3.5 py-2.5">
                <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.5px] text-brand1">
                  Вопрос 3 из 8
                </div>
                <div className="text-[11px] font-semibold leading-[1.5] text-text1">
                  Расскажите о вашем опыте работы с React. Какие паттерны управления
                  состоянием вы использовали?
                </div>
              </div>

              <div className="relative rounded-[8px] border border-grey2 bg-grey1 px-3.5 py-7 text-center">
                <span className="absolute right-3 top-2.5 rounded-full border border-brand1/25 bg-brand1-bg px-2 py-0.5 text-[10px] font-bold text-brand1">
                  05:42
                </span>
                <div className="mx-auto mb-2.5 flex size-12 items-center justify-center rounded-full border-2 border-brand1 bg-brand1-bg">
                  <Video size={20} strokeWidth={1.8} className="text-brand1" />
                </div>
                <div className="text-[11px] font-semibold text-text2">
                  Кандидат записывает видеоответ...
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-[8px] border border-brand1/15 bg-brand1/[0.04] px-3.5 py-2.5 text-[11px] font-semibold text-brand1">
                <span className="size-1.5 rounded-full bg-brand1 animate-pulse-dot" />
                ИИ анализирует ответы в реальном времени...
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {["React", "JavaScript", "TypeScript", "Hard Skills"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-brand1/25 bg-brand1-bg px-2 py-[3px] text-[10px] font-semibold text-brand1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-0.5 flex items-center gap-[7px] rounded-[8px] border border-brand1/25 bg-brand1-bg px-3.5 py-2.5 text-[12px] font-medium leading-[1.4] text-brand3">
                <Video size={14} strokeWidth={1.8} className="shrink-0 text-brand1" />
                <span className="flex-1">
                  Прогресс интервью: <strong className="font-bold text-brand1">3/8 вопросов</strong> — запись и анализ
                </span>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      {/* ═══ TICKER ═══ */}
      <div className="overflow-hidden border-y border-grey2 bg-grey1 py-3.5">
        <div className="flex w-max animate-ticker">
          {[
            ...TICKER_ITEMS,
            ...TICKER_ITEMS,
          ].map(({ Icon: TickIcon, label }, i) => (
            <div
              key={`${label}-${i}`}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap px-8 text-[13px] font-medium text-text2"
            >
              <span className="flex shrink-0 items-center text-brand1">
                <TickIcon size={16} strokeWidth={1.8} />
              </span>
              <b className="font-semibold text-text1">{label}</b>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ ПРОБЛЕМЫ / БОЛИ ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Почему ручной отбор
            <br />
            <em className="not-italic text-brand1">тормозит найм</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Каждый день ручного проведения собеседований — это упущенные кандидаты и
            потраченное время команды.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 max-bp-md:grid-cols-1">
            {PAINS.map(({ Icon: PIcon, title, body }, i) => (
              <Reveal key={title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <article
                  className="h-full rounded-card border border-grey2 bg-white p-7 shadow-soft transition-all hover:border-brand1 hover:shadow-md"
                >
                  <span className="mb-3.5 flex items-center text-brand1">
                    <PIcon size={26} strokeWidth={1.8} />
                  </span>
                  <h3 className="mb-2 text-[16px] font-bold text-text1">{title}</h3>
                  <p className="text-[14px] leading-[1.65] text-text2">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <div className="border-y border-grey2 bg-grey1 py-12">
        <div className="mx-auto grid max-w-[1240px] grid-cols-4 px-6 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-2">
          {STATS.map((s, i) => (
            <Reveal key={s.num} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div
                className={`px-12 py-8 max-bp-sm:px-5 max-bp-sm:py-5 max-bp-md:px-6 max-bp-sm:px-4 ${
                  i < STATS.length - 1
                    ? "border-r border-grey2 max-bp-sm:border-b max-bp-sm:border-r-0 last:max-bp-sm:border-b-0"
                    : ""
                }`}
              >
                <div className="mb-3 text-[48px] font-extrabold leading-none tracking-[-2px] text-text1">
                  <span className="text-brand1">{s.num}</span>
                </div>
                <div
                  className="text-[13px] font-medium leading-[1.55] text-text2"
                  dangerouslySetInnerHTML={{ __html: s.desc }}
                />
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

      {/* ═══ КАК ЭТО РАБОТАЕТ (шаги) ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container>
          <span className="inline-flex items-center rounded-full bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[0.8px] text-brand1">
            Как это работает
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Как работает первичный отбор:
            <br />
            <em className="not-italic text-brand1">тестирование с прокторингом</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Полный цикл автоматического видеоинтервью — от подготовки вопросов до
            рейтинга кандидатов.
          </p>

          <div className="mt-12 grid grid-cols-4 gap-4 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
            {STEPS.map(({ Icon: StepIcon, time, title, text }, idx) => (
              <Reveal key={title} delay={((idx % 3) + 1) as 1 | 2 | 3}>
                <article
                  className="h-full rounded-card border border-grey2 bg-white p-7 shadow-soft transition-all hover:border-brand1 hover:shadow-md"
                >
                  <div className="mb-3 flex items-center justify-between text-[12px] font-bold text-brand1">
                    <span>Шаг {idx + 1}</span>
                    <span className="rounded-full bg-brand1-bg px-2.5 py-1 text-[11px] font-bold text-brand1">
                      {time}
                    </span>
                  </div>
                  <span className="mb-3 flex items-center text-brand1">
                    <StepIcon size={26} strokeWidth={1.8} />
                  </span>
                  <h3 className="mb-2 text-[15px] font-bold text-text1">{title}</h3>
                  <p className="text-[13px] leading-[1.65] text-text2">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ СРАВНЕНИЕ ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Ускорьте первичный отбор
            <br />
            <em className="not-italic text-brand1">с помощью ИИ-прокторинга</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Ручные интервью отнимают дни и дают субъективные результаты. Сравните сами.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 max-bp-lg:grid-cols-1">
            {/* Bad column */}
            <div className="overflow-hidden rounded-card border border-grey2 bg-white shadow-soft">
              <div className="flex items-center gap-2.5 border-b border-grey2 bg-grey1 px-6 py-4 text-[14px] font-bold text-text2">
                <AlertCircle size={16} strokeWidth={1.8} className="text-text2" />
                Ручной метод
              </div>
              <ul className="py-1">
                {COMPARE_BAD.map(({ Icon: BIcon, text }) => (
                  <li
                    key={text}
                    className="flex items-start gap-3 border-b border-grey1 px-6 py-3 text-[14px] text-text2 last:border-b-0"
                  >
                    <span className="mt-0.5 shrink-0 text-[#F04438]">
                      <BIcon size={18} strokeWidth={1.8} />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 border-t border-grey2 bg-grey1 px-[22px] py-3.5 text-[13px] font-bold text-brand2">
                <AlertCircle size={18} strokeWidth={1.8} />
                Долго, субъективно, нет записей
              </div>
            </div>

            {/* Good column */}
            <div className="overflow-hidden rounded-card border border-brand1 bg-white shadow-soft">
              <div className="flex items-center gap-2.5 border-b border-brand1/20 bg-brand1-bg px-6 py-4 text-[14px] font-bold text-brand3">
                <CheckCircle2 size={16} strokeWidth={1.8} className="text-brand1" />
                Автоматизация BRaiN HR
                <span className="rounded-full bg-brand1 px-2.5 py-0.5 text-[11px] font-bold text-white">
                  Рекомендуем
                </span>
              </div>
              <ul className="py-1">
                {COMPARE_GOOD.map(({ Icon: GIcon, text }) => (
                  <li
                    key={text}
                    className="flex items-start gap-3 border-b border-grey1 px-6 py-3 text-[14px] text-text1 last:border-b-0"
                  >
                    <span className="mt-0.5 shrink-0 text-brand1">
                      <GIcon size={18} strokeWidth={1.8} />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 border-t border-brand1/20 bg-brand1-bg px-[22px] py-3.5 text-[13px] font-bold text-brand1">
                <Zap size={18} strokeWidth={1.8} />
                Быстро, объективно, всё записано
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
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-20 bg-gradient-to-l from-white to-transparent" />
          <div className="flex w-max animate-ticker items-center">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <a
                key={`${logo.href}-${i}`}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[68px] shrink-0 items-center justify-center whitespace-nowrap border-r border-grey2 px-9 leading-[1.2] opacity-60 transition-opacity hover:opacity-100 last:border-r-0"
              >
                {logo.content}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ КОМУ БУДЕТ ПОЛЕЗНО (статично, активна 1-я аудитория) ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container>
          <span className="inline-flex items-center rounded-full bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[0.8px] text-brand1">
            Кому подойдёт
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Кому подойдёт первичное
            <br />
            <em className="not-italic text-brand1">ИИ-тестирование с прокторингом</em>?
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Автоматизируйте первичный отбор кандидатов и сосредоточьтесь на финальных
            этапах найма. ИИ видеоинтервью освобождает время для стратегических задач и
            работы с топ-кандидатами
          </p>

          <AudienceTabs audiences={AUDIENCES} />
        </Container>
      </section>

      {/* ═══ ВОЗМОЖНОСТИ ПЛАТФОРМЫ — Feature Rows ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container>
          <span className="inline-flex items-center rounded-full bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[0.8px] text-brand1">
            Возможности платформы
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Возможности платформы
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Полный цикл автоматического видеоинтервью — от генерации вопросов до
            детальных отчётов по кандидатам.
          </p>

          {/* Feature Row 1 */}
          <FeatureRow
            num="01"
            title="Автоматическое тестирование кандидатов"
            desc="Искусственный интеллект самостоятельно проводит видеоинтервью с кандидатами в удобное для них время. BRaiN HR автоматически приглашает соответствующих кандидатов на прохождение AI видеоинтервью по уникальной ссылке. Система задаёт подготовленные вопросы, записывает ответы и анализирует hard skills соискателей. ИИ видеоинтервью работает 24/7, освобождая рекрутеров от рутинных первичных собеседований."
            checks={[
              "Автоматическое приглашение кандидатов по ссылке",
              "Запись видеоответов и анализ hard skills",
              "Круглосуточная работа без участия рекрутера",
            ]}
            mock={<MockInterview />}
          />

          {/* Feature Row 2 */}
          <FeatureRow
            num="02"
            title="Интеллектуальный анализ ответов"
            desc="Система проводит глубокий анализ видеоответов кандидатов: оценивает содержание, уверенность речи, невербальные сигналы и соответствие требованиям вакансии. BRaiN HR распознаёт ключевые компетенции, выявляет потенциальные риски и формирует объективную оценку каждого соискателя. Анализ видеоинтервью помогает принимать обоснованные решения о приглашении на следующий этап."
            checks={[
              "Анализ содержания, речи и невербальных сигналов",
              "Выявление ключевых компетенций и рисков",
              "Объективная оценка каждого соискателя",
            ]}
            reversed
            mock={<MockAnalysis />}
          />

          {/* Feature Row 3 */}
          <FeatureRow
            num="03"
            title="ИИ генерация вопросов"
            desc="ИИ генерирует вопросы для видеоинтервью, отталкиваясь от необходимых навыков и общего описания вакансии. Создавайте уникальные сценарии с техническими, поведенческими и ситуационными вопросами. При необходимости редактируйте или добавляйте варианты вопросов вручную."
            checks={[
              "Генерация на основе описания вакансии и навыков",
              "Технические, поведенческие и ситуационные вопросы",
              "Возможность редактирования и добавления вопросов",
            ]}
            mock={<MockGeneration />}
          />

          {/* Feature Row 4 */}
          <FeatureRow
            num="04"
            title="Прокторинг с включённой камерой"
            desc="BRaiN HR проводит видеоинтервью, озвучивая вопросы с отображением на экране, в удобное для кандидата время без привязки к расписанию рекрутера. Соискатели получают ссылку, проходят интервью когда удобно, а система автоматически обрабатывает результаты. Асинхронное видеоинтервью особенно эффективно при подборе кандидатов из разных часовых поясов."
            checks={[
              "Кандидат проходит интервью в удобное время",
              "Без привязки к расписанию рекрутера",
              "Эффективно для кандидатов из разных часовых поясов",
            ]}
            reversed
            mock={<MockAsync />}
          />

          {/* Feature Row 5 */}
          <FeatureRow
            num="05"
            title="Автоматическое формирование рейтинга"
            desc="Видеоинтервью с ИИ автоматически ранжирует кандидатов по заданным критериям. Система присваивает баллы за каждый ответ, выявляет сильные и слабые стороны соискателей и формирует итоговый рейтинг. Вы получаете список лучших кандидатов с детальными рекомендациями для принятия решения."
            checks={[
              "Баллы за каждый ответ и общая оценка",
              "Выявление сильных и слабых сторон",
              "Детальные рекомендации для принятия решения",
            ]}
            mock={<MockRanking />}
          />

          {/* Feature Row 6 */}
          <FeatureRow
            num="06"
            title="Детальные отчёты по кандидатам"
            desc="Система генерирует структурированные отчёты о каждом видеоинтервью: транскрипция ответов, оценка компетенций, анализ коммуникативных навыков и рекомендации по дальнейшим действиям. Отчёты сохраняются в базе данных и доступны всей команде HR, руководителям отделов и другим заинтересованным лицам, которые участвуют в процессе подбора."
            checks={[
              "Транскрипция всех ответов кандидата",
              "Оценка компетенций и коммуникативных навыков",
              "Доступ для всей команды HR и руководителей",
            ]}
            reversed
            mock={<MockReport />}
            isLast
          />
        </Container>
      </section>

      {/* ═══ CTA + ФОРМА ═══ */}
      <section
        id="form"
        className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14 max-bp-sm:py-10"
      >
        <Container className="grid grid-cols-2 items-start gap-20 max-bp-xl:grid-cols-1 max-bp-xl:gap-12">
          <div>
            <span className="inline-flex items-center rounded-full bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[0.8px] text-brand1">
              Попробуйте сами
            </span>
            <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
              Получите доступ к ИИ-тестированию с прокторингом{" "}
              <em className="not-italic text-brand1">уже сегодня</em>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.72] text-text2">
              Попробуйте бесплатно — убедитесь, что ИИ проводит интервью быстрее и
              объективнее.
            </p>
            <ul className="mt-7 flex flex-col gap-3">
              {CTA_POINTS.map(({ Icon: PtIcon, title, body }, i) => (
                <Reveal key={title} as="li" delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div
                    className="flex items-start gap-4 rounded-[10px] border border-grey2 bg-grey1 px-4 py-3.5"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-brand1/20 bg-brand1-bg text-brand1">
                      <PtIcon size={18} strokeWidth={1.8} />
                    </span>
                    <div className="text-[13px] text-text2">
                      <strong className="block text-text1">{title}</strong>
                      {body}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <LeadForm
            title="Получите доступ к ИИ видеоинтервью"
            subtitle="Проведём первые 100 интервью бесплатно"
            submitLabel="Получить доступ бесплатно"
            leadType="videointerview"
          />
        </Container>
      </section>

      {/* ═══ CROSS-SELL ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container>
          <span className="inline-flex items-center rounded-full bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[0.8px] text-brand1">
            Другие возможности BRaiN HR
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Интервью проведены — <em className="not-italic text-brand1">что дальше?</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            BRaiN HR автоматизирует весь цикл найма — от создания вакансии до финального
            решения.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-4 max-bp-lg:grid-cols-1">
            {CROSS_SELL.map(({ Icon: CIcon, title, text, href }, i) => (
              <Reveal key={title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <a
                  href={href}
                  className="block h-full rounded-card border border-grey2 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-brand1 hover:shadow-md"
                >
                  <span className="mb-4 flex items-center text-brand1">
                    <CIcon size={26} strokeWidth={1.8} />
                  </span>
                  <div className="mb-2 text-[16px] font-bold text-text1">{title}</div>
                  <p className="mb-4 text-[13px] leading-[1.6] text-text2">{text}</p>
                  <span className="flex items-center gap-1 text-[13px] font-bold text-brand1">
                    Подробнее
                    <ArrowRight size={14} strokeWidth={1.8} />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

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

/* ──────────────────────────────────────────────────────────────────
   FeatureRow — повторяющийся блок (мокап + текст)
   ────────────────────────────────────────────────────────────────── */
type FeatureRowProps = {
  num: string;
  title: string;
  desc: string;
  checks: string[];
  reversed?: boolean;
  isLast?: boolean;
  mock: ReactNode;
};

function FeatureRow({
  num,
  title,
  desc,
  checks,
  reversed,
  isLast,
  mock,
}: FeatureRowProps) {
  return (
    <div
      className={`grid grid-cols-2 items-center gap-14 py-14 max-bp-lg:grid-cols-1 max-bp-lg:gap-8 max-bp-sm:py-6 max-bp-sm:gap-5 ${
        !isLast ? "border-b border-grey2" : ""
      }`}
    >
      {reversed ? (
        <>
          <div className="max-bp-lg:order-2">
            <FeatureContent num={num} title={title} desc={desc} checks={checks} />
          </div>
          <div className="max-bp-lg:order-1">{mock}</div>
        </>
      ) : (
        <>
          <div>{mock}</div>
          <div>
            <FeatureContent num={num} title={title} desc={desc} checks={checks} />
          </div>
        </>
      )}
    </div>
  );
}

function FeatureContent({
  num,
  title,
  desc,
  checks,
}: {
  num: string;
  title: string;
  desc: string;
  checks: string[];
}) {
  return (
    <>
      <div className="mb-2.5 text-[11px] font-extrabold uppercase tracking-[2px] text-brand1">
        {num}
      </div>
      <h3 className="mb-3.5 text-[clamp(20px,2vw,26px)] font-extrabold leading-[1.25] tracking-[-0.4px] text-text1">
        {title}
      </h3>
      <p className="mb-5 text-[14px] leading-[1.72] text-text2">{desc}</p>
      <ul className="flex flex-col gap-2">
        {checks.map((c) => (
          <li
            key={c}
            className="flex items-start gap-2 text-[13px] font-medium leading-[1.4] text-text1"
          >
            <Check
              size={14}
              strokeWidth={2.5}
              className="mt-0.5 shrink-0 text-brand1"
            />
            {c}
          </li>
        ))}
      </ul>
      <a
        href="#form"
        className="mt-5 inline-flex items-center gap-1.5 rounded-[8px] border-[1.5px] border-brand1 bg-white px-[22px] py-[11px] text-[13px] font-bold text-brand1 transition-all hover:-translate-y-px hover:bg-brand1 hover:text-white hover:shadow-md"
      >
        Попробовать
      </a>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Browser-frame mock wrapper
   ────────────────────────────────────────────────────────────────── */
function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-card border border-grey2 bg-white shadow-md">
      <div className="flex items-center gap-1.5 border-b border-grey2 bg-grey1 px-3.5 py-2.5">
        <span className="size-2.5 rounded-full bg-[#FD6B5B]" />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="size-2.5 rounded-full bg-[#28C840]" />
      </div>
      {children}
    </div>
  );
}

function MockTabs({ tabs }: { tabs: { label: string; active?: boolean }[] }) {
  return (
    <div className="flex border-b border-grey2">
      {tabs.map((t) => (
        <span
          key={t.label}
          className={`-mb-px border-b-2 px-3.5 py-2.5 text-[11px] font-semibold ${
            t.active
              ? "border-brand1 text-brand1"
              : "border-transparent text-text2"
          }`}
        >
          {t.label}
        </span>
      ))}
    </div>
  );
}

function EditorField({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="min-w-[60px] text-[10px] font-semibold text-text2">
        {label}
      </span>
      <span
        className={`flex-1 rounded-md border border-grey2 bg-grey1 px-2.5 py-1.5 text-[11px] font-semibold ${
          accent ? "text-brand1" : "text-text1"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function AiBadge({ children }: { children: ReactNode }) {
  return (
    <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-brand1/20 bg-brand1-bg px-2 py-0.5 text-[10px] font-semibold text-brand1">
      <Zap size={10} strokeWidth={2} />
      {children}
    </span>
  );
}

/* ──────────── Mock 1: Интервью ──────────── */
function MockInterview() {
  return (
    <BrowserFrame>
      <div className="p-4">
        <MockTabs
          tabs={[
            { label: "Интервью", active: true },
            { label: "Вопросы" },
            { label: "Результаты" },
          ]}
        />
        <div className="p-3.5">
          <EditorField label="Кандидат" value="Смирнов А.В." />
          <EditorField label="Вакансия" value="Backend-разработчик" />
          <EditorField label="Статус" value="Интервью в процессе" accent />
          <div className="mt-2.5 rounded-md border border-brand1/15 bg-brand1/[0.04] p-2.5">
            <div className="mb-1 text-[11px] font-bold text-text1">Текущий вопрос</div>
            <div className="text-[10px] leading-[1.6] text-text2">
              Опишите ваш опыт проектирования REST API. Какие принципы вы считаете
              ключевыми?
            </div>
            <AiBadge>Вопрос 4 из 8</AiBadge>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {["REST API", "Python", "Архитектура", "Hard Skills"].map((t) => (
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
    </BrowserFrame>
  );
}

/* ──────────── Mock 2: Анализ ──────────── */
function MockAnalysis() {
  return (
    <BrowserFrame>
      <div className="border-b border-grey2 px-3.5 pb-2 pt-3 text-[13px] font-bold text-text1">
        Анализ видеоответа — Backend-разработчик
      </div>
      <div className="flex flex-col gap-2 p-3.5">
        {[
          { text: "Содержание ответа: релевантно", badge: "92%", meta: "Высокая компетентность" },
          { text: "Уверенность речи: высокая", badge: "88%", meta: "Коммуникация" },
          { text: "Невербальные сигналы: позитивные", badge: "85%", meta: "Soft Skills" },
        ].map((q) => (
          <div
            key={q.text}
            className="rounded-[8px] border border-grey2 bg-white px-3 py-2.5"
          >
            <div className="mb-1.5 text-[11px] font-semibold leading-[1.5] text-text1">
              {q.text}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="rounded-full bg-brand1-bg px-2 py-0.5 text-[9px] font-bold text-brand1">
                {q.badge}
              </span>
              <span className="text-[9px] font-medium text-text2">{q.meta}</span>
            </div>
          </div>
        ))}
        <div className="px-3 py-2 text-center">
          <AiBadge>Комплексная оценка: 88%</AiBadge>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ──────────── Mock 3: Генерация вопросов ──────────── */
function MockGeneration() {
  return (
    <BrowserFrame>
      <div className="p-4">
        <MockTabs
          tabs={[
            { label: "Генерация", active: true },
            { label: "Редактирование" },
            { label: "Сценарий" },
          ]}
        />
        <div className="p-3.5">
          <EditorField label="Вакансия" value="Product Manager" />
          <EditorField label="Навыки" value="Agile, аналитика, лидерство" />
          <div className="mt-2.5 rounded-md border border-brand1/15 bg-brand1/[0.04] p-2.5">
            <div className="mb-1 text-[11px] font-bold text-text1">
              Сгенерированные вопросы
            </div>
            <div className="text-[10px] leading-[1.6] text-text2">
              1. Расскажите о вашем опыте запуска продуктов от идеи до релиза.
              <br />
              2. Как вы приоритизируете задачи в бэклоге?
              <br />
              3. Опишите ситуацию, когда вам пришлось принять сложное решение.
            </div>
            <AiBadge>ИИ сгенерировал 8 вопросов</AiBadge>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {["Технические", "Поведенческие", "Ситуационные"].map((t) => (
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
    </BrowserFrame>
  );
}

/* ──────────── Mock 4: Асинхронные интервью ──────────── */
function MockAsync() {
  return (
    <BrowserFrame>
      <div className="border-b border-grey2 px-3.5 pb-2 pt-3 text-[13px] font-bold text-text1">
        Асинхронные интервью — статус
      </div>
      <div className="flex flex-col gap-2 p-3.5">
        {[
          {
            text: "Иванова Е.К. — прошла в 23:47 (МСК)",
            badge: "Завершено",
            meta: "Оценка: 91%",
            tone: "basic" as const,
          },
          {
            text: "Ким Д.С. — прошёл в 06:15 (Владивосток)",
            badge: "Завершено",
            meta: "Оценка: 84%",
            tone: "basic" as const,
          },
          {
            text: "Попов А.Р. — ссылка отправлена",
            badge: "Ожидание",
            meta: "Приглашение 2 часа назад",
            tone: "advanced" as const,
          },
        ].map((q) => (
          <div
            key={q.text}
            className="rounded-[8px] border border-grey2 bg-white px-3 py-2.5"
          >
            <div className="mb-1.5 text-[11px] font-semibold leading-[1.5] text-text1">
              {q.text}
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                  q.tone === "basic"
                    ? "bg-brand1-bg text-brand1"
                    : "bg-brand2-bg text-brand2"
                }`}
              >
                {q.badge}
              </span>
              <span className="text-[9px] font-medium text-text2">{q.meta}</span>
            </div>
          </div>
        ))}
        <div className="px-3 py-2 text-center">
          <AiBadge>Доступно 24/7 из любого часового пояса</AiBadge>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ──────────── Mock 5: Рейтинг ──────────── */
function MockRanking() {
  return (
    <BrowserFrame>
      <div className="p-4">
        <MockTabs
          tabs={[
            { label: "Рейтинг", active: true },
            { label: "Детали" },
          ]}
        />
        <div className="p-3.5">
          <EditorField label="#1" value="Иванова Е.К. — 91%" />
          <EditorField label="#2" value="Смирнов А.В. — 88%" />
          <EditorField label="#3" value="Ким Д.С. — 84%" />
          <div className="mt-2.5 rounded-md border border-brand1/15 bg-brand1/[0.04] p-2.5">
            <div className="mb-1 text-[11px] font-bold text-text1">Рекомендация ИИ</div>
            <div className="text-[10px] leading-[1.6] text-text2">
              Топ-3 кандидата рекомендованы к следующему этапу. Сильные стороны:
              технические навыки, коммуникация, мотивация.
            </div>
            <AiBadge>12 кандидатов ранжированы</AiBadge>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ──────────── Mock 6: Отчёт ──────────── */
function MockReport() {
  return (
    <BrowserFrame>
      <div className="border-b border-grey2 px-3.5 pb-2 pt-3 text-[13px] font-bold text-text1">
        Отчёт — Иванова Е.К.
      </div>
      <div className="flex flex-col gap-2 p-3.5">
        {[
          {
            text: "Транскрипция: 8 ответов расшифрованы",
            badge: "Полная",
            meta: "Доступна команде",
          },
          {
            text: "Компетенции: технические навыки — 92%",
            badge: "Высокий",
            meta: "Коммуникация — 88%",
          },
          {
            text: "Рекомендация: пригласить на финальное собеседование",
            badge: "Рекомендован",
            meta: "Итого: 91%",
          },
        ].map((q) => (
          <div
            key={q.text}
            className="rounded-[8px] border border-grey2 bg-white px-3 py-2.5"
          >
            <div className="mb-1.5 text-[11px] font-semibold leading-[1.5] text-text1">
              {q.text}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="rounded-full bg-brand1-bg px-2 py-0.5 text-[9px] font-bold text-brand1">
                {q.badge}
              </span>
              <span className="text-[9px] font-medium text-text2">{q.meta}</span>
            </div>
          </div>
        ))}
        <div className="px-3 py-2 text-center">
          <AiBadge>Отчёт доступен всей команде HR</AiBadge>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Static data
   ────────────────────────────────────────────────────────────────── */

const TICKER_ITEMS = [
  { Icon: Video, label: "Автоматическое интервью 24/7" },
  { Icon: Activity, label: "Анализ речи и невербалики" },
  { Icon: Zap, label: "ИИ-генерация вопросов" },
  { Icon: BarChart3, label: "Рейтинг кандидатов" },
  { Icon: FileText, label: "Детальные отчёты" },
  { Icon: Clock, label: "Асинхронный формат" },
];

const PAINS = [
  {
    Icon: Clock,
    title: "30-60 минут на каждое интервью",
    body: "Рекрутер тратит от 30 до 60 минут на проведение одного первичного интервью. При 50+ кандидатах — это целые рабочие недели на рутинные собеседования.",
  },
  {
    Icon: Calendar,
    title: "Согласование расписания",
    body: "Необходимость согласовывать время с каждым кандидатом превращает организацию собеседований в логистический кошмар, который затягивает процесс найма на недели.",
  },
  {
    Icon: AlertTriangle,
    title: "Субъективность оценки",
    body: "Качество оценки зависит от настроения, усталости и предвзятости интервьюера. Разные рекрутеры оценивают одного и того же кандидата по-разному.",
  },
  {
    Icon: Video,
    title: "Нет записи — нет сравнения",
    body: "Без записи интервью невозможно объективно сравнить кандидатов. Детали ответов забываются, а решения принимаются на основе впечатлений.",
  },
];

const STATS = [
  { num: "5-10 мин", desc: "автоматическое<br>видеоинтервью" },
  { num: "24/7", desc: "доступность<br>для кандидатов" },
  { num: "85%", desc: "точность оценки<br>кандидатов" },
  { num: "100+", desc: "кандидатов<br>одновременно" },
];

const STEPS = [
  {
    Icon: Pencil,
    time: "5 мин",
    title: "Настройте сценарий интервью",
    text: "ИИ генерирует вопросы на основе требований вакансии. Редактируйте, добавляйте или настраивайте сценарий под ваши задачи",
  },
  {
    Icon: Send,
    time: "авто",
    title: "Кандидат получает ссылку",
    text: "Система автоматически приглашает кандидатов на прохождение видеоинтервью по уникальной персональной ссылке",
  },
  {
    Icon: Video,
    time: "5-10 мин",
    title: "ИИ проводит видеоинтервью",
    text: "Система озвучивает вопросы, записывает видеоответы кандидата и анализирует содержание, речь и невербальные сигналы",
  },
  {
    Icon: BarChart3,
    time: "авто",
    title: "Получите рейтинг кандидатов",
    text: "Система формирует детальные отчёты по каждому кандидату с оценками, транскрипцией и рекомендациями",
  },
];

const COMPARE_BAD = [
  { Icon: Clock, text: "30-60 минут на проведение одного первичного интервью" },
  { Icon: Calendar, text: "Необходимость согласовывать время с каждым кандидатом" },
  {
    Icon: AlertTriangle,
    text: "Субъективность оценки и влияние человеческого фактора",
  },
  { Icon: Video, text: "Отсутствие записи и сложность сравнения кандидатов" },
];

const COMPARE_GOOD = [
  { Icon: Zap, text: "5-10 минут автоматического видеоинтервью с каждым кандидатом" },
  { Icon: Clock, text: "Кандидаты проходят интервью в удобное для них время 24/7" },
  { Icon: Activity, text: "Объективная оценка по единым критериям всех соискателей" },
  { Icon: FileText, text: "Полная запись всех интервью и автоматические отчёты" },
];

const LOGOS = [
  {
    href: "https://www.simbirsoft.com/",
    content: (
      <span
        style={{
          fontSize: "18px",
          fontWeight: 800,
          color: "#1a1a2e",
          letterSpacing: "-0.5px",
        }}
      >
        Simbir<span style={{ color: "#e03030" }}>S</span>oft
      </span>
    ),
  },
  {
    href: "https://bssys.com/",
    content: (
      <span
        style={{
          background: "#1a3a8a",
          color: "#fff",
          fontSize: "15px",
          fontWeight: 900,
          padding: "5px 10px",
          borderRadius: "4px",
          letterSpacing: "1px",
        }}
      >
        BSS
      </span>
    ),
  },
  {
    href: "https://3logic.ru/",
    content: (
      <span
        style={{
          fontSize: "15px",
          fontWeight: 800,
          color: "#1a1a1a",
          letterSpacing: "-0.3px",
        }}
      >
        3<span style={{ color: "#e03030" }}>LOGIC</span>
        <br />
        <span
          style={{
            fontSize: "9px",
            fontWeight: 600,
            color: "#555",
            letterSpacing: "1px",
          }}
        >
          GROUP
        </span>
      </span>
    ),
  },
  {
    href: "https://kazan.rt.ru/",
    content: (
      <span
        style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "#1a1a1a",
          letterSpacing: "0.5px",
        }}
      >
        РОСТЕЛЕКОМ
      </span>
    ),
  },
  {
    href: "https://e-flops.ru/",
    content: (
      <span
        style={{
          fontSize: "16px",
          fontWeight: 800,
          color: "#222",
          letterSpacing: "-0.5px",
        }}
      >
        e<span style={{ color: "#4096FF" }}>-</span>flops
      </span>
    ),
  },
  {
    href: "https://itpeoplegroup.ru/",
    content: (
      <span
        style={{
          fontSize: "12px",
          fontWeight: 800,
          color: "#1a1a1a",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          border: "2px solid #1a1a1a",
          padding: "4px 8px",
        }}
      >
        IT PEOPLE
      </span>
    ),
  },
  {
    href: "https://moby.estate/",
    content: (
      <span
        style={{
          fontSize: "17px",
          fontWeight: 800,
          color: "#2b4de3",
          letterSpacing: "-0.5px",
        }}
      >
        moby
      </span>
    ),
  },
  {
    href: "https://www.hr-rocket.ru/",
    content: (
      <span
        style={{
          fontSize: "14px",
          fontWeight: 800,
          color: "#1a1a1a",
          letterSpacing: "0.5px",
        }}
      >
        HR ROCKET
      </span>
    ),
  },
  {
    href: "https://prodamus.ru/",
    content: (
      <span
        style={{
          fontSize: "15px",
          fontWeight: 700,
          color: "#6c3db5",
          letterSpacing: "-0.3px",
        }}
      >
        prodamus
      </span>
    ),
  },
  {
    href: "https://www.penoplex.ru/",
    content: (
      <span
        style={{
          fontSize: "13px",
          fontWeight: 800,
          color: "#e03030",
          letterSpacing: "0.5px",
        }}
      >
        PENOPLEX
      </span>
    ),
  },
];

const AUDIENCES: AudienceItem[] = [
  {
    tab: "HR-специалистам",
    title: (
      <>
        Проводите первичный отбор{" "}
        <em className="not-italic text-brand1">без потери времени</em>
      </>
    ),
    body: "Вместо часов на проведение первичных интервью — автоматическое видеоинтервью с каждым кандидатом. Сфокусируйтесь на финальных собеседованиях с лучшими соискателями.",
    checks: [
      "Автоматическое проведение первичных интервью",
      "Единые критерии оценки для всех кандидатов",
      "Детальные отчёты с записью каждого интервью",
    ],
    stats: [
      { num: "5-10 мин", desc: "на одно\nинтервью" },
      { num: "24/7", desc: "доступность\nсистемы" },
      { num: "85%", desc: "точность\nоценки" },
    ],
  },
  {
    tab: "Рекрутинговым агентствам",
    title: (
      <>
        Масштабируйте интервью{" "}
        <em className="not-italic text-brand1">без увеличения штата</em>
      </>
    ),
    body: "Проводите сотни первичных интервью одновременно по всем вакансиям клиентов. ИИ обеспечивает единое качество оценки для каждого кандидата.",
    checks: [
      "Параллельное проведение интервью по всем вакансиям",
      "Единый стандарт оценки для всех клиентов",
      "Видеозаписи и отчёты для заказчиков",
    ],
    stats: [
      { num: "10x", desc: "больше\nинтервью" },
      { num: "100+", desc: "кандидатов\nодновременно" },
    ],
  },
  {
    tab: "Руководителям отделов",
    title: (
      <>
        Оценивайте кандидатов{" "}
        <em className="not-italic text-brand1">без отрыва от работы</em>
      </>
    ),
    body: "Больше не нужно выделять часы на первичные собеседования. ИИ проведёт интервью и предоставит рейтинг кандидатов с детальными отчётами для принятия решения.",
    checks: [
      "Просматривайте только записи лучших кандидатов",
      "Объективные оценки без влияния человеческого фактора",
      "Транскрипция ответов для быстрого анализа",
    ],
    stats: [
      { num: "0", desc: "часов\nна интервью" },
      { num: "85%", desc: "точность\nоценки" },
    ],
  },
  {
    tab: "Стартапам",
    title: (
      <>
        Наймите команду быстро{" "}
        <em className="not-italic text-brand1">без выделенного рекрутера</em>
      </>
    ),
    body: "В стартапах часто нет HR-отдела. ИИ берёт на себя весь процесс первичных интервью — от приглашения до оценки. Фаундеры работают только с финалистами.",
    checks: [
      "Полный цикл первичных интервью без HR",
      "Первые 100 кандидатов бесплатно",
      "От отклика до рейтинга за 15 минут",
    ],
    stats: [
      { num: "100", desc: "кандидатов\nбесплатно" },
      { num: "15 мин", desc: "до рейтинга" },
    ],
  },
  {
    tab: "Кадровым центрам",
    title: (
      <>
        Стандартизируйте интервью{" "}
        <em className="not-italic text-brand1">во всех подразделениях</em>
      </>
    ),
    body: "Единые сценарии и критерии оценки для всех филиалов и отделений. Прозрачная аналитика по всем этапам отбора для принятия стратегических кадровых решений.",
    checks: [
      "Единый стандарт интервью для всех подразделений",
      "Комплексная аналитика по кандидатам и вакансиям",
      "Масштабирование без потери качества оценки",
    ],
    stats: [
      { num: "1", desc: "стандарт\nдля всех" },
      { num: "24/7", desc: "доступность\nинтервью" },
    ],
  },
];

const CTA_POINTS = [
  {
    Icon: Video,
    title: "Автоматические видеоинтервью 24/7",
    body: "Кандидаты проходят интервью в удобное время",
  },
  {
    Icon: Zap,
    title: "ИИ-генерация вопросов и анализ ответов",
    body: "Объективная оценка каждого кандидата",
  },
  {
    Icon: FileText,
    title: "Детальные отчёты и рейтинг кандидатов",
    body: "Транскрипция, оценки и рекомендации",
  },
];

const CROSS_SELL: {
  Icon: LucideIcon;
  title: string;
  text: string;
  href: string;
}[] = [
  {
    Icon: Pencil,
    title: "ИИ-создание вакансий",
    text: "Генерация профессиональных описаний вакансий за 30 секунд. SEO-оптимизация для job-бордов.",
    href: "/ai-vacancy-creation",
  },
  {
    Icon: BarChart3,
    title: "ИИ-анализ резюме",
    text: "Мгновенный скрининг и скоринг резюме. Объективная оценка сотен кандидатов одновременно.",
    href: "/ai-resume-analysis",
  },
  {
    Icon: ShieldCheck,
    title: "ИИ-оценка персонала",
    text: "Объективная оценка soft skills и компетенций. Единые критерии для всех кандидатов без предвзятости.",
    href: "/ai-staff-scoring",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Как работает ИИ видеоинтервью BRaiN HR?",
    a: "Система автоматически отправляет кандидатам персональную ссылку на видеоинтервью. Кандидат переходит по ссылке в удобное время и отвечает на вопросы, которые озвучиваются и отображаются на экране. ИИ записывает видеоответы, анализирует содержание, речь и невербальные сигналы, после чего формирует детальный отчёт с оценкой и рейтингом. Весь процесс занимает 5-10 минут для кандидата и не требует участия рекрутера.",
  },
  {
    q: "Можно ли настроить свои вопросы для видеоинтервью?",
    a: "Да, вы можете полностью настроить сценарий интервью. ИИ генерирует вопросы на основе описания вакансии и требуемых навыков, но вы можете редактировать, удалять или добавлять свои вопросы вручную. Доступны технические, поведенческие и ситуационные типы вопросов.",
  },
  {
    q: "Сколько стоит использование ИИ видеоинтервью?",
    a: "Первые 100 кандидатов — бесплатно, без регистрации карты и обязательств. Далее стоимость зависит от выбранного тарифа и объёма использования. Подробности на странице тарифов или свяжитесь с нами для получения персонального предложения.",
  },
  {
    q: "Насколько объективна оценка ИИ по сравнению с живым рекрутером?",
    a: "ИИ оценивает всех кандидатов по единым критериям, исключая влияние усталости, настроения и предвзятости. Точность оценки составляет 85% по данным наших клиентов. При этом ИИ не заменяет рекрутера — он автоматизирует первичный отбор, а финальное решение всегда остаётся за человеком.",
  },
  {
    q: "Можно ли изменить сценарий интервью после его запуска?",
    a: "Да, вы можете изменить сценарий интервью в любой момент. Новые кандидаты будут проходить обновлённый сценарий, а результаты по предыдущей версии сохранятся в системе. Это удобно, когда требования к вакансии уточняются в процессе подбора.",
  },
  {
    q: "Можно ли откатить сценарий интервью к предыдущей версии?",
    a: "Да, система сохраняет историю изменений сценариев. Вы можете вернуться к любой предыдущей версии сценария интервью и активировать её для новых кандидатов. Все результаты по каждой версии сценария сохраняются отдельно.",
  },
  {
    q: "Как кандидат получает персональную ссылку на интервью?",
    a: "Система автоматически генерирует уникальную персональную ссылку для каждого кандидата и отправляет её по email. Ссылка одноразовая и привязана к конкретному кандидату и вакансии. Кандидат может пройти интервью в удобное время в течение установленного срока.",
  },
  {
    q: "Можно ли редактировать критерии оценки и задать вес критериям?",
    a: "Да, вы можете настраивать критерии оценки (soft skills, технические навыки, мотивация, коммуникация) и задавать вес каждому критерию. Например, для технической позиции можно увеличить влияние hard skills, а для менеджерской — коммуникативных навыков. Также можно задать эталонные ответы для более точной оценки.",
  },
];



