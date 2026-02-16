  import { createClient as createSupabaseClient } from "@supabase/supabase-js";
  import { createServerClient } from "@supabase/ssr";
  import { cookies } from "next/headers";

  function getEnv() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Missing Supabase server environment variables.");
    }

    return { supabaseUrl, supabaseAnonKey, supabaseServiceRoleKey };
  }

  export async function createServerSupabase() {
    const { supabaseUrl, supabaseAnonKey } = getEnv();

    let store: Awaited<ReturnType<typeof cookies>> | null = null;
    try {
      store = await cookies();
    } catch {
      store = null;
    }

    return createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          if (!store) return [];
          return store.getAll();
        },
        setAll(
          cookiesToSet: Array<{
            name: string;
            value: string;
            options?: Parameters<Awaited<ReturnType<typeof cookies>>["set"]>[2];
          }>
        ) {
          if (!store) return;
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              store?.set(name, value, options);
            });
          } catch {
            // Server Components and some environments cannot set cookies; ignore.
          }
        },
      },
    });
  }

  export function createServiceSupabase() {
    const { supabaseUrl, supabaseServiceRoleKey } = getEnv();

    if (!supabaseServiceRoleKey) {
      throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY.");
    }

    return createSupabaseClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
