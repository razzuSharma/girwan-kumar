import Link from "next/link";
import { Suspense } from "react";
import { createServerSupabase } from "@/lib/supabase/server";

type Post = {
  id: number;
  title: string | null;
  content: string | null;
  created_at: string;
};

async function fetchPosts() {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, content, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase posts fetch error:", error);
      return { posts: [], error: true };
    }

    return { posts: (data ?? []) as Post[], error: false };
  } catch (err) {
    console.error("Unexpected posts fetch error:", err);
    return { posts: [], error: true };
  }
}

function SkeletonCards() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="p-8 rounded-2xl bg-background-soft border border-border shadow-sm"
        >
          <div className="h-4 w-24 bg-background animate-pulse rounded-full mb-4" />
          <div className="h-6 w-3/4 bg-background animate-pulse rounded-full mb-4" />
          <div className="space-y-2 mb-6">
            <div className="h-3 w-full bg-background animate-pulse rounded-full" />
            <div className="h-3 w-5/6 bg-background animate-pulse rounded-full" />
            <div className="h-3 w-2/3 bg-background animate-pulse rounded-full" />
          </div>
          <div className="h-9 w-28 bg-background animate-pulse rounded-full" />
        </div>
      ))}
    </div>
  );
}

async function PostsGrid() {
  const { posts, error } = await fetchPosts();

  if (error) {
    return (
      <div className="p-8 rounded-2xl bg-background-soft border border-border shadow-sm">
        <h3 className="text-lg font-bold text-foreground mb-2">Unable to load articles at the moment.</h3>
        <p className="text-sm text-foreground-muted">Please refresh the page and try again.</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-background-soft border border-border shadow-sm">
        <p className="text-sm text-foreground-muted">No blog posts yet.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {posts.map((post) => {
        const excerpt = (post.content ?? "").slice(0, 180);
        const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });

        return (
          <article
            key={post.id}
            className="p-8 rounded-2xl bg-background-soft border border-border shadow-sm hover:shadow-md transition-all"
          >
            <p className="text-xs uppercase tracking-widest text-foreground-subtle mb-3">
              {formattedDate}
            </p>
            <h3 className="text-xl font-bold text-foreground mb-4">
              {post.title || "Untitled"}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed mb-6">
              {excerpt}{post.content && post.content.length > 180 ? "..." : ""}
            </p>
            <Link
              href={`/blog/${post.id}`}
              className="btn-pill btn-pill-primary text-sm px-5 py-2.5"
            >
              Read More
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export default function BlogPage() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="badge-capsule mb-4">Insights</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Latest Medical Articles
          </h2>
          <p className="text-foreground-muted text-lg font-light">
            Evidence-based insights, clinical updates, and practical wellness guidance.
          </p>
        </div>

        <Suspense fallback={<SkeletonCards />}>
          <PostsGrid />
        </Suspense>
      </div>
    </section>
  );
}
