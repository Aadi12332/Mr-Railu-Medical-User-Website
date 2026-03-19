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

const sections = [
  {
    id: "acceptance-and-agreement",
    title: "Acceptance And Agreement",
    subtitle: " To Be Bound",
    shortTitle: "Acceptance And Agreement",
    Icon: FilePenLine,
    content: <AcceptanceAndAgreement />,
  },
  {
    id: "sites-not-for-children",
    title: "Sites Not Intended",
    subtitle: "For Children",
    shortTitle: "Not Intended For Children",
    Icon: UserX,
    content: <SitesNotForChildren />,
  },
  {
    id: "creating-an-account",
    title: "Creating",
    subtitle: "An Account",
    shortTitle: "Creating An Account",
    Icon: Users,
    content: <CreatingAnAccount />,
  },
  {
    id: "account-registration-and-security",
    title: "Account Registration And",
    subtitle: "Security",
    shortTitle: "Account Registration And Security",
    Icon: Lock,
    content: <AccountRegistrationAndSecurity />,
  },
  {
    id: "hipaa-notice",
    title: "HIPAA Notice",
    subtitle: "(Privacy & Health Information)",
    shortTitle: "HIPAA Notice",
    Icon: ShieldIcon,
    content: <HIPAANotice />,
  },
  {
    id: "prohibited-countries",
    title: "Prohibited",
    subtitle: "Countries",
    shortTitle: "Prohibited Countries",
    Icon: Globe,
    content: <ProhibitedCountries />,
  },
  {
    id: "therapy-services",
    title: "Therapy",
    subtitle: "Services",
    shortTitle: "Therapy Services",
    Icon: Activity,
    content: <TherapyServices />,
  },
  {
    id: "independence-of-practitioners",
    title: "Independence Of",
    subtitle: "Practitioners",
    shortTitle: "Independence Of Practitioners",
    Icon: User,
    content: <IndependenceOfPractitioners />,
  },
  {
    id: "licensed-practitioners",
    title: "Only Licensed Practitioners",
    subtitle: "Provide Medical Advice",
    shortTitle: "Licensed Practitioners",
    Icon: UserCheck,
    content: <LicensedPractitioners />,
  },
  {
    id: "user-conduct",
    title: "User",
    subtitle: "Conduct",
    shortTitle: "User Conduct",
    Icon: ShieldIcon,
    content: <UserConduct />,
  },
  {
    id: "license-grant",
    title: "License Grant And",
    subtitle: "Permitted Use",
    shortTitle: "License Grant",
    Icon: Globe,
    content: <LicenseGrant />,
  },
  {
    id: "acceptable-use",
    title: "Acceptable",
    subtitle: "Use",
    shortTitle: "Acceptable Use",
    Icon: Activity,
    content: <AcceptableUse />,
  },
  {
    id: "consent-electronic",
    title: "Consent To Electronic",
    subtitle: "Communications",
    shortTitle: "Electronic Communications",
    Icon: Globe,
    content: <ConsentElectronic />,
  },
  {
    id: "security-privacy",
    title: "Security And",
    subtitle: "Privacy",
    shortTitle: "Security & Privacy",
    Icon: Lock,
    content: <SecurityPrivacy />,
  },
  {
    id: "information-provide",
    title: "Information You",
    subtitle: "Provide",
    shortTitle: "Information You Provide",
    Icon: Users,
    content: <InformationYouProvide />,
  },
  {
    id: "submissions-information",
    title: "Submissions Of",
    subtitle: "Information",
    shortTitle: "Submissions Of Information",
    Icon: FileText,
    content: <SubmissionsOfInformation />,
  },
  {
    id: "intellectual-property",
    title: "Intellectual",
    subtitle: "Property",
    shortTitle: "Intellectual Property",
    Icon: Copyright,
    content: <IntellectualProperty />,
  },
  {
    id: "operation-of-the-site",
    title: "Operation Of The",
    subtitle: "Site",
    shortTitle: "Operation Of The Site",
    Icon: Server,
    content: <OperationOfTheSite />,
  },
  {
    id: "limitation-of-liability",
    title: "Limitation Of",
    subtitle: "Liability",
    shortTitle: "Limitation Of Liability",
    Icon: AlertTriangle,
    content: <LimitationOfLiability />,
  },
  {
    id: "no-warranty",
    title: "No Warranty Or",
    subtitle: "Guarantee Of Outcome",
    shortTitle: "No Warranty Or Guarantee Of Outcome",
    Icon: AlertTriangle,
    content: <NoWarranty />,
  },
  {
    id: "indemnification",
    title: "Indemnification",
    subtitle: "",
    shortTitle: "Indemnification",
    Icon: ShieldIcon,
    content: <Indemnification />,
  },
  {
    id: "links-to-third-party-websites",
    title: "Links To",
    subtitle: "Third-Party Websites",
    shortTitle: "Third-Party Websites",
    Icon: ExternalLink,
    content: <LinksToThirdPartyWebsites />,
  },
  {
    id: "affiliate-disclaimer",
    title: "Affiliate",
    subtitle: "Disclaimer",
    shortTitle: "Affiliate Disclaimer",
    Icon: Briefcase,
    content: <AffiliateDisclaimer />,
  },
  {
    id: "no-assignment",
    title: "No",
    subtitle: "Assignment",
    shortTitle: "No Assignment",
    Icon: FileText,
    content: <NoAssignment />,
  },
  {
    id: "applicable-law-enforcement",
    title: "Applicable Law &",
    subtitle: "Enforcement",
    shortTitle: "Applicable Law",
    Icon: Scale,
    content: <ApplicableLawEnforcement />,
  },
  {
    id: "arbitration",
    title: "Arbitration",
    subtitle: "",
    shortTitle: "Arbitration",
    Icon: Gavel,
    content: <ArbitrationSection />,
  },
  {
    id: "no-third-party-beneficiaries",
    title: "No Third-Party",
    subtitle: "Beneficiaries",
    shortTitle: "No Third-Party Beneficiaries",
    Icon: UserX,
    content: <NoThirdPartyBeneficiaries />,
  },
  {
    id: "amendments-and-modifications",
    title: "Amendments And",
    subtitle: "Modifications",
    shortTitle: "Amendments And Modifications",
    Icon: FileText,
    content: <AmendmentsAndModifications />,
  },
];

export default function PrivacyPolicyContent() {
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
        {sections.map((s) => (
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
