"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const paymentFormSchema = z.object({
  cardNumber: z.string().min(12, "Enter a valid card number"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "Use MM/YY format"),
  securityCode: z.string().min(3, "Enter a valid CVV"),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

export default function AppointmentPaymentPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("debit");

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardNumber: "1234 5678 9101 3456",
      expiryDate: "MM/YY",
      securityCode: "***",
    },
  });

  function onSubmit() {
    // navigate to confirmation page after successful payment
    router.push("/appointment/payment/confirmation");
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        {/* header */}
        <CardHeader className="flex items-center relative mb-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute  h-10 w-10 rounded-full bg-[#eef7f6] text-primary hover:bg-[#e0f0ef]"
            onClick={() => window.history.back()}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold text-center w-full text-slate-800">
            Payment Method
          </h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="border border-[#2a9d8f] rounded-2xl p-6 bg-[#f8fbfb] space-y-5">
              {/* tabs */}
              <div className="flex gap-3 mb-6">
                <Button
                  variant={selectedTab === "debit" ? "outline" : "ghost"}
                  className={
                    selectedTab === "debit"
                      ? "border-[#2a9d8f] text-[#2a9d8f] bg-white hover:bg-[#eef7f6] rounded-lg px-6 font-medium"
                      : "text-slate-500 bg-white hover:bg-slate-50 rounded-lg px-6 font-medium"
                  }
                  onClick={() => setSelectedTab("debit")}
                >
                  Debit Card
                </Button>
                <Button
                  variant={selectedTab === "credit" ? "outline" : "ghost"}
                  className={
                    selectedTab === "credit"
                      ? "border-[#2a9d8f] text-[#2a9d8f] bg-white hover:bg-[#eef7f6] rounded-lg px-6 font-medium"
                      : "text-slate-500 bg-white hover:bg-slate-50 rounded-lg px-6 font-medium"
                  }
                  onClick={() => setSelectedTab("credit")}
                >
                  Credit Card
                </Button>
              </div>

              {/* radio + logos */}
              <div className="flex items-center justify-between mb-6">
                <RadioGroup defaultValue="credit" className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="credit"
                      id="credit"
                      className="text-[#2a9d8f] border-[#2a9d8f] fill-[#2a9d8f]"
                    />
                    <Label
                      htmlFor="credit"
                      className="font-semibold text-sm text-slate-900"
                    >
                      Pay with Credit Card
                    </Label>
                  </div>
                </RadioGroup>
                <div className="flex gap-1.5">
                  <div className="h-7 w-11 bg-white border border-slate-200 rounded flex items-center justify-center text-[9px] font-bold text-blue-900">
                    VISA
                  </div>
                  <div className="h-7 w-11 bg-white border border-slate-200 rounded flex items-center justify-center text-[7px] font-bold text-orange-500">
                    DISCOVER
                  </div>
                  <div className="h-7 w-11 bg-white border border-slate-200 rounded flex items-center justify-center">
                    <div className="flex -space-x-1.5">
                      <div className="h-3.5 w-3.5 rounded-full bg-red-500 mix-blend-multiply"></div>
                      <div className="h-3.5 w-3.5 rounded-full bg-blue-500 mix-blend-multiply"></div>
                    </div>
                  </div>
                  <div className="h-7 w-11 bg-white border border-slate-200 rounded flex items-center justify-center">
                    <div className="flex -space-x-1.5">
                      <div className="h-3.5 w-3.5 rounded-full bg-red-500 mix-blend-multiply"></div>
                      <div className="h-3.5 w-3.5 rounded-full bg-yellow-500 mix-blend-multiply"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* form fields */}
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2 sm:col-span-1 space-y-2">
                    <Label className="text-slate-600 font-medium">
                      Card Number
                    </Label>
                    <div className="relative">
                      <Input
                        placeholder="1234 5678 9101 3456"
                        className="bg-white border-slate-200 pr-10 h-11 rounded-xl shadow-sm"
                        defaultValue="1234 5678 9101 3456"
                        {...form.register("cardNumber")}
                      />
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2a9d8f]" />
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1 space-y-2">
                    <Label className="text-slate-600 font-medium">
                      Expiration Date
                    </Label>
                    <Input
                      placeholder="MM/YY"
                      className="bg-white border-slate-200 h-11 rounded-xl shadow-sm"
                      defaultValue="MM/YY"
                      {...form.register("expiryDate")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-600 font-medium">
                    Card Security Code
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="password"
                      placeholder="***"
                      className="bg-white border-slate-200 w-full max-w-50 h-11 rounded-xl shadow-sm"
                      defaultValue="***"
                      {...form.register("securityCode")}
                    />
                    <button className="text-sm text-[#2a9d8f] hover:underline font-medium">
                      What is this?
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* security notice */}
            <div className="flex items-center gap-4 px-2 mt-5">
              <div className="p-2 bg-[#eef7f6] rounded-full text-primary shrink-0">
                <Lock className="size-4 " />
              </div>
              <p className="text-slate-600 text-sm">
                We Protect Your Payment Information Using Encryption To Provide
                Bank-Level Security.
              </p>
            </div>

            {/* footer */}
            <div className="flex justify-end mt-2">
              <Button
                size="lg"
                className="bg-gradient-primary"
                onClick={() => router.push("/appointment/payment/confirmation")}
              >
                Submit <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
