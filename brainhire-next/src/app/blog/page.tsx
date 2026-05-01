import type { Metadata } from "next";
import { BlogHubPage } from "@/components/pages/BlogHubPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

export const metadata: Metadata = {
  title: "Блог BRaiN HR — кейсы, аналитика и тренды найма с ИИ",
  description:
    "Кейсы клиентов BRaiN HR, аналитика рынка труда, тренды HR-tech и практические советы по автоматизации найма с искусственным интеллектом.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Блог BRaiN HR",
    description:
      "Кейсы клиентов BRaiN HR, аналитика рынка труда, тренды HR-tech и практические советы по автоматизации найма с искусственным интеллектом.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function Page() {
  return <BlogHubPage />;
}
