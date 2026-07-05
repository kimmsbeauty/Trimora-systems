// supabase/functions/send-lead-confirmation/index.ts
//
// Completes the trigger `trg_send_lead_confirmation` found already present
// in the database (leftover, unfinished scaffolding from a prior session --
// the trigger existed and was firing on every lead insert, but this
// function had never actually been deployed, so it 404'd silently every
// time). Deployed to the "Trimora Systems" Supabase project.
//
// Scope decision for v1: EMAIL ONLY, not WhatsApp. Sending an unsolicited
// business-initiated WhatsApp message to a lead's own number likely runs
// into WhatsApp Business API template/opt-in requirements outside a
// customer-initiated session window -- exact rules for Africa's Talking's
// implementation were not verified, so rather than guess and risk a
// compliance issue or a blocked sender account, this only confirms via
// email (and only when the lead provided one). Phone-only leads get no
// automated confirmation yet -- logged as a skip, not a silent failure.
//
// Auth: same pattern as notify-new-lead -- a dedicated shared secret
// (LEAD_CONFIRMATION_WEBHOOK_SECRET, distinct from notify-new-lead's own
// secret so the two functions don't share a credential), not the
// service_role key.
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

    if (!lead.email) {
      return new Response(
        JSON.stringify({
          sent: false,
          reason: "Lead provided no email -- phone-only confirmation not supported yet.",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const fromAddress = Deno.env.get("NOTIFY_EMAIL_FROM") ?? "Trimora Systems <hello@trimorasystems.com>";
    // Optional: if set, the confirmation email includes a direct booking
    // link. Not required -- degrades to a plain "we'll be in touch"
    // message without it, same as the frontend success screen.
    const calBookingUrl = Deno.env.get("CAL_BOOKING_URL");

    if (!resendApiKey) {
      return new Response(JSON.stringify({ sent: false, reason: "RESEND_API_KEY not configured yet." }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const firstName = (lead.full_name ?? "").split(" ")[0] || "there";
    const bodyLines = [
      `Hi ${firstName},`,
      "",
      `Thanks for reaching out about ${lead.business_name ?? "your business"} -- we've got your details and someone from Trimora will be in touch shortly.`,
    ];
    if (calBookingUrl) {
      bodyLines.push("", `If you'd like to pick a time now instead of waiting to hear back: ${calBookingUrl}`);
    }
    bodyLines.push("", "Trimora Systems");
    const text = bodyLines.join("\n");

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
        text,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("send-lead-confirmation Resend error:", res.status, errText);
      return new Response(JSON.stringify({ sent: false, error: `Resend ${res.status}: ${errText}` }), {
        status: 200,
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { error } = await supabase
      .from("leads")
      .update({ confirmation_sent_at: new Date().toISOString() })
      .eq("id", lead.id);
    if (error) console.error("Failed to stamp confirmation_sent_at:", error.message);

    return new Response(JSON.stringify({ sent: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-lead-confirmation error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
