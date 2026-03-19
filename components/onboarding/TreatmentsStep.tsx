"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type TreatmentsStepProps = {
  selectedTreatments: string[];
  onToggleTreatment: (treatment: string) => void;
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
}: TreatmentsStepProps) {
  return (
    <div>
      <h1 className="text-xl font-semibold text-[#4A7C7E] text-center mb-5">
        What Do You Need Help With Today?
      </h1>

      <div className="max-h-64 rounded-md border border-gray-100 overflow-y-auto">
        <div className="space-y-3 p-2">
          {treatmentOptions.map((treatment) => (
            <div
              key={treatment}
              className={`flex items-center space-x-3 p-3 border rounded-lg transition-colors cursor-pointer ${
                selectedTreatments.includes(treatment)
                  ? "border-[#4A7C7E] bg-[#f6fbfa]"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => onToggleTreatment(treatment)}
            >
              <Checkbox
                id={treatment}
                checked={selectedTreatments.includes(treatment)}
                onCheckedChange={() => onToggleTreatment(treatment)}
                className="border-gray-300"
              />
              <Label
                htmlFor={treatment}
                className="flex-1 cursor-pointer font-normal"
              >
                {treatment}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
