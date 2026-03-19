"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

export const billingSchema = z.object({
  address: z.string().min(1, "Billing address is required"),
  autoPay: z.boolean(),
});

export type BillingFormValues = z.infer<typeof billingSchema>;

interface PaymentSettingsFormProps {
  defaultValues?: Partial<BillingFormValues>;
  paymentMethods?: PaymentMethod[];
  onSubmit?: (values: BillingFormValues) => void;
}

export function PaymentSettingsForm({
  defaultValues,
  paymentMethods = [],
  onSubmit,
}: PaymentSettingsFormProps) {
  const [methods, setMethods] = useState<PaymentMethod[]>(
    paymentMethods.length
      ? paymentMethods
      : [
          {
            id: "pm_1",
            brand: "Visa",
            last4: "4242",
            expMonth: 12,
            expYear: 2027,
            isDefault: true,
          },
        ],
  );

  const form = useForm<BillingFormValues>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      address: "123 Main Street, San Francisco, CA 94102",
      autoPay: false,
      ...defaultValues,
    },
  });

  function handleSubmit(values: BillingFormValues) {
    console.log("billing info saved", values);
    onSubmit?.(values);
  }

  function handleAddMethod() {
    // just a placeholder, real implementation would open a modal/stripe flow
    const newMethod: PaymentMethod = {
      id: `pm_${methods.length + 1}`,
      brand: "Mastercard",
      last4: "1111",
      expMonth: 1,
      expYear: 2028,
      isDefault: false,
    };
    setMethods((prev) => [...prev, newMethod]);
  }

  return (
    <div className="space-y-5">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-base">Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {methods.map((m) => (
            <div
              key={m.id}
              className={`flex items-center justify-between border rounded-lg p-4 
                ${m.isDefault ? "border-primary" : "border-gray-200"}`}
            >
              <div>
                <p className="font-medium">
                  {m.brand} •••• {m.last4}
                </p>
                <p className="text-sm text-muted-foreground">
                  Expires {m.expMonth}/{m.expYear}
                </p>
              </div>
              {m.isDefault && (
                <span className="text-xs font-semibold text-primary">
                  Default
                </span>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full border-primary text-primary"
            onClick={handleAddMethod}
          >
            Add New Payment Method
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-base">Billing Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <Field>
              <FieldLabel className="w-auto border-0 p-0">
                Billing Address
              </FieldLabel>
              <Input
                id="address"
                placeholder="123 Main Street, San Francisco, CA 94102"
                className="bg-muted"
                {...form.register("address")}
              />
              <FieldError errors={[form.formState.errors.address]} />
            </Field>

            <Controller
              name="autoPay"
              control={form.control}
              render={({ field }) => (
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div>
                    <p className="font-medium">Auto-pay</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically pay for sessions
                    </p>
                  </div>
                  <Switch
                    id="auto-pay"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />

            <Button type="submit" className="bg-gradient-dash text-white">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
