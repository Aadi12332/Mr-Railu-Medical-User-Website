"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";

import export1Img from "@/assets/landing/expert-1.png";
import export2Img from "@/assets/landing/expert-2.png";
import export3Img from "@/assets/landing/expert-3.png";

export default function PatientProfilePage() {
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
    router.push("/appointment");
  };

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <Card className="shadow-lg gap-0">
        <CardHeader className="border-b-0">
          <Button
            variant="ghost"
            size="icon-sm"
            className="-ml-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 text-[#4A7C7E]" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* avatar row + heading */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center -space-x-3">
              <Avatar className="size-14 border border-slate-100 bg-white">
                <AvatarFallback>JD</AvatarFallback>
                <AvatarImage src={export1Img.src} />
              </Avatar>
              <Avatar className="size-14 border border-slate-100 bg-white">
                <AvatarFallback>SR</AvatarFallback>
                <AvatarImage src={export2Img.src} />
              </Avatar>
              <Avatar className="size-14 border border-slate-100 bg-white">
                <AvatarFallback>LA</AvatarFallback>
                <AvatarImage src={export3Img.src} />
              </Avatar>
              <div className="size-12 rounded-full bg-[#eef8f6] z-10 border border-[#E6F3F1] flex items-center justify-center text-sm font-semibold text-[#274A48]">
                50+
              </div>
            </div>

            <p className="text-sm text-slate-600 max-w-xl">
              Over 50 Experienced Providers Specializing In ADHD Are Ready To
              Help
            </p>

            <h1 className="text-2xl font-semibold text-[#2F6F6A]">
              Set Up Your Patient Profile
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name*</Label>
                <Input
                  id="firstName"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {submitted && !firstName.trim() && (
                  <div className="text-red-500 text-xs mt-1">
                    First name is required
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name*</Label>
                <Input
                  id="lastName"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {submitted && !lastName.trim() && (
                  <div className="text-red-500 text-xs mt-1">
                    Last name is required
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="zip">Zip Code*</Label>
                <InputGroup>
                  <InputGroupInput
                    id="zip"
                    placeholder="Enter Zip Code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                  <InputGroupAddon align="inline-end">
                    <Info className="text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
                {submitted && !zip.trim() && (
                  <div className="text-red-500 text-xs mt-1">
                    Zip code is required
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date Of Birth*</Label>
                <Input
                  id="dob"
                  type="date"
                  placeholder="MM/DD/YYYY"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                {submitted && !dob.trim() && (
                  <div className="text-red-500 text-xs mt-1">
                    Date of birth is required
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number*</Label>
              <Input
                id="mobile"
                placeholder="+1"
                inputMode="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              {submitted && !mobile.trim() && (
                <div className="text-red-500 text-xs mt-1">
                  Mobile number is required
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {submitted && !email.includes("@") && (
                <div className="text-red-500 text-xs mt-1">
                  Please enter a valid email
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
                  I Agree To Receive Marketing Messages And Follow-Up Visit
                  Reminders Via SMS & Email. Message Frequency Varies. Text STOP
                  To Opt-Out.
                </Label>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(v) => setAgreeTerms(!!v)}
                />
                <Label htmlFor="terms" className="text-sm flex flex-wrap">
                  I Agree To The Mental Health Tele Health
                  <Link
                    href="#"
                    className="inline text-[#4A7C7E] hover:underline"
                  >
                    Terms Of Use, Privacy Policy, Terms And Conditions,
                    Telehealth Consent, Artificial Intelligence Usage Consent,
                    Refund Policy
                  </Link>
                  And To Receive Login And Appointment Links Via SMS.*
                </Label>
              </div>
              {submitted && !agreeTerms && (
                <div className="text-red-500 text-xs">
                  You must agree to the terms to continue
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
              <Link href="/signin" className="text-[#4A7C7E] hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
