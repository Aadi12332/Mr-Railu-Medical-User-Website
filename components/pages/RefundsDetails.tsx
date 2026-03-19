import {
  Clock,
  Calendar,
  XCircle,
  CheckCircle,
  AlertTriangle,
  FileText,
  Mail,
  Phone,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "../ui/container";
import { cn } from "@/lib/utils";

const definitions = [
  {
    id: "late-cancellation",
    title: "Late Cancellation",
    description:
      "Canceling an appointment less than 8 hours before the scheduled time.",
    icon: Clock,
    iconClassName: "bg-[#FEF3C6] text-[#D08700]",
    className: "bg-[#FFFBEB] border-[#FFF085]",
  },
  {
    id: "late-rescheduling",
    title: "Late Rescheduling",
    description:
      "Requesting a time change less than 8 hours before the appointment.",
    icon: Calendar,
    iconClassName: "bg-gradient-primary text-white",
    className: "bg-[#E3F5F1] border-[#5DB3994D]",
  },
  {
    id: "no-show",
    title: "No-Show",
    description:
      "Not attending a scheduled appointment or joining more than 5 minutes late when the provider is available.",
    icon: XCircle,
    iconClassName: "bg-[#FFE4E6] text-red-600",
    className: "bg-[#FFF1F2] border-[#FFC9C9]",
  },
];

export default function RefundsDetails() {
  return (
    <section className="py-16 bg-white">
      <Container maxWidth="4xl">
        <h2 className="text-2xl font-semibold">Definitions</h2>

        <div className="mt-8  grid grid-cols-1 md:grid-cols-3 gap-8">
          {definitions.map((def) => (
            <Card
              key={def.id}
              className={cn("p-6 gap-0 ring-0 border-2", def.className)}
            >
              <div
                className={cn(
                  "mb-4 size-12 rounded-xl  flex items-center justify-center",
                  def.iconClassName,
                )}
              >
                <def.icon className="size-6" />
              </div>
              <h3 className="font-medium text-slate-900">{def.title}</h3>
              <p className="mt-2 text-muted-foreground text-xs">
                {def.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-8 space-y-8">
          <Card className="pt-0 shadow">
            <CardHeader className="border-b bg-[#ECFDF5] pt-5 flex gap-4 items-center">
              <CheckCircle className="size-6 text-green-600 bg-green-100" />
              <div className="flex items-end gap-2">
                <span className="font-bold text-3xl">1.</span>
                <CardTitle className="font-bold text-xl">
                  Conditions for Full Refund
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="">
              <p className="text-muted-foreground">
                A full refund may be granted in the following situations:
              </p>
              <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-2 marker:text-green-600">
                <li>
                  The patient cancels the appointment at least 8 hours in
                  advance
                </li>
                <li>
                  The provider cancels or reschedules and the patient chooses
                  not to rebook
                </li>
                <li>
                  Technical issues on the provider&apos;s side prevent the visit
                  from starting
                </li>
                <li>
                  The patient is assigned to a provider who is not licensed in
                  their state
                </li>
                <li>
                  The provider is more than 15 minutes late and the patient
                  declines rescheduling
                </li>
                <li>
                  No available appointment slots are found within a reasonable
                  time
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="pt-0 shadow">
            <CardHeader className="border-b bg-[#FEF2F2] pt-5 flex gap-4 items-center">
              <XCircle className="size-6 text-red-600 bg-red-100" />
              <div className="flex items-end gap-2">
                <span className="font-bold text-3xl">2.</span>
                <CardTitle className="font-bold text-xl">
                  When Refunds Are Not Issued / Fees Apply
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Refunds are not provided in the following cases:
              </p>
              <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-2 marker:text-red-600">
                <li>Appointments that have already started</li>
                <li>Late cancellation or late rescheduling by the patient</li>
                <li>No-show appointments</li>
                <li>
                  Technical problems caused by the patient&apos;s internet or
                  device
                </li>
                <li>Pharmacy or medication availability issues</li>
              </ul>
              <div className="mt-4 p-4 bg-[#FEF2F2] border-l-4 border-red-600 text-sm text-red-800">
                Late cancellation or rescheduling fees may apply, and no-show
                fees may be charged before booking a new appointment.
              </div>
            </CardContent>
          </Card>

          <Card className="pt-0 shadow">
            <CardHeader className="border-b bg-[#FFFBEB] pt-5 flex gap-4 items-center">
              <AlertTriangle className="size-6 text-yellow-600 bg-yellow-100" />
              <div className="flex items-end gap-2">
                <span className="font-bold text-3xl">3.</span>
                <CardTitle className="font-bold text-xl">Exceptions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Exceptions may be considered for special circumstances,
                including:
              </p>
              <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-2 marker:text-yellow-600">
                <li>Medical emergencies</li>
                <li>Severe weather conditions</li>
                <li>Unexpected personal crises</li>
              </ul>
              <div className="mt-4 p-4 bg-[#FFFBEB] border-l-4 border-yellow-600 text-sm text-yellow-800">
                Supporting documents may be required to review exception
                requests.
              </div>
            </CardContent>
          </Card>

          <Card className="pt-0 shadow">
            <CardHeader className="border-b bg-[#E0F7FA] pt-5 flex gap-4 items-center">
              <FileText className="size-6 text-blue-600 bg-blue-100" />
              <div className="flex items-end gap-2">
                <span className="font-bold text-3xl">4.</span>
                <CardTitle className="font-bold text-xl">
                  Refund Process
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                <strong>Request</strong>
                <br />
                Contact customer support by phone or email with your appointment
                details and reason for refund.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Response</strong>
                <br />A support specialist will reply within 48–72 hours.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Timeframe</strong>
                <br />
                Requests must be submitted within 15 days of the missed or
                canceled appointment.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Processing</strong>
                <br />
                Approved refunds are processed within 2–3 business days and may
                take up to 28 days to appear depending on your bank.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Method</strong>
                <br />
                Refunds are issued using the original payment method.
              </p>
            </CardContent>
          </Card>

          <Card className="pt-0 shadow">
            <CardHeader className="border-b bg-[#E0F7FA] pt-5 flex gap-4 items-center">
              <Mail className="size-6 text-blue-600 bg-blue-100" />
              <div className="flex items-end gap-2">
                <span className="font-bold text-3xl">5.</span>
                <CardTitle className="font-bold text-xl">
                  Communication of Policy
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This policy is shared with patients during sign-up and
                appointment confirmations.
              </p>
            </CardContent>
          </Card>

          <Card className="pt-0 shadow">
            <CardHeader className="border-b bg-[#E0F7FA] pt-5 flex gap-4 items-center">
              <Phone className="size-6 text-blue-600 bg-blue-100" />
              <div className="flex items-end gap-2">
                <span className="font-bold text-3xl">6.</span>
                <CardTitle className="font-bold text-xl">
                  Payment of Fees
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-2 marker:text-blue-600">
                <li>
                  Late cancellation, rescheduling, and no-show fees are the
                  patient&apos;s responsibility
                </li>
                <li>These fees are not usually covered by insurance</li>
                <li>
                  Any outstanding fees must be paid before booking another
                  appointment
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="pt-0 shadow">
            <CardHeader className="border-b bg-[#E0F7FA] pt-5 flex gap-4 items-center">
              <Shield className="size-6 text-blue-600 bg-blue-100" />
              <div className="flex items-end gap-2">
                <span className="font-bold text-3xl">7.</span>
                <CardTitle className="font-bold text-xl">
                  Changes to Policy
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may update this policy at any time. Changes will be posted on
                our website and take effect immediately.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
