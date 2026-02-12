import { requireUser } from "@/lib/supabase/auth";
import AppointmentList from "./AppointmentList";

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

export default async function AppointmentsPage() {
  const { supabase } = await requireUser();

  let appointments: Appointment[] = [];
  let hasError = false;

  try {
    const { data, error } = await supabase
      .from("appointment_requests")
      .select("id, full_name, email, phone, preferred_date, reason, details, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      hasError = true;
    } else {
      appointments = (data ?? []) as Appointment[];
    }
  } catch (err) {
    hasError = true;
  }

  return (
    <div className="py-8">
      <AppointmentList initialAppointments={appointments} hasError={hasError} />
    </div>
  );
}
