import AboutHero from "@/components/company/AboutHero";
import VisionSection from "@/components/company/VisionSection";
import ValuesSection from "@/components/company/ValuesSection";
import MeetProvidersSection from "@/components/services/MeetProvidersSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import ContactSection from "@/components/ContactSection";

export default function Page() {
  return (
    <>
      <AboutHero />
      <ValuesSection />
      <VisionSection />
      <MeetProvidersSection
        title="Leadership"
        subtitle="Team"
        description="Meet the passionate individuals driving our mission forward"
      />
      <SuccessStoriesSection />
      <ContactSection />
    </>
  );
}
