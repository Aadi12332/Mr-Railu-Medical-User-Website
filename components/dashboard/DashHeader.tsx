"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Search } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { useState } from "react";
import NotificationDrawer from "./NotificationDrawer";
import { useAuth } from "../context/auth.context";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function DashHeader() {
  const { user } = useAuth();
  const router=useRouter();
  const pathName=usePathname();
  const hidePath=["/dashboard/messages","/dashboard/providers","/dashboard/settings"]
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <header className="w-full">
      <div className="container mx-auto flex items-center justify-between gap-6 px-4 py-4">
        <div className="flex-1 flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
        {hidePath.includes(pathName) ? null : <InputGroup className=" max-w-sm h-10 border bg-muted/70 shadow-none">
            <InputGroupAddon className="pl-4">
              <Search className="size-4 text-muted-foreground" />
            </InputGroupAddon>

            <InputGroupInput
              placeholder="Search therapist, appointment, prescription..."
              className="pr-4"
              value={search}
              onChange={handleSearch}
            />
          </InputGroup>}
        </div>

        <div className="flex items-center gap-5">
          <NotificationDrawer />

          <div className="flex items-center gap-3 cursor-pointer" onClick={()=>router.push("/dashboard/settings")}>
            <Avatar className="size-10 border border-slate-100 bg-white">
              <AvatarFallback>{user?.firstName?.charAt(0) || ""}{user?.lastName?.charAt(0) || ""}</AvatarFallback>
            </Avatar>

            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-semibold">{user?.firstName} {user?.lastName}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
