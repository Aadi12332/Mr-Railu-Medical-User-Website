import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

import checkCircleImg from "@/assets/check-circle.png";

export default function SuccessDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        {/* Header */}
        <div className="flex items-center mb-2 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-0 h-10 w-10 rounded-full bg-[#eef7f6] text-[#2a9d8f] hover:bg-[#e0f0ef] hover:text-[#21867a]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <div className="relative size-40">
            <Image
              src={checkCircleImg}
              alt="Success Checkmark"
              fill
              className="object-contain"
            />
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-4 leading-tight">
            Your Appointment Has
            <br />
            Been Confirmed
          </h2>

          <p className="text-slate-600 text-sm mb-4">
            Your Appointment Has Been
            <br />
            Successfully Scheduled.
          </p>

          <Button size="lg" className="w-full bg-gradient-dash">
            View Your Appointment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
