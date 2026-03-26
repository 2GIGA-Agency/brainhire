# BRaiN HR — Редизайн сайта

## О проекте
ИИ-платформа для автоматизации HR-процессов (рекрутинг, скоринг резюме, видеоинтервью, оценка персонала).
Сайт: https://brainhire.ru/
Юрлицо: ООО «НДК», ОГРН 1225000105010

## Архитектура
Статический сайт на чистом HTML/CSS/JS. Каждая страница — самостоятельный HTML-файл.
Общие стили: shared/styles.css и shared/components.css.
Header и footer копируются в каждую страницу из shared/header.html и shared/footer.html.

## Дизайн-система

### Цвета
--brand1: #4096FF (основной синий)
--brand1-h: #69B1FF (hover)
--brand1-bg: #E6F4FF (фон)
--brand2: #FF7401 (акцент оранжевый)
--brand2-bg: #FFF3E8
--brand3: #12536D (тёмный бирюзовый)
--text1: #11263A (основной текст)
--text2: #717680 (вторичный)
--grey1: #F5F6F8 (фон секций)
--grey2: #D5D7DA (бордеры)
--white: #FFFFFF

### Типографика
Шрифт: Montserrat (Google Fonts), 400-900
h1: clamp(36px, 4vw, 52px), weight 800
h2: clamp(26px, 3vw, 38px), weight 800
Текст: 14-15px, line-height 1.6-1.72

### Сетка
Контейнер: max-width 1240px, padding 0 24px
Секции: padding 80px 0
Радиусы: 12px основной, 8px малый

### Кнопки
btn-primary — синий filled
btn-secondary — белый outline
btn-hero-primary — крупный синий с тенью
btn-hero-outline — крупный outline

### Иконки
Lucide Icons через CDN, inline SVG: stroke="#4096FF", stroke-width="1.8"

## Тон текстов
- ЦА: CEO, HRD, IT-директора, рекрутеры в малом, среднем и крупном бизнесе
- Боль: долгий найм, потеря кандидатов, рутина HR, отвлечение руководителей на найм
- Решение: ИИ-автоматизация всех этапов найма
- Стиль: профессиональный, конкретный, с цифрами и метриками, без воды

## Структура страниц

### Отраслевые решения (pages/solutions/)
- it.html — ИТ компании (ГОТОВ — reference/it-original.html)
- finance.html — Финансовый сектор
- marketplaces.html — Маркетплейсы
- smb.html — Малый бизнес
- enterprise.html — Корпорации

### Функции (pages/features/)
- ai-screening.html — ИИ-скрининг резюме
- ai-vacancy.html — ИИ-создание вакансий
- ai-videointerview.html — ИИ-видеоинтервью
- ai-staff-scoring.html — ИИ-оценка персонала

### Служебные страницы (pages/)
- pricing.html, about.html, contacts.html
- cases.html, reviews.html
- hr-cashback.html, referral.html, press.html

### Блог (pages/blog/)
- index.html — список статей
- Отдельные статьи

## Правила
- Переиспользуй компоненты из shared/
- Не создавай новые CSS-переменные
- Header и footer идентичны на всех страницах
- Добавляй классы reveal, d1, d2, d3 для анимаций при скролле
- Брейкпоинты: 960px, 700px, 600px, 480px (desktop-first)
