import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import React from "react";

const items = [
  {
    id: "general-billing",
    letter: "A",
    title: "General Billing",
    content: (
      <>
        <p className="text-sm text-muted-foreground">
          We charge you through your online billing account for any services you
          use. By booking an appointment, you authorize us to collect payment
          using your selected payment method.
        </p>
        <h3 className="font-semibold mt-4">
          Charges may be processed in two steps:
        </h3>
        <ul className="list-disc list-inside mt-3 ml-5 space-y-1 text-sm text-muted-foreground">
          <li>A portion may be charged when your appointment is scheduled</li>
          <li>
            The remaining amount may be charged shortly before your session
            begins
          </li>
        </ul>
        <p className="mt-2 text-sm text-muted-foreground">
          We reserve the right to correct any billing errors if they occur.
        </p>
      </>
    ),
  },
  {
    id: "accurate-info",
    letter: "B",
    title: "Accurate Information Required",
    content: (
      <>
        <p className="text-sm text-muted-foreground">
          You are responsible for keeping your billing details up to date and
          accurate. This includes:
        </p>
        <ul className="list-disc list-inside mt-2 ml-5 space-y-1 text-sm text-muted-foreground">
          <li>Billing address</li>
          <li>Credit or debit card number</li>
          <li>Card expiration date</li>
        </ul>
        <h3 className="mt-4 font-semibold">Please notify us immediately if:</h3>
        <ul className="list-disc list-inside ml-5 mt-2 space-y-1 text-sm text-muted-foreground">
          <li>Your payment method is lost or canceled</li>
          <li>You believe your account security has been compromised</li>
        </ul>
      </>
    ),
  },
  {
    id: "payment-method",
    letter: "C",
    title: "Payment Method",
    content: (
      <>
        <p className="text-sm text-muted-foreground">
          Payments are processed through your selected payment provider, such as
          a bank or card issuer.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          If we do not receive payment from your provider, you agree to pay the
          full amount owed directly upon request.
        </p>
      </>
    ),
  },
];

export default function PaymentTermsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeader
          title="Charges on Your"
          subtitle="Billing Account"
          align="center"
        />
      </div>
      <div className="mt-10 max-w-3xl mx-auto px-4 grid grid-cols-1  gap-8">
        {items.map((item) => (
          <Card
            key={item.id}
            className="bg-white p-6 shadow-sm  flex-row gap-3"
          >
            <div className="size-8 shrink-0 rounded-full bg-gradient-primary text-white font-semibold flex items-center justify-center">
              {item.letter}
            </div>
            <div className="">
              <h3 className="text-lg mt-0.5 font-medium text-slate-900">
                {item.title}
              </h3>
              <div className="mt-3">{item.content}</div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
