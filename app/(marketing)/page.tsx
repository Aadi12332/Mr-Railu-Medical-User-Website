import HeroSection from "@/components/HeroSection";
import ExpertsSection from "@/components/ExpertsSection";
import SupportSection from "@/components/SupportSection";
import GettingStartedSection from "@/components/GettingStartedSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import FAQSection from "@/components/FAQSection";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <SupportSection />
      <ExpertsSection />
      <GettingStartedSection />
      <SuccessStoriesSection />
      <FAQSection />
    </main>
  );
}
