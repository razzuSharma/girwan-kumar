"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type PostFormProps = {
  userId: string;
  mode: "create" | "edit";
  postId?: number;
  initialTitle?: string;
  initialContent?: string;
};

export default function PostForm({
  userId,
  mode,
  postId,
  initialTitle = "",
  initialContent = "",
}: PostFormProps) {
  const supabase = createClient();
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    if (!title.trim()) {
      setError("Title is required.");
      setIsSaving(false);
      return;
    }

    if (mode === "create") {
      const { error: insertError } = await supabase.from("posts").insert({
        user_id: userId,
        title: title.trim(),
        content: content.trim(),
      });

      if (insertError) {
        setError(insertError.message);
        setIsSaving(false);
        return;
      }
    } else {
      const { error: updateError } = await supabase
        .from("posts")
        .update({ title: title.trim(), content: content.trim() })
        .eq("id", postId)
        .eq("user_id", userId);

      if (updateError) {
        setError(updateError.message);
        setIsSaving(false);
        return;
      }
    }

    router.push("/admin/posts");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="input-medical"
          placeholder="Post title"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-foreground mb-2">
          Content
        </label>
        <textarea
          id="content"
          rows={8}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="input-medical !rounded-2xl resize-y"
          placeholder="Write your post..."
        />
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={isSaving}
        className="btn-pill btn-pill-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
