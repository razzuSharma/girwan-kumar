"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Appointment = {
  id: number;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  preferred_date: string | null;
  reason: string | null;
  details: string | null;
  created_at: string;
};

type Props = {
  initialAppointments: Appointment[];
  hasError: boolean;
};

function formatDate(value?: string | null) {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default function AppointmentList({ initialAppointments, hasError }: Props) {
  const supabase = useMemo(() => createClient(), []);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [errorBanner, setErrorBanner] = useState(hasError ? "Unable to load appointment requests at the moment." : "");

  const filtered = appointments.filter((item) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return (
      item.full_name?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.phone?.toLowerCase().includes(term)
    );
  });

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Delete this appointment request?");
    if (!confirmed) return;

    setIsDeleting(id);
    setErrorBanner("");

    try {
      const { error } = await supabase.from("appointment_requests").delete().eq("id", id);
      if (error) {
        setErrorBanner("Unable to delete appointment. Please try again.");
        return;
      }

      setAppointments((prev) => prev.filter((item) => item.id !== id));
      if (selectedId === id) {
        setSelectedId(null);
      }
    } catch (err) {
      setErrorBanner("Unable to delete appointment. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="max-w-6xl space-y-4">
        <span className="badge-capsule">ADMIN</span>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Appointments</h1>
          <p className="mt-2 text-foreground-muted">
            Review and manage incoming appointment requests.
          </p>
        </div>
        <div className="border-t border-border" />
      </div>

      <div className="max-w-6xl space-y-6">
        <div className="rounded-2xl bg-background-soft border border-border shadow-sm p-6">
          <label className="text-sm font-semibold text-foreground">Search</label>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="input-clinical mt-2"
            placeholder="Search by name, email, or phone"
          />
        </div>

        {errorBanner && (
          <div className="rounded-2xl bg-background-soft border border-border shadow-sm p-6 text-foreground">
            {errorBanner}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-background-soft border border-border shadow-sm p-8 text-foreground-muted">
            No appointment requests yet.
          </div>
        ) : (
          <div className="rounded-2xl bg-background-soft border border-border shadow-sm overflow-hidden">
            <div className="hidden lg:grid grid-cols-[140px_1.2fr_1.4fr_1fr_140px_1fr_160px] gap-4 border-b border-border px-6 py-4 text-xs uppercase tracking-widest text-foreground-muted">
              <span>Date</span>
              <span>Full Name</span>
              <span>Email</span>
              <span>Phone</span>
              <span>Preferred</span>
              <span>Reason</span>
              <span>Actions</span>
            </div>

            <div className="divide-y divide-border">
              {filtered.map((item) => (
                <div key={item.id} className="px-6 py-5">
                  <div className="grid gap-4 lg:grid-cols-[140px_1.2fr_1.4fr_1fr_140px_1fr_160px]">
                    <div className="text-sm text-foreground">{formatDate(item.created_at)}</div>
                    <div className="text-sm text-foreground">{item.full_name || "—"}</div>
                    <div className="text-sm text-foreground-muted break-all">{item.email || "—"}</div>
                    <div className="text-sm text-foreground-muted">{item.phone || "—"}</div>
                    <div className="text-sm text-foreground-muted">{formatDate(item.preferred_date)}</div>
                    <div className="text-sm text-foreground-muted">{item.reason || "—"}</div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
                        className="btn-pill btn-pill-outline px-4 py-2 text-xs"
                      >
                        {selectedId === item.id ? "Hide" : "View"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        disabled={isDeleting === item.id}
                        className="btn-pill btn-pill-primary px-4 py-2 text-xs disabled:opacity-60"
                      >
                        {isDeleting === item.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>

                  {selectedId === item.id && (
                    <div className="mt-4 rounded-2xl bg-background border border-border p-4 text-sm text-foreground-muted">
                      {item.details ? item.details : "No additional details provided."}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
