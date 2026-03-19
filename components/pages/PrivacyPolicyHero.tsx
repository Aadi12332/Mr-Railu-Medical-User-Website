import Image from "next/image";
import bgPattern from "@/assets/landing/hero/bg-pattern.png";

export default function PrivacyPolicyHero() {
  return (
    <section className="py-16 bg-[#F3FEFB] relative">
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
          Privacy Policy
        </div>

        <h1 className="text-4xl md:text-5xl max-w-lg font-semibold tracking-tight mt-2 mx-auto">
          <span className="text-primary">Member Terms</span> &amp; Conditions
        </h1>

        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Welcome to our healthcare platform. These terms outline your rights
          and responsibilities when using our services. Please read them
          carefully to understand how we work together to provide you with
          quality care.
        </p>

        <p className="mt-6 text-sm text-muted-foreground">
          Last Updated: January 29, 2026 &nbsp;&bull;&nbsp; Effective Date:
          January 1, 2026
        </p>
      </div>
    </section>
  );
}
