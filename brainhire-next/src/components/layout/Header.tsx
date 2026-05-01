import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { UrgencyBanner } from "@/components/layout/UrgencyBanner";
import { TopBar } from "@/components/layout/TopBar";
import { HeaderNav } from "@/components/layout/HeaderNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { getSite } from "@/lib/site";

export function Header() {
  const site = getSite();
  const { brand, header, topbar } = site;

  return (
    <>
      <UrgencyBanner />
      <header className="sticky top-0 z-50 border-b border-grey2 bg-white">
        <TopBar />
        <Container className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="flex items-center" aria-label={brand.name}>
            <Image
              src={brand.logo}
              alt={brand.name}
              width={161}
              height={44}
              priority
              className="h-7 w-auto"
            />
          </Link>

          <HeaderNav
            menu={header.menu}
            ctaPrimary={header.ctaPrimary}
            ctaSecondary={header.ctaSecondary}
          />

          <MobileNav
            menu={header.menu}
            ctaPrimary={header.ctaPrimary}
            ctaSecondary={header.ctaSecondary}
            topbar={topbar}
          />
        </Container>
      </header>
    </>
  );
}
