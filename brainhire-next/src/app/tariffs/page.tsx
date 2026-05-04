import type { Metadata } from "next";
import { TariffsPage } from "@/components/pages/TariffsPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

export const metadata: Metadata = {
  title: "Тарифы — BRaiN HR",
  description:
    "Тарифы BRaiN HR 2026. Текстовые диалоги, ИИ-видеоинтервью, комплексные решения и Real-time аватар. Оплата за использование, остатки переносятся.",
  alternates: { canonical: "/tariffs" },
  openGraph: {
    title: "Тарифы — BRaiN HR",
    description:
      "Тарифы BRaiN HR 2026. Текстовые диалоги, ИИ-видеоинтервью, комплексные решения и Real-time аватар. Оплата за использование, остатки переносятся.",
    url: `${SITE_URL}/tariffs`,
    type: "website",
  },
};

export default function Page() {
  return <TariffsPage />;
}

