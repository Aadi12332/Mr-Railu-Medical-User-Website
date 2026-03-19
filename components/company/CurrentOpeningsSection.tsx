import Link from "next/link";
import { ChevronRight, MapPin, Briefcase, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "../ui/card";

const openings = [
  {
    id: 1,
    title: "Administrative Assistant",
    location: "Remote",
    type: "Full-Time",
    level: "Entry Level",
    href: "#",
  },
  {
    id: 2,
    title: "Support Agent",
    location: "Regional",
    type: "Full-Time",
    level: "Mid Level",
    href: "#",
  },
  {
    id: 3,
    title: "Senior Product Designer",
    location: "Remote",
    type: "Contract",
    level: "Senior",
    href: "#",
  },
  {
    id: 4,
    title: "Customer Experience Specialist",
    location: "Remote",
    type: "Full-Time",
    level: "Mid Level",
    href: "#",
  },
  {
    id: 5,
    title: "Licensed Mental Health Counselor",
    location: "Remote",
    type: "Full-Time",
    level: "Licensed Professional",
    href: "#",
  },
  {
    id: 6,
    title: "Clinical Psychologist",
    location: "Remote",
    type: "Part-Time",
    level: "Licensed Professional",
    href: "#",
  },
];

export default function CurrentOpeningsSection() {
  return (
    <section id="openings" className="py-16 bg-white">
      <Container>
        <SectionHeader
          title="Current"
          subtitle="Opening"
          description="Find your next career opportunity and join a team that values your growth and contribution."
          align="center"
        />

        <div className="mt-10 max-w-3xl mx-auto space-y-4">
          {openings.map((job) => (
            <Link key={job.id} href={job.href} className="group block">
              <Card className="flex flex-row justify-between items-center p-4">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">
                    {job.title}
                  </h4>
                  <div className="mt-1 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{job.level}</span>
                    </div>
                  </div>
                </div>
                <div className="size-8 rounded-full flex justify-center items-center bg-gray-100">
                  <ChevronRight className="w-5 h-5 text-primary" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
