import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="py-24 max-bp-lg:py-16">
      <Container className="flex flex-col items-center text-center">
        <div className="mb-4 text-[120px] font-extrabold leading-none text-brand1 max-bp-md:text-[80px]">
          404
        </div>
        <h1 className="mb-4 text-[clamp(26px,3vw,38px)] font-extrabold tracking-[-0.7px] text-text1">
          Страница не&nbsp;найдена
        </h1>
        <p className="mb-8 max-w-[540px] text-[15px] leading-[1.72] text-text2">
          Возможно, ссылка устарела или в&nbsp;адресе опечатка. Вернитесь на&nbsp;главную
          или посмотрите наши решения.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="/" variant="hero-primary">
            На&nbsp;главную
          </Button>
          <Button href="/case" variant="hero-outline">
            Кейсы
          </Button>
        </div>
      </Container>
    </section>
  );
}
