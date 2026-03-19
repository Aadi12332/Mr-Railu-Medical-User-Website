import React from "react";
import DashHeader from "@/components/dashboard/DashHeader";
import DashSidebar from "@/components/layouts/DashSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="font-serif">
      <DashSidebar />

      <SidebarInset>
        <DashHeader />
        <div className="container mx-auto bg-[#F9FAFB] px-4 py-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
