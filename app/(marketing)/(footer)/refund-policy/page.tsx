import RefundsHero from "@/components/pages/RefundsHero";
import RefundsDetails from "@/components/pages/RefundsDetails";

export const metadata = {
  title: "Refunds & Fees Policy",
  description: "Learn about our refund and fee policies for appointments.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <RefundsHero />

      <RefundsDetails />
    </>
  );
}
