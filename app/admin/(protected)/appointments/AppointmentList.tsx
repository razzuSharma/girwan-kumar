"use client";

import { Fragment, useMemo, useState } from "react";
import { CalendarDays, Eye, EyeOff, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "-";
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
  const [errorBanner, setErrorBanner] = useState(
    hasError ? "Unable to load appointment requests at the moment." : ""
  );

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
      if (selectedId === id) setSelectedId(null);
    } catch {
      setErrorBanner("Unable to delete appointment. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/70 shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                Patient Requests
              </div>
              <CardTitle className="text-2xl">Appointments</CardTitle>
              <CardDescription>Review and manage incoming appointment requests.</CardDescription>
            </div>
            <Badge variant="secondary">{filtered.length} Active</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-9"
              placeholder="Search by name, email, or phone"
            />
          </div>

          {errorBanner && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{errorBanner}</div>
          )}

          {filtered.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-sm text-muted-foreground">
              No appointment requests yet.
            </div>
          ) : (
            <>
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Preferred</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead className="w-[180px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((item) => {
                      const expanded = selectedId === item.id;

                      return (
                        <Fragment key={item.id}>
                          <TableRow>
                            <TableCell>{formatDate(item.created_at)}</TableCell>
                            <TableCell className="font-medium">{item.full_name || "-"}</TableCell>
                            <TableCell className="text-muted-foreground">{item.email || "-"}</TableCell>
                            <TableCell className="text-muted-foreground">{item.phone || "-"}</TableCell>
                            <TableCell>{formatDate(item.preferred_date)}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.reason || "General"}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedId(expanded ? null : item.id)}
                                >
                                  {expanded ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                  {expanded ? "Hide" : "View"}
                                </Button>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  disabled={isDeleting === item.id}
                                  onClick={() => handleDelete(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  {isDeleting === item.id ? "Deleting" : "Delete"}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                          {expanded && (
                            <TableRow>
                              <TableCell colSpan={7}>
                                <div className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
                                  {item.details || "No additional details provided."}
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </Fragment>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-3 lg:hidden">
                {filtered.map((item) => {
                  const expanded = selectedId === item.id;

                  return (
                    <Card key={item.id} className="border-border/70">
                      <CardContent className="space-y-3 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-medium">{item.full_name || "Unknown"}</p>
                          <Badge variant="outline">{formatDate(item.created_at)}</Badge>
                        </div>

                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>{item.email || "-"}</p>
                          <p>{item.phone || "-"}</p>
                          <p>Preferred: {formatDate(item.preferred_date)}</p>
                        </div>

                        {expanded && (
                          <div className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
                            {item.details || "No additional details provided."}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => setSelectedId(expanded ? null : item.id)}
                          >
                            {expanded ? "Hide" : "View"}
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="flex-1"
                            disabled={isDeleting === item.id}
                            onClick={() => handleDelete(item.id)}
                          >
                            {isDeleting === item.id ? "Deleting" : "Delete"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
