create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  preferred_date date,
  reason text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.appointments enable row level security;

create policy "Allow service role" on public.appointments
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
