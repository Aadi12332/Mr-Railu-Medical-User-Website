"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  Activity,
  ChevronDown,
  FilePenLine,
  Globe,
  Lock,
  ShieldIcon,
  Users,
  UserX,
  User,
  UserCheck,
  FileText,
  Server,
  AlertTriangle,
  Copyright,
  ExternalLink,
  Briefcase,
  Scale,
  Gavel,
} from "lucide-react";
import PolicyContactCard from "./PolicyContactCard";

import AcceptanceAndAgreement from "./privacy-sections/AcceptanceAndAgreement";
import SitesNotForChildren from "./privacy-sections/SitesNotForChildren";
import CreatingAnAccount from "./privacy-sections/CreatingAnAccount";
import AccountRegistrationAndSecurity from "./privacy-sections/AccountRegistrationAndSecurity";
import HIPAANotice from "./privacy-sections/HIPAANotice";
import ProhibitedCountries from "./privacy-sections/ProhibitedCountries";
import TherapyServices from "./privacy-sections/TherapyServices";
import IndependenceOfPractitioners from "./privacy-sections/IndependenceOfPractitioners";
import LicensedPractitioners from "./privacy-sections/LicensedPractitioners";
import UserConduct from "./privacy-sections/UserConduct";
import LicenseGrant from "./privacy-sections/LicenseGrant";
import AcceptableUse from "./privacy-sections/AcceptableUse";
import ConsentElectronic from "./privacy-sections/ConsentElectronic";
import SecurityPrivacy from "./privacy-sections/SecurityPrivacy";
import InformationYouProvide from "./privacy-sections/InformationYouProvide";
import SubmissionsOfInformation from "./privacy-sections/SubmissionsOfInformation";
import IntellectualProperty from "./privacy-sections/IntellectualProperty";
import OperationOfTheSite from "./privacy-sections/OperationOfTheSite";
import LimitationOfLiability from "./privacy-sections/LimitationOfLiability";
import NoWarranty from "./privacy-sections/NoWarranty";
import Indemnification from "./privacy-sections/Indemnification";
import LinksToThirdPartyWebsites from "./privacy-sections/LinksToThirdPartyWebsites";
import AffiliateDisclaimer from "./privacy-sections/AffiliateDisclaimer";
import NoAssignment from "./privacy-sections/NoAssignment";
import ApplicableLawEnforcement from "./privacy-sections/ApplicableLawEnforcement";
import ArbitrationSection from "./privacy-sections/ArbitrationSection";
import NoThirdPartyBeneficiaries from "./privacy-sections/NoThirdPartyBeneficiaries";
import AmendmentsAndModifications from "./privacy-sections/AmendmentsAndModifications";


export default function PrivacyPolicyContent({data,loading,error}:any) {
  const [activeId, setActiveId] = useState<string | null>(null);
const sections =
  data?.sections
    ?.sort((a: any, b: any) => a.displayOrder - b.displayOrder)
    .map((item: any, idx: number) => ({
      id: `section-${idx}`,
      title: item.heading,
      subtitle: "",
      shortTitle: item.heading,
      Icon: FileText,
      content: (
        <p className="text-base leading-relaxed text-muted-foreground">
          {item.body}
        </p>
      ),
    })) || [];
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

    sections.forEach((s:any) => {
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
            {sections.map((s :any) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={cn(
                    "flex items-center text-sm rounded-xl hover:text-primary px-4 py-2.5 transition-colors",
                    activeId === s.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground border-l-2 border-transparent",
                  )}
                >
                  <s.Icon className="size-4 mr-2" />
                  {s.shortTitle}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </aside>
      <div className="flex-1 space-y-6">
        {sections.map((s:any) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <Card className="p-6 md:p-8 gap-0 shadow-md">
              <div className="flex items-center space-x-4 mb-4">
                <div className="shrink-0 size-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-sm">
                  <s.Icon className="size-5 text-white" />
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
        <PolicyContactCard />
      </div>
    </div>
  );
}
