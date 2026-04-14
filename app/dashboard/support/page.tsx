"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateSupportTicketDialog from "@/components/dashboard/CreateSupportTicketDialog";
import { CircleHelp, MessageSquare, Plus, Square } from "lucide-react";
import { useEffect } from "react";
import { settingApi } from "@/api/setting.api";
import EmergencyButton from "@/components/dashboard/EmergencyButton";

type Ticket = {
  id: string;
  title: string;
  category: "Technical" | "Billing" | "Medical";
  status: "Open" | "In Progress" | "Resolved";
  priority: "High" | "Medium" | "Low";
  createdDate: string;
  updatedAgo: string;
  messagesCount: number;
};

const statusColorMap: Record<Ticket["status"], string> = {
  Open: "bg-blue-50 text-blue-700 border-blue-100",
  "In Progress": "bg-amber-50 text-amber-700 border-amber-100",
  Resolved: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

const priorityColorMap: Record<Ticket["priority"], string> = {
  High: "bg-rose-50 text-rose-700 border-rose-100",
  Medium: "bg-amber-50 text-amber-700 border-amber-100",
  Low: "bg-slate-100 text-slate-600 border-slate-200",
};

export default function SupportPage() {
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState<boolean>(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchTickets = async () => {
    if (typeof window === "undefined") return;
    const token = window.localStorage.getItem("patientToken");
    if (!token) return;
    setLoading(true);

    try {
      const res = await settingApi.getSupport("patient");

      if (res?.data?.tickets) {
        setTickets(res.data.tickets.map(transformTicket));
      }
    } catch (err) {
      console.error("Error fetching tickets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const mapStatus = (status: string): Ticket["status"] => {
    if (status === "open") return "Open";
    if (status === "in-progress") return "In Progress";
    return "Resolved";
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const transformTicket = (t: any): Ticket => ({
    id: t._id,
    title: t.subject,
    category: capitalize(t.category) as Ticket["category"],
    status: mapStatus(t.status),
    priority: capitalize(t.priority) as Ticket["priority"],
    createdDate: formatDate(t.createdAt),
    updatedAgo: timeAgo(t.updatedAt),
    messagesCount: t.replies?.length || 0,
  });

  function openTicketDialog() {
    setIsTicketDialogOpen(true);
  }

  function handleDialogChange(open: boolean) {
    setIsTicketDialogOpen(open);
  }

  return (
    <>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-medium leading-tight">Support Center</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Get help and answers to your questions
          </p>
        </div>

        <Card className="overflow-hidden border-0 bg-gradient-dash text-white">
          <CardContent className="flex items-center justify-between gap-4 p-5">
            <div>
              <h2 className="text-base font-medium">Need Immediate Help?</h2>
              <p className="mt-1 text-sm text-white/90">
                Our support team is available 24/7 to assist you
              </p>

              <div className="mt-3 flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={openTicketDialog}
                  className="bg-white text-primary hover:bg-white/95"
                >
                  <Plus className="mr-1 size-4" /> Create Support Ticket
                </Button>
                <Button
                  size="sm"
                  className="bg-white text-primary hover:bg-white/95"
                >
                  <Square className="mr-1 size-3" /> Live Chat
                </Button>
              </div>
            </div>

            <div className="hidden h-14 w-14 items-center justify-center rounded-full border-4 border-white/30 sm:flex">
              <CircleHelp className="size-7 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-medium">
                My Support Tickets
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={openTicketDialog}
                className="border-primary/50 text-primary hover:bg-primary/5"
              >
                <Plus className="mr-1 size-3" /> New Ticket
              </Button>
            </CardHeader>

            <CardContent className="space-y-3 max-h-175 overflow-auto">
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
                </div>
              ) : tickets.length === 0 ? (
                <p className="text-center text-sm text-gray-500 py-10">
                  No tickets found
                </p>
              ) : (
                tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="rounded-lg lg:rounded-xl p-3 lg:p-6 border bg-white"
                  >
                    <div className="text-sm font-medium">{ticket.title}</div>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700">
                        {ticket.category}
                      </span>

                      <span
                        className={`text-xs px-2 py-1 rounded-md ${statusColorMap[ticket.status]}`}
                      >
                        {ticket.status}
                      </span>

                      <span
                        className={`text-xs px-2 py-1 rounded-md ${priorityColorMap[ticket.priority]}`}
                      >
                        {ticket.priority}
                      </span>
                    </div>

                    <div className="mt-4 flex items-end justify-between text-xs text-muted-foreground">
                      <span>Created {ticket.createdDate}</span>

                      <div className="flex items-center gap-4">
                        <span>Updated {ticket.updatedAgo}</span>

                        <span className="flex items-center gap-1">
                          <MessageSquare className="size-3" />
                          {ticket.messagesCount}
                          <span className="ml-1">messages</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Email Support</p>
                  <p className="font-medium">support@mindcare.com</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Phone Support</p>
                  <p className="font-medium">1-800-MINDCARE</p>
                  <p className="text-xs text-muted-foreground">
                    Available 24/7
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">Response Time</p>
                  <p className="font-medium">Within 2 hours</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/25 bg-destructive/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-destructive">
                  Crisis Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-destructive">
                  If you&apos;re in crisis, please call 988 (Suicide &amp;
                  Crisis Lifeline) or 911 immediately.
                </p>
                <EmergencyButton />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <CreateSupportTicketDialog
        open={isTicketDialogOpen}
        onOpenChange={handleDialogChange}
        onSuccess={fetchTickets}
      />
    </>
  );
}
