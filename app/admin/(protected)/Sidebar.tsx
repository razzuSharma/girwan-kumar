"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/app/components/ThemeToggle";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 13h8V3H3z" />
        <path d="M13 21h8v-8h-8z" />
        <path d="M13 3h8v8h-8z" />
        <path d="M3 21h8v-8H3z" />
      </svg>
    ),
  },
  {
    href: "/admin/profile",
    label: "Profile",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
      </svg>
    ),
  },
  {
    href: "/admin/posts",
    label: "Posts",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-[var(--admin-muted)]">Admin</p>
          <h2 className="mt-2 text-lg font-semibold text-[var(--admin-text)]">Doctor Panel</h2>
        </div>
        <ThemeToggle />
      </div>
      <nav className="space-y-2 text-sm">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition-all duration-200 hover:bg-[var(--admin-soft)] ${
                isActive ? "bg-[var(--admin-soft)] text-[var(--admin-accent)]" : "text-[var(--admin-text)]"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
