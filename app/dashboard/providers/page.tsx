import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Star, Search } from "lucide-react";
import BookAppointmentDialog from "@/components/dashboard/BookAppointmentDialog";
import PaymentDialog from "@/components/dashboard/PaymentDialog";
import { Button } from "@/components/ui/button";

const PROVIDERS = [
  {
    id: "emily-chen",
    name: "Dr. Emily Chen",
    specialty: "Clinical Psychologist",
    rating: 4.9,
    reviews: 127,
    years: 12,
    fee: "$120/hour",
    tags: ["CBT", "Anxiety", "Depression"],
    available: "Today",
    initials: "EC",
  },
  {
    id: "michael-ross",
    name: "Dr. Michael Ross",
    specialty: "Psychiatrist",
    rating: 4.8,
    reviews: 95,
    years: 15,
    fee: "$150/hour",
    tags: ["PTSD", "Trauma", "Medication"],
    available: "Tomorrow",
    initials: "MR",
  },
  {
    id: "sarah-miller",
    name: "Dr. Sarah Miller",
    specialty: "Dermatologist",
    rating: 4.9,
    reviews: 143,
    years: 10,
    fee: "$100/hour",
    tags: ["Relationship", "Family", "Stress"],
    available: "Today",
    initials: "SM",
  },
  {
    id: "alex-khan",
    name: "Dr. Alex Khan",
    specialty: "Cardiologist",
    rating: 4.7,
    reviews: 68,
    years: 9,
    fee: "$140/hour",
    tags: ["Cardio", "Wellness"],
    available: "Tomorrow",
    initials: "AK",
  },
  {
    id: "rachel-lee",
    name: "Dr. Rachel Lee",
    specialty: "Clinical Psychologist",
    rating: 4.8,
    reviews: 84,
    years: 7,
    fee: "$110/hour",
    tags: ["CBT", "Mood"],
    available: "Today",
    initials: "RL",
  },
  {
    id: "david-santos",
    name: "Dr. David Santos",
    specialty: "Psychiatrist",
    rating: 4.6,
    reviews: 52,
    years: 11,
    fee: "$130/hour",
    tags: ["Medication", "Anxiety"],
    available: "Tomorrow",
    initials: "DS",
  },
];

export default function page() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium">Find Providers</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Connect with qualified healthcare providers and specialists
          </p>
        </div>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col  gap-3">
        <div className="flex-1">
          <InputGroup className="bg-accent border-0 h-10">
            <InputGroupAddon>
              <Search className="size-4 text-muted-foreground" />
            </InputGroupAddon>

            <InputGroupInput
              type="search"
              placeholder="Search by name, specialty, or condition..."
              aria-label="Search providers"
            />
          </InputGroup>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Select>
            <SelectTrigger className="w-40 bg-accent border-0">
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="psychology">Psychology</SelectItem>
              <SelectItem value="psychiatry">Psychiatry</SelectItem>
              <SelectItem value="dermatology">Dermatology</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-40 bg-accent border-0">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="0-100">$0 - $100</SelectItem>
              <SelectItem value="100-150">$100 - $150</SelectItem>
              <SelectItem value="150+">$150+</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-40 bg-accent border-0">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="4+">4.0+</SelectItem>
              <SelectItem value="4.5+">4.5+</SelectItem>
              <SelectItem value="5">5.0</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Providers grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROVIDERS.map((p) => (
          <Card key={p.id} className="p-4">
            <div className="flex flex-col items-center text-center">
              <Avatar className="size-20 border border-slate-100 bg-white shadow-sm">
                <AvatarFallback>{p.initials}</AvatarFallback>
              </Avatar>

              <div className="mt-4">
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="text-xs text-muted-foreground">
                  {p.specialty}
                </div>

                <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground justify-center">
                  <div className="flex items-center gap-2">
                    <Star className="size-3 text-amber-400 fill-current" />
                    <span className="font-semibold text-sm">{p.rating}</span>
                    <a href="#" className="text-xs text-sky-600 ml-1">
                      ({p.reviews} reviews)
                    </a>
                  </div>
                </div>

                <Badge className="mt-3 rounded-full bg-emerald-100 text-emerald-700 border-emerald-100 px-3 py-1 text-xs">
                  Available {p.available}
                </Badge>
              </div>

              <div className="mt-6 w-full flex items-center justify-between text-sm text-muted-foreground">
                <div className="space-y-1">
                  <div className="">Experience</div>
                  <div className="">Session Fee</div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-medium">{p.fee}</div>
                  <div className="font-medium">{p.years} years</div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2  w-full">
                {p.tags.map((t) => (
                  <div
                    key={t}
                    className="rounded-full border px-2 py-1 text-xs bg-white"
                  >
                    {t}
                  </div>
                ))}
              </div>

              <div className="mt-6 w-full flex gap-2">
                <div className="flex-1">
                  <BookAppointmentDialog provider={p} />
                </div>
                <PaymentDialog>
                  <Button variant="outline" className="w-full flex-1">
                    Pay
                  </Button>
                </PaymentDialog>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
