import { MapPin, Clock, Shield, Home } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    id: "access",
    title: "Easy Access to Doctors",
    description:
      "Connect with healthcare professionals regardless of your location or mobility constraints.",
    icon: MapPin,
  },
  {
    id: "time",
    title: "Time-Saving & Convenient",
    description:
      "Eliminate travel time and waiting rooms. Get care on your schedule with flexible appointment times.",
    icon: Clock,
  },
  {
    id: "privacy",
    title: "Private & Secure",
    description:
      "All consultations are conducted through encrypted, HIPAA-compliant platforms to protect your privacy.",
    icon: Shield,
  },
  {
    id: "home",
    title: "Care From Home",
    description:
      "Receive professional medical attention from the comfort and safety of your own environment.",
    icon: Home,
  },
];

export default function TelehealthBenefits() {
  return (
    <section className="py-16 bg-linear-to-b from-[#F0FDFA] to-white">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeader
          title="Benefits Of"
          subtitle="Telehealth"
          description="Experience modern healthcare designed around your needs and lifestyle."
          className="max-w-xl mx-auto"
        />
      </div>

      <div className="mt-12 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {benefits.map((benefit) => (
          <Card key={benefit.id} className="bg-white p-4 shadow-md gap-0">
            <div className="mb-4 size-12 rounded-xl bg-[#CBFBF1] text-primary flex items-center justify-center">
              <benefit.icon className="size-6" />
            </div>
            <h3 className="font-medium text-slate-900">{benefit.title}</h3>
            <p className="mt-2 text-muted-foreground text-xs">
              {benefit.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
