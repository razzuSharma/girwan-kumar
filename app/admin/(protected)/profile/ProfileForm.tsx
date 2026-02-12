"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import React from "react";

type ProfileData = {
  id: string;
  avatar_url: string | null;
  address: string | null;
  full_name: string | null;
  phone: string | null;
  specialty: string | null;
  clinic_name: string | null;
  bio: string | null;
};

export default function ProfileForm({
  initialProfile,
}: {
  initialProfile: ProfileData;
}) {
  const supabase = createClient();
  const [fullName, setFullName] = useState(initialProfile.full_name ?? "");
  const [phone, setPhone] = useState(initialProfile.phone ?? "");
  const [specialty, setSpecialty] = useState(initialProfile.specialty ?? "");
  const [clinicName, setClinicName] = useState(initialProfile.clinic_name ?? "");
  const [address, setAddress] = useState(initialProfile.address ?? "");
  const [bio, setBio] = useState(initialProfile.bio ?? "");
  const [avatarUrl, setAvatarUrl] = useState(initialProfile.avatar_url ?? "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleProfileSave = async () => {
    setIsSaving(true);
    setError("");
    setStatus("");

    const { error: updateError } = await supabase
      .from("profile")
      .update({
        full_name: fullName,
        phone,
        specialty,
        clinic_name: clinicName,
        address,
        bio,
        updated_at: new Date().toISOString(),
      })
      .eq("id", initialProfile.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setStatus("Profile updated.");
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
                <Image
                  src={avatarUrl}
                  alt="Avatar"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
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
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-wide text-[var(--admin-muted)]">Doctor Details</p>
            <p className="mt-2 text-sm text-[var(--admin-muted)]">These appear on your public profile.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="text-sm font-medium text-[var(--admin-text)]">
                Full Name
              </label>
              <input
                id="fullName"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="mt-2 w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card)] px-4 py-3 text-sm text-[var(--admin-text)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)]"
                placeholder="Dr. Jane Doe"
              />
            </div>
            <div>
              <label htmlFor="specialty" className="text-sm font-medium text-[var(--admin-text)]">
                Specialty
              </label>
              <input
                id="specialty"
                value={specialty}
                onChange={(event) => setSpecialty(event.target.value)}
                className="mt-2 w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card)] px-4 py-3 text-sm text-[var(--admin-text)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)]"
                placeholder="Family Medicine"
              />
            </div>
            <div>
              <label htmlFor="clinicName" className="text-sm font-medium text-[var(--admin-text)]">
                Clinic Name
              </label>
              <input
                id="clinicName"
                value={clinicName}
                onChange={(event) => setClinicName(event.target.value)}
                className="mt-2 w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card)] px-4 py-3 text-sm text-[var(--admin-text)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)]"
                placeholder="Harmony Medical Clinic"
              />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-medium text-[var(--admin-text)]">
                Phone
              </label>
              <input
                id="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="mt-2 w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card)] px-4 py-3 text-sm text-[var(--admin-text)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)]"
                placeholder="+1 555 123 4567"
              />
            </div>
          </div>
          <div>
            <label htmlFor="address" className="text-sm font-medium text-[var(--admin-text)]">
              Address
            </label>
            <textarea
              id="address"
              rows={3}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="mt-2 w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card)] px-4 py-3 text-sm text-[var(--admin-text)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)]"
              placeholder="Clinic address..."
            />
          </div>
          <div>
            <label htmlFor="bio" className="text-sm font-medium text-[var(--admin-text)]">
              Bio
            </label>
            <textarea
              id="bio"
              rows={4}
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              className="mt-2 w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card)] px-4 py-3 text-sm text-[var(--admin-text)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)]"
              placeholder="Brief professional bio..."
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleProfileSave}
              disabled={isSaving}
              className="rounded-lg bg-[var(--admin-accent)] px-4 py-2 text-sm font-medium text-[var(--admin-accent-contrast)] shadow-sm transition-all duration-200 hover:bg-[var(--admin-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)] disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save Profile"}
            </button>
            {status && <p className="text-sm text-green-600">{status}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
