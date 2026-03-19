import { ShieldIcon, TrendingUp, CheckCircle, Award } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "../ui/card";

const commitments = [
  {
    id: 1,
    title: "Trusted Experience",
    desc: "All our providers bring years of hands-on clinical experience and specialized training in mental healthcare.",
    icon: Award,
  },
  {
    id: 2,
    title: "Continuous Growth",
    desc: "Our clinicians regularly participate in performance reviews, patient feedback sessions, and professional development programs.",
    icon: TrendingUp,
  },
  {
    id: 3,
    title: "Careful Selection",
    desc: "Each provider goes through a rigorous screening and credentialing process to ensure compassionate and evidence-based treatment.",
    icon: CheckCircle,
  },
];

export default function CommitmentSection() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <SectionHeader title="Our Commitment" subtitle="To Excellence" />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {commitments.map((c) => (
            <Card key={c.id} className="p-5 gap-0 flex flex-col shadow ring-0">
              <div className="size-13 bg-[#B8E8E2] text-primary rounded-xl flex items-center justify-center mb-4">
                <c.icon className="size-6" />
              </div>
              <h4 className="text-lg font-semibold">{c.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
