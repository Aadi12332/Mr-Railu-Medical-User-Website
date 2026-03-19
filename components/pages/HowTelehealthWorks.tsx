import { VideoIcon, ShieldIcon, Home } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

const features = [
  {
    id: "video",
    title: "Online Video Consultation",
    description:
      "Connect with healthcare providers through secure, high-quality video calls from anywhere.",
    icon: VideoIcon,
  },
  {
    id: "secure",
    title: "Secure Data Sharing",
    description:
      "Your medical information is encrypted and transmitted through HIPAA-compliant systems.",
    icon: ShieldIcon,
  },
  {
    id: "home",
    title: "No Physical Visit Required",
    description:
      "Receive professional medical care without leaving your home or office.",
    icon: Home,
  },
];

export default function HowTelehealthWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeader
          title="How Telehealth"
          subtitle="Works"
          description="Understanding the telehealth process helps you get the most from your virtual care experience."
          className="max-w-xl mx-auto"
        />
      </div>

      <div className="mt-12 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div key={feature.id} className="text-center">
            <div className="mx-auto mb-4 size-12 rounded-xl bg-gradient-primary text-white flex items-center justify-center">
              <feature.icon className="size-6" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">
              {feature.title}
            </h3>
            <p className="mt-2 text-muted-foreground text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
