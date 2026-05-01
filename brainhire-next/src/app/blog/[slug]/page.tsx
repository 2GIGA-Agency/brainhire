import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { findPost, getPosts } from "@/lib/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return { title: "Статья не найдена" };

  return {
    title: `${post.title} — Блог BRaiN HR`,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function Page({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  return (
    <main>
      <section className="bg-white py-14 max-bp-lg:py-10">
        <Container>
          <div className="text-[13px] text-text2">
            <Link href="/" className="text-brand1 hover:text-brand1-h">
              Главная
            </Link>
            <span className="mx-1.5 text-grey2">&rsaquo;</span>
            <Link href="/blog" className="text-brand1 hover:text-brand1-h">
              Блог
            </Link>
            <span className="mx-1.5 text-grey2">&rsaquo;</span>
            {post.title}
          </div>

          <article className="mx-auto mt-8 max-w-[760px]">
            <div className="mb-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.6px] text-brand1">
              <span>{post.tag}</span>
              <span className="size-1 rounded-full bg-grey2" />
              <span className="text-text2">{post.date}</span>
            </div>
            <h1 className="text-[clamp(28px,3.5vw,42px)] font-extrabold leading-[1.15] tracking-[-0.8px] text-text1">
              {post.title}
            </h1>
            <p className="mt-5 text-[17px] leading-[1.7] text-text2">{post.description}</p>

            <div className="mt-8 flex items-center gap-3 border-y border-grey2 py-4">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand1-bg text-[12px] font-bold text-brand1">
                {post.authorInitials}
              </span>
              <div>
                <div className="text-[14px] font-semibold text-text1">{post.author}</div>
                <div className="text-[12px] text-text2">{post.readTime}</div>
              </div>
            </div>

            <div className="mt-12 rounded-card border border-grey2 bg-grey1 px-8 py-12 text-center">
              <h2 className="text-[20px] font-extrabold text-text1">
                Полный текст статьи скоро будет здесь
              </h2>
              <p className="mt-3 text-[14px] leading-[1.65] text-text2">
                Каркас блога готов — содержимое статей появится в ближайших публикациях.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button href="/blog" variant="primary">
                  Все статьи
                </Button>
                <Button href="/contacts" variant="secondary">
                  Подписаться на анонсы
                </Button>
              </div>
            </div>
          </article>
        </Container>
      </section>
    </main>
  );
}
