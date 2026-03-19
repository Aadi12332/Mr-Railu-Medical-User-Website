"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import adhdImg from "@/assets/landing/hero/adhd.png";
import anxietyImg from "@/assets/landing/hero/anxiety.png";
import weightImg from "@/assets/landing/hero/weight-wellness.png";
import depressionImg from "@/assets/landing/hero/depression.png";
import sleepImg from "@/assets/landing/hero/sleep-issues.png";

import bgPattern from "@/assets/landing/hero/bg-pattern.png";
import Link from "next/link";
import { Container } from "./ui/container";

export default function HeroSection() {
  const categories = [
    { name: "ADHD", src: adhdImg },
    { name: "Anxiety", src: anxietyImg },
    { name: "Weight Wellness", src: weightImg },
    { name: "Depression", src: depressionImg },
    { name: "Sleep Issues", src: sleepImg },
  ];

  return (
    <section className="py-5">
      <Container>
        <div className="py-10 bg-accent rounded-2xl relative overflow-hidden">
          {/* Decorative background elements could go here if we had SVGs */}
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
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-white shadow-sm text-xs font-semibold tracking-wide uppercase rounded px-4 py-1.5 mb-2">
                Welcome To Mental Health Tally
              </div>

              <h1 className=" text-4xl md:text-5xl font-medium tracking-tight leading-tight">
                <span className="block text-primary">Care For Your Mind,</span>
                <span className="block text-primary font-medium">
                  From{" "}
                  <span className="text-slate-900 font-medium">Anywhere</span>
                </span>
              </h1>

              <p className="mx-auto max-w-lg text-base md:text-lg text-muted-foreground leading-relaxed">
                Connect With Trusted Mental Health Professionals Online - Care
                Designed Around You.
              </p>
            </div>

            <div className="mt-10">
              <div className="max-w-6xl mx-auto">
                <Carousel
                  opts={{ loop: true }}
                  plugins={[
                    AutoScroll({
                      speed: 1,
                      stopOnInteraction: false,
                      stopOnMouseEnter: true,
                    }),
                  ]}
                >
                  <CarouselContent className="gap-6 -mx-2">
                    {categories.map((c) => (
                      <div
                        key={c.name}
                        className="pl-4 shrink-0 w-52 md:w-64 lg:w-72"
                      >
                        <div className="relative overflow-hidden rounded-2xl bg-[#E2EBEC] p-6 flex flex-col items-center gap-4 text-center hover:shadow-lg transition-all duration-300">
                          {/* absolute circle at top left corner */}
                          <div className="absolute -top-20 -left-16 size-52 rounded-full bg-[#0084D41C]"></div>
                          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-sm">
                            <Image
                              src={c.src}
                              alt={c.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-lg font-mono font-semibold text-sky-900">
                            {c.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious
                    className="left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur rounded-full p-2 shadow hover:shadow-md border"
                    size="icon-sm"
                  />
                  <CarouselNext
                    className="right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur rounded-full p-2 shadow hover:shadow-md border"
                    size="icon-sm"
                  />
                </Carousel>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <Link href="/onboarding">
                <Button className="bg-gradient-primary" size="lg">
                  Book Your Session
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
