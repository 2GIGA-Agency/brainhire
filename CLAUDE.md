# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# BRaiN HR — Редизайн сайта

## О проекте
ИИ-платформа для автоматизации HR-процессов (рекрутинг, скоринг резюме, видеоинтервью, оценка персонала).
Сайт: https://brainhire.ru/
Юрлицо: ООО «НДК», ОГРН 1225000105010

## Архитектура

Проект состоит из двух частей:

**1. Статический HTML-сайт** (`pages/`, `shared/`, `templates/`) — готовые страницы для продакшена.
Каждая страница — самостоятельный HTML-файл. Общие стили подключаются через `<link>`. Header и footer — HTML-сниппеты в `shared/`, их нужно **копировать** в каждую страницу (нет серверного include).

**2. Next.js-приложение** (`brainhire-next/`) — миграция на React/TypeScript с SEO-оптимизацией (в разработке).
Использует архитектуру «Block Engine»: контент хранится в JSON, рендерится через `BlockRenderer` по массивам блоков.

## Команды разработки (brainhire-next)

```bash
cd brainhire-next
npm run dev        # Запуск dev-сервера на localhost:3000
npm run build      # Production-сборка
npm run start      # Запуск production-сборки
npm run check      # lint + typecheck (запускать перед коммитом)
npm run lint
npm run typecheck
```

## Структура проекта
```
brainhire/
├── CLAUDE.md
├── shared/
│   ├── styles.css               ← Дизайн-система: переменные, reset, типографика, сетка, кнопки
│   ├── components.css           ← Стили компонентов: карточки, FAQ, формы, тикер, pipeline и т.д.
│   ├── header.html              ← HTML-сниппет шапки (urgency banner + topbar + nav + mega-menu)
│   ├── footer.html              ← HTML-сниппет подвала
│   └── scripts.js               ← Общий JS: меню, FAQ-аккордеон, reveal-анимации, lucide
├── pages/
│   ├── index.html               ← Главная страница сайта
│   ├── about.html, contacts.html, pricing.html, reviews.html
│   ├── cases.html, calculator.html, hr-cashback.html, mws-partnership.html
│   ├── shared/                  ← Зеркало shared/ (для страниц с относительными путями)
│   ├── solutions/               ← Отраслевые решения (12 лендингов)
│   │   ├── it.html, finance.html, marketplaces.html, smb.html, enterprise.html
│   │   └── education.html, horeca.html, hr.html, logistics.html, marketing.html, sales.html, sellers.html
│   ├── features/                ← Лендинги функций (5 страниц)
│   │   ├── ai-screening.html, ai-vacancy-creation.html, ai-videointerview.html
│   │   ├── ai-realtime-interview.html
│   │   └── ai-staff-scoring.html
│   ├── cases/                   ← Кейсы по отраслям (5 страниц)
│   │   └── it.html, finance.html, medicine.html, production.html, retail.html
│   ├── assets/                  ← Изображения, PDF, фото команды
│   └── blog/                    ← Блог (структура готова, контент не добавлен)
├── templates/
│   ├── page-template.html       ← Базовый шаблон (header + пустой main + footer + scripts)
│   ├── feature-landing.html     ← Шаблон лендинга функции (8 секций с {{PLACEHOLDER}})
│   └── blog-post.html           ← Шаблон статьи блога
├── reference/
│   └── it-original.html         ← Оригинальный лендинг «ИТ компании» (не трогать, для сверки)
├── old pages/                   ← УСТАРЕВШИЕ страницы (не использовать)
├── brainhire-vibecoding-final.html ← Архивный экспорт (не использовать)
└── brainhire-next/              ← Next.js-приложение (миграция)
    └── src/
        ├── app/                 ← App Router: layout.tsx, page.tsx, globals.css, sitemap.ts
        ├── components/
        │   ├── ui/              ← Чистые UI-компоненты (без логики)
        │   ├── blocks/          ← Умные блоки страниц (Hero, FAQ, Features и т.д.)
        │   └── layout/          ← Header, Footer
        ├── data/
        │   ├── site.json        ← Глобальные данные сайта
        │   └── pages/           ← JSON-файл на каждую страницу
        ├── lib/                 ← Утилиты: cn, loadPage, blockRegistry
        └── types/               ← Zod-схемы для валидации контента
```

## Пути к CSS

| Расположение файла | Путь к styles.css |
|---|---|
| `pages/*.html` | `../shared/styles.css` |
| `pages/features/*.html` | `../../shared/styles.css` |
| `pages/solutions/*.html` | `../../shared/styles.css` |
| `pages/cases/*.html` | `../../shared/styles.css` |

## Next.js-архитектура (brainhire-next)

**Стек:** Next.js 15, React 19, TypeScript strict, Tailwind CSS v4 (CSS-first `@theme` токены в `globals.css`), Zod, lucide-react.
**Деплой:** `output: 'standalone'`, VPS Ubuntu + Nginx + systemd.

**Принципы:**
- Контент всегда в JSON (`src/data/`), никогда в JSX
- Server-first рендеринг (`.use client` только для интерактивности)
- SEO с `generateMetadata` на каждой странице
- Tailwind + CSS-токены, без CSS-in-JS

**Block Engine:** страница = массив блоков в JSON → `BlockRenderer` → компонент из `blockRegistry`. Добавление нового блока: JSON-схема в `src/types/` + компонент в `src/components/blocks/` + регистрация в `src/lib/blockRegistry`.

## Дизайн-система

### Цвета
```css
--brand1:    #4096FF;   /* Основной синий */
--brand1-h:  #69B1FF;   /* Hover синий */
--brand1-bg: #E6F4FF;   /* Фон синий */
--brand2:    #FF7401;   /* Акцентный оранжевый */
--brand2-bg: #FFF3E8;   /* Фон оранжевый */
--brand3:    #12536D;   /* Тёмный бирюзовый */
--text1:     #11263A;   /* Основной текст */
--text2:     #717680;   /* Вторичный текст */
--grey1:     #F5F6F8;   /* Фон секций */
--grey2:     #D5D7DA;   /* Бордеры */
--grey3:     rgba(29,29,29,0.10);
--grey4:     #535862;   /* Тёмный серый */
--white:     #FFFFFF;
```

### Типографика
- Шрифт: **Montserrat** (Google Fonts), начертания: 400, 500, 600, 700, 800, 900
- h1: `clamp(36px, 4vw, 52px)`, weight 800, letter-spacing -1.2px, line-height 1.1
- h2 (section-title): `clamp(26px, 3vw, 38px)`, weight 800, letter-spacing -0.7px, line-height 1.18
- Основной текст: 14–15px, line-height 1.6–1.72
- Мелкий текст: 12–13px

### Отступы и сетка
- Контейнер: `max-width: 1240px; margin: 0 auto; padding: 0 24px;`
- Секции: `padding: 80px 0;`
- Радиусы: 12px (основной), 8px (малый)
- Тени: `0 1px 3px rgba(17,38,58,0.08), 0 4px 16px rgba(17,38,58,0.06)` (обычная), `0 4px 24px rgba(17,38,58,0.12)` (средняя)

### Брейкпоинты (mobile-first НЕ используется — desktop-first)
- `960px` — основной: 2 колонки → 1, скрытие навигации
- `700px` — средний: сжатие сеток
- `600px` — малый: 1 колонка везде
- `480px` — мобильный: минимальный

### Кнопки (4 варианта)
1. `btn-primary` — синий filled, 14px, 10px 20px
2. `btn-secondary` — белый outline, бордер grey2
3. `btn-hero-primary` — крупный синий, 15px, 16px 32px, shadow
4. `btn-hero-outline` — крупный outline

### Иконки
- Lucide Icons через CDN: `<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>`
- В текущем коде иконки — inline SVG (stroke-based, 22px или 26px, stroke="#4096FF", stroke-width="1.8")
- При создании новых страниц — можно использовать Lucide `<i data-lucide="icon-name"></i>` + вызов `lucide.createIcons()`, либо копировать inline SVG из существующих секций

## Компоненты (готовые, описаны в components.css)

### Секция
```html
<section class="section-bg"> <!-- или без класса для белого фона -->
  <div class="container">
    <div class="section-tag">ТЭГЕН СЕКЦИИ</div>
    <h2 class="section-title reveal">Заголовок с <em>акцентом</em></h2>
    <p class="section-sub reveal">Подзаголовок секции</p>
    <!-- контент -->
  </div>
</section>
```

### Карточки боли (pain-card)
2-колоночная сетка `.pain-grid`, каждая карточка с иконкой, заголовком, текстом.

### Шаги (steps)
4-колоночная сетка `.steps-grid`, каждый шаг с номером, временем, иконкой, заголовком, описанием.

### Сравнение (compare / timlead)
2 колонки: "без" и "с BRaiN HR", с списком пунктов и итогом.

### Feature-карточки (features-grid)
2 колонки, карточка с иконкой слева и текстом справа.

### Feature Rows (feat-row)
Чередующиеся строки с мокапом интерфейса слева и описанием справа (и наоборот с `.feat-row-rev`).

### FAQ-аккордеон
```html
<div class="faq-list">
  <div class="faq-item">
    <button class="faq-question" onclick="toggleFaq(this)">
      Вопрос?
      <svg class="faq-icon">...</svg>
    </button>
    <div class="faq-answer">
      <div class="faq-answer-inner">Ответ</div>
    </div>
  </div>
</div>
```

### CTA-секция с формой
Двухколоночная: слева — текст + буллеты, справа — форма.

### Блог-карточки
3-колоночная сетка `.blog-grid`, карточки с тегом, датой, заголовком, текстом, автором.

### Кейс-карточки
3-колоночная сетка `.cases-grid`.

### Лого-слайдер
Бесконечная прокрутка с fade по краям.

## Правила для Claude Code

### Создание новой страницы (статический HTML)
1. Скопируй `templates/page-template.html`
2. Обнови `<title>` и мета-теги
3. Добавь секции из components.css, переиспользуя классы
4. Пути к CSS: см. таблицу выше

### Консистентность
- НЕ создавай новые CSS-переменные — используй существующие из `:root`
- НЕ меняй стили в shared/ без явной просьбы — добавляй page-specific стили в `<style>` внутри страницы
- Header и footer должны быть **идентичны** на всех страницах
- Inline SVG-иконки: stroke="#4096FF", stroke-width="1.8", viewBox="0 0 24 24"

### Тон текстов
- ЦА: CEO, HRD, IT-директора, рекрутеры в малом, среднем и крупном бизнесе
- Боль: долгий найм, потеря кандидатов, рутина HR, отвлечение руководителей на найм
- Решение: ИИ-автоматизация всех этапов найма
- Стиль: профессиональный, конкретный, с цифрами и метриками, без воды
- Акценты: экономия времени, качество кандидатов, данные вместо интуиции

### Reveal-анимации
Добавляй классы `reveal`, `reveal d1`, `reveal d2`, `reveal d3` на элементы для последовательной анимации появления при скролле. JS для этого уже есть в `shared/scripts.js`.

## Текущий статус

### Отраслевые решения (pages/solutions/)
- [x] ИТ компании — `it.html` (reference: `reference/it-original.html`)
- [x] Финансовый сектор — `finance.html`
- [x] Маркетплейсы — `marketplaces.html`
- [x] Малый бизнес — `smb.html`
- [x] Корпорации — `enterprise.html`
- [x] Образование — `education.html`
- [x] HoReCa — `horeca.html`
- [x] HR-агентства — `hr.html`
- [x] Логистика — `logistics.html`
- [x] Маркетинг — `marketing.html`
- [x] Продажи — `sales.html`
- [x] Продавцы маркетплейсов — `sellers.html`

### Лендинги функций (pages/features/)
- [x] ИИ-скрининг резюме — `ai-screening.html`
- [x] ИИ-создание вакансий — `ai-vacancy-creation.html`
- [x] ИИ-видеоинтервью — `ai-videointerview.html`
- [x] ИИ-интервью в реальном времени — `ai-realtime-interview.html`
- [x] ИИ-оценка персонала — `ai-staff-scoring.html`

### Кейсы (pages/cases/)
- [x] ИТ — `it.html`
- [x] Финансы — `finance.html`
- [x] Медицина — `medicine.html`
- [x] Производство — `production.html`
- [x] Ретейл — `retail.html`

### Служебные страницы
- [x] Главная страница — `pages/index.html`
- [x] Тарифы — `pages/pricing.html`
- [x] О компании — `pages/about.html`
- [x] Контакты — `pages/contacts.html`
- [x] Кейсы (список) — `pages/cases.html`
- [x] Отзывы — `pages/reviews.html`
- [x] HR-Cashback — `pages/hr-cashback.html`
- [x] Калькулятор — `pages/calculator.html`
- [x] Партнёрство MWS — `pages/mws-partnership.html`

### Блог
- [ ] Список статей — `pages/blog/index.html` (структура готова)
- [ ] Шаблон статьи — `templates/blog-post.html` (готов)
