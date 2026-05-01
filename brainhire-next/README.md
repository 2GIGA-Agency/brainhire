# BRaiN HR — Next.js версия сайта

Миграция статического сайта https://brainhire.ru на Next.js 15 App Router по плейбуку «Vibecoding для SEO». Архитектура «двигатель блоков»: контент в JSON, страницы рендерятся из массива блоков через BlockRenderer.

## Стек

- Next.js 15 (App Router) + React 19
- TypeScript strict
- Tailwind CSS v4 (CSS-first, токены через `@theme` в `src/app/globals.css`)
- lucide-react для иконок
- Zod для валидации контент-схем
- Деплой: VPS Ubuntu + Nginx + systemd (`output: 'standalone'`)

## Команды

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm run start
npm run lint
npm run typecheck
npm run check        # lint + typecheck
```

## Структура

```
src/
  app/                       # роутинг и страницы
    layout.tsx               # root layout, шрифт, Header/Footer, Я.Метрика
    page.tsx                 # главная
    globals.css              # @theme токены + keyframes
    sitemap.ts, robots.ts
  components/
    ui/                      # Container, Button, Icon — глупые
    blocks/                  # умные блоки страниц (Hero, FAQ, ...)
    layout/                  # Header, Footer
  data/
    site.json                # глобальный конфиг (header.menu, footer.columns, ...)
    pages/                   # JSON по странице — { meta, blocks: [] }
    lists/                   # справочники для generateStaticParams
    shared/                  # переиспользуемые куски
  lib/                       # cn, loadPage, blockRegistry
  types/                     # Zod-схемы
public/
  icons/, logos/, og/, favicons/
```

## Принципы

- **Контент в JSON, не в JSX.** Тексты, метрики, FAQ — только через `props.data`.
- **Server-first.** `'use client'` только для интерактива (формы, аккордеоны, калькулятор). Контент рендерится на сервере, доступен в `view-source`.
- **SEO во время разработки.** Каждая страница экспортирует `generateMetadata` с уникальными title/description/canonical.
- **Никаких CSS-в-JS рантаймов** — Tailwind utility + `@theme` для токенов.

## Ссылки

- Плейбук: `../Инструкции Claude Code — SEO-сайты.md`
- Статика-референс: `../pages/`, `../shared/`, `../reference/`
- План миграции: `~/.claude/plans/replicated-puzzling-finch.md`
