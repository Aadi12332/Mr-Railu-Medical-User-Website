"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Check } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import export1Img from "@/assets/landing/expert-1.png";

export default function ConfirmAppointmentPage() {
  const router = useRouter();

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
        <div className="flex flex-col items-center text-center space-y-1">
          <h1 className="text-2xl font-semibold text-[#2F6F6A] text-center">
            Complete Your Payment
          </h1>
          <p className="text-sm text-slate-500">
            Secure Your Appointment By Completing The Payment
          </p>
        </div>

        {/* Appointment summary */}
        <div className="rounded-md border overflow-hidden">
          <div className="bg-[#F4FBF9] px-4 py-3 font-semibold text-slate-700">
            Appointment Summary
          </div>

          <div className="p-4">
            <div className="flex gap-4">
              <Avatar className="size-12 rounded-none">
                <AvatarFallback>AS</AvatarFallback>
                <AvatarImage src={export1Img.src} />
              </Avatar>

              <div className="flex-1">
                <div className="font-semibold text-lg text-slate-800">
                  Dr. Arvind Shah
                </div>
                <div className="text-sm text-slate-500">Cardiologist</div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-500" />
                <div>28 Apr 2024</div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-500" />
                <div>11:00 AM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Patient */}
        <div>
          <div className="bg-[#F4FBF9] px-4 py-3 font-semibold text-slate-700 rounded-t-md">
            Patient
          </div>
          <div className="border border-t-0 rounded-b-md p-4 text-slate-700">
            Rajesh Patel
          </div>
        </div>

        {/* Payment details */}
        <div>
          <div className="bg-[#F4FBF9] px-4 py-3 font-semibold text-slate-700 rounded-t-md">
            Payment Details
          </div>

          <div className="border border-t-0 rounded-b-md p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className=" p-0.5 rounded-md bg-gradient-primary">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm text-slate-700">Consultation Fee</div>
              </div>

              <div className="font-semibold">₹ 800</div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            className="h-12 w-44 bg-gradient-primary"
            onClick={() => router.push("/appointment")}
          >
            Edit Appointment
          </Button>

          <Button
            size="lg"
            className="h-12 w-44 bg-gradient-primary text-white hover:opacity-95 ml-auto"
            onClick={() => router.push("/appointment/payment")}
          >
            Confirm
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
