import WorkExcuseHero from "@/components/services/WorkExcuseHero";
import WhatIsWorkExcuse from "@/components/services/WhatIsWorkExcuse";
import WorkExcuseIncludes from "@/components/services/WorkExcuseIncludes";
import WorkExcuseWhyChoose from "@/components/services/WorkExcuseWhyChoose";
import WorkExcuseComparison from "@/components/services/WorkExcuseComparison";
import WorkExcuseEligibility from "@/components/services/WorkExcuseEligibility";
import WorkExcuseBenefits from "@/components/services/WorkExcuseBenefits";
import WorkExcuseSteps from "@/components/services/WorkExcuseSteps";
import FAQSection from "@/components/FAQSection";

export default function page() {
  return (
    <>
      <WorkExcuseHero />
      <WhatIsWorkExcuse />
      <WorkExcuseComparison />
      <WorkExcuseBenefits />
      <WorkExcuseIncludes />
      <WorkExcuseEligibility />
      <WorkExcuseSteps />
      <WorkExcuseWhyChoose />
      <FAQSection />
    </>
  );
}
