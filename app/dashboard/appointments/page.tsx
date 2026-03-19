"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Appointment,
  AppointmentCard,
} from "@/components/dashboard/AppointmentCard";
import { Calendar } from "lucide-react";

const APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    providerName: "Dr. Emily Chen",
    specialty: "Clinical Psychologist",
    initials: "EC",
    date: "January 13, 2026",
    time: "2:00 PM",
    duration: 60,
    type: "Video Call",
    status: "Confirmed",
  },
  {
    id: "2",
    providerName: "Dr. Michael Ross",
    specialty: "Psychiatrist",
    initials: "MR",
    date: "January 15, 2026",
    time: "10:00 AM",
    duration: 45,
    type: "Video Call",
    status: "Confirmed",
  },
  {
    id: "3",
    providerName: "Dr. Sarah Miller",
    specialty: "Licensed Therapist",
    initials: "SM",
    date: "January 18, 2026",
    time: "3:30 PM",
    duration: 60,
    type: "Phone Call",
    status: "Pending",
  },
  {
    id: "4",
    providerName: "Dr. Olivia Park",
    specialty: "Psychiatrist",
    initials: "OP",
    date: "January 10, 2026",
    time: "11:00 AM",
    duration: 60,
    type: "Video Call",
    status: "Past",
  },
  {
    id: "5",
    providerName: "Dr. Aaron Lee",
    specialty: "Clinical Psychologist",
    initials: "AL",
    date: "January 12, 2026",
    time: "1:00 PM",
    duration: 60,
    type: "Video Call",
    status: "Cancelled",
  },
];

export default function AppointmentsPage() {
  const [tab, setTab] = useState<"upcoming" | "past" | "cancelled">("upcoming");

  const filtered = APPOINTMENTS.filter((a) => {
    if (tab === "upcoming")
      return a.status === "Confirmed" || a.status === "Pending";
    if (tab === "past") return a.status === "Past";
    if (tab === "cancelled") return a.status === "Cancelled";
    return false;
  });

  const next = APPOINTMENTS.find((a) => a.status === "Confirmed");

  function formatBannerDate(app: Appointment) {
    const today = new Date();
    const parsed = new Date(app.date);
    const diff = parsed.setHours(0, 0, 0) - today.setHours(0, 0, 0);
    if (diff === 0) return "today";
    if (diff === 24 * 60 * 60 * 1000) return "tomorrow";
    return `on ${app.date}`;
  }

  return (
    <div className="space-y-6 h-full">
      {/* header */}
      <div>
        <h1 className="text-2xl font-medium">My Appointments</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your therapy sessions
        </p>
      </div>

      {/* upcoming banner */}

      <div className="rounded-md bg-blue-50 px-4 py-3 text-sm text-blue-800 flex items-center">
        <Calendar className="size-4 mr-2" />
        You have an upcoming session with {next?.providerName}{" "}
        {formatBannerDate(next!)} at {next?.time}
      </div>

      {/* tabs */}
      <div className="flex space-x-2 bg-muted p-1 w-fit rounded-full">
        {(["upcoming", "past", "cancelled"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-1 rounded-full text-sm",
              tab === t ? "bg-gradient-dash text-white" : "hover:bg-muted/80",
            )}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* list */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground">
            No appointments to show.
          </p>
        )}

        {filtered.map((app) => (
          <AppointmentCard key={app.id} appointment={app} />
        ))}
      </div>
    </div>
  );
}
