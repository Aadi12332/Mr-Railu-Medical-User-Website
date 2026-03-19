"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Pill, RefreshCcw } from "lucide-react";
import { PrescriptionItem } from "@/components/dashboard/types";
import { PrescriptionCard } from "@/components/dashboard/PrescriptionCard";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type PrescriptionTab = "active" | "history";

interface PrescriptionSummaryCard {
  id: string;
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  iconClassName: string;
}

const summaryCards: PrescriptionSummaryCard[] = [
  {
    id: "active",
    label: "Active Medications",
    value: 3,
    icon: Pill,
    iconClassName: "bg-blue-100 text-blue-600",
  },
  {
    id: "refills",
    label: "Refills Available",
    value: 6,
    icon: RefreshCcw,
    iconClassName: "bg-emerald-100 text-emerald-600",
  },
  {
    id: "expiring",
    label: "Expiring Soon",
    value: 1,
    icon: AlertCircle,
    iconClassName: "bg-amber-100 text-amber-600",
  },
];

const prescriptions: PrescriptionItem[] = [
  {
    id: "rx-1",
    medication: "Sertraline",
    dosage: "50mg",
    schedule: "1 tablet daily",
    instructions: "Take with food. May cause drowsiness.",
    provider: "Dr. Emily Chen",
    prescribedDate: "Dec 15, 2025",
    nextRefillDate: "Jan 15, 2026",
    refillsLeft: 2,
    status: "active",
  },
  {
    id: "rx-2",
    medication: "Alprazolam",
    dosage: "0.5mg",
    schedule: "As needed, max 3x daily",
    instructions: "For anxiety. Do not operate heavy machinery.",
    provider: "Dr. Michael Ross",
    prescribedDate: "Jan 5, 2026",
    nextRefillDate: "Feb 5, 2026",
    refillsLeft: 1,
    status: "active",
  },
  {
    id: "rx-3",
    medication: "Escitalopram",
    dosage: "10mg",
    schedule: "1 tablet daily",
    instructions: "Take with food. May cause drowsiness.",
    provider: "Dr. Sarah Miller",
    prescribedDate: "Aug 10, 2025",
    nextRefillDate: "",
    refillsLeft: 0,
    status: "history",
    startDate: "Aug 10, 2025",
    endDate: "Dec 10, 2025",
  },
];

export default function PrescriptionsPage() {
  const [tab, setTab] = useState<PrescriptionTab>("active");

  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter((item) => item.status === tab);
  }, [tab]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-medium">My Prescriptions</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your medications and refills
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4  lg:grid-cols-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.id} className="px-4 py-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-md",
                    card.iconClassName,
                  )}
                >
                  <Icon className="size-4" />
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{card.label}</p>
                  <p className="text-2xl font-medium leading-none">
                    {card.value}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="inline-flex rounded-full bg-muted p-1">
        {(["active", "history"] as const).map((tabItem) => (
          <button
            key={tabItem}
            onClick={() => setTab(tabItem)}
            className={cn(
              "rounded-full px-5 py-1.5 text-sm capitalize transition-all",
              tabItem === tab
                ? "bg-gradient-dash text-white"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tabItem === "active" ? "Active Prescriptions" : "History"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredPrescriptions.length === 0 ? (
          <Card className="px-4 py-8 text-center text-sm text-muted-foreground">
            No prescriptions available in this tab.
          </Card>
        ) : (
          filteredPrescriptions.map((item) => (
            <PrescriptionCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}
