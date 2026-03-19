import {  Heart, Shield, Sparkles } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export default function ValuesSection() {
  const values = [
    {
      id: 1,
      title: "Empower Growth",
      description:
        "We help individuals take charge of their mental wellness journey through intuitive tools, expert care, and continuous support.",
      icon: Sparkles,
    },
    {
      id: 2,
      title: "Personalized Support",
      description:
        "Every mind is different. Our solutions are tailored to each individual's unique needs using advanced clinical practices and smart technology.",
      icon: Heart,
    },
    {
      id: 3,
      title: "Break the Stigma",
      description:
        "We promote open conversations and create a safe environment where seeking help feels natural and respected.",
      icon: Shield,
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeader
          title="Our"
          subtitle="Values"
          description="These core principles guide everything we do"
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {values.map((v) => (
            <Card
              key={v.id}
              className="p-6 gap-0 flex flex-col items-start shadow-lg text-center md:text-left"
            >
              <div className="mb-4 flex items-center justify-center rounded-xl bg-gradient-primary p-3">
                <v.icon className="h-6 w-6 text-white" />
              </div>

              <CardTitle className="text-lg font-semibold">{v.title}</CardTitle>
              <CardDescription className="mt-2 text-sm text-muted-foreground">
                {v.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
