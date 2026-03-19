import Image from "next/image";
import { ChevronRight } from "lucide-react";
import supportImg from "@/assets/landing/support.png";
import mapImg from "@/assets/landing/map.png";
import { Button } from "./ui/button";

import targetIcon from "@/assets/icons/target.svg";
import badgeIcon from "@/assets/icons/badge.svg";
import speakerIcon from "@/assets/icons/speaker.svg";
import { Container } from "./ui/container";
import Link from "next/link";

export default function SupportSection() {
  const features = [
    {
      id: "experienced",
      icon: badgeIcon,
      title: "Experienced, Caring Professionals",
      description:
        "Our Qualified Mental Health Experts Take Time To Understand Your Story And Support You With Empathy, Respect, And Professionalism.",
    },
    {
      id: "care-designed",
      icon: targetIcon,
      title: "Care Designed Around Your Life",
      description:
        "Your Treatment Plan Is Customized To Your Symptoms, Goals, And Daily Routine - Because Progress Looks Different For Everyone.",
    },
    {
      id: "online-care",
      icon: speakerIcon,
      title: "Online Care With A Human Touch",
      description:
        "Your Treatment Plan Is Customized To Your Symptoms, Goals, And Daily Routine -Because Progress Looks Different For Everyone.",
    },
  ];

  return (
    <section className="py-16 md:py-20 space-y-12">
      <div>
        <Container>
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold leading-relaxed">
                <span className="block text-primary">
                  Dealing With Anxiety Or ADHD?
                </span>
                <span className="block text-slate-900 font-semibold">
                  <span className="text-primary">Real Support</span> Is Within
                  Reach.
                </span>
              </h2>

              <ul className="mt-8 space-y-6">
                {features.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <div className="flex gap-2 items-center">
                        <div className="size-8 rounded-full bg-[#2195801A] flex items-center justify-center shrink-0">
                          <Image
                            src={Icon}
                            alt={`${item.title} icon`}
                            className="size-6"
                          />
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          {item.title}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex justify-center md:justify-end h-96">
              <div className="relative w-full h-full max-w-md">
                <div className="absolute -inset-2 rounded-2xl border-2 border-primary w-4/5"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={supportImg}
                    alt="Support"
                    className="object-cover aspect-square h-96"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div>
        <Container>
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 items-center">
            <div className="flex justify-center md:justify-start">
              <div className="relative w-full max-w-lg">
                <div className="relative ">
                  <Image
                    src={mapImg}
                    alt="Availability map"
                    className="object-contain w-full h-auto"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-primary ">
                SUPPORT THAT MEETS YOU
              </h3>
              <h2 className="text-2xl md:text-3xl font-medium mt-2">
                <span className="block text-slate-900 font-semibold">
                  WHERE YOU ARE
                </span>
              </h2>

              <div className="mt-6">
                <div className="flex items-center gap-4">
                  <div className="size-8 flex items-center justify-center bg-[#2195801A] rounded-full">
                    <Image
                      src={targetIcon}
                      alt="Target icon"
                      className="size-5"
                    />
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    Availability Across Multiple States
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Our services are accessible in many regions, making it easier
                  to connect with licensed providers wherever you’re located.
                </p>
              </div>

              <div className="mt-6 border-t pt-4">
                <Link href="/onboarding">
                  <Button size={"lg"} className="bg-gradient-primary">
                    Book Your Session <ChevronRight />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
