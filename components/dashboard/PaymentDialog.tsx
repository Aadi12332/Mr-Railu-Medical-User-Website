import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle2, Lock, ArrowRight } from "lucide-react";
import SuccessDialog from "./SuccessDialog";

export default function PaymentDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        {/* Header */}
        <DialogHeader className="flex items-center relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 h-10 w-10 rounded-full bg-[#eef7f6] text-[#2a9d8f] hover:bg-[#e0f0ef] hover:text-[#21867a]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-semibold text-center w-full text-slate-800">
            Payment Method
          </h2>
        </DialogHeader>

        {/* Payment Form Container */}
        <div className="border border-[#2a9d8f] rounded-2xl p-6 bg-[#f8fbfb]">
          {/* Tabs */}
          <div className="flex gap-3 mb-6">
            <Button
              variant="outline"
              className="border-[#2a9d8f] text-[#2a9d8f] bg-white hover:bg-[#eef7f6] rounded-lg px-6 font-medium"
            >
              Debit Card
            </Button>
            <Button
              variant="ghost"
              className="text-slate-500 bg-white hover:bg-slate-50 rounded-lg px-6 font-medium"
            >
              Credit Card
            </Button>
          </div>

          {/* Radio and Logos */}
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
                  className="font-semibold text-base text-slate-900"
                >
                  Pay with Credit Card
                </Label>
              </div>
            </RadioGroup>
            <div className="flex gap-1.5">
              {/* Card Logos */}
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

          {/* Form Fields */}
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
                  className="bg-white border-slate-200 w-full max-w-[200px] h-11 rounded-xl shadow-sm"
                  defaultValue="***"
                />
                <button className="text-sm text-[#2a9d8f] hover:underline font-medium">
                  What is this?
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center gap-4 px-2">
          <div className="p-2.5 bg-[#eef7f6] rounded-full text-[#2a9d8f] shrink-0">
            <Lock className="h-5 w-5" />
          </div>
          <p className="text-slate-600 text-sm">
            We Protect Your Payment Information Using Encryption To Provide
            Bank-Level Security.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-2">
          <SuccessDialog>
            <Button size="lg" className="bg-gradient-dash">
              Submit <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </SuccessDialog>
        </div>
      </DialogContent>
    </Dialog>
  );
}
