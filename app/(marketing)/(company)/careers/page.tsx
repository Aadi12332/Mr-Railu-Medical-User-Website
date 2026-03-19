import CareersHero from "@/components/company/CareersHero";
import CareersMissionSection from "@/components/company/CareersMissionSection";
import StandForSection from "@/components/company/StandForSection";
import BenefitsSection from "@/components/company/BenefitsSection";
import EarningsCalculatorSection from "@/components/company/EarningsCalculatorSection";
import CurrentOpeningsSection from "@/components/company/CurrentOpeningsSection";

export default function page() {
  return (
    <>
      <CareersHero />
      <CareersMissionSection />
      <StandForSection />
      <BenefitsSection />
      <EarningsCalculatorSection />
      <CurrentOpeningsSection />
    </>
  );
}
