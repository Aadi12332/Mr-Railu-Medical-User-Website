"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";

export default function DateStep({
  date,
  setDate,
  provider
}: {
  date: Date | undefined;
  setDate: (d: Date | undefined) => void;
  provider: any;
}) {

    const isPastDate =
  date && dayjs(date).isBefore(dayjs(), "day");

  return (
    <div className="flex flex-col items-center w-full">
      <div className="border">
        <Calendar
          mode="single"
          selected={date}
          disabled={{ before: dayjs().startOf("day").toDate() }}
          onSelect={(d) => setDate(d as Date | undefined)}
        />
      </div>
    </div>
  );
}
