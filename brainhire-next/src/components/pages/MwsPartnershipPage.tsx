import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/interactive/LeadForm";
import { Reveal } from "@/components/interactive/Reveal";
import {
  Shield,
  CheckCircle2,
  MonitorSmartphone,
  Box,
  CircleDollarSign,
  TrendingUp,
  Users,
  Server,
  Target,
  Clock,
  ArrowRight,
} from "lucide-react";

const MWS_FACTS = [
  { num: "20 лет", desc: "на рынке облачных технологий" },
  { num: "5 000+", desc: "корпоративных клиентов" },
  { num: "63,8 млрд", desc: "руб. выручка 2025 (+53% г/г)" },
  { num: "16 ЦОД", desc: "в 7 регионах России" },
  { num: "280 000+ км", desc: "каналов связи МТС" },
  { num: "99,95%", desc: "SLA (факт 99,99%)" },
];

const VALUE_CARDS = [
  {
    Icon: Shield,
    title: "Данные кандидатов под защитой",
    body:
      "Персональные данные хранятся в аттестованных ЦОД MWS (152-ФЗ, УЗ-1). Это снимает compliance-риски — критично для банков, госструктур и крупного бизнеса.",
  },
  {
    Icon: CircleDollarSign,
    title: "Никаких санкционных рисков",
    body:
      "Оплата AI-сервисов в рублях через российское юрлицо МТС. Нет зависимости от зарубежных облачных провайдеров — работаете стабильно в любой ситуации.",
  },
  {
    Icon: TrendingUp,
    title: "Масштабирование без потолка",
    body:
      "Открыли 50 вакансий или 500 — инфраструктура MWS масштабируется автоматически. 15 зон доступности, GPU-кластеры, рост мощностей x1,6 за год.",
  },
  {
    Icon: Users,
    title: "Доверие корпоративных клиентов",
    body:
      "Партнёрство с МТС — бренд №1 в российском телекоме — повышает доверие к решению. Более 5 000 enterprise-клиентов уже работают на инфраструктуре MWS.",
  },
];

const MWS_FEATURES = [
  {
    Icon: Box,
    title: "MWS GPT и LLM-модели",
    body:
      "Доступ к российским и международным языковым моделям через единый API. Гибкий выбор модели под конкретную HR-задачу — скрининг, интервью или аналитику.",
  },
  {
    Icon: CircleDollarSign,
    title: "Оплата в рублях",
    body:
      "Централизованная оплата всех AI-сервисов через контур MWS. Без сложностей с зарубежными платежами и санкционных рисков. Российское юрлицо, НДС.",
  },
  {
    Icon: Server,
    title: "16 дата-центров, SLA 99,95%",
    body:
      "Отказоустойчивая инфраструктура в 7 регионах России. 280 000+ км каналов связи МТС. Фактическая доступность — 99,99%.",
  },
  {
    Icon: Shield,
    title: "152-ФЗ, PCI DSS, ISO 27001",
    body:
      "Данные кандидатов хранятся на территории РФ. Аттестация УЗ-1 для персональных данных. ГОСТ Р 57580 для финансовых организаций. Tier III надёжность ЦОД.",
  },
];

const CTA_POINTS = [
  {
    Icon: CheckCircle2,
    title: "Бесплатный пилот",
    body: "Обработка до 100 кандидатов без оплаты. Оцените результат до покупки.",
  },
  {
    Icon: Users,
    title: "Персональный менеджер",
    body: "Поможет настроить платформу и обучит вашу команду.",
  },
  {
    Icon: Clock,
    title: "Подключение за 1 день",
    body: "SaaS-модель без нагрузки на IT-отдел. Начните нанимать сразу.",
  },
];

export function MwsPartnershipPage() {
  return (
    <main>
      {/* ═══ 1. HERO — Партнёрский заголовок ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14">
        <Container className="grid grid-cols-[1fr_440px] items-center gap-[72px] max-bp-xl:grid-cols-1 max-bp-xl:gap-12">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand1/30 bg-brand1-bg py-[5px] pl-2.5 pr-3.5 text-[12px] font-semibold tracking-[0.3px] text-brand1">
              <span className="size-1.5 rounded-full bg-brand1 animate-pulse-dot" />
              Стратегическое партнёрство
            </span>
            <h1 className="text-[clamp(36px,4vw,52px)] font-extrabold leading-[1.1] tracking-[-1.2px] text-text1">
              ИИ-рекрутинг на&nbsp;инфраструктуре{" "}
              <em className="not-italic text-brand1">MWS</em>
            </h1>
            <p className="mt-5 max-w-[540px] text-[17px] leading-[1.7] text-text2">
              BRaiN HR + МТС Web Services — готовое AI-решение для автоматизации найма на enterprise-облаке №1 в&nbsp;России
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="https://mws.ru/" variant="hero-primary" external>
                Перейти на сайт MWS
                <ArrowRight size={16} strokeWidth={1.8} />
              </Button>
            </div>
          </div>

          {/* Партнёрские лого */}
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-6 max-bp-lg:flex-col max-bp-lg:gap-4">
              <div className="flex items-center justify-center rounded-card border-[1.5px] border-grey2 bg-white px-9 py-7 shadow-soft transition-all hover:border-brand1 hover:shadow-md">
                <img
                  src="https://brainhire.ru/icons/Logo.svg"
                  alt="BRaiN HR"
                  className="h-8"
                />
              </div>
              <div className="text-[28px] font-extrabold leading-none text-grey2 max-bp-lg:rotate-90">
                ×
              </div>
              <div className="flex items-center justify-center rounded-card border-[1.5px] border-grey2 bg-white px-9 py-7 shadow-soft transition-all hover:border-brand1 hover:shadow-md">
                <div className="flex items-center gap-3.5">
                  <div
                    className="grid size-14 grid-cols-2 grid-rows-2 gap-px rounded-md p-1.5"
                    style={{ backgroundColor: "#E30611" }}
                  >
                    <span className="flex items-center justify-center text-[14px] font-black text-white">
                      M
                    </span>
                    <span className="flex items-center justify-center text-[14px] font-black text-white">
                      W
                    </span>
                    <span className="col-span-2 flex items-center justify-center text-[14px] font-black text-white">
                      S
                    </span>
                  </div>
                  <div>
                    <div className="text-[22px] font-extrabold tracking-[-0.5px] text-text1">
                      MWS
                    </div>
                    <div className="mt-0.5 text-[11px] font-medium text-text2">
                      МТС Web Services
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Бейджи */}
            <div className="flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-grey2 bg-grey1 px-3.5 py-1.5 text-[12px] font-semibold text-text2">
                <Shield size={14} strokeWidth={2} className="text-brand1" />
                Enterprise-безопасность
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-grey2 bg-grey1 px-3.5 py-1.5 text-[12px] font-semibold text-text2">
                <CheckCircle2 size={14} strokeWidth={2} className="text-brand1" />
                №1 IaaS 2025
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-grey2 bg-grey1 px-3.5 py-1.5 text-[12px] font-semibold text-text2">
                <MonitorSmartphone size={14} strokeWidth={2} className="text-brand1" />
                16 дата-центров
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ 2. ЧТО ТАКОЕ MWS ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <span className="inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
            О ПАРТНЁРЕ
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            MWS — бигтех-компания{" "}
            <em className="not-italic text-brand1">группы МТС</em>
          </h2>
          <p className="mt-3 max-w-[540px] text-[15px] leading-[1.72] text-text2">
            MWS (МТС Web Services) — это единая бигтех-платформа, объединяющая МТС Digital, МТС Cloud, Big Data МТС, MTS AI и Visionlabs. Компания предоставляет облачные сервисы, AI-инфраструктуру и платформенные решения для бизнеса любого масштаба.
          </p>

          {/* Метрики MWS */}
          <div className="mt-12 rounded-card border-[1.5px] border-grey2 bg-white px-8 py-7 shadow-md max-bp-sm:px-5">
            <div className="mb-5 border-b border-grey2 pb-3 text-[14px] font-bold uppercase tracking-[0.5px] text-text1">
              MWS в цифрах
            </div>
            <div className="grid grid-cols-3 gap-5 max-bp-md:grid-cols-2 max-bp-sm:grid-cols-1">
              {MWS_FACTS.map((fact, i) => (
                <Reveal key={fact.num} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div className="h-full">
                    <div className="text-[20px] font-extrabold leading-[1.2] tracking-[-0.5px] text-brand1">
                      {fact.num}
                    </div>
                    <div className="mt-0.5 text-[12px] leading-[1.4] text-text2">
                      {fact.desc}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ 3. АРХИТЕКТУРА РЕШЕНИЯ — ПИРАМИДА 3 СЛОЯ ═══ */}
      <section id="architecture" className="bg-white py-20 max-bp-lg:py-14">
        <Container>
          <span className="inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
            АРХИТЕКТУРА РЕШЕНИЯ
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Готовый продукт на базе{" "}
            <em className="not-italic text-brand1">мощной инфраструктуры</em>
          </h2>
          <p className="mt-3 max-w-[540px] text-[15px] leading-[1.72] text-text2">
            MWS обеспечивает доступ к LLM-моделям и вычислительные мощности. BRaiN HR — прикладную логику автоматизации HR.
          </p>

          <div className="mt-12 flex flex-col items-center">
            {/* Слой 1: Результат — узкий верх */}
            <div
              className="w-[55%] rounded-t-card border-[1.5px] border-b-0 px-10 py-8 text-center transition-transform hover:-translate-y-[3px] max-bp-lg:w-[70%] max-bp-sm:w-[80%] max-bp-sm:px-5 max-bp-sm:py-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(18,83,109,0.06), rgba(18,83,109,0.12))",
                borderColor: "rgba(18,83,109,0.2)",
              }}
            >
              <div
                className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full border-[1.5px]"
                style={{
                  background: "rgba(18,83,109,0.1)",
                  borderColor: "rgba(18,83,109,0.2)",
                }}
              >
                <Target size={22} strokeWidth={1.8} className="text-brand3" />
              </div>
              <span
                className="mb-1.5 inline-flex rounded-full px-2.5 py-[3px] text-[10px] font-bold uppercase tracking-[1px] text-brand3"
                style={{ background: "rgba(18,83,109,0.1)" }}
              >
                Результат для клиента
              </span>
              <div className="mb-2.5 text-[16px] font-bold text-text1">
                Ускорение найма, снижение костов
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-bp-sm:gap-1.5">
                {[
                  "Найм в 3-5 раз быстрее",
                  "Снижение стоимости закрытия вакансии",
                  "Экономия 85% времени HR",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-grey2 bg-white/70 px-3 py-1 text-[12px] font-medium text-text2 max-bp-sm:px-2.5 max-bp-sm:text-[11px]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Слой 2: Платформа BRaiN HR — средний */}
            <div
              className="w-[77%] border-[1.5px] border-b-0 px-10 py-8 text-center transition-transform hover:-translate-y-[3px] max-bp-lg:w-[85%] max-bp-sm:w-[90%] max-bp-sm:px-5 max-bp-sm:py-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(64,150,255,0.06), rgba(64,150,255,0.12))",
                borderColor: "rgba(64,150,255,0.25)",
              }}
            >
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full border-[1.5px] border-brand1/25 bg-brand1-bg">
                <Target size={22} strokeWidth={1.8} className="text-brand1" />
              </div>
              <span className="mb-1.5 inline-flex rounded-full bg-brand1-bg px-2.5 py-[3px] text-[10px] font-bold uppercase tracking-[1px] text-brand1">
                Платформа BRaiN HR
              </span>
              <div className="mb-2.5 text-[16px] font-bold text-text1">
                Прикладной HR-слой
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-bp-sm:gap-1.5">
                {[
                  "ИИ-анализ резюме",
                  "Автоматизация коммуникаций",
                  "ИИ-видеоинтервью",
                  "Рейтинг кандидатов",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-grey2 bg-white/70 px-3 py-1 text-[12px] font-medium text-text2 max-bp-sm:px-2.5 max-bp-sm:text-[11px]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Слой 3: Инфраструктура MWS — широкое основание */}
            <div
              className="w-full rounded-b-card border-[1.5px] px-10 py-8 text-center transition-transform hover:-translate-y-[3px] max-bp-sm:px-5 max-bp-sm:py-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(227,6,17,0.04), rgba(227,6,17,0.1))",
                borderColor: "rgba(227,6,17,0.2)",
              }}
            >
              <div
                className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full border-[1.5px]"
                style={{ background: "#FDECEA", borderColor: "rgba(227,6,17,0.2)" }}
              >
                <Server size={22} strokeWidth={1.8} style={{ color: "#E30611" }} />
              </div>
              <span
                className="mb-1.5 inline-flex rounded-full px-2.5 py-[3px] text-[10px] font-bold uppercase tracking-[1px]"
                style={{ background: "#FDECEA", color: "#E30611" }}
              >
                Инфраструктура MWS
              </span>
              <div className="mb-2.5 text-[16px] font-bold text-text1">
                Enterprise-облако МТС
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-bp-sm:gap-1.5">
                {[
                  "MWS GPT",
                  "API к LLM-моделям",
                  "GPU-вычисления",
                  "16 ЦОД",
                  "152-ФЗ (УЗ-1)",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-grey2 bg-white/70 px-3 py-1 text-[12px] font-medium text-text2 max-bp-sm:px-2.5 max-bp-sm:text-[11px]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ 4. ЦЕННОСТЬ ДЛЯ БИЗНЕСА ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <span className="inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
            ЦЕННОСТЬ ДЛЯ БИЗНЕСА
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Почему это важно для{" "}
            <em className="not-italic text-brand1">вашего найма</em>
          </h2>
          <p className="mt-3 max-w-[540px] text-[15px] leading-[1.72] text-text2">
            Что конкретно даёт инфраструктура MWS вашей HR-команде и бизнесу.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 max-bp-md:grid-cols-1">
            {VALUE_CARDS.map(({ Icon: ItemIcon, title, body }, i) => (
              <Reveal key={title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <article
                  className="h-full rounded-card border border-grey2 bg-white p-7 shadow-soft transition-all hover:border-brand1 hover:shadow-md"
                >
                  <span className="mb-3 inline-flex text-brand1">
                    <ItemIcon size={28} strokeWidth={1.8} />
                  </span>
                  <h3 className="mb-2 text-[16px] font-bold text-text1">{title}</h3>
                  <p className="text-[14px] leading-[1.65] text-text2">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 5. ЧТО ДАЁТ MWS ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14">
        <Container>
          <span className="inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
            ИНФРАСТРУКТУРА MWS
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Enterprise-облако{" "}
            <em className="not-italic text-brand1">№1 в России</em>
          </h2>
          <p className="mt-3 max-w-[540px] text-[15px] leading-[1.72] text-text2">
            MWS — бигтех-компания группы МТС. 20 лет на рынке, 63,8 млрд руб. выручки, лучшая партнёрская программа среди облачных провайдеров.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 max-bp-md:grid-cols-1">
            {MWS_FEATURES.map(({ Icon: FeatIcon, title, body }, i) => (
              <Reveal key={title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <article
                  className="flex h-full items-start gap-4 rounded-card border border-grey2 bg-white p-6 shadow-soft transition-all hover:border-brand1 hover:shadow-md"
                >
                  <span
                    className="inline-flex size-12 shrink-0 items-center justify-center rounded-md border-[1.5px]"
                    style={{
                      background: "#FDECEA",
                      borderColor: "rgba(227,6,17,0.2)",
                    }}
                  >
                    <FeatIcon size={22} strokeWidth={1.8} style={{ color: "#E30611" }} />
                  </span>
                  <div>
                    <div className="mb-1.5 text-[15px] font-bold text-text1">{title}</div>
                    <div className="text-[13px] leading-[1.6] text-text2">{body}</div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 6. CTA С ФОРМОЙ ═══ */}
      <section
        id="cta"
        className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14"
      >
        <Container className="grid grid-cols-2 items-start gap-20 max-bp-xl:grid-cols-1 max-bp-xl:gap-12">
          <div>
            <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
              Готовы автоматизировать{" "}
              <em className="not-italic text-brand1">рекрутинг</em>?
            </h2>
            <p className="mt-5 text-[15px] leading-[1.72] text-text2">
              BRaiN HR + MWS: enterprise-решение для найма, которое работает на облачной инфраструктуре №1 в России.
            </p>
            <ul className="mt-7 flex flex-col gap-3">
              {CTA_POINTS.map(({ Icon: PtIcon, title, body }, i) => (
                <Reveal key={title} as="li" delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div
                    className="flex items-start gap-4 rounded-[10px] border border-grey2 bg-grey1 px-4 py-3.5"
                  >
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-brand1/20 bg-brand1-bg text-brand1">
                      <PtIcon size={16} strokeWidth={2} />
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
            title="Запросить демо"
            subtitle="Заполните форму, и мы свяжемся с вами в течение рабочего дня"
            submitLabel="Запросить демо"
            leadType="mws-partnership"
          />
        </Container>
      </section>
    </main>
  );
}
