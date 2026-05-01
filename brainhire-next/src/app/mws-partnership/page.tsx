import type { Metadata } from "next";
import { MwsPartnershipPage } from "@/components/pages/MwsPartnershipPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

export const metadata: Metadata = {
  title: "BRaiN HR + MWS — ИИ-рекрутинг на инфраструктуре МТС Web Services",
  description:
    "Стратегическое партнёрство BRaiN HR и MWS (МТС Web Services). Готовое AI-решение для автоматизации найма на enterprise-облаке №1 в России. 152-ФЗ, SLA 99,95%, данные в РФ.",
  alternates: { canonical: "/mws-partnership" },
  openGraph: {
    title: "BRaiN HR + MWS — ИИ-рекрутинг на инфраструктуре МТС Web Services",
    description:
      "Стратегическое партнёрство BRaiN HR и MWS (МТС Web Services). Готовое AI-решение для автоматизации найма на enterprise-облаке №1 в России. 152-ФЗ, SLA 99,95%, данные в РФ.",
    url: `${SITE_URL}/mws-partnership`,
    type: "website",
  },
};

export default function Page() {
  return <MwsPartnershipPage />;
}
