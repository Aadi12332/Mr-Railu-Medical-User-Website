"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen } from "lucide-react";
import type { Appointment } from "./AppointmentCard";
import { patientApi } from "@/api/patient.api";

interface Slot {
  id: string;
  date: string;
  rawDate: string;
  start: string;
  end: string;
  time24: string;
}

interface RescheduleAppointmentDialogProps {
  appointment: Appointment;
  trigger?: React.ReactNode;
}

export default function RescheduleAppointmentDialog({
  appointment,
  trigger,
}: RescheduleAppointmentDialogProps) {
  const router = useRouter();
const handleCancel = async () => {
  try {
    const res = await patientApi.cancelAppointment(appointment.id);

    router.refresh();
  } catch (error) {
    console.error(error);
  }
};
  const generateSlots = () => {
    const slots: Slot[] = [];
    const today = new Date();

    for (let d = 0; d < 5; d++) {
      const date = new Date();
      date.setDate(today.getDate() + d);

      const rawDate = date.toISOString().split("T")[0];

      for (let h = 9; h < 17; h++) {
        for (let m = 0; m < 60; m += 20) {
          const startDate = new Date(date);
          startDate.setHours(h, m);

          const endDate = new Date(startDate);
          endDate.setMinutes(startDate.getMinutes() + 20);

          const format12 = (dt: Date) =>
            dt.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

          const format24 = (dt: Date) =>
            dt.toTimeString().slice(0, 5);

          slots.push({
            id: `${rawDate}-${h}-${m}`,
            date: date.toDateString().slice(0, 10),
            rawDate,
            start: format12(startDate),
            end: format12(endDate),
            time24: format24(startDate),
          });
        }
      }
    }

    return slots;
  };

  const [slots, setSlots] = useState<Slot[]>(generateSlots());
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const removeSlot = (id: string) =>
    setSlots((s) => s.filter((x) => x.id !== id));

  const handleSchedule = async () => {
    if (!selectedSlot) return;

    const payload = {
      date: selectedSlot.rawDate,
      time: selectedSlot.time24,
    };

    try {
      const res = await patientApi.getRescheduleById(
        appointment.id,
        payload
      );
      console.log("Reschedule Payload:", payload);
      console.log("API Response:", res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-emerald-500 text-emerald-500"
          >
            <SquarePen className="size-4 mr-1" /> Reschedule
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="w-full max-w-sm sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-semibold">
            Reschedule Appointment
          </DialogTitle>
          <DialogDescription>
            Select a new date and time for your appointment
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="p-4 bg-slate-50 rounded-md">
            <div className="text-xs font-medium text-muted-foreground">
              Current Appointment
            </div>
            <div className="mt-1 text-sm">
              {appointment.date} at {appointment.time}
            </div>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {slots.map((slot) => (
              <div
                key={slot.id}
                onClick={() => setSelectedSlot(slot)}
                className={`flex flex-col md:flex-row md:items-center items-center gap-4 cursor-pointer ${
                  selectedSlot?.id === slot.id
                    ? "border border-emerald-500 rounded-md"
                    : ""
                }`}
              >
                <div className="px-4 py-3 bg-slate-50 rounded-md text-sm text-slate-700 w-28 text-left">
                  {slot.date}
                </div>

                <div className="flex items-center gap-3 flex-1">
                  <div className="px-4 py-3 bg-slate-50 rounded-md text-sm text-slate-700 w-32 text-center">
                    {slot.start}
                  </div>

                  <div className="text-slate-400 font-semibold">—</div>

                  <div className="px-4 py-3 bg-slate-50 rounded-md text-sm text-slate-700 w-32 text-center">
                    {slot.end}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSlot(slot.id);
                  }}
                  className="bg-slate-50 py-3!"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            You&apos;ll be redirected to select a new date and time from
            available slots.
          </p>
        </div>

        <DialogFooter className="border-0 bg-transparent">
          <DialogClose asChild>
            <Button variant="outline" className="mr-2">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="bg-gradient-dash"
            onClick={handleSchedule}
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}