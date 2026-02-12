import Link from "next/link";
import { Suspense } from "react";
import { createServerSupabase } from "@/lib/supabase/server";
import { SmartImage } from "./_components/SmartImage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Post = {
  id: number;
  slug: string;
  title: string | null;
  excerpt: string | null;
  featured_image: string | null;
  created_at: string;
  user_id: string | null;
  full_name: string | null;
};

async function fetchPosts() {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("posts_with_author")
      .select("id, slug, title, excerpt, featured_image, created_at, user_id, full_name")
      .order("created_at", { ascending: false });

    console.log("data", data);
    if (error) {
      return { posts: [], error: true };
    }

    return { posts: (data ?? []) as unknown as Post[], error: false };
  } catch (err) {
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
        <h3 className="text-lg font-bold text-foreground mb-2">
          Unable to load articles at the moment.
        </h3>
        <p className="text-sm text-foreground-muted">
          Please refresh the page and try again.
        </p>
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
        const excerpt = post.excerpt?.trim() || "";
        const formattedDate = new Date(post.created_at).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          },
        );

        return (
          <article
            key={post.id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-white/70 shadow-[0_12px_40px_-30px_rgba(15,23,42,0.35)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_30px_60px_-35px_rgba(15,23,42,0.45)]"
          >
            {post.featured_image && (
              <div className="relative h-52 w-full overflow-hidden">
                <SmartImage
                  src={post.featured_image}
                  alt={post.title ?? "Featured image"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              </div>
            )}
            <div className="flex h-full flex-col p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-foreground-subtle">
                {formattedDate}
              </p>
              {post.full_name ? (
                <p className="mt-2 text-sm font-medium text-foreground">
                  By {post.full_name}
                </p>
              ) : null}

              <h3 className="mt-3 text-xl font-semibold text-foreground">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition-colors duration-200 hover:text-primary"
                >
                  {post.title || "Untitled"}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                {excerpt}
                {excerpt.length >= 180 ? "..." : ""}
              </p>
              <div className="mt-6">
                <Link
                  href={`/blog/${post.slug}`}
                  className="btn-pill btn-pill-primary text-sm px-5 py-2.5"
                >
                  Read More
                </Link>
              </div>
            </div>
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
            Evidence-based insights, clinical updates, and practical wellness
            guidance.
          </p>
        </div>

        <Suspense fallback={<SkeletonCards />}>
          <PostsGrid />
        </Suspense>
      </div>
    </section>
  );
}
