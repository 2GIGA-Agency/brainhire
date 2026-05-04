import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { CaseItPage, caseItMeta } from "@/components/pages/CaseItPage";
import { CaseFinancePage, caseFinanceMeta } from "@/components/pages/CaseFinancePage";
import { CaseMedicinePage, caseMedicineMeta } from "@/components/pages/CaseMedicinePage";
import { CaseProductionPage, caseProductionMeta } from "@/components/pages/CaseProductionPage";
import { CaseRetailPage, caseRetailMeta } from "@/components/pages/CaseRetailPage";
import { CaseITealPage, caseITealMeta } from "@/components/pages/CaseITealPage";
import { CaseKnamPage, caseKnamMeta } from "@/components/pages/CaseKnamPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

const META = {
  "it-1": caseItMeta,
  "finance-1": caseFinanceMeta,
  "medicine-1": caseMedicineMeta,
  "production-1": caseProductionMeta,
  "retail-1": caseRetailMeta,
  iteal: caseITealMeta,
  knam: caseKnamMeta,
} as const;

type Slug = keyof typeof META;

const SLUGS: Slug[] = ["it-1", "finance-1", "medicine-1", "production-1", "retail-1", "iteal", "knam"];

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

  const meta = META[slug];
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Кейсы", item: `${SITE_URL}/case` },
      { "@type": "ListItem", position: 3, name: meta.title, item: `${SITE_URL}/case/${slug}` },
    ],
  };

  switch (slug) {
    case "it-1":
      return <><JsonLd data={breadcrumb} /><CaseItPage /></>;
    case "finance-1":
      return <><JsonLd data={breadcrumb} /><CaseFinancePage /></>;
    case "medicine-1":
      return <><JsonLd data={breadcrumb} /><CaseMedicinePage /></>;
    case "production-1":
      return <><JsonLd data={breadcrumb} /><CaseProductionPage /></>;
    case "retail-1":
      return <><JsonLd data={breadcrumb} /><CaseRetailPage /></>;
    case "iteal":
      return <><JsonLd data={breadcrumb} /><CaseITealPage /></>;
    case "knam":
      return <><JsonLd data={breadcrumb} /><CaseKnamPage /></>;
  }
}
