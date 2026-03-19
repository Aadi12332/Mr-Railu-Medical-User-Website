import AnxietyHero from "@/components/conditions/AnxietyHero";
import AnxietyWhatIs from "@/components/conditions/AnxietyWhatIs";
import AnxietyFact from "@/components/conditions/AnxietyFact";
import AnxietyHowItWorks from "@/components/conditions/AnxietyHowItWorks";
import AnxietyWhyChoose from "@/components/conditions/AnxietyWhyChoose";
import AnxietyTreatmentApproach from "@/components/conditions/AnxietyTreatmentApproach";
import AnxietyTreatmentManagement from "@/components/conditions/AnxietyTreatmentManagement";
import TreatmentsPricing from "@/components/services/TreatmentsPricing";
import OnlinePrescriptionsComparison from "@/components/services/OnlinePrescriptionsComparison";
import MeetProvidersSection from "@/components/services/MeetProvidersSection";
import PatientPortalSection from "@/components/services/PatientPortalSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import OnlinePrescriptionsAdvantages from "@/components/services/OnlinePrescriptionsAdvantages";
import AnxietyTypes from "@/components/conditions/AnxietyTypes";
import FAQSection from "@/components/FAQSection";

export default function Page() {
  return (
    <>
      <AnxietyHero />
      <AnxietyWhatIs />
      <AnxietyHowItWorks />
      <AnxietyWhyChoose />
      <TreatmentsPricing
        title="Simple, Honest"
        subtitle="pricing"
        description="Quality care shouldn't come with surprise costs. Here's exactly what you'll pay."
      />

      <MeetProvidersSection />
      <PatientPortalSection />
      <SuccessStoriesSection />
      <AnxietyTreatmentApproach />
      <AnxietyTreatmentManagement />
      <OnlinePrescriptionsAdvantages />
      <OnlinePrescriptionsComparison />
      <AnxietyFact />
      <AnxietyTypes />
      <div className="bg-[#F9FAFB]">
      <FAQSection />
      </div>
    </>
  );
}
