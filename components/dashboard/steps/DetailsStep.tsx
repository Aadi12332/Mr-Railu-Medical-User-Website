"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function DetailsStep({
  sessionType,
  setSessionType,
  reason,
  setReason,
  provider,
}: {
  sessionType: string;
  setSessionType: (v: string) => void;
  reason: string;
  setReason: (r: string) => void;
  provider: any;
}) {
  return (
    <div className="">
      <div className="mb-4">
        <Label className="block mb-2">Session Type</Label>
        <Select value={sessionType} onValueChange={(v) => setSessionType(v)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select session type" />
          </SelectTrigger>

          <SelectContent>
            {provider?.sessionTypes?.map((s: any) => (
              <SelectItem key={s._id} value={s._id} >
                {s.name} {s.price ? `- $${s.price}` : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="block mb-2">Reason for Visit (Optional)</Label>
        <Textarea
          placeholder="Briefly describe what you'd like to discuss..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
    </div>
  );
}
