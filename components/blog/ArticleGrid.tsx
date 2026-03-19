"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "../ui/section-header";
import ArticleCard, { Article } from "./ArticleCard";

interface ArticleGridProps {
  articles: Article[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
  // for now we're rendering all articles; paging and filtering can be added later
  const itemsPerPage = 9;
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  // determine which page buttons to show (including ellipsis)
  const pagination = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);
    return pages;
  };

  const handleClick = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <SectionHeader title="Latest" subtitle="Articles" className="mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((article: Article) => (
            <ArticleCard key={article.href} article={article} />
          ))}
      </div>
      <nav
        aria-label="Pagination"
        className="mt-12 flex justify-center items-center space-x-2"
      >
        <button
          disabled={currentPage === 1}
          onClick={() => handleClick(currentPage - 1)}
          className="p-2 rounded-lg border bg-white text-muted-foreground hover:bg-muted/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pagination().map((p, idx) => (
          <button
            key={`${p}-${idx}`}
            onClick={() => typeof p === "number" && handleClick(p)}
            disabled={p === "..."}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors disabled:cursor-default ${
              p === currentPage
                ? "bg-gradient-primary text-white border-transparent"
                : p === "..."
                  ? "bg-transparent border-transparent text-muted-foreground"
                  : "bg-white border-muted/20 hover:bg-muted/10"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => handleClick(currentPage + 1)}
          className="p-2 rounded-lg border bg-white text-muted-foreground hover:bg-muted/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    </section>
  );
}
