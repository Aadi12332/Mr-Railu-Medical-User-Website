import { StarIcon } from "lucide-react";
import { Container } from "./ui/container";
import { SectionHeader } from "./ui/section-header";

export default function SuccessStoriesSection() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeader title="Success" subtitle="Stories" />

        <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {[
            {
              name: "Emily Johnson",
              country: "Canada",
              rating: "4.9",
              text: "I Wanted A Natural Solution Without Harsh Side Effects, And This Capsule Delivered! Within A Week, I Felt More Energized, And My Stamina Improved. Definitely Worth It!",
            },
            {
              name: "Kianna Curtis",
              country: "United States",
              rating: "5.0",
              text: "The convenience of video sessions made it possible to continue therapy during a hectic work schedule. The tools and techniques I've learned have helped me manage stress every day.",
            },
            {
              name: "Lena Hoffmann",
              country: "Germany",
              rating: "4.8",
              text: "After years of struggling with depression, I finally found a provider who understood me. The progress I've made with Mental Health Tele is something I never thought possible.",
            },
          ].map((s, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-4 h-full">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-700">
                  {s.name.split(" ")[0][0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {s.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {s.country}
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-1 text-sm text-amber-500">
                  <span className="font-semibold text-slate-900">
                    {s.rating}
                  </span>
                  <StarIcon className="w-4 h-4 fill-current" />
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4 leading-relaxed overflow-hidden">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
