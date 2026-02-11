"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import React from "react";

type ProfileData = {
  id: string;
  avatar_url: string | null;
  address: string | null;
};

export default function ProfileForm({
  initialProfile,
}: {
  initialProfile: ProfileData;
}) {
  const supabase = createClient();
  const [address, setAddress] = useState(initialProfile.address ?? "");
  const [avatarUrl, setAvatarUrl] = useState(initialProfile.avatar_url ?? "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddressSave = async () => {
    setIsSaving(true);
    setError("");
    setStatus("");

    const { error: updateError } = await supabase
      .from("profile")
      .update({ address, updated_at: new Date().toISOString() })
      .eq("id", initialProfile.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setStatus("Address updated.");
    }

    setIsSaving(false);
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) {
      setError("Please choose an image file.");
      return;
    }

    const isPng = avatarFile.type === "image/png";
    const isJpeg = avatarFile.type === "image/jpeg";

    if (!isPng && !isJpeg) {
      setError("Only PNG or JPG files are allowed.");
      return;
    }

    setIsUploading(true);
    setError("");
    setStatus("");

    const extension = isPng ? "png" : "jpg";
    const filePath = `${initialProfile.id}/avatar.${extension}`;

    const { error: uploadError } = await supabase
      .storage
      .from("avatars")
      .upload(filePath, avatarFile, { upsert: true, contentType: avatarFile.type });

    if (uploadError) {
      setError(uploadError.message);
      setIsUploading(false);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from("profile")
      .update({ avatar_url: data.publicUrl, updated_at: new Date().toISOString() })
      .eq("id", initialProfile.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setAvatarUrl(data.publicUrl);
      setStatus("Avatar updated.");
      setAvatarFile(null);
    }

    setIsUploading(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-wide text-[var(--admin-muted)]">Profile</p>
        <div>
          <h1 className="text-2xl font-semibold text-[var(--admin-text)]">Profile Settings</h1>
          <p className="mt-2 text-sm text-[var(--admin-muted)]">Keep your public profile details up to date.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-[var(--admin-soft)]">
              {avatarUrl ? (
                <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-[var(--admin-muted)]">
                  No Avatar
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--admin-text)]">Profile Photo</p>
              <p className="text-xs text-[var(--admin-muted)]">PNG or JPG, square works best.</p>
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
                onChange={(event) => setAvatarFile(event.target.files?.[0] ?? null)}
                className="sr-only"
              />
            </label>
            <button
              type="button"
              onClick={handleAvatarUpload}
              disabled={isUploading}
              className="rounded-lg bg-[var(--admin-accent)] px-4 py-2 text-sm font-medium text-[var(--admin-accent-contrast)] shadow-sm transition-all duration-200 hover:bg-[var(--admin-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)] disabled:opacity-60"
            >
              {isUploading ? "Uploading..." : "Upload Avatar"}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-[var(--admin-muted)]">Address</p>
            <p className="mt-2 text-sm text-[var(--admin-muted)]">This shows on your public profile.</p>
          </div>
          <textarea
            id="address"
            rows={4}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card)] px-4 py-3 text-sm text-[var(--admin-text)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)]"
            placeholder="Clinic address..."
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleAddressSave}
              disabled={isSaving}
              className="rounded-lg bg-[var(--admin-accent)] px-4 py-2 text-sm font-medium text-[var(--admin-accent-contrast)] shadow-sm transition-all duration-200 hover:bg-[var(--admin-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)] disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save Address"}
            </button>
            {status && <p className="text-sm text-green-600">{status}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
