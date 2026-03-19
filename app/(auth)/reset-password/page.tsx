"use client";

import ResetPasswordCard from "@/components/auth/ResetPasswordCard";
import { useSearchParams } from "next/navigation";

export default function PatientResetPasswordPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "Patient";
  const loginPath = role === "Patient" ? "/patient-login" : "/provider-login";
  return <ResetPasswordCard role={role as "Patient" | "Provider"} loginPath={loginPath} />;
}
