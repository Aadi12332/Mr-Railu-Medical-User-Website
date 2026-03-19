"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  Shield,
  Users,
  Lock,
  UserCheck,
  FileText,
  Bell,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  CircleSlash,
  FileArchive,
  Info,
  BookOpen,
  ShieldUser,
  Building2Icon,
} from "lucide-react"; // added icons for sections and a couple of corrections

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// generate slug for an id attribute
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const article1Items = [
  {
    Icon: ShieldUser,
    title: "1.1 Privacy and Security Officers",
    description:
      "Designate officers responsible for HIPAA compliance and data security.",
  },
  {
    Icon: Users,
    title: "1.2 Workforce Training and Access",
    description:
      "Ensure staff are trained and access to PHI is limited to job duties.",
  },
  {
    Icon: Lock,
    title: "1.3 Technical and Physical Safeguards",
    description:
      "Implement encryption, access controls, and facility protections.",
  },
  {
    Icon: UserCheck,
    title: "1.4 Employee Hiring and Departure",
    description:
      "Screen new hires and revoke access immediately when employment ends.",
  },
  {
    Icon: FileText,
    title: "1.5 Privacy Notice",
    description:
      "Provide patients with a notice describing their HIPAA rights.",
  },
  {
    Icon: Info,
    title: "1.6 Complaints",
    description:
      "Establish a process for receiving and addressing privacy complaints.",
  },
  {
    Icon: AlertCircle,
    title: "1.7 Sanctions for Violations",
    description:
      "Apply disciplinary actions for failure to follow privacy policies.",
  },
  {
    Icon: ShieldCheck,
    title: "1.8 Mitigation of Disclosures",
    description:
      "Mitigate harmful effects of unauthorized disclosures when they occur.",
  },
  {
    Icon: Bell,
    title: "1.9 Breach Notification",
    description:
      "Notify affected individuals and authorities in the event of a breach.",
  },
  {
    Icon: CircleSlash,
    title: "1.10 No Retaliation",
    description:
      "Protect individuals from retaliation when reporting privacy concerns.",
  },
  {
    Icon: FileArchive,
    title: "1.11 Documentation and Retention",
    description:
      "Maintain records of policies, training, and disclosures as required.",
  },
].map((item) => ({ ...item, id: slugify(item.title) }));

const article2Items = [
  {
    Icon: FileText,
    title: "2.1 Definitions of Use and Disclosure",
    description:
      "Clear definitions for terms related to PHI usage and sharing.",
  },
  {
    Icon: Users,
    title: "2.2 Workforce Compliance",
    description: "Ensure employees understand permissible uses of PHI.",
  },
  {
    Icon: ShieldCheck,
    title: "2.3 Permitted Uses and Disclosures",
    description:
      "Use and disclose PHI only as allowed by HIPAA and patient consent.",
  },
  {
    Icon: AlertCircle,
    title: "2.4 Required Disclosures",
    description:
      "Provide PHI to individuals or authorities when lawfully required.",
  },
  {
    Icon: Building2Icon,
    title: "2.5 Legal and Public Health Disclosures",
    description:
      "Share PHI with legal entities or public health agencies as needed.",
  },
  {
    Icon: Building2Icon,
    title: "2.6 Business Associates",
    description: "Contractors handling PHI must agree to safeguard it.",
  },
  {
    Icon: FileText,
    title: "2.7 De-identified Data",
    description:
      "Remove identifiers from PHI before using for research or analytics.",
  },
  {
    Icon: Shield,
    title: "2.8 Security Policies",
    description:
      "Maintain administrative, physical, and technical safeguards for PHI.",
  },
].map((item) => ({ ...item, id: slugify(item.title) }));

// Article III items (Individual Rights)
const article3Items = [
  {
    Icon: FileText,
    title: "3.1 Right to Access PHI",
    description: "You can request copies of your protected health information.",
  },
  {
    Icon: FileText,
    title: "3.2 Right to Accounting of Disclosures",
    description: "Request a record of when and why your PHI was shared.",
  },
  {
    Icon: Lock,
    title: "3.3 Right to Confidential Communications",
    description:
      "Ask that we communicate with you in a specific way or location.",
  },
  {
    Icon: AlertCircle,
    title: "3.4 Right to Request Restrictions",
    description: "Ask us to limit how we use or disclose your PHI.",
  },
  {
    Icon: FileText,
    title: "3.5 Right to Request Amendments",
    description: "Ask to correct or amend your health information.",
  },
].map((item) => ({ ...item, id: slugify(item.title) }));

const sections = [
  {
    id: "introduction",
    title: "Our",
    subtitle: "Introduction",
    shortTitle: "Our Introduction",
    Icon: FileText,
    content: (
      <p>
        We are committed to safeguarding personal and medical information. This
        policy outlines how health data may be collected, used, disclosed, and
        protected under federal regulations.
      </p>
    ),
  },
  {
    id: "article-i",
    title: "Article I",
    subtitle: " – Responsibilities as a Covered Entity",
    shortTitle: "Article I  – Responsibilities as a Covered Entity",
    Icon: Building2Icon,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          The following items describe our obligations as a covered entity under
          HIPAA.
        </p>
        <Accordion type="single" collapsible>
          {article1Items.map((item) => (
            <AccordionItem key={item.title} value={item.title}>
              <AccordionTrigger id={item.id} className="py-4">
                <item.Icon className="size-4 mr-2" />
                {item.title}
              </AccordionTrigger>
              <AccordionContent>{item.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    ),
  },
  {
    id: "article-ii",
    title: "Article II -",
    subtitle: "Use and Disclosure of PHI",
    shortTitle: "Article II – Use and Disclosure of PHI",
    Icon: Lock,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          The following items describe our policies for how protected health
          information (PHI) may be used and disclosed.
        </p>
        <Accordion type="single" collapsible>
          {article2Items.map((item) => (
            <AccordionItem key={item.title} value={item.title}>
              <AccordionTrigger id={item.id} className="py-4">
                <item.Icon className="size-4 mr-2" />
                {item.title}
              </AccordionTrigger>
              <AccordionContent>{item.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    ),
  },

  {
    id: "article-iii",
    title: "Article III",
    subtitle: "– Individual Rights",
    shortTitle: "Article III – Individual Rights",
    Icon: Users,
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-gradient-primary border-l-4 border-primary text-white">
          <p className="font-medium">Your Rights:</p>
          <p className="mt-1">
            You have important rights regarding your Protected Health
            Information. We are committed to honoring these rights and
            processing requests within legal timeframes.
          </p>
        </div>
        <Accordion type="single" collapsible>
          {article3Items.map((item) => (
            <AccordionItem key={item.title} value={item.title}>
              <AccordionTrigger id={item.id} className="py-4">
                <item.Icon className="size-4 mr-2" />
                {item.title}
              </AccordionTrigger>
              <AccordionContent>{item.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    ),
  },
];

export default function HIPAAPrivacyContent() {
  const [activeId, setActiveId] = useState<string | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 lg:flex lg:space-x-8">
      <aside className="hidden lg:block lg:w-72 sticky top-24 h-fit">
        <Card className="p-5 gap-0 shadow-sm">
          <h3 className="font-semibold mb-4 text-lg">Table of Contents</h3>
          <ul className="space-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={cn(
                    "flex items-center text-sm rounded-xl hover:text-primary px-4 py-2.5 transition-colors",
                    activeId === s.id
                      ? "bg-primary/10 text-primary border-l-3 border-primary font-medium"
                      : "text-muted-foreground border-l-2 border-transparent",
                  )}
                >
                  {s.Icon && <s.Icon className="size-4 mr-2 shrink-0" />}
                  {s.shortTitle || s.title}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </aside>
      <div className="flex-1 space-y-6">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <Card className="p-6 md:p-8 gap-0 shadow-md">
              <div className="flex items-center space-x-2 mb-4">
                <div className="">
                  <s.Icon className="size-7 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  <span className="text-primary">{s.title} </span>
                  <span>{s.subtitle}</span>
                </h2>
              </div>
              <div className="text-base leading-relaxed text-muted-foreground">
                {s.content}
              </div>
            </Card>
          </section>
        ))}

        {/* services and feature card */}
        <div className="mt-12">
          <Card className="p-8 bg-gradient-primary text-white">
            <h3 className="text-xl font-semibold mb-4">
              Services And Features
            </h3>
            <p>
              This policy may be updated as laws or business practices change.
              The latest version will always be available on our website.
              Material changes will be communicated through posted notices and
              updated documentation.
            </p>

            <div className="mt-6 p-4 rounded-lg border border-white/40 bg-white/10">
              <strong>Disclaimer :</strong> This policy serves as a general
              guideline. Specific situations may require individual assessment.
              For questions or concerns, please contact our Privacy Officer or
              visit our website for additional resources.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
