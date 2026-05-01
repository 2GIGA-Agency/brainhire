import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionTag } from "@/components/ui/SectionTag";
import { FaqAccordion, type FaqItem } from "@/components/ui/FaqAccordion";
import { LeadForm } from "@/components/interactive/LeadForm";
import { AudienceTabs, type AudienceItem } from "@/components/interactive/AudienceTabs";
import { Reveal } from "@/components/interactive/Reveal";
import {
  ArrowRight,
  Clock,
  AlertTriangle,
  UserX,
  FileText,
  Zap,
  BarChart3,
  Send,
  FileUp,
  Video,
  UserCheck,
  AlertCircle,
  Check,
  CheckCircle2,
  Search,
  Users,
  PenLine,
  ArrowUpRight,
  Activity,
  MessageSquare,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────────
   Static data
   ──────────────────────────────────────────────────────────────────── */

const HERO_PROOF = [
  "Анализ резюме за 15 минут",
  "Интеграция с hh.ru",
  "Объективный скоринг по единым критериям",
];

const TICKER_ITEMS = [
  { Icon: Zap, text: "Анализ резюме за 15 минут" },
  { Icon: Activity, text: "Интеграция с hh.ru и другими площадками" },
  { Icon: BarChart3, text: "Объективный скоринг кандидатов" },
  { Icon: Send, text: "Автоматические приглашения на интервью" },
  { Icon: FileText, text: "Параллельная обработка сотен резюме" },
  { Icon: FileText, text: "Детализированные отчёты по кандидатам" },
];

const PAINS = [
  {
    Icon: Clock,
    title: "15-20 минут на одно резюме",
    text:
      "Рекрутер тратит 15-20 минут на просмотр одного резюме. При 100+ откликах — это целые рабочие недели на скрининг, вместо работы с лучшими кандидатами.",
  },
  {
    Icon: AlertTriangle,
    title: "Субъективная оценка кандидатов",
    text:
      "Качество отбора зависит от усталости и настроения рекрутера. Разные специалисты оценивают одно и то же резюме по-разному, нет единых критериев.",
  },
  {
    Icon: UserX,
    title: "Потеря кандидатов в потоке откликов",
    text:
      "Невозможно эффективно обработать сотни резюме вручную. Подходящие кандидаты теряются среди нерелевантных откликов и уходят к конкурентам.",
  },
  {
    Icon: FileText,
    title: "Долгий процесс — плохое впечатление",
    text:
      "Задержки в ответах портят впечатление о компании. Каждый дополнительный день увеличивает вероятность потери кандидата на 10%.",
  },
];

const STATS = [
  { num: "5x", desc: ["быстрее обработка", "откликов"] },
  { num: "15 мин", desc: ["от отклика", "до оценки резюме"] },
  { num: "87%", desc: ["точность скоринга", "кандидатов"] },
  { num: "100+", desc: ["резюме одновременно", "без потери качества"] },
];

const STEPS = [
  {
    Icon: FileUp,
    num: "Шаг 1",
    time: "авто",
    title: "Поступление резюме",
    text:
      "Резюме поступают из интегрированных источников или загружаются вручную. Система принимает любой формат: PDF, DOC, текстовые файлы",
  },
  {
    Icon: Zap,
    num: "Шаг 2",
    time: "15 мин",
    title: "Автоматический анализ резюме",
    text:
      "ИИ проводит глубокую оценку резюме, извлекая структурированную информацию: опыт, навыки, образование, достижения. Оценщик резюме AI сверяет данные с требованиями вакансии",
  },
  {
    Icon: BarChart3,
    num: "Шаг 3",
    time: "авто",
    title: "Скоринг и ранжирование",
    text:
      "Каждый кандидат получает численную оценку соответствия. Система формирует рейтинг для приоритизации работы с кандидатами",
  },
  {
    Icon: Send,
    num: "Шаг 4",
    time: "авто",
    title: "Автоматические действия",
    text:
      "На основе оценок кандидатов система автоматически приглашает сильных на следующий этап или отправляет отказы нерелевантным",
  },
  {
    Icon: Video,
    num: "Шаг 5",
    time: "20 мин",
    title: "Видеоинтервью с AI",
    text:
      "Подходящие кандидаты проходят автоматическое интервью. Как ИИ оценивает ответы? Система анализирует содержание, речь и поведение для формирования полного портрета",
  },
  {
    Icon: UserCheck,
    num: "Шаг 6",
    time: "финал",
    title: "Передача HR-специалисту",
    text:
      "Лучшие кандидаты с детальными оценками передаются специалисту для финального собеседования и принятия решения",
  },
];

const COMPARE_BAD = [
  { Icon: Clock, text: "15-20 минут на анализ резюме одного кандидата" },
  { Icon: AlertCircle, text: "Субъективная оценка кандидата, зависящая от специалиста" },
  { Icon: UserX, text: "Невозможно эффективно обработать сотни резюме" },
  { Icon: FileText, text: "Риск пропустить подходящего кандидата в потоке откликов" },
  { Icon: Clock, text: "Задержки в ответах портят впечатление о компании" },
];

const COMPARE_GOOD = [
  { Icon: Zap, text: "Мгновенный анализ резюме и оценка резюме за секунды" },
  { Icon: Activity, text: "Объективные оценки кандидатов по единым критериям с AI" },
  { Icon: FileText, text: "Параллельное сканирование резюме любого объема" },
  { Icon: Search, text: "Умные фильтры резюме выявляют всех релевантных кандидатов" },
  { Icon: Clock, text: "Автоматическая работа с кандидатами 24/7" },
];

const LOGOS: Array<{ href: string; render: React.ReactNode }> = [
  {
    href: "https://www.simbirsoft.com/",
    render: (
      <span className="text-[18px] font-extrabold tracking-[-0.5px] text-[#1a1a2e]">
        Simbir<span className="text-[#e03030]">S</span>oft
      </span>
    ),
  },
  {
    href: "https://bssys.com/",
    render: (
      <span className="rounded bg-[#1a3a8a] px-2.5 py-[5px] text-[15px] font-black tracking-[1px] text-white">
        BSS
      </span>
    ),
  },
  {
    href: "https://3logic.ru/",
    render: (
      <span className="text-[15px] font-extrabold tracking-[-0.3px] text-[#1a1a1a]">
        3<span className="text-[#e03030]">LOGIC</span>
        <br />
        <span className="text-[9px] font-semibold tracking-[1px] text-[#555]">GROUP</span>
      </span>
    ),
  },
  {
    href: "https://kazan.rt.ru/",
    render: (
      <span className="text-[13px] font-bold tracking-[0.5px] text-[#1a1a1a]">
        РОСТЕЛЕКОМ
      </span>
    ),
  },
  {
    href: "https://e-flops.ru/",
    render: (
      <span className="text-[16px] font-extrabold tracking-[-0.5px] text-[#222]">
        e<span className="text-brand1">-</span>flops
      </span>
    ),
  },
  {
    href: "https://itpeoplegroup.ru/",
    render: (
      <span className="border-2 border-[#1a1a1a] px-2 py-1 text-[12px] font-extrabold uppercase tracking-[1.5px] text-[#1a1a1a]">
        IT PEOPLE
      </span>
    ),
  },
  {
    href: "https://moby.estate/",
    render: (
      <span className="text-[17px] font-extrabold tracking-[-0.5px] text-[#2b4de3]">
        moby
      </span>
    ),
  },
  {
    href: "https://www.hr-rocket.ru/",
    render: (
      <span className="text-[14px] font-extrabold tracking-[0.5px] text-[#1a1a1a]">
        HR ROCKET
      </span>
    ),
  },
  {
    href: "https://prodamus.ru/",
    render: (
      <span className="text-[15px] font-bold tracking-[-0.3px] text-[#6c3db5]">
        prodamus
      </span>
    ),
  },
  {
    href: "https://www.penoplex.ru/",
    render: (
      <span className="text-[13px] font-extrabold tracking-[0.5px] text-[#e03030]">
        PENOPLEX
      </span>
    ),
  },
];

const AUDIENCES: AudienceItem[] = [
  {
    tab: "HR-отделам",
    title: (
      <>
        Рекрутер обрабатывает отклики{" "}
        <em className="not-italic text-brand1">в 5 раз быстрее</em>
      </>
    ),
    body:
      "Вместо часов на просмотр резюме — мгновенный анализ и скоринг. Освободите время для работы с лучшими кандидатами, а не для чтения сотен резюме.",
    checks: [
      "Автоматический скрининг всех откликов",
      "Единые критерии оценки для всех рекрутеров",
      "Детализированные карточки кандидатов",
    ],
    stats: [
      { num: "5x", desc: "быстрее\nскрининг" },
      { num: "15 мин", desc: "от отклика\nдо оценки" },
      { num: "87%", desc: "точность" },
    ],
  },
  {
    tab: "Рекрутинговым агентствам",
    title: (
      <>
        Масштабируйте подбор{" "}
        <em className="not-italic text-brand1">без увеличения штата</em>
      </>
    ),
    body:
      "Обрабатывайте тысячи откликов по десяткам вакансий одновременно. ИИ обеспечивает единое качество скрининга для каждого клиента.",
    checks: [
      "Параллельная обработка откликов по всем вакансиям",
      "Единый стандарт оценки для всех клиентов",
      "Автоматические отчёты для заказчиков",
    ],
    stats: [
      { num: "10x", desc: "больше\nвакансий" },
      { num: "24/7", desc: "автоматический\nскрининг" },
    ],
  },
  {
    tab: "IT-компаниям",
    title: (
      <>
        Находите технических специалистов{" "}
        <em className="not-italic text-brand1">точнее и быстрее</em>
      </>
    ),
    body:
      "ИИ понимает специфику IT-стека и технических навыков. Система точно оценивает соответствие требованиям даже при нестандартном описании опыта в резюме.",
    checks: [
      "Распознавание технического стека и уровня специалиста",
      "Оценка релевантности проектного опыта",
      "Интеграция с hh.ru и специализированными IT-площадками",
    ],
    stats: [
      { num: "87%", desc: "точность\nоценки" },
      { num: "100+", desc: "резюме\nодновременно" },
    ],
  },
  {
    tab: "Стартапам",
    title: (
      <>
        Наймите команду быстро{" "}
        <em className="not-italic text-brand1">без выделенного HR</em>
      </>
    ),
    body:
      "В стартапах часто нет HR-отдела. ИИ берёт на себя весь скрининг — от получения резюме до приглашения на интервью. Фаундеры работают только с финалистами.",
    checks: [
      "Полный цикл скрининга без HR-специалиста",
      "Первые 100 кандидатов бесплатно",
      "От отклика до интервью за 15 минут",
    ],
    stats: [
      { num: "100", desc: "кандидатов\nбесплатно" },
      { num: "15 мин", desc: "до оценки" },
    ],
  },
  {
    tab: "Корпорациям",
    title: (
      <>
        Стандартизируйте найм{" "}
        <em className="not-italic text-brand1">во всех подразделениях</em>
      </>
    ),
    body:
      "Единые критерии оценки для всех филиалов и департаментов. Прозрачная аналитика по всем этапам воронки найма для принятия стратегических решений.",
    checks: [
      "Единый стандарт скрининга для всех подразделений",
      "Комплексная аналитика по каналам и эффективности",
      "Масштабирование без потери качества оценки",
    ],
    stats: [
      { num: "1", desc: "стандарт\nдля всех" },
      { num: "5x", desc: "быстрее\nпроцесс" },
    ],
  },
];

const CTA_POINTS = [
  {
    Icon: Zap,
    title: "Бесплатный анализ первых 100 резюме",
    text: "Без регистрации карты, без обязательств",
  },
  {
    Icon: Send,
    title: "Интеграция с hh.ru и другими площадками",
    text: "Автоматический сбор откликов",
  },
  {
    Icon: MessageSquare,
    title: "Объективный скоринг по единым критериям",
    text: "Детализированные отчёты по каждому кандидату",
  },
];

const CROSS_SELL = [
  {
    Icon: PenLine,
    href: "https://brainhire.ru/ai-vacancy-creation",
    title: "ИИ-создание вакансий",
    text: "Генерация профессиональных описаний вакансий за 30 секунд. SEO-оптимизация для job-бордов.",
  },
  {
    Icon: Video,
    href: "https://brainhire.ru/ai-videointerview",
    title: "ИИ-видеоинтервью",
    text: "Первичное интервью с каждым кандидатом без участия рекрутера. Видео-ответы, прокторинг и оценка компетенций.",
  },
  {
    Icon: Users,
    href: "https://brainhire.ru/ai-staff-scoring",
    title: "ИИ-оценка персонала",
    text: "Объективная оценка soft skills и компетенций. Единые критерии для всех кандидатов без предвзятости.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Как работает анализ резюме с помощью AI?",
    a: "Система использует передовые языковые модели (LLM) для глубокого анализа каждого резюме. ИИ извлекает структурированную информацию — опыт, навыки, образование, достижения — и сверяет их с требованиями вакансии. Каждый кандидат получает численную оценку соответствия. Весь процесс занимает около 15 минут после поступления отклика.",
  },
  {
    q: "Можно ли использовать систему для проверки резюме и проведения интервью?",
    a: "Да, BRaiN HR объединяет анализ резюме и ИИ-видеоинтервью в единый процесс. После автоматической оценки резюме подходящие кандидаты получают приглашение на ИИ-видеоинтервью по уникальной ссылке. Система оценивает содержание ответов, речь и поведение, формируя полный портрет кандидата.",
  },
  {
    q: "Сколько времени занимает анализ резюме?",
    a: "Оценка резюме осуществляется в течение 15 минут после поступления отклика. Система параллельно обрабатывает неограниченное количество резюме без потери качества. При массовых откликах сотни резюме анализируются одновременно.",
  },
  {
    q: "Как кандидаты могут оптимизировать свои резюме для AI?",
    a: "Система использует ИИ для распознавания непрямых упоминаний навыков и опыта, анализируя контекст и описание обязанностей. Кандидатам рекомендуется указывать конкретные навыки, технологии и достижения с цифрами. Структурированное резюме с чёткими разделами повышает точность анализа.",
  },
  {
    q: "Заменяет ли AI специалиста по подбору?",
    a: "Нет, ИИ не заменяет HR-специалиста, а расширяет его возможности. Система автоматизирует рутинные задачи — скрининг резюме, первичную оценку и коммуникацию — позволяя рекрутеру фокусироваться на стратегических задачах и личном общении с лучшими кандидатами. Финальное решение всегда остаётся за человеком.",
  },
  {
    q: "Можно ли выгружать резюме и профиль кандидата?",
    a: "Да, вы можете выгрузить резюме и полный профиль кандидата с оценками из системы. Доступна как выгрузка по одному кандидату, так и пакетная выгрузка всех кандидатов по вакансии в удобном формате.",
  },
  {
    q: "Как увидеть лог решения ИИ: по каким параметрам строилась оценка?",
    a: "В карточке каждого кандидата доступен детализированный отчёт с разбивкой оценки по параметрам: соответствие навыков, релевантность опыта, образование и другие критерии. Вы видите, какие именно данные из резюме повлияли на итоговую оценку.",
  },
  {
    q: "Можно ли для одной вакансии включить авторазбор, а для другой вести ручной скрининг?",
    a: "Да, настройки скрининга задаются индивидуально для каждой вакансии. Вы можете включить полностью автоматический разбор откликов для одних вакансий и вести ручной скрининг для других.",
  },
  {
    q: "Можно ли редактировать критерии оценки и задать вес критериям?",
    a: "Да, вы можете настраивать критерии оценки (soft skills, технические навыки, мотивация) и задавать вес каждому критерию. Например, для технической позиции можно увеличить влияние hard skills. Также можно задать эталонные ответы для более точной оценки.",
  },
  {
    q: "Можно ли вручную изменить статус кандидата?",
    a: "Да, вы можете вручную изменить статус любого кандидата — например, вернуть в работу кандидата, которого система отправила в отказ. Все оценки и история сохраняются для прозрачности процесса.",
  },
];

/* ────────────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────────────── */

export function ResumeAnalysisPage() {
  return (
    <main>
      {/* ═══ 1. HERO ═══ */}
      <section className="bg-white py-20 pb-[88px] max-bp-lg:py-14">
        <Container className="grid grid-cols-[1fr_440px] items-center gap-[72px] max-bp-lg:grid-cols-1 max-bp-lg:gap-10">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand1/30 bg-brand1-bg py-[5px] pl-2.5 pr-3.5 text-[12px] font-semibold tracking-[0.3px] text-brand1">
              <span className="size-1.5 rounded-full bg-brand1 animate-pulse-dot" />
              Для HR-директоров, рекрутеров и нанимающих менеджеров
            </span>
            <h1 className="text-[clamp(36px,4vw,52px)] font-extrabold leading-[1.1] tracking-[-1.2px] text-text1">
              ИИ-анализ резюме:
              <br />
              автоматизируйте отбор
              <br />
              кандидатов <em className="not-italic text-brand1">за минуты</em>
            </h1>
            <p className="mt-5 max-w-[500px] text-[17px] font-normal leading-[1.7] text-text2">
              Интеллектуальная платформа для мгновенного скрининга резюме и оценки кандидата. Обрабатывайте сотни резюме одновременно, получая точные оценки кандидатов и сокращая время найма в 5 раз с помощью инструментов ИИ
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="https://brainhire.ru/signup" variant="hero-primary" external>
                Проанализировать резюме бесплатно
                <ArrowRight size={16} strokeWidth={1.8} />
              </Button>
              <Button href="#form" variant="hero-outline">
                Хочу демонстрацию
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
              {HERO_PROOF.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-[7px] text-[13px] font-medium text-text2"
                >
                  <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-brand1 bg-brand1-bg text-brand1">
                    <CheckCircle2 size={10} strokeWidth={2.2} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* RESUME CARD */}
          <aside className="overflow-hidden rounded-card border border-grey2 bg-white shadow-md">
            <div className="flex items-center gap-2 border-b border-grey2 bg-grey1 px-[18px] py-3.5 text-[12px] font-semibold text-text2">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#FD6B5B]" />
                <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="size-2.5 rounded-full bg-[#28C840]" />
              </div>
              <span>Анализ резюме — Финансовый аналитик</span>
            </div>
            <div className="flex flex-col gap-2.5 p-3.5">
              <div className="flex items-center gap-2.5 rounded-sm border border-grey2 bg-grey1 px-3.5 py-2.5">
                <span className="min-w-[65px] text-[11px] font-semibold text-text2">
                  Кандидат
                </span>
                <span className="text-[12px] font-semibold text-text1">Иванов А.С.</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-sm border border-grey2 bg-grey1 px-3.5 py-2.5">
                <span className="min-w-[65px] text-[11px] font-semibold text-text2">
                  Опыт
                </span>
                <span className="text-[12px] font-semibold text-text1">5 лет</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-sm border border-grey2 bg-grey1 px-3.5 py-2.5">
                <span className="min-w-[65px] text-[11px] font-semibold text-text2">
                  Должность
                </span>
                <span className="text-[12px] font-semibold text-text1">
                  Финансовый аналитик
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-sm border border-brand1/15 bg-brand1/[0.04] px-3.5 py-2.5 text-[11px] font-semibold text-brand1">
                <span className="size-1.5 rounded-full bg-brand1 animate-pulse-dot" />
                ИИ анализирует резюме...
              </div>
              <div className="rounded-sm border border-grey2 bg-white px-3.5 py-2.5">
                <div className="mb-1.5 text-[11px] font-bold text-text1">
                  Ключевые навыки
                </div>
                <div className="relative pl-3 text-[11px] leading-[1.6] text-text2 before:absolute before:left-0 before:top-[7px] before:size-1 before:rounded-full before:bg-brand1">
                  Финансовое моделирование и прогнозирование
                </div>
                <div className="relative pl-3 text-[11px] leading-[1.6] text-text2 before:absolute before:left-0 before:top-[7px] before:size-1 before:rounded-full before:bg-brand1">
                  Анализ инвестиционных проектов
                </div>
                <div className="relative pl-3 text-[11px] leading-[1.6] text-text2 before:absolute before:left-0 before:top-[7px] before:size-1 before:rounded-full before:bg-brand1">
                  Power BI / Excel / SQL
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {["Excel", "Power BI", "SQL", "Фин. анализ"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-brand1/25 bg-brand1-bg px-2 py-[3px] text-[10px] font-semibold text-brand1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-0.5 flex items-center gap-[7px] rounded-sm border border-brand1/25 bg-brand1-bg px-3.5 py-2.5 text-[12px] font-medium leading-[1.4] text-brand3">
                <Clock size={14} strokeWidth={1.8} className="shrink-0 text-brand1" />
                <span className="flex-1">
                  Оценка соответствия: <strong className="font-bold text-brand1">87%</strong> — приглашён на ИИ-интервью
                </span>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      {/* ═══ 2. TICKER ═══ */}
      <div className="overflow-hidden border-y border-grey2 bg-grey1 py-3.5">
        <div className="flex w-max animate-ticker">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map(({ Icon: TickerIcon, text }, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap px-8 text-[13px] font-medium text-text2"
            >
              <TickerIcon size={16} strokeWidth={1.8} className="shrink-0 text-brand1" />
              <b className="font-semibold text-text1">{text}</b>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ 3. PAINS ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Почему ручной скрининг резюме
            <br />
            <em className="not-italic text-brand1">работает против вас</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Каждый день ручной обработки откликов — это упущенные кандидаты и потраченное время рекрутера.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 max-bp-md:grid-cols-1">
            {PAINS.map(({ Icon: PainIcon, title, text }, i) => (
              <Reveal key={title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <article
                  className="h-full rounded-card border border-grey2 bg-white p-7 shadow-soft"
                >
                  <span className="mb-3.5 inline-flex text-brand1">
                    <PainIcon size={26} strokeWidth={1.8} />
                  </span>
                  <h3 className="mb-2 text-[16px] font-extrabold text-text1">{title}</h3>
                  <p className="text-[14px] leading-[1.65] text-text2">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 4. STATS BAR ═══ */}
      <div className="border-y border-grey2 bg-grey1 py-12">
        <Container>
          <div className="grid grid-cols-4 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-2">
            {STATS.map((s, i) => (
              <Reveal key={s.num} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div
                  className={`px-12 py-8 text-left max-bp-sm:px-6 ${
                    i < STATS.length - 1
                      ? "border-r border-grey2 max-bp-lg:[&:nth-child(2)]:border-r-0 max-bp-sm:border-r-0 max-bp-sm:border-b max-bp-sm:border-grey2"
                      : "max-bp-sm:border-r-0"
                  }`}
                >
                  <div className="mb-3 text-[48px] font-extrabold leading-none tracking-[-2px] text-text1">
                    <span className="text-brand1">{s.num}</span>
                  </div>
                  <div className="text-[13px] font-medium leading-[1.55] text-text2">
                    {s.desc.map((line, j) => (
                      <span key={j}>
                        {line}
                        {j < s.desc.length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-center text-[11px] leading-[1.5] text-text2">
            *По данным клиентов BRaiN HR, 2025-2026.
          </p>
        </Container>
      </div>

      {/* ═══ 5. STEPS ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14">
        <Container>
          <SectionTag>Как это работает</SectionTag>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Как работает анализ резюме:
            <br />
            <em className="not-italic text-brand1">от отклика до найма</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Полный цикл обработки кандидатов — от поступления резюме до передачи HR-специалисту.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-4 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
            {STEPS.map(({ Icon: StepIcon, num, time, title, text }, i) => (
              <Reveal key={title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <article
                  className="h-full rounded-card border border-grey2 bg-white p-7 shadow-soft"
                >
                  <div className="mb-3 flex items-center gap-2 text-[12px] font-bold text-brand1">
                    {num}
                    <span className="rounded-full border border-brand1/25 bg-brand1-bg px-2 py-[2px] text-[10px] font-bold uppercase tracking-[0.5px] text-brand1">
                      {time}
                    </span>
                  </div>
                  <span className="mb-3 inline-flex text-brand1">
                    <StepIcon size={26} strokeWidth={1.8} />
                  </span>
                  <div className="mb-2 text-[16px] font-extrabold text-text1">{title}</div>
                  <div className="text-[13px] leading-[1.65] text-text2">{text}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 6. COMPARE ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Ускорьте процесс найма
            <br />
            <em className="not-italic text-brand1">с помощью функции автоматизации</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Ручной скрининг отнимает дни и пропускает сильных кандидатов. Сравните сами.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 max-bp-lg:grid-cols-1">
            {/* Bad column */}
            <div className="overflow-hidden rounded-card border border-grey2 bg-white shadow-soft">
              <div className="flex items-center gap-2.5 border-b border-grey2 bg-grey1 px-6 py-4 text-[14px] font-bold text-text2">
                <AlertCircle size={16} strokeWidth={1.8} className="text-text2" />
                Ручной метод
              </div>
              <div className="py-1">
                {COMPARE_BAD.map(({ Icon: BadIcon, text }) => (
                  <div
                    key={text}
                    className="flex items-start gap-3 border-b border-grey1 px-6 py-3 text-[14px] text-text2 last:border-b-0"
                  >
                    <span className="mt-0.5 shrink-0 text-[#F04438]">
                      <BadIcon size={18} strokeWidth={1.8} />
                    </span>
                    {text}
                  </div>
                ))}
              </div>
              <div
                className="flex items-center gap-2 border-t border-grey2 bg-grey1 px-[22px] py-3.5 text-[13px] font-bold"
                style={{ color: "#FF7401" }}
              >
                <Clock size={18} strokeWidth={1.8} style={{ color: "#FF7401" }} />
                Долго, субъективно, кандидаты теряются
              </div>
            </div>

            {/* Good column */}
            <div className="overflow-hidden rounded-card border border-brand1 bg-white shadow-soft">
              <div className="flex items-center gap-2.5 border-b border-brand1/20 bg-brand1-bg px-6 py-4 text-[14px] font-bold text-brand3">
                <CheckCircle2 size={16} strokeWidth={1.8} className="text-brand1" />
                С BRaiN HR
                <span className="ml-auto rounded-full bg-brand1 px-2.5 py-[3px] text-[11px] font-bold text-white">
                  Рекомендуем
                </span>
              </div>
              <div className="py-1">
                {COMPARE_GOOD.map(({ Icon: GoodIcon, text }) => (
                  <div
                    key={text}
                    className="flex items-start gap-3 border-b border-grey1 px-6 py-3 text-[14px] text-text1 last:border-b-0"
                  >
                    <span className="mt-0.5 shrink-0 text-brand1">
                      <GoodIcon size={18} strokeWidth={1.8} />
                    </span>
                    {text}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 border-t border-brand1/20 bg-brand1-bg px-[22px] py-3.5 text-[13px] font-bold text-brand1">
                <Zap size={18} strokeWidth={1.8} />
                Быстро, объективно, ни один кандидат не потерян
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ 7. LOGOS ═══ */}
      <div className="border-y border-grey2 bg-white py-8">
        <Container>
          <div className="mb-6 text-center text-[12px] font-semibold uppercase tracking-[1px] text-text2">
            Нам доверяют 50+ компаний
          </div>
        </Container>
        <div className="relative overflow-hidden before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-[2] before:w-20 before:bg-gradient-to-r before:from-white before:to-transparent after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-[2] after:w-20 after:bg-gradient-to-l after:from-white after:to-transparent">
          <div className="flex w-max animate-ticker items-center hover:[animation-play-state:paused]">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <a
                key={i}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[68px] shrink-0 items-center justify-center whitespace-nowrap border-r border-grey2 px-9 leading-[1.2] opacity-60 transition-opacity hover:opacity-100"
              >
                {logo.render}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ 8. AUDIENCE ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <SectionTag>Кому подойдёт</SectionTag>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Кому будет полезен сервис
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Автоматизируйте скрининг резюме и проверку резюме, фокусируясь на общении с лучшими кандидатами
          </p>

          <AudienceTabs audiences={AUDIENCES} />
        </Container>
      </section>

      {/* ═══ 9. FEATURE ROWS — мокапы интерфейсов ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14">
        <Container>
          <SectionTag>Возможности платформы</SectionTag>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Автоматизация анализа резюме
            <br />
            <em className="not-italic text-brand1">с помощью ИИ</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            Полный цикл обработки резюме — от получения отклика до формирования рейтинга кандидатов.
          </p>

          <div className="mt-12">
            {/* Feature 1: Мгновенный анализ резюме (мокап слева, текст справа) */}
            <FeatRow
              num="01"
              title="Мгновенный анализ резюме и автоматическое приглашение"
              desc="Забудьте о ручной проверке резюме. Наш ИИ агент мгновенно обрабатывает входящие отклики, анализируя текст резюме на соответствие требованиям вакансии. BRaiN HR автоматически приглашает соответствующих кандидатов на прохождение AI видеоинтервью по уникальной ссылке. Система использует передовые LLM и инструменты для разбора резюме, выявляя ключевые навыки и опыт, чтобы подтвердить квалификацию. Специалист по подбору получает карточку кандидата с оценкой резюме и детализацией нужной информации (опыт, навыки, список должностей с возможностью открыть резюме)"
              checks={[
                "Автоматический разбор PDF, DOC и текстовых файлов",
                "Извлечение структурированных данных: навыки, опыт, образование",
                "Автоприглашение подходящих кандидатов на ИИ-интервью",
              ]}
              mockup={
                <FeatBrowser>
                  <FeatMockEditor>
                    <FeatTabs tabs={[
                      { label: "Резюме", active: true },
                      { label: "Оценка" },
                      { label: "Интервью" },
                    ]} />
                    <div className="p-[14px]">
                      <EditorField label="Кандидат" value="Петров И.В." />
                      <EditorField label="Должность" value="Python-разработчик" />
                      <EditorField label="Опыт" value="4 года" />
                      <EditorGenerated title="Ключевые навыки" badge="ИИ проанализировано">
                        Python, Django, PostgreSQL. Опыт разработки REST API и микросервисной архитектуры. Работа с Docker и CI/CD.
                      </EditorGenerated>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {["Python", "Django", "PostgreSQL", "Docker"].map((t) => (
                          <FeatTag key={t}>{t}</FeatTag>
                        ))}
                      </div>
                    </div>
                  </FeatMockEditor>
                </FeatBrowser>
              }
            />

            {/* Feature 2: Автоматический скоринг (текст слева, мокап справа) */}
            <FeatRow
              reverse
              num="02"
              title="Автоматический скоринг и оценка кандидатов"
              desc="Система проводит видеоинтервью с AI, оценивая каждый вопрос и выставляя общий балл за интервью с детализированным отчетом. В отчете уточняются все сильные и слабые стороны кандидата, подчеркивая в каких вопросах были выявлены требуемые навыки. Это позволяет мгновенно выявить топ-кандидатов среди сотен резюме и приоритизировать работу по найму"
              checks={[
                "Объективная оценка по единым критериям для всех кандидатов",
                "Детализированный отчёт с сильными и слабыми сторонами",
                "Мгновенное ранжирование для приоритизации работы",
              ]}
              mockup={
                <FeatBrowser>
                  <FeatMockHeader>Скоринг кандидатов — Python-разработчик</FeatMockHeader>
                  <FeatQuestionsBody>
                    <FeatQCard text="Петров И.В. — 4 года опыта" badge="92%" badgeTone="basic" competency="Высокое соответствие" />
                    <FeatQCard text="Сидоров К.А. — 3 года опыта" badge="78%" badgeTone="basic" competency="Хорошее соответствие" />
                    <FeatQCard text="Козлов Д.М. — 2 года опыта" badge="65%" badgeTone="advanced" competency="Среднее соответствие" />
                    <div className="px-3 py-2 text-center">
                      <AiBadge>3 кандидата оценены</AiBadge>
                    </div>
                  </FeatQuestionsBody>
                </FeatBrowser>
              }
            />

            {/* Feature 3: Интеграция (мокап слева, текст справа) */}
            <FeatRow
              num="03"
              title="Интеграция с job-платформами"
              desc="Подключайте hh.ru и другие платформы по поиску работы и получайте автоматический анализ резюме из всех каналов в единой системе. Как ИИ обрабатывает отклики? Каждое резюме проходит мгновенную оценку сразу после поступления. Работа с кандидатами становится централизованной: все данные, оценки кандидатов и коммуникация в одном интерфейсе"
              checks={[
                "Подключение hh.ru, Avito Работа, SuperJob",
                "Все отклики и данные в одном интерфейсе",
                "Мгновенная оценка сразу после поступления",
              ]}
              mockup={
                <FeatBrowser>
                  <FeatMockEditor>
                    <FeatTabs tabs={[
                      { label: "Источники", active: true },
                      { label: "Отклики" },
                      { label: "Статистика" },
                    ]} />
                    <div className="p-[14px]">
                      <EditorField label="Площадка" value="hh.ru" />
                      <EditorField label="Статус" value="Подключено" valueClassName="text-brand1" />
                      <EditorGenerated title="Новые отклики" badge="Обработка в реальном времени">
                        47 откликов за сегодня. 12 кандидатов прошли скрининг. 8 приглашены на ИИ-интервью.
                      </EditorGenerated>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {["hh.ru", "Avito Работа", "SuperJob"].map((t) => (
                          <FeatTag key={t}>{t}</FeatTag>
                        ))}
                      </div>
                    </div>
                  </FeatMockEditor>
                </FeatBrowser>
              }
            />

            {/* Feature 4: Аналитика (текст слева, мокап справа) */}
            <FeatRow
              reverse
              num="04"
              title="Аналитика и отчеты"
              desc="Процесс оценки резюме осуществляется в течение 15 минут после отклика. Вы можете отслеживать все метрики работы с кандидатами: кол-во и качество откликов, процент отказов и эффективность каналов привлечения. Формат отчетов настраивается под потребности бизнеса, помогая принимать решения на основе данных"
              checks={[
                "Метрики по каждому каналу привлечения",
                "Конверсия воронки в реальном времени",
                "Настраиваемые отчёты под потребности бизнеса",
              ]}
              mockup={
                <FeatBrowser>
                  <FeatMockHeader>Аналитика воронки найма</FeatMockHeader>
                  <FeatQuestionsBody>
                    <FeatQCard text="Откликов получено: 247" badge="hh.ru — 189" badgeTone="basic" competency="Avito — 58" />
                    <FeatQCard text="Прошли скрининг: 84 (34%)" badge="Приглашены" badgeTone="basic" competency="на ИИ-интервью" />
                    <FeatQCard text="Финалисты: 12 кандидатов" badge="Готовы к найму" badgeTone="advanced" competency="Средний балл: 86%" />
                    <div className="px-3 py-2 text-center">
                      <AiBadge>Обновлено 5 мин назад</AiBadge>
                    </div>
                  </FeatQuestionsBody>
                </FeatBrowser>
              }
            />

            {/* Feature 5: Умные фильтры (мокап слева, текст справа) */}
            <FeatRow
              num="05"
              title="Умные фильтры резюме"
              desc="Настраиваемые критерии отбора позволяют точно определить подходящих кандидатов. Система учитывает прямые и непрямые упоминания навыков, анализируя контекст и описание обязанностей в резюме. Умные фильтры резюме выявляют всех релевантных кандидатов, даже если навыки описаны нестандартно."
              checks={[
                "Контекстный анализ непрямых упоминаний навыков",
                "Настраиваемый порог соответствия",
                "Фильтрация по навыкам, опыту и образованию",
              ]}
              mockup={
                <FeatBrowser>
                  <FeatMockEditor>
                    <FeatTabs tabs={[
                      { label: "Фильтры", active: true },
                      { label: "Результаты" },
                    ]} />
                    <div className="p-[14px]">
                      <EditorField label="Навыки" value="Python, SQL, Machine Learning" />
                      <EditorField label="Опыт" value="от 3 лет" />
                      <EditorField label="Порог" value={"Соответствие ≥ 70%"} />
                      <EditorGenerated title="Результат фильтрации" badge="Контекстный анализ ИИ">
                        Из 156 откликов отобрано 23 кандидата. Учтены прямые и непрямые упоминания навыков в контексте опыта.
                      </EditorGenerated>
                    </div>
                  </FeatMockEditor>
                </FeatBrowser>
              }
            />

            {/* Feature 6: 24/7 (текст слева, мокап справа) */}
            <FeatRow
              reverse
              num="06"
              title="Работа с кандидатами 24/7"
              desc="Система обрабатывает отклики круглосуточно без участия рекрутера. Каждый кандидат получает ответ в течение минут, а не дней. Автоматическая работа с кандидатами 24/7 — подходящие получают приглашение на интервью, нерелевантные — корректный отказ."
              checks={[
                "Круглосуточная обработка без участия рекрутера",
                "Автоматические приглашения и отказы",
                "Ответ кандидату в течение минут, а не дней",
              ]}
              mockup={
                <FeatBrowser>
                  <FeatMockHeader>Автоматические действия</FeatMockHeader>
                  <FeatQuestionsBody>
                    <FeatQCard
                      text="23:47 — Отклик от Смирнова Е.А."
                      badge="Оценено: 81%"
                      badgeTone="basic"
                      competency="Приглашение отправлено"
                    />
                    <FeatQCard
                      text="02:15 — Отклик от Волкова Р.С."
                      badge="Оценено: 42%"
                      badgeTone="advanced"
                      competency="Автоотказ"
                    />
                    <FeatQCard
                      text="06:30 — Отклик от Новиковой А.П."
                      badge="Оценено: 93%"
                      badgeTone="basic"
                      competency="Приглашение отправлено"
                    />
                    <div className="px-3 py-2 text-center">
                      <AiBadge>Обработка 24/7 без участия рекрутера</AiBadge>
                    </div>
                  </FeatQuestionsBody>
                </FeatBrowser>
              }
            />
          </div>
        </Container>
      </section>

      {/* ═══ 10. CTA + FORM ═══ */}
      <section
        id="form"
        className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14"
      >
        <Container className="grid grid-cols-2 items-start gap-20 max-bp-lg:grid-cols-1 max-bp-lg:gap-12">
          <div>
            <SectionTag>Попробуйте сами</SectionTag>
            <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
              Начните автоматизировать анализ резюме{" "}
              <em className="not-italic text-brand1">уже сегодня</em>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.72] text-text2">
              Попробуйте бесплатно — убедитесь, что ИИ анализирует резюме быстрее и объективнее.
            </p>
            <ul className="mt-7 flex flex-col gap-3">
              {CTA_POINTS.map(({ Icon: PtIcon, title, text }, i) => (
                <Reveal key={title} as="li" delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div
                    className="flex items-start gap-4 rounded-[10px] border border-grey2 bg-grey1 px-4 py-3.5"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-brand1/20 bg-brand1-bg text-brand1">
                      <PtIcon size={18} strokeWidth={1.8} />
                    </span>
                    <div className="text-[13px] leading-[1.55] text-text2">
                      <strong className="block text-text1">{title}</strong>
                      {text}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <LeadForm
            title="Получите доступ к ИИ-анализу резюме"
            subtitle="Проанализируем первые 100 резюме бесплатно"
            submitLabel="Получить доступ бесплатно"
            leadType="resume-analysis"
          />
        </Container>
      </section>

      {/* ═══ 11. CROSS-SELL ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14">
        <Container>
          <SectionTag>Другие возможности BRaiN HR</SectionTag>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Резюме проанализированы — <em className="not-italic text-brand1">что дальше?</em>
          </h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-[1.72] text-text2">
            BRaiN HR автоматизирует весь цикл найма — от создания вакансии до финального решения.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-4 max-bp-lg:grid-cols-1">
            {CROSS_SELL.map(({ Icon: CsIcon, href, title, text }, i) => (
              <Reveal key={title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <a
                  href={href}
                  className="group block h-full rounded-card border border-grey2 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-brand1 hover:shadow-md"
                >
                  <span className="mb-4 inline-flex text-brand1">
                    <CsIcon size={26} strokeWidth={1.8} />
                  </span>
                  <div className="mb-2 text-[16px] font-extrabold text-text1">{title}</div>
                  <div className="mb-4 text-[13px] leading-[1.6] text-text2">{text}</div>
                  <span className="flex items-center gap-1 text-[13px] font-bold text-brand1">
                    Подробнее
                    <ArrowUpRight size={14} strokeWidth={1.8} />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 12. FAQ ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <h2 className="mb-12 text-center text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Ответы на часто задаваемые вопросы
          </h2>
          <FaqAccordion items={FAQ_ITEMS} />
        </Container>
      </section>
    </main>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Helper sub-components — feat-row primitives (1:1 с CSS HTML-оригинала,
   строки 150-225 файла pages/features/ai-screening.html).
   ──────────────────────────────────────────────────────────────────── */

type FeatRowProps = {
  num: string;
  title: string;
  desc: string;
  checks: string[];
  mockup: React.ReactNode;
  reverse?: boolean;
};

/**
 * .feat-row { display:grid; grid-template-columns:1fr 1fr; gap:56px;
 *             align-items:center; padding:56px 0;
 *             border-bottom:1px solid var(--grey2); }
 * .feat-row-rev { direction:rtl; } > * { direction:ltr; }
 * На <960px — 1 колонка (grid-cols-1, gap-8 — для переноса мокапа над текстом).
 */
function FeatRow({ num, title, desc, checks, mockup, reverse }: FeatRowProps) {
  // .feat-row-rev { direction: rtl } > * { direction: ltr }
  // На <960px из CSS HTML: direction:ltr (одна колонка, без разворота).
  const wrapperDirCls = reverse
    ? "[direction:rtl] max-bp-lg:[direction:ltr]"
    : "";
  const childDirCls = reverse ? "[direction:ltr]" : "";
  return (
    <div
      className={`grid grid-cols-2 items-center gap-[56px] border-b border-grey2 py-[56px] last:border-b-0 max-bp-lg:grid-cols-1 max-bp-lg:gap-8 ${wrapperDirCls}`}
    >
      <div className={`relative ${childDirCls}`}>{mockup}</div>
      <div className={childDirCls}>
        {/* .feat-num { font-size:11px; font-weight:800; letter-spacing:2px;
                       color:var(--brand1); text-transform:uppercase;
                       margin-bottom:10px; } */}
        <div className="mb-2.5 text-[11px] font-extrabold uppercase tracking-[2px] text-brand1">
          {num}
        </div>
        {/* .feat-title { font-size:clamp(20px,2vw,26px); font-weight:800;
                         color:var(--text1); margin-bottom:14px;
                         line-height:1.25; letter-spacing:-0.4px; } */}
        <h3 className="mb-[14px] text-[clamp(20px,2vw,26px)] font-extrabold leading-[1.25] tracking-[-0.4px] text-text1">
          {title}
        </h3>
        {/* .feat-desc { font-size:14px; color:var(--text2);
                        line-height:1.72; margin-bottom:20px; } */}
        <p className="mb-5 text-[14px] leading-[1.72] text-text2">{desc}</p>
        {/* .feat-checks { display:flex; flex-direction:column; gap:8px; } */}
        <div className="flex flex-col gap-2">
          {checks.map((c) => (
            <div
              key={c}
              className="flex items-start gap-2 text-[13px] font-medium leading-[1.4] text-text1"
            >
              {/* SVG из HTML: stroke=#4096FF, stroke-width=2.5, polyline 20,6 9,17 4,12 */}
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
        {/* .feat-cta-btn — outline, 1.5px brand1, белый фон, brand1 текст, padding 11px 22px */}
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

/**
 * .feat-screen-inner { background:white; border:1px solid var(--grey2);
 *                      border-radius:12px;
 *                      box-shadow:0 8px 40px rgba(17,38,58,0.12);
 *                      overflow:hidden; }
 * .feat-browser-bar { background:var(--grey1); border-bottom:1px solid var(--grey2);
 *                     padding:10px 14px; display:flex; gap:6px; align-items:center; }
 *   span: 10x10 круги, цвета #FD6B5B / #FEBC2E / #28C840.
 * .feat-mock { padding:16px; }   ← обёртка контента (тоже из HTML).
 */
function FeatBrowser({ children }: { children: React.ReactNode }) {
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

/**
 * .feat-mock-tabs { display:flex; gap:0; border-bottom:1px solid var(--grey2); }
 * .feat-tab { padding:10px 14px; font-size:11px; font-weight:600;
 *             color:var(--text2); border-bottom:2px solid transparent;
 *             margin-bottom:-1px; }
 * .feat-tab.active { color:var(--brand1); border-bottom-color:var(--brand1); }
 */
function FeatTabs({ tabs }: { tabs: { label: string; active?: boolean }[] }) {
  return (
    <div className="flex border-b border-grey2">
      {tabs.map((t) => (
        <span
          key={t.label}
          className={`-mb-px border-b-2 px-[14px] py-2.5 text-[11px] font-semibold ${
            t.active
              ? "border-brand1 text-brand1"
              : "border-transparent text-text2"
          }`}
        >
          {t.label}
        </span>
      ))}
    </div>
  );
}

/**
 * .feat-mock-editor { padding:14px; } — обёртка для editor-полей внутри .feat-mock.
 * Тут используется как маркер вокруг tabs+editor — оборачиваем в  div без
 * лишних паддингов, т.к. внутренние элементы сами имеют padding.
 */
function FeatMockEditor({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

/**
 * Inline-стиль из HTML для заголовка q-card-таблицы:
 * style="padding:12px 14px 8px; font-size:13px; font-weight:700;
 *        color:var(--text1); border-bottom:1px solid var(--grey2);"
 */
function FeatMockHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-grey2 px-[14px] pb-2 pt-3 text-[13px] font-bold text-text1">
      {children}
    </div>
  );
}

/**
 * .feat-questions-body { padding:14px; display:flex; flex-direction:column; gap:8px; }
 */
function FeatQuestionsBody({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2 p-[14px]">{children}</div>;
}

/**
 * .feat-q-card { background:white; border:1px solid var(--grey2);
 *                border-radius:8px; padding:10px 12px; }
 * .feat-q-text { font-size:11px; font-weight:600; color:var(--text1);
 *                line-height:1.5; margin-bottom:6px; }
 * .feat-q-meta { display:flex; gap:6px; align-items:center; }
 * .feat-q-badge { font-size:9px; font-weight:700; padding:2px 7px; border-radius:100px; }
 *   .basic    { background:#E6F4FF; color:var(--brand1); }
 *   .advanced { background:var(--brand2-bg); color:var(--brand2); }
 * .feat-q-competency { font-size:9px; color:var(--text2); font-weight:500; }
 */
function FeatQCard({
  text,
  badge,
  badgeTone,
  competency,
}: {
  text: string;
  badge: string;
  badgeTone: "basic" | "advanced";
  competency: string;
}) {
  const toneClass =
    badgeTone === "basic"
      ? "bg-brand1-bg text-brand1"
      : "bg-brand2-bg text-brand2";
  return (
    <div className="rounded-[8px] border border-grey2 bg-white px-3 py-2.5">
      <div className="mb-1.5 text-[11px] font-semibold leading-[1.5] text-text1">
        {text}
      </div>
      <div className="flex items-center gap-1.5">
        <span className={`rounded-full px-[7px] py-[2px] text-[9px] font-bold ${toneClass}`}>
          {badge}
        </span>
        <span className="text-[9px] font-medium text-text2">{competency}</span>
      </div>
    </div>
  );
}

/**
 * .feat-editor-field { display:flex; align-items:center; gap:8px; margin-bottom:8px; }
 * .feat-editor-label { font-size:10px; font-weight:600; color:var(--text2); min-width:60px; }
 * .feat-editor-value { font-size:11px; font-weight:600; color:var(--text1);
 *                      background:var(--grey1); border:1px solid var(--grey2);
 *                      border-radius:6px; padding:5px 10px; flex:1; }
 */
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
        className={`flex-1 rounded-md border border-grey2 bg-grey1 px-2.5 py-[5px] text-[11px] font-semibold text-text1 ${
          valueClassName ?? ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/**
 * .feat-editor-generated { margin-top:10px; padding:10px;
 *                          background:rgba(64,150,255,0.04);
 *                          border:1px solid rgba(64,150,255,0.12);
 *                          border-radius:6px; }
 * .feat-editor-gen-title { font-size:11px; font-weight:700; color:var(--text1);
 *                          margin-bottom:4px; }
 * .feat-editor-gen-text  { font-size:10px; color:var(--text2); line-height:1.6; }
 */
function EditorGenerated({
  title,
  badge,
  children,
}: {
  title: string;
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-2.5 rounded-md border border-[rgba(64,150,255,0.12)] bg-[rgba(64,150,255,0.04)] p-2.5">
      <div className="mb-1 text-[11px] font-bold text-text1">{title}</div>
      <div className="text-[10px] leading-[1.6] text-text2">{children}</div>
      <AiBadge>{badge}</AiBadge>
    </div>
  );
}

/**
 * .feat-editor-ai-badge { display:inline-flex; align-items:center; gap:4px;
 *                         margin-top:8px; font-size:10px; font-weight:600;
 *                         color:var(--brand1); background:var(--brand1-bg);
 *                         border:1px solid rgba(64,150,255,0.2);
 *                         border-radius:100px; padding:2px 8px; }
 *  Иконка — SVG молнии (polygon 13,2 3,14 12,14 11,22 21,10 12,10 13,2) → <Zap />.
 */
function AiBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-[rgba(64,150,255,0.2)] bg-brand1-bg px-2 py-[2px] text-[10px] font-semibold text-brand1">
      <Zap size={10} strokeWidth={2} />
      {children}
    </span>
  );
}

/**
 * .feat-tag { font-size:10px; font-weight:600; background:var(--grey1);
 *             border:1px solid var(--grey2); border-radius:100px;
 *             padding:3px 8px; color:var(--text2); }
 */
function FeatTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-grey2 bg-grey1 px-2 py-[3px] text-[10px] font-semibold text-text2">
      {children}
    </span>
  );
}

