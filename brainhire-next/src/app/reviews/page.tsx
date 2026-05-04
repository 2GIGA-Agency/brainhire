import type { Metadata } from "next";
import { ReviewsPage } from "@/components/pages/ReviewsPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

export const metadata: Metadata = {
  title: "Отзывы клиентов",
  description:
    "Отзывы клиентов BRaiN HR. Более 150 компаний доверяют нам автоматизацию найма и оценки персонала. Реальные результаты и кейсы.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "Отзывы клиентов — BRaiN HR",
    description:
      "Отзывы клиентов BRaiN HR. Более 150 компаний доверяют нам автоматизацию найма и оценки персонала. Реальные результаты и кейсы.",
    url: `${SITE_URL}/reviews`,
    type: "website",
  },
};

export default function Page() {
  return <ReviewsPage />;
}

