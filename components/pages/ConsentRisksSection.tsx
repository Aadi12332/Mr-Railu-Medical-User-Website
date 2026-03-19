import { Wifi, Stethoscope, AlertCircle } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";

const risks = [
  {
    id: "internet",
    title: "Internet or Technical Issues",
    description:
      "Connection problems may occasionally interrupt sessions. We recommend a stable internet connection for the best experience.",
    icon: Wifi,
  },
  {
    id: "physical",
    title: "Limited Physical Examination",
    description:
      "Some conditions require in-person evaluation. Your provider will advise if a physical visit is necessary.",
    icon: Stethoscope,
  },
  {
    id: "security",
    title: "Data Transmission Risks (Rare)",
    description:
      "While our systems use advanced encryption, no digital platform can guarantee 100% security against all threats.",
    icon: AlertCircle,
  },
];

export default function ConsentRisksSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeader
          title="Possible Risks & Limitations"
          description="We believe in transparency. Here are some considerations to be aware of when using telehealth services."
          className="max-w-xl mx-auto"
        />
      </div>

      <div className="mt-12 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {risks.map((risk) => (
          <Card
            key={risk.id}
            className="bg-[#FFFBEB] ring-0 border border-[#FEF3C6] p-4 shadow-md gap-0"
          >
            <div className="mb-4 size-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <risk.icon className="size-6" />
            </div>
            <h3 className="font-medium text-slate-900">{risk.title}</h3>
            <p className="mt-2 text-muted-foreground text-xs">
              {risk.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
