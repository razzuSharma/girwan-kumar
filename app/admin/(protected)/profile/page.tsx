"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ProfileForm from "./ProfileForm";

type ProfileRow = {
  id: string;
  avatar_url: string | null;
  full_name: string | null;
  phone: string | null;
  specialty: string | null;
  clinic_name: string | null;
  address: string | null;
  bio: string | null;
};

export default function AdminProfilePage() {
  const supabase = useMemo(() => createClient(), []);
  const [userEmail, setUserEmail] = useState<string>("");
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const init = async () => {
      const { data, error: userError } = await supabase.auth.getUser();
      if (userError || !data.user) {
        setError("You must be logged in to update your profile.");
        return;
      }

      setUserEmail(data.user.email ?? "");

      const { data: profileRow, error: profileError } = await supabase
        .from("profile")
        .select("id, avatar_url, full_name, phone, specialty, clinic_name, address, bio")
        .eq("id", data.user.id)
        .maybeSingle();

      if (profileError) {
        setError(profileError.message);
        return;
      }

      if (!profileRow) {
        const { error: insertError } = await supabase
          .from("profile")
          .insert({ id: data.user.id, avatar_url: null });

        if (insertError) {
          setError(insertError.message);
          return;
        }

        const { data: createdProfile, error: createdError } = await supabase
          .from("profile")
          .select("id, avatar_url, full_name, phone, specialty, clinic_name, address, bio")
          .eq("id", data.user.id)
          .maybeSingle();

        if (createdError) {
          setError(createdError.message);
          return;
        }

        setProfile((createdProfile as ProfileRow | null) ?? null);
        return;
      }

      setProfile((profileRow as ProfileRow | null) ?? null);
    };

    void init();
  }, [supabase]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-(--admin-muted)">Profile</p>
        <h1 className="text-2xl font-semibold text-(--admin-text)">Doctor Profile</h1>
        <p className="text-sm text-(--admin-muted)">Manage your public profile information.</p>
        {userEmail ? (
          <p className="text-sm text-(--admin-muted)">Signed in as: {userEmail}</p>
        ) : null}
      </div>

      {error ? (
        <div className="rounded-2xl border border-(--admin-border) bg-[var(--admin-card)] p-6 shadow-sm">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      ) : profile ? (
        <ProfileForm initialProfile={profile} />
      ) : (
        <div className="rounded-2xl border border-(--admin-border) bg-[var(--admin-card)] p-6 shadow-sm">
          <p className="text-sm text-(--admin-muted)">Loading profile details...</p>
        </div>
      )}
    </div>
  );
}
