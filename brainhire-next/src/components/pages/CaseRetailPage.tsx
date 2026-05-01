import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/interactive/Reveal";
import { X, Check } from "lucide-react";

export const caseRetailMeta = {
  title: "Розничная сеть: масштабный подбор персонала в регионах — BRaiN HR",
  description:
    "Кейс: как розничная сеть сократила время закрытия вакансий на 73% и выросла до 12 000 наймов в год с помощью ИИ-автоматизации BRaiN HR.",
  noindex: true,
};

const KEY_METRICS = [
  { num: "-73%", label: "время закрытия" },
  { num: "+85%", label: "охват" },
  { num: "в 11×", label: "эффективность" },
  { num: "12 000", label: "наймов/год" },
];

const PROBLEMS = [
  "300-400 вакансий ежемесячно по всей стране",
  "Нет централизованной системы для регионального найма",
  "Сезонные пики — резкий рост потребности перед праздниками",
  "Только 15% откликнувшихся доходили до оффера",
  "40% новых сотрудников увольнялись в первые 2 месяца",
  "Рекрутеры тратили 70% времени на ручной отбор резюме",
];

const SOLUTIONS: { strong: string; rest: string }[] = [
  {
    strong: "ИИ-сорсинг",
    rest: "— автоматический поиск с учётом региональной специфики",
  },
  {
    strong: "Массовая обработка откликов",
    rest: "— мгновенное ранжирование тысяч резюме",
  },
  {
    strong: "ИИ-рекрутинг",
    rest: "— автоматизация взаимодействия на всех этапах воронки",
  },
  {
    strong: "Региональная адаптация",
    rest: "— генерация вакансий с учётом местного рынка труда",
  },
  {
    strong: "Предиктивная аналитика",
    rest: "— прогнозирование успешности по данным прошлых наймов",
  },
  {
    strong: "Мессенджер-интеграция",
    rest: "— автоматическое общение через удобные каналы",
  },
];

const RESULTS = [
  { num: "-73%", label: "Сокращение времени закрытия" },
  { num: "+85%", label: "Охват кандидатов" },
  { num: "в 11 раз", label: "Рост эффективности" },
  { num: "12 000", label: "Наймов в год" },
];

export function CaseRetailPage() {
  return (
    <main>
      {/* ═══ 1. BREADCRUMBS + HERO ═══ */}
      <section className="bg-white pb-14 pt-8">
        <Container>
          <div className="pt-6 text-[13px] text-text2">
            <Link
              href="/"
              className="text-brand1 transition-colors hover:text-brand1-h"
            >
              Главная
            </Link>
            <span className="mx-1.5 text-grey2">›</span>
            <Link
              href="/case"
              className="text-brand1 transition-colors hover:text-brand1-h"
            >
              Кейсы
            </Link>
            <span className="mx-1.5 text-grey2">›</span>
            Ритейл
          </div>
          <div className="mt-6">
            <span
              className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-[5px] text-[12px] font-bold uppercase tracking-[0.8px]"
              style={{ background: "#faf5ff", color: "#9333ea" }}
            >
              Ритейл
            </span>
            <h1 className="mb-4 text-left text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.15] tracking-[-0.8px] text-text1">
              Розничная сеть: масштабный подбор персонала в регионах
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-[13px] text-text2 max-bp-sm:flex-col max-bp-sm:items-start max-bp-sm:gap-2">
              <span>5 мин чтения</span>
              <span className="h-3.5 w-px bg-grey2 max-bp-sm:hidden" />
              <span>Дмитрий Соколов, HR-эксперт</span>
              <span className="h-3.5 w-px bg-grey2 max-bp-sm:hidden" />
              <span>5 июля 2025</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ 2. KEY METRICS BAR ═══ */}
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

      {/* ═══ 3. CHALLENGE ═══ */}
      <section className="border-t border-grey2 bg-white py-14">
        <Container>
          <h2 className="mb-4 text-left text-[clamp(24px,3vw,32px)] font-extrabold text-text1">
            Проблема
          </h2>
          <p className="mb-6 max-w-[720px] text-[15px] leading-[1.72] text-text2">
            Агрессивное расширение сети тормозилось дефицитом кадров, что
            замедляло открытие новых магазинов.
          </p>
          <ul className="flex max-w-[720px] flex-col gap-3">
            {PROBLEMS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[14px] leading-[1.65] text-text1"
              >
                <span
                  className="mt-px inline-flex size-6 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "#FEE2E2", color: "#E5484D" }}
                >
                  <X size={14} strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ═══ 4. SOLUTION ═══ */}
      <section className="border-t border-grey2 bg-grey1 py-14">
        <Container>
          <h2 className="mb-4 text-left text-[clamp(24px,3vw,32px)] font-extrabold text-text1">
            Решение BRaiN HR
          </h2>
          <p className="mb-6 max-w-[720px] text-[15px] leading-[1.72] text-text2">
            Внедрена интеллектуальная система автоматизации, централизовавшая
            найм по всей сети.
          </p>
          <ul className="flex max-w-[720px] flex-col gap-3">
            {SOLUTIONS.map((item) => (
              <li
                key={item.strong}
                className="flex items-start gap-3 text-[14px] leading-[1.65] text-text1"
              >
                <span className="mt-px inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand1-bg text-brand1">
                  <Check size={14} strokeWidth={2.5} />
                </span>
                <div>
                  <strong>{item.strong}</strong> {item.rest}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ═══ 5. RESULTS ═══ */}
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
            Конверсия выросла с 2 100 до 12 000 успешных наймов в год.
          </p>
        </Container>
      </section>

      {/* ═══ 6. QUOTE ═══ */}
      <section className="border-y border-grey2 bg-grey1 pb-14">
        <Container>
          <div className="relative my-14 rounded-r-card border-l-4 border-brand1 bg-white px-9 py-10 shadow-soft max-bp-sm:px-5 max-bp-sm:py-7">
            <div
              className="absolute left-7 top-4 font-serif text-[72px] font-black leading-none text-brand1-bg"
              aria-hidden="true"
            >
              “
            </div>
            <div className="relative z-10 mb-5 pt-6 text-[16px] italic leading-[1.75] text-text1">
              Система ИИ-рекрутинга стала для нас настоящим прорывом. Мы смогли
              автоматизировать рутинные процессы и сфокусироваться на
              стратегических задачах. Особенно впечатлила функция
              интеллектуального сорсинга – система сама находит подходящих
              кандидатов и вовлекает их в диалог. Благодаря этому мы сократили
              время найма на 73% и существенно улучшили качество подбора. Теперь
              открытие новых магазинов не сдерживается дефицитом персонала.
            </div>
            <div className="text-[14px] font-bold text-text1">
              Дмитрий Соколов
            </div>
            <div className="mt-0.5 text-[13px] text-text2">
              Руководитель департамента HR | 5 июля 2025
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ 7. CTA ═══ */}
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
