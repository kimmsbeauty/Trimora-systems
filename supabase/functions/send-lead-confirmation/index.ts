// supabase/functions/send-lead-confirmation/index.ts
//
// Deployed to the "Trimora Systems" Supabase project (tvzbtyggphxqnstuxllp).
//
// Triggered by a Postgres AFTER INSERT trigger on public.leads (via
// pg_net -- see supabase/migrations/20260705_send_lead_confirmation_trigger.sql)
// -- the trigger POSTs the new row directly as the request body. Same
// pattern as notify-new-lead, but this one messages the LEAD, not you --
// it's the qualification funnel's automated WhatsApp confirmation
// (Phase 2 Item 3), not the internal new-lead alert (Item 1).
//
// Auth: verify_jwt is disabled (called by a DB trigger, not a logged-in
// user) -- a dedicated shared secret, LEAD_CONFIRMATION_WEBHOOK_SECRET, is
// checked against x-webhook-secret. Deliberately a SEPARATE secret from
// notify-new-lead's LEADS_WEBHOOK_SECRET, not reused -- same principle as
// that function's own comment: scoping which endpoint a leaked secret can
// hit limits blast radius, even though the practical risk here is similar
// (spamming an endpoint, not a data breach).
//
// Africa's Talking credentials (AFRICASTALKING_API_KEY/USERNAME/WA_NUMBER)
// ARE reused as-is from Item 1, per Lucy's explicit instruction -- same
// account, same sending number, no separate config.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req: Request) => {
  try {
    const expectedSecret = Deno.env.get("LEAD_CONFIRMATION_WEBHOOK_SECRET");
    const providedSecret = req.headers.get("x-webhook-secret");
    if (!expectedSecret || providedSecret !== expectedSecret) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const lead = await req.json();
    if (!lead?.id) {
      return new Response(JSON.stringify({ error: "Malformed payload: missing lead id" }), {
        status: 400,
      });
    }

    // Phone is a required field in the v1 funnel form, but this function
    // doesn't assume that holds forever -- if a row somehow lacks a phone
    // (e.g. a future direct API insert bypassing the form), skip cleanly
    // rather than sending to an empty/undefined number.
    if (!lead.phone) {
      return new Response(
        JSON.stringify({ whatsapp: false, error: "Lead has no phone number — nothing to send to." }),
        { status: 200 }
      );
    }

    const result: { whatsapp: boolean; error: string | null } = {
      whatsapp: false,
      error: null,
    };

    // --- WhatsApp via Africa's Talking ---
    // Contract confirmed against Africa's Talking's own docs
    // (developers.africastalking.com/docs/whatsapp/send_message) --
    // not guessed. Header key is lowercase "apikey", not "Authorization".
    // Same contract as notify-new-lead; re-verify against current docs
    // if this integration is touched again later, per that function's
    // own caveat.
    const atApiKey = Deno.env.get("AFRICASTALKING_API_KEY");
    const atUsername = Deno.env.get("AFRICASTALKING_USERNAME");
    const atWaNumber = Deno.env.get("AFRICASTALKING_WA_NUMBER");

    if (!atApiKey || !atUsername || !atWaNumber) {
      result.error =
        "WhatsApp skipped: AFRICASTALKING_API_KEY/USERNAME/WA_NUMBER not configured yet.";
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const firstName = (lead.full_name ?? "").trim().split(/\s+/)[0] || "there";
    const message =
      `Hi ${firstName},\n\n` +
      `Thank you for your interest in Trimora.\n` +
      `We've received your request and one of our consultants will review your ` +
      `business requirements and get back to you shortly.\n\n` +
      `In the meantime, if you have any questions, simply reply to this WhatsApp message.\n\n` +
      `— Trimora Team`;

    try {
      const res = await fetch("https://chat.africastalking.com/whatsapp/message/send", {
        method: "POST",
        headers: {
          apikey: atApiKey,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: atUsername,
          waNumber: atWaNumber,
          phoneNumber: lead.phone,
          body: { message },
        }),
      });

      if (res.ok) {
        result.whatsapp = true;
      } else {
        result.error = `Africa's Talking ${res.status}: ${await res.text()}`;
      }
    } catch (e) {
      result.error = `Africa's Talking request failed: ${e}`;
    }

    // --- Stamp confirmation_sent_at on success ---
    if (result.whatsapp) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, serviceRoleKey);

      const { error: updateError } = await supabase
        .from("leads")
        .update({ confirmation_sent_at: new Date().toISOString() })
        .eq("id", lead.id);

      if (updateError) {
        result.error = `Failed to stamp confirmation_sent_at: ${updateError.message}`;
      }
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-lead-confirmation error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
