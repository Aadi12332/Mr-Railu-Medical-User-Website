"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import DateStep from "@/components/dashboard/steps/DateStep";
import dateRangeIcon from "@/assets/icons/date-range.svg";
import dateTodayIcon from "@/assets/icons/date-today.svg";
import Image from "next/image";
import { useFetch } from "@/hooks/useFetch";
import { publicPageApi } from "@/api/publicpage.api";
import { generateSlotsFromAvailability, generateTodaySlots, getRandomSlot } from "@/lib/utils";
import { patientApi } from "@/api/patient.api";
import dayjs from "dayjs";

export default function AppointmentPage() {
  const {
    data: bookingFlow,
    loading: bookingFlowLoading,
    error: bookingFlowError,
  } = useFetch(publicPageApi.getBookingFlow) as any;
  const data = bookingFlow?.appointmentStep ?? {};
  const modes = data?.modes || [];
  const router = useRouter();
  const [providerId, setProviderId] = useState<any>("");
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const [allSlots, setAllSlots] = useState<any[]>([]);
const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [mode, setMode] = useState<string>("any_time_today");
  const initialSlots = [
    { id: 1, date: "Today", start: "10:00 AM", end: "10:20 AM" },
    { id: 2, date: "Sep 19", start: "11:30 AM", end: "11:50 AM" },
    { id: 3, date: "Sep 20", start: "01:30 PM", end: "01:50 PM" },
    { id: 4, date: "Sep 25", start: "03:30 PM", end: "03:50 PM" },
  ];

  const [slots, setSlots] = useState(initialSlots);
const [providerData, setProviderData] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("providerData");
      setProviderId(stored ? JSON.parse(stored || "") : "");
    }
  }, []);

  const handleMyProviders =async () => {
    try {

    const awaitData = await publicPageApi.getProviderById(providerId?._id || "");
    setProviderData(awaitData?.data?.provider?.availability);
    } catch (error) {
    }
  }
  console.log({providerData})
useEffect(() => {
 handleMyProviders()
}, []);
useEffect(() => {
  if (!providerData) return;

  let generatedSlots: any[] = [];

  if (mode === "any_time_today") {
    const today = new Date();

    generatedSlots = generateSlotsFromAvailability(
      providerData,
      today
    );

    // ❗ optional: past time remove (recommended)
    generatedSlots = generatedSlots.filter((slot) =>
      dayjs(`${slot.date} ${slot.start}`, "YYYY-MM-DD hh:mm A").isAfter(dayjs())
    );

  } else if (mode === "pick_time_range" && selectedDate) {
    generatedSlots = generateSlotsFromAvailability(
      providerData,
      selectedDate
    );
  }

  setSlots(generatedSlots);
}, [mode, selectedDate, providerData]);
  const handleNext = () => {
    let selectedSlot;

    if (mode === "any_time_today") {
      selectedSlot = getRandomSlot();
    } else {
      selectedSlot = slots.find((s) => s.id === selectedSlotId);
    }

    if (!selectedSlot) {
      alert("Please select a slot");
      return;
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedSlot", JSON.stringify(selectedSlot));
    }

    router.push("/appointment/confirm");
  };

  useEffect(() => {
    if (bookingFlow?.slots) {
      setAllSlots(bookingFlow.slots);
    }
  }, [bookingFlow]);

  if (bookingFlowLoading) {
    return (
      <Card className="shadow-lg gap-0 max-w-lg mx-auto w-full p-6">
        <Skeleton className="h-8 w-3/4 mx-auto mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
        <Skeleton className="h-12 w-36 mt-8 ml-auto" />
      </Card>
    );
  }

  if (bookingFlowError) {
    return (
      <Card className="shadow-lg gap-0 max-w-lg mx-auto w-full p-8 text-center text-red-500">
        <p>Something went wrong loading data. Please try again.</p>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg gap-0 max-w-lg mx-auto">
      <CardHeader className="border-b-0">
        <Button
          variant="ghost"
          size="icon-sm"
          className="-ml-2"
          onClick={() => typeof window !== "undefined" && window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 text-[#4A7C7E]" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-2xl font-semibold text-[#2F6F6A] text-center">
            {data?.title ?? "When Would You Like To Have An Appointment"}
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modes.map((m: any) => (
            <div
              key={m.key}
              role="button"
              onClick={() => setMode(m.key)}
              className={`p-6 rounded-xl border transition-colors cursor-pointer text-center flex flex-col items-center ${
                mode === m.key
                  ? "border-[#4A7C7E] bg-white shadow-sm"
                  : "border-[#E6F3F1] bg-[#f7fbfa] hover:shadow-sm"
              }`}
            >
              <Image
                src={m.key === "any_time_today" ? dateTodayIcon : dateRangeIcon}
                alt={m.label}
                className="mb-3"
              />

              <div className="font-semibold text-base text-primary">
                {m.label}
              </div>
            </div>
          ))}
        </div>

<div className="space-y-3">

{mode === "pick_time_range" && (
  <DateStep
    date={selectedDate}
    setDate={setSelectedDate}
    provider={null}
  />
)}

{mode === "pick_time_range" && !selectedDate ? (
  <div className="text-center text-sm text-gray-500 py-6">
    Please select a date
  </div>
) : slots.length === 0 ? (
  <div className="text-center text-sm text-gray-500 py-6">
    No slots available
  </div>
) : (
  <div className="flex gap-3 flex-wrap">
    {slots.map((slot) => (
      <div
        key={slot.id}
        onClick={() => setSelectedSlotId(slot.id)}
        className={`flex flex-row items-center gap-4 cursor-pointer ${
          selectedSlotId === slot.id ? "ring-2 ring-[#4A7C7E]" : ""
        }`}
      >
     
        <div className="">
          <div className="px-4 py-3 bg-[#F4F9F8] rounded-md text-sm text-slate-700 flex-1 text-center">
            {slot.start}
          </div>

          {/* <div className="text-slate-400 font-semibold">—</div> */}

          {/* <div className="px-4 py-3 bg-[#F4F9F8] rounded-md text-sm text-slate-700 flex-1 text-center">
            {slot.end}
          </div> */}
        </div>
      </div>
    ))}
  </div>
)}

</div>

        <div className="flex justify-end">
          <Button
            onClick={handleNext}
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
