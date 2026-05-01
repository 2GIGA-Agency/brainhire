import type { ComponentType } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CashbackCalculator } from "@/components/interactive/CashbackCalculator";
import { Reveal } from "@/components/interactive/Reveal";
import {
  Users,
  DollarSign,
  Briefcase,
  Pencil,
  Upload,
  BarChart3,
  CheckCircle2,
  Video,
  Smile,
  Award,
  Star,
  Trophy,
} from "lucide-react";

/**
 * HR Cashback — партнёрская программа.
 * Server Component: 1:1 с pages/hr-cashback.html.
 */
export function HrCashbackPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="bg-white pt-[88px] pb-14 max-bp-sm:pt-[72px] max-bp-sm:pb-10 max-bp-xs:pt-16 max-bp-xs:pb-8">
        <Container>
          <div className="mb-6 flex items-center gap-2 text-[13px] text-text2">
            <Link href="/" className="text-brand1 transition-colors hover:underline">
              Главная
            </Link>
            <span>/</span>
            <span>Партнёрская программа</span>
          </div>
          <h1 className="mb-4 text-[clamp(36px,5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.2px] text-text1">
            Партнёрская программа <em className="not-italic text-brand1">HR Cashback</em>
          </h1>
          <p className="mb-8 max-w-[640px] text-[17px] leading-[1.7] text-text2">
            Подключайте клиентов к BRaiN HR и получайте денежные вознаграждения от 15 до 25% с
            платежей привлечённых клиентов
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="https://brainhire.ru/signup" variant="hero-primary" external>
              Стать партнёром
            </Button>
            <Button href="#calculator" variant="hero-outline">
              Рассчитать доход
            </Button>
          </div>
        </Container>
      </section>

      {/* ═══ ABOUT PROGRAM ═══ */}
      <section className="bg-grey1 py-20">
        <Container>
          <div className="grid grid-cols-2 items-start gap-8 max-bp-lg:grid-cols-1">
            <div>
              <h2 className="mb-5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
                О программе
              </h2>
              <p className="mb-4 text-[15px] leading-[1.72] text-text2">
                BRaiN HR — это инновационная система для автоматизации рекрутинга с использованием
                AI для скрининга резюме, видеоинтервью и с интеграцией с ведущими job-сайтами.
              </p>
              <p className="mb-4 text-[15px] leading-[1.72] text-text2">
                Компании экономят время и деньги, закрывая вакансии в 3 раза быстрее при меньшем
                количестве задействованных людей, а рекрутеры избавляются от рутины и могут
                сосредоточиться на стратегических задачах.
              </p>
              <div className="mt-4 rounded-sm border-l-4 border-brand1 bg-white p-6">
                <p className="text-[15px] font-semibold leading-[1.6] text-text1">
                  Наши партнёры зарабатывают, помогая своему окружению внедрять AI-технологии,
                  чтобы опережать конкурентов и снижать расходы!
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Reveal delay={1}>
                <AboutCard
                  tone="blue"
                  title="Для кого"
                  body="Для рекрутеров и HR-агентств, консультантов в сфере HR, бизнес-партнёров и IT-интеграторов, а также всех, кто хочет зарабатывать на инновациях в HR"
                  Icon={Users}
                />
              </Reveal>
              <Reveal delay={2}>
                <AboutCard
                  tone="orange"
                  title="Вознаграждение"
                  body="Вознаграждение зависит от вашего уровня в программе и может составлять от 15 до 25% с платежей привлечённых клиентов"
                  Icon={DollarSign}
                />
              </Reveal>
              <Reveal delay={3}>
                <AboutCard
                  tone="teal"
                  title="Преимущества"
                  body="Высокое вознаграждение с платежей клиентов, длительное начисление комиссии, лёгкий старт с поддержкой менеджера и демо-доступ для презентаций"
                  Icon={Briefcase}
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ STEPS — Как стать партнёром ═══ */}
      <section className="bg-white py-20">
        <Container>
          <h2 className="mb-12 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Как стать партнёром?
          </h2>
          <div className="grid grid-cols-4 gap-6 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
            <Reveal delay={1}>
              <StepCard
                num={1}
                title="Регистрация"
                body="Зарегистрируйтесь на brainhire.ru и подайте заявку на участие в партнёрской программе"
              />
            </Reveal>
            <Reveal delay={2}>
              <StepCard
                num={2}
                title="Подписание договора"
                body="Подпишите договор о сотрудничестве с BRaiN HR"
              />
            </Reveal>
            <Reveal delay={3}>
              <StepCard
                num={3}
                title="Подключение клиентов"
                body="Передайте реферальную ссылку вашим клиентам и контактам"
              />
            </Reveal>
            <Reveal delay={1}>
              <StepCard
                num={4}
                title="Вознаграждение"
                body="Начните получать выплаты с каждого платежа привлечённых клиентов"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ═══ CALCULATOR (статичный, дефолтное состояние) ═══ */}
      <section id="calculator" className="bg-grey1 py-20">
        <Container>
          <h2 className="mb-3 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Калькулятор дохода партнёра
          </h2>
          <p className="mb-10 text-[16px] leading-[1.6] text-text2">
            Рассчитайте ваш потенциальный доход в зависимости от уровня и суммы продаж
          </p>
          <div className="max-w-[560px]">
            <CashbackCalculator />
          </div>
        </Container>
      </section>

      {/* ═══ TIERS — Уровни партнёрства Bronze / Silver / Gold ═══ */}
      <section className="bg-white py-20">
        <Container>
          <h2 className="mb-3 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Уровни партнёрства
          </h2>
          <p className="mb-10 text-[16px] leading-[1.6] text-text2">
            Чем больше вы привлекаете, тем выше ваше вознаграждение
          </p>
          <div className="grid grid-cols-3 gap-6 max-bp-lg:grid-cols-1">
            <Reveal delay={1}>
              <TierCard
                tone="bronze"
                level="Bronze"
                percent="15%"
                range="до 100 000 ₽"
                Icon={Award}
              />
            </Reveal>
            <Reveal delay={2}>
              <TierCard
                tone="silver"
                level="Silver"
                percent="20%"
                range="100 000–500 000 ₽"
                Icon={Star}
              />
            </Reveal>
            <Reveal delay={3}>
              <TierCard tone="gold" level="Gold" percent="25%" range="от 500 000 ₽" Icon={Trophy} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ═══ FEATURES — Что предлагать клиентам ═══ */}
      <section className="bg-grey1 py-20">
        <Container>
          <h2 className="mb-3 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Что вы предлагаете клиентам
          </h2>
          <p className="mb-10 text-[16px] leading-[1.6] text-text2">
            Полный набор ИИ-инструментов для автоматизации рекрутинга
          </p>
          <div className="grid grid-cols-3 gap-6 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
            <Reveal delay={1}>
              <FeatureCard
                Icon={Pencil}
                title="Создание вакансий за секунды"
                body="ИИ генерирует описание вакансии на основе названия должности и ключевых требований"
              />
            </Reveal>
            <Reveal delay={2}>
              <FeatureCard
                Icon={Upload}
                title="Автоматическая публикация"
                body="Вакансии публикуются на ведущих job-сайтах одним нажатием кнопки"
              />
            </Reveal>
            <Reveal delay={3}>
              <FeatureCard
                Icon={BarChart3}
                title="ИИ-анализ резюме и скоринг"
                body="Автоматическое ранжирование кандидатов по релевантности с детальной аналитикой"
              />
            </Reveal>
            <Reveal delay={1}>
              <FeatureCard
                Icon={CheckCircle2}
                title="Автоматические приглашения"
                body="Система автоматически приглашает подходящих кандидатов на следующие этапы"
              />
            </Reveal>
            <Reveal delay={2}>
              <FeatureCard
                Icon={Video}
                title="ИИ-видеоинтервью"
                body="Первичное автоматическое видеоинтервью с прокторингом и анализом ответов"
              />
            </Reveal>
            <Reveal delay={3}>
              <FeatureCard
                Icon={Smile}
                title="Realtime интервью с ИИ-аватаром"
                body="Живое интервью с ИИ-аватаром и оценкой мимики кандидата в реальном времени"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-white py-20">
        <Container>
          <h2 className="mb-4 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Начните зарабатывать с BRaiN HR
          </h2>
          <p className="mb-8 max-w-[600px] text-[17px] leading-[1.7] text-text2">
            Присоединяйтесь к партнёрской программе и получайте стабильный пассивный доход от
            каждого привлечённого клиента
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="https://brainhire.ru/signup" variant="hero-primary" external>
              Стать партнёром
            </Button>
            <Button href="https://brainhire.ru/contacts" variant="hero-outline" external>
              Связаться с нами
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Subcomponents
   ═══════════════════════════════════════════════════════════════════ */

type IconType = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

function AboutCard({
  tone,
  title,
  body,
  Icon,
}: {
  tone: "blue" | "orange" | "teal";
  title: string;
  body: string;
  Icon: IconType;
}) {
  const toneCls: Record<typeof tone, string> = {
    blue: "bg-brand1-bg text-brand1",
    orange: "bg-brand2-bg text-brand2",
    teal: "bg-[#E0F2F1] text-brand3",
  };
  return (
    <div className="flex h-full items-start gap-4 rounded-card border border-grey2 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-brand1 hover:shadow-md max-bp-xs:p-5">
      <div
        className={`flex size-12 min-w-[48px] items-center justify-center rounded-full ${toneCls[tone]}`}
      >
        <Icon size={24} strokeWidth={1.8} />
      </div>
      <div>
        <h3 className="mb-1.5 text-[16px] font-bold text-text1">{title}</h3>
        <p className="text-[14px] leading-[1.65] text-text2">{body}</p>
      </div>
    </div>
  );
}

function StepCard({ num, title, body }: { num: number; title: string; body: string }) {
  return (
    <div className="h-full text-center">
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-brand1 text-[22px] font-extrabold text-white">
        {num}
      </div>
      <h3 className="mb-2 text-[16px] font-bold text-text1">{title}</h3>
      <p className="text-[14px] leading-[1.6] text-text2">{body}</p>
    </div>
  );
}

function TierCard({
  tone,
  level,
  percent,
  range,
  Icon,
}: {
  tone: "bronze" | "silver" | "gold";
  level: string;
  percent: string;
  range: string;
  Icon: IconType;
}) {
  const tones: Record<typeof tone, { bg: string; iconBg: string; iconColor: string; pct: string }> =
    {
      bronze: {
        bg: "bg-white border-grey2",
        iconBg: "bg-[#FFF3E8]",
        iconColor: "text-[#CD7F32]",
        pct: "text-[#CD7F32]",
      },
      silver: {
        bg: "bg-white border-grey2",
        iconBg: "bg-grey1",
        iconColor: "text-[#9CA3AF]",
        pct: "text-[#6B7280]",
      },
      gold: {
        bg: "bg-white border-grey2",
        iconBg: "bg-[#FFF8E1]",
        iconColor: "text-[#D4AF37]",
        pct: "text-[#D4AF37]",
      },
    };
  const t = tones[tone];
  return (
    <div
      className={`h-full rounded-card border ${t.bg} p-7 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand1 hover:shadow-md`}
    >
      <div
        className={`mb-4 flex size-14 items-center justify-center rounded-card ${t.iconBg} ${t.iconColor}`}
      >
        <Icon size={28} strokeWidth={1.8} />
      </div>
      <div className="mb-1 text-[16px] font-bold text-text1">{level}</div>
      <div className={`mb-2 text-[36px] font-black leading-none ${t.pct}`}>{percent}</div>
      <div className="text-[14px] text-text2">{range}</div>
    </div>
  );
}

function FeatureCard({ Icon, title, body }: { Icon: IconType; title: string; body: string }) {
  return (
    <div className="h-full rounded-card border border-grey2 bg-white p-7 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand1 hover:shadow-md max-bp-xs:p-5">
      <div className="mb-4 flex size-12 items-center justify-center rounded-card bg-brand1-bg text-brand1">
        <Icon size={24} strokeWidth={1.8} />
      </div>
      <h3 className="mb-2 text-[16px] font-bold text-text1">{title}</h3>
      <p className="text-[14px] leading-[1.65] text-text2">{body}</p>
    </div>
  );
}

