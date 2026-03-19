import AnxietyHowItWorks from "@/components/conditions/AnxietyHowItWorks";
import InsomniaHero from "@/components/conditions/InsomniaHero";
import SleepSchedule from "@/components/conditions/SleepSchedule";
import InsomniaTreatmentApproach from "@/components/conditions/InsomniaTreatmentApproach";
import InsomniaWhyEssential from "@/components/conditions/InsomniaWhyEssential";
import AdhdWhyChoose from "@/components/services/AdhdWhyChoose";
import MeetProvidersSection from "@/components/services/MeetProvidersSection";
import PatientPortalSection from "@/components/services/PatientPortalSection";
import TreatmentsPricing from "@/components/services/TreatmentsPricing";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import OnlinePrescriptionsAdvantages from "@/components/services/OnlinePrescriptionsAdvantages";
import OnlinePrescriptionsComparison from "@/components/services/OnlinePrescriptionsComparison";
import InsomniaSymptoms from "@/components/conditions/InsomniaSymptoms";
import FAQSection from "@/components/FAQSection";

export default function Page() {
  return (
    <>
      <InsomniaHero />
      <SleepSchedule />
      <AdhdWhyChoose />
      <AnxietyHowItWorks />
      <TreatmentsPricing
        title="Simple, Honest"
        subtitle="pricing"
        description="Quality care shouldn't come with surprise costs. Here's exactly what you'll pay."
      />
      <MeetProvidersSection />
      <PatientPortalSection />
      <InsomniaTreatmentApproach />
      <SuccessStoriesSection />
      <InsomniaWhyEssential />
      <OnlinePrescriptionsAdvantages />
      <OnlinePrescriptionsComparison />
      <InsomniaSymptoms />
      <FAQSection />
    </>
  );
}
