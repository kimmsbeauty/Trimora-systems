-- Applied to the "Trimora Systems" Supabase project (tvzbtyggphxqnstuxllp).
--
-- Phase 3 (website), Item 1: Sitewide Analytics Instrumentation.
-- Lightweight event log mirroring what Vercel Analytics' track() already
-- sends, so it's queryable directly alongside `leads` in this same
-- database rather than only living in Vercel's own dashboard.
--
-- Deliberately NOT a "visitor profile" or cross-visit identity table --
-- session_id is a random id generated fresh per page load (see
-- src/lib/analytics.js), not a persistent cookie/localStorage id. This is
-- observation instrumentation only; anything resembling visitor
-- fingerprinting or cross-visit memory is explicitly out of scope here
-- (that's the "Visitor Intelligence Layer" / personalization work marked
-- not-actionable in the Phase 3 scope draft).
--
-- Same RLS shape as `leads`: anon role can INSERT only, never SELECT/
-- UPDATE/DELETE -- the anon/publishable key is safe to expose client-side
-- because of this restriction, not despite it.

create table if not exists public.page_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (event_type in ('section_viewed', 'cta_click')),
  section_id text,
  source text,
  path text not null,
  session_id uuid not null,
  created_at timestamptz not null default now()
);

alter table public.page_events enable row level security;

drop policy if exists "anon can insert page_events" on public.page_events;
create policy "anon can insert page_events"
  on public.page_events
  for insert
  to anon
  with check (true);

create index if not exists page_events_event_type_idx on public.page_events (event_type);
create index if not exists page_events_created_at_idx on public.page_events (created_at);
