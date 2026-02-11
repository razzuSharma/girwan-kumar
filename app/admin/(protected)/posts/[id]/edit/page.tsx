import { redirect } from "next/navigation";
import { requireUser } from "@/lib/supabase/auth";
import PostForm from "../../PostForm";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const postId = Number(params.id);

  if (Number.isNaN(postId)) {
    redirect("/admin/posts");
  }

  const { supabase, user } = await requireUser();

  const { data: post } = await supabase
    .from("posts")
    .select("id, title, content")
    .eq("id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!post) {
    redirect("/admin/posts");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-foreground">Edit Post</h1>
        <p className="mt-2 text-sm text-foreground-muted">Update your post content.</p>
      </div>
      <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
        <PostForm
          userId={user.id}
          mode="edit"
          postId={post.id}
          initialTitle={post.title ?? ""}
          initialContent={post.content ?? ""}
        />
      </div>
    </div>
  );
}
