"use client";
import ReviewsHero from "@/components/company/ReviewsHero";
import ProviderDescriptionSection from "@/components/company/ProviderDescriptionSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import ExpertsSection from "@/components/ExpertsSection";
import { useFetch } from "@/hooks/useFetch";
import { publicPageApi } from "@/api/publicpage.api";

export default function page() {
    const { data: dashboardData, loading, error } =
      useFetch(publicPageApi.getDashboardAPI) as any;

  return (
    <>
      <ReviewsHero />
      <SuccessStoriesSection />
      <ProviderDescriptionSection />
      <ExpertsSection data={dashboardData?.experts} />
    </>
  );
}
