"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import NoticeSummarySection from "./hipaa/NoticeSummarySection";
import YourRightsSection from "./hipaa/YourRightsSection";
import YourChoicesSection from "./hipaa/YourChoicesSection";
import OurUsesSection from "./hipaa/OurUsesSection";
import OurResponsibilitiesSection from "./hipaa/OurResponsibilitiesSection";
import PrivacyOfficerSection from "./hipaa/PrivacyOfficerSection";
import ChangesTermsSection from "./hipaa/ChangesTermsSection";
import MoreInformationSection from "./hipaa/MoreInformationSection";
import {
  FileText,
  Shield,
  Users,
  Database,
  Lock,
  Mail,
  Bell,
} from "lucide-react";

const tocItems = [
  { id: "notice-summary", title: "Notice Summary", Icon: FileText },
  { id: "your-rights", title: "Your Rights", Icon: Shield },
  { id: "your-choices", title: "Your Choices", Icon: Users },
  { id: "our-uses", title: "Our Uses and Disclosures", Icon: Database },
  { id: "our-responsibilities", title: "Our Responsibilities", Icon: Lock },
  {
    id: "privacy-officer",
    title: "Privacy Officer & Contact Information",
    Icon: Mail,
  },
  {
    id: "changes-terms",
    title: "Changes to the Terms of This Notice",
    Icon: Bell,
  },
  { id: "more-information", title: "For More Information", Icon: Shield },
];

export default function HIPAANoticeContent() {
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

    tocItems.forEach((t) => {
      const el = document.getElementById(t.id);
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
            {tocItems.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className={cn(
                    "flex items-center text-sm rounded-xl hover:text-primary px-4 py-2.5 transition-colors",
                    activeId === t.id
                      ? "bg-gradient-primary text-white font-medium"
                      : "text-muted-foreground border-l-2 border-transparent",
                  )}
                >
                  <t.Icon className="size-4 mr-2 shrink-0" />
                  {t.title}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </aside>
      <div className="flex-1 space-y-6">
        <NoticeSummarySection />
        <YourRightsSection />
        <YourChoicesSection />
        <OurUsesSection />
        <OurResponsibilitiesSection />
        <PrivacyOfficerSection />
        <ChangesTermsSection />
        <MoreInformationSection />
      </div>
    </div>
  );
}
