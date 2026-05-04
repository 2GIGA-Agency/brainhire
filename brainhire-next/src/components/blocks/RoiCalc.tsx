import { Container } from "@/components/ui/Container";
import { SectionHeading } from "./_SectionHeading";
import { RoiCalculator } from "@/components/interactive/RoiCalculator";
import type { BlockOf } from "./_types";

type Props = BlockOf<"RoiCalc">;

export function RoiCalc({ tag, title, titleHtml, sub, bgGrey }: Props) {
  return (
    <section className={`py-20 max-bp-lg:py-14 ${bgGrey ? "bg-grey1" : "bg-white"}`}>
      <Container>
        {title && (
          <div className="mb-12">
            <SectionHeading tag={tag} title={title} titleHtml={titleHtml} sub={sub} />
          </div>
        )}
        <RoiCalculator />
      </Container>
    </section>
  );
}
