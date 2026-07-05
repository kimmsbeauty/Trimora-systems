// supabase/functions/send-lead-confirmation/index.ts
//
// MERGED from two sessions that independently built this in parallel
// without knowing about each other (discovered via a git push conflict on
// 2026-07-05). One session built an email-only version; the other built a
// WhatsApp-only version with an explicit note that Lucy had directly
// authorized reusing Item 1's Africa's Talking credentials for this. Per
// Lucy's explicit resolution when told about the conflict: send BOTH --
// whichever channel(s) the lead actually provided, not an either/or.
//
// Deployed to the "Trimora Systems" Supabase project (tvzbtyggphxqnstuxllp).
// Triggered by a Postgres AFTER INSERT trigger on public.leads (via
// pg_net) -- the trigger POSTs the new row directly as the request body.
// This messages the LEAD, not you -- see notify-new-lead for the internal
// new-lead alert (Item 1).
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
    const result: { email: boolean; whatsapp: boolean; errors: string[] } = {
      email: false,
      whatsapp: false,
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

    // --- WhatsApp via Africa's Talking (only if the lead gave a phone) ---
    // Contract confirmed against Africa's Talking's own docs
    // (developers.africastalking.com/docs/whatsapp/send_message) -- not
    // guessed. Header key is lowercase "apikey", not "Authorization".
    // Credentials reused as-is from Item 1's AFRICASTALKING_* secrets, per
    // Lucy's explicit instruction (confirmed in the parallel session that
    // originally built this half).
    if (lead.phone) {
      const atApiKey = Deno.env.get("AFRICASTALKING_API_KEY");
      const atUsername = Deno.env.get("AFRICASTALKING_USERNAME");
      const atWaNumber = Deno.env.get("AFRICASTALKING_WA_NUMBER");

      if (!atApiKey || !atUsername || !atWaNumber) {
        result.errors.push(
          "WhatsApp skipped: AFRICASTALKING_API_KEY/USERNAME/WA_NUMBER not configured yet."
        );
      } else {
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
            result.errors.push(`Africa's Talking ${res.status}: ${await res.text()}`);
          }
        } catch (e) {
          result.errors.push(`Africa's Talking request failed: ${e}`);
        }
      }
    }

    if (!lead.email && !lead.phone) {
      result.errors.push("Lead has neither email nor phone — nothing to confirm to.");
    }

    // --- Stamp confirmation_sent_at if either channel succeeded ---
    if (result.email || result.whatsapp) {
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
