import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, BookOpen } from "lucide-react";
import { getPosts } from "@/lib/posts";

export function BlogHubPage() {
  const posts = getPosts();

  return (
    <main>
      {/* HERO */}
      <section className="bg-white pb-14 pt-20 max-bp-lg:py-14">
        <Container>
          <div className="text-[13px] text-text2">
            <Link href="/" className="text-brand1 hover:text-brand1-h">
              Главная
            </Link>
            <span className="mx-1.5 text-grey2">&rsaquo;</span>
            Блог
          </div>
          <h1 className="mt-6 text-[clamp(36px,4vw,52px)] font-extrabold leading-[1.1] tracking-[-1.2px] text-text1">
            Блог BRaiN HR
          </h1>
          <p className="mt-5 max-w-[640px] text-[17px] leading-[1.7] text-text2">
            Кейсы, аналитика рынка труда, тренды HR-tech и практические советы по
            автоматизации найма с искусственным интеллектом.
          </p>
        </Container>
      </section>

      {/* POSTS LIST OR EMPTY STATE */}
      <section className="border-y border-grey2 bg-grey1 py-20 max-bp-lg:py-14">
        <Container>
          {posts.length === 0 ? (
            <div className="mx-auto max-w-[560px] rounded-card border border-grey2 bg-white px-8 py-14 text-center shadow-soft">
              <span className="mx-auto mb-5 inline-flex size-14 items-center justify-center rounded-full bg-brand1-bg text-brand1">
                <BookOpen size={26} strokeWidth={1.8} />
              </span>
              <h2 className="text-[22px] font-extrabold tracking-[-0.4px] text-text1">
                Скоро здесь появятся первые статьи
              </h2>
              <p className="mx-auto mt-3 max-w-[420px] text-[14px] leading-[1.7] text-text2">
                Готовим материалы о найме с ИИ, кейсы клиентов и практические гайды.
                Подпишитесь на анонсы — пришлём первую публикацию первыми.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 max-bp-sm:flex-col max-bp-sm:items-center">
                <Button href="/contacts" variant="primary">
                  Подписаться на анонсы
                </Button>
                <Button href="/" variant="secondary">
                  На главную
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-5 max-bp-lg:grid-cols-2 max-bp-sm:grid-cols-1">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-card border border-grey2 bg-white shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand1 hover:shadow-md"
                >
                  <div
                    className="aspect-[16/9] w-full"
                    style={{ background: p.cover?.gradient ?? "#E6F4FF" }}
                  />
                  <div className="flex flex-1 flex-col px-6 py-5">
                    <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.6px] text-brand1">
                      <span>{p.tag}</span>
                      <span className="size-1 rounded-full bg-grey2" />
                      <span className="text-text2">{p.date}</span>
                    </div>
                    <h3 className="mb-3 text-[18px] font-extrabold leading-[1.3] tracking-[-0.3px] text-text1 transition-colors group-hover:text-brand1">
                      {p.title}
                    </h3>
                    <p className="mb-5 flex-1 text-[14px] leading-[1.65] text-text2">
                      {p.description}
                    </p>
                    <div className="flex items-center justify-between text-[12px] text-text2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand1-bg text-[10px] font-bold text-brand1">
                          {p.authorInitials}
                        </span>
                        <span>{p.author}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 font-semibold text-brand1">
                        {p.readTime}
                        <ArrowRight size={12} strokeWidth={2} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
