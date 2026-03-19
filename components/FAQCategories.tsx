"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import {
  Calendar,
  Pill,
  DollarSign,
  ShieldIcon,
  Building2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "About MEDvidi",
    icon: Building2Icon,
    items: [
      {
        q: "What is MEDvidi?",
        a: "",
      },
      {
        q: "Which conditions do you treat?",
        a: "",
      },
      {
        q: "Where are services available?",
        a: "",
      },
      {
        q: "How does MEDvidi work?",
        a: "",
      },
      {
        q: "What type of providers work with MEDvidi?",
        a: "",
      },
      {
        q: "Do you provide disability letters?",
        a: "",
      },
    ],
  },
  {
    title: "Appointments",
    icon: Calendar,
    items: [
      {
        q: "What happens during the first and follow-up visits?",
        a: "",
      },
      {
        q: "How do I join my online appointment?",
        a: "",
      },
      {
        q: "What if I miss my appointment?",
        a: "",
      },
      {
        q: "How long does diagnosis take?",
        a: "",
      },
      {
        q: "What is included in a treatment plan?",
        a: "",
      },
      {
        q: "Should I book several appointments in advance?",
        a: "",
      },
    ],
  },
  {
    title: "Prescription",
    icon: Pill,
    items: [
      {
        q: "Can I get a prescription without seeing a provider?",
        a: "",
      },
      {
        q: "What medications can be prescribed?",
        a: "",
      },
      {
        q: "Is a prescription guaranteed after booking?",
        a: "",
      },
      {
        q: "Why is my prescription different from what I requested?",
        a: "",
      },
      {
        q: "Do you prescribe controlled medications?",
        a: "",
      },
    ],
  },
  {
    title: "Pricing",
    icon: DollarSign,
    items: [
      {
        q: "How much do services cost?",
        a: "",
      },
      {
        q: "Are there extra charges for prescriptions?",
        a: "",
      },
      {
        q: "Do I need insurance?",
        a: "",
      },
      {
        q: "Does MEDvidi accept insurance?",
        a: "",
      },
    ],
  },
  {
    title: "DEA Update",
    icon: ShieldIcon,
    items: [
      {
        q: "Have telehealth prescribing rules been extended to 2026?",
        a: "",
      },
      {
        q: "What is a controlled substance?",
        a: "",
      },
    ],
  },
];

export default function FAQCategories() {
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  // observe sections coming into view to update active tab
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            if (!Number.isNaN(idx)) {
              setActive(idx);
            }
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px", threshold: 0 },
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (idx: number) => {
    const el = sectionRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pb-16">
      <Container>
        {/* sticky category nav */}
        <nav className="sticky top-0 z-10 bg-white py-4">
          <div className="flex justify-center space-x-4 overflow-x-auto scrollbar-none">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap px-4 py-2 border-b-2 transition-colors",
                  idx === active
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <cat.icon className="size-4" />
                {cat.title}
              </button>
            ))}
          </div>
        </nav>

        {/* content sections all rendered so anchors work */}
        {categories.map((cat, idx) => (
          <div
            key={idx}
            ref={(el) => {
              sectionRefs.current[idx] = el;
            }}
            data-idx={idx}
            className="space-y-12 max-w-3xl mx-auto pt-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 bg-gradient-primary flex justify-center items-center rounded-xl">
                <cat.icon className="size-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold">{cat.title}</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {cat.items.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`${idx}-${i}`}
                  className="rounded-xl border bg-white"
                >
                  <AccordionTrigger className="p-3">{item.q}</AccordionTrigger>
                  {item.a && (
                    <AccordionContent className="p-3 pt-0">
                      <div className="text-sm text-muted-foreground">
                        {item.a}
                      </div>
                    </AccordionContent>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        <div className="mt-12 flex justify-center">
          <Link href="/company/contact">
            <Button size="lg" className="bg-gradient-primary px-6">
              Contact Us
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
