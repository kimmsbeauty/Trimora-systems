-- Fixes a pre-existing trigger (trg_send_lead_confirmation) discovered
-- already present in the live database -- NOT created by this migration,
-- and not something built in this session originally. It was found
-- silently failing on every single lead insert: the trigger pointed at
-- an Edge Function (send-lead-confirmation) that had never actually been
-- deployed (404 on every fire), and its webhook secret was a literal
-- placeholder string left in from whatever prior session scaffolded it.
--
-- This migration: (1) the function is now actually deployed (see
-- supabase/functions/send-lead-confirmation/), (2) this replaces the
-- placeholder secret with the real value (matches the
-- LEAD_CONFIRMATION_WEBHOOK_SECRET Edge Function secret, set via
-- Supabase Dashboard -- not committed to git).
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
