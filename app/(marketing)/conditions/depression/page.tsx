import DepressionHero from "@/components/conditions/DepressionHero";
import DepressionUnderstandSymptoms from "@/components/conditions/DepressionUnderstandSymptoms";
import DepressionConditionsSupport from "@/components/conditions/DepressionConditionsSupport";
import DepressionSymptoms from "@/components/conditions/DepressionSymptoms";
import DepressionMedicationOptions from "@/components/conditions/DepressionMedicationOptions";
import AdhdHowItWorks from "@/components/services/AdhdHowItWorks";
import AdhdWhyChoose from "@/components/services/AdhdWhyChoose";
import TreatmentsPricing from "@/components/services/TreatmentsPricing";
import PatientPortalSection from "@/components/services/PatientPortalSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import OnlinePrescriptionsAdvantages from "@/components/services/OnlinePrescriptionsAdvantages";
import OnlinePrescriptionsComparison from "@/components/services/OnlinePrescriptionsComparison";
import MeetProvidersSection from "@/components/services/MeetProvidersSection";
import DepressionResources from "@/components/conditions/DepressionResources";
import FAQSection from "@/components/FAQSection";

export default function page() {
  return (
    <>
      <DepressionHero />
      <DepressionUnderstandSymptoms />
      <AdhdHowItWorks />
      <AdhdWhyChoose />
      <TreatmentsPricing
        title="Simple, Honest"
        subtitle="pricing"
        description="Quality care shouldn't come with surprise costs. Here's exactly what you'll pay."
      />
      <DepressionConditionsSupport />

      <DepressionSymptoms />

      <DepressionMedicationOptions />
      <PatientPortalSection />
      <SuccessStoriesSection />
      <OnlinePrescriptionsAdvantages />
      <OnlinePrescriptionsComparison />
      <MeetProvidersSection />
      <DepressionResources />
      <FAQSection />
    </>
  );
}
