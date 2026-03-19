import Image from "next/image";
import { ArrowRight } from "lucide-react";
import bgPattern from "@/assets/landing/hero/bg-pattern.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function TreatmentsHero() {
  return (
    <section className="py-10">
      <Container>
        <div className="py-10 bg-accent rounded-2xl relative overflow-hidden">
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
              <h1 className=" text-4xl md:text-5xl font-medium tracking-tight leading-tight">
                <span className="block text-primary">Treatments support</span>
                <span className="block text-primary font-medium">
                  that fits{" "}
                  <span className="text-slate-900 font-medium">your life</span>
                </span>
              </h1>

              <p className="mx-auto max-w-lg text-base md:text-lg text-muted-foreground leading-relaxed">
                Whether you’re at home or on the go, you can connect with a
                provider and receive guidance when you need it.
              </p>
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
