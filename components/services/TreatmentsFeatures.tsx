import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const features = [
  {
    title: "Care Through Secure Video Sessions",
    desc: "Consult Licensed Providers Through Online Video Visits. No Travel, No Waiting Rooms.",
  },
  {
    title: "Appointments That Fit Your Routine",
    desc: "Choose Visit Times That Work Around Your Schedule, Including Evenings And Weekends.",
  },
  {
    title: "Treatment Guided By Clinical Research",
    desc: "Care Plans Are Based On Proven Medical Practices And Tailored To Your Condition.",
  },
  {
    title: "Quality Care At Fair Pricing",
    desc: "Access Professional Mental Health Services Without The High Costs Of Traditional Clinics.",
  },
  {
    title: "Online Prescriptions Made Convenient",
    desc: "When Appropriate, Providers Can Issue New Prescriptions Or Continue Existing Ones Digitally.",
  },
  {
    title: "Support Whenever You Need It",
    desc: "Our Care Team Is Available To Assist You Throughout Your Treatment Journey.",
  },
];

export default function TreatmentsFeatures() {
  return (
    <section className="py-12">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
            <span className="block">
              <span className="text-gradient bg-gradient-primary">
                Why People Prefer{" "}
              </span>
              <span className="font-semibold">Our Platform</span>
            </span>
          </h2>
          <Button className="bg-gradient-primary" size="lg">
            Start Online Care
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#21958008] border rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-2 bg-gradient-primary rounded-md relative">
                  <ShieldCheck className="w-5 h-5 text-white fill-current" />
                  <Check className="size-4 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
