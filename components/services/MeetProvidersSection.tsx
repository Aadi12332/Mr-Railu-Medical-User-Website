"use client";

import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import expertImg1 from "@/assets/landing/expert-1.png";
import expertImg2 from "@/assets/landing/expert-2.png";
import expertImg3 from "@/assets/landing/expert-3.png";
import expertImg4 from "@/assets/landing/expert-4.png";

const providers = [
  {
    id: 1,
    name: "Dr. Jane Smith, MD",
    description:
      "A Highly Experienced Physician With A Strong Background In Primary Care And Mental Health — Committed To Personalized, Evidence-Based Treatment.",
    image: expertImg4,
  },
  {
    id: 2,
    name: "Dr. Alex Johnson, MD",
    description:
      "A Highly Experienced Physician With A Strong Background In Primary Care And Mental Health — Committed To Personalized, Evidence-Based Treatment.",
    image: expertImg1,
  },
  {
    id: 3,
    name: "Dr. Priya Patel, MD",
    description:
      "A Highly Experienced Physician With A Strong Background In Primary Care And Mental Health — Committed To Personalized, Evidence-Based Treatment.",
    image: expertImg2,
  },
  {
    id: 4,
    name: "Dr. Michael Chichak, MD",
    description:
      "A Highly Experienced Physician With A Strong Background In Primary Care And Mental Health — Committed To Personalized, Evidence-Based Treatment.",
    image: expertImg3,
  },
];

interface MeetProvidersSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  /** layout variant – carousel (default) or grid */
  layout?: "carousel" | "grid";
  /** how many carousel rows to render when using carousel layout */
  rows?: number;
}

export default function MeetProvidersSection({
  data, loading, error,
  title = "Meet our",
  subtitle = "providers",
  description = "Quality care shouldn't come with surprise costs. Here's exactly what you'll pay.",
  layout = "carousel",
  rows = 1,
}: any) {
  const renderCard = (p: any) => {
    const imageUrl = p.imageUrl || p.profileImageUrl || expertImg1;
    const displayName = p.name || `Dr. ${p.firstName} ${p.lastName}`;
    const displayRole = p.role || p.specialty || "Provider";
    const displayBio = p.bio || "A Highly Experienced Physician With A Strong Background In Primary Care And Mental Health.";

    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow">
        <div className="overflow-hidden rounded-xl aspect-square mb-3 bg-gray-50">
          <Image
            src={imageUrl}
            alt={displayName}
            width={640}
            height={520}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="text-sm font-semibold text-slate-900 line-clamp-1">{displayName}</div>
        <div className="text-sm font-normal text-slate-900 line-clamp-1">{displayRole}</div>

        <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3">
          {displayBio}
        </p>
      </div>
    );
  };

  return (
    <section className="py-16 bg-transparent">
      <Container>
        <SectionHeader
          title={data?.teamTitle ?? ''}
          subtitle={data?.teamSubtitle ?? ""}
          description={data?.teamDescription ?? ""}
        />

        <div className="mt-8 space-y-6">
          {layout === "carousel" ? (
            // render one or more carousel rows depending on `rows` prop
            Array.from({ length: rows }).map((_, rowIdx) => (
              <Carousel
                key={rowIdx}
                opts={{ loop: true }}
                plugins={[
                  AutoScroll({
                    speed: 1,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true,
                  }),
                ]}
              >
                <CarouselContent className="-ml-4">
                  {(data?.teamMembers ?? [])?.map((p: any, index: number) => (
                    <CarouselItem
                      key={`${p.id}-${index}`}
                      className="pl-4 basis-4/5 sm:basis-1/2 lg:basis-1/4"
                    >
                      {renderCard(p)}
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ))
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
