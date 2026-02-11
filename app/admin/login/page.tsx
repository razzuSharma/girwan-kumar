import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { getOptionalUser } from "@/lib/supabase/auth";

export default async function AdminLoginPage() {
  const { user } = await getOptionalUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-background-soft flex items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-md overflow-hidden rounded-[2.75rem] border border-border bg-background p-8 shadow-sm">
        <div className="absolute -right-24 -top-24 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
        <div className="absolute -left-24 -bottom-24 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />

        <div className="relative z-10 mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background-soft px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-foreground-subtle">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Admin Access
          </div>
          <h1 className="text-3xl font-semibold text-foreground">Welcome, Doctor</h1>
          <p className="text-sm text-foreground-muted">Sign in to manage your profile and posts.</p>
        </div>

        <div className="relative z-10">
          <div className="mb-6 flex items-center gap-4 rounded-3xl border border-border bg-background-soft px-4 py-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
                <path d="M12 8v6" />
                <path d="M9 11h6" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Secure Sign In</p>
              <p className="text-xs text-foreground-subtle">Single-user admin access</p>
            </div>
          </div>
          <LoginForm />
          <p className="mt-6 text-center text-xs text-foreground-subtle">
            Welcome doctor and user.
          </p>
        </div>
      </div>
    </div>
  );
}
