"use client";

import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Provider } from "@/components/dashboard/types";

export default function TherapistStep({ provider }: { provider: any }) {
  return (
    <div className="">
      <div className="flex items-center gap-4 bg-accent rounded-lg p-2">
        <Avatar className="size-16 border border-slate-100 bg-white shadow-sm">
          <AvatarFallback>{provider.firstName ? provider.firstName?.[0] : ""}{provider.lastName ? provider.lastName?.[0] : ""}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="text-sm font-semibold">{provider.firstName} {provider.lastName}</div>
          <div className="text-xs text-muted-foreground">
            {provider.specialty}
          </div>

          <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="size-4 text-amber-400 fill-current" />
              <span className="font-semibold text-sm">{provider.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full flex items-center justify-between text-sm text-muted-foreground">
        <div className="space-y-1">
          <div className="text-start">Experience</div>
          <div className="text-start">Specialties</div>

          {provider?.sessionTypes?.map((s: any) => (
            <div key={s._id} className="text-start">{s.name}</div>
          ))}
        </div>

        <div className="text-right space-y-1">
          <div className="font-medium">
            {provider?.experience ? `${provider.experience} years` : "-"}
          </div>
          <div className="font-medium">{provider?.specialty ?? "Specialist"}</div>

          {provider?.sessionTypes?.map((s: any) => (
            <div key={s._id} className="font-medium text-end">
              ${s?.fee ?? "N/A"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
