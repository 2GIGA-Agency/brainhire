import type { Metadata } from "next";
import { CalculatorPage } from "@/components/pages/CalculatorPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

export const metadata: Metadata = {
  title: "Калькулятор выгоды",
  description:
    "Рассчитайте экономию от автоматизации найма с BRaiN HR. Интерактивный калькулятор покажет точную выгоду для вашей компании.",
  alternates: { canonical: "/calculator" },
  openGraph: {
    title: "Калькулятор выгоды — BRaiN HR",
    description:
      "Рассчитайте экономию от автоматизации найма с BRaiN HR. Интерактивный калькулятор покажет точную выгоду для вашей компании.",
    url: `${SITE_URL}/calculator`,
    type: "website",
  },
};

export default function Page() {
  return <CalculatorPage />;
}

