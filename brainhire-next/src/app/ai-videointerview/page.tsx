import type { Metadata } from "next";
import { VideoInterviewPage } from "@/components/pages/VideoInterviewPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

export const metadata: Metadata = {
  title: "Первичное ИИ-видеоинтервью с прокторингом — BRaiN HR",
  description:
    "Первичное тестирование сотен кандидатов с прокторингом от BRaiN HR. Камера фиксирует подсказки, посторонних и использование ИИ — вы получаете только честные результаты.",
  alternates: { canonical: "/ai-videointerview" },
  openGraph: {
    title: "Первичное ИИ-видеоинтервью с прокторингом — BRaiN HR",
    description:
      "Первичное тестирование сотен кандидатов с прокторингом от BRaiN HR. Камера фиксирует подсказки, посторонних и использование ИИ — вы получаете только честные результаты.",
    url: `${SITE_URL}/ai-videointerview`,
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <VideoInterviewPage />;
}
