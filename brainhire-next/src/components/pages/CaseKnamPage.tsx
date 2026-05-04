import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/interactive/Reveal";
import { X, Check } from "lucide-react";

export const caseKnamMeta = {
  title: "KNAM: автономный конвейер массового найма операторов call-центра — BRaiN HR",
  description:
    "Кейс: как CDP-платформа KNAM превратила найм операторов call-центра в полностью автономный конвейер с BRaiN HR — от фильтрации откликов до мгновенной передачи лучших кандидатов нанимающему менеджеру.",
  noindex: false,
};

const KEY_METRICS = [
  { num: "×10", label: "скорость обработки потока" },
  { num: "минуты", label: "до первого контакта" },
  { num: "0%", label: "ручное участие рекрутера" },
  { num: "100%", label: "объективность оценки" },
];

const CHALLENGES = [
  "Постоянная массовая вакансия «Оператор call-центра» с высоким потоком откликов",
  "Критически важна скорость обработки — кандидаты уходят к конкурентам",
  "Субъективность ручной оценки: «понравился / не понравился»",
  "Кандидаты часами ждали звонка или письма от HR",
  "Рекрутер перегружен рутинной обработкой нерелевантных откликов",
];

const SOLUTIONS: { title: string; body: string }[] = [
  {
    title: "Мгновенная фильтрация",
    body: "бот мгновенно фильтрует отклики и инициирует общение с релевантными кандидатами",
  },
  {
    title: "Автоматическое чат-интервью",
    body: "бот проводит структурированное интервью и сам принимает решение о соответствии критериям",
  },
  {
    title: "Стандартизированный входной барьер",
    body: "все соискатели оцениваются по единым объективным критериям — человеческий фактор исключён",
  },
  {
    title: "Мгновенная передача лучших",
    body: "кандидаты, прошедшие отбор, немедленно получают контакты нанимающего руководителя",
  },
  {
    title: "Нулевое участие HR",
    body: "руководитель видит только предварительно отобранных кандидатов без участия рекрутера",
  },
  {
    title: "Автономный пайплайн",
    body: "весь процесс от отклика до передачи лучших работает без ручного вмешательства",
  },
];

const RESULTS = [
  { num: "×10", label: "Рост скорости обработки" },
  { num: "минуты", label: "Время до первого контакта" },
  { num: "0%", label: "Участие рекрутера" },
  { num: "100%", label: "Объективность оценки" },
];

export function CaseKnamPage() {
  return (
    <main>
      {/* ═══ BLOCK 1: BREADCRUMBS + HERO ═══ */}
      <section className="bg-white pt-8 pb-14">
        <Container>
          <div className="pt-6 text-[13px] text-text2">
            <Link href="/" className="text-brand1 transition-colors hover:text-brand1-h">
              Главная
            </Link>
            <span className="mx-1.5 text-grey2">&rsaquo;</span>
            <Link href="/case" className="text-brand1 transition-colors hover:text-brand1-h">
              Кейсы
            </Link>
            <span className="mx-1.5 text-grey2">&rsaquo;</span>
            <span>KNAM</span>
          </div>

          <div className="mt-8 grid grid-cols-[1fr_auto] items-start gap-8 max-bp-md:grid-cols-1">
            <div>
              <span className="mb-4 inline-block rounded-full bg-brand1 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.5px] text-white">
                IT
              </span>
              <h1 className="mb-5 text-[clamp(30px,4vw,46px)] font-extrabold leading-[1.1] tracking-[-1px] text-text1">
                KNAM: автономный конвейер массового найма операторов call-центра
              </h1>
              <p className="max-w-[680px] text-[17px] leading-[1.7] text-text2">
                CDP-платформа KNAM использует ИИ и Big Data для лидогенерации. С BRaiN HR компания превратила найм операторов call-центра в полностью автономный процесс: от отклика до мгновенной передачи лучших кандидатов нанимающему руководителю — без участия рекрутера.
              </p>
            </div>

            <div className="rounded-card border border-grey2 bg-grey1 px-7 py-6 text-center max-bp-md:hidden">
              <div className="mb-1 text-[13px] font-semibold text-text2">Компания</div>
              <div className="mb-4 text-[17px] font-extrabold text-text1">KNAM</div>
              <div className="mb-1 text-[13px] font-semibold text-text2">Сайт</div>
              <a
                href="https://knam.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 block text-[14px] text-brand1 hover:underline"
              >
                knam.pro
              </a>
              <div className="mb-1 text-[13px] font-semibold text-text2">Отрасль</div>
              <div className="text-[14px] text-text1">CDP / ИИ и Big Data</div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-4 gap-4 max-bp-md:grid-cols-2 max-bp-xs:grid-cols-1">
            {KEY_METRICS.map((m) => (
              <div
                key={m.label}
                className="rounded-card border border-grey2 bg-grey1 px-4 py-6 text-center"
              >
                <div className="mb-1.5 text-[32px] font-black leading-[1.1] text-brand1">
                  {m.num}
                </div>
                <div className="text-[13px] font-medium text-text2">{m.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ BLOCK 2: SITUATION ═══ */}
      <section className="bg-grey1 py-16 max-bp-lg:py-12">
        <Container>
          <div className="grid grid-cols-2 gap-10 max-bp-md:grid-cols-1">
            <Reveal delay={1}>
              <div>
                <div className="mb-4 inline-block rounded-full border border-grey2 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.8px] text-text2">
                  Проблема
                </div>
                <h2 className="mb-5 text-[22px] font-extrabold leading-[1.3] text-text1">
                  С чем столкнулась компания
                </h2>
                <ul className="flex flex-col gap-3">
                  {CHALLENGES.map((ch) => (
                    <li key={ch} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#fee2e2]">
                        <X size={11} strokeWidth={2.5} className="text-[#dc2626]" />
                      </span>
                      <span className="text-[14px] leading-[1.6] text-text1">{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div>
                <div className="mb-4 inline-block rounded-full border border-grey2 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.8px] text-text2">
                  Решение
                </div>
                <h2 className="mb-5 text-[22px] font-extrabold leading-[1.3] text-text1">
                  Что внедрили с BRaiN HR
                </h2>
                <ul className="flex flex-col gap-3">
                  {SOLUTIONS.map((s) => (
                    <li key={s.title} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#dcfce7]">
                        <Check size={11} strokeWidth={2.5} className="text-[#16a34a]" />
                      </span>
                      <span className="text-[14px] leading-[1.6] text-text1">
                        <strong>{s.title}</strong> — {s.body}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ═══ BLOCK 3: RESULTS ═══ */}
      <section className="bg-white py-16 max-bp-lg:py-12">
        <Container>
          <h2 className="mb-10 text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Результаты внедрения
          </h2>

          <div className="grid grid-cols-4 gap-5 max-bp-md:grid-cols-2 max-bp-xs:grid-cols-1">
            {RESULTS.map((r, i) => (
              <Reveal key={r.label} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div className="h-full rounded-card border border-grey2 bg-grey1 px-5 py-7 text-center shadow-soft">
                  <div className="mb-2 text-[36px] font-black leading-[1.1] text-brand1">
                    {r.num}
                  </div>
                  <div className="text-[13px] leading-[1.5] text-text2">{r.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ BLOCK 4: QUOTE ═══ */}
      <section className="bg-grey1 py-16 max-bp-lg:py-12">
        <Container>
          <Reveal delay={1}>
            <div className="mx-auto max-w-[800px]">
              <blockquote className="rounded-card border border-grey2 bg-white px-10 py-10 shadow-soft max-bp-md:px-6 max-bp-md:py-7">
                <div className="mb-2 text-[40px] leading-[1] text-brand1 opacity-30">&ldquo;</div>
                <p className="mb-6 text-[17px] italic leading-[1.75] text-text1">
                  BRaiN-бот полностью снял проблему скорости обработки потока: он мгновенно фильтрует отклики и инициирует общение с релевантными кандидатами. Ключевое преимущество — встроенная оценка по итогам чат-интервью. Бот не просто собирает ответы, а сам принимает решение, подходит ли кандидат. Это исключило человеческий фактор и стандартизировало входной барьер. Самый ценный эффект — успешные кандидаты мгновенно получают контакты нанимающего руководителя, не ожидая звонка от HR. BRaiN-бот превратил найм операторов call-центра в автономный конвейер.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand1 text-[15px] font-extrabold text-white">
                    Д
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-text1">Дарья Гербутова</div>
                    <div className="text-[13px] text-text2">Помощник руководителя, KNAM</div>
                  </div>
                </div>
              </blockquote>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ═══ BLOCK 5: CTA ═══ */}
      <section className="bg-white py-16 max-bp-lg:py-12">
        <Container>
          <div className="mx-auto max-w-[620px] text-center">
            <h2 className="mb-4 text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
              Нужен такой же результат?
            </h2>
            <p className="mb-8 text-[15px] leading-[1.72] text-text2">
              Начните бесплатный пилот — первые 100 кандидатов без оплаты
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-bp-xs:flex-col max-bp-xs:items-center">
              <Button href="https://brainhire.ru/signup" variant="hero-primary" external>
                100 кандидатов бесплатно
              </Button>
              <Button href="https://brainhire.ru/demo" variant="hero-outline" external>
                Получить демо
              </Button>
            </div>
            <div className="mt-8">
              <Link href="/case" className="text-[13px] text-brand1 hover:underline">
                ← Все кейсы
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
