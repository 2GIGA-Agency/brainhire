import type { Metadata } from "next";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { loadPage } from "@/lib/loadPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

export async function generateMetadata(): Promise<Metadata> {
  const page = loadPage("home");
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: page.meta.canonical ?? "/" },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: SITE_URL,
      type: "website",
    },
  };
}

export default function HomePage() {
  const page = loadPage("home");
  return <BlockRenderer blocks={page.blocks} />;
}
