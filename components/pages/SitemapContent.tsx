"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Container } from "../ui/container";

// add an id field derived from title for scrolling
const categories = [
  {
    title: "Health Conditions",
    links: [
      { href: "/health/adhd", label: "ADHD Care by State" },
      { href: "/health/anxiety", label: "Anxiety Treatment" },
      { href: "/health/depression", label: "Depression Support" },
      { href: "/health/sleep-insomnia", label: "Sleep & Insomnia" },
      { href: "/health/ocd-trauma", label: "OCD & Trauma Care" },
      { href: "/health/weight-management", label: "Weight Management" },
      { href: "/health/bipolar", label: "Bipolar Disorder" },
      { href: "/health/ptsd", label: "PTSD Therapy" },
      { href: "/health/panic-disorder", label: "Panic Disorder" },
      { href: "/health/social-anxiety", label: "Social Anxiety" },
    ],
  },
  {
    title: "Medical Services",
    links: [
      { href: "/services/online-doctor", label: "Online Doctor Visits" },
      {
        href: "/services/medication-management",
        label: "Medication Management",
      },
      { href: "/services/esa-letter", label: "ESA Letter Services" },
      { href: "/services/prescription-refills", label: "Prescription Refills" },
      { href: "/services/lab-testing", label: "Lab Testing" },
      { href: "/services/follow-up", label: "Follow-up Appointments" },
      { href: "/services/consultation", label: "Consultation Booking" },
    ],
  },
  {
    title: "Learning Resources",
    links: [
      { href: "/resources/guides", label: "Mental Health Guides" },
      {
        href: "/resources/medication-education",
        label: "Medication Education",
      },
      { href: "/resources/self-care", label: "Self-care Articles" },
      {
        href: "/resources/diagnosis-treatment",
        label: "Diagnosis & Treatment Info",
      },
      { href: "/resources/therapy-techniques", label: "Therapy Techniques" },
      { href: "/resources/wellness-tips", label: "Wellness Tips" },
      { href: "/resources/research-studies", label: "Research & Studies" },
      { href: "/resources/video-library", label: "Video Library" },
    ],
  },
  {
    title: "About Us",
    links: [
      { href: "/about", label: "Company Overview" },
      { href: "/about/providers", label: "Our Providers" },
      { href: "/reviews", label: "Patient Reviews" },
      { href: "/contact", label: "Contact Us" },
      { href: "/careers", label: "Careers" },
      { href: "/press", label: "Press & Media" },
      { href: "/partners", label: "Partner Program" },
    ],
  },
  {
    title: "Legal & Policies",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-use", label: "Terms of Use" },
      { href: "/refund-policy", label: "Refund Policy" },
      { href: "/payment-terms", label: "Payment Terms" },
      { href: "/hipaa-notice", label: "HIPAA Notice" },
      { href: "/ai-disclosure", label: "AI Usage Disclosure" },
      { href: "/cookie-policy", label: "Cookie Policy" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/faqs", label: "FAQs" },
      { href: "/pharmacy-help", label: "Pharmacy Help" },
      { href: "/insurance-questions", label: "Insurance Questions" },
      { href: "/billing-support", label: "Billing Support" },
      { href: "/technical-issues", label: "Technical Issues" },
      { href: "/account-settings", label: "Account Settings" },
      { href: "/sitemap", label: "Sitemap" },
    ],
  },
];

// helper to create slug ids
const withIds = categories.map((c) => ({
  ...c,
  id: c.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""),
}));

export default function SitemapContent() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );

    withIds.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Container className="py-16 lg:flex gap-8">
      <aside className="hidden lg:block lg:w-64 sticky top-24">
        <Card className="p-5 gap-0 shadow-sm">
          <h3 className="font-semibold mb-4 text-lg">Table of Contents</h3>
          <ul className="space-y-1">
            {withIds.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`#${cat.id}`}
                  className={cn(
                    "block text-sm rounded-xl hover:text-primary px-4 py-2.5 transition-colors",
                    activeId === cat.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  {cat.title}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </aside>
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-12">
          {withIds.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-24">
              <h3 className="text-lg font-semibold mb-4">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
