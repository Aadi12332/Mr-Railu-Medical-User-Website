"use client";

import React from "react";
import { Provider } from "@/components/dashboard/types";

export default function ConfirmStep({
  provider,
  date,
  selectedTime,
  selectedSession,
  sessionType,
}: {
  provider: any;
  date: Date | undefined;
  selectedTime: string | null;
  selectedSession: any;
  sessionType: string;
}) {
  const data = provider?.sessionTypes?.find(
    (s: any) => s.name === sessionType
  );
  return (
    <div className="w-full">
      <div className="rounded-lg border border-green-200 bg-green-50/60 p-6 mb-6">
        <div className="text-lg font-semibold text-emerald-700 mb-4">
          Booking Summary
        </div>

        <div className="grid grid-cols-2 gap-y-3 text-sm text-muted-foreground">
          <div>Provider:</div>
          <div className="text-right font-medium text-foreground">
            {provider.firstName} {provider.lastName}
          </div>

          <div>Specialties:</div>
          <div className="text-right font-medium text-foreground">
            {provider.specialty}
          </div>

          <div>Date:</div>
          <div className="text-right font-medium text-foreground">
            {date ? date.toLocaleDateString() : ""}
          </div>

          <div>Time:</div>
          <div className="text-right font-medium text-foreground">
            {selectedTime || ""}
          </div>
 <div>Session Name:</div>
          <div className="text-right font-medium text-foreground">
            {data?.name ?? ""}
          </div>
           <div>Session Type:</div>
          <div className="text-right font-medium text-foreground">
            {data?.type ?? ""}
          </div>
          <div>Session Fee:</div>
          <div className="text-right font-medium text-foreground">
            $ {data?.price ?? 0}
          </div>
          
        </div>
      </div>

      <div className="text-sm text-muted-foreground mb-4">
        You&apos;ll receive a confirmation email with the video call link 15
        minutes before your session.
      </div>
    </div>
  );
}
