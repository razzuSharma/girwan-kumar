"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type ProfileRow = {
  id: string;
  avatar_url: string | null;
};

export default function AdminProfilePage() {
  const supabase = useMemo(() => createClient(), []);
  const [userId, setUserId] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const init = async () => {
      const { data, error: userError } = await supabase.auth.getUser();
      if (userError || !data.user) {
        setError("You must be logged in to update your profile.");
        return;
      }

      setUserId(data.user.id);

      let { data: profile } = await supabase
        .from("profile")
        .select("id, avatar_url")
        .eq("id", data.user.id)
        .maybeSingle();

      if (!profile) {
        await supabase.from("profile").insert({ id: data.user.id, avatar_url: null });
        const { data: createdProfile } = await supabase
          .from("profile")
          .select("id, avatar_url")
          .eq("id", data.user.id)
          .maybeSingle();
        profile = createdProfile as ProfileRow | null;
      }

      if (profile?.avatar_url) {
        setAvatarUrl(profile.avatar_url);
      }
    };

    void init();
  }, [supabase]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleUpload = async () => {
    if (!userId) {
      setError("You must be logged in to upload an avatar.");
      return;
    }
    if (!selectedFile) {
      setError("Please choose an image file.");
      return;
    }

    setIsUploading(true);
    setError("");
    setSuccess("");

    const path = `${userId}/avatar.png`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, selectedFile, { upsert: true, contentType: selectedFile.type });

    if (uploadError) {
      setError(uploadError.message);
      setIsUploading(false);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(path);

    const { error: updateError } = await supabase
      .from("profile")
      .update({ avatar_url: data.publicUrl })
      .eq("id", userId);

    if (updateError) {
      setError(updateError.message);
    } else {
      setAvatarUrl(data.publicUrl);
      setSelectedFile(null);
      setSuccess("Avatar updated successfully.");
    }

    setIsUploading(false);
  };

  const displayAvatar = previewUrl || avatarUrl;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-(--admin-muted)">Profile</p>
        <h1 className="text-2xl font-semibold text-(--admin-text)">Profile Photo</h1>
        <p className="text-sm text-(--admin-muted)">Upload a new avatar for your profile.</p>
      </div>

      <div className="rounded-2xl border border-(--admin-border) bg-[var(--admin-card)] p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-[var(--admin-soft)]">
              {displayAvatar ? (
                <Image src={displayAvatar} alt="Avatar preview" fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-[var(--admin-muted)]">
                  No Avatar
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--admin-text)]">Profile Avatar</p>
              <p className="text-xs text-[var(--admin-muted)]">PNG recommended. Will be saved as avatar.png.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label
              htmlFor="avatar"
              className="cursor-pointer rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card)] px-4 py-2 text-sm font-medium text-[var(--admin-text)] shadow-sm transition-all duration-200 hover:bg-[var(--admin-soft)] focus-within:ring-2 focus-within:ring-[var(--admin-accent)]"
            >
              Choose File
              <input
                id="avatar"
                type="file"
                accept="image/png,image/jpeg"
                onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                className="sr-only"
              />
            </label>

            <button
              type="button"
              onClick={handleUpload}
              disabled={isUploading}
              className="rounded-lg bg-[var(--admin-accent)] px-4 py-2 text-sm font-medium text-[var(--admin-accent-contrast)] shadow-sm transition-all duration-200 hover:bg-[var(--admin-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)] disabled:opacity-60"
            >
              {isUploading ? "Uploading..." : "Upload Avatar"}
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
        </div>
      </div>
    </div>
  );
}
