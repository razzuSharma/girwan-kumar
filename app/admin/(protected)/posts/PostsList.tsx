"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Post = {
  id: number;
  title: string | null;
  created_at: string;
};

export default function PostsList({
  initialPosts,
  userId,
}: {
  initialPosts: Post[];
  userId: string;
}) {
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [error, setError] = useState("");

  const handleDelete = async (postId: number) => {
    setError("");
    const confirmed = window.confirm("Delete this post?");
    if (!confirmed) return;

    const { error: deleteError } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId)
      .eq("user_id", userId);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <p className="text-sm text-foreground-muted">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col gap-3 rounded-3xl border border-border bg-background p-5 shadow-sm md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-xs text-foreground-subtle">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
              <h3 className="text-lg font-medium text-foreground">
                {post.title || "Untitled"}
              </h3>
            </div>
            <div className="flex gap-2">
              <Link
                className="rounded-2xl border border-border px-3 py-1.5 text-sm text-foreground hover:bg-background-soft"
                href={`/admin/posts/${post.id}/edit`}
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(post.id)}
                className="rounded-2xl border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
