import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/interactive/Reveal";
import { X, Check } from "lucide-react";

export const caseItMeta = {
  title:
    "IT-компания: автоматизация подбора технических специалистов — BRaiN HR",
  description:
    "Кейс: как IT-компания сократила время найма на 67% и выросла с 180 до 450 специалистов с помощью ИИ-автоматизации BRaiN HR.",
  noindex: true,
};

const KEY_METRICS = [
  { num: "-67%", label: "время найма" },
  { num: "+78%", label: "качество" },
  { num: "в 5×", label: "рост" },
  { num: "450", label: "специалистов" },
];

const CHALLENGES = [
  "Дефицит разработчиков, тестировщиков и DevOps-инженеров на рынке",
  "Цикл найма 2-3 месяца — неприемлемо для проектов",
  "60% кандидатов отказывались после техинтервью из-за долгого процесса",
  "2 рекрутера не имели технических знаний для качественного скрининга",
  "Стоимость одного найма более 350 000 рублей",
  "Кандидаты принимали офферы у конкурентов",
];

const SOLUTIONS: { title: string; body: string }[] = [
  {
    title: "ИИ-анализ резюме",
    body: "глубокий анализ технологического стека и опыта работы с фреймворками",
  },
  {
    title: "Автоматизированное тестирование",
    body: "адаптивные задания по сложности для оценки навыков",
  },
  {
    title: "ИИ-сорсинг",
    body: "таргетированный поиск на GitHub, Stack Overflow и профильных площадках",
  },
  {
    title: "Интеллектуальное ранжирование",
    body: "оценка не только навыков, но и потенциала роста",
  },
  {
    title: "Автоматизированное техинтервью",
    body: "первичная оценка через интерактивные задачи",
  },
  {
    title: "ИИ-генерация вакансий",
    body: "привлекательные описания с правильными терминами",
  },
];

const RESULTS = [
  { num: "-67%", label: "Сокращение времени найма" },
  { num: "+78%", label: "Повышение качества подбора" },
  { num: "в 5 раз", label: "Рост команды разработки" },
  { num: "450", label: "Технических специалистов" },
];

export function CaseItPage() {
  return (
    <main>
      {/* ═══ BLOCK 1: BREADCRUMBS + HERO ═══ */}
      <section className="bg-white pt-8 pb-14">
        <Container>
          <div className="pt-6 text-[13px] text-text2">
            <Link
              href="/"
              className="text-brand1 transition-colors hover:text-brand1-h"
            >
              Главная
            </Link>
            <span className="mx-1.5 text-grey2">&rsaquo;</span>
            <Link
              href="/case"
              className="text-brand1 transition-colors hover:text-brand1-h"
            >
              Кейсы
            </Link>
            <span className="mx-1.5 text-grey2">&rsaquo;</span>
            IT-компания
          </div>

          <div className="mt-6">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-brand1-bg px-3.5 py-[5px] text-[12px] font-bold uppercase tracking-[0.8px] text-brand1">
              IT
            </span>
            <h1 className="mb-4 text-left text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.15] tracking-[-0.8px] text-text1">
              IT-компания: автоматизация подбора технических специалистов
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-[13px] text-text2 max-bp-sm:flex-col max-bp-sm:items-start max-bp-sm:gap-2">
              <span>4 мин чтения</span>
              <span className="h-3.5 w-px bg-grey2 max-bp-sm:hidden" />
              <span>Елена Петрова, HR-эксперт</span>
              <span className="h-3.5 w-px bg-grey2 max-bp-sm:hidden" />
              <span>15 марта 2025</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ BLOCK 2: KEY METRICS BAR ═══ */}
      <section className="border-y border-grey2 bg-grey1 pb-14">
        <Container>
          <div className="rounded-card bg-grey1 p-8">
            <div className="grid grid-cols-4 gap-6 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
              {KEY_METRICS.map((m, i) => (
                <Reveal key={m.label} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div className="text-center">
                    <div className="mb-1 text-[clamp(28px,3vw,40px)] font-extrabold leading-[1.1] text-brand1">
                      {m.num}
                    </div>
                    <div className="text-[13px] font-medium text-text2">
                      {m.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ BLOCK 3: CHALLENGE ═══ */}
      <section className="border-t border-grey2 bg-white py-14">
        <Container>
          <h2 className="mb-4 text-left text-[clamp(24px,3vw,32px)] font-extrabold text-text1">
            Проблема
          </h2>
          <p className="mb-6 max-w-[720px] text-[15px] leading-[1.72] text-text2">
            Компания испытывала острую нехватку технических специалистов, что
            приводило к срыву дедлайнов проектов и потере клиентов.
          </p>
          <ul className="flex max-w-[720px] flex-col gap-3">
            {CHALLENGES.map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 text-[14px] leading-[1.65] text-text1"
              >
                <span
                  className="mt-px flex size-6 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "#FEE2E2", color: "#E5484D" }}
                >
                  <X size={14} strokeWidth={2.5} />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ═══ BLOCK 4: SOLUTION ═══ */}
      <section className="border-t border-grey2 bg-grey1 py-14">
        <Container>
          <h2 className="mb-4 text-left text-[clamp(24px,3vw,32px)] font-extrabold text-text1">
            Решение BRaiN HR
          </h2>
          <p className="mb-6 max-w-[720px] text-[15px] leading-[1.72] text-text2">
            Компания внедрила интеллектуальную систему для автоматизации
            технического рекрутинга.
          </p>
          <ul className="flex max-w-[720px] flex-col gap-3">
            {SOLUTIONS.map((s) => (
              <li
                key={s.title}
                className="flex items-start gap-3 text-[14px] leading-[1.65] text-text1"
              >
                <span className="mt-px flex size-6 shrink-0 items-center justify-center rounded-full bg-brand1-bg text-brand1">
                  <Check size={14} strokeWidth={2.5} />
                </span>
                <div>
                  <strong>{s.title}</strong> — {s.body}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ═══ BLOCK 5: RESULTS ═══ */}
      <section className="border-t border-grey2 bg-white py-14">
        <Container>
          <h2 className="mb-4 text-left text-[clamp(24px,3vw,32px)] font-extrabold text-text1">
            Результаты
          </h2>
          <div className="mb-6 grid grid-cols-4 gap-5 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
            {RESULTS.map((r, i) => (
              <Reveal key={r.label} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div
                  className="h-full rounded-card border border-grey2 bg-white px-5 py-7 text-center transition-all hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <div className="mb-1.5 text-[clamp(28px,3vw,36px)] font-extrabold leading-[1.1] text-brand1">
                    {r.num}
                  </div>
                  <div className="text-[13px] font-medium text-text2">
                    {r.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="max-w-[720px] text-[15px] leading-[1.72] text-text2">
            Количество технических специалистов выросло с 180 до 450
            сотрудников.
          </p>
        </Container>
      </section>

      {/* ═══ BLOCK 6: QUOTE ═══ */}
      <section className="border-y border-grey2 bg-grey1 pb-14">
        <Container>
          <div className="relative my-14 overflow-hidden rounded-r-card border-l-4 border-brand1 bg-white px-9 py-10 shadow-soft max-bp-sm:px-5 max-bp-sm:py-7">
            <div
              className="absolute left-7 top-4 text-[72px] font-black leading-none text-brand1-bg"
              style={{ fontFamily: "Georgia, serif" }}
              aria-hidden
            >
              &ldquo;
            </div>
            <div className="relative z-[1] mb-5 pt-6 text-[16px] italic leading-[1.75] text-text1">
              Внедрение ИИ-системы для технического рекрутинга стало переломным
              моментом для нашей компании. Мы наконец-то смогли масштабировать
              команды разработки без потери качества найма. Система
              интеллектуально оценивает технические навыки и находит
              кандидатов, которых мы бы никогда не нашли вручную. Сократили
              время найма на 67% и существенно снизили нагрузку на
              technical-лидов, которые теперь встречаются только с
              предквалифицированными специалистами. Это дало нам конкурентное
              преимущество на рынке.
            </div>
            <div className="text-[14px] font-bold text-text1">Елена Петрова</div>
            <div className="mt-0.5 text-[13px] text-text2">
              Head of People в IT-компании | 15 марта 2025
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ BLOCK 7: CTA ═══ */}
      <section className="bg-white pb-20">
        <Container>
          <div className="mb-14 rounded-card bg-grey1 px-6 py-[72px] text-center">
            <h2 className="mb-6 text-[clamp(24px,3vw,32px)] font-extrabold text-text1">
              Хотите таких же результатов?
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-bp-sm:flex-col max-bp-sm:items-center">
              <Button href="https://brainhire.ru/signup" variant="hero-primary" external>
                Попробовать бесплатно
              </Button>
              <Button href="https://brainhire.ru/contacts" variant="hero-outline" external>
                Связаться с нами
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
