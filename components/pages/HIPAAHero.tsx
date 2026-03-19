import Image from "next/image";
import bgPattern from "@/assets/landing/hero/bg-pattern.png";

export default function HIPAAHero() {
  return (
    <section className="py-20 bg-[#F6FFFC] relative overflow-hidden">
      {/* background decorations */}
      <div className="absolute -top-5 -scale-x-100 z-0 opacity-50 max-w-xs">
        <Image
          src={bgPattern}
          alt="Background pattern"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute z-0 -top-5 right-0 opacity-50 max-w-xs">
        <Image
          src={bgPattern}
          alt="Background pattern"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-block bg-[#CBFBF1] rounded-full px-4 py-1 text-xs font-semibold tracking-wide text-primary">
          HIPAA Notice
        </div>

        <h1 className="text-4xl md:text-5xl max-w-xl font-semibold tracking-tight mt-2 mx-auto">
          <span className="text-primary">HIPAA Notice</span> Of Privacy
          Practices
        </h1>

        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          This notice explains how your medical information may be used and
          shared and how you can access it. Please review it carefully.
        </p>

        <p className="mt-6 text-sm text-muted-foreground">
          Effective Date: January 30, 2026
        </p>
      </div>
    </section>
  );
}
