"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

import {
  FileText,
  Info,
  Check,
  ShieldIcon,
  AwardIcon,
  Users,
  Eye,
  // ChevronDown,
  AlertCircle,
  Lock,
  CreditCard,
  Link,
  Scale,
} from "lucide-react";

import TermsOverview from "./terms-sections/TermsOverview";
import AccessToWebsite from "./terms-sections/AccessToWebsite";
import ServicesFeatures from "./terms-sections/ServicesFeatures";
import ServicesDisclaimer from "./terms-sections/ServicesDisclaimer";
import MemberAccountRegistration from "./terms-sections/MemberAccountRegistration";
import InformationCollectionDisclosure from "./terms-sections/InformationCollectionDisclosure";
import NoProviderRelationship from "./terms-sections/NoProviderRelationship";
import UserAcknowledgements from "./terms-sections/UserAcknowledgements";
import DoNotSharePHI from "./terms-sections/DoNotSharePHI";
import ExpressConsentBilling from "./terms-sections/ExpressConsentBilling";
import PermittedUses from "./terms-sections/PermittedUses";
import RulesUserConduct from "./terms-sections/RulesUserConduct";
import MinorsCollection from "./terms-sections/MinorsCollection";
import DisclaimerLiability from "./terms-sections/DisclaimerLiability";
import InformationYouProvide from "./terms-sections/InformationYouProvide";
import LinksThirdParty from "./terms-sections/LinksThirdParty";
import DoNotSubmitIdeas from "./terms-sections/DoNotSubmitIdeas";
import AgreementToIndemnify from "./terms-sections/AgreementToIndemnify";
import OperationOfWebsite from "./terms-sections/OperationOfWebsite";
import OnlinePrivacyCommunications from "./terms-sections/OnlinePrivacyCommunications";
import ProprietaryRights from "./terms-sections/ProprietaryRights";
import HealthDisclaimer from "./terms-sections/HealthDisclaimer";
import IntellectualPropertyInfringement from "./terms-sections/IntellectualPropertyInfringement";
import NoAssignmentOfTerms from "./terms-sections/NoAssignmentOfTerms";
import EnforcementOfTerms from "./terms-sections/EnforcementOfTerms";
import AffiliateDisclaimer from "./terms-sections/AffiliateDisclaimer";
import AgreementAcknowledgment from "./terms-sections/AgreementAcknowledgment";
import Subscriptions from "./terms-sections/Subscriptions";

const sections = [
  {
    id: "terms-overview",
    title: "MEDvidi Website",
    subtitle: "Terms And Conditions Of Use",
    shortTitle: "Introduction",
    Icon: FileText,
    content: <TermsOverview />,
  },
  {
    id: "access-to-website",
    title: "Access To Website",
    subtitle: "Governed By These Terms",
    shortTitle: "Access To Website",
    Icon: ShieldIcon,
    content: <AccessToWebsite />,
  },
  {
    id: "services-features",
    title: "Services",
    subtitle: "And Features",
    shortTitle: "Services and Features",
    Icon: AwardIcon,
    content: <ServicesFeatures />,
  },
  {
    id: "services-disclaimer",
    title: "Services Disclaimer - ",
    subtitle: "Independence Of Professionals",
    shortTitle: "Independence Of Professionals",
    Icon: Users,
    content: <ServicesDisclaimer />,
  },
  {
    id: "member-account-registration",
    title: "Member Account And",
    subtitle: "Registration",
    shortTitle: "Member Account And Registration",
    Icon: Users,
    content: <MemberAccountRegistration />,
  },
  {
    id: "information-collection-disclosure",
    title: "Information Collection,",
    subtitle: "Use And Disclosure",
    shortTitle: "Information Collection and use",
    Icon: Eye,
    content: <InformationCollectionDisclosure />,
  },
  {
    id: "no-provider-relationship",
    title: "No Provider-Patient Relationship/",
    subtitle: "No Medical Advice",
    shortTitle: "No Provider-Patient Relationship",
    Icon: AlertCircle,
    content: <NoProviderRelationship />,
  },
  {
    id: "user-acknowledgements",
    title: "User",
    subtitle: "Acknowledgements",
    shortTitle: "User Acknowledgements",
    Icon: Check,
    content: <UserAcknowledgements />,
  },
  {
    id: "do-not-share-phi",
    title: "Do Not Share",
    subtitle: "Protected Health Information",
    shortTitle: "Protected Health Information",
    Icon: Lock,
    content: <DoNotSharePHI />,
  },
  {
    id: "express-consent-billing",
    title: "Express Consent To",
    subtitle: "Billing Methods",
    shortTitle: "Express Consent To Billing",
    Icon: CreditCard,
    content: <ExpressConsentBilling />,
  },
  {
    id: "permitted-uses",
    title: "Permitted Uses Of",
    subtitle: "Website Content",
    shortTitle: "Permitted Uses Of Content",
    Icon: FileText,
    content: <PermittedUses />,
  },
  {
    id: "rules-user-conduct",
    title: "Rules Governing",
    subtitle: "User Conduct",
    shortTitle: "Rules Governing Conduct",
    Icon: Scale,
    content: <RulesUserConduct />,
  },
  {
    id: "minors-collection",
    title: "Website Does Not Collect",
    subtitle: "Information About Minors",
    shortTitle: "Information About Minors",
    Icon: ShieldIcon,
    content: <MinorsCollection />,
  },
  {
    id: "disclaimer-liability",
    title: "Disclaimer Of Liability",
    subtitle: "And No Warranty",
    shortTitle: "Disclaimer And No Warranty",
    Icon: FileText,
    content: <DisclaimerLiability />,
  },
  {
    id: "information-you-provide",
    title: "Information",
    subtitle: "You Provide",
    shortTitle: "Information You Provide",
    Icon: Eye,
    content: <InformationYouProvide />,
  },
  {
    id: "links-third-party",
    title: "Links To",
    subtitle: "Third-Party Websites",
    shortTitle: "Third-Party Websites",
    Icon: Link,
    content: <LinksThirdParty />,
  },
  {
    id: "do-not-submit-ideas",
    title: "Do Not Submit Ideas Or",
    subtitle: "Creative Material",
    shortTitle: "Ideas and Creative Material",
    Icon: FileText,
    content: <DoNotSubmitIdeas />,
  },
  {
    id: "agreement-indemnify",
    title: "Agreement To",
    subtitle: "Indemnify",
    shortTitle: "Agreement To Indemnify",
    Icon: Scale,
    content: <AgreementToIndemnify />,
  },
  {
    id: "operation-website",
    title: "Operation Of",
    subtitle: "The Website",
    shortTitle: "Operation Of The Website",
    Icon: ShieldIcon,
    content: <OperationOfWebsite />,
  },
  {
    id: "online-privacy-communications",
    title: "Online Privacy And",
    subtitle: "Communications",
    shortTitle: "Online Privacy And Communications",
    Icon: Lock,
    content: <OnlinePrivacyCommunications />,
  },
  {
    id: "proprietary-rights",
    title: "Proprietary",
    subtitle: "Rights",
    shortTitle: "Proprietary Rights",
    Icon: AwardIcon,
    content: <ProprietaryRights />,
  },
  {
    id: "health-disclaimer",
    title: "Health Disclaimer For",
    subtitle: "Visitors And Members",
    shortTitle: "Health Disclaimer",
    Icon: Info,
    content: <HealthDisclaimer />,
  },
  {
    id: "intellectual-property-infringement",
    title: "Intellectual Property",
    subtitle: "Infringement",
    shortTitle: "Intellectual Property",
    Icon: Scale,
    content: <IntellectualPropertyInfringement />,
  },
  {
    id: "no-assignment-of-terms",
    title: "No Assignment Of Terms",
    subtitle: "Assignment Prohibited",
    shortTitle: "No Assignment Of Terms",
    Icon: FileText,
    content: <NoAssignmentOfTerms />,
  },
  {
    id: "enforcement-of-terms",
    title: "Enforcement Of Terms And",
    subtitle: "Conditions",
    shortTitle: "Enforcement Of Terms",
    Icon: Scale,
    content: <EnforcementOfTerms />,
  },
  {
    id: "affiliate-disclaimer",
    title: "Affiliate",
    subtitle: "Disclaimer",
    shortTitle: "Affiliate Disclaimer",
    Icon: Link,
    content: <AffiliateDisclaimer />,
  },
  {
    id: "agreement-acknowledgment",
    title: "Agreement And",
    subtitle: "Acknowledgment",
    shortTitle: "Agreement And Acknowledgment",
    Icon: Check,
    content: <AgreementAcknowledgment />,
  },
  {
    id: "subscriptions",
    title: "Subscriptions",
    subtitle: "",
    shortTitle: "Subscriptions",
    Icon: CreditCard,
    content: <Subscriptions />,
  },
];

export default function TermsOfUseContent() {
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
                  <s.Icon className="size-4 mr-2 shrink-0" />
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
      </div>
    </div>
  );
}
