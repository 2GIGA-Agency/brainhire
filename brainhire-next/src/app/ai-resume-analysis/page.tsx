import type { Metadata } from "next";
import { ResumeAnalysisPage } from "@/components/pages/ResumeAnalysisPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

const TITLE = "ИИ-анализ резюме — BRaiN HR";
const DESCRIPTION =
  "Интеллектуальная платформа для мгновенного скрининга резюме и оценки кандидата. Обрабатывайте сотни резюме одновременно, получая точные оценки кандидатов и сокращая время найма в 5 раз.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ai-resume-analysis" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/ai-resume-analysis`,
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ResumeAnalysisPage />;
}
