-- Applied directly to the "Trimora Systems" Supabase project
-- (tvzbtyggphxqnstuxllp) on 2026-07-04. Committed here for reproducibility
-- and review only -- this file was NOT run via `supabase db push` to
-- produce the live state; the live state came first, this documents it.
--
-- IMPORTANT: the actual x-webhook-secret value below is a placeholder.
-- The real value matches the LEADS_WEBHOOK_SECRET Edge Function secret
-- (set via Supabase Dashboard, not committed to git). If you ever need to
-- rotate it, update both the Edge Function secret AND re-run this
-- function definition with the new value.

create extension if not exists pg_net with schema extensions;

create or replace function public.notify_new_lead()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, net
as $$
begin
  perform net.http_post(
    url := 'https://tvzbtyggphxqnstuxllp.supabase.co/functions/v1/notify-new-lead',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', 'REDACTED -- see LEADS_WEBHOOK_SECRET in Supabase Dashboard'
    ),
    body := to_jsonb(new)
  );
  return new;
end;
$$;

drop trigger if exists trg_notify_new_lead on public.leads;
create trigger trg_notify_new_lead
after insert on public.leads
for each row
execute function public.notify_new_lead();
