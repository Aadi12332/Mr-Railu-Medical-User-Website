"use client"
import AiConsentHero from "@/components/pages/AiConsentHero";
import AiConsentContent from "@/components/pages/AiConsentContent";
import { useFetch } from "@/hooks/useFetch";
import { publicPageApi } from "@/api/publicpage.api";

export default function page() {
  const { data, loading, error } = useFetch(publicPageApi.getAiConsent) as any;
  return (
    <div>
      <AiConsentHero data={data?.page} loading={loading} error={error} />
      <AiConsentContent data={data?.page} loading={loading} error={error} />
    </div>
  );
}
