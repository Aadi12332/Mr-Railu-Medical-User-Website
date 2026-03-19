import { Clock, Home, FileText, GraduationCap, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

import flexibleWorkImg from "@/assets/company/flexible-work.jpg";
import licenseSupportImg from "@/assets/company/license-support.jpg";
import careerDevelopmentImg from "@/assets/company/career-development.jpg";
import referralRewardImg from "@/assets/company/referral-reward.jpg";
import administrativeAssistantImg from "@/assets/company/administrative.jpg";
import Image from "next/image";
import { Card } from "../ui/card";

const benefits = [
  {
    id: 1,
    title: "Flexible Work Hours",
    desc: "Choose a schedule that fits your lifestyle and personal goals.",
    icon: Clock,
    image: flexibleWorkImg,
  },
  {
    id: 2,
    title: "Remote-First Environment",
    desc: "Work from anywhere within your licensed region.",
    icon: Home,
    image: flexibleWorkImg,
  },
  {
    id: 3,
    title: "License Support",
    desc: "We assist with medical and professional licensing needs.",
    icon: FileText,
    image: licenseSupportImg,
  },
  {
    id: 4,
    title: "Career Development",
    desc: "Ongoing training programs to grow your expertise and confidence.",
    icon: GraduationCap,
    image: careerDevelopmentImg,
  },
  {
    id: 5,
    title: "Referral Rewards",
    desc: "Earn bonuses by inviting skilled professionals to join our team.",
    icon: Users,
    image: referralRewardImg,
  },
  {
    id: 6,
    title: "Administrative Assistance",
    desc: "Focus on patients while we handle the paperwork.",
    icon: FileText,
    image: administrativeAssistantImg,
  },
];
export default function BenefitsSection() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <SectionHeader
          title="Meaningful Benefits"
          subtitle="for Your Wellbeing"
          description="We invest in our team members with comprehensive benefits that support your professional and personal growth."
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b) => (
            <Card key={b.id} className="overflow-hidden flex flex-col gap-0">
              <div className="h-40 w-full relative">
                <Image
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="size-11 bg-gradient-primary text-white rounded-xl flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-semibold">{b.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground flex-1">
                  {b.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
