import AnxietyWhyChoose from "@/components/conditions/AnxietyWhyChoose";
import OcdHero from "@/components/conditions/OcdHero";
import OcdTherapy from "@/components/conditions/OcdTherapy";
import OcdContributors from "@/components/conditions/OcdContributors";
import OcdCommonExperiences from "@/components/conditions/OcdCommonExperiences";
import OcdMedication from "@/components/conditions/OcdMedication";
import OcdHowItWorks from "@/components/conditions/OcdHowItWorks";
import MeetProvidersSection from "@/components/services/MeetProvidersSection";
import PatientPortalSection from "@/components/services/PatientPortalSection";
import TreatmentsPricing from "@/components/services/TreatmentsPricing";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import FAQSection from "@/components/FAQSection";

export default function page() {
  return (
    <>
      <OcdHero />
      <AnxietyWhyChoose />
      <OcdHowItWorks />
      <TreatmentsPricing
        title="Simple, Honest"
        subtitle="pricing"
        description="Quality care shouldn't come with surprise costs. Here's exactly what you'll pay."
      />
      <MeetProvidersSection />
      <PatientPortalSection />
      <SuccessStoriesSection />
      <OcdContributors />
      <OcdCommonExperiences />
      <OcdTherapy />
      <OcdMedication />
      <FAQSection />
    </>
  );
}
