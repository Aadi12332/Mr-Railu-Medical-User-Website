import DeaHero from "@/components/pages/DeaHero";
import DeaInfoSection from "@/components/pages/DeaInfoSection";
import DeaSupportSection from "@/components/pages/DeaSupportSection";
import DeaFAQSection from "@/components/pages/DeaFAQSection";
import { Container } from "@/components/ui/container";

export default function page() {
  return (
    <>
      <DeaHero />
      <Container maxWidth="5xl" className="py-16">
        <DeaInfoSection />
        <DeaSupportSection />
        {/* added FAQ section below support */}
        <DeaFAQSection />
      </Container>
    </>
  );
}
