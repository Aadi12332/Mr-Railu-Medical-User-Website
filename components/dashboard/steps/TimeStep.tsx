"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function TimeStep({
  date,
  selectedTime,
  setSelectedTime,
}: {
  date: Date | undefined;
  selectedTime: string | null;
  setSelectedTime: (s: string | null) => void;
}) {
  const slots: string[] = [];
  for (let h = 9; h <= 17; h++) {
    const d = date ? new Date(date) : new Date();
    d.setHours(h, 0, 0, 0);
    slots.push(
      d.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    );
  }

  return (
    <div className="w-full">
      <div className="text-sm text-muted-foreground mb-4">
        Select a time slot for {date ? date.toLocaleDateString() : ""}
      </div>

      <div className="grid grid-cols-3 gap-4 w-full">
        {slots.map((slot) => {
          const active = selectedTime === slot;
          return (
            <Button
              key={slot}
              variant={active ? undefined : "outline"}
              onClick={() => setSelectedTime(slot)}
              className={`w-full rounded-md py-4 text-sm ${
                active ? "bg-gradient-dash text-white" : ""
              }`}
            >
              {slot}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
