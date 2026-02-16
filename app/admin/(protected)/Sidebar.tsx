"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  LayoutGrid,
  PencilLine,
  Stethoscope,
  UserRound,
} from "lucide-react";
import ThemeToggle from "@/app/components/ThemeToggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutGrid,
  },
  {
    href: "/admin/profile",
    label: "Profile",
    icon: UserRound,
  },
  {
    href: "/admin/posts",
    label: "Posts",
    icon: PencilLine,
  },
  {
    href: "/admin/appointments",
    label: "Appointments",
    icon: CalendarCheck,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Card className="overflow-hidden border-border/70 shadow-md">
      <CardHeader className="space-y-4 border-b bg-muted/30 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Control Panel</p>
            <CardTitle className="mt-2 flex items-center gap-2 text-lg">
              <Stethoscope className="h-4 w-4 text-primary" />
              Doctor Admin
            </CardTitle>
          </div>
          <ThemeToggle />
        </div>
      </CardHeader>

      <CardContent className="space-y-2 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg border px-3 py-2 text-sm font-medium transition-all",
                isActive
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/60 hover:text-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
              {item.label}
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
