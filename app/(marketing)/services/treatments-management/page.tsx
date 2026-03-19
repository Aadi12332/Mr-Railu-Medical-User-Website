import TreatmentsHero from "@/components/services/TreatmentsHero";
import TreatmentsFeatures from "@/components/services/TreatmentsFeatures";
import TreatmentsSteps from "@/components/services/TreatmentsSteps";
import TreatmentsPricing from "@/components/services/TreatmentsPricing";
import TreatmentsPrescriptions from "@/components/services/TreatmentsPrescriptions";
import TreatmentsComparison from "@/components/services/TreatmentsComparison";
import MedicationsSupported from "@/components/services/MedicationsSupported";
import TrustedProvidersSection from "@/components/services/TrustedProvidersSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import FAQSection from "@/components/FAQSection";
import PrescribingLimits from "@/components/services/PrescribingLimits";

export default function HeroSection() {
  return (
    <>
      <TreatmentsHero />
      <TreatmentsFeatures />
      <TreatmentsSteps />
      <TreatmentsPrescriptions />
      <MedicationsSupported />
      <TreatmentsPricing />
      <TreatmentsComparison />
      <TrustedProvidersSection />
      <PrescribingLimits />
      <SuccessStoriesSection />
      <FAQSection />
    </>
  );
}
