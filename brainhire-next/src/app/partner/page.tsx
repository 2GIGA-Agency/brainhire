import type { Metadata } from "next";
import { HrCashbackPage } from "@/components/pages/HrCashbackPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

export const metadata: Metadata = {
  title: "HR Cashback — Партнёрская программа | BRaiN HR",
  description:
    "Станьте партнёром BRaiN HR и получайте до 25% от платежей привлечённых клиентов. Высокое вознаграждение, длительное начисление комиссии, поддержка менеджера.",
  alternates: { canonical: "/partner" },
  openGraph: {
    title: "HR Cashback — Партнёрская программа | BRaiN HR",
    description:
      "Станьте партнёром BRaiN HR и получайте до 25% от платежей привлечённых клиентов.",
    url: `${SITE_URL}/partner`,
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <HrCashbackPage />;
}
