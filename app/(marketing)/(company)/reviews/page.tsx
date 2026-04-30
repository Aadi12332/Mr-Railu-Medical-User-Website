import ReviewsHero from "@/components/company/ReviewsHero";
import ProviderDescriptionSection from "@/components/company/ProviderDescriptionSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import ExpertsSection from "@/components/ExpertsSection";

export default function page() {
  return (
    <>
      <ReviewsHero />
      <SuccessStoriesSection />
      <ProviderDescriptionSection />
      <ExpertsSection />
    </>
  );
}
