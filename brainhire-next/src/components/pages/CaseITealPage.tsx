import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/interactive/Reveal";
import { X, Check } from "lucide-react";

export const caseITealMeta = {
  title: "iTeal: скрининг 600+ откликов и закрытие вакансии за 3 недели — BRaiN HR",
  description:
    "Кейс: как IT-компания iTeal автоматизировала скрининг 600+ резюме, провела 90 видео-интервью и сократила срок найма тимлида поддержки 1С с 6 до 3 недель с помощью BRaiN HR.",
  noindex: false,
};

const KEY_METRICS = [
  { num: "600+", label: "откликов обработано" },
  { num: "90", label: "видео-интервью" },
  { num: "−50%", label: "срок найма" },
  { num: "3–4×", label: "быстрее скрининг" },
];

const CHALLENGES = [
  "Вакансия тимлида поддержки 1С размещена в нескольких городах России",
  "Более 600 откликов за 2 недели — вручную не обработать без потерь",
  "Стандартный скрининг занял бы недели, с риском пропустить сильных кандидатов",
  "Нужна точечная оценка: технические навыки (1С), лидерские компетенции, soft skills",
  "Требовалось масштабирование без увеличения HR-команды",
];

const SOLUTIONS: { title: string; body: string }[] = [
  {
    title: "ИИ-скрининг резюме",
    body: "автоматический анализ опыта с 1С, лидерских компетенций и соответствия вакансии",
  },
  {
    title: "90 видео-интервью",
    body: "платформа провела первичные видео-интервью без участия HR-специалистов",
  },
  {
    title: "Оценка по ключевым параметрам",
    body: "техническая экспертиза, soft skills (коммуникация, клиентоориентированность), культурный фит",
  },
  {
    title: "Автоматическое приглашение",
    body: "релевантные кандидаты получали приглашения автоматически, без ручного труда",
  },
  {
    title: "Рейтинг и репорт",
    body: "итоговый рейтинг кандидатов с полным отчётом по каждому — в одном дашборде",
  },
  {
    title: "Прозрачный пайплайн",
    body: "рекрутеры видели всех кандидатов в одном месте и быстро переводили на следующий этап",
  },
];

const RESULTS = [
  { num: "−50%", label: "Срок закрытия вакансии" },
  { num: "3–4×", label: "Ускорение скрининга" },
  { num: "90", label: "Видео-интервью проведено" },
  { num: "600+", label: "Откликов обработано" },
];

export function CaseITealPage() {
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
            <span>iTeal</span>
          </div>

          <div className="mt-8 grid grid-cols-[1fr_auto] items-start gap-8 max-bp-md:grid-cols-1">
            <div>
              <span className="mb-4 inline-block rounded-full bg-brand1 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.5px] text-white">
                IT
              </span>
              <h1 className="mb-5 text-[clamp(30px,4vw,46px)] font-extrabold leading-[1.1] tracking-[-1px] text-text1">
                iTeal: скрининг 600+ откликов и закрытие вакансии за 3 недели
              </h1>
              <p className="max-w-[680px] text-[17px] leading-[1.7] text-text2">
                IT-компания iTeal автоматизирует бизнесы на 1С. При найме тимлида поддержки платформа BRaiN HR обработала более 600 откликов, провела 90 видео-интервью и сократила срок найма вдвое — с 6 до 3 недель.
              </p>
            </div>

            <div className="rounded-card border border-grey2 bg-grey1 px-7 py-6 text-center max-bp-md:hidden">
              <div className="mb-1 text-[13px] font-semibold text-text2">Компания</div>
              <div className="mb-4 text-[17px] font-extrabold text-text1">iTeal</div>
              <div className="mb-1 text-[13px] font-semibold text-text2">Сайт</div>
              <a
                href="https://iteal.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 block text-[14px] text-brand1 hover:underline"
              >
                iteal.ru
              </a>
              <div className="mb-1 text-[13px] font-semibold text-text2">Отрасль</div>
              <div className="text-[14px] text-text1">IT / автоматизация на 1С</div>
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
                  В нашей компании регулярно возникают задачи точечного подбора на сложные позиции, где объём откликов огромен, а нужно выбрать кандидатов максимально прицельно, без потери качества. Платформа автоматически проанализировала резюме, провела 90 первичных видео-интервью. Нет нужды тратить часы на просмотр всех откликов — платформа проводит скрининг, автоматически приглашает релевантных кандидатов и формирует рейтинг с полным репортом. BRaiN HR делает процесс найма прозрачным, ускоряет отбор в 3–4 раза и помогает точечно находить кандидатов, которые усиливают нашу команду долгосрочно.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand1 text-[15px] font-extrabold text-white">
                    П
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-text1">Павел Ступко</div>
                    <div className="text-[13px] text-text2">CEO, iTeal</div>
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
              <Link
                href="/case"
                className="text-[13px] text-brand1 hover:underline"
              >
                ← Все кейсы
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
