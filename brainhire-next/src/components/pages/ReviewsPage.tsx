import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ReviewsList, type Review } from "@/components/interactive/ReviewsList";
import { Reveal } from "@/components/interactive/Reveal";
import { LettersLightbox } from "@/components/interactive/LettersLightbox";
import { ChevronDown } from "lucide-react";

/**
 * ReviewsPage — кастомный server-component для страницы /reviews.
 * Конвертирован 1:1 из pages/reviews.html. Интерактивный фильтр-список
 * отзывов вынесен в client-component <ReviewsList />.
 */

const reviews: Review[] = [
  {
    text: "BRAiN HR полностью изменил наш подход к найму. Раньше на обработку откликов уходило до 3 дней, теперь ИИ делает первичный отбор за пару часов. Мы закрываем вакансии на 40% быстрее, и это реально ощутимый результат для бизнеса!",
    result: "Закрываем вакансии на 40% быстрее",
    authorInitials: "ДП",
    authorName: "Дмитрий Перминов",
    authorTitle: "HR-директор, сеть фитнес-клубов",
    category: "recruiting",
    categoryLabel: "Рекрутинг",
    avatarTone: "blue",
  },
  {
    text: "Скептически относился к автоматизации рекрутинга, но BRAiN HR приятно удивил. Система не просто фильтрует резюме по ключевым словам, а реально понимает контекст. Качество кандидатов на собеседованиях выросло заметно.",
    result: "Качество кандидатов выросло на 35%",
    authorInitials: "ИП",
    authorName: "Игорь Петренко",
    authorTitle: "Руководитель отдела подбора персонала, ритейл",
    category: "screening",
    categoryLabel: "Скрининг резюме",
    avatarTone: "orange",
  },
  {
    text: "Внедрили BRAiN HR три месяца назад для массового подбора. Автоматизация рекрутинга сэкономила нам невероятное количество времени! Теперь я могу сосредоточиться на собеседованиях, а не на рутинной сортировке сотен резюме.",
    result: "Снизили время отбора на 60%",
    authorInitials: "АГ",
    authorName: "Анна Григорьева",
    authorTitle: "HR-менеджер, производственная компания",
    category: "recruiting",
    categoryLabel: "Рекрутинг",
    avatarTone: "teal",
  },
  {
    text: "Для небольшой команды BRAiN HR — просто находка. Не нужно нанимать целый HR-отдел на этапе роста. ИИ помогает находить сильных кандидатов быстро, и мы не упускаем таланты из-за медленного отклика.",
    result: "Сократили расходы на рекрутинг на 45%",
    authorInitials: "ДВ",
    authorName: "Дмитрий Волков",
    authorTitle: "Основатель стартапа",
    category: "automation",
    categoryLabel: "Автоматизация",
    avatarTone: "blue",
  },
  {
    text: "Работаю с несколькими проектами одновременно, и BRAiN HR стал моим спасением. Автоматизация рекрутинга позволяет вести 5-6 вакансий параллельно без потери качества. Клиенты довольны скоростью закрытия позиций!",
    result: "Увеличили количество проектов на 70%",
    authorInitials: "ОК",
    authorName: "Ольга Кузнецова",
    authorTitle: "Рекрутер, аутсорсинговое агентство",
    category: "automation",
    categoryLabel: "Автоматизация",
    avatarTone: "orange",
  },
  {
    text: "BRAiN HR отлично справляется с первичным скринингом. ИИ учитывает не только hard skills, но и соответствие корпоративной культуре. Процент успешного прохождения испытательного срока вырос на 25% после внедрения.",
    result: "Испытательный срок проходят на 25% чаще",
    authorInitials: "СН",
    authorName: "Сергей Новиков",
    authorTitle: "HR BP, финансовый сектор",
    category: "screening",
    categoryLabel: "Скрининг резюме",
    avatarTone: "teal",
  },
  {
    text: "Самое ценное в BRAiN HR — это экономия ресурсов. Мы сократили время на рекрутинг с 45 до 28 дней в среднем. Автоматизация взяла на себя всю рутину, и теперь команда фокусируется на стратегических задачах.",
    result: "Время найма сократилось до 28 дней",
    authorInitials: "ЕБ",
    authorName: "Екатерина Белова",
    authorTitle: "Менеджер по персоналу, логистика",
    category: "recruiting",
    categoryLabel: "Рекрутинг",
    avatarTone: "blue",
  },
  {
    text: "Используем BRAiN HR для автоматизации массового найма в сезон. ИИ обрабатывает до 300 откликов в день и формирует shortlist из действительно релевантных кандидатов. Это масштабируемое решение, которое растёт вместе с бизнесом.",
    result: "Обрабатываем до 300 откликов в день",
    authorInitials: "АМ",
    authorName: "Алексей Морозов",
    authorTitle: "Head of Talent Acquisition, e-commerce",
    category: "screening",
    categoryLabel: "Скрининг резюме",
    avatarTone: "orange",
  },
  {
    text: "Рекомендую BRAiN HR всем своим клиентам. Автоматизация рекрутинга здесь реализована очень грамотно — система обучается на ваших данных и становится точнее со временем. Интеграция с ATS прошла гладко, техподдержка на высоте.",
    result: "Точность подбора повысилась на 50%",
    authorInitials: "ВЛ",
    authorName: "Виктория Лебедева",
    authorTitle: "Директор по развитию, девелоперская компания",
    category: "automation",
    categoryLabel: "Автоматизация",
    avatarTone: "teal",
  },
];

type Letter = {
  company: string;
  desc: string;
  imageSrc?: string;
};

const letters: Letter[] = [
  {
    company: "ТехноСофт",
    desc: "Благодарность за автоматизацию процесса рекрутинга",
    imageSrc: "/assets/letters/letter-tehnosoft.webp",
  },
  {
    company: "МаркетПлюс",
    desc: "Благодарность за сокращение сроков массового найма",
    imageSrc: "/assets/letters/letter-marketplus.webp",
  },
  {
    company: "ФинТех Групп",
    desc: "Благодарность за внедрение ИИ-оценки персонала",
    imageSrc: "/assets/letters/letter-fintechgroup.webp",
  },
  {
    company: "DataFlow",
    desc: "Благодарность за повышение эффективности HR-отдела",
    imageSrc: "/assets/letters/letter-dataflow.webp",
  },
];

type LogoItem = { label: string; href: string; html: string };

const logos: LogoItem[] = [
  {
    label: "РОСТЕЛЕКОМ",
    href: "https://kazan.rt.ru/",
    html: `<span style="font-size:13px;font-weight:700;color:#1a1a1a;letter-spacing:0.5px;">РОСТЕЛЕКОМ</span>`,
  },
  {
    label: "e-flops",
    href: "https://e-flops.ru/",
    html: `<span style="font-size:16px;font-weight:800;color:#222;letter-spacing:-0.5px;">e<span style="color:#4096FF;">-</span>flops</span>`,
  },
  {
    label: "IT PEOPLE",
    href: "https://itpeoplegroup.ru/",
    html: `<span style="font-size:12px;font-weight:800;color:#1a1a1a;letter-spacing:1.5px;text-transform:uppercase;border:2px solid #1a1a1a;padding:4px 8px;">IT PEOPLE</span>`,
  },
  {
    label: "moby",
    href: "https://moby.estate/",
    html: `<span style="font-size:17px;font-weight:800;color:#2b4de3;letter-spacing:-0.5px;">●● moby</span>`,
  },
  {
    label: "neyrox",
    href: "https://neyrox.com/",
    html: `<span style="font-size:15px;font-weight:700;color:#111;letter-spacing:-0.3px;">neyrox</span>`,
  },
  {
    label: "idaproject",
    href: "https://idaproject.com/",
    html: `<span style="font-size:14px;font-weight:700;color:#c0392b;letter-spacing:-0.3px;">ida<span style="color:#222;">project</span></span>`,
  },
  {
    label: "prodamus",
    href: "https://prodamus.ru/",
    html: `<span style="font-size:15px;font-weight:700;color:#6c3db5;letter-spacing:-0.3px;">prodamus</span>`,
  },
  {
    label: "HR ROCKET",
    href: "https://www.hr-rocket.ru/",
    html: `<span style="font-size:14px;font-weight:800;color:#1a1a1a;letter-spacing:0.5px;">HR<span style="color:#e03030;">⚡</span>ROCKET</span>`,
  },
  {
    label: "livecargo",
    href: "https://livecargo.ru/",
    html: `<span style="font-size:14px;font-weight:700;color:#1a5c3a;letter-spacing:-0.3px;">live<span style="color:#27ae60;">cargo</span></span>`,
  },
  {
    label: "LEDGO",
    href: "https://ledgo.ru/",
    html: `<span style="font-size:16px;font-weight:900;color:#f39c12;letter-spacing:-0.5px;">LED<span style="color:#e67e22;">GO</span></span>`,
  },
  {
    label: "SimbirSoft",
    href: "https://www.simbirsoft.com/",
    html: `<span style="font-size:18px;font-weight:800;color:#1a1a2e;letter-spacing:-0.5px;">Simbir<span style="color:#e03030;">S</span>oft</span>`,
  },
  {
    label: "BSS",
    href: "https://bssys.com/",
    html: `<span style="background:#1a3a8a;color:#fff;font-size:15px;font-weight:900;padding:5px 10px;border-radius:4px;letter-spacing:1px;">BSS</span>`,
  },
  {
    label: "3LOGIC GROUP",
    href: "https://3logic.ru/",
    html: `<span style="font-size:15px;font-weight:800;color:#1a1a1a;letter-spacing:-0.3px;line-height:1;">3<span style="color:#e03030;">LOGIC</span><br><span style="font-size:9px;font-weight:600;color:#555;letter-spacing:1px;">GROUP</span></span>`,
  },
  {
    label: "PENOPLEX",
    href: "https://www.penoplex.ru/",
    html: `<span style="font-size:13px;font-weight:800;color:#e03030;letter-spacing:0.5px;">PENOPLEX</span>`,
  },
  {
    label: "ПШБ",
    href: "https://pshb.ru/",
    html: `<span style="font-size:13px;font-weight:800;color:#1a3a8a;letter-spacing:1px;">ПШБ</span>`,
  },
];

const faqItems: { q: string; a: string }[] = [
  {
    q: "Как оставить отзыв?",
    a: "Если вы клиент BRaiN HR, свяжитесь с вашим менеджером или напишите на info@brainhire.ru. Мы будем рады вашей обратной связи.",
  },
  {
    q: "Отзывы настоящие?",
    a: "Да, все отзывы получены от реальных клиентов. Мы можем предоставить контакты для верификации по запросу.",
  },
  {
    q: "Есть ли пробный период?",
    a: "Да, первые 100 кандидатов обрабатываются бесплатно. Этого достаточно для оценки платформы.",
  },
  {
    q: "Можно ли посмотреть демо?",
    a: "Конечно. Оставьте заявку, и наш менеджер проведёт персональную демонстрацию платформы.",
  },
];

export function ReviewsPage() {
  const doubledLogos = [...logos, ...logos];

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="bg-white pt-[88px] pb-14">
        <Container>
          <h1 className="mb-4 text-[clamp(36px,5vw,52px)] font-extrabold leading-[1.1] tracking-[-1.2px] text-text1">
            Отзывы о платформе <em className="not-italic text-brand1">BRaiN HR</em>
          </h1>
          <p className="max-w-[560px] text-[17px] leading-[1.7] text-text2">
            Компаниям удалось снизить расходы на 78%, ускорить найм в 5 раз и повысить качество
            кандидатов.
          </p>
        </Container>
      </section>

      {/* ═══ LOGOS SLIDER ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-8">
        <Container>
          <div className="mb-5 text-center text-[12px] font-semibold uppercase tracking-[1px] text-text2">
            Нам доверяют компании из разных отраслей
          </div>
        </Container>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-20 bg-gradient-to-r from-grey1 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-20 bg-gradient-to-l from-grey1 to-transparent" />
          <div className="flex w-max items-center animate-ticker hover:[animation-play-state:paused]">
            {doubledLogos.map((logo, i) => (
              <a
                key={i}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={logo.label}
                className="inline-flex h-[68px] shrink-0 items-center justify-center whitespace-nowrap border-r border-grey2 px-9 leading-[1.2] opacity-60 transition-opacity hover:opacity-100 last:border-r-0"
                dangerouslySetInnerHTML={{ __html: logo.html }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ БЛАГОДАРСТВЕННЫЕ ПИСЬМА ═══ */}
      <section className="bg-white py-20 max-bp-lg:py-14">
        <Container>
          <h2 className="text-center text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Благодарственные письма
          </h2>
          <p className="mx-auto mt-3 max-w-[680px] text-center text-[15px] leading-[1.72] text-text2">
            Официальные благодарности от компаний, которые используют BRaiN HR. Нажмите на письмо для
            увеличения.
          </p>

          <LettersLightbox letters={letters} />
        </Container>
      </section>

      {/* ═══ REVIEWS GRID WITH FILTERS ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Все отзывы
          </h2>

          <ReviewsList reviews={reviews} />
        </Container>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-white py-20 text-center max-bp-lg:py-14">
        <Container>
          <h2 className="mb-4 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
            Присоединяйтесь к 150+ компаниям
          </h2>
          <p className="mx-auto mb-8 max-w-[520px] text-[15px] leading-[1.72] text-text2">
            Начните нанимать быстрее и дешевле уже сегодня. Первые 100 кандидатов — бесплатно.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-bp-xs:flex-col max-bp-xs:items-center">
            <Button href="https://brainhire.ru/signup" variant="hero-primary" external>
              100 кандидатов бесплатно
            </Button>
            <Button href="https://brainhire.ru/demo" variant="hero-outline" external>
              Получить демо
            </Button>
          </div>
        </Container>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          <div className="grid grid-cols-[1fr_1.5fr] items-start gap-16 max-bp-lg:grid-cols-1 max-bp-lg:gap-8">
            <div>
              <h2 className="mb-3 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
                Частые <em className="not-italic text-brand1">вопросы</em>
              </h2>
              <p className="text-[15px] leading-[1.72] text-text2">
                Не нашли ответ? Напишите нам на info@brainhire.ru — мы ответим в течение 24 часов.
              </p>
            </div>
            <div className="flex flex-col">
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  className="group border-b border-dashed border-grey2 first:border-t first:border-dashed first:border-grey2 [&[open]_.faq-chev]:rotate-180 [&[open]_.faq-chev]:text-brand1 [&[open]_summary]:text-brand1"
                >
                  <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-[15px] font-bold text-text1 transition-colors hover:text-brand1 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <ChevronDown
                      size={20}
                      strokeWidth={2}
                      className="faq-chev shrink-0 text-text2 transition-transform duration-300"
                    />
                  </summary>
                  <div className="pb-5 text-[14px] leading-[1.7] text-text2">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
