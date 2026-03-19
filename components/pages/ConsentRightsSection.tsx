import { XCircle, CircleQuestionMark, Truck } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";

const rights = [
  {
    id: "withdraw",
    title: "You Can Withdraw Consent Anytime",
    description:
      "You have the right to discontinue telehealth services at any point without affecting your access to standard care.",
    icon: XCircle,
  },
  {
    id: "questions",
    title: "You Can Ask Questions",
    description:
      "Feel free to ask your healthcare provider any questions about the telehealth process, technology, or your care plan.",
    icon: CircleQuestionMark,
  },
  {
    id: "emergency",
    title: "Emergency Care Should Be Done In Person",
    description:
      "For urgent or life‑threatening situations, please call 911 or visit your nearest emergency room immediately.",
    icon: Truck,
  },
];

export default function ConsentRightsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeader
          title="Your Rights As A Patient"
          description="Understanding your rights ensures you receive care that respects your autonomy and wellbeing."
          className="max-w-xl mx-auto"
        />
      </div>

      <div className="mt-12 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {rights.map((right) => (
          <Card
            key={right.id}
            className="bg-linear-to-br from-[#F0FDFA] to-white ring-0 border border-[#CBFBF1] p-6 gap-0"
          >
            <div className="mb-4 size-12 rounded-xl bg-[#CBFBF1] text-primary flex items-center justify-center">
              <right.icon className="size-6" />
            </div>
            <h3 className="font-medium text-slate-900">{right.title}</h3>
            <p className="mt-2 text-muted-foreground text-xs">
              {right.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
