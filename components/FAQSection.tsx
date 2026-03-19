import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/styled-accordion";
import { cn } from "@/lib/utils";
import { Container } from "./ui/container";
import { SectionHeader } from "./ui/section-header";

const faqs = [
  {
    q: "What Is This Platform About?",
    a: (
      <div>
        <p>
          This is an online mental wellness service designed to make
          professional mental health care easy to access, affordable, and
          personalized. Our licensed providers support individuals with tailored
          care plans and ongoing guidance.
        </p>
        <ul className="list-disc list-inside pl-5">
          <li>ADHD support</li>
          <li>Anxiety management</li>
          <li>Depression care</li>
          <li>Sleep-related concerns</li>
          <li>Stress and burnout</li>
          <li>Obsessive thought patterns</li>
        </ul>
      </div>
    ),
  },
  {
    q: "How Does The Service Work?",
    a: "Sign up, complete a brief intake, choose a provider or let us match you, then schedule appointments and follow-ups through the platform.",
  },
  {
    q: "Where Is The Service Available?",
    a: "Availability depends on provider licensing; we currently serve multiple regions — check provider profiles or contact support for details.",
  },
  {
    q: "What Happens During The First And Follow-Up Sessions?",
    a: "The first session focuses on history and treatment planning; follow-ups monitor progress and adjust the plan as needed.",
  },
  {
    q: "What Are The Pricing Options?",
    a: "We offer several plans and per-session pricing — see the pricing page or contact sales for tailored options.",
  },
  {
    q: "Who Provides The Care On This Platform?",
    a: "Care is delivered by licensed therapists, psychologists, and psychiatrists listed on their provider profiles.",
  },
  {
    q: "Can Providers Prescribe Medication If Needed?",
    a: "Some providers are authorized to prescribe; medication management availability is shown on provider profiles.",
  },
  {
    q: "Why Was My Treatment Different From What I Expected?",
    a: "Treatment is personalized; providers tailor care to your needs, which may differ from general expectations or past experiences.",
  },
  {
    q: "Is Insurance Accepted?",
    a: "Insurance acceptance varies by provider. Check the provider page or contact support to confirm coverage.",
  },
  {
    q: "Do You Provide Official Letters Or Documentation?",
    a: "Providers can supply documentation when clinically appropriate; request this directly through your provider.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="FAQs" className="mb-6" />

        <Accordion
          type="single"
          className="space-y-4"
          collapsible
          defaultValue="faq-1"
        >
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i + 1}`}
              className={cn(" shadow-lg rounded-md border", {
                "border-2 border-primary": i === 0,
                "bg-white": i !== 0,
              })}
            >
              <AccordionTrigger className="p-3">{item.q}</AccordionTrigger>
              <AccordionContent className="p-3 pt-0">
                <div className="text-sm text-muted-foreground">{item.a}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
