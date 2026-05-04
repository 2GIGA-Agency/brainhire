import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FaqAccordion, type FaqItem } from "@/components/ui/FaqAccordion";
import { LeadForm } from "@/components/interactive/LeadForm";
import { AudienceTabs, type AudienceItem } from "@/components/interactive/AudienceTabs";
import { Reveal } from "@/components/interactive/Reveal";
import {
  ArrowRight,
  User,
  Video,
  Bot,
  Activity,
  Zap,
  BarChart3,
  FileText,
  Clock,
  Calendar,
  AlertTriangle,
  Pencil,
  CheckCircle2,
  Check,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const HERO_PROOF = [
  "Диалог в реальном времени",
  "Адаптивные вопросы",
  "Анализ мимики и поведения",
];

const TICKER_ITEMS = [
  { Icon: Bot, text: "ИИ-аватар ведёт диалог" },
  { Icon: Activity, text: "Анализ мимики и поведения" },
  { Icon: Zap, text: "Адаптивные вопросы" },
  { Icon: BarChart3, text: "Оценка soft skills" },
  { Icon: FileText, text: "Видеозапись и транскрипт" },
  { Icon: Clock, text: "Доступно 24/7" },
];

const PAINS = [
  {
    Icon: Clock,
    title: "Руководитель тратит 1-2 часа на каждого кандидата",
    text: "Финальное интервью требует личного участия руководителя. При 5-10 финалистах это 10-20 часов рабочего времени, которые можно было потратить на стратегические задачи.",
  },
  {
    Icon: Calendar,
    title: "Согласование расписания затягивает процесс",
    text: "Найти окно в календаре руководителя, нанимающего менеджера и кандидата — логистический кошмар. Пока вы согласуете время, кандидат уходит к конкуренту.",
  },
  {
    Icon: AlertTriangle,
    title: "Субъективность и предвзятость",
    text: "Оценка soft skills зависит от личных предпочтений интервьюера. Два руководителя могут дать диаметрально противоположные оценки одному и тому же кандидату.",
  },
  {
    Icon: Activity,
    title: "Невозможно сравнить кандидатов объективно",
    text: "Каждый руководитель задаёт разные вопросы, оценивает по разным критериям. Без единой системы оценки финальное решение превращается в лотерею.",
  },
];

const STATS = [
  { num: "5 мин", desc: "руководитель смотрит отчёт\nвместо часа на интервью" },
  { num: "0", desc: "звонков\nдо финала" },
  { num: "24/7", desc: "доступность\nИИ-аватара" },
  { num: "87%", desc: "точность оценки\nsoft skills" },
];

const STEPS = [
  {
    n: "Шаг 1",
    time: "5 мин",
    Icon: Pencil,
    title: "Настройка профиля вакансии",
    text: "Укажите требования, компетенции и ценности команды. ИИ сформирует адаптивный сценарий собеседования с учётом специфики позиции",
  },
  {
    n: "Шаг 2",
    time: "авто",
    Icon: Bot,
    title: "Кандидат подключается к ИИ-аватару",
    text: "Кандидат получает ссылку и подключается к Real-time интервью в удобное время. ИИ-аватар приветствует и начинает диалог",
  },
  {
    n: "Шаг 3",
    time: "20-40 мин",
    Icon: Activity,
    title: "Адаптивное интервью в реальном времени",
    text: "ИИ-аватар ведёт естественный диалог, адаптируя вопросы на основе ответов. Параллельно анализирует мимику, тон голоса и поведение кандидата",
  },
  {
    n: "Шаг 4",
    time: "авто",
    Icon: FileText,
    title: "Готовый отчёт с видеозаписью",
    text: "Система формирует детальный отчёт: оценка soft skills, мотивации, cultural fit, видеозапись и полная транскрипция диалога",
  },
];

const COMPARE_BAD = [
  { Icon: Clock, text: "1-2 часа рабочего времени руководителя на каждого финалиста" },
  { Icon: Calendar, text: "Дни на согласование расписания с руководителем и кандидатом" },
  { Icon: AlertTriangle, text: "Субъективная оценка soft skills, зависящая от интервьюера" },
  { Icon: Video, text: "Нет записи, нет объективных данных для сравнения кандидатов" },
];

const COMPARE_GOOD = [
  { Icon: Zap, text: "ИИ-аватар проводит глубокое интервью, руководитель смотрит отчёт за 5 минут" },
  { Icon: Clock, text: "Кандидат проходит интервью в удобное время 24/7 без согласований" },
  { Icon: Activity, text: "Объективная оценка soft skills, мимики и поведения по единым критериям" },
  { Icon: FileText, text: "Полная видеозапись, транскрипция и структурированный отчёт" },
];

const LOGOS = [
  { href: "https://www.simbirsoft.com/", node: (<span style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.5px" }}>Simbir<span style={{ color: "#e03030" }}>S</span>oft</span>) },
  { href: "https://bssys.com/", node: (<span style={{ background: "#1a3a8a", color: "#fff", fontSize: 15, fontWeight: 900, padding: "5px 10px", borderRadius: 4, letterSpacing: "1px" }}>BSS</span>) },
  { href: "https://3logic.ru/", node: (<span style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.3px" }}>3<span style={{ color: "#e03030" }}>LOGIC</span><br /><span style={{ fontSize: 9, fontWeight: 600, color: "#555", letterSpacing: "1px" }}>GROUP</span></span>) },
  { href: "https://kazan.rt.ru/", node: (<span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", letterSpacing: "0.5px" }}>РОСТЕЛЕКОМ</span>) },
  { href: "https://e-flops.ru/", node: (<span style={{ fontSize: 16, fontWeight: 800, color: "#222", letterSpacing: "-0.5px" }}>e<span style={{ color: "#4096FF" }}>-</span>flops</span>) },
  { href: "https://itpeoplegroup.ru/", node: (<span style={{ fontSize: 12, fontWeight: 800, color: "#1a1a1a", letterSpacing: "1.5px", textTransform: "uppercase" as const, border: "2px solid #1a1a1a", padding: "4px 8px" }}>IT PEOPLE</span>) },
  { href: "https://moby.estate/", node: (<span style={{ fontSize: 17, fontWeight: 800, color: "#2b4de3", letterSpacing: "-0.5px" }}>moby</span>) },
  { href: "https://www.hr-rocket.ru/", node: (<span style={{ fontSize: 14, fontWeight: 800, color: "#1a1a1a", letterSpacing: "0.5px" }}>HR ROCKET</span>) },
  { href: "https://prodamus.ru/", node: (<span style={{ fontSize: 15, fontWeight: 700, color: "#6c3db5", letterSpacing: "-0.3px" }}>prodamus</span>) },
  { href: "https://www.penoplex.ru/", node: (<span style={{ fontSize: 13, fontWeight: 800, color: "#e03030", letterSpacing: "0.5px" }}>PENOPLEX</span>) },
];

const AUDIENCES: AudienceItem[] = [
  {
    tab: "HR-отделам",
    title: (
      <>
        Проводите глубокие интервью{" "}
        <em className="not-italic text-brand1">без отвлечения руководителей</em>
      </>
    ),
    body: "ИИ-аватар проводит полноценное финальное собеседование с каждым кандидатом. Руководитель получает готовый отчёт с видеозаписью и оценкой soft skills — и принимает решение за 5 минут вместо часа.",
    checks: [
      "Глубокая оценка soft skills и мотивации кандидатов",
      "Единые критерии оценки для всех финалистов",
      "Видеозапись и транскрипция каждого интервью",
    ],
    stats: [
      { num: "5 мин", desc: "на принятие\nрешения" },
      { num: "24/7", desc: "доступность\nИИ-аватара" },
      { num: "87%", desc: "точность\nоценки" },
    ],
  },
  {
    tab: "Руководителям",
    title: (
      <>
        Оценивайте финалистов{" "}
        <em className="not-italic text-brand1">без отрыва от работы</em>
      </>
    ),
    body: "Больше не нужно тратить часы на проведение финальных собеседований. ИИ-аватар проведёт глубокое интервью, оценит soft skills, мотивацию и cultural fit — а вы посмотрите отчёт и ключевые моменты видеозаписи.",
    checks: [
      "Просмотр только ключевых моментов интервью",
      "Объективные данные для принятия решения",
      "Сравнение кандидатов по единым критериям",
    ],
    stats: [
      { num: "0", desc: "часов\nна интервью" },
      { num: "87%", desc: "точность\nоценки" },
    ],
  },
  {
    tab: "Рекрутинговым агентствам",
    title: (
      <>
        Предлагайте клиентам{" "}
        <em className="not-italic text-brand1">глубокую оценку кандидатов</em>
      </>
    ),
    body: "Дополните свои услуги Real-time интервью с ИИ-аватаром. Клиенты получают не просто резюме, а детальный отчёт с оценкой soft skills, видеозаписью и рекомендациями — это повышает ценность вашего предложения.",
    checks: [
      "Глубокая оценка кандидатов без участия клиента",
      "Видеозаписи и отчёты для заказчиков",
      "Повышение ценности услуги подбора",
    ],
    stats: [
      { num: "10x", desc: "больше\nинтервью" },
      { num: "24/7", desc: "доступность\nсистемы" },
    ],
  },
];

const CROSS_SELL = [
  {
    href: "/ai-resume-analysis",
    Icon: BarChart3,
    title: "ИИ-скрининг резюме",
    text: "Мгновенный скрининг и скоринг сотен резюме. Объективная оценка кандидатов для первичного отбора.",
  },
  {
    href: "https://brainhire.ru/ai-vacancy-creation",
    Icon: Pencil,
    title: "ИИ-создание вакансий",
    text: "Генерация профессиональных описаний вакансий за 30 секунд. SEO-оптимизация для job-бордов.",
  },
  {
    href: "https://brainhire.ru/ai-videointerview",
    Icon: Video,
    title: "ИИ-видеоинтервью с прокторингом",
    text: "Первичное тестирование сотен кандидатов одновременно. Прокторинг фиксирует подсказки и нечестные ответы.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Как работает Real-time интервью с ИИ-аватаром?",
    a: "ИИ-аватар ведёт полноценный диалог с кандидатом в реальном времени. Аватар приветствует кандидата, задаёт адаптивные вопросы на основе ответов, углубляется в интересные темы и оценивает soft skills, мотивацию и поведение. Параллельно система анализирует мимику, тон голоса и зрительный контакт. По итогам интервью формируется детальный отчёт с видеозаписью и рекомендациями.",
  },
  {
    q: "Насколько точна оценка ИИ-аватара по сравнению с живым интервьюером?",
    a: "Точность оценки soft skills ИИ-аватаром составляет 87% по данным наших клиентов. Ключевое преимущество — объективность: ИИ оценивает всех кандидатов по единым критериям, без влияния усталости, настроения и предвзятости. При этом ИИ-аватар не заменяет руководителя, а даёт ему структурированные данные для принятия финального решения.",
  },
  {
    q: "Как кандидат воспринимает интервью с ИИ-аватаром?",
    a: "По обратной связи от кандидатов, подавляющее большинство оценивают опыт Real-time интервью как комфортный и профессиональный. ИИ-аватар ведёт естественный диалог, проявляет эмпатию и создаёт атмосферу, близкую к обычному собеседованию. Кандидаты отмечают удобство прохождения интервью в любое время и отсутствие стресса от согласования расписания.",
  },
  {
    q: "Чем Real-time интервью отличается от обычного ИИ-видеоинтервью?",
    a: "Обычное ИИ-видеоинтервью — это асинхронный тест: кандидат видит заранее подготовленные вопросы и записывает видеоответы. Real-time интервью — это полноценный живой диалог с ИИ-аватаром, который адаптирует вопросы на основе ответов, углубляется в темы и ведёт себя как опытный интервьюер. Видеоинтервью подходит для массового первичного отбора, а Real-time интервью — для глубокой оценки финалистов.",
  },
  {
    q: "Можно ли настроить сценарий и компетенции для оценки?",
    a: "Да, вы полностью настраиваете профиль интервью: указываете ключевые компетенции, ценности команды, темы для обсуждения и приоритеты оценки. ИИ-аватар адаптирует свой сценарий под эти параметры. Для руководящих позиций акцент может быть на лидерстве, для клиентских ролей — на эмпатии и коммуникации.",
  },
  {
    q: "Какая длительность одного Real-time интервью?",
    a: "Типичная длительность Real-time интервью составляет 20-40 минут в зависимости от сложности позиции и глубины вопросов. Вы можете настроить продолжительность и количество тем для обсуждения. ИИ-аватар автоматически управляет таймингом, чтобы охватить все ключевые компетенции в отведённое время.",
  },
  {
    q: "Как анализируются мимика и поведение кандидата?",
    a: "Система использует компьютерное зрение для анализа выражения лица, зрительного контакта и языка тела кандидата в реальном времени. Параллельно анализируется тон голоса, скорость речи и паузы. На основе этих данных ИИ оценивает уровень уверенности, стресса, вовлечённости и искренности ответов. Все данные включаются в итоговый отчёт.",
  },
  {
    q: "Сколько стоит использование Real-time интервью?",
    a: "Стоимость зависит от выбранного тарифа и объёма использования. Свяжитесь с нами для получения персонального предложения или запросите демо, чтобы увидеть систему в действии. Мы подберём оптимальный тариф под ваши задачи и объём подбора.",
  },
];

const CTA_POINTS = [
  {
    Icon: Bot,
    strong: "ИИ-аватар ведёт диалог в реальном времени",
    body: "Адаптивные вопросы на основе ответов кандидата",
  },
  {
    Icon: Activity,
    strong: "Анализ мимики, поведения и soft skills",
    body: "Объективные данные для принятия решений",
  },
  {
    Icon: FileText,
    strong: "Видеозапись, транскрипт и детальный отчёт",
    body: "Руководитель принимает решение за 5 минут",
  },
];

export function RealtimeInterviewPage() {
  return (
    <main>
      {/* ═══ 1. HERO ═══ */}
      <section className="bg-white pt-20 pb-[88px] max-bp-lg:py-14">
        <Container className="grid grid-cols-[1fr_440px] items-center gap-[72px] max-bp-lg:grid-cols-1 max-bp-lg:gap-10">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand1/30 bg-brand1-bg py-[5px] pl-2.5 pr-3.5 text-[12px] font-semibold tracking-[0.3px] text-brand1">
              <span className="size-1.5 rounded-full bg-brand1 animate-pulse-dot" />
              Real-time интервью с ИИ-аватаром
            </span>
            <h1 className="text-[clamp(36px,4vw,52px)] font-extrabold leading-[1.1] tracking-[-1.2px] text-text1">
              Real-time интервью
              <br />с <em className="not-italic text-brand1">ИИ-аватаром</em>
            </h1>
            <p className="mt-5 max-w-[500px] text-[17px] leading-[1.7] text-text2">
              ИИ-аватар проводит полноценное собеседование в реальном времени, адаптируя вопросы под ответы кандидата. Оценка soft skills, мотивации и компетенций — без участия руководителя.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="#form" variant="hero-primary">
                Запросить демо Real-time интервью
                <ArrowRight size={16} strokeWidth={1.8} />
              </Button>
              <Button href="https://brainhire.ru/signup" variant="hero-outline" external>
                Попробовать бесплатно
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
              {HERO_PROOF.map((p) => (
                <li key={p} className="flex items-center gap-[7px] text-[13px] font-medium text-text2">
                  <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-brand1 bg-brand1-bg text-brand1">
                    <Check size={10} strokeWidth={2.2} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* INTERVIEW CARD — Avatar */}
          <aside className="overflow-hidden rounded-card border border-grey2 bg-white shadow-md">
            <div className="flex items-center gap-2 border-b border-grey2 bg-grey1 px-[18px] py-3.5 text-[12px] font-semibold text-text2">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#FD6B5B]" />
                <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="size-2.5 rounded-full bg-[#28C840]" />
              </div>
              <span>Real-time интервью — Product Manager</span>
            </div>
            <div className="flex flex-col gap-2.5 p-3.5">
              <div className="flex items-center gap-2.5 rounded-[8px] border border-grey2 bg-grey1 px-3.5 py-2.5">
                <span className="min-w-[65px] text-[11px] font-semibold text-text2">Кандидат</span>
                <span className="text-[12px] font-semibold text-text1">Алексей Смирнов</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-[8px] border border-grey2 bg-grey1 px-3.5 py-2.5">
                <span className="min-w-[65px] text-[11px] font-semibold text-text2">Позиция</span>
                <span className="text-[12px] font-semibold text-text1">Product Manager</span>
              </div>

              {/* Avatar area */}
              <div className="grid grid-cols-2 gap-2.5 max-bp-lg:grid-cols-1">
                <div
                  className="flex flex-col items-center justify-center gap-1.5 rounded-[8px] border border-brand1/20 px-3 py-5 text-center"
                  style={{ background: "linear-gradient(135deg, #12536D, #1a6b8a)" }}
                >
                  <User size={40} strokeWidth={1.5} className="text-white/90" />
                  <div className="text-[10px] font-semibold text-white/85">ИИ-аватар</div>
                </div>
                <div className="flex flex-col items-center justify-center gap-1.5 rounded-[8px] border border-grey2 bg-grey1 px-3 py-5 text-center">
                  <Video size={40} strokeWidth={1.5} className="text-text2" />
                  <div className="text-[10px] font-semibold text-text2">Кандидат</div>
                  <div className="inline-flex items-center gap-1 rounded-full border border-[rgba(240,68,56,0.25)] bg-[#FFF1F0] px-2 py-px text-[9px] font-bold text-[#F04438]">
                    <span className="size-[5px] rounded-full bg-[#F04438] animate-pulse-dot" />
                    LIVE
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-[8px] border border-brand1/15 bg-brand1/[0.04] px-3.5 py-2.5 text-[11px] font-semibold text-brand1">
                <span className="size-1.5 rounded-full bg-brand1 animate-pulse-dot" />
                ИИ-аватар ведёт интервью — адаптивный вопрос 4 из 12...
              </div>

              <div className="rounded-[8px] border border-grey2 bg-white px-3.5 py-2.5">
                <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.5px] text-brand1">
                  Текущий вопрос
                </div>
                <div className="text-[11px] font-semibold leading-[1.5] text-text1">
                  Расскажите о ситуации, когда вам пришлось убеждать команду в необходимости изменить стратегию продукта. Каков был результат?
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {["Soft Skills", "Лидерство", "Мотивация", "Коммуникация"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-brand1/25 bg-brand1-bg px-2 py-[3px] text-[10px] font-semibold text-brand1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-0.5 flex items-center gap-[7px] rounded-[8px] border border-brand1/25 bg-brand1-bg px-3.5 py-2.5 text-[12px] font-medium leading-[1.4] text-brand3">
                <User size={14} strokeWidth={1.8} className="shrink-0 text-brand1" />
                <span className="flex-1">
                  Прогресс: <strong className="font-bold text-brand1">4/12 вопросов</strong> — real-time анализ мимики и ответов
                </span>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      {/* ═══ TICKER ═══ */}
      <div className="overflow-hidden border-y border-grey2 bg-grey1 py-3">
        <div className="flex w-max animate-ticker">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap px-8 text-[13px] font-medium text-text2"
            >
              <span className="inline-flex shrink-0 items-center text-brand1">
                <item.Icon size={16} strokeWidth={1.8} />
              </span>
              <b className="font-semibold text-text1">{item.text}</b>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ 2. ПРОБЛЕМЫ / БОЛИ ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Почему ручные финальные интервью
            <br />
            <em className="not-italic text-brand1">замедляют найм</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Руководители тратят часы на собеседования, а решения принимаются на основе субъективных впечатлений.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 max-bp-lg:grid-cols-1">
            {PAINS.map(({ Icon: PIcon, title, text }, i) => (
              <Reveal key={title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <article
                  className="h-full rounded-card border border-grey2 bg-white p-7 shadow-soft"
                >
                  <span className="mb-3.5 inline-flex text-brand1">
                    <PIcon size={26} strokeWidth={1.8} />
                  </span>
                  <h3 className="mb-2 text-[16px] font-bold text-text1">{title}</h3>
                  <p className="text-[14px] leading-[1.65] text-text2">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 3. STATS BAR ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-12">
        <Container>
          <div className="grid grid-cols-4 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-2">
            {STATS.map((s, i) => (
              <Reveal key={s.num} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div
                  className={`px-12 py-8 max-bp-sm:px-5 max-bp-sm:py-5 max-bp-sm:px-6 max-bp-sm:py-6 ${
                    i < STATS.length - 1 ? "border-r border-grey2 max-bp-sm:border-r-0 max-bp-sm:border-b" : ""
                  }`}
                >
                  <div className="mb-3 text-[48px] font-extrabold leading-none tracking-[-2px] text-brand1">
                    {s.num}
                  </div>
                  <div
                    className="text-[13px] font-medium leading-[1.55] text-text2"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {s.desc}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-center text-[11px] leading-[1.5] text-text2">
            *По данным клиентов BRaiN HR, 2025-2026.
          </p>
        </Container>
      </section>

      {/* ═══ 4. КАК ЭТО РАБОТАЕТ ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container>
          <span className="inline-flex items-center rounded-full bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[0.8px] text-brand1">
            Как это работает
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Как проходит Real-time интервью:
            <br />
            <em className="not-italic text-brand1">от настройки до результата</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Полный цикл глубокого собеседования с ИИ-аватаром — от настройки профиля вакансии до готового отчёта с видеозаписью.
          </p>
          <div className="mt-12 grid grid-cols-4 gap-4 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
            {STEPS.map(({ n, time, Icon: SIcon, title, text }, i) => (
              <Reveal key={n} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <article
                  className="h-full rounded-card border border-grey2 bg-white p-6 shadow-soft"
                >
                  <div className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.5px] text-text2">
                    <span>{n}</span>
                    <span className="rounded-full border border-brand1/25 bg-brand1-bg px-2 py-px text-[10px] font-semibold text-brand1 normal-case">
                      {time}
                    </span>
                  </div>
                  <span className="mb-3 inline-flex text-brand1">
                    <SIcon size={26} strokeWidth={1.8} />
                  </span>
                  <div className="mb-2 text-[15px] font-bold text-text1">{title}</div>
                  <p className="text-[13px] leading-[1.6] text-text2">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 5. СРАВНЕНИЕ ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Ручное финальное интервью vs
            <br />
            <em className="not-italic text-brand1">Real-time ИИ-аватар</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Сравните традиционный подход с автоматизированным глубоким собеседованием.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 max-bp-lg:grid-cols-1">
            {/* Bad column */}
            <div className="overflow-hidden rounded-card border border-grey2 bg-white shadow-soft">
              <div className="flex items-center gap-2.5 border-b border-grey2 bg-grey1 px-6 py-4 text-[14px] font-bold text-text2">
                <AlertCircle size={16} strokeWidth={1.8} />
                Ручное финальное интервью
              </div>
              <ul className="py-1">
                {COMPARE_BAD.map(({ Icon: CIcon, text }) => (
                  <li
                    key={text}
                    className="flex items-start gap-3 border-b border-grey1 px-6 py-3.5 text-[14px] text-text2 last:border-b-0"
                  >
                    <span className="mt-0.5 shrink-0 text-[#F04438]">
                      <CIcon size={18} strokeWidth={1.8} />
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 border-t border-grey2 bg-grey1 px-[22px] py-3.5 text-[13px] font-bold text-brand2">
                <Clock size={18} strokeWidth={1.8} />
                Долго, субъективно, отвлекает руководителя
              </div>
            </div>

            {/* Good column */}
            <div className="overflow-hidden rounded-card border border-brand1 bg-white shadow-soft">
              <div className="flex items-center gap-2.5 border-b border-brand1/20 bg-brand1-bg px-6 py-4 text-[14px] font-bold text-brand3">
                <CheckCircle2 size={16} strokeWidth={1.8} />
                Real-time ИИ-аватар BRaiN HR
                <span className="ml-auto rounded-full bg-brand1 px-2.5 py-[3px] text-[11px] font-bold text-white">
                  Рекомендуем
                </span>
              </div>
              <ul className="py-1">
                {COMPARE_GOOD.map(({ Icon: CIcon, text }) => (
                  <li
                    key={text}
                    className="flex items-start gap-3 border-b border-grey1 px-6 py-3.5 text-[14px] text-text1 last:border-b-0"
                  >
                    <span className="mt-0.5 shrink-0 text-brand1">
                      <CIcon size={18} strokeWidth={1.8} />
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 border-t border-brand1/20 bg-brand1-bg px-[22px] py-3.5 text-[13px] font-bold text-brand1">
                <Zap size={18} strokeWidth={1.8} />
                Быстро, объективно, данные для решения
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
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
          <div className="flex w-max animate-ticker items-center">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <a
                key={i}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-[68px] shrink-0 items-center justify-center px-9 leading-[1.2] opacity-60 transition-opacity hover:opacity-100 ${
                  i < LOGOS.length * 2 - 1 ? "border-r border-grey2" : ""
                }`}
              >
                {logo.node}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ 8. КОМУ ПОДОЙДЁТ ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container>
          {/* .section-tag из HTML CSS:
                inline-flex; gap:6px; font-size:11px; font-weight:700;
                letter-spacing:1.2px; text-transform:uppercase;
                color:var(--brand1); background:var(--brand1-bg);
                border:1px solid rgba(64,150,255,0.25);
                padding:4px 12px; border-radius:100px; */}
          <span className="mb-[14px] inline-flex items-center gap-1.5 rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
            Кому подойдёт
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Кому подойдёт Real-time интервью с ИИ-аватаром?
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Автоматизируйте финальные собеседования и освободите руководителей от рутинных интервью. ИИ-аватар глубоко оценивает кандидатов, а вы принимаете решения на основе данных.
          </p>

          <AudienceTabs audiences={AUDIENCES} />
        </Container>
      </section>

      {/* ═══ ВОЗМОЖНОСТИ ПЛАТФОРМЫ — Feature rows ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14 max-bp-sm:py-10">
        <Container>
          {/* .section-tag (см. HTML CSS): + border 1px rgba(64,150,255,0.25),
              letter-spacing:1.2px, gap:6px. */}
          <span className="mb-[14px] inline-flex items-center gap-1.5 rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
            Возможности платформы
          </span>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Возможности Real-time интервью
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Полноценное глубокое собеседование с ИИ-аватаром — от адаптивных вопросов до анализа мимики и поведения.
          </p>

          {/* Row 1: Адаптивные вопросы */}
          <FeatureRow
            num="01"
            title="Адаптивные вопросы в реальном времени"
            desc="ИИ-аватар не следует жёсткому скрипту — он ведёт естественный диалог, адаптируя каждый следующий вопрос на основе ответов кандидата. Если кандидат упоминает интересный опыт, аватар углубляется в тему. Если ответ поверхностный — задаёт уточняющие вопросы. Результат — глубокое понимание реального опыта и компетенций."
            checks={[
              "Динамическая генерация вопросов на основе ответов",
              "Углубление в интересные темы и уточняющие вопросы",
              "Естественный диалог, не жёсткий скрипт",
            ]}
            mock={
              <BrowserMock>
                <Tabs tabs={["Real-time интервью", "Сценарий", "Отчёт"]} active={0} />
                <div className="p-3.5">
                  <EditorField label="Кандидат" value="Иванова Е.К." />
                  <EditorField label="Позиция" value="Team Lead, Frontend" />
                  <EditorField
                    label="Статус"
                    value="ИИ-аватар ведёт интервью"
                    valueClassName="text-brand1"
                  />
                  <div className="mt-2.5 rounded-md border border-[rgba(64,150,255,0.12)] bg-[rgba(64,150,255,0.04)] p-2.5">
                    <div className="mb-1 text-[11px] font-bold text-text1">
                      Адаптивный вопрос (на основе предыдущего ответа)
                    </div>
                    <div className="text-[10px] leading-[1.6] text-text2">
                      Вы упомянули конфликт в команде при миграции на новый стек. Расскажите подробнее, как вы нашли компромисс и какой был результат?
                    </div>
                    <AiBadge>
                      <Sparkles size={10} strokeWidth={2} />
                      Адаптивный вопрос 6 из 12
                    </AiBadge>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {["Лидерство", "Конфликты", "Soft Skills"].map((t) => (
                      <FeatTag key={t}>{t}</FeatTag>
                    ))}
                  </div>
                </div>
              </BrowserMock>
            }
          />

          {/* Row 2: Анализ мимики */}
          <FeatureRow
            reverse
            num="02"
            title="Анализ мимики и поведения"
            desc="Во время Real-time интервью система анализирует выражение лица, тон голоса, зрительный контакт и язык тела кандидата. ИИ выявляет уровень уверенности, стресса, вовлечённости и искренности ответов. Это даёт дополнительный слой объективных данных, недоступный при чтении резюме или анализе текстовых ответов."
            checks={[
              "Анализ мимики, тона голоса и зрительного контакта",
              "Оценка уверенности, стресса и искренности",
              "Дополнительные данные для принятия решений",
            ]}
            mock={
              <BrowserMock>
                <div className="border-b border-grey2 px-3.5 pt-3 pb-2 text-[13px] font-bold text-text1">
                  Анализ поведения — Real-time
                </div>
                <div className="grid grid-cols-2 gap-3 p-3.5 max-bp-lg:grid-cols-1">
                  <div
                    className="flex flex-col items-center justify-center gap-2 rounded-md px-3 py-5 text-center"
                    style={{ background: "linear-gradient(135deg, #12536D, #1a6b8a)" }}
                  >
                    <User size={48} strokeWidth={1.5} className="text-white/90" />
                    <div className="text-[10px] font-semibold text-white/80">
                      ИИ-аватар анализирует
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-2.5">
                    <AnalysisRow label="Уверенность" pct={87} />
                    <AnalysisRow label="Вовлечённость" pct={92} />
                    <AnalysisRow label="Честность" pct={78} />
                    <AnalysisRow label="Стресс" pct={23} />
                  </div>
                </div>
              </BrowserMock>
            }
          />

          {/* Row 3: Полный профиль */}
          <FeatureRow
            num="03"
            title="Полный профиль кандидата"
            desc="По итогам Real-time интервью система формирует комплексный профиль кандидата: оценка soft skills, мотивации, cultural fit, лидерских качеств и коммуникативных навыков. Профиль включает ключевые выводы ИИ, сильные и слабые стороны, а также рекомендации по дальнейшим действиям."
            checks={[
              "Комплексная оценка soft skills и мотивации",
              "Ключевые выводы и рекомендации ИИ",
              "Сильные и слабые стороны кандидата",
            ]}
            mock={
              <BrowserMock>
                <Tabs tabs={["Профиль", "Видеозапись", "Транскрипт"]} active={0} />
                <div className="p-3.5">
                  <EditorField label="Кандидат" value="Смирнов А.В." />
                  <EditorField label="Soft Skills" value="89%" valueClassName="text-brand1" />
                  <EditorField label="Мотивация" value="92%" valueClassName="text-brand1" />
                  <div className="mt-2.5 rounded-md border border-[rgba(64,150,255,0.12)] bg-[rgba(64,150,255,0.04)] p-2.5">
                    <div className="mb-1 text-[11px] font-bold text-text1">Ключевые выводы ИИ</div>
                    <div className="text-[10px] leading-[1.6] text-text2">
                      Высокая мотивация к росту. Уверенная коммуникация. Продемонстрировал сильные навыки решения конфликтов. Рекомендован для финального этапа.
                    </div>
                    <AiBadge>
                      <Sparkles size={10} strokeWidth={2} />
                      Полный профиль сформирован
                    </AiBadge>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {["Лидерство", "Коммуникация", "Cultural fit"].map((t) => (
                      <FeatTag key={t}>{t}</FeatTag>
                    ))}
                  </div>
                </div>
              </BrowserMock>
            }
          />

          {/* Row 4: Soft skills deep */}
          <FeatureRow
            reverse
            num="04"
            title="Глубокая оценка soft skills"
            desc="ИИ-аватар оценивает коммуникативные навыки, лидерство, стрессоустойчивость, эмоциональный интеллект и другие soft skills через естественный диалог. В отличие от тестов, Real-time интервью выявляет реальное поведение кандидата, а не заученные ответы. Система оценивает не только содержание, но и то, как кандидат формулирует мысли."
            checks={[
              "Оценка через диалог, а не тесты",
              "Коммуникация, лидерство, стрессоустойчивость, EQ",
              "Реальное поведение вместо заученных ответов",
            ]}
            mock={
              <BrowserMock>
                <div className="border-b border-grey2 px-3.5 pt-3 pb-2 text-[13px] font-bold text-text1">
                  Оценка Soft Skills — Иванова Е.К.
                </div>
                <div className="flex flex-col gap-2 p-3.5">
                  <QCard text="Коммуникативные навыки: высокие" badge="91%" tone="basic" comp="Убедительная аргументация" />
                  <QCard text="Лидерство: выраженное" badge="88%" tone="basic" comp="Инициативность, ответственность" />
                  <QCard text="Стрессоустойчивость: высокая" badge="85%" tone="basic" comp="Спокойствие в сложных ситуациях" />
                  <div className="px-3 py-2 text-center">
                    <AiBadge>
                      <Sparkles size={10} strokeWidth={2} />
                      Общая оценка soft skills: 88%
                    </AiBadge>
                  </div>
                </div>
              </BrowserMock>
            }
          />

          {/* Row 5: Видеозапись и транскрипт */}
          <FeatureRow
            num="05"
            title="Видеозапись и транскрипт"
            desc="Каждое Real-time интервью записывается полностью. Система автоматически транскрибирует диалог и расставляет метки на ключевых моментах. Руководитель может посмотреть полную запись или перейти к отмеченным фрагментам — ответам о мотивации, конфликтах, опыте управления."
            checks={[
              "Полная видеозапись каждого интервью",
              "Автоматическая транскрипция диалога",
              "Метки ключевых моментов для быстрого просмотра",
            ]}
            mock={
              <BrowserMock>
                <Tabs tabs={["Видеозапись", "Транскрипт"]} active={0} />
                <div className="p-3.5">
                  <EditorField label="Запись" value="35 мин — полное интервью" />
                  <EditorField label="Метки" value="12 ключевых моментов" />
                  <div className="mt-2.5 rounded-md border border-[rgba(64,150,255,0.12)] bg-[rgba(64,150,255,0.04)] p-2.5">
                    <div className="mb-1 text-[11px] font-bold text-text1">Транскрипция диалога</div>
                    <div className="text-[10px] leading-[1.6] text-text2">
                      ИИ-аватар: «Расскажите о вашем опыте управления командой.»
                      <br />
                      Кандидат: «В прошлом проекте я руководил командой из 8 человек...»
                      <br />
                      ИИ-аватар: «Какие были главные вызовы?»
                    </div>
                    <AiBadge>
                      <Sparkles size={10} strokeWidth={2} />
                      Полная транскрипция + ключевые моменты
                    </AiBadge>
                  </div>
                </div>
              </BrowserMock>
            }
          />

          {/* Row 6: Воронка */}
          <FeatureRow
            reverse
            num="06"
            title="Интеграция с воронкой подбора"
            desc="Real-time интервью органично встраивается в воронку подбора BRaiN HR. Кандидаты, прошедшие скрининг и первичное видеоинтервью, автоматически попадают на этап глубокого собеседования с ИИ-аватаром. Вся история кандидата — от резюме до финального отчёта — доступна в одном месте."
            checks={[
              "Автоматический переход между этапами воронки",
              "Полная история кандидата в одном месте",
              "Единая платформа для всех этапов подбора",
            ]}
            mock={
              <BrowserMock>
                <div className="border-b border-grey2 px-3.5 pt-3 pb-2 text-[13px] font-bold text-text1">
                  Воронка подбора — Senior Product Manager
                </div>
                <div className="flex flex-col gap-2 p-3.5">
                  <QCard text="Скрининг резюме: 48 кандидатов отобрано" badge="Завершён" tone="basic" comp="ИИ-скрининг" />
                  <QCard text="Видеоинтервью: 12 прошли первичное интервью" badge="Завершён" tone="basic" comp="Прокторинг" />
                  <QCard text="Real-time интервью: 5 финалистов оценены" badge="В процессе" tone="advanced" comp="ИИ-аватар" />
                  <div className="px-3 py-2 text-center">
                    <AiBadge>
                      <Sparkles size={10} strokeWidth={2} />
                      Полная воронка на одной платформе
                    </AiBadge>
                  </div>
                </div>
              </BrowserMock>
            }
          />
        </Container>
      </section>

      {/* ═══ CTA + ФОРМА ═══ */}
      <section
        id="form"
        className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14 max-bp-sm:py-10"
      >
        <Container className="grid grid-cols-2 items-start gap-20 max-bp-lg:grid-cols-1 max-bp-lg:gap-12">
          <div>
            <span className="inline-flex items-center rounded-full bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[0.8px] text-brand1">
              Попробуйте сами
            </span>
            <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
              Запросить демо <em className="not-italic text-brand1">Real-time интервью</em>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.72] text-text2">
              Посмотрите, как ИИ-аватар проводит глубокое собеседование и формирует детальный отчёт.
            </p>
            <ul className="mt-7 flex flex-col gap-3">
              {CTA_POINTS.map(({ Icon: PtIcon, strong, body }, i) => (
                <Reveal key={strong} as="li" delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div
                    className="flex items-start gap-4 rounded-[10px] border border-grey2 bg-grey1 px-4 py-3.5"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-brand1/20 bg-brand1-bg text-brand1">
                      <PtIcon size={18} strokeWidth={1.8} />
                    </span>
                    <div className="text-[13px] text-text2">
                      <strong className="block text-text1">{strong}</strong>
                      {body}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <LeadForm
            title="Запросить демо Real-time интервью"
            subtitle="Покажем, как ИИ-аватар проводит собеседование"
            submitLabel="Запросить демо Real-time интервью"
            leadType="realtime-interview"
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
            Полный цикл найма — <em className="not-italic text-brand1">на одной платформе</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Real-time интервью — финальный этап. А вот что помогает дойти до него быстрее.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-4 max-bp-lg:grid-cols-1">
            {CROSS_SELL.map(({ href, Icon: CIcon, title, text }, i) => (
              <Reveal key={title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <a
                  href={href}
                  className="block h-full rounded-card border border-grey2 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-brand1 hover:shadow-md"
                >
                  <span className="mb-4 inline-flex text-brand1">
                    <CIcon size={26} strokeWidth={1.8} />
                  </span>
                  <div className="mb-2 text-[16px] font-extrabold text-text1">{title}</div>
                  <p className="mb-4 text-[13px] leading-[1.6] text-text2">{text}</p>
                  <span className="inline-flex items-center gap-1 text-[13px] font-bold text-brand1">
                    Подробнее <ArrowRight size={14} strokeWidth={1.8} />
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
          <h2 className="mb-12 text-center text-[clamp(26px,3vw,38px)] font-extrabold tracking-[-0.7px] text-text1">
            Ответы на часто задаваемые вопросы
          </h2>
          <FaqAccordion items={FAQ_ITEMS} />
        </Container>
      </section>
    </main>
  );
}

/* ─── helpers ─── */
type FeatureRowProps = {
  num: string;
  title: string;
  desc: string;
  checks: string[];
  mock: React.ReactNode;
  reverse?: boolean;
};

function FeatureRow({ num, title, desc, checks, mock, reverse }: FeatureRowProps) {
  // .feat-row { gap:56px; padding:56px 0; align-items:center; grid 1fr 1fr;
  //             border-bottom:1px solid var(--grey2); }
  // .feat-row-rev { direction:rtl; } > * { direction:ltr; }
  // <960px: grid-cols-1, gap:32px, direction:ltr (CSS-сброс).
  const wrapperDirCls = reverse
    ? "[direction:rtl] max-bp-lg:[direction:ltr]"
    : "";
  const childDirCls = reverse ? "[direction:ltr]" : "";
  return (
    <div
      className={`grid grid-cols-2 items-center gap-[56px] border-b border-grey2 py-[56px] last:border-b-0 max-bp-lg:grid-cols-1 max-bp-lg:gap-8 ${wrapperDirCls}`}
    >
      <div className={`relative ${childDirCls}`}>{mock}</div>
      <div className={childDirCls}>
        <div className="mb-2.5 text-[11px] font-extrabold uppercase tracking-[2px] text-brand1">
          {num}
        </div>
        <h3 className="mb-[14px] text-[clamp(20px,2vw,26px)] font-extrabold leading-[1.25] tracking-[-0.4px] text-text1">
          {title}
        </h3>
        <p className="mb-5 text-[14px] leading-[1.72] text-text2">{desc}</p>
        <div className="flex flex-col gap-2">
          {checks.map((c) => (
            <div
              key={c}
              className="flex items-start gap-2 text-[13px] font-medium leading-[1.4] text-text1"
            >
              <Check
                size={14}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0 text-brand1"
              />
              {c}
            </div>
          ))}
        </div>
        {/* .feat-cta-btn — outline 1.5px brand1, белый фон;
              hover: brand1 fill, shadow 0 4px 16px rgba(64,150,255,0.3). */}
        <a
          href="#form"
          className="mt-5 inline-flex items-center gap-1.5 rounded-sm border-[1.5px] border-brand1 bg-white px-[22px] py-[11px] font-sans text-[13px] font-bold text-brand1 transition-all duration-200 hover:-translate-y-px hover:bg-brand1 hover:text-white hover:shadow-[0_4px_16px_rgba(64,150,255,0.3)]"
        >
          Попробовать
        </a>
      </div>
    </div>
  );
}

function BrowserMock({ children }: { children: React.ReactNode }) {
  // .feat-screen-inner { border-radius:12px; border:1px solid var(--grey2);
  //                      box-shadow:0 8px 40px rgba(17,38,58,0.12); }
  return (
    <div className="overflow-hidden rounded-card border border-grey2 bg-white shadow-[0_8px_40px_rgba(17,38,58,0.12)]">
      <div className="flex items-center gap-1.5 border-b border-grey2 bg-grey1 px-[14px] py-2.5">
        <span className="size-2.5 rounded-full bg-[#FD6B5B]" />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="size-2.5 rounded-full bg-[#28C840]" />
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Tabs({ tabs, active }: { tabs: string[]; active: number }) {
  return (
    <div className="flex border-b border-grey2 -mx-1">
      {tabs.map((t, i) => (
        <span
          key={t}
          className={`-mb-px border-b-2 px-3.5 py-2.5 text-[11px] font-semibold ${
            i === active
              ? "border-brand1 text-brand1"
              : "border-transparent text-text2"
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function EditorField({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="min-w-[60px] text-[10px] font-semibold text-text2">{label}</span>
      <span
        className={`flex-1 rounded-md border border-grey2 bg-grey1 px-2.5 py-1.5 text-[11px] font-semibold text-text1 ${
          valueClassName ?? ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function AiBadge({ children }: { children: React.ReactNode }) {
  // .feat-editor-ai-badge { border:1px solid rgba(64,150,255,0.2);
  //                         background:var(--brand1-bg); padding:2px 8px; }
  return (
    <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-[rgba(64,150,255,0.2)] bg-brand1-bg px-2 py-[2px] text-[10px] font-semibold text-brand1">
      {children}
    </span>
  );
}

function FeatTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-grey2 bg-grey1 px-2 py-[3px] text-[10px] font-semibold text-text2">
      {children}
    </span>
  );
}

function AnalysisRow({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="flex items-center gap-1.5 text-[10px] text-text2">
      <span className="min-w-[90px] text-[10px]">{label}</span>
      <div className="h-1 flex-1 overflow-hidden rounded-sm bg-grey2">
        <div
          className="h-full rounded-sm bg-brand1"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="min-w-[28px] text-right text-[10px] font-bold text-text1">{pct}%</span>
    </div>
  );
}

function QCard({
  text,
  badge,
  tone,
  comp,
}: {
  text: string;
  badge: string;
  tone: "basic" | "advanced";
  comp: string;
}) {
  const badgeClass =
    tone === "advanced"
      ? "bg-brand2-bg text-brand2"
      : "bg-brand1-bg text-brand1";
  return (
    <div className="rounded-md border border-grey2 bg-white px-3 py-2.5">
      <div className="mb-1.5 text-[11px] font-semibold leading-[1.5] text-text1">{text}</div>
      <div className="flex items-center gap-1.5">
        <span
          className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${badgeClass}`}
        >
          {badge}
        </span>
        <span className="text-[9px] font-medium text-text2">{comp}</span>
      </div>
    </div>
  );
}



