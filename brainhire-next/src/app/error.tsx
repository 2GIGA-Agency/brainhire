"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="py-24 max-bp-lg:py-16">
      <Container className="flex flex-col items-center text-center">
        <div className="mb-4 text-[120px] font-extrabold leading-none text-brand1 max-bp-md:text-[80px]">
          500
        </div>
        <h1 className="mb-4 text-[clamp(26px,3vw,38px)] font-extrabold tracking-[-0.7px] text-text1">
          Что-то пошло не&nbsp;так
        </h1>
        <p className="mb-8 max-w-[540px] text-[15px] leading-[1.72] text-text2">
          На сервере произошла ошибка. Мы уже знаем о&nbsp;проблеме
          и&nbsp;работаем над её&nbsp;устранением.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={reset} variant="hero-primary">
            Попробовать снова
          </Button>
          <Button href="/" variant="hero-outline">
            На&nbsp;главную
          </Button>
        </div>
      </Container>
    </section>
  );
}
