"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import medImg from "@/assets/services/medication-supported.png";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";

import { Container } from "@/components/ui/container";

export default function MedicationsSupported() {
  const items = [
    {
      id: "anxiety",
      title: "Anxiety",
      description:
        "Providers may recommend medications to help manage anxiety symptoms, depending on individual evaluation and treatment needs.",
    },
    {
      id: "adhd",
      title: "ADHD",
      description:
        "Medication options (stimulant and non-stimulant) are considered based on clinical assessment and individual response.",
    },
    {
      id: "weight",
      title: "Weight Management",
      description:
        "When clinically appropriate, certain medications that support weight management may be considered alongside behavioral care.",
    },
    {
      id: "depression",
      title: "Depression",
      description:
        "Antidepressant medications can be part of a comprehensive treatment plan tailored to your needs and monitored by your provider.",
    },
    {
      id: "sleep",
      title: "Sleep Concerns",
      description:
        "Providers may discuss sleep-targeted medications and non-pharmacologic strategies depending on your symptoms.",
    },
    {
      id: "ocd",
      title: "OCD",
      description:
        "Certain medication classes can help reduce obsessive thoughts and compulsive behaviors when combined with therapy.",
    },
    {
      id: "ptsd",
      title: "PTSD",
      description:
        "Medication may be used to manage specific PTSD symptoms alongside trauma-focused therapies as clinically indicated.",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col text-center items-center mb-8">
            <SectionHeader
              title="Medications Supported"
              subtitle="Through Our Platform"
              description="Our licensed healthcare professionals are authorized to evaluate symptoms and, when appropriate, prescribe or continue medications for various mental health and wellness conditions including certain regulated medications, based on clinical guidelines."
            />
          </div>

          <div className="grid gap-8 md:grid-cols-2 items-start">
            {/* left: image + CTA */}
            <div>
              <div className="rounded-lg mt-6">
                <Image
                  src={medImg}
                  alt="Medications supported"
                  className="object-cover w-full aspect-square md:max-w-md rounded-md"
                />
              </div>

              <p className="mt-6 max-w-md leading-relaxed">
                A Detailed List Of Medications Available Through Our Platform
                Can Be Reviewed During Your Consultation.
              </p>

              <div className="mt-4">
                <Button size="lg" className="bg-gradient-primary">
                  <Link
                    href="/services/medication-refill"
                    className="flex items-center gap-3"
                  >
                    View Medication Options <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* right: detail card + list */}
            <div className="w-full max-w-md">
              <Accordion type="single" collapsible className="space-y-4 mt-6">
                {items.map((item, i) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className={cn(" shadow-lg rounded-md border", {
                      "border-2 border-primary": i === 0,
                    })}
                  >
                    <AccordionTrigger className="bg-white px-4 py-3 text-sm font-medium">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="bg-white px-4 pb-4 text-sm text-muted-foreground">
                      {item.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
