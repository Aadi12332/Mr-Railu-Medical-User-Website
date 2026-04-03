"use client"
import CareersHero from "@/components/company/CareersHero";
import CareersMissionSection from "@/components/company/CareersMissionSection";
import StandForSection from "@/components/company/StandForSection";
import BenefitsSection from "@/components/company/BenefitsSection";
import EarningsCalculatorSection from "@/components/company/EarningsCalculatorSection";
import CurrentOpeningsSection from "@/components/company/CurrentOpeningsSection";
import { useEffect, useState } from "react";
import { publicPageApi } from "@/api/publicpage.api";

export default function page() {
    const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCareers = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await publicPageApi.getCareer();
        console.log("Career API Response:", res);

        const data = res?.data?.jobs || [];
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

    fetchCareers();
  }, []);

  return (
    <>
      <CareersHero loading={loading} error={error} careers={careers} />
      <CareersMissionSection />
      <StandForSection />
      <BenefitsSection />
      <EarningsCalculatorSection />
      <CurrentOpeningsSection loading={loading} error={error} careers={careers}/>
    </>
  );
}
