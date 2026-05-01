# Деплой BRaiN HR (Next.js 15) на VPS

## Стек

- Next.js 15 (App Router) с `output: 'standalone'`
- Node.js 20+ (рекомендую 22 LTS)
- Nginx как reverse-proxy перед `next start` (127.0.0.1:3000)
- Существующий бэкэнд BRaiN HR (Django/FastAPI) — НЕ ТРОГАТЬ, на него проксируем `/api/*` и пути ЛК

## Сборка

```bash
cd brainhire-next
npm ci                  # ставит зависимости из package-lock.json
npm run build           # создаёт .next/standalone — production-сервер
```

После build обязательно скопировать static-ассеты в standalone:
```bash
cp -r public            .next/standalone/public
cp -r .next/static      .next/standalone/.next/static
```

## Раскладка на сервере

Папка `/var/www/brainhire-next/` = содержимое `.next/standalone/*`.

```
/var/www/brainhire-next/
├── server.js              # точка входа Next.js
├── node_modules/          # минимальный набор (~70 МБ)
├── package.json
├── public/                # картинки, иконки, PDF, фото команды
└── .next/
    ├── server/
    └── static/            # CSS/JS-чанки
```

Залить через rsync с локали:
```bash
rsync -avz --delete \
  ./brainhire-next/.next/standalone/ \
  user@brainhire.ru:/var/www/brainhire-next/
```

## systemd unit

`/etc/systemd/system/brainhire-next.service`:

```ini
[Unit]
Description=BRaiN HR Next.js
After=network.target

[Service]
Type=simple
User=brainhire
WorkingDirectory=/var/www/brainhire-next
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOSTNAME=127.0.0.1
Environment=NEXT_PUBLIC_SITE_URL=https://brainhire.ru
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=2

[Install]
WantedBy=multi-user.target
```

```bash
systemctl enable brainhire-next
systemctl start brainhire-next
journalctl -u brainhire-next -f         # просмотр логов
```

## Nginx — критично

Лиды постят с лендинга на `/api/email/demo/` — это **существующий бэкэнд BRaiN HR**.
Лендинг (новый Next.js) — всё остальное.

`/etc/nginx/sites-available/brainhire.ru`:

```nginx
server {
    listen 443 ssl http2;
    server_name brainhire.ru www.brainhire.ru;

    ssl_certificate     /etc/letsencrypt/live/brainhire.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/brainhire.ru/privkey.pem;

    # 1) Существующий бэкэнд (формы, ATS API, ЛК) — НЕ ТРОГАТЬ
    location /api/      { proxy_pass http://127.0.0.1:<BACKEND_PORT>; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-Proto https; }
    location /signup/   { proxy_pass http://127.0.0.1:<BACKEND_PORT>; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; }
    location /signin/   { proxy_pass http://127.0.0.1:<BACKEND_PORT>; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; }
    location /bh/       { proxy_pass http://127.0.0.1:<BACKEND_PORT>; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; }
    location /vacancy/  { proxy_pass http://127.0.0.1:<BACKEND_PORT>; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; }
    location /chat/     { proxy_pass http://127.0.0.1:<BACKEND_PORT>; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; }
    location /docs/     { proxy_pass http://127.0.0.1:<BACKEND_PORT>; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; }

    # 2) Кэш статики Next.js на год
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 1y;
        add_header Cache-Control "public, immutable, max-age=31536000";
    }

    # 3) Всё остальное — новый лендинг (Next.js)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto https;
    }
}

server {
    listen 80;
    server_name brainhire.ru www.brainhire.ru;
    return 301 https://$host$request_uri;
}
```

**`<BACKEND_PORT>`** — порт уже работающего API BRaiN HR. Узнать: `ss -tlnp` или у того, кто настраивал текущую систему.

## SSL (Let's Encrypt)

```bash
certbot --nginx -d brainhire.ru -d www.brainhire.ru
```

Авто-renewal через systemd-timer уже идёт в стандартной поставке certbot.

## Переменные окружения

Базовый запуск работает без дополнительных ENV — всё захардкожено в коде:
- ID Я.Метрики: `99950315` (`src/lib/analytics.ts`)
- GTM-контейнер: `GTM-TXMBV9VM` (`src/lib/analytics.ts`)

Опциональные ENV (только если нужны):
| Переменная | По умолчанию | Что меняет |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://brainhire.ru` | Канонический URL в OG/sitemap |
| `NEXT_PUBLIC_LEAD_ENDPOINT` | `/api/email/demo/` | URL POST-эндпоинта формы |

## Внешние зависимости рантайма

Лендинг подгружает с CDN (на сервере хранить не нужно):
| URL | Что |
|---|---|
| `mc.yandex.ru/metrika/tag.js` | Я.Метрика |
| `www.googletagmanager.com/gtm.js` | GTM |
| `storage.yandexcloud.net/brain-public/media/video_landing.mp4` | Видео для плавающего виджета |
| `brainhire.ru/icons/Logo.svg` | Логотип на /mws-partnership |
| `brainhire.ru/images/videoPreview.avif` | Постер плавающего видео |

## 301-редиректы (уже в `next.config.ts`)

- `/pricing` → `/tariffs`
- `/ai-screening` → `/ai-resume-analysis`
- `/cases` → `/case`
- `/cases/:slug` → `/case/:slug`

## Smoke-test после раскатки

```bash
curl -I https://brainhire.ru/                  # 200
curl -I https://brainhire.ru/solutions/hr      # 200
curl -I https://brainhire.ru/ai-resume-analysis # 200
curl -I https://brainhire.ru/case/medicine     # 200
curl -I https://brainhire.ru/pricing           # 301 Location: /tariffs
curl -I https://brainhire.ru/cases             # 301 Location: /case
```

В браузере:
- Главная открывается, в левом нижнем углу автоматически проигрывается muted-видео
- Sticky-сайдбар справа работает (4 кнопки)
- Любая форма заявки → submit → проверить, что лид дошёл до бэка (POST `/api/email/demo/`)
- В Я.Метрике `?_ym_debug=1` показывает срабатывание цели `sent_form_SolutionForm_form__JYK9w` после успешной отправки формы

## Откат

Если что-то сломалось — выключить новый сервис и вернуть старый nginx-конфиг:
```bash
systemctl stop brainhire-next
cp /etc/nginx/sites-available/brainhire.ru.backup /etc/nginx/sites-available/brainhire.ru
nginx -t && systemctl reload nginx
```

## Список всех страниц на сайте (для контроля 200)

**Лендинг (Next.js):** `/`, `/about`, `/tariffs`, `/calculator`, `/contacts`, `/reviews`, `/hr-cashback`, `/mws-partnership`, `/recruiting`, `/blog`

**Top-level features (5):** `/ai-vacancy-creation`, `/ai-resume-analysis`, `/ai-videointerview`, `/ai-staff-scoring`, `/ai-realtime-interview`

**Solutions (12):** `/solutions/{it,smb,enterprise,finance,hr,horeca,education,sales,logistics,marketing,marketplaces,sellers}`

**Cases:** `/case` + `/case/{it,finance,medicine,production,retail}`

**ЛК (старый бэкэнд):** `/signup`, `/signin`, `/bh`, `/vacancy`, `/vacancy/[id]`, `/chat`, `/profile`, `/finances`, и т.д.

**Документы (старый бэкэнд):** `/docs/privacy-policy`, `/docs/personal-data-consent`, `/docs/user-agreement`, `/docs/user-instructions`, `/docs/product-description`

## Контакты

- Версия Next.js: 15.5.15
- Версия React: 19
- Lockfile: `package-lock.json` (использовать `npm ci`, не `npm install`)
- Node.js: 20+ обязательно
