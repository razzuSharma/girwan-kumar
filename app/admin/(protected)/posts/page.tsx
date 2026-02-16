import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { requireUser } from "@/lib/supabase/auth";
import PostsList from "./PostsList";

type PostRow = {
  id: number;
  title: string | null;
  created_at: string;
};

export default async function AdminPostsPage() {
  const { supabase, user } = await requireUser();

  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <Card className="border-border/70 shadow-sm">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-2xl">Posts</CardTitle>
            <CardDescription>Manage your published content and drafts.</CardDescription>
          </div>

          <Link
            href="/admin/posts/new"
            className={cn(buttonVariants({ variant: "default" }), "w-fit")}
          >
            <Plus className="h-4 w-4" />
            Create New
          </Link>
        </CardHeader>
      </Card>

      <PostsList initialPosts={(posts ?? []) as PostRow[]} userId={user.id} />
    </div>
  );
}
