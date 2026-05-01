import type { Block } from "@/types/content";
import { Hero } from "./Hero";
import { Ticker } from "./Ticker";
import { PainCards } from "./PainCards";
import { StatsBar } from "./StatsBar";
import { Steps } from "./Steps";
import { Compare } from "./Compare";
import { Logos } from "./Logos";
import { CasesGrid } from "./CasesGrid";
import { FeatureRows } from "./FeatureRows";
import { VideoDemo } from "./VideoDemo";
import { CTAForm } from "./CTAForm";
import { BlogGrid } from "./BlogGrid";
import { FAQ } from "./FAQ";
import { Audience } from "./Audience";
import { SolutionsGrid } from "./SolutionsGrid";
import { TrustIndicators } from "./TrustIndicators";
import { FeaturesGrid } from "./FeaturesGrid";
import { RolesGrid } from "./RolesGrid";
import { Placeholder } from "./Placeholder";

type Props = { blocks: Block[] };

export function BlockRenderer({ blocks }: Props) {
  return (
    <>
      {blocks.map((block, idx) => {
        const key = `${block.type}-${idx}`;
        switch (block.type) {
          case "Hero":
            return <Hero key={key} {...block} />;
          case "Ticker":
            return <Ticker key={key} {...block} />;
          case "PainCards":
            return <PainCards key={key} {...block} />;
          case "StatsBar":
            return <StatsBar key={key} {...block} />;
          case "Steps":
            return <Steps key={key} {...block} />;
          case "Compare":
            return <Compare key={key} {...block} />;
          case "Logos":
            return <Logos key={key} {...block} />;
          case "CasesGrid":
            return <CasesGrid key={key} {...block} />;
          case "FeatureRows":
            return <FeatureRows key={key} {...block} />;
          case "VideoDemo":
            return <VideoDemo key={key} {...block} />;
          case "CTAForm":
            return <CTAForm key={key} {...block} />;
          case "BlogGrid":
            return <BlogGrid key={key} {...block} />;
          case "FAQ":
            return <FAQ key={key} {...block} />;
          case "Audience":
            return <Audience key={key} {...block} />;
          case "SolutionsGrid":
            return <SolutionsGrid key={key} {...block} />;
          case "TrustIndicators":
            return <TrustIndicators key={key} {...block} />;
          case "FeaturesGrid":
            return <FeaturesGrid key={key} {...block} />;
          case "RolesGrid":
            return <RolesGrid key={key} {...block} />;
          case "Placeholder":
            return <Placeholder key={key} {...block} />;
          default: {
            const exhaustive: never = block;
            void exhaustive;
            return null;
          }
        }
      })}
    </>
  );
}
