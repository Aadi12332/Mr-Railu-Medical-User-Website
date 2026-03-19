"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateSupportTicketDialog from "@/components/dashboard/CreateSupportTicketDialog";
import { CircleHelp, MessageSquare, Plus, Square } from "lucide-react";

type Ticket = {
  title: string;
  category: "Technical" | "Billing" | "Medical";
  status: "Open" | "In Progress" | "Resolved";
  priority: "High" | "Medium" | "Low";
  createdDate: string;
  updatedAgo: string;
  messagesCount: number;
};

const tickets: Ticket[] = [
  {
    title: "Unable to join video session",
    category: "Technical",
    status: "Open",
    priority: "High",
    createdDate: "Jan 11, 2026",
    updatedAgo: "2 hours ago",
    messagesCount: 3,
  },
  {
    title: "Question about insurance coverage",
    category: "Billing",
    status: "In Progress",
    priority: "Medium",
    createdDate: "Jan 9, 2026",
    updatedAgo: "1 day ago",
    messagesCount: 5,
  },
  {
    title: "Treatments refill request",
    category: "Medical",
    status: "Resolved",
    priority: "Low",
    createdDate: "Jan 5, 2026",
    updatedAgo: "4 days ago",
    messagesCount: 2,
  },
];

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

            <CardContent className="space-y-3">
              {tickets.map(function renderTicket(ticket) {
                return (
                  <div key={ticket.title} className="rounded-lg border p-3">
                    <div className="text-sm font-medium">{ticket.title}</div>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <Badge
                        variant="outline"
                        className="h-5 px-1.5 text-[10px]"
                      >
                        {ticket.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`h-5 px-1.5 text-[10px] ${statusColorMap[ticket.status]}`}
                      >
                        {ticket.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`h-5 px-1.5 text-[10px] ${priorityColorMap[ticket.priority]}`}
                      >
                        {ticket.priority}
                      </Badge>
                    </div>

                    <div className="mt-3 flex items-end justify-between gap-2 text-xs text-muted-foreground">
                      <span>Created {ticket.createdDate}</span>
                      <div className="flex items-center gap-3">
                        <span>Updated {ticket.updatedAgo}</span>
                        <span className="inline-flex items-center gap-1">
                          <MessageSquare className="size-3" />{" "}
                          {ticket.messagesCount} messages
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
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
                <Button
                  size="sm"
                  className="mt-3 w-full bg-red-600 text-white hover:bg-red-600/90"
                >
                  Emergency Resources
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <CreateSupportTicketDialog
        open={isTicketDialogOpen}
        onOpenChange={handleDialogChange}
      />
    </>
  );
}
