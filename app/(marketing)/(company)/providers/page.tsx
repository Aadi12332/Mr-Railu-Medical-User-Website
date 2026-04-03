"use client"
import { useState,useEffect } from "react";
import ProvidersHero from "@/components/company/ProvidersHero";
import CommitmentSection from "@/components/company/CommitmentSection";
import MeetProvidersSection from "@/components/services/MeetProvidersSection";

import PatientTestimonialsSection from "@/components/PatientTestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { publicPageApi } from "@/api/publicpage.api";
import { useFetch } from "@/hooks/useFetch";

export default function page() {
const { data, loading, error } = useFetch(publicPageApi.getProviders);
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
