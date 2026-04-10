"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type TreatmentsStepProps = {
  selectedTreatments: string[];
  onToggleTreatment: (treatment: string) => void;
  bookingFlow: any;
};

const treatmentOptions = [
  "ADHD / ADD Treatment",
  "Anxiety Treatment",
  "Depression Treatment",
  "Insomnia Treatment",
  "Weight Loss",
  "Emotional Support Animal Letter",
  "OCD Treatment",
];

export default function TreatmentsStep({
  selectedTreatments,
  onToggleTreatment,
  bookingFlow
}: TreatmentsStepProps) {
  const treatmentOptions = bookingFlow?.options || [];
  return (
    <div>
      <h1 className="text-xl font-semibold text-[#4A7C7E] text-center mb-5">
        {bookingFlow?.title ?? ""}
      </h1>

      <div className="max-h-64 rounded-md border border-gray-100 overflow-y-auto">
        <div className="space-y-3 p-2">
          {treatmentOptions.map((treatment: any) => (
            <div
              key={treatment.slug}
              className={`flex items-center space-x-3 p-3 border rounded-lg transition-colors cursor-pointer ${selectedTreatments.includes(treatment.slug)
                ? "border-[#4A7C7E] bg-[#f6fbfa]"
                : "border-gray-200 hover:bg-gray-50"
                }`}
              onClick={() => onToggleTreatment(treatment.slug)}
            >
              <Checkbox
                id={treatment.slug}
                checked={selectedTreatments.includes(treatment.slug)}
                onCheckedChange={() => onToggleTreatment(treatment.slug)}
                className="border-gray-300"
              />

              <Label
                htmlFor={treatment.slug}
                className="flex-1 cursor-pointer font-normal"
              >
                {treatment.label}
              </Label>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
