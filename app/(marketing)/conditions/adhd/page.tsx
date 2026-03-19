import AdhdHero from "@/components/services/AdhdHero";
import AdhdWhyChoose from "@/components/services/AdhdWhyChoose";
import AdhdHowItWorks from "@/components/services/AdhdHowItWorks";
import AdhdTreatmentApproach from "@/components/services/AdhdTreatmentApproach";
import PatientPortalSection from "@/components/services/PatientPortalSection";
import TreatmentsPricing from "@/components/services/TreatmentsPricing";
import TreatmentsComparison from "@/components/services/TreatmentsComparison";
import MeetProvidersSection from "@/components/services/MeetProvidersSection";
import AdhdSymptomsSection from "@/components/services/AdhdSymptomsSection";

export default function Page() {
  return (
    <>
      <AdhdHero />
      <AdhdWhyChoose />
      <AdhdHowItWorks />
      <TreatmentsPricing
        title="Simple, Honest"
        subtitle="pricing"
        description="Quality care shouldn't come with surprise costs. Here's exactly what you'll pay."
      />

      <MeetProvidersSection />
      <PatientPortalSection />
      <AdhdTreatmentApproach />
      <TreatmentsComparison />
      <AdhdSymptomsSection />
    </>
  );
}
