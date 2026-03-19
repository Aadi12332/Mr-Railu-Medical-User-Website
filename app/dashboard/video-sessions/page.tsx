import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock3, Video } from "lucide-react";

type SessionStatus = "startingSoon" | "upcoming";

interface VideoSession {
  id: string;
  providerName: string;
  specialty: string;
  initials: string;
  date: string;
  time: string;
  duration: string;
  status: SessionStatus;
  statusLabel: string;
}

const UPCOMING_SESSIONS: VideoSession[] = [
  {
    id: "1",
    providerName: "Dr. Emily Chen",
    specialty: "Clinical Psychologist",
    initials: "EC",
    date: "January 13, 2026",
    time: "2:00 PM",
    duration: "60 min",
    status: "startingSoon",
    statusLabel: "Starting in 5 min",
  },
  {
    id: "2",
    providerName: "Dr. Michael Ross",
    specialty: "Psychiatrist",
    initials: "MR",
    date: "January 15, 2026",
    time: "10:00 AM",
    duration: "45 min",
    status: "upcoming",
    statusLabel: "In 2 days",
  },
];

const statusColorMap: Record<SessionStatus, string> = {
  startingSoon: "bg-blue-100 text-blue-700",
  upcoming: "bg-blue-100 text-blue-700",
};

export default function page() {
  return (
    <div className="space-y-6 h-full">
      <div>
        <h1 className="text-2xl font-medium">Video Sessions</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Join your secure therapy sessions
        </p>
      </div>

      <Card className="bg-gradient-dash border-0 p-0 text-white">
        <div className="px-4 py-5 sm:px-6 sm:py-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-base font-medium">Next Session Starting Soon</p>
            <p className="mt-1 text-sm text-white/90">
              Your session with Dr. Emily Chen starts in 5 minutes
            </p>
            <Button
              variant="secondary"
              className="mt-4 bg-white text-primary hover:bg-white/90"
            >
              <Video className="size-4 mr-2" /> Join Session Now
            </Button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="size-20 md:size-24 rounded-full bg-white/20 flex items-center justify-center">
              <Clock3 className="size-10" />
            </div>
            <span className="text-xs text-white/90">00:05:23</span>
          </div>
        </div>
      </Card>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Upcoming Sessions</h2>

        <div className="space-y-3">
          {UPCOMING_SESSIONS.map((session) => (
            <Card key={session.id} className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <Avatar className="size-12 border border-slate-100 bg-white">
                    <AvatarFallback>{session.initials}</AvatarFallback>
                  </Avatar>

                  <div className="space-y-2">
                    <div>
                      <p className="text-base font-medium leading-none">
                        {session.providerName}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {session.specialty}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        {session.date}
                      </span>
                      <span>•</span>
                      <span>{session.time}</span>
                      <span>•</span>
                      <span>{session.duration}</span>
                    </div>

                    <Button
                      variant="outline"
                      className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                    >
                      <Video className="size-4 mr-2" /> Join Session
                    </Button>
                  </div>
                </div>

                <Badge className={statusColorMap[session.status]}>
                  {session.statusLabel}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Card className="rounded-lg border border-sky-200 bg-sky-50 p-6">
        <div className="flex flex-col items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-medium text-sky-800">Need Help?</h3>
            <p className="mt-1 text-sm text-sky-700">
              Make sure your camera and microphone are working properly before
              joining the session.
            </p>
          </div>

          <div>
            <Button
              variant="outline"
              className="border-sky-300 text-sky-700 hover:bg-sky-100 mt-3 sm:mt-0"
            >
              Test Audio & Video
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
