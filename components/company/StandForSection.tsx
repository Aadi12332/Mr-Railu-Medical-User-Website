import { Container } from "@/components/ui/container";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Accessibility,
  ShieldCheck,
  Users,
  Heart,
  Rocket,
  Badge,
} from "lucide-react";

export default function StandForSection() {
  const items = [
    {
      id: "integrity",
      title: "Integrity & Openness",
      description:
        "We act with honesty and transparency in every decision we make.",
      icon: ShieldCheck,
    },
    {
      id: "accessibility",
      title: "Accessibility for All",
      description:
        "We ensure our services are accessible to everyone, regardless of background or ability.",
      icon: Accessibility,
    },
    {
      id: "respect",
      title: "Respect & Equality",
      description:
        "We honor diversity and treat every person with dignity and fairness.",
      icon: Users,
    },
    {
      id: "patient",
      title: "Patient-Centered Thinking",
      description:
        "Our decisions are always guided by what’s best for the people we serve.",
      icon: Heart,
    },
    {
      id: "innovation",
      title: "Innovation & Growth",
      description:
        "We continuously evolve through learning, creativity, and bold ideas.",
      icon: Rocket,
    },
    {
      id: "quality",
      title: "Quality & Responsibility",
      description:
        "We hold ourselves accountable to the highest standards in care and operations.",
      icon: Badge,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-muted">
      <Container>
        <SectionHeader
          title="What We"
          subtitle="Stand For"
          description="Our values guide every decision we make and shape the culture we build together."
        />

        <Accordion
          type="single"
          collapsible
          className="mt-8 space-y-3 max-w-3xl mx-auto"
        >
          {items.map((item) => (
            <AccordionItem
              className="p-3 py-2 bg-white rounded-xl shadow"
              value={item.id}
              key={item.id}
            >
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <div className="size-10 flex items-center justify-center bg-gradient-primary rounded-xl">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold">{item.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pl-13">
                {item.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
