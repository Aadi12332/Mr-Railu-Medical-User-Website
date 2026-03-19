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

interface Slot {
  id: string;
  date: string;
  start: string;
  end: string;
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
  const initialSlots: Slot[] = [
    { id: "1", date: "Today", start: "10:00 AM", end: "12:00 PM" },
    { id: "2", date: "Sep 19", start: "11:30 AM", end: "1:30 PM" },
    { id: "3", date: "Sep 20", start: "10:30 AM", end: "4:30 PM" },
    { id: "4", date: "Sep 25", start: "9:30 AM", end: "12:30 PM" },
  ];

  const [slots, setSlots] = useState<Slot[]>(initialSlots);

  const removeSlot = (id: string) =>
    setSlots((s) => s.filter((x) => x.id !== id));

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
          {/* current appointment */}
          <div className="p-4 bg-slate-50 rounded-md">
            <div className="text-xs font-medium text-muted-foreground">
              Current Appointment
            </div>
            <div className="mt-1 text-sm">
              {appointment.date} at {appointment.time}
            </div>
          </div>

          {/* slot list */}
          <div className="space-y-3">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className="flex flex-col md:flex-row md:items-center items-center gap-4"
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
                  onClick={() => removeSlot(slot.id)}
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
            onClick={() => {
              router.push("/appointment");
            }}
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
