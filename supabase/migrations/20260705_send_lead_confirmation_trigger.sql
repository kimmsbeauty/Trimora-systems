-- Applied to the "Trimora Systems" Supabase project (tvzbtyggphxqnstuxllp).
--
-- Adds a new nullable column, confirmation_sent_at, to track whether the
-- Phase 2 qualification funnel's automated WhatsApp confirmation reached
-- the LEAD -- distinct from notified_email_at/notified_whatsapp_at, which
-- track whether YOU were alerted about the new lead (Item 1). Reusing
-- notified_whatsapp_at for both would conflate two different messages to
-- two different people under one timestamp.
--
-- IMPORTANT: the actual x-webhook-secret value below is a placeholder.
-- The real value matches the LEAD_CONFIRMATION_WEBHOOK_SECRET Edge
-- Function secret (set via Supabase Dashboard, not committed to git).
-- This is a NEW, separate secret from LEADS_WEBHOOK_SECRET -- see
-- send-lead-confirmation/index.ts for why it isn't reused.

alter table public.leads
  add column if not exists confirmation_sent_at timestamptz;

-- pg_net lives in schema `net`, not `extensions.net` -- verified against
-- the live project (see the same gotcha documented for notify_new_lead).
create or replace function public.send_lead_confirmation()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, net
as $$
begin
  perform net.http_post(
    url := 'https://tvzbtyggphxqnstuxllp.supabase.co/functions/v1/send-lead-confirmation',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', 'REDACTED -- see LEAD_CONFIRMATION_WEBHOOK_SECRET in Supabase Dashboard'
    ),
    body := to_jsonb(new)
  );
  return new;
end;
$$;

drop trigger if exists trg_send_lead_confirmation on public.leads;
create trigger trg_send_lead_confirmation
after insert on public.leads
for each row
execute function public.send_lead_confirmation();
