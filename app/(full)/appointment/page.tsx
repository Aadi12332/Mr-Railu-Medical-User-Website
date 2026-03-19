"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import dateRangeIcon from "@/assets/icons/date-range.svg";
import dateTodayIcon from "@/assets/icons/date-today.svg";
import Image from "next/image";

export default function AppointmentPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"any" | "range">("any");

  const initialSlots = [
    { id: 1, date: "Today", start: "10:00 AM", end: "12:00 PM" },
    { id: 2, date: "Sep 19", start: "11:30 AM", end: "1:30 PM" },
    { id: 3, date: "Sep 20", start: "10:30 AM", end: "4:30 PM" },
    { id: 4, date: "Sep 25", start: "9:30 AM", end: "12:30 PM" },
  ];

  const [slots, setSlots] = useState(initialSlots);

  const removeSlot = (id: number) =>
    setSlots((s) => s.filter((x) => x.id !== id));

  return (
    <Card className="shadow-lg gap-0 max-w-lg mx-auto">
      <CardHeader className="border-b-0">
        <Button
          variant="ghost"
          size="icon-sm"
          className="-ml-2"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 text-[#4A7C7E]" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-2xl font-semibold text-[#2F6F6A] text-center">
            When Would You Like To Have An Appointment?
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            role="button"
            onClick={() => setMode("any")}
            className={`p-6 rounded-xl border transition-colors cursor-pointer text-center flex flex-col items-center ${
              mode === "any"
                ? "border-[#4A7C7E] bg-white shadow-sm"
                : "border-[#E6F3F1] bg-[#f7fbfa] hover:shadow-sm"
            }`}
          >
            <Image src={dateTodayIcon} alt="Any Time Today" className="mb-3" />
            <div className="font-semibold text-base text-primary">
              Any Time Today
            </div>
          </div>

          <div
            role="button"
            onClick={() => setMode("range")}
            className={`p-6 rounded-xl border transition-colors cursor-pointer text-center flex flex-col items-center ${
              mode === "range"
                ? "border-[#4A7C7E] bg-white shadow-sm"
                : "border-[#E6F3F1] bg-[#f7fbfa] hover:shadow-sm"
            }`}
          >
            <Image
              src={dateRangeIcon}
              alt="Pick A Time Range"
              className="mb-3"
            />
            <div className="font-semibold text-base">Pick A Time Range</div>
          </div>
        </div>

        <div className="space-y-3">
          {slots.map((slot) => (
            <div key={slot.id} className="flex items-center gap-4 ">
              <div className="px-4 py-3 bg-[#F4F9F8] rounded-md text-sm text-slate-700 w-28 text-left">
                {slot.date}
              </div>

              <div className="flex items-center gap-3 flex-1">
                <div className="px-4 py-3 bg-[#F4F9F8] rounded-md text-sm text-slate-700 w-32 text-center">
                  {slot.start}
                </div>

                <div className="text-slate-400 font-semibold">—</div>

                <div className="px-4 py-3 bg-[#F4F9F8] rounded-md text-sm text-slate-700 w-32 text-center">
                  {slot.end}
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSlot(slot.id)}
                className="bg-[#F4F9F8] py-3!"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => router.push("/appointment/confirm")}
            size="lg"
            className="h-12 w-36 bg-gradient-primary text-white hover:opacity-95"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
