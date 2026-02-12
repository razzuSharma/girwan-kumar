import Image from "next/image";
import { requireUser } from "@/lib/supabase/auth";

export default async function AdminDashboardPage() {
  const { supabase, user } = await requireUser();

  const { data: profile } = await supabase
    .from("profile")
    .select("avatar_url, address, updated_at, full_name, specialty, clinic_name, phone")
    .eq("id", user.id)
    .maybeSingle();

  const { count: postCount } = await supabase
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  const completionFields = [
    profile?.full_name,
    profile?.specialty,
    profile?.clinic_name,
    profile?.phone,
    profile?.address,
    profile?.avatar_url,
  ];
  const completedCount = completionFields.filter(Boolean).length;
  const completionPercent = Math.round((completedCount / completionFields.length) * 100);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-wide text-[var(--admin-muted)]">Overview</p>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--admin-text)]">Dashboard</h1>
            <p className="mt-2 text-sm text-[var(--admin-muted)]">
              A calm, professional view of your clinic and content.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/admin/profile"
              className="rounded-lg bg-[var(--admin-accent)] px-4 py-2 text-sm font-medium text-[var(--admin-accent-contrast)] shadow-sm transition-all duration-200 hover:bg-[var(--admin-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)]"
            >
              Update Profile
            </a>
            <a
              href="/admin/posts/new"
              className="rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card)] px-4 py-2 text-sm font-medium text-[var(--admin-text)] shadow-sm transition-all duration-200 hover:bg-[var(--admin-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)]"
            >
              New Post
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
          <p className="text-sm uppercase tracking-wide text-[var(--admin-muted)]">Total Posts</p>
          <p className="mt-3 text-4xl font-bold text-[var(--admin-text)]">{postCount ?? 0}</p>
          <p className="mt-1 text-sm text-[var(--admin-muted)]">Published updates</p>
        </div>
        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
          <p className="text-sm uppercase tracking-wide text-[var(--admin-muted)]">Profile Completion</p>
          <p className="mt-3 text-4xl font-bold text-[var(--admin-text)]">{completionPercent}%</p>
          <p className="mt-1 text-sm text-[var(--admin-muted)]">
            {completedCount}/{completionFields.length} fields completed
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-[var(--admin-muted)]">Clinic Status</p>
              <p className="mt-3 text-lg font-semibold text-[var(--admin-text)]">Open for Appointments</p>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">Sun–Fri · 9 AM–5 PM</p>
            </div>
            <span className="rounded-full bg-[var(--admin-success-bg)] px-3 py-1 text-xs font-medium text-[var(--admin-success-text)]">
              Active
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-[var(--admin-muted)]">Profile Summary</p>
              <h2 className="mt-2 text-lg font-semibold text-[var(--admin-text)]">Doctor Profile</h2>
            </div>
            <span className="rounded-full bg-[var(--admin-success-bg)] px-3 py-1 text-xs font-medium text-[var(--admin-success-text)]">
              Verified
            </span>
          </div>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-[var(--admin-soft)]">
              {profile?.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt="Avatar"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-[var(--admin-muted)]">
                  No Avatar
                </div>
              )}
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-sm uppercase tracking-wide text-[var(--admin-muted)]">Name</p>
                <p className="mt-1 text-sm text-[var(--admin-text)]">
                  {profile?.full_name ?? user.email ?? "Add your name in profile settings."}
                </p>
              </div>
              <div className="grid gap-4 text-sm text-[var(--admin-muted)] sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--admin-muted)]">Specialty</p>
                  <p className="mt-1 text-sm text-[var(--admin-text)]">
                    {profile?.specialty ?? "Add specialty"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--admin-muted)]">Clinic</p>
                  <p className="mt-1 text-sm text-[var(--admin-text)]">
                    {profile?.clinic_name ?? "Add clinic name"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[var(--admin-muted)]">Address</p>
                <p className="mt-1 text-sm text-[var(--admin-text)]">
                  {profile?.address ? profile.address : "Add your address in profile settings."}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-[var(--admin-muted)]">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--admin-muted)]">Last Updated</p>
                  <p className="mt-1 text-sm text-[var(--admin-text)]">
                    {profile?.updated_at
                      ? new Date(profile.updated_at).toLocaleDateString()
                      : "Not updated yet"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--admin-muted)]">Phone</p>
                  <p className="mt-1 text-sm text-[var(--admin-text)]">
                    {profile?.phone ?? "Add phone"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--admin-muted)]">Status</p>
                  <span className="mt-1 inline-block rounded-full bg-[var(--admin-success-bg)] px-3 py-1 text-xs font-medium text-[var(--admin-success-text)]">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-[var(--admin-muted)]">Posts</p>
              <p className="mt-2 text-4xl font-bold text-[var(--admin-text)]">{postCount ?? 0}</p>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">Total posts</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--admin-soft)] text-[var(--admin-accent)]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            </div>
          </div>
          <a
            href="/admin/posts/new"
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-[var(--admin-accent)] px-4 py-2 text-sm font-medium text-[var(--admin-accent-contrast)] shadow-sm transition-all duration-200 hover:bg-[var(--admin-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)]"
          >
            Create Post
          </a>
        </div>
      </div>
    </div>
  );
}
