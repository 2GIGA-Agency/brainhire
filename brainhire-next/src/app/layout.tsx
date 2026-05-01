import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickySidebar } from "@/components/layout/StickySidebar";
import { FloatVideoWidget } from "@/components/layout/FloatVideoWidget";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { RevealObserver } from "@/components/interactive/RevealObserver";
import { GTM_ID, YM_COUNTER_ID } from "@/lib/analytics";
import { getSite } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BRaiN HR — ИИ-платформа для автоматизации найма",
    template: "%s — BRaiN HR",
  },
  description:
    "ИИ-платформа для автоматизации рекрутинга и оценки персонала. Нанимайте в 5 раз дешевле и быстрее.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "BRaiN HR",
    url: SITE_URL,
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const site = getSite();

  return (
    <html lang="ru" className={montserrat.variable}>
      <head>
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}</Script>
        <Script id="ym" strategy="afterInteractive">{`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          ym(${YM_COUNTER_ID}, "init", { defer: true, clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
        `}</Script>
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="GTM"
          />
        </noscript>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${YM_COUNTER_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </noscript>

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickySidebar />
        <FloatVideoWidget />

        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <RevealObserver />

        {/* dev-флаг наличия валидного site.json — не уйдёт в продакшен */}
        {process.env.NODE_ENV !== "production" && (
          <span hidden data-site-domain={site.domain} />
        )}
      </body>
    </html>
  );
}
