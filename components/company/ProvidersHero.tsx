import bgPattern from "@/assets/landing/hero/bg-pattern.png";
import Image from "next/image";

export default function ProvidersHero() {
  return (
    <section className="py-20 bg-[#F3FEFB] relative">
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
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          <span className=" text-primary">Meet Our</span>{" "}
          <span className=" text-slate-900">
            Dedicated Medical Professionals
          </span>
        </h1>

        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Your journey toward better mental health begins with trusted experts.
          Our intake process helps us understand your needs and connect you with
          the right provider for personalized care.
        </p>
      </div>
    </section>
  );
}
