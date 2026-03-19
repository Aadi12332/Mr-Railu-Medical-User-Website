"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Container } from "./ui/container";
import { SectionHeader } from "./ui/section-header";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

const contactSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message cannot be empty"),
  agree: z.boolean().refine((v) => v, {
    message: "You must agree to the Terms of Service and Privacy Policy",
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function CompanyContactSection() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    // replace with real integration
    console.log("company contact submitted", values);
    form.reset();
  };

  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          title="Connect With Our"
          subtitle="Support Team"
          className="max-w-md mx-auto"
        />

        <div className="mt-10 max-w-lg mx-auto bg-white rounded-xl p-8 shadow">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-slate-700"
              >
                Full Name *
              </label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                className="bg-gray-50"
                {...form.register("fullName")}
              />
              {form.formState.errors.fullName && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email Address *
              </label>
              <Input
                id="email"
                placeholder="your.email@example.com"
                className="bg-gray-50"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-slate-700"
              >
                Subject
              </label>
              <Input
                id="subject"
                placeholder="Brief topic of inquiry"
                className="bg-gray-50"
                {...form.register("subject")}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700"
              >
                How can we assist you? *
              </label>
              <Textarea
                id="message"
                rows={4}
                placeholder="Share your thoughts, questions, or concerns with us..."
                className="bg-gray-50"
                {...form.register("message")}
              />
              {form.formState.errors.message && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.message.message}
                </p>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="agree"
                className="bg-gray-50"
                {...form.register("agree")}
              />
              <label htmlFor="agree" className="text-sm text-slate-700">
                I agree to the{" "}
                <Link href="/terms" className="underline hover:text-primary">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-primary">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>
            {form.formState.errors.agree && (
              <p className="text-xs text-destructive">
                {form.formState.errors.agree.message}
              </p>
            )}

            <Button type="submit" className="w-full bg-gradient-primary h-10">
              Send Message
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
