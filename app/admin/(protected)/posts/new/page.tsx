import { requireUser } from "@/lib/supabase/auth";
import PostEditor from "../PostEditor";

export default async function NewPostPage() {
  const { user } = await requireUser();

  return (
    <div className="space-y-8">
      <div className="max-w-3xl space-y-4">
        <span className="badge-capsule">ADMIN</span>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Create New Article</h1>
          <p className="mt-2 text-foreground-muted">
            Publish new clinical insights and patient-friendly guidance.
          </p>
        </div>
        <div className="border-t border-border" />
      </div>

      <div className="max-w-3xl">
        <PostEditor userId={user.id} mode="create" />
      </div>
    </div>
  );
}
