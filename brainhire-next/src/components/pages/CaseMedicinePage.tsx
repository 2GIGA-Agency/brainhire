import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/interactive/Reveal";
import { Check, X } from "lucide-react";

export const caseMedicineMeta = {
  title:
    "Сеть клиник: оптимизация найма медицинского персонала — BRaiN HR",
  description:
    "Кейс: как сеть клиник сократила время найма на 69% и выросла с 1 100 до 2 400 специалистов с помощью ИИ-автоматизации BRaiN HR.",
  noindex: true,
};

const METRICS = [
  { num: "-69%", label: "время найма" },
  { num: "+83%", label: "охват" },
  { num: "в 6×", label: "рост" },
  { num: "2 400", label: "специалистов" },
];

const PROBLEMS = [
  "Нехватка узких специалистов — эндокринологов, кардиологов, неврологов",
  "Процесс найма 3-4 месяца от публикации до выхода",
  "Сложная верификация дипломов, сертификатов и опыта",
  "Высокая конкуренция с государственными и частными клиниками",
  "Географическая разрозненность клиник в разных регионах",
  "30% медсестёр и администраторов увольнялись в первые полгода",
  "5 рекрутеров перегружены",
];

const SOLUTIONS: { title: string; body: string }[] = [
  {
    title: "ИИ-рекрутинг для медицины",
    body: "учёт медицинской терминологии и требований",
  },
  {
    title: "ИИ-сорсинг врачей",
    body: "поиск на профильных медицинских платформах и в сообществах",
  },
  {
    title: "Автоматическая верификация",
    body: "проверка дипломов, сертификатов и специализаций",
  },
  {
    title: "Тестирование компетенций",
    body: "клиническое мышление и навыки коммуникации",
  },
  {
    title: "Предквалификация",
    body: "чат-боты проверяют базовые требования",
  },
  {
    title: "Интеллектуальное матчирование",
    body: "подбор по совместимости с командой клиники",
  },
];

const RESULTS = [
  { num: "-69%", label: "Сокращение времени найма" },
  { num: "+83%", label: "Охват специалистов" },
  { num: "в 6 раз", label: "Рост персонала" },
  { num: "2 400", label: "Специалистов" },
];

export function CaseMedicinePage() {
  return (
    <main>
      {/* ═══ BLOCK 1: BREADCRUMBS + HERO ═══ */}
      <section className="bg-white pb-14 pt-8 max-bp-lg:pb-10 max-bp-lg:pt-6">
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
            Медицина
          </div>

          <div className="mt-6">
            <span
              className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-[5px] text-[12px] font-bold uppercase tracking-[0.8px]"
              style={{ background: "#f0fdf4", color: "#16a34a" }}
            >
              Медицина
            </span>
            <h1 className="mb-4 text-left text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.15] tracking-[-0.8px] text-text1">
              Сеть клиник: оптимизация найма медицинского персонала
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-[13px] text-text2 max-bp-sm:flex-col max-bp-sm:items-start max-bp-sm:gap-2">
              <span>5 мин чтения</span>
              <span className="h-3.5 w-px bg-grey2 max-bp-sm:hidden" />
              <span>Анна Козлова, HR-эксперт</span>
              <span className="h-3.5 w-px bg-grey2 max-bp-sm:hidden" />
              <span>18 июня 2025</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ BLOCK 2: KEY METRICS BAR ═══ */}
      <section className="border-y border-grey2 bg-grey1 pb-14">
        <Container>
          <div className="rounded-card bg-grey1 p-8 max-bp-sm:p-6">
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
      <section className="border-t border-grey2 bg-white py-14">
        <Container>
          <h2 className="mb-4 text-left text-[clamp(24px,3vw,32px)] font-extrabold text-text1">
            Проблема
          </h2>
          <p className="mb-6 max-w-[720px] text-[15px] leading-[1.72] text-text2">
            Острый дефицит медицинского персонала приводил к перегрузке
            специалистов и снижению качества обслуживания.
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

      {/* ═══ BLOCK 4: SOLUTION ═══ */}
      <section className="border-t border-grey2 bg-grey1 py-14">
        <Container>
          <h2 className="mb-4 text-left text-[clamp(24px,3vw,32px)] font-extrabold text-text1">
            Решение BRaiN HR
          </h2>
          <p className="mb-6 max-w-[720px] text-[15px] leading-[1.72] text-text2">
            Сеть клиник внедрила ИИ-систему, адаптированную под специфику
            медицинской отрасли.
          </p>
          <ul className="flex max-w-[720px] flex-col gap-3">
            {SOLUTIONS.map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-3 text-[14px] leading-[1.65] text-text1"
              >
                <span className="mt-px inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand1-bg text-brand1">
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
            Численность выросла с 1 100 до 2 400 специалистов. Текучесть
            значительно снизилась.
          </p>
        </Container>
      </section>

      {/* ═══ BLOCK 6: QUOTE ═══ */}
      <section className="border-y border-grey2 bg-grey1 pb-14">
        <Container>
          <div className="relative my-14 rounded-r-card border-l-4 border-brand1 bg-white px-9 py-10 shadow-soft max-bp-sm:px-5 max-bp-sm:py-7">
            <div
              className="absolute left-7 top-4 font-serif text-[72px] font-black leading-none text-brand1-bg"
              aria-hidden="true"
            >
              &ldquo;
            </div>
            <div className="relative z-[1] mb-5 pt-6 text-[16px] italic leading-[1.75] text-text1">
              Внедрение ИИ-системы рекрутинга стало для нас спасением в условиях
              острого дефицита медицинских кадров. Мы смогли не только ускорить
              процесс найма на 69%, но и значительно расширить воронку
              кандидатов за счет интеллектуального сорсинга. Система находит
              специалистов, о которых мы даже не знали, и оценивает их
              квалификацию еще до первого контакта с рекрутером. Особенно важно,
              что мы смогли снизить текучесть – система помогает подбирать
              специалистов, которые действительно подходят нашей корпоративной
              культуре и остаются с нами надолго.
            </div>
            <div className="text-[14px] font-bold text-text1">Анна Козлова</div>
            <div className="mt-0.5 text-[13px] text-text2">
              Руководитель HR-департамента | 18 июня 2025
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
              <Button
                href="https://brainhire.ru/signup"
                variant="hero-primary"
                external
              >
                Попробовать бесплатно
              </Button>
              <Button
                href="https://brainhire.ru/contacts"
                variant="hero-outline"
                external
              >
                Связаться с нами
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
