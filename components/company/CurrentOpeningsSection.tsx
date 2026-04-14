import { ChevronRight, MapPin, Briefcase, Star } from "lucide-react";
import { Card } from "../ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import CareersList from "./CareersList";

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

export default function CurrentOpeningsSection({loading,error,careers}: {loading: boolean; error: string | null; careers: any}) {
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
          <CareersList careers={careers} loading={loading} error={error} />
        </div>
      </Container>
    </section>
  );
}
