create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  role text not null check (role in (
    'yacht_crew', 'oow_student', 'master_student',
    'merchant_navy', 'sailing_cruising', 'instructor', 'other'
  )),
  message text,
  created_at timestamptz not null default now()
);

create unique index waitlist_email_unique on public.waitlist (lower(email));

alter table public.waitlist enable row level security;
