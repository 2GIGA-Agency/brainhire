import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { tryLoadPage } from "@/lib/loadPage";
import { getSolutions, findSolution } from "@/lib/solutions";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

type RouteParams = { slug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  return getSolutions().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = findSolution(slug);
  if (!entry) return { title: "Не найдено" };

  const page = tryLoadPage(`solutions-${slug}`);
  if (!page) {
    return {
      title: entry.title,
      description: `Отраслевое решение BRaiN HR — ${entry.title}.`,
    };
  }

  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: {
      canonical: page.meta.canonical ?? `/solutions/${slug}`,
    },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: `${SITE_URL}/solutions/${slug}`,
      type: "website",
      images: page.meta.ogImage ? [page.meta.ogImage] : undefined,
    },
    robots: page.meta.noindex ? { index: false, follow: false } : undefined,
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const entry = findSolution(slug);
  if (!entry) notFound();

  const page = tryLoadPage(`solutions-${slug}`);
  if (!page) {
    return (
      <section className="py-24 text-center">
        <h1 className="text-3xl font-extrabold text-text1">{entry.title}</h1>
        <p className="mt-3 text-text2">Контент страницы появится в Фазе 4.</p>
      </section>
    );
  }

  return <BlockRenderer blocks={page.blocks} />;
}
