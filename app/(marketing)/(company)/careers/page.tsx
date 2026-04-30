"use client"
import CareersHero from "@/components/company/CareersHero";
import CareersMissionSection from "@/components/company/CareersMissionSection";
import StandForSection from "@/components/company/StandForSection";
import BenefitsSection from "@/components/company/BenefitsSection";
import EarningsCalculatorSection from "@/components/company/EarningsCalculatorSection";
import CurrentOpeningsSection from "@/components/company/CurrentOpeningsSection";
import { useEffect, useState } from "react";
import { publicPageApi } from "@/api/publicpage.api";
import { HeroSkeleton } from "@/components/ui/hero-skeleton";
import { SectionSkeleton, PricingSkeleton, ProvidersSkeleton } from "@/components/ui/section-skeleton";
import { ErrorDisplay } from "@/components/ui/error-display";


export default function page() {
    const [careers, setCareers] = useState<any[]>([]);
    const [data, setData] = useState<any | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
const fetchCareers = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await publicPageApi.getCareer();
        console.log("Career API Response:", res);

        const data = res?.data?.jobs || [];
        setData(res?.data);
        setCareers(data);

        console.log("Careers:", careers, data);
      } catch (err) {
        console.error("Error fetching careers:", err);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    
    fetchCareers();
  }, []);
if (loading) {
      return (
        <>
          <HeroSkeleton />
          <SectionSkeleton />
          <SectionSkeleton />
          <PricingSkeleton />
          <ProvidersSkeleton />
          <SectionSkeleton />
          <SectionSkeleton />
          <SectionSkeleton />
        </>
      );
    }
  
    if (error) {
      return <ErrorDisplay error={error} onRetry={fetchCareers} />;
    }
  
    if (!careers.length) {
      return <ErrorDisplay error="No data found" onRetry={fetchCareers} />;
    }
    console.log("Careers:", data);
  return (
    <>
      <CareersHero loading={loading} error={error} careers={careers} />
      <CareersMissionSection careers={data?.page} />
      <StandForSection careers={data?.page} />
      <BenefitsSection careers={data?.page} />
      <EarningsCalculatorSection  />
      <CurrentOpeningsSection loading={loading} error={error} careers={careers}/>
    </>
  );
}
