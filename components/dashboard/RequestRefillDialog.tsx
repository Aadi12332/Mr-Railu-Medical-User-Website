"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import type { PrescriptionItem } from "./types";

const refillSchema = z.object({
  pharmacy: z.string().optional(),
  notes: z.string().optional(),
});

type RefillFormValues = z.infer<typeof refillSchema>;

interface RequestRefillDialogProps {
  prescription: PrescriptionItem;
  trigger?: React.ReactNode;
}

export default function RequestRefillDialog({
  prescription,
  trigger,
}: RequestRefillDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<RefillFormValues>({
    resolver: zodResolver(refillSchema),
    defaultValues: {
      pharmacy: "",
      notes: "",
    },
  });

  const onSubmit = (values: RefillFormValues) => {
    console.log("refill request", prescription.id, values);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-dash text-white hover:opacity-90 flex-1">
            <CheckCircle className="mr-1.5 size-4" /> Request Refill
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-semibold">
            Request Treatments Refill
          </DialogTitle>
          <DialogDescription>
            Submit a refill request for your prescription
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* medication summary */}
            <div className="p-4 bg-slate-50 rounded-md">
              <div className="text-sm font-medium">
                {prescription.medication} {prescription.dosage}
              </div>
              <div className="text-xs text-muted-foreground">
                {prescription.schedule}
              </div>
            </div>

            {/* refill info banner */}
            <div className="rounded-md bg-blue-50 px-4 py-3 text-sm text-blue-800 flex items-center">
              <CheckCircle className="size-5 mr-2" />
              <div>
                <p className="font-medium">
                  {prescription.refillsLeft} refills remaining
                </p>
                {prescription.nextRefillDate && (
                  <p className="text-xs text-muted-foreground">
                    Next refill available: {prescription.nextRefillDate}
                  </p>
                )}
              </div>
            </div>

            {/* form fields */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <Label className="mb-2">Preferred Pharmacy (Optional)</Label>
                <Input
                  {...form.register("pharmacy")}
                  placeholder="Enter pharmacy name or address"
                />
                {form.formState.errors.pharmacy && (
                  <p className="text-xs text-destructive mt-1">
                    {form.formState.errors.pharmacy.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label className="mb-2">Additional Notes (Optional)</Label>
                <Textarea
                  {...form.register("notes")}
                  placeholder="Any special instructions or questions..."
                  rows={4}
                />
                {form.formState.errors.notes && (
                  <p className="text-xs text-destructive mt-1">
                    {form.formState.errors.notes.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="border-t-0 bg-white mt-6">
            <DialogClose asChild>
              <Button variant="outline" className="mr-2">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-gradient-dash">
              Submit Refill Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
