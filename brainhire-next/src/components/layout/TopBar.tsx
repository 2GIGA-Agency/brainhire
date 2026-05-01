import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getSite } from "@/lib/site";

export function TopBar() {
  const { topbar } = getSite();
  if (topbar.length === 0) return null;

  return (
    <div className="border-b border-grey2 bg-grey1 max-bp-lg:hidden">
      <Container className="flex h-9 items-center justify-center">
        <div className="flex items-center">
          {topbar.map((link, idx) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                "border-r border-grey2 px-5 text-[12px] font-medium leading-9 text-text2 transition-colors hover:text-brand1 " +
                (idx === 0 ? "border-l border-grey2" : "")
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
