import ProvidersHero from "@/components/company/ProvidersHero";
import CommitmentSection from "@/components/company/CommitmentSection";
import MeetProvidersSection from "@/components/services/MeetProvidersSection";
import PatientTestimonialsSection from "@/components/PatientTestimonialsSection";
import FAQSection from "@/components/FAQSection";

export default function page() {
  return (
    <>
      <ProvidersHero />
      <CommitmentSection />
      <MeetProvidersSection
        title="Your Trusted"
        subtitle="Care Network"
        description=""
        rows={2}
      />

      <PatientTestimonialsSection />
      <FAQSection />
    </>
  );
}
