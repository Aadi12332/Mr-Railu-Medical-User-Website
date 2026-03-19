"use client";

import { useState } from "react";
import { DollarSign, Clock, CheckCircle } from "lucide-react";
import AddPaymentMethodDialog from "@/components/dashboard/AddPaymentMethodDialog";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  PaymentMethodCard,
  PaymentMethod,
} from "@/components/dashboard/PaymentMethodCard";
import {
  PaymentItemCard,
  PaymentItem,
} from "@/components/dashboard/PaymentItemCard";

interface SummaryCard {
  id: string;
  label: string;
  value: number | string;
  /** whether the value should be formatted as a dollar amount */
  isCurrency?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  iconClassName: string;
}

const summaryCards: SummaryCard[] = [
  {
    id: "total",
    label: "Total Spent (2026)",
    value: 570,
    isCurrency: true,
    icon: DollarSign,
    iconClassName: "bg-blue-100 text-blue-600",
  },
  {
    id: "upcoming",
    label: "Upcoming Payments",
    value: 270,
    isCurrency: true,
    icon: Clock,
    iconClassName: "bg-yellow-100 text-yellow-600",
  },
  {
    id: "sessions",
    label: "Sessions This Month",
    value: 3,
    isCurrency: false,
    icon: CheckCircle,
    iconClassName: "bg-emerald-100 text-emerald-600",
  },
];

const PAYMENT_METHODS_INITIAL: PaymentMethod[] = [
  {
    id: "pm1",
    brand: "Visa",
    last4: "4242",
    expiry: "12/27",
    isDefault: true,
  },
  {
    id: "pm2",
    brand: "Mastercard",
    last4: "5555",
    expiry: "08/26",
    isDefault: false,
  },
];

const PAYMENT_ITEMS: PaymentItem[] = [
  // upcoming sessions
  {
    id: "pay-1",
    description: "Session with Dr. Emily Chen",
    date: "Jan 13, 2026",
    amount: 120,
    status: "Scheduled",
  },
  {
    id: "pay-2",
    description: "Session with Dr. Michael Ross",
    date: "Jan 15, 2026",
    amount: 150,
    status: "Scheduled",
  },
  // history / completed payments
  {
    id: "pay-3",
    description: "Session with Dr. Sarah Miller",
    date: "Jan 05, 2026",
    amount: 100,
    status: "Paid",
    invoice: "INV-2026-003",
    method: "Mastercard **** 5555",
    invoiceDate: "Jan 05, 2026",
    paidDate: "Jan 06, 2026",
    billToName: "Sarah Johnson",
    billToEmail: "sarah.j@email.com",
  },
  {
    id: "pay-4",
    description: "Initial Assessment",
    date: "Nov 20, 2025",
    amount: 200,
    status: "Paid",
    invoice: "INV-2025-045",
    method: "Visa **** 4242",
    invoiceDate: "Nov 20, 2025",
    paidDate: "Nov 21, 2025",
    billToName: "Sarah Johnson",
    billToEmail: "sarah.j@email.com",
  },
];

type Tab = "upcoming" | "history";

export default function PaymentsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>(
    PAYMENT_METHODS_INITIAL,
  );
  const [tab, setTab] = useState<Tab>("upcoming");

  const filteredPayments = PAYMENT_ITEMS.filter((p) => {
    if (tab === "upcoming") return p.status === "Scheduled";
    return p.status !== "Scheduled";
  });

  function setAsDefault(id: string) {
    setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
  }

  return (
    <div className="space-y-6 h-full">
      {/* header */}
      <div>
        <h1 className="text-2xl font-medium">Payments & Billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your payments and invoices
        </p>
      </div>

      {/* summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.id} className="px-4 py-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-md",
                    card.iconClassName,
                  )}
                >
                  <Icon className="size-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{card.label}</p>
                  <p className="text-2xl font-medium leading-none">
                    {typeof card.value === "number" && card.isCurrency
                      ? `$${card.value}`
                      : card.value}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* payment methods section */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Payment Methods</h2>
          <AddPaymentMethodDialog
            onAdd={(method) => setMethods((prev) => [...prev, method])}
          />
        </div>
        <div className="mt-2 gap-5 grid grid-cols-1 md:grid-cols-2">
          {methods.map((m) => (
            <PaymentMethodCard
              key={m.id}
              method={m}
              onSetDefault={() => setAsDefault(m.id)}
            />
          ))}
        </div>
      </Card>

      {/* tabs for payments list */}
      <div className="flex space-x-2 bg-muted p-1 w-fit rounded-full">
        {(["upcoming", "history"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-1 rounded-full text-sm",
              tab === t ? "bg-gradient-dash text-white" : "hover:bg-muted/80",
            )}
          >
            {t === "history" ? "Payment History" : "Upcoming"}
          </button>
        ))}
      </div>

      {/* list of payments */}
      <div className="space-y-4">
        {filteredPayments.length === 0 && (
          <p className="text-center text-muted-foreground">
            No payments to show.
          </p>
        )}
        {filteredPayments.map((item) => (
          <PaymentItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
