"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

export default function TimeStep({
  date,
  selectedTime,
  setSelectedTime,
  provider
}: {
  date: Date | undefined;
  selectedTime: string | null;
  setSelectedTime: (s: string | null) => void;
  provider?: any;
}) {
  const slots: string[] = [];

  if (provider?.availability && provider.availability.length > 0 && date) {
    const dayName = dayjs(date).format("dddd"); // e.g., "Monday"
    const dayAvail = provider.availability.find((a: any) => a.day === dayName);

    if (dayAvail && dayAvail.slots) {
      dayAvail.slots.forEach((s: any) => {
        if (s.startTime) {
          const [hh, mm] = s.startTime.split(":");
          const d = new Date(date);
          d.setHours(parseInt(hh, 10), parseInt(mm || "0", 10), 0, 0);
          slots.push(
            d.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            }),
          );
        }
      });
    }
  } else {
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
  }

  return (
    <div className="w-full">
      <div className="text-sm text-muted-foreground mb-4">
        Select a time slot for {date ? date.toLocaleDateString() : ""}
      </div>

      {slots.length === 0 ? (
        <div className="text-sm text-muted-foreground w-full py-4 text-center">
          No time slots available for this day.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 w-full">
          {slots.map((slot) => {
            const active = selectedTime === slot;
            return (
              <Button
                key={slot}
                variant={active ? undefined : "outline"}
                onClick={() => setSelectedTime(slot)}
                className={`w-full rounded-md py-4 text-sm ${active ? "bg-gradient-dash text-white" : ""
                  }`}
              >
                {slot}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
