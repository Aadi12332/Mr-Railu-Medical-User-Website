"use client"
import SitemapHero from "@/components/pages/SitemapHero";
import SitemapContent from "@/components/pages/SitemapContent";
import { useFetch } from "@/hooks/useFetch";
import { publicPageApi } from "@/api/publicpage.api";

export default function SiteMapPage() {
  const { data: sitemap, loading: sitemapLoading, error: sitemapError } = useFetch(publicPageApi.getSiteMap) as any;
  return (
    <main>
      <SitemapHero data={sitemap?.page} loading={sitemapLoading} error={sitemapError} />
      <SitemapContent data={sitemap?.page} loading={sitemapLoading} error={sitemapError} />
    </main>
  );
}
