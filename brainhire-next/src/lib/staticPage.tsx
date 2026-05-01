import type { Metadata } from "next";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { loadPage } from "@/lib/loadPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

export function buildStaticPageMetadata(slug: string, urlPath: string): Metadata {
  const page = loadPage(slug);
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: page.meta.canonical ?? urlPath },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: `${SITE_URL}${urlPath}`,
      type: "website",
      images: page.meta.ogImage ? [page.meta.ogImage] : undefined,
    },
    robots: page.meta.noindex ? { index: false, follow: false } : undefined,
  };
}

export function StaticPageRenderer({ slug }: { slug: string }) {
  const page = loadPage(slug);
  return <BlockRenderer blocks={page.blocks} />;
}
