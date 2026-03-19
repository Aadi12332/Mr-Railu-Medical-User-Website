import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Info } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "../ui/section-header";

const faqItems = [
  {
    question: "Have the telehealth prescription rules been extended to 2026?",
    answer:
      "Yes. Current regulations allow patients to continue online treatment until December 31, 2026. This extension ensures that individuals who rely on telehealth services can maintain access to their prescribed medications without interruption.",
  },
  {
    question: "What will change after December 31, 2026?",
    answer:
      "After that date, providers may once again be required to conduct an initial in‑person exam before prescribing controlled substances via telehealth. The DEA is expected to announce any changes well before the deadline.",
  },
  {
    question: "What is considered a controlled substance?",
    answer:
      "Controlled substances include medications that have a potential for abuse or dependence — e.g. stimulants like Adderall, benzodiazepines like Xanax, and certain sleep aids. Your provider can clarify whether your prescription falls under these rules.",
  },
  {
    question: "Can I still see a doctor online?",
    answer:
      "Yes. Telehealth visits remain available for evaluations and follow‑up care, though prescribing certain medications may require an in‑person component depending on future DEA requirements.",
  },
];

export default function DeaFAQSection() {
  return (
    <section className="py-16">
      <Container maxWidth="5xl">
        <SectionHeader
          title="Frequently Asked"
          subtitle="Questions"
          description="Find answers to common questions about telehealth prescription regulations"
          align="center"
          className="mb-8"
        />

        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, idx) => (
            <AccordionItem
              className="border rounded-xl"
              key={idx}
              value={`faq-${idx}`}
            >
              <AccordionTrigger className="flex items-center p-3">
                <span className="mr-3 size-10 rounded-xl bg-gradient-primary text-white flex items-center justify-center">
                  <Info className="size-6" />
                </span>
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="p-3 pl-16 pt-0 text-sm text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
