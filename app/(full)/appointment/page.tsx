"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
import { generateSlotsFromAvailability } from "@/lib/utils";

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
  const [providerAvailability, setProviderAvailability] = useState<any[] | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [mode, setMode] = useState<string>("any_time_today");
  const [slots, setSlots] = useState<any[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  // ─── 1. On mount: restore everything from sessionStorage ───────────────────
  useEffect(() => {
    const stored = sessionStorage.getItem("providerData");
    if (stored) setProviderId(JSON.parse(stored));

    const storedMode = sessionStorage.getItem("appointmentMode");
    if (storedMode) setMode(storedMode);

    const storedDate = sessionStorage.getItem("selectedDate");
    if (storedDate) {
      const [y, m, d] = storedDate.split("-").map(Number);
      setSelectedDate(new Date(y, m - 1, d));
    }

    const storedSlotId = sessionStorage.getItem("selectedSlotId");
    if (storedSlotId) setSelectedSlotId(storedSlotId);
  }, []);

  // ─── 2. Fetch provider availability once we have providerId ────────────────
  useEffect(() => {
    if (!providerId?._id) return;
    const fetchProvider = async () => {
      try {
        const res = await publicPageApi.getProviderById(providerId._id);
        setProviderAvailability(res?.data?.provider?.availability ?? []);
      } catch (e) {
        console.error("Failed to fetch provider", e);
      }
    };
    fetchProvider();
  }, [providerId]);

  // ─── 3. Derive slots whenever mode / selectedDate / availability changes ───
  useEffect(() => {
    if (!providerAvailability) return;

    setSlotsLoading(true);

    let generated: any[] = [];

    if (mode === "any_time_today") {
      generated = generateSlotsFromAvailability(providerAvailability, new Date());
    } else if (mode === "pick_time_range" && selectedDate) {
      generated = generateSlotsFromAvailability(providerAvailability, selectedDate);
    }

    setSlots(generated);
    setSlotsLoading(false);

    // Keep selected slot if it still exists in the new list, otherwise clear it
    setSelectedSlotId((prev) => {
      if (!prev) return null;
      const stillValid = generated.some((s) => s.id === prev);
      if (!stillValid) {
        sessionStorage.removeItem("selectedSlotId");
        return null;
      }
      return prev;
    });
  }, [mode, selectedDate, providerAvailability]);

  // ─── Persist mode ──────────────────────────────────────────────────────────
  useEffect(() => {
    sessionStorage.setItem("appointmentMode", mode);
  }, [mode]);

  // ─── Persist selected date ─────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedDate) return;
    const str = [
      selectedDate.getFullYear(),
      String(selectedDate.getMonth() + 1).padStart(2, "0"),
      String(selectedDate.getDate()).padStart(2, "0"),
    ].join("-");
    sessionStorage.setItem("selectedDate", str);
  }, [selectedDate]);

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const handleModeChange = (key: string) => {
    setMode(key);
    // DO NOT clear selectedSlotId here — the useEffect validation handles it
  };

  const handleSlotClick = (slot: any) => {
    setSelectedSlotId(slot.id);
    sessionStorage.setItem("selectedSlotId", slot.id);
    sessionStorage.setItem("selectedSlot", JSON.stringify(slot));
  };

  const handleNext = () => {
    let selectedSlot: any;

    if (mode === "any_time_today") {
      // Use first available slot for today (deterministic)
      selectedSlot = slots[0];
    } else {
      selectedSlot = slots.find((s) => s.id === selectedSlotId);
    }

    if (!selectedSlot) {
      alert("Please select a slot");
      return;
    }

    sessionStorage.setItem("selectedSlot", JSON.stringify(selectedSlot));
    router.push("/appointment/confirm");
  };

  // ─── Loading skeleton ──────────────────────────────────────────────────────
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

  // ─── Main render ───────────────────────────────────────────────────────────
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
        {/* Title */}
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-2xl font-semibold text-[#2F6F6A] text-center">
            {data?.title ?? "When Would You Like To Have An Appointment"}
          </h1>
        </div>

        {/* Mode selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modes.map((m: any) => (
            <div
              key={m.key}
              role="button"
              onClick={() => handleModeChange(m.key)}
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
              <div className="font-semibold text-base text-primary">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Date picker — only for pick_time_range */}
        {mode === "pick_time_range" && (
          <DateStep date={selectedDate} setDate={setSelectedDate} provider={null} />
        )}

        {/* Slots */}
        <div className="space-y-3">
          {mode === "pick_time_range" && !selectedDate ? (
            <p className="text-center text-sm text-gray-500 py-6">
              Please select a date to see available slots
            </p>
          ) : slotsLoading ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4A7C7E]" />
            </div>
          ) : slots.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-6">
              No slots available{mode === "any_time_today" ? " for today" : " on this date"}
            </p>
          ) : (
            <div className="flex gap-3 flex-wrap justify-center mt-3">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => handleSlotClick(slot)}
                  className={`cursor-pointer px-4 py-3 bg-[#F4F9F8] rounded-md text-sm text-slate-700 text-center transition-all ${
                    selectedSlotId === slot.id
                      ? "ring-2 ring-[#4A7C7E] bg-white font-medium"
                      : "hover:bg-[#e8f4f2]"
                  }`}
                >
                  {slot.start}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Next button */}
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