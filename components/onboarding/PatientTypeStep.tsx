"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

import newPatientIcon from "@/assets/icons/new-patient.svg";
import continueCareIcon from "@/assets/icons/care-patient.svg";
import export1Img from "@/assets/landing/expert-1.png";

type PatientTypeStepProps = {
  selectedPlan: "new" | "continue" | null;
  onSelectPlan: (plan: "new" | "continue") => void;
};

export default function PatientTypeStep({
  selectedPlan,
  onSelectPlan,
}: PatientTypeStepProps) {
  return (
    <>
      <div className="flex flex-col items-center text-center space-y-1 px-2">
        <Avatar className="size-28 border border-slate-100 bg-white">
          <AvatarFallback className="text-slate-700">MC</AvatarFallback>
          <AvatarImage src={export1Img.src} />
        </Avatar>

        <div className="space-y-1">
          <div className="text-xl font-semibold">Dr. Michael Chichak, MD</div>
          <div className="text-sm text-muted-foreground">Medical Director</div>
        </div>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl">
          Hi, I&apos;m David. I Oversee Treatment Of All Our Patients.
          Let&apos;s Find The Best Medical Provider For You.
        </p>

        <h3 className="mt-4 text-lg font-medium text-slate-900">
          Which Type Of ADHD Care Are You Looking For?
        </h3>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div
          role="button"
          onClick={() => onSelectPlan("new")}
          aria-pressed={selectedPlan === "new"}
          className={`p-2 rounded-xl border transition-shadow cursor-pointer text-center flex flex-col items-center ${
            selectedPlan === "new"
              ? "border-[#4A7C7E] bg-white shadow-sm"
              : "border-[#E6F3F1] bg-[#f7fbfa] hover:shadow-sm"
          }`}
        >
          <Image
            src={newPatientIcon}
            alt="New patient icon"
            className="max-w-28 max-h-28 mb-2"
          />
          <div className="font-semibold text-base">New Patient</div>
          <div className="text-teal-700 mt-1 font-medium">$195</div>
        </div>

        <div
          role="button"
          onClick={() => onSelectPlan("continue")}
          aria-pressed={selectedPlan === "continue"}
          className={`p-2 rounded-xl border transition-shadow cursor-pointer text-center flex flex-col items-center ${
            selectedPlan === "continue"
              ? "border-[#4A7C7E] bg-white shadow-sm"
              : "border-[#E6F3F1] bg-[#f7fbfa] hover:shadow-sm"
          }`}
        >
          <Image
            src={continueCareIcon}
            alt="Continue care patient icon"
            className="max-w-28 max-h-28 mb-2"
          />

          <div className="font-semibold text-base">Continue Care Patient</div>
          <div className="text-teal-700 mt-3 font-medium">$159</div>
        </div>
      </div>
    </>
  );
}
