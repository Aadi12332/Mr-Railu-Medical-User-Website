import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { Calendar, Rocket, BarChart2, Users, Star, Target } from "lucide-react";
import { FC } from "react";

// timeline event type used by the card component
interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: FC<React.SVGProps<SVGSVGElement>>;
}

// direction prop determines which side of the central line the card appears on
interface TimelineEventCardProps {
  event: TimelineEvent;
  direction: "left" | "right";
}

function TimelineEventCard({ event, direction }: TimelineEventCardProps) {
  const isLeft = direction === "left";

  return (
    <div
      className={`w-full md:w-1/2 ${isLeft ? "md:pr-8" : "md:pl-8"} ${isLeft ? "md:text-right" : "md:text-left"}`}
    >
      <div
        className={cn(
          "flex gap-5 flex-col md:flex-row items-start md:items-center",
          !isLeft && "md:flex-row-reverse",
        )}
      >
        <div className="order-2 md:order-1 bg-white rounded-xl shadow-lg p-6 text-left flex items-start gap-4">
          <div className="flex-1">
            <span className="inline-block bg-gradient-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
              {event.year}
            </span>
            <h3 className="mt-2 font-semibold text-lg">{event.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {event.description}
            </p>
          </div>
        </div>
        <div className="order-1 md:order-2 size-12 shadow-md rounded-full bg-gradient-primary flex shrink-0 justify-center items-center">
          <event.icon className="size-5 text-white" />
        </div>
      </div>
    </div>
  );
}

export default function VisionSection() {
  return (
    <>
      <section className="py-16 md:py-20 bg-gray-50">
        <Container>
          <div className="size-15 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center">
            <Target className="size-10 text-white" />
          </div>
          <SectionHeader title="Our" subtitle="Vision" />

          <div className="mt-10 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-lg text-slate-700 leading-relaxed">
                We envision a world where mental health receives the same
                priority as physical health where people feel heard, supported,
                and empowered to live their best lives.
              </p>

              <p className="mt-4 text-sm text-muted-foreground">
                Together, we are shaping the future of mental healthcare with
                empathy and innovation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* timeline section */}
      <section className="py-10">
        <Container>
          <SectionHeader
            title="Our"
            subtitle="Vision"
            description="A journey of innovation and compassionate care"
          />

          {/* timeline section */}
          <div className="relative mt-16 max-w-4xl mx-auto">
            <div className="absolute md:left-1/2 left-4 md:transform md:-translate-x-1/2 h-full w-1 bg-primary" />

            <div className="space-y-12">
              {[
                {
                  year: "2019",
                  title: "Foundation",
                  description:
                    "Founded with a mission to bring quality mental healthcare online after years of running physical clinics.",
                  icon: Calendar,
                },
                {
                  year: "2020–2021",
                  title: "Platform Launch",
                  description:
                    "Launch of a custom telehealth platform enabling secure video consultations and digital care management.",
                  icon: Rocket,
                },
                {
                  year: "2022",
                  title: "Rapid Expansion",
                  description:
                    "Expanded to multiple states with thousands of successful consultations and rapid growth.",
                  icon: BarChart2,
                },
                {
                  year: "2023",
                  title: "Strategic Partnerships",
                  description:
                    "Partnered with leading clinics and doubled healthcare providers on the platform.",
                  icon: Users,
                },
                {
                  year: "Future Goal",
                  title: "Complete Ecosystem",
                  description:
                    "To become a complete mental wellness ecosystem supporting millions across the country.",
                  icon: Star,
                },
              ].map((event, idx) => (
                <div
                  key={idx}
                  className={`flex w-full relative flex-col md:flex-row items-center ${
                    idx % 2 !== 0 ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <TimelineEventCard
                    event={event}
                    direction={idx % 2 !== 0 ? "left" : "right"}
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
