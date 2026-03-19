"use client";

import React, { useState } from "react";
import {
  Target,
  Edit3,
  Search,
  CheckCircle,
  RefreshCw,
  ShieldCheck,
  Info,
  MessageCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const sections = [
  {
    id: "editorial-mission",
    title: "Editorial Mission",
    Icon: Target,
    content: (
      <>
        <p>
          Our goal is to make mental healthcare information easy to understand,
          reliable, and accessible. We publish evidence-based content that
          supports informed conversations between patients and healthcare
          professionals.
        </p>
        <p className="mt-2">
          Every article is created with care, accuracy, and respect, helping
          readers understand mental health conditions, treatment options, and
          next steps without confusion or stigma.
        </p>
      </>
    ),
  },
  {
    id: "how-we-create-content",
    title: "How We Create Content",
    Icon: Edit3,
    content: (
      <>
        <h3 className="font-semibold">Expert-Led Writing</h3>
        <p>
          Our content is written by qualified professionals with backgrounds in
          medicine, mental health, and healthcare education.
        </p>
        <p className="mt-1">Our contributors may hold credentials such as:</p>
        <ul className="list-disc list-inside mt-1">
          <li>Medical Doctors (MD)</li>
          <li>Doctors of Osteopathic Medicine (DO)</li>
          <li>Mental Health Counselors</li>
          <li>Clinical Researchers</li>
          <li>Healthcare Writers with advanced degrees</li>
        </ul>
        <p className="mt-2">
          We focus on clarity, empathy, and usefulness in every piece we
          publish.
        </p>
      </>
    ),
  },
  {
    id: "research-topic-selection",
    title: "Research & Topic Selection",
    Icon: Search,
    content: (
      <>
        <p>
          Topics are chosen based on patient needs, common questions, and
          current mental health concerns. We prioritize relevance, accuracy, and
          timeliness.
        </p>
        <p className="mt-2">
          Our research is guided by trusted sources, including:
        </p>
        <ul className="list-disc list-inside mt-1">
          <li>Diagnostic guidelines (DSM, ICD)</li>
          <li>Public health organizations</li>
          <li>Peer-reviewed medical journals</li>
          <li>Government and academic health institutions</li>
        </ul>
      </>
    ),
  },
  {
    id: "review-fact-checking",
    title: "Review & Fact-Checking",
    Icon: CheckCircle,
    content: (
      <>
        <p>
          Every article goes through a detailed review process to verify medical
          accuracy, clarity, and reliability.
        </p>
        <p className="mt-2">Content is reviewed for:</p>
        <ul className="list-disc list-inside mt-1">
          <li>Medical correctness</li>
          <li>Clear language</li>
          <li>Bias-free and stigma-free communication</li>
        </ul>
        <p className="mt-2">
          Qualified medical professionals review information when required to
          ensure it meets healthcare standards.
        </p>
      </>
    ),
  },
  {
    id: "ongoing-updates",
    title: "Ongoing Updates",
    Icon: RefreshCw,
    content: (
      <>
        <p>
          Mental health research and guidelines evolve continuously. We
          regularly review and update our content to reflect the latest medical
          findings and best practices.
        </p>
        <p className="mt-2">
          This helps ensure our information remains current, accurate, and
          helpful.
        </p>
      </>
    ),
  },
  {
    id: "conflicts-interest",
    title: "Conflicts Of Interest",
    Icon: ShieldCheck,
    content: (
      <>
        <p>
          We are committed to transparency and integrity. Contributors must
          disclose any potential conflicts of interest that could influence
          content.
        </p>
        <p className="mt-2">
          Our editorial decisions are independent and focused solely on
          providing trustworthy medical information.
        </p>
      </>
    ),
  },
  {
    id: "important-limitations",
    title: "Important Limitations",
    Icon: Info,
    content: (
      <>
        <p>
          The information provided on this website is for educational purposes
          only and is not a substitute for professional medical advice.
        </p>
        <p className="mt-2">
          Always consult a qualified healthcare provider for diagnosis and
          treatment decisions.
        </p>
      </>
    ),
  },
  {
    id: "feedback-corrections",
    title: "Feedback & Corrections",
    Icon: MessageCircle,
    content: (
      <>
        <p>
          We welcome feedback from our readers. If you notice outdated
          information or have suggestions, please contact us.
        </p>
        <p className="mt-2">
          Our editorial team carefully reviews all feedback and makes
          corrections when necessary.
        </p>
        <p className="mt-2">
          We aim to support you with reliable information that empowers better
          mental health decisions.
        </p>
      </>
    ),
  },
];
export default function EditorialPolicyContent() {
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
  }, [sections]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 lg:flex lg:space-x-8">
      <aside className="hidden lg:block lg:w-72 sticky top-24 h-fit">
        <Card className="p-5 gap-0 shadow-sm">
          <h3 className="font-semibold mb-4 text-lg">On This Page</h3>
          <ul className="space-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={cn(
                    "block text-sm  rounded-xl hover:text-primary px-4 py-2.5 transition-colors",
                    activeId === s.id
                      ? "bg-primary/10 text-primary border-l-3 border-primary font-medium"
                      : "text-muted-foreground border-l-2 border-transparent",
                  )}
                >
                  {s.title}
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
              <div className="flex items-center space-x-4 mb-4">
                <div className="shrink-0 size-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-sm">
                  <s.Icon className="size-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  {s.title}
                </h2>
              </div>
              <div className="pl-15 text-base leading-relaxed text-muted-foreground">
                {s.content}
              </div>
            </Card>
          </section>
        ))}
      </div>
    </div>
  );
}
