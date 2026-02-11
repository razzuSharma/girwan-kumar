"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card)] px-3 py-2 text-sm font-medium text-[var(--admin-text)] shadow-sm transition-all duration-200 hover:bg-[var(--admin-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)]"
    >
      Logout
    </button>
  );
}
