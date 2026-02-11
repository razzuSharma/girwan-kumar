"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      style={{
        backgroundColor: theme === "dark" ? "hsl(var(--primary))" : "hsl(var(--border))",
      }}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={theme === "dark"}
    >
      <span className="absolute inset-0 flex items-center justify-between px-1.5">
        <svg
          className="w-4 h-4 text-amber-500 transition-opacity duration-300"
          style={{ opacity: theme === "light" ? 1 : 0.3 }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>

        <svg
          className="w-4 h-4 text-slate-300 transition-opacity duration-300"
          style={{ opacity: theme === "dark" ? 1 : 0.3 }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>

      <span
        className="inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300"
        style={{
          transform: theme === "dark" ? "translateX(26px)" : "translateX(4px)",
        }}
      >
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-3 h-3"
            style={{ color: "hsl(var(--primary))" }}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </span>
      </span>
    </button>
  );
}
