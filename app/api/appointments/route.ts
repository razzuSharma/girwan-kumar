import { NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase/server";
import type { AppointmentRequest } from "@/lib/types/appointments";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: AppointmentRequest;

  try {
    payload = (await request.json()) as AppointmentRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const phone = payload.phone?.trim();

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Name, email, and phone are required." }, { status: 400 });
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const supabase = createServiceSupabase();
  const { error } = await supabase.from("appointments").insert({
    name,
    email,
    phone,
    preferred_date: payload.preferredDate || null,
    reason: payload.reason || null,
    message: payload.message || null,
  });

  if (error) {
    return NextResponse.json({ error: "Unable to submit appointment." }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
