import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionTag } from "@/components/ui/SectionTag";
import { RoiCalculator } from "@/components/interactive/RoiCalculator";
import { ChevronDown, ArrowRight, Plus } from "lucide-react";

/**
 * Калькулятор выгоды — кастомная страница 1:1 с pages/calculator.html.
 * Сам виджет калькулятора реализован в RoiCalculator (client component).
 */
export function CalculatorPage() {
  return (
    <main>
      {/* HERO */}
      <section className="bg-white pt-[88px] pb-12 max-bp-lg:pt-16 max-bp-lg:pb-10">
        <Container>
          <SectionTag>Калькулятор выгоды</SectionTag>
          <h1 className="mt-4 max-w-[720px] text-[clamp(36px,5vw,52px)] font-black leading-[1.1] tracking-[-1.2px] text-text1">
            Рассчитайте экономию от внедрения <em className="not-italic text-brand1">BRaiN HR</em>
          </h1>
          <p className="mt-4 max-w-[600px] text-[17px] leading-[1.7] text-text2">
            Введите параметры вашей компании — калькулятор покажет, сколько вы сэкономите на каждой
            вакансии и за год.
          </p>
        </Container>
      </section>

      {/* КАЛЬКУЛЯТОР */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <div className="mx-auto max-w-[960px]">
            <RoiCalculator />
            <p className="mx-auto mt-4 max-w-[860px] text-center text-[11px] leading-[1.5] text-text2">
              В таблице приведены ориентировочные данные для расчёта затрат на поиск по одной вакансии. Стоимость открытой вакансии основана на HR-исследованиях.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 max-bp-lg:py-14">
        <Container>
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
              Готовы сократить расходы на найм?
            </h2>
            <p className="mt-4 text-[15px] leading-[1.72] text-text2">
              Начните с бесплатной обработки 100 кандидатов
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="https://brainhire.ru/signup" variant="hero-primary" external>
                Попробовать бесплатно
                <ArrowRight size={16} strokeWidth={1.8} />
              </Button>
              <Button href="/contacts" variant="hero-outline">
                Хочу демонстрацию
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <div className="grid grid-cols-[1fr_1.5fr] items-start gap-16 max-bp-lg:grid-cols-1 max-bp-lg:gap-8">
            <div>
              <SectionTag>Частые вопросы</SectionTag>
              <h2 className="mt-3 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
                Ответы на <em className="not-italic text-brand1">важные вопросы</em>
              </h2>
              <p className="mt-3 text-[15px] leading-[1.72] text-text2">
                Не нашли ответ? Напишите нам — ответим в течение часа.
              </p>
            </div>
            <div className="flex flex-col">
              <FaqItem
                q="Как формируется стоимость BRaiN HR?"
                a="Стоимость зависит от выбранного тарифа и объёма использования. Вы платите только за обработанных кандидатов — создание вакансий, скрининг резюме и базовая аналитика входят бесплатно во все тарифы."
                first
              />
              <FaqItem
                q="Что входит в бесплатный период?"
                a="Вы получаете полный доступ к платформе для обработки первых 100 кандидатов: ИИ-создание вакансий, скрининг резюме, видеоинтервью, анализ и обратная связь. Этого достаточно, чтобы оценить эффективность на реальных вакансиях."
              />
              <FaqItem
                q="Как рассчитывается экономия?"
                a="Калькулятор учитывает затраты рабочего времени рекрутера и руководителя, а также стоимость простоя вакансии. BRaiN HR сокращает срок закрытия вакансии с 25 до 7 дней и автоматизирует 90% рутинных операций, что и формирует экономию."
              />
              <FaqItem
                q="Можно ли подключить только отдельные функции?"
                a="Да, тарифы гибкие. Вы можете начать с текстовых диалогов или видеоинтервью, а затем масштабировать использование. Мы подберём оптимальную конфигурацию под ваши задачи."
              />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

type FaqItemProps = {
  q: string;
  a: string;
  first?: boolean;
};

function FaqItem({ q, a, first }: FaqItemProps) {
  return (
    <details
      className={
        "group border-b border-dashed border-grey2" +
        (first ? " border-t" : "")
      }
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15px] font-bold text-text1 transition-colors hover:text-brand1 [&::-webkit-details-marker]:hidden">
        <span>{q}</span>
        <Plus
          className="size-5 shrink-0 text-text2 transition-transform duration-300 group-open:rotate-45 group-open:text-brand1"
          strokeWidth={1.8}
        />
      </summary>
      <div className="pb-5 text-[14px] leading-[1.7] text-text2">{a}</div>
    </details>
  );
}
