"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Shield,
  Users,
  Database,
  Lock,
  Mail,
  Bell,
} from "lucide-react";

export default function HIPAANoticeContent({ data }: any) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sections =
    data
      ?.slice()
      ?.sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)) || [];

const grouped: any[] = [];
let current: any = null;

sections.forEach((item: any) => {
  const heading = item?.heading?.trim();

  if (!heading) {
    if (current && item?.body) {
      current.content.push(item.body);
    }
    return;
  }

  const isMainSection =
    /^article\s+/i.test(heading) ||
    /^our introduction$/i.test(heading) ||
    /^services and features$/i.test(heading);

  if (isMainSection) {
    if (current) {
      grouped.push(current);
    }

    current = {
      id: heading.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"),
      title: heading,
      content: item?.body ? [item.body] : [],
    };

    return;
  }

  if (current) {
    current.content.push(
      item?.body ? `${heading} ${item.body}` : heading
    );
  } else {
    grouped.push({
      id: heading.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"),
      title: heading,
      content: item?.body ? [item.body] : [],
    });
  }
});

if (current) {
  grouped.push(current);
}

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    grouped.forEach((s: any) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [grouped]);

  const icons = [FileText, Shield, Users, Database, Lock, Mail, Bell];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 lg:flex lg:space-x-8">
      <aside className="hidden lg:block lg:w-72 sticky top-24 h-fit">
        <Card className="p-5 gap-0 shadow-sm">
          <h3 className="font-semibold mb-4 text-lg">Table of Contents</h3>

          <ul className="space-y-1">
            {grouped.map((t: any, i: number) => {
              const Icon = icons[i] || FileText;

              return (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className={cn(
                      "flex items-center text-sm rounded-xl px-4 py-2.5",
                      activeId === t.id
                        ? "bg-gradient-primary text-white"
                        : "text-muted-foreground"
                    )}
                  >
                    <Icon className="size-4 mr-2 min-w-4" />
                    {t.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </Card>
      </aside>

      <div className="flex-1 space-y-6">
        {grouped.map((sec: any, i: number) => {
          const Icon = icons[i] || FileText;

          return (
            <section key={sec.id} id={sec.id}>
              <Card className="p-6 shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">{sec.title}</h2>
                </div>

                <div className="space-y-2">
                  {sec.content.map((c: string, idx: number) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      {c}
                    </p>
                  ))}
                </div>
              </Card>
            </section>
          );
        })}
      </div>
    </div>
  );
}