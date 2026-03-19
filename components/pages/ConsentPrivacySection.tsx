import { ShieldCheck, Lock, ClipboardCheck } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";

const items = [
  {
    id: "protected",
    title: "Your Data is Protected",
    description:
      "We implement industry-leading security measures to safeguard your personal health information at all times.",
    icon: ShieldCheck,
  },
  {
    id: "secure",
    title: "Secure Communication System",
    description:
      "All video calls, messages, and data transfers use end-to-end encryption to maintain confidentiality.",
    icon: Lock,
  },
  {
    id: "hipaa",
    title: "HIPAA Compliant",
    description:
      "Our platform meets all Health Insurance Portability and Accountability Act requirements for patient privacy.",
    icon: ClipboardCheck,
  },
];

export default function ConsentPrivacySection() {
  return (
    <section className="py-16 bg-linear-to-b from-[#F0FDFA] to-white">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeader
          title="Privacy & Security"
          description="Your privacy is our top priority. We maintain the highest standards of data protection and compliance."
          className="max-w-xl mx-auto"
        />
      </div>

      <div className="mt-12 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item) => (
          <Card
            key={item.id}
            className="bg-white p-6 shadow-md gap-0 items-center text-center"
          >
            <div className="mb-4 size-12 rounded-xl bg-gradient-primary text-white flex items-center justify-center shadow-[0px_4px_6px_-4px_#96F7E4,0px_10px_15px_-3px_#96F7E4]">
              <item.icon className="size-6" />
            </div>
            <h3 className="font-medium text-slate-900">{item.title}</h3>
            <p className="mt-2 text-muted-foreground text-xs">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
