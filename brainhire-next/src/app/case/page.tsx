import type { Metadata } from "next";
import { CaseHubPage } from "@/components/pages/CaseHubPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

const TITLE = "Кейсы внедрения — BRaiN HR";
const DESCRIPTION =
  "Кейсы внедрения BRaiN HR. Как компании из IT, финансов, производства, медицины и ритейла ускорили найм на 60-73% с помощью ИИ-автоматизации.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/case" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/case`,
    type: "website",
  },
};

export default function Page() {
  return <CaseHubPage />;
}

