"use client";

import { RefreshCcw, Download, Pill } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PrescriptionItem } from "./types";
import RequestRefillDialog from "./RequestRefillDialog";

const refillBadgeColorMap: Record<string, string> = {
  low: "bg-amber-100 text-amber-700",
  medium: "bg-emerald-100 text-emerald-700",
  none: "bg-slate-100 text-slate-600",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0])
    .join("");
}

function getRefillBadgeClassName(refillsLeft: number) {
  if (refillsLeft <= 0) return refillBadgeColorMap.none;
  if (refillsLeft === 1) return refillBadgeColorMap.low;
  return refillBadgeColorMap.medium;
}

export function PrescriptionCard({ item }: { item: PrescriptionItem }) {
  const isHistory = item.status === "history";

  return (
    <Card className="px-4 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
            <Pill className="size-5" />
          </div>

          <div>
            <h2 className="text-base font-medium">
              {item.medication} {item.dosage}
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {item.schedule}
            </p>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              {!isHistory && (
                <Avatar size="sm" className="size-5">
                  <AvatarFallback className="text-[10px]">
                    {getInitials(item.provider)}
                  </AvatarFallback>
                </Avatar>
              )}
              <span>Prescribed by {item.provider}</span>
            </div>
          </div>
        </div>

        {isHistory ? (
          <Badge className="rounded-full px-2.5 py-1 text-xs font-normal bg-red-100 text-red-600">
            Discontinued
          </Badge>
        ) : (
          <Badge
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-normal",
              getRefillBadgeClassName(item.refillsLeft),
            )}
          >
            {item.refillsLeft > 0
              ? `${item.refillsLeft} refills left`
              : "No refills left"}
          </Badge>
        )}
      </div>

      {!isHistory && (
        <div className="mt-4 rounded-md bg-muted p-3">
          <p className="text-xs font-medium">Instructions:</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {item.instructions}
          </p>
        </div>
      )}

      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        {isHistory ? (
          <>
            <div>
              <p className="text-xs text-muted-foreground">Start Date</p>
              <p className="mt-1 text-sm">
                {item.startDate || item.prescribedDate}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">End Date</p>
              <p className="mt-1 text-sm">{item.endDate || ""}</p>
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="text-xs text-muted-foreground">Prescribed Date</p>
              <p className="mt-1 text-sm">{item.prescribedDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Next Refill Available
              </p>
              <p className="mt-1 text-sm">{item.nextRefillDate}</p>
            </div>
          </>
        )}
      </div>

      {!isHistory && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {/* open refill dialog using same button as trigger */}
          <RequestRefillDialog
            prescription={item}
            trigger={
              <Button className="bg-gradient-dash text-white hover:opacity-90">
                <RefreshCcw className="mr-1.5 size-3.5" />
                Request Refill
              </Button>
            }
          />
          <Button variant="outline">
            <Download className="mr-1.5 size-3.5" />
            Download
          </Button>
        </div>
      )}
    </Card>
  );
}
