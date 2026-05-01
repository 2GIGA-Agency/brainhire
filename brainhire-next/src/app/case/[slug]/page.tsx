import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseItPage, caseItMeta } from "@/components/pages/CaseItPage";
import { CaseFinancePage, caseFinanceMeta } from "@/components/pages/CaseFinancePage";
import { CaseMedicinePage, caseMedicineMeta } from "@/components/pages/CaseMedicinePage";
import { CaseProductionPage, caseProductionMeta } from "@/components/pages/CaseProductionPage";
import { CaseRetailPage, caseRetailMeta } from "@/components/pages/CaseRetailPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

const META = {
  it: caseItMeta,
  finance: caseFinanceMeta,
  medicine: caseMedicineMeta,
  production: caseProductionMeta,
  retail: caseRetailMeta,
} as const;

type Slug = keyof typeof META;

const SLUGS: Slug[] = ["it", "finance", "medicine", "production", "retail"];

function isSlug(value: string): value is Slug {
  return (SLUGS as string[]).includes(value);
}

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isSlug(slug)) return { title: "Кейс не найден" };

  const meta = META[slug];
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/case/${slug}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/case/${slug}`,
      type: "article",
    },
    robots: meta.noindex ? { index: false, follow: false } : undefined,
  };
}

export default async function Page({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();

  switch (slug) {
    case "it":
      return <CaseItPage />;
    case "finance":
      return <CaseFinancePage />;
    case "medicine":
      return <CaseMedicinePage />;
    case "production":
      return <CaseProductionPage />;
    case "retail":
      return <CaseRetailPage />;
  }
}
