"use client"
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
import { useEffect, useState } from "react";
import { dashboardApi } from "@/api/dashboard.service";
import { RatingStars } from "@/components/ui/rating";


const SkeletonCard = () => (
  <Card className="p-4 animate-pulse">
    <div className="flex flex-col items-center text-center">
      <div className="size-20 rounded-full bg-gray-200" />

      <div className="mt-4 space-y-2 w-full">
        <div className="h-4 bg-gray-200 w-40 mx-auto rounded" />
        <div className="h-3 bg-gray-200 w-32 mx-auto rounded" />
      </div>

      <div className="mt-4 h-4 w-20 bg-gray-200 rounded" />

      <div className="mt-6 w-full flex justify-between">
        <div className="space-y-2">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>

        <div className="space-y-2">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="mt-6 w-full flex gap-2">
        <div className="h-10 w-full bg-gray-200 rounded" />
        <div className="h-10 w-full bg-gray-200 rounded" />
      </div>
    </div>
  </Card>
);
export default function page() {
const [role, setRole] = useState("");
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState("");
const [specialty, setSpecialty] = useState("all");
const [rating, setRating] = useState("any");
const [priceRange, setPriceRange] = useState("any");

  const handleMyProviders=async()=>{
    setLoading(true);
    try {
      const response = await dashboardApi.getMyProviders(role??"");
      const data = response.data;
      setProviders(data?.providers || []);
    } catch (error) {
      console.error("Error fetching providers:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
  handleMyProviders();
}, [role]);

useEffect(() => {
  setRole(localStorage.getItem("role") || "");
}, []);
const filteredProviders = providers.filter((p: any) => {
  const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
  const spec = p.specialty?.toLowerCase() || "";
const ratingValue = Number(p.rating || 0);
  const matchesSearch =
    fullName.includes(search.toLowerCase()) ||
    spec.includes(search.toLowerCase());

  const matchesSpecialty =
    specialty === "all" || spec.includes(specialty);

  const matchesRating =
    rating === "any" || ratingValue >= Number(rating);

    const matchesPriceRange =
    priceRange === "any" || (p.price ?? 0) >= Number(priceRange);

  return matchesSearch && matchesSpecialty && matchesRating && matchesPriceRange;
});
console.log({providers})
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
              value={search}
  onChange={(e) => setSearch(e.target.value)}

            />
          </InputGroup>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Select onValueChange={setSpecialty}>
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

          <Select onValueChange={setPriceRange}>
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

          <Select onValueChange={setRating}>
            <SelectTrigger className="w-40 bg-accent border-0">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="4">4.0+</SelectItem>
              <SelectItem value="4.5">4.5+</SelectItem>
              <SelectItem value="5">5.0</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Providers grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading
    ? Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))
    : filteredProviders.map((p: any) => (
  <Card key={p._id} className="p-4">
    <div className="flex flex-col items-center text-center">
      <Avatar className="size-20 border border-slate-100 bg-white shadow-sm">
        <AvatarFallback>
          {`${p?.firstName?.[0] || ""}${p?.lastName?.[0] || ""}`}
        </AvatarFallback>
      </Avatar>

      <div className="mt-4">
        <div className="text-sm font-semibold">
          Dr. {p?.firstName} {p?.lastName}
        </div>

        <div className="text-xs text-muted-foreground">
          {p?.specialty || "Specialist"}
        </div>

        <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground justify-center">
          <div className="flex items-center gap-2">
            <Star className="size-3 text-amber-400 fill-current" />
            <RatingStars rating={p?.rating ?? 0}/>
            <span className="font-semibold text-sm">
              {p?.rating ?? 0}
            </span>
          </div>
        </div>

        <Badge className="mt-3 rounded-full bg-emerald-100 text-emerald-700 border-emerald-100 px-3 py-1 text-xs">
          Available Today
        </Badge>
      </div>

      <div className="mt-6 w-full flex items-center justify-between text-sm text-muted-foreground">
        <div className="space-y-1">
          <div>Experience</div>
          <div>Session Fee</div>
        </div>

        <div className="text-right space-y-1">
          <div className="font-medium">
            {p?.experience ? `${p.experience} years` : "-"}
          </div>
          <div className="font-medium">$100</div>
        </div>
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
      {!filteredProviders.length && (
  <p className="text-center text-sm text-muted-foreground">
    No providers found
  </p>
)}
    </div>
  );
}
