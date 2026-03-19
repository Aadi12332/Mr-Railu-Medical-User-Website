import Link from "next/link";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Calendar,
  Clock,
  Video,
  MessageSquare,
  Star,
  ArrowLeft,
  Download,
  RefreshCw,
} from "lucide-react";

export default function page() {
  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium">
            Welcome back, Sarah <span className="ml-1">👋</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s your mental health overview for today
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2">
            <Button className="bg-gradient-dash ">
              <ArrowLeft className="size-4" /> Back To website
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Upcoming Session (large) */}
        <Card className="col-span-12 lg:col-span-8">
          <CardHeader>
            <div>
              <CardTitle>Upcoming Session</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="flex justify-between gap-6">
            <div className="flex  flex-col md:flex-row  gap-4">
              <Avatar className="size-20 border border-slate-100 bg-white">
                <AvatarFallback>EC</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">Dr. Emily Chen</div>
                    <div className="text-xs text-muted-foreground">
                      Clinical Psychologist
                    </div>
                    <div className="mt-2 flex flex-col text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4 text-muted-foreground" />
                        <span>January 13, 2026</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-muted-foreground" />
                        <span>2:00 PM - 3:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Video className="size-4" />
                        <span>Video Consultation</span>
                      </div>

                      <div className="hidden sm:flex items-center gap-2">
                        <Calendar className="size-4" />
                        <span>Telehealth</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button className="bg-gradient-dash">
              <Video className="size-4 mr-2" /> Join Call
            </Button>
          </CardContent>
        </Card>

        {/* Next Appointment (right) */}
        <Card className="col-span-12 lg:col-span-4">
          <CardHeader>
            <div>
              <CardTitle>Next Appointment</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Provider</div>
                <div className="font-medium">Dr. Michael Ross</div>
              </div>

              <div className="flex flex-col items-end">
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-100">
                  Confirmed
                </Badge>
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Date & Time</div>
              <div className="font-medium mt-1">
                January 15, 2026
                <br />
                10:00 AM
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Row: My Providers, Mental Health Plan, Today's Focus */}
        <Card className="col-span-12 md:col-span-6 lg:col-span-4">
          <CardHeader>
            <CardTitle>My Providers</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-4 ">
            <Avatar className="size-20 ">
              <AvatarFallback>EC</AvatarFallback>
            </Avatar>

            <div className="text-center">
              <div className="font-medium">Dr. Emily Chen</div>
              <div className="text-xs text-muted-foreground">
                Clinical Psychologist, CBT Specialist
              </div>

              <div className="mt-3 flex items-center justify-center gap-3">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="size-3 fill-current" />{" "}
                  <span className="text-sm font-semibold">4.9</span>
                </div>
              </div>
            </div>

            <div className="w-full">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-primary text-primary"
              >
                <MessageSquare className="size-4 mr-2" /> Message
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 lg:col-span-4">
          <CardHeader>
            <CardTitle>Mental Health Plan</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">current plan</div>
              <div className="text-sm ">Cognitive Behavioral Therapy</div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div>Progress</div>
                <div className="font-medium">65%</div>
              </div>

              <div className="mt-2 h-2 bg-muted rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-dash"
                  style={{ width: "65%" }}
                />
              </div>

              <div className="mt-3 text-sm text-muted-foreground">
                Sessions
                <br />
                <span className="font-medium">13 of 20 completed</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 lg:col-span-4">
          <CardHeader>
            <CardTitle>Today&apos;s Focus</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Select>
              <SelectTrigger className="w-full bg-accent mt-5">
                <SelectValue placeholder="Select your mood" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="happy">Happy</SelectItem>
                <SelectItem value="anxious">Anxious</SelectItem>
                <SelectItem value="sad">Sad</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
              </SelectContent>
            </Select>

            <div className="rounded-lg bg-primary/10 p-3">
              <div className="text-sm ">Daily Reminder</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Take a moment to practice deep breathing
              </div>
            </div>

            <div>
              <Button size="lg" className="w-full bg-gradient-dash">
                Start Breathing Exercise
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Appointments + Active Prescriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Card className="">
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
          </CardHeader>

          <CardContent className="overflow-x-auto p-0">
            <table className="w-full">
              <thead className="text-sm text-muted-foreground">
                <tr className="border-b">
                  <th className="text-left py-4 pl-6">Therapist</th>
                  <th className="text-left py-4">Date</th>
                  <th className="text-left py-4">Time</th>
                  <th className="text-left py-4">Status</th>
                  <th className="text-left py-4 pr-6"> </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="py-4 pl-6">Dr. Emily Chen</td>
                  <td className="py-4">Jan 10, 2026</td>
                  <td className="py-4">2:00 PM</td>
                  <td className="py-4">
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-100">
                      Completed
                    </Badge>
                  </td>
                  <td className="py-4 pr-6">
                    <Link href="#" className="text-primary">
                      View
                    </Link>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="py-4 pl-6">Dr. Michael Ross</td>
                  <td className="py-4">Jan 8, 2026</td>
                  <td className="py-4">10:00 AM</td>
                  <td className="py-4">
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-100">
                      Completed
                    </Badge>
                  </td>
                  <td className="py-4 pr-6">
                    <Link href="#" className="text-primary">
                      View
                    </Link>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 pl-6">Dr. Sarah Miller</td>
                  <td className="py-4">Jan 5, 2026</td>
                  <td className="py-4">3:30 PM</td>
                  <td className="py-4">
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-100">
                      Completed
                    </Badge>
                  </td>
                  <td className="py-4 pr-6">
                    <Link href="#" className="text-primary">
                      View
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle>Active Prescriptions</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium">Sertraline 50mg</div>
                  <div className="text-sm text-muted-foreground">
                    1 tablet daily
                  </div>
                </div>
                <div>
                  <div className="rounded-full border px-2 py-1 text-xs">
                    2 refills
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 size-4" /> Download
                </Button>
                <Button className="bg-gradient-dash flex-1">
                  <RefreshCw className="mr-2 size-4" /> Refill
                </Button>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium">Alprazolam 0.5mg</div>
                  <div className="text-sm text-muted-foreground">As needed</div>
                </div>
                <div>
                  <div className="rounded-full border px-2 py-1 text-xs">
                    1 refills
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 size-4" /> Download
                </Button>
                <Button className="bg-gradient-dash flex-1">
                  <RefreshCw className="mr-2 size-4" /> Refill
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
