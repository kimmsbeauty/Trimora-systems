// supabase/functions/send-lead-confirmation/index.ts
//
// Email-only, per PRE_LAUNCH_CHECKLIST.md Item 4's documented decision
// (2026-07-05): an unsolicited, business-initiated WhatsApp message to a
// lead's own number likely runs into Meta/Africa's Talking's opt-in and
// template requirements outside a customer-initiated session -- those
// exact rules weren't verified, so this avoids the compliance risk rather
// than guessing.
//
// HISTORY: this function briefly sent both email and WhatsApp (see git
// history around commit 4953db4, "Merge email + WhatsApp confirmation
// into one function") after two parallel sessions independently built
// each half. That merge was itself correct given what was known at the
// time, but a subsequent compliance review reversed the WhatsApp half --
// this file previously lagged that decision (the checklist said
// "removed" while the deployed code still sent it) until this fix.
// Phone-only leads currently get no automated confirmation from this
// function -- logged as a skip below, not a silent no-op.
//
// notify-new-lead (Item 1, the internal alert TO you, not to the lead) is
// a separate function and is NOT affected by this -- it still uses
// WhatsApp, since that's not a business-initiated message to an
// unconsenting third party in the same way.
//
// Deployed to the "Trimora Systems" Supabase project (tvzbtyggphxqnstuxllp).
// Triggered by a Postgres AFTER INSERT trigger on public.leads (via
// pg_net) -- the trigger POSTs the new row directly as the request body.
//
// Auth: verify_jwt is disabled (called by a DB trigger, not a logged-in
// user) -- a dedicated shared secret, LEAD_CONFIRMATION_WEBHOOK_SECRET,
// checked against x-webhook-secret. Deliberately separate from
// notify-new-lead's own secret, to scope blast radius per endpoint.
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

    const firstName = (lead.full_name ?? "").trim().split(/\s+/)[0] || "there";
    const result: { email: boolean; errors: string[] } = {
      email: false,
      errors: [],
    };

    // --- Email via Resend (only if the lead gave an email) ---
    if (lead.email) {
      const resendApiKey = Deno.env.get("RESEND_API_KEY");
      const fromAddress =
        Deno.env.get("NOTIFY_EMAIL_FROM") ?? "Trimora Systems <hello@trimorasystems.com>";
      const calBookingUrl = Deno.env.get("CAL_BOOKING_URL"); // optional

      if (!resendApiKey) {
        result.errors.push("Email skipped: RESEND_API_KEY not configured yet.");
      } else {
        const bodyLines = [
          `Hi ${firstName},`,
          "",
          `Thanks for reaching out about ${lead.business_name ?? "your business"} -- we've got your details and someone from Trimora will be in touch shortly.`,
        ];
        if (calBookingUrl) {
          bodyLines.push(
            "",
            `If you'd like to pick a time now instead of waiting to hear back: ${calBookingUrl}`
          );
        }
        bodyLines.push("", "Trimora Systems");

        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${resendApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: fromAddress,
              to: [lead.email],
              subject: "We've got your request -- Trimora Systems",
              text: bodyLines.join("\n"),
            }),
          });
          if (res.ok) {
            result.email = true;
          } else {
            result.errors.push(`Resend ${res.status}: ${await res.text()}`);
          }
        } catch (e) {
          result.errors.push(`Resend request failed: ${e}`);
        }
      }
    }

    if (!lead.email) {
      result.errors.push(
        lead.phone
          ? "Lead has no email -- WhatsApp confirmation is intentionally disabled (compliance, see PRE_LAUNCH_CHECKLIST.md Item 4), so nothing was sent."
          : "Lead has no email -- nothing to confirm to."
      );
    }

    // --- Stamp confirmation_sent_at if email succeeded ---
    if (result.email) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, serviceRoleKey);

      const { error: updateError } = await supabase
        .from("leads")
        .update({ confirmation_sent_at: new Date().toISOString() })
        .eq("id", lead.id);

      if (updateError) result.errors.push(`Failed to stamp confirmation_sent_at: ${updateError.message}`);
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
