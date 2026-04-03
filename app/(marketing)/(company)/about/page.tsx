"use client"
import {useState,useEffect} from "react"
import AboutHero from "@/components/company/AboutHero";
import VisionSection from "@/components/company/VisionSection";
import ValuesSection from "@/components/company/ValuesSection";
import MeetProvidersSection from "@/components/services/MeetProvidersSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import ContactSection from "@/components/ContactSection";
import { publicPageApi } from "@/api/publicpage.api";

export default function Page() {
  const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchAbout = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const res = await publicPageApi.getAbout();
        setData(res?.data?.page || null);
      } catch (err: any) {
        setError(err?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchAbout();
    }, []);
  
  return (
    <>
      <AboutHero data={data} loading={loading} error={error}/>
      <ValuesSection data={data} loading={loading} error={error}/>
      <VisionSection data={data} loading={loading} error={error}/>
      <MeetProvidersSection
      data={data} loading={loading} error={error}
        title="Leadership"
        subtitle="Team"
        description="Meet the passionate individuals driving our mission forward"
      />
      <SuccessStoriesSection data={data} loading={loading} error={error} />
      <ContactSection  data={data} loading={loading} error={error}/>
    </>
  );
}
