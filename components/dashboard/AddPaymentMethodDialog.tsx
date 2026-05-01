"use client";

import { useEffect, useState, type ReactNode } from "react";
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
import { Label } from "@/components/ui/label";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Loader2, PlusIcon } from "lucide-react";
import { toast } from "react-toastify";
import { stripeApi } from "@/api/stripe.api";
import { stripePromise } from "@/lib/stripe";
import { cn } from "@/lib/utils";
import { PaymentMethod } from "./PaymentMethodCard";

const paymentSchema = z.object({
  cardholderName: z.string().min(1, "Name is required"),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

type PaymentMethodRecord = {
  id?: string;
  _id?: string;
  brand?: string;
  last4?: string;
  expiry?: string;
  expMonth?: string | number;
  expYear?: string | number;
  isDefault?: boolean;
  cardholderName?: string;
  billingDetails?: {
    name?: string;
  };
  billing_details?: {
    name?: string;
  };
};

const cardElementOptions = {
  style: {
    base: {
      color: "hsl(var(--foreground))",
      fontFamily: "inherit",
      fontSize: "16px",
      "::placeholder": {
        color: "hsl(var(--muted-foreground))",
      },
    },
    invalid: {
      color: "hsl(var(--destructive))",
    },
  },
};

interface AddPaymentMethodDialogProps {
  onAdd: (method: PaymentMethod) => void;
  trigger?: ReactNode;
}

function normalizePaymentMethod(method: unknown): PaymentMethod | null {
  if (!method || typeof method !== "object") return null;

  const record = method as PaymentMethodRecord;

  const expiry =
    record.expiry ||
    (record.expMonth && record.expYear
      ? `${record.expMonth}/${record.expYear}`
      : "");

  return {
    id: record.id || record._id || "",
    brand: record.brand || "Card",
    last4: record.last4 || "",
    expiry,
    isDefault: Boolean(record.isDefault),
    cardholderName: record.cardholderName || record.billingDetails?.name,
  };
}

function AddPaymentMethodForm({
  onAdd,
  onClose,
}: {
  onAdd: (method: PaymentMethod) => void;
  onClose: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardholderName: "",
    },
  });

  useEffect(() => {
    return () => {
      form.reset();
    };
  }, [form]);

  const onSubmit = async (values: PaymentFormValues) => {
    if (!stripe || !elements) {
      toast.error("Stripe is still loading. Please try again in a moment.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error("Card details could not be loaded.");
      return;
    }

    try {
      setIsSubmitting(true);

      const setupIntentResponse = await stripeApi.setUpPayment();
      const clientSecret = setupIntentResponse?.data?.clientSecret;

      if (!clientSecret) {
        toast.error("Could not initialize card setup.");
        return;
      }

      const { error, setupIntent } = await stripe.confirmCardSetup(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: values.cardholderName,
            },
          },
        },
      );

      if (error) {
        toast.error(error.message || "Unable to save card.");
        return;
      }

      const paymentMethodId =
        typeof setupIntent?.payment_method === "string"
          ? setupIntent.payment_method
          : setupIntent?.payment_method?.id;

      if (!paymentMethodId) {
        toast.error("Stripe did not return a payment method.");
        return;
      }

      const saveResponse = await stripeApi.addPaymentMethod({
        paymentMethodId,
        setAsDefault: false,
      });

      const savedMethod =
        normalizePaymentMethod(saveResponse?.data?.paymentMethod) ||
        (typeof setupIntent?.payment_method !== "string"
          ? normalizePaymentMethod(
              setupIntent?.payment_method as unknown as PaymentMethodRecord | null,
            )
          : null);

      if (!savedMethod || !savedMethod.id) {
        toast.error(
          "Payment method was saved, but the response was incomplete.",
        );
        return;
      }

      onAdd(savedMethod);
      form.reset();
      cardElement.clear();
      onClose();
      toast.success("Payment method saved.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save payment method.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="flex flex-col">
          <Label className="mb-2">Card Details</Label>
          <div className="rounded-md border bg-white px-3 py-2.5 shadow-sm">
            <CardElement options={cardElementOptions} />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Securely entered via Stripe Elements. No raw card data is sent to
            your server.
          </p>
        </div>

        <div className="flex flex-col">
          <Label className="mb-2">Cardholder Name</Label>
          <input
            {...form.register("cardholderName")}
            placeholder="John Doe"
            className={cn(
              "h-10 rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
              form.formState.errors.cardholderName && "border-destructive",
            )}
          />
          {form.formState.errors.cardholderName && (
            <p className="mt-1 text-xs text-destructive">
              {form.formState.errors.cardholderName.message}
            </p>
          )}
        </div>
      </div>

      <DialogFooter className="mt-6 border-t-0 bg-white">
        <DialogClose asChild>
          <Button variant="outline" className="mr-2" disabled={isSubmitting}>
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          className="bg-gradient-dash"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              Saving
            </span>
          ) : (
            "Add Card"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default function AddPaymentMethodDialog({
  onAdd,
  trigger,
}: AddPaymentMethodDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-dash ">
            <PlusIcon className="size-4 mr-1" /> Add Card
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-semibold">
            Add Payment Method
          </DialogTitle>
          <DialogDescription>
            Add a new credit or debit card for payments using Stripe Elements
          </DialogDescription>
        </DialogHeader>

        <Elements stripe={stripePromise}>
          <AddPaymentMethodForm onAdd={onAdd} onClose={() => setOpen(false)} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
}
