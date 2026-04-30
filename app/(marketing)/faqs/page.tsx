"use client"
import { useState } from "react";
import FAQHero from "@/components/FAQHero";
import FAQCategories from "@/components/FAQCategories";

export default function page() {
  const [search, setSearch] = useState("");
  return (
    <>
      <FAQHero search={search} setSearch={setSearch} />
      <FAQCategories search={search} />
    </>
  );
}
