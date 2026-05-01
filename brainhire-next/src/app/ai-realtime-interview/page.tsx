import type { Metadata } from "next";
import { RealtimeInterviewPage } from "@/components/pages/RealtimeInterviewPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

const TITLE = "Real-time интервью с ИИ-аватаром — BRaiN HR";
const DESCRIPTION =
  "ИИ-аватар проводит глубокое собеседование в реальном времени. Адаптивные вопросы, анализ мимики и поведения, оценка soft skills и мотивации — без участия руководителя.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ai-realtime-interview" },
  robots: { index: false, follow: false },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/ai-realtime-interview`,
    type: "website",
  },
};

export default function Page() {
  return <RealtimeInterviewPage />;
}
