"use client";

import { useCallback, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, Elements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle2, Lock, ArrowRight, Plus } from "lucide-react";
import SuccessDialog from "./SuccessDialog";
import { cn } from "@/lib/utils";
import { stripeApi } from "@/api/stripe.api";
import { stripePromise } from "@/lib/stripe";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { dashboardApi } from "@/api/dashboard.service";

function CardBrand({ brand }: { brand: string }) {
  return (
    <span className="text-xs font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
      {brand}
    </span>
  );
}

function PaymentDialogWrapper({ children, open, onClose, onReturnUrl }: {
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  onReturnUrl?: () => void;
}) {
  const pathname = usePathname();
  const stripe = useStripe();
  const elements = useElements();

  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentTab, setPaymentTab] = useState<"debit" | "credit">("debit");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cardExpiryError, setCardExpiryError] = useState("");
  const [cardCvcError, setCardCvcError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedCards, setSavedCards] = useState<any[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [showNewCard, setShowNewCard] = useState(false);

  const handleCards = useCallback(async () => {
    try {
      const res = await dashboardApi.getCardsApi("patient");
      setSavedCards(res?.data?.paymentMethods || []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => { handleCards(); }, [handleCards]);

  useEffect(() => {
    const defaultCard = savedCards.find((c: any) => c.isDefault);
    if (defaultCard) setSelectedCardId(defaultCard.stripePaymentMethodId);
  }, [savedCards]);

  const handlePayment = async () => {
    if (!stripe) return;
    setIsLoading(true);
    try {
      // Saved card se payment
      if (selectedCardId && !showNewCard) {
        const res = await stripeApi.createPaymentIntent({
          appointmentId: sessionStorage.getItem("appointmentId") || "",
        });
        const result = await stripe.confirmCardPayment(res.data.clientSecret, {
          payment_method: selectedCardId,
        });
        if (result.error) { toast.error(result.error.message); return; }
        if (result.paymentIntent?.status === "succeeded") { setIsSuccess(true); onReturnUrl?.(); }
        return;
      }

      // New card se payment
      const card = elements?.getElement(CardNumberElement);
      if (!card) return;
      const res = await stripeApi.createPaymentIntent({
        appointmentId: sessionStorage.getItem("appointmentId") || "",
      });
      const result = await stripe.confirmCardPayment(res.data.clientSecret, {
        payment_method: { card },
      });
      if (result.error) { toast.error(result.error.message); return; }
      if (result.paymentIntent?.status === "succeeded") { setIsSuccess(true); onReturnUrl?.(); }
    } catch (err) {
      toast.error("Payment failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex items-center relative">
          {pathname !== "/dashboard/providers" && (
            <Button variant="ghost" size="icon" className="absolute left-0 h-10 w-10 rounded-full bg-[#eef7f6] text-[#2a9d8f] hover:bg-[#e0f0ef] hover:text-[#21867a]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h2 className="text-2xl font-semibold text-center w-full text-slate-800">Payment Method</h2>
        </DialogHeader>

        <div className="border border-[#2a9d8f] rounded-2xl p-6 bg-[#f8fbfb]">

          {/* ✅ TERA ORIGINAL DESIGN — Tabs */}
          <div className="flex gap-3 mb-6">
            <Button
              onClick={() => setPaymentTab("debit")}
              variant="outline"
              className={cn("rounded-lg px-6 font-medium",
                paymentTab === "debit" ? "border-[#2a9d8f] text-[#2a9d8f] bg-white" : "text-slate-500 bg-white hover:bg-[#eef7f6]"
              )}
            >
              Debit Card
            </Button>
            <Button
              onClick={() => setPaymentTab("credit")}
              variant="ghost"
              className={cn("rounded-lg px-6 font-medium",
                paymentTab === "credit" ? "border-[#2a9d8f] text-[#2a9d8f] bg-white" : "text-slate-500 bg-white hover:bg-slate-50"
              )}
            >
              Credit Card
            </Button>
          </div>

          {/* ✅ TERA ORIGINAL DESIGN — Radio + Card Logos */}
          <div className="flex items-center justify-between mb-6">
            <RadioGroup defaultValue={paymentTab} className="flex items-center">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={paymentTab} id={paymentTab} checked className="text-[#2a9d8f] border-[#2a9d8f] fill-[#2a9d8f]" />
                <Label htmlFor={paymentTab} className="font-semibold text-base text-slate-900">
                  Pay with {paymentTab === "credit" ? "Credit" : "Debit"} Card
                </Label>
              </div>
            </RadioGroup>
            <div className="flex gap-1.5">
              <div className="h-7 w-11 bg-white border border-slate-200 rounded flex items-center justify-center text-[9px] font-bold text-blue-900">VISA</div>
              <div className="h-7 w-11 bg-white border border-slate-200 rounded flex items-center justify-center text-[7px] font-bold text-orange-500">DISCOVER</div>
              <div className="h-7 w-11 bg-white border border-slate-200 rounded flex items-center justify-center">
                <div className="flex -space-x-1.5">
                  <div className="h-3.5 w-3.5 rounded-full bg-red-500 mix-blend-multiply"></div>
                  <div className="h-3.5 w-3.5 rounded-full bg-blue-500 mix-blend-multiply"></div>
                </div>
              </div>
              <div className="h-7 w-11 bg-white border border-slate-200 rounded flex items-center justify-center">
                <div className="flex -space-x-1.5">
                  <div className="h-3.5 w-3.5 rounded-full bg-red-500 mix-blend-multiply"></div>
                  <div className="h-3.5 w-3.5 rounded-full bg-yellow-500 mix-blend-multiply"></div>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ NEW — Saved Cards Section */}
          {savedCards.length > 0 && (
            <div className="space-y-2 mb-5">
              <p className="text-sm text-slate-500 font-medium">Saved cards</p>
              {savedCards.map((card: any) => (
                <div
                  key={card._id}
                  onClick={() => { setSelectedCardId(card.stripePaymentMethodId); setShowNewCard(false); }}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all bg-white",
                    selectedCardId === card.stripePaymentMethodId && !showNewCard
                      ? "border-[#2a9d8f]"
                      : "border-slate-200 hover:border-[#2a9d8f]/50"
                  )}
                >
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                    selectedCardId === card.stripePaymentMethodId && !showNewCard ? "border-[#2a9d8f]" : "border-slate-300"
                  )}>
                    {selectedCardId === card.stripePaymentMethodId && !showNewCard && (
                      <div className="w-2 h-2 rounded-full bg-[#2a9d8f]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardBrand brand={card.brand} />
                      <span className="text-sm font-medium">•••• {card.last4}</span>
                      {card.isDefault && (
                        <span className="text-xs bg-[#eef7f6] text-[#2a9d8f] px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {card.cardholderName} · Exp {String(card.expMonth).padStart(2, "0")}/{card.expYear}
                    </p>
                  </div>
                </div>
              ))}

              {/* Add new card toggle */}
              <div
                onClick={() => { setShowNewCard(true); setSelectedCardId(null); }}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                  showNewCard ? "border-[#2a9d8f] bg-white" : "border-dashed border-slate-300 hover:border-[#2a9d8f]/50"
                )}
              >
                <Plus className="w-4 h-4 text-[#2a9d8f]" />
                <span className="text-sm text-[#2a9d8f] font-medium">Use a new card</span>
              </div>
            </div>
          )}

          {/* ✅ TERA ORIGINAL DESIGN — Card Fields
               Sirf tab dikhega jab: koi saved card nahi hai, ya "Use new card" click kiya */}
          {(savedCards.length === 0 || showNewCard) && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 sm:col-span-1 space-y-2">
                  <Label className="text-slate-600 font-medium">Card Number</Label>
                  <div className="relative">
                    <div className={cn("bg-white border h-11 rounded-xl shadow-sm px-3 flex items-center", cardNumberError ? "border-red-500" : "border-slate-200")}>
                      <CardNumberElement
                        onChange={(e) => setCardNumberError(e.error?.message || "")}
                        options={{ style: { base: { fontSize: "16px", color: "#1f2937" }, invalid: { color: "#ef4444" } } }}
                        className="w-full"
                      />
                    </div>
                    {!cardNumberError && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2a9d8f]" />}
                  </div>
                  {cardNumberError && <p className="text-red-500 text-xs mt-1">{cardNumberError}</p>}
                </div>

                <div className="col-span-2 sm:col-span-1 space-y-2">
                  <Label className="text-slate-600 font-medium">Expiration Date</Label>
                  <div className={cn("bg-white border h-11 rounded-xl shadow-sm px-3 flex items-center", cardExpiryError ? "border-red-500" : "border-slate-200")}>
                    <CardExpiryElement
                      onChange={(e) => setCardExpiryError(e.error?.message || "")}
                      options={{ style: { base: { fontSize: "16px", color: "#1f2937" }, invalid: { color: "#ef4444" } } }}
                      className="w-full"
                    />
                  </div>
                  {cardExpiryError && <p className="text-red-500 text-xs mt-1">{cardExpiryError}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-600 font-medium">Card Security Code</Label>
                <div className="flex items-start gap-4">
                  <div className="w-full">
                    <div className={cn("bg-white border h-11 rounded-xl shadow-sm px-3 flex items-center w-full", cardCvcError ? "border-red-500" : "border-slate-200")}>
                      <CardCvcElement
                        onChange={(e) => setCardCvcError(e.error?.message || "")}
                        options={{ style: { base: { fontSize: "16px", color: "#1f2937" }, invalid: { color: "#ef4444" } } }}
                        className="w-full"
                      />
                    </div>
                    {cardCvcError && <p className="text-red-500 text-xs mt-1">{cardCvcError}</p>}
                  </div>
                  <button className="text-sm text-[#2a9d8f] hover:underline font-medium mt-3 shrink-0">What is this?</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ✅ TERA ORIGINAL DESIGN — Security Notice */}
        <div className="flex items-center gap-4 px-2">
          <div className="p-2.5 bg-[#eef7f6] rounded-full text-[#2a9d8f] shrink-0">
            <Lock className="h-5 w-5" />
          </div>
          <p className="text-slate-600 text-sm">
            We Protect Your Payment Information Using Encryption To Provide Bank-Level Security.
          </p>
        </div>

        {/* ✅ TERA ORIGINAL DESIGN — Footer */}
        <div className="flex justify-end mt-2">
          <Button
            size="lg"
            className="bg-gradient-dash"
            onClick={handlePayment}
            disabled={isLoading || (!selectedCardId && !showNewCard && savedCards.length > 0)}
          >
            {isLoading ? "Processing..." : "Submit"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <SuccessDialog open={isSuccess} onOpenChange={setIsSuccess} />
      </DialogContent>
    </Dialog>
  );
}

const PaymentDialog = ({ children, open, onClose, onReturnUrl }: {
  children: any; open?: boolean; onClose?: () => void; onReturnUrl?: () => void;
}) => (
  <Elements stripe={stripePromise}>
    <PaymentDialogWrapper open={open} onClose={onClose} onReturnUrl={onReturnUrl}>
      {children}
    </PaymentDialogWrapper>
  </Elements>
);

export default PaymentDialog;