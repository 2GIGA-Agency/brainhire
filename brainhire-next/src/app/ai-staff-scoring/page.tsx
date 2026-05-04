import type { Metadata } from "next";
import { StaffScoringPage } from "@/components/pages/StaffScoringPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

export const metadata: Metadata = {
  title: "ИИ-оценка персонала — BRaiN HR",
  description:
    "Автоматизированная оценка персонала с помощью искусственного интеллекта. Повысьте объективность, сократите время на процедуры оценки и получите точные данные для развития персонала.",
  alternates: { canonical: "/ai-staff-scoring" },
  openGraph: {
    title: "ИИ-оценка персонала — BRaiN HR",
    description:
      "Автоматизированная оценка персонала с помощью искусственного интеллекта. Повысьте объективность, сократите время на процедуры оценки и получите точные данные для развития персонала.",
    url: `${SITE_URL}/ai-staff-scoring`,
    type: "website",
  },
};

export default function Page() {
  return <StaffScoringPage />;
}

