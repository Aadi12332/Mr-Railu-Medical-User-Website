"use client";

import ForgotPasswordCard from "@/components/auth/ForgotPasswordCard";
import { useSearchParams } from "next/navigation";

export default function PatientForgotPasswordPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "Patient";
  const loginPath = role === "Patient" ? "/patient-login" : "/provider-login";
  return <ForgotPasswordCard role={role as "Patient" | "Provider"} loginPath={loginPath} />;
}
