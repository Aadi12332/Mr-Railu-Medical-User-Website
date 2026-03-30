"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/medical-health-tele-logo.png";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

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

const SIDEBAR_MENU = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard", isActive: true },
  { href: "/dashboard/providers", icon: Search, label: "Find Providers" },
  { href: "/dashboard/appointments", icon: Calendar, label: "Appointments" },
  { href: "/dashboard/video-sessions", icon: Video, label: "Video Sessions" },
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
  function isMenuActive(href: string) {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

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
                  <button
                    onClick={async () => {
                      const role = typeof localStorage !== 'undefined' ? localStorage.getItem("role") : null;
                      const loginPath = role === "Patient" ? "/patient-login" : "/provider-login";

                      try {
                        await authApi.patientLogout();
                        localStorage.removeItem("role");
                      } catch { }
                      localStorage.clear();
                      router.push(loginPath);
                    }}
                    className="w-full"
                  >
                    <SidebarMenuButton
                      className={cn(
                        "h-10 rounded-none",
                        "hover:bg-red-50 text-red-500 [&_svg]:text-red-500 hover:text-red-600 focus:!text-red-600"
                      )}
                    >
                      <Icon />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </button>
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
                    isActive={isActive}
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
    </Sidebar>
  );
}
