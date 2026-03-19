import Image from "next/image";
import bgPattern from "@/assets/landing/hero/bg-pattern.png";

export default function ConsentHero() {
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
          Patient Consent Required
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mt-2">
          <span className="text-primary">Telehealth Consent</span>{" "}
          <span className="">&amp; Patient Information</span>
        </h1>

        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Telehealth allows you to receive quality medical care remotely through
          secure video and communication technology. Before continuing, please
          review and agree to the following information about your virtual
          healthcare experience.
        </p>
      </div>
    </section>
  );
}
