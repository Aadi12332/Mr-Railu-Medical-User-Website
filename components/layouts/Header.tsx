"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/medical-health-tele-logo.png";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";

import userIcon from "@/assets/icons/user-icon.svg";
import { useEffect, useState } from "react";
import { publicPageApi } from "@/api/publicpage.api";

export function Header() {
  
  const [navTeams,setNavTeams]=useState([])
  const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const fetchPolicy = async () => {
      setLoading(true);
      setError(null);
    
      try {
        const res = await publicPageApi.getConditions(); // 👈 API bana lena
       const pages = res?.data?.pages || [];

const conditionItems = pages.map((item: any) => ({
  label: item.name,
  to: `/conditions/${item.slug}`,
}));

setNavTeams(conditionItems);
      } catch (err: any) {
        setError(err?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    
    useEffect(() => {
      fetchPolicy();
    }, []);
 
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
 const navItems = [
    {
      label: "Conditions",
      to: "/conditions",
         items: navTeams.length ? navTeams : [],

    },
    {
      label: "Services",
      to: "/services",
      items: [
        { label: "Medication Refill", to: "/services/medication-refill" },
        {
          label: "Treatments Management",
          to: "/services/treatments-management",
        },
        { label: "Work Excuse Letter", to: "/services/work-excuse-letter" },
      ],
    },
    { label: "Blog", to: "/blog", items: [{ label: "Latest", to: "/blog" }] },
    {
      label: "Company",
      to: "/about",
      items: [
        { label: "About Us", to: "/about" },
        { label: "Careers", to: "/careers" },
        { label: "Contact Us", to: "/contact" },
        { label: "Providers", to: "/providers" },
        { label: "Reviews", to: "/reviews" },
      ],
    },
    { label: "FAQs", to: "/faqs", items: [{ label: "General", to: "/faqs" }] },
  ];

  return (
    <header>
      <div className="container mx-auto flex items-center justify-between gap-6 px-4 py-4">
        {/* mobile hamburger */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="p-2">
                <Menu />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[75vw] p-4">
              <nav className="flex flex-col gap-3">
                {navItems.map((nav) => {
                  const itemActive = pathname?.startsWith(nav.to);
                  return (
                    <div key={nav.label}>
                      <Link
                        href={nav.to}
                        className={cn(
                          "block font-medium",
                          itemActive && "text-primary",
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        {nav.label}
                      </Link>
                      {nav.items && nav.items.length > 0 && (
                        <div className="ml-4 mt-1 flex flex-col gap-1">
                          {nav.items.map((sub) => (
                            <Link
                              key={sub.to}
                              href={sub.to}
                              className={cn(
                                "block text-sm",
                                pathname?.startsWith(sub.to) && "text-primary",
                              )}
                              onClick={() => setMobileOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
              <div className="mt-6 flex flex-col gap-2">
                <Link href="/signin" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-accent text-primary">
                    <Image src={userIcon} alt="User Icon" className="size-4" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/onboarding" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-gradient-primary">
                    Get Started
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logo}
            alt="Mental Health Tele logo"
            className="sm:h-9 h-6 w-auto"
          />
        </Link>

        <nav className="hidden md:flex flex-1 items-center justify-center gap-4">
          {navItems.map((nav) => {
            const navActive = pathname?.startsWith(nav.to);

            return (
              <DropdownMenu key={nav.label}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn("px-3", navActive && "")}
                  >
                    <span className="mr-2">{nav.label}</span>
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start" className="w-48">
                  {nav.items.map((item) => {
                    const itemActive = pathname?.startsWith(item.to);

                    return (
                      <Link
                        key={item.to}
                        className={cn(itemActive && "text-primary")}
                        href={item.to}
                      >
                        <DropdownMenuItem>{item.label}</DropdownMenuItem>
                      </Link>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          })}
        </nav>

        <div className="ml-auto hidden md:flex items-center gap-2">
          <Link href="/signin">
            <Button className="bg-accent ">
              <Image src={userIcon} alt="User Icon" className="size-4" />

              <span className="text-gradient bg-gradient-primary">Sign In</span>
            </Button>
          </Link>

          <Link href="/onboarding">
            <Button className="bg-gradient-primary">
              Get Started
              <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
      <Separator />
    </header>
  );
}
