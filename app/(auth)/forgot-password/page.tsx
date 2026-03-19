"use client";

import { Suspense } from "react";
import ForgotPasswordCard from "@/components/auth/ForgotPasswordCard";
import { useSearchParams } from "next/navigation";

function ForgotPasswordInner() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "Patient";
  const loginPath =
    role === "Patient" ? "/patient-login" : "/provider-login";

  return (
    <ForgotPasswordCard
      role={role as "Patient" | "Provider"}
      loginPath={loginPath}
    />
  );
}

export default function PatientForgotPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordInner />
    </Suspense>
  );
}