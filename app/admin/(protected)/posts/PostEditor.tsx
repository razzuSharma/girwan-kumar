"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type PostEditorProps = {
  userId: string;
  mode: "create" | "edit";
  postId?: number;
  initialTitle?: string;
  initialContent?: string;
  initialSlug?: string | null;
  initialExcerpt?: string | null;
  initialMetaTitle?: string | null;
  initialMetaDescription?: string | null;
  initialFeaturedImage?: string | null;
  initialIsPublished?: boolean | null;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function PostEditor({
  userId,
  mode,
  postId,
  initialTitle = "",
  initialContent = "",
  initialSlug = null,
  initialExcerpt = null,
  initialMetaTitle = null,
  initialMetaDescription = null,
  initialFeaturedImage = null,
  initialIsPublished = true,
}: PostEditorProps) {
  const supabase = useMemo(() => createClient(), []);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [slug, setSlug] = useState(initialSlug ?? "");
  const [excerpt, setExcerpt] = useState(initialExcerpt ?? "");
  const [metaTitle, setMetaTitle] = useState(initialMetaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(initialMetaDescription ?? "");
  const [featuredImage, setFeaturedImage] = useState(initialFeaturedImage ?? "");
  const [isPublished, setIsPublished] = useState(Boolean(initialIsPublished));
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});
  const [isSaving, setIsSaving] = useState(false);
  const [errorBanner, setErrorBanner] = useState("");
  const [successBanner, setSuccessBanner] = useState("");

  const validate = () => {
    const nextErrors: { title?: string; content?: string } = {};
    if (!title.trim()) nextErrors.title = "Title is required.";
    if (!content.trim()) nextErrors.content = "Content is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const resolveUniqueSlug = async (base: string) => {
    const { data, error } = await supabase
      .from("posts")
      .select("slug")
      .like("slug", `${base}%`)
      .neq("id", postId ?? -1);

    if (error) {
      throw error;
    }

    const existing = new Set((data ?? []).map((row) => row.slug));
    if (!existing.has(base)) return base;

    let suffix = 2;
    while (existing.has(`${base}-${suffix}`)) {
      suffix += 1;
    }
    return `${base}-${suffix}`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorBanner("");
    setSuccessBanner("");

    if (!validate()) return;

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    const baseSlug = slugify(slug.trim() || trimmedTitle);

    if (!baseSlug) {
      setErrors({ title: "Title must include letters or numbers." });
      return;
    }

    setIsSaving(true);

    try {
      const slugToUse =
        mode === "edit" && initialSlug && baseSlug === initialSlug
          ? initialSlug
          : await resolveUniqueSlug(baseSlug);

      const resolvedExcerpt = excerpt.trim() || trimmedContent.slice(0, 180);
      const resolvedMetaTitle = metaTitle.trim() || trimmedTitle;
      const resolvedMetaDescription = metaDescription.trim() || resolvedExcerpt;

      const payload = {
        user_id: userId,
        title: trimmedTitle,
        content: trimmedContent,
        slug: slugToUse,
        excerpt: resolvedExcerpt,
        meta_title: resolvedMetaTitle,
        meta_description: resolvedMetaDescription,
        featured_image: featuredImage.trim() || null,
        is_published: isPublished,
      };

      const { error } =
        mode === "create"
          ? await supabase.from("posts").insert(payload)
          : await supabase.from("posts").update(payload).eq("id", postId);

      if (error) {
        setErrorBanner("Unable to save article. Please try again.");
        return;
      }

      setSuccessBanner("Article saved successfully.");

      if (mode === "create") {
        setTitle("");
        setContent("");
        setSlug("");
        setExcerpt("");
        setMetaTitle("");
        setMetaDescription("");
        setFeaturedImage("");
        setIsPublished(true);
        setErrors({});
      }
    } catch (err) {
      setErrorBanner("Unable to save article. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {successBanner && (
        <div className="rounded-2xl bg-background-soft border border-border shadow-sm p-6 text-foreground">
          {successBanner}
        </div>
      )}
      {errorBanner && (
        <div className="rounded-2xl bg-background-soft border border-border shadow-sm p-6 text-foreground">
          {errorBanner}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-background-soft border border-border shadow-sm p-10 space-y-8 hover:shadow-md transition-all duration-300"
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              if (errors.title && event.target.value.trim()) {
                setErrors((prev) => ({ ...prev, title: undefined }));
              }
            }}
            className={`input-clinical text-lg focus:ring-2 focus:ring-primary ${
              errors.title ? "border-red-500" : ""
            }`}
            placeholder="Enter a clear, descriptive title"
            required
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            className="input-clinical"
            placeholder="article-name"
          />
          <p className="text-xs text-foreground-muted mt-1">
            This is the web address of your article. It will look like: yourwebsite.com/blog/article-name. Leave empty to auto-generate.
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground">Content</label>
          <p className="text-sm text-foreground-muted">Write patient-friendly, clear clinical content.</p>
          <div className="relative">
            <textarea
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
                if (errors.content && event.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, content: undefined }));
                }
              }}
              className={`input-clinical min-h-[320px] resize-y p-6 text-base leading-relaxed focus:ring-2 focus:ring-primary ${
                errors.content ? "border-red-500" : ""
              }`}
              placeholder="Write your article content..."
              required
            />
            <span className="absolute bottom-4 right-4 text-xs text-foreground-muted">
              {content.length} chars
            </span>
          </div>
          {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            className="input-clinical resize-y p-6 text-base leading-relaxed"
            placeholder="Optional short summary (auto-generated if left empty)"
            rows={4}
          />
          <p className="text-xs text-foreground-muted mt-1">
            This is the short preview shown on the blog listing page.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Meta Title</label>
          <input
            type="text"
            value={metaTitle}
            onChange={(event) => setMetaTitle(event.target.value)}
            className="input-clinical"
            placeholder="Optional SEO title (defaults to post title)"
          />
          <p className="text-xs text-foreground-muted mt-1">
            This is the title shown on Google search results. If left empty, the article title will be used.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Meta Description</label>
          <textarea
            value={metaDescription}
            onChange={(event) => setMetaDescription(event.target.value)}
            className="input-clinical resize-y p-6 text-base leading-relaxed"
            placeholder="Optional SEO description (defaults to excerpt)"
            rows={3}
          />
          <p className="text-xs text-foreground-muted mt-1">
            This short summary appears under the title on Google. Write 1–2 clear sentences about this article.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Featured Image URL</label>
          <input
            type="url"
            value={featuredImage}
            onChange={(event) => setFeaturedImage(event.target.value)}
            className="input-clinical"
            placeholder="https://example.com/featured-image.jpg"
          />
          <p className="text-xs text-foreground-muted mt-1">
            This image will appear at the top of the article and when shared on social media.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <input
              id="isPublished"
              type="checkbox"
              checked={isPublished}
              onChange={(event) => setIsPublished(event.target.checked)}
              className="h-5 w-5 accent-primary"
            />
            <label htmlFor="isPublished" className="text-sm font-semibold text-foreground">
              {isPublished ? "Published" : "Draft"}
            </label>
          </div>
          <p className="text-xs text-foreground-muted mt-1">
            If disabled, the article will be saved as a draft and not visible to the public.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
          <button
            type="submit"
            disabled={isSaving}
            className="btn-pill btn-pill-primary w-full sm:w-auto px-10 py-3 disabled:opacity-60"
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                Saving...
              </span>
            ) : (
              "Save Article"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
