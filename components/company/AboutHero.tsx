import Image from "next/image";
import { CheckCircle, ShieldIcon, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";

import aboutHeroImg from "@/assets/company/about.png";
import bgPattern from "@/assets/landing/hero/bg-pattern.png";

export default function AboutHero() {
  const features = [
    {
      id: "licensed",
      title: "State-licensed providers",
      icon: ShieldIcon,
    },
    {
      id: "video",
      title: "Secure video consultations",
      icon: VideoIcon,
    },
    {
      id: "carePlans",
      title: "Personalized care plans",
      icon: CheckCircle,
    },
  ];

  return (
    <section className="py-10">
      <Container className="relative">
        {/* Decorative background elements could go here if we had SVGs */}
        <div className="absolute top-5 -scale-x-100 z-0 opacity-50 max-w-xs">
          <Image
            src={bgPattern}
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute z-0 top-5 right-0 opacity-50 max-w-xs">
          <Image
            src={bgPattern}
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* left: copy + CTAs */}
            <div className="md:col-span-6">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
                <span className="block text-primary">
                  Redefining Mental Wellness
                </span>
                <span className="block text-slate-900">
                  For A Healthier Tomorrow
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
                We are committed to transforming how people experience mental
                healthcare through innovation, compassion, and technology.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/onboarding">
                  <Button className="bg-gradient-primary h-10" size="lg">
                    Start your assessment
                  </Button>
                </Link>

                <Link href="/company/contact">
                  <Button variant="outline" size="lg" className="h-10">
                    Contact us
                  </Button>
                </Link>
              </div>

              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {features.map((f) => (
                  <li key={f.id} className="flex items-start gap-1">
                    <div className="size-9 rounded-full bg-[#306A7A1A] text-primary flex items-center justify-center shrink-0 mt-1">
                      <f.icon className="size-5" />
                    </div>

                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {f.title}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* right: image card + badge */}
            <div className="md:col-span-6 flex justify-center md:justify-end">
              <div className="relative w-full max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={aboutHeroImg}
                    alt="About us hero"
                    width={940}
                    height={620}
                    className="object-cover w-full h-[360px] md:h-[420px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
