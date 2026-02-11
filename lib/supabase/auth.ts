import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";

export async function requireUser() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect("/admin/login");
  }

  return { supabase, user: data.user };
}

export async function getOptionalUser() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getUser();
  return { supabase, user: data.user ?? null };
}
