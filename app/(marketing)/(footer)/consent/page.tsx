import ConsentHero from "@/components/pages/ConsentHero";
import TelehealthBenefits from "@/components/pages/TelehealthBenefits";
import HowTelehealthWorks from "@/components/pages/HowTelehealthWorks";
import ConsentRisksSection from "@/components/pages/ConsentRisksSection";
import ConsentPrivacySection from "@/components/pages/ConsentPrivacySection";
import ConsentRightsSection from "@/components/pages/ConsentRightsSection";

export default function ConsentPage() {
  return (
    <>
      <ConsentHero />
      <HowTelehealthWorks />
      <TelehealthBenefits />
      <ConsentRisksSection />
      <ConsentPrivacySection />
      <ConsentRightsSection />
    </>
  );
}
