import { redirect } from "next/navigation";
import { requireUser } from "@/lib/supabase/auth";
import PostEditor from "../../PostEditor";

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
    .select("id, title, content, slug, excerpt, meta_title, meta_description, featured_image, is_published")
    .eq("id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!post) {
    redirect("/admin/posts");
  }

  return (
    <div className="space-y-8">
      <div className="max-w-3xl space-y-4">
        <span className="badge-capsule">ADMIN</span>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Edit Article</h1>
          <p className="mt-2 text-foreground-muted">
            Refine content, SEO fields, and publish status for this article.
          </p>
        </div>
        <div className="border-t border-border" />
      </div>

      <div className="max-w-3xl">
        <PostEditor
          userId={user.id}
          mode="edit"
          postId={post.id}
          initialTitle={post.title ?? ""}
          initialContent={post.content ?? ""}
          initialSlug={post.slug ?? null}
          initialExcerpt={post.excerpt ?? null}
          initialMetaTitle={post.meta_title ?? null}
          initialMetaDescription={post.meta_description ?? null}
          initialFeaturedImage={post.featured_image ?? null}
          initialIsPublished={post.is_published ?? true}
        />
      </div>
    </div>
  );
}
