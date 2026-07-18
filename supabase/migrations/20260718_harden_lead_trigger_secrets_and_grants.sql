-- Audit follow-up (2026-07-18). Already applied live and verified end-to-end
-- (test insert as anon, confirmed both webhooks return 200 not 401). Committed
-- here for reproducibility.
--
-- 1. Move webhook secrets out of function source into Supabase Vault.
--    Previously hardcoded in plaintext in notify_new_lead()/
--    send_lead_confirmation() -- readable by anyone with pg_proc access,
--    and would leak into any future migration dump/schema backup (this
--    file included, which is exactly why the secret values themselves are
--    NOT in this file -- see manual step below).
--
-- 2. Tighten table grants on leads/page_events. anon and authenticated
--    previously held full SELECT/UPDATE/DELETE/TRUNCATE at the table
--    level -- RLS blocked SELECT/UPDATE/DELETE via default-deny (no
--    policy), but TRUNCATE is not governed by RLS in Postgres at all,
--    so that grant was a real gap regardless of policy (not reachable
--    via PostgREST's REST surface, which doesn't expose TRUNCATE, but
--    real if the anon key were ever used with a direct DB connection).
--    Only INSERT is actually used by the website (confirmed: the lead
--    form only destructures `{ error }` from `.insert()`, no `.select()`,
--    so it never needed SELECT back either) -- scoped grants to that.
--
-- 3. Revoke EXECUTE on the two trigger functions from anon/authenticated/
--    PUBLIC. Both are RETURNS trigger functions -- Postgres refuses to
--    run them outside actual trigger context, so direct RPC calls just
--    error rather than leaking anything -- but no reason to leave them
--    listed as callable RPCs.
--
-- MANUAL STEP REQUIRED before this migration will work on a fresh
-- database (deliberately not automated here -- the whole point is these
-- values shouldn't live in a file that gets committed):
--
--   select vault.create_secret('<the real LEADS_WEBHOOK_SECRET value>',
--     'leads_webhook_secret',
--     'Shared secret for notify_new_lead trigger -> notify-new-lead Edge Function');
--   select vault.create_secret('<the real LEAD_CONFIRMATION_WEBHOOK_SECRET value>',
--     'lead_confirmation_webhook_secret',
--     'Shared secret for send_lead_confirmation trigger -> send-lead-confirmation Edge Function');
--
-- Values must match the Edge Functions' own LEADS_WEBHOOK_SECRET /
-- LEAD_CONFIRMATION_WEBHOOK_SECRET secrets (Supabase Dashboard > Edge
-- Functions > Secrets) or the webhook calls will 401.

CREATE OR REPLACE FUNCTION public.notify_new_lead()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions', 'net', 'vault'
AS $function$
declare
  v_secret text;
begin
  select decrypted_secret into v_secret
  from vault.decrypted_secrets
  where name = 'leads_webhook_secret';

  perform net.http_post(
    url := 'https://tvzbtyggphxqnstuxllp.supabase.co/functions/v1/notify-new-lead',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', v_secret
    ),
    body := to_jsonb(new)
  );
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.send_lead_confirmation()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions', 'net', 'vault'
AS $function$
declare
  v_secret text;
begin
  select decrypted_secret into v_secret
  from vault.decrypted_secrets
  where name = 'lead_confirmation_webhook_secret';

  perform net.http_post(
    url := 'https://tvzbtyggphxqnstuxllp.supabase.co/functions/v1/send-lead-confirmation',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', v_secret
    ),
    body := to_jsonb(new)
  );
  return new;
end;
$function$;

REVOKE EXECUTE ON FUNCTION public.notify_new_lead() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.send_lead_confirmation() FROM anon, authenticated, PUBLIC;

REVOKE ALL ON public.leads FROM anon, authenticated;
GRANT INSERT ON public.leads TO anon;

REVOKE ALL ON public.page_events FROM anon, authenticated;
GRANT INSERT ON public.page_events TO anon;
