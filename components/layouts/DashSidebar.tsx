"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/medical-health-tele-logo.png";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LayoutGrid,
  Search,
  Calendar,
  Video,
  Pill,
  CreditCard,
  MessageSquare,
  HelpCircle,
  Settings,
  LogOutIcon,
} from "lucide-react";
import { authApi } from "@/api/auth.api";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SIDEBAR_MENU = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { href: "/dashboard/providers", icon: Search, label: "Find Providers" },
  { href: "/dashboard/appointments", icon: Calendar, label: "Appointments" },
  { href: "/dashboard/video-sessions", icon: Video, label: "Audio/Video Sessions" },
  { href: "/dashboard/prescriptions", icon: Pill, label: "Prescriptions" },
  { href: "/dashboard/payments", icon: CreditCard, label: "Payments" },
  { href: "/dashboard/messages", icon: MessageSquare, label: "Messages" },
  { href: "/dashboard/support", icon: HelpCircle, label: "Support" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  { href: "/patient-login", icon: LogOutIcon, label: "Logout" },
];

export default function DashSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openLogout, setOpenLogout] = React.useState(false);

  function isMenuActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const handleLogout = async () => {
    try {
      await authApi.patientLogout();
    } catch {}
    localStorage.clear();
    router.push("/patient-login");
  };

  return (
    <Sidebar side="left">
      <SidebarHeader className="border-b p-3 mb-5">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image src={logo} alt="Mental Health Tele" className="h-9 w-auto" />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="space-y-1">
          {SIDEBAR_MENU.map(({ href, icon: Icon, label }) => {
            const isActive = isMenuActive(href);
            const isLogout = label === "Logout";

            if (isLogout) {
              return (
                <SidebarMenuItem key={href}>
                  <div onClick={() => setOpenLogout(true)} className="w-full">
                    <SidebarMenuButton
                      className={cn(
                        "h-10 rounded-none",
                        "hover:bg-red-50 !text-red-500 [&_svg]:text-red-500"
                      )}
                    >
                      <Icon />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </div>
                </SidebarMenuItem>
              );
            }

            return (
              <SidebarMenuItem key={href}>
                <Link href={href}>
                  <SidebarMenuButton
                    className={cn(
                      "h-10 rounded-none",
                      isActive && "bg-gradient-dash text-white!"
                    )}
                  >
                    <Icon />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <div className="mt-auto">
        <SidebarSeparator />
        <SidebarFooter className="px-4 py-3 text-sm text-muted-foreground">
          © 2026 MindCare
        </SidebarFooter>
      </div>

      <Dialog open={openLogout} onOpenChange={setOpenLogout}>
        <DialogContent className="max-w-sm rounded-xl p-6">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground mt-2">
            Are you sure you want to logout?
          </p>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setOpenLogout(false)}
              className="flex-1 h-10 rounded-lg border"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 h-10 rounded-lg bg-red-500 text-white"
            >
              Confirm
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </Sidebar>
  );
}