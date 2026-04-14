# BRaiN HR — Редизайн сайта

## О проекте
ИИ-платформа для автоматизации HR-процессов (рекрутинг, скоринг резюме, видеоинтервью, оценка персонала).
Сайт: https://brainhire.ru/
Юрлицо: ООО «НДК», ОГРН 1225000105010

## Архитектура
Статический сайт. Каждая страница — самостоятельный HTML-файл.
Общие стили подключаются через `<link rel="stylesheet" href="../shared/styles.css">` и `<link rel="stylesheet" href="../shared/components.css">`.
Header и footer — HTML-сниппеты в `shared/header.html` и `shared/footer.html`, их нужно **копировать** в каждую страницу (нет серверного include).

## Структура проекта
```
brainhire/
├── CLAUDE.md                    ← ТЫ ЗДЕСЬ
├── shared/
│   ├── styles.css               ← Дизайн-система: переменные, reset, типографика, сетка, кнопки
│   ├── components.css           ← Стили компонентов: карточки, FAQ, формы, тикер, pipeline и т.д.
│   ├── header.html              ← HTML-сниппет шапки (urgency banner + topbar + nav + mega-menu)
│   ├── footer.html              ← HTML-сниппет подвала
│   └── scripts.js               ← Общий JS: меню, FAQ-аккордеон, reveal-анимации, lucide
├── pages/
│   ├── index.html               ← Главная страница сайта
│   ├── solutions/               ← Отраслевые решения (лендинги)
│   │   ├── it.html              ← ИТ компании (ГОТОВ — reference/it-original.html)
│   │   ├── finance.html         ← Финансовый сектор
│   │   ├── marketplaces.html    ← Маркетплейсы
│   │   ├── smb.html             ← Малый бизнес
│   │   └── enterprise.html      ← Корпорации
│   ├── features/                ← Лендинги функций
│   │   ├── ai-screening.html
│   │   ├── ai-vacancy.html
│   │   ├── ai-videointerview.html
│   │   └── ai-staff-scoring.html
│   ├── pricing.html             ← Тарифы
│   ├── about.html               ← О компании
│   ├── contacts.html            ← Контакты
│   ├── cases.html               ← Кейсы
│   ├── reviews.html             ← Отзывы
│   ├── hr-cashback.html         ← HR-Cashback (партнёрская программа)
│   ├── referral.html            ← Стать агентом
│   ├── press.html               ← СМИ о нас
│   └── blog/
│       ├── index.html           ← Список статей
│       └── [slug].html          ← Отдельные статьи
├── templates/
│   ├── page-template.html       ← Базовый шаблон (header + пустой main + footer + scripts)
│   ├── feature-landing.html     ← Шаблон лендинга функции
│   └── blog-post.html           ← Шаблон статьи блога
└── reference/
    └── it-original.html         ← Оригинальный лендинг «ИТ компании» (не трогать, для сверки)
```

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

### Создание новой страницы
1. Скопируй `templates/page-template.html`
2. Обнови `<title>` и мета-теги
3. Добавь секции из components.css, переиспользуя классы
4. Пути к CSS: `../shared/styles.css` из `pages/`, `../../shared/styles.css` из `pages/features/`

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

### Отраслевые решения
- [x] ИТ компании — готов, в `reference/it-original.html`
- [ ] Финансовый сектор
- [ ] Маркетплейсы
- [ ] Малый бизнес
- [ ] Корпорации

### Лендинги функций
- [ ] ИИ-скрининг резюме
- [ ] ИИ-создание вакансий
- [ ] ИИ-видеоинтервью
- [ ] ИИ-оценка персонала

### Служебные страницы
- [ ] Главная страница сайта
- [ ] Тарифы
- [ ] О компании
- [ ] Контакты
- [ ] Кейсы
- [ ] Отзывы
- [ ] HR-Cashback
- [ ] Стать агентом
- [ ] СМИ о нас

### Блог
- [ ] Список статей
- [ ] Шаблон статьи
