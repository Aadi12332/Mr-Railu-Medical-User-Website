import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";

import careersImg from "@/assets/company/careers.png";
import bgPattern from "@/assets/landing/hero/bg-pattern.png";

export default function CareersHero() {
  return (
    <section className="py-10 relative">
      <Container className="relative">
        {/* background patterns */}
        <div className="absolute top-10 -scale-x-100 z-0 opacity-50 max-w-xs">
          <Image
            src={bgPattern}
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute z-0 top-10 right-0 opacity-50 max-w-xs">
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
                <span className="block text-primary">Build Your Career</span>
                <span className="block text-slate-900">
                  While Changing Lives
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
                Join a purpose-driven digital healthcare company where your work
                makes a real impact on mental wellness across communities. Enjoy
                flexibility, growth, and meaningful connections with patients.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/company/careers#openings">
                  <Button className="bg-gradient-primary h-10" size="lg">
                    View Open Position
                  </Button>
                </Link>

                <Link href="/company/contact">
                  <Button variant="outline" size="lg" className="h-10">
                    Contact us
                  </Button>
                </Link>
              </div>
            </div>

            {/* right: image card */}
            <div className="md:col-span-6 flex justify-center md:justify-end">
              <div className="relative w-full max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={careersImg}
                    alt="Careers hero"
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
