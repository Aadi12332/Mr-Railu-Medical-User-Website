import BlogHero from "@/components/blog/BlogHero";
import ArticleGrid from "@/components/blog/ArticleGrid";
import { articles } from "@/lib/blog";

import { Suspense } from "react";

export default function page() {
  // filter by tag from url if provided
  //   const activeTag = searchParams?.tag || "";

  return (
    <>
      <Suspense fallback={<div className="h-20" />}>
        <BlogHero />
      </Suspense>

      <ArticleGrid articles={articles} />
    </>
  );
}
