"use client";

import LoginCard from "@/components/auth/LoginCard";

export default function ProviderLoginPage() {
  return <LoginCard role="Provider" onSubmitPath="/dashboard" />;
}
