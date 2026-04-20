"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

export default function TimeStep({
  date,
  selectedTime,
  setSelectedTime,
  provider,
  providerData
}: {
  date: Date | undefined;
  selectedTime: string | null;
  setSelectedTime: (s: string | null) => void;
  provider?: any;
  providerData?: any;
}) {

  const slots: string[] = [];
  if (date && providerData?.availability?.length) {
    const selectedDay = dayjs(date).format("dddd"); // Monday
    const dayAvail = providerData.availability.find(
      (a: any) => a.day.toLowerCase() === selectedDay.toLowerCase()
    );

    if (dayAvail?.slots?.length) {
      dayAvail.slots.forEach((slot: any) => {
        if (slot.startTime) {
          const [hh, mm] = slot.startTime.split(":");

          const d = new Date(date);
          d.setHours(Number(hh), Number(mm), 0, 0);

          slots.push(
            dayjs(d).format("hh:mm A") // better formatting
          );
        }
      });
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
                onClick={() => {
                  sessionStorage.setItem("selectedTime", slot);
                  setSelectedTime(slot);
                }}
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
