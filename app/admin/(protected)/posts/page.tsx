import Link from "next/link";
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
      <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Posts</h1>
            <p className="mt-2 text-sm text-foreground-muted">Manage your published posts.</p>
          </div>
          <Link className="btn-pill btn-pill-primary w-fit" href="/admin/posts/new">
            Create New
          </Link>
        </div>
      </div>

      <PostsList initialPosts={(posts ?? []) as PostRow[]} userId={user.id} />
    </div>
  );
}
