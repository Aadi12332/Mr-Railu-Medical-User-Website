"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle, DownloadIcon } from "lucide-react";
import { dashboardApi } from "@/api/dashboard.service";
import dayjs from "dayjs";

export default function InvoiceDetailsDialog({ item, trigger }: any) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(item);
  const [loading, setLoading] = useState(false);

  const invoiceRef = useRef<HTMLDivElement>(null);

  const fetchPayment = async () => {
    try {
      setLoading(true);

      const res = await dashboardApi.getPaymentById("patient", item.id);

      const payment = res?.data?.payment;

      setData({
        ...item,
        description: `Session with Dr. ${
          payment?.appointmentId?.providerId?.firstName || ""
        } ${payment?.appointmentId?.providerId?.lastName || ""}`,
        amount: payment?.amount / 100,
        date: dayjs(payment?.createdAt).format("MMMM D, YYYY"),
        status: payment?.status === "succeeded" ? "Paid" : "Scheduled",
        invoice: payment?.invoiceNumber || "N/A",
        method: payment?.cardBrand
          ? `${payment?.cardBrand} **** ${payment?.cardLast4}`
          : "Mastercard **** 5555",
        billToName: "Patient",
        billToEmail: "example@email.com",
      });
    } catch (err) {
      console.error("Payment details error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!invoiceRef.current) return;

    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;

      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      let pdfWidth = availableWidth;
      let pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      if (pdfHeight > availableHeight) {
        pdfHeight = availableHeight;
        pdfWidth = (canvas.width * pdfHeight) / canvas.height;
      }

      const x = (pageWidth - pdfWidth) / 2;
      const y = margin;

      pdf.addImage(imgData, "PNG", x, y, pdfWidth, pdfHeight);

      pdf.save(`invoice-${data.invoice || item.id}.pdf`);
    } catch (error) {
      console.error("PDF download error:", error);
    }
  };

  const billName = data.billToName || "";
  const billEmail = data.billToEmail || "";
  const invoiceDate = data.invoiceDate || data.date;
  const paidDate = data.paidDate || data.invoiceDate || data.date;

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (value) {
          fetchPayment();
        }
      }}
    >
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" variant="outline">
            View
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-semibold">Invoice Details</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="h-[250px] animate-pulse rounded-lg bg-gray-200" />
        ) : (
          <div className="flex justify-center">
            <div
              ref={invoiceRef}
              className="w-full max-w-[760px] space-y-6 rounded-lg bg-white"
              style={{
                colorScheme: "light",
                backgroundColor: "#ffffff",
                color: "#000000",
              }}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-2xl font-semibold">MindCare Tele-health</p>
                  <p className="text-sm text-muted-foreground">
                    123 Healthcare Ave
                  </p>
                  <p className="text-sm text-muted-foreground">
                    San Francisco, CA 94102
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Invoice</p>
                  <p className="text-2xl font-semibold">{data.invoice}</p>
                  <p className="text-sm text-muted-foreground">{invoiceDate}</p>
                </div>
              </div>

              <div className="border-t" />

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Bill To</p>
                <p className="font-semibold">{billName}</p>
                <p className="text-sm text-muted-foreground">{billEmail}</p>
              </div>

              <div className="overflow-hidden rounded-lg border">
                <div className="flex items-center border-b bg-muted/20 px-5 py-4 font-semibold">
                  <div className="flex-1">Description</div>
                  <div className="w-28 text-right">Amount</div>
                </div>

                <div className="flex items-center px-5 py-4">
                  <div className="flex-1">{data.description}</div>
                  <div className="w-28 text-right">${data.amount}</div>
                </div>

                <div className="mx-5 border-t-2 border-gray-400" />

                <div className="flex items-center px-5 py-4 text-lg font-semibold">
                  <div className="flex-1">Total</div>
                  <div className="w-28 text-right">${data.amount}</div>
                </div>
              </div>

              {data.status === "Paid" && (
                <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
                  <CheckCircle className="mt-0.5 size-5 text-green-600" />

                  <div>
                    <p className="font-semibold text-green-700">
                      Payment Received
                    </p>

                    <p className="text-sm text-green-600">
                      Paid on {paidDate} via {data.method}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" size="lg" onClick={handleDownload}>
            <DownloadIcon className="mr-2 size-4" />
            Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
