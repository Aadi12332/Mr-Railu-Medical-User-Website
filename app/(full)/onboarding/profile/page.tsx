"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ArrowRightIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

import export1Img from "@/assets/landing/expert-1.png";
import export2Img from "@/assets/landing/expert-2.png";
import export3Img from "@/assets/landing/expert-3.png";
import { useFetch } from "@/hooks/useFetch";
import { publicPageApi } from "@/api/publicpage.api";

function PatientProfileContent() {
  const { data: bookingFlow, loading: bookingFlowLoading, error: bookingFlowError } = useFetch(publicPageApi.getBookingFlow) as any;
  const [providerData, setProviderData] = useState<any>(null);
  const [providerLoading, setProviderLoading] = useState(false);
  const [providerError, setProviderError] = useState(false);
  const searchParams = useSearchParams();
  const providerId = searchParams.get("providerId")
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [zip, setZip] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const fields = bookingFlow?.profileStep?.fields || [];
  const getLabel = (key: string) =>
    fields.find((f: any) => f.key === key)?.label || "";


  const isFormValid =
    firstName.trim() &&
    lastName.trim() &&
    zip.trim() &&
    dob.trim() &&
    mobile.trim() &&
    email.includes("@") &&
    agreeTerms;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isFormValid) return;

    const payload = {
      firstName,
      lastName,
      zip,
      dob,
      mobile,
      email,
      marketingOptIn,
    };

    // replace with real API / navigation
    console.log("Create patient profile:", payload);
    sessionStorage.setItem("patiendDetail", JSON.stringify(payload))
    sessionStorage.setItem("providerData", JSON.stringify(providerData?.suggestedProvider))

    router.push("/appointment");
  };
  useEffect(() => {
    if (providerId) {
      setProviderLoading(true);
      publicPageApi.getProviderBySlug(providerId).then((res) => {
        setProviderData(res.data)
      }).catch(() => setProviderError(true))
        .finally(() => setProviderLoading(false));
    }
  }, []);

  if (bookingFlowLoading || providerLoading) {
    return (
      <div className="max-w-lg mx-auto py-8 px-4 w-full">
        <Card className="shadow-lg gap-0 p-6 space-y-6">
          <Skeleton className="h-8 w-1/2 mx-auto" />
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <Skeleton className="h-12 w-full mt-4" />
        </Card>
      </div>
    );
  }

  if (bookingFlowError || providerError) {
    return (
      <div className="max-w-lg mx-auto py-8 px-4 w-full">
        <Card className="shadow-lg gap-0 p-8 text-center text-red-500">
           <p>Something went wrong loading data. Please try again.</p>
        </Card>
      </div>
    );
  }
  const providers = (providerData?.providers || [])
    .filter((p: any) => p.isFeatured)
    .sort((a: any, b: any) => a.featuredOrder - b.featuredOrder);

  const visibleProviders = providers.slice(0, 3);
  const remainingCount = providers.length - visibleProviders.length;

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <Card className="shadow-lg gap-0">
        <CardHeader className="border-b-0">
          <Button
            variant="ghost"
            size="icon-sm"
            className="-ml-2"
            onClick={() => typeof window !== 'undefined' && window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 text-[#4A7C7E]" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* avatar row + heading */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center -space-x-3">
              {visibleProviders.map((p: any) => {
                const initials = `${p.firstName?.[0] || ""}${p.lastName?.[0] || ""}`;

                return (
                  <Avatar
                    key={p._id}
                    className="size-14 border border-slate-100 bg-white"
                  >
                    <AvatarFallback>{initials}</AvatarFallback>
                    <AvatarImage src={p.profileImageUrl} />
                  </Avatar>
                );
              })}

              {remainingCount > 0 && (
                <div className="size-12 rounded-full bg-[#eef8f6] z-10 border border-[#E6F3F1] flex items-center justify-center text-sm font-semibold text-[#274A48]">
                  {remainingCount}+
                </div>
              )}
            </div>

            <p className="text-sm text-slate-600 max-w-xl">
              {providerData?.pageContent?.heroTitle ?? "Over 50 Experienced Providers Specializing In ADHD Are Ready To Help"}
            </p>

            <h1 className="text-2xl font-semibold text-[#2F6F6A]">
              Set Up Your Patient Profile
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label htmlFor="firstName">{getLabel("firstName")}</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {submitted && !firstName.trim() && (
                  <div className="text-red-500 text-xs">
                    Required
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">{getLabel("lastName")}</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {submitted && !lastName.trim() && (
                  <div className="text-red-500 text-xs">
                    Required
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="zip">{getLabel("zipCode")}</Label>
                <InputGroup>
                  <InputGroupInput
                    id="zip"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                  <InputGroupAddon align="inline-end">
                    <Info className="text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
                {submitted && !zip.trim() && (
                  <div className="text-red-500 text-xs">
                    Required
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">{getLabel("dateOfBirth")}</Label>
                <Input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                {submitted && !dob.trim() && (
                  <div className="text-red-500 text-xs">
                    Required
                  </div>
                )}
              </div>

            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">{getLabel("mobileNumber")}</Label>
              <Input
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              {submitted && !mobile.trim() && (
                <div className="text-red-500 text-xs">
                  Required
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{getLabel("email")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {submitted && !email.includes("@") && (
                <div className="text-red-500 text-xs">
                  Invalid email
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="marketing"
                  checked={marketingOptIn}
                  onCheckedChange={(v) => setMarketingOptIn(!!v)}
                />
                <Label htmlFor="marketing" className="text-sm">
                  {getLabel("marketingMessages")}
                </Label>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(v) => setAgreeTerms(!!v)}
                />
                <Label htmlFor="terms" className="text-sm">
                  {getLabel("termsAccepted")}
                </Label>
              </div>

              {submitted && !agreeTerms && (
                <div className="text-red-500 text-xs">
                  You must agree to continue
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-2 h-12 bg-gradient-primary"
              size="lg"
              disabled={!isFormValid}
            >
              Create My Patient Profile
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>

            <div className="text-center pt-3 text-sm text-gray-500">
              Already Have An Account?{" "}
              <Link href="/login" className="text-[#4A7C7E] hover:underline">
                Sign In
              </Link>
            </div>

          </form>

        </CardContent>
      </Card>
    </div>
  );
}

export default function PatientProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-lg mx-auto py-8 px-4 w-full">
          <Card className="shadow-lg gap-0 p-6 space-y-6">
            <Skeleton className="h-8 w-1/2 mx-auto" />
            <div className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
            <Skeleton className="h-12 w-full mt-4" />
          </Card>
        </div>
      }
    >
      <PatientProfileContent />
    </Suspense>
  );
}
