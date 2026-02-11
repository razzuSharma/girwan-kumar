import { requireUser } from "@/lib/supabase/auth";
import PostForm from "../PostForm";

export default async function NewPostPage() {
  const { user } = await requireUser();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-foreground">New Post</h1>
        <p className="mt-2 text-sm text-foreground-muted">Create a new post.</p>
      </div>
      <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
        <PostForm userId={user.id} mode="create" />
      </div>
    </div>
  );
}
