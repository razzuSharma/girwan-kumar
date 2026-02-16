"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  return (
    <Button
      type="button"
      onClick={handleLogout}
      variant="outline"
      className="w-full justify-start border-border/70 bg-background/80"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}
