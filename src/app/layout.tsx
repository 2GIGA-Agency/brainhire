import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BrainHire для Маркетплейсов — Наймите сотрудника склада за 3 дня",
  description:
    "ИИ-рекрутер для маркетплейсов. Пока вы читаете отклики — товары не отгружаются. BrainHire автоматически найдет, проверит и пришлет вам 3 готовых кандидата уже завтра утром.",
  keywords:
    "рекрутинг маркетплейс, найм склад, ИИ рекрутер, Wildberries, Ozon, найм сотрудников, автоматический подбор персонала",
  openGraph: {
    title: "BrainHire — Найдите сотрудника склада за 3 дня, а не за 2 недели",
    description:
      "ИИ-рекрутер автоматически публикует вакансии, скорит резюме и проводит первичные интервью. Вы получаете только лучших кандидатов.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
