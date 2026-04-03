"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";

export default function DateStep({
  date,
  setDate,
  provider
}: {
  date: Date | undefined;
  setDate: (d: Date | undefined) => void;
  provider: any;
}) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="border">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => setDate(d as Date | undefined)}
        />
      </div>
    </div>
  );
}
