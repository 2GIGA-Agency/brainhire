import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import StatsBar from "@/components/StatsBar";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ResultsSection from "@/components/ResultsSection";
import UrgencySection from "@/components/UrgencySection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function MarketplaceLandingPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <HeroSection />
      <ProblemSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorksSection />
      <ResultsSection />
      <UrgencySection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
