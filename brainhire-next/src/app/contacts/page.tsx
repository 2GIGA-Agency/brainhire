import type { Metadata } from "next";
import { ContactsPage } from "@/components/pages/ContactsPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

export const metadata: Metadata = {
  title: "Контакты | BRaiN HR",
  description:
    "Свяжитесь с нами! Компания BRaiN HR – ваши эксперты в подборе специалистов. Адрес, телефон, email и форма обратной связи – все способы контакта в одном месте",
  alternates: { canonical: "/contacts" },
  openGraph: {
    title: "Контакты | BRaiN HR",
    description:
      "Свяжитесь с нами! Компания BRaiN HR – ваши эксперты в подборе специалистов. Адрес, телефон, email и форма обратной связи – все способы контакта в одном месте",
    url: `${SITE_URL}/contacts`,
    type: "website",
  },
};

export default function Page() {
  return <ContactsPage />;
}
