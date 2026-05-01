import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/interactive/Reveal";
import { X, Check } from "lucide-react";

export const caseProductionMeta = {
  title:
    "Производственная компания: автоматизация подбора персонала — BRaiN HR",
  description:
    "Кейс: как производственная компания сократила время найма на 65% и выросла с 3 300 до 8 500 сотрудников с помощью ИИ-автоматизации BRaiN HR.",
  noindex: true,
};

const METRICS = [
  { num: "-65%", label: "время найма" },
  { num: "+72%", label: "удержание" },
  { num: "в 9×", label: "рост" },
  { num: "8 500", label: "сотрудников" },
];

const PROBLEMS = [
  "150-200 вакансий ежемесячно на разных производственных площадках",
  "35% новых сотрудников увольнялись в первые 3 месяца",
  "4 рекрутера не справлялись с потоком резюме и собеседований",
  "Цикл найма 45-60 дней от вакансии до выхода",
  "Отсутствие стандартизированной оценки — найм неподходящих кандидатов",
];

const SOLUTIONS: { title: string; body: string }[] = [
  {
    title: "ИИ-генерация вакансий",
    body: "привлекательные описания с учётом специфики и целевой аудитории",
  },
  {
    title: "ИИ-анализ резюме",
    body: "автоматический скрининг и ранжирование по ключевым критериям",
  },
  {
    title: "Стандартизированное тестирование",
    body: "когнитивные способности и технические навыки",
  },
  {
    title: "Чат-боты",
    body: "первичное интервью и проверка базовых требований",
  },
  {
    title: "Онлайн-тестирование и видео-интервью",
    body: "дистанционная оценка кандидатов из регионов",
  },
];

const RESULTS = [
  { num: "-65%", label: "Сокращение времени найма" },
  { num: "+72%", label: "Повышение удержания" },
  { num: "в 9 раз", label: "Рост штата" },
  { num: "8 500", label: "Сотрудников" },
];

export function CaseProductionPage() {
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
            Производство
          </div>
          <div className="mt-6">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-brand3 px-3.5 py-[5px] text-[12px] font-bold uppercase tracking-[0.8px] text-white">
              Производство
            </span>
            <h1 className="mb-4 text-left text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.15] tracking-[-0.8px] text-text1">
              Производственная компания: автоматизация подбора персонала
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-[13px] text-text2 max-bp-sm:flex-col max-bp-sm:items-start max-bp-sm:gap-2">
              <span>6 мин чтения</span>
              <span className="h-3.5 w-px bg-grey2 max-bp-sm:hidden" />
              <span>Александра Михайлова, HR-эксперт</span>
              <span className="h-3.5 w-px bg-grey2 max-bp-sm:hidden" />
              <span>5 июля 2025</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ BLOCK 2: KEY METRICS BAR ═══ */}
      <section className="border-y border-grey2 bg-grey1 pb-14">
        <Container>
          <div className="rounded-card bg-grey1 p-8">
            <div className="grid grid-cols-4 gap-6 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
              {METRICS.map((m, i) => (
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
      <section className="bg-white py-14">
        <Container>
          <h2 className="mb-4 text-left text-[clamp(24px,3vw,32px)] font-extrabold text-text1">
            Проблема
          </h2>
          <p className="mb-6 max-w-[720px] text-[15px] leading-[1.72] text-text2">
            Критическая нехватка производственного персонала напрямую влияла на
            выполнение планов и сроков поставок.
          </p>
          <ul className="flex max-w-[720px] flex-col gap-3">
            {PROBLEMS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[14px] leading-[1.65] text-text1"
              >
                <span className="mt-px flex size-6 shrink-0 items-center justify-center rounded-full bg-[#FEE2E2] text-[#E5484D]">
                  <X size={14} strokeWidth={2.5} />
                </span>
                {item}
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
            Компания внедрила комплексную систему ИИ-автоматизации, покрывающую
            весь цикл найма.
          </p>
          <ul className="flex max-w-[720px] flex-col gap-3">
            {SOLUTIONS.map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-3 text-[14px] leading-[1.65] text-text1"
              >
                <span className="mt-px flex size-6 shrink-0 items-center justify-center rounded-full bg-brand1-bg text-brand1">
                  <Check size={14} strokeWidth={2.5} />
                </span>
                <div>
                  <strong>{item.title}</strong> — {item.body}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ═══ BLOCK 5: RESULTS ═══ */}
      <section className="bg-white py-14">
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
            Рост с 3 300 до 8 500 сотрудников. Повысили удержание на 1-м, 3-м и
            12-м месяце.
          </p>
        </Container>
      </section>

      {/* ═══ BLOCK 6: QUOTE ═══ */}
      <section className="border-y border-grey2 bg-grey1 pb-14">
        <Container>
          <div className="relative my-14 rounded-r-card border-l-4 border-brand1 bg-white px-9 py-10 shadow-soft max-bp-sm:px-5 max-bp-sm:py-7">
            <div
              className="absolute left-7 top-4 font-black leading-none text-brand1-bg"
              style={{ fontFamily: "Georgia, serif", fontSize: "72px" }}
            >
              &ldquo;
            </div>
            <div className="relative z-[1] mb-5 pt-6 text-[16px] italic leading-[1.75] text-text1">
              Внедрение автоматизированной системы рекрутинга с ИИ кардинально
              изменило наш подход к найму. Мы сократили время закрытия вакансий
              на 65% и значительно повысили качество подбора. Кандидаты теперь
              проходят стандартизированную оценку, что позволяет нам принимать
              объективные решения. Особенно ценно, что система помогла нам
              масштабировать найм без пропорционального увеличения HR-команды.
            </div>
            <div className="text-[14px] font-bold text-text1">
              Александра Михайлова
            </div>
            <div className="mt-0.5 text-[13px] text-text2">
              HR-директор | 5 июля 2025
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
