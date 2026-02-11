import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { createServerSupabase } from "@/lib/supabase/server";

type Post = {
  id: number;
  slug: string;
  title: string | null;
  content: string | null;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  featured_image: string | null;
  created_at: string;
};

async function fetchPost(slug: string) {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, slug, title, content, excerpt, meta_title, meta_description, featured_image, created_at, is_published"
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  return { data: data as Post | null, error };
}

async function getCanonical(slug: string) {
  const host = (await headers()).get("host");
  if (!host) return `/blog/${slug}`;
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}/blog/${slug}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { data: post, error } = await fetchPost(slug);

    if (error || !post) {
      return { title: "Article Not Found" };
    }

    const title = post.meta_title || post.title || "Medical Article";
    const description =
      post.meta_description || post.excerpt || post.content?.slice(0, 180) || "";
    const canonical = await getCanonical(post.slug);

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        images: post.featured_image ? [post.featured_image] : undefined,
      },
    };
  } catch (err) {
    console.error("Metadata fetch error:", err);
    return { title: "Article" };
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const { data: post, error } = await fetchPost(slug);

    if (error) {
      console.error("Supabase post fetch error:", error);
      return (
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-background-soft border border-border shadow-sm p-8">
              <h1 className="text-xl font-bold text-foreground mb-2">
                Unable to load article at the moment.
              </h1>
              <p className="text-sm text-foreground-muted">Please try again later.</p>
            </div>
          </div>
        </section>
      );
    }

    if (!post) {
      notFound();
    }

    const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    return (
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="badge-capsule mb-4">Insights</span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              {post.title || "Untitled"}
            </h1>
            <p className="text-sm uppercase tracking-widest text-foreground-subtle">
              {formattedDate}
            </p>
          </div>

          {post.featured_image && (
            <div className="relative mb-10 h-[320px] w-full overflow-hidden rounded-2xl border border-border bg-background">
              <Image
                src={post.featured_image}
                alt={post.title ?? "Featured image"}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="rounded-2xl bg-background-soft border border-border shadow-sm p-8">
            {post.excerpt && (
              <p className="text-foreground-muted text-lg mb-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}
            <div className="text-foreground-muted leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </div>
        </div>
      </section>
    );
  } catch (err) {
    console.error("Unexpected post fetch error:", err);
    return (
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-background-soft border border-border shadow-sm p-8">
            <h1 className="text-xl font-bold text-foreground mb-2">
              Unable to load article at the moment.
            </h1>
            <p className="text-sm text-foreground-muted">Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }
}
