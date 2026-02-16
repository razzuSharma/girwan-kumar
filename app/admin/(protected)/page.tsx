import Image from "next/image";
import Link from "next/link";
import { Activity, ClipboardList, FileText, Sparkles, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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

  const stats = [
    {
      label: "Posts",
      value: postCount ?? 0,
      note: "Total published content",
      icon: FileText,
    },
    {
      label: "Profile Completion",
      value: `${completionPercent}%`,
      note: `${completedCount}/${completionFields.length} fields completed`,
      icon: UserRound,
    },
    {
      label: "Clinic Status",
      value: "Active",
      note: "Sun-Fri, 9 AM-5 PM",
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-border/70 bg-gradient-to-br from-card to-muted/20 shadow-sm">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              Overview
            </div>
            <CardTitle className="text-2xl">Dashboard</CardTitle>
            <CardDescription>
              Track your profile, monitor publishing, and manage incoming requests.
            </CardDescription>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link href="/admin/profile" className={buttonVariants({ variant: "default" })}>
              Update Profile
            </Link>
            <Link href="/admin/posts/new" className={buttonVariants({ variant: "outline" })}>
              Create Post
            </Link>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-border/70 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardDescription>{stat.label}</CardDescription>
                    <CardTitle className="mt-2 text-2xl">{stat.value}</CardTitle>
                  </div>
                  <div className="rounded-lg border bg-muted/50 p-2">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">{stat.note}</CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Card className="border-border/70 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>Doctor Profile</CardTitle>
                <CardDescription>Public details shown on your website</CardDescription>
              </div>
              <Badge variant="secondary">Verified</Badge>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border bg-muted/50">
                {profile?.avatar_url ? (
                  <Image src={profile.avatar_url} alt="Avatar" fill sizes="80px" className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">No Avatar</div>
                )}
              </div>

              <div className="grid flex-1 gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Name</p>
                  <p className="mt-1 text-sm font-medium">{profile?.full_name ?? user.email ?? "Not set"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Specialty</p>
                  <p className="mt-1 text-sm font-medium">{profile?.specialty ?? "Not set"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Clinic</p>
                  <p className="mt-1 text-sm font-medium">{profile?.clinic_name ?? "Not set"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Phone</p>
                  <p className="mt-1 text-sm font-medium">{profile?.phone ?? "Not set"}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Address</p>
              <p className="mt-1">{profile?.address ?? "Add your clinic address in profile settings."}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump into common admin tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/admin/posts/new"
              className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}
            >
                <FileText className="h-4 w-4" />
                Write New Post
            </Link>
            <Link
              href="/admin/appointments"
              className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}
            >
                <ClipboardList className="h-4 w-4" />
                Review Appointments
            </Link>
            <Link
              href="/admin/profile"
              className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}
            >
                <UserRound className="h-4 w-4" />
                Edit Profile
            </Link>

            <div className="pt-2 text-xs text-muted-foreground">
              Last updated: {profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString() : "Not updated yet"}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
