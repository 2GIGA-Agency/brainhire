import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

export const metadata: Metadata = {
  title: "Основная информация о компании BRaiN HR",
  description:
    "BRaiN HR - ИИ платформа по автоматизации найма. Узнайте больше о нашей компании, миссии, ценностях и профессиональном подходе к найму лучших кадров.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Основная информация о компании BRaiN HR",
    description:
      "BRaiN HR - ИИ платформа по автоматизации найма. Узнайте больше о нашей компании, миссии, ценностях и профессиональном подходе к найму лучших кадров.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AboutPage />;
}
