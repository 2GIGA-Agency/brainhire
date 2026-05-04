import type { Metadata } from "next";
import { VacancyCreationPage } from "@/components/pages/VacancyCreationPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

export const metadata: Metadata = {
  title: "ИИ-создание вакансий",
  description:
    "Генератор вакансий BRaiN HR автоматически создаёт профессиональное описание вакансии на основе ваших требований. Сократите время на подготовку текста вакансии с нескольких часов до 30 секунд",
  alternates: { canonical: "/ai-vacancy-creation" },
  openGraph: {
    title: "ИИ-создание вакансий — BRaiN HR",
    description:
      "Генератор вакансий BRaiN HR автоматически создаёт профессиональное описание вакансии на основе ваших требований. Сократите время на подготовку текста вакансии с нескольких часов до 30 секунд",
    url: `${SITE_URL}/ai-vacancy-creation`,
    type: "website",
  },
};

export default function Page() {
  return <VacancyCreationPage />;
}

