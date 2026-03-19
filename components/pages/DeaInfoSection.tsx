import { Calendar, Clipboard, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const infoItems = [
  {
    id: "background",
    title: "Background",
    description:
      "During the pandemic, emergency policies enabled healthcare providers to prescribe controlled medications via telehealth without requiring an in‑person visit first.",
    icon: Clipboard,
  },
  {
    id: "changed",
    title: "What Changed",
    description:
      "The DEA has officially extended these telehealth prescription flexibilities through the end of 2026, ensuring continuity of care for patients currently receiving treatment.",
    icon: Calendar,
  },
  {
    id: "patients",
    title: "What It Means for Patients",
    description:
      "You can continue accessing your prescribed medications through secure online consultations with licensed providers until at least December 31, 2026.",
    icon: Users,
  },
];

export default function DeaInfoSection() {
  return (
    <section className="">
      <div className="">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-sm space-y-2">
          <p>
            Telehealth has made it easier for patients to connect with doctors
            online. During the COVID-19 emergency, special rules allowed certain
            medications to be prescribed through virtual visits.
          </p>

          <p>
            These rules have now been reviewed and extended. According to the
            latest guidance from the DEA, patients can continue receiving
            approved treatments through telehealth services until December 31,
            2026, without needing an in- person appointment.
          </p>
        </div>
      </div>

      <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {infoItems.map((item) => (
          <Card key={item.id} className="bg-white p-6 shadow-md gap-0">
            <div className="mb-4 size-12 rounded-xl bg-gradient-primary text-white flex items-center justify-center">
              <item.icon className="size-6" />
            </div>
            <h3 className="font-medium text-slate-900">{item.title}</h3>
            <p className="mt-2 text-muted-foreground text-xs">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
