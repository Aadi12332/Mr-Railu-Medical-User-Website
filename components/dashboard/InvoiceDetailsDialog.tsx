"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CheckCircle, DownloadIcon } from "lucide-react";
import { PaymentItem } from "./PaymentItemCard";

interface InvoiceDetailsDialogProps {
  item: PaymentItem;
  trigger?: React.ReactNode;
}

export default function InvoiceDetailsDialog({
  item,
  trigger,
}: InvoiceDetailsDialogProps) {
  const [open, setOpen] = useState(false);

  // fallbacks for missing data
  const billName = item.billToName || "";
  const billEmail = item.billToEmail || "";
  const invoiceDate = item.invoiceDate || item.date;
  const paidDate = item.paidDate || item.invoiceDate || item.date;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" variant="outline">
            View
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-semibold">Invoice Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* header info: company + invoice */}
          <div className="flex justify-between">
            <div className="space-y-1">
              <p className="font-medium">MindCare Tele-health</p>
              <p className="text-sm text-muted-foreground">
                123 Healthcare Ave
              </p>
              <p className="text-sm text-muted-foreground">
                San Francisco, CA 94102
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Invoice</p>
              <p className="font-medium">{item.invoice}</p>
              <p className="text-sm text-muted-foreground">{invoiceDate}</p>
            </div>
          </div>

          <hr />

          {/* bill to */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Bill To</p>
            <p className="font-medium">{billName}</p>
            <p className="text-sm text-muted-foreground">{billEmail}</p>
          </div>

          {/* line items table */}
          <div className="border rounded-md overflow-hidden p-3">
            <div className="flex border-b pb-2 font-semibold">
              <div className="flex-1">Description</div>
              <div className="w-24 text-right">Amount</div>
            </div>
            <div className="flex px-4 py-2">
              <div className="flex-1">{item.description}</div>
              <div className="w-24 text-right">${item.amount}</div>
            </div>
            <div className="flex px-4 py-2 font-semibold border-t-2 border-gray-500">
              <div className="flex-1">Total</div>
              <div className="w-24 text-right">${item.amount}</div>
            </div>
          </div>

          {/* payment status */}
          {item.status === "Paid" && (
            <div className="flex items-start gap-2 bg-[#F0FDF4] border border-[#B9F8CF] p-4 rounded-lg">
              <CheckCircle className="size-5 text-green-600" />
              <div>
                <p className="font-medium text-emerald-700">Payment Received</p>
                <p className="text-sm text-green-600">
                  Paid on {paidDate}
                  {item.method && ` via ${item.method}`}
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="border-t-0 bg-white">
          <Button variant="outline" size="lg">
            <DownloadIcon className="size-4 mr-1" /> Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
