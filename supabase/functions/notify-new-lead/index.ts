// supabase/functions/notify-new-lead/index.ts
//
// Deployed to the "Trimora Systems" Supabase project (tvzbtyggphxqnstuxllp)
// on 2026-07-04. Committed here for review/reproducibility.
//
// Triggered by a Postgres AFTER INSERT trigger on public.leads (via
// pg_net -- see supabase/migrations/20260704_notify_new_lead_trigger.sql)
// -- the trigger POSTs the new row directly as the request body.
//
// Auth: verify_jwt is disabled for this function (it's called by a DB
// trigger, not a logged-in user), so authentication is a shared secret
// header instead -- LEADS_WEBHOOK_SECRET, checked against x-webhook-secret.
// Deliberately NOT the Supabase service_role key: a leaked shared secret
// only lets someone spam this notification endpoint, whereas a leaked
// service_role key would grant full database access.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req: Request) => {
  try {
    const expectedSecret = Deno.env.get("LEADS_WEBHOOK_SECRET");
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

    const summaryLines = [
      `New lead: ${lead.full_name ?? "(no name)"} — ${lead.business_name ?? "(no business name)"}`,
      lead.email ? `Email: ${lead.email}` : null,
      lead.phone ? `Phone: ${lead.phone}` : null,
      lead.biggest_challenge ? `Looking to solve: ${lead.biggest_challenge}` : null,
      lead.source_page ? `Source: ${lead.source_page}` : null,
    ].filter(Boolean);
    const summary = summaryLines.join("\n");

    const results: { email: boolean; whatsapp: boolean; errors: string[] } = {
      email: false,
      whatsapp: false,
      errors: [],
    };

    // --- Email via Resend ---
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const notifyEmailTo = Deno.env.get("NOTIFY_EMAIL_TO");
    const notifyEmailFrom =
      Deno.env.get("NOTIFY_EMAIL_FROM") ?? "Trimora Leads <leads@trimorasystems.com>";

    if (resendApiKey && notifyEmailTo) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: notifyEmailFrom,
            to: [notifyEmailTo],
            subject: `New lead: ${lead.business_name ?? lead.full_name ?? "Website"}`,
            text: summary,
          }),
        });
        if (res.ok) {
          results.email = true;
        } else {
          results.errors.push(`Resend ${res.status}: ${await res.text()}`);
        }
      } catch (e) {
        results.errors.push(`Resend request failed: ${e}`);
      }
    } else {
      results.errors.push("Email skipped: RESEND_API_KEY or NOTIFY_EMAIL_TO not configured yet.");
    }

    // --- WhatsApp via Africa's Talking ---
    // Contract confirmed against Africa's Talking's own docs
    // (developers.africastalking.com/docs/whatsapp/send_message) --
    // not guessed. Header key is lowercase "apikey", not "Authorization".
    const atApiKey = Deno.env.get("AFRICASTALKING_API_KEY");
    const atUsername = Deno.env.get("AFRICASTALKING_USERNAME");
    const atWaNumber = Deno.env.get("AFRICASTALKING_WA_NUMBER"); // your registered sending number
    const notifyWhatsappTo = Deno.env.get("NOTIFY_WHATSAPP_TO");

    if (atApiKey && atUsername && atWaNumber && notifyWhatsappTo) {
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
            phoneNumber: notifyWhatsappTo,
            body: { message: summary },
          }),
        });
        if (res.ok) {
          results.whatsapp = true;
        } else {
          results.errors.push(`Africa's Talking ${res.status}: ${await res.text()}`);
        }
      } catch (e) {
        results.errors.push(`Africa's Talking request failed: ${e}`);
      }
    } else {
      results.errors.push(
        "WhatsApp skipped: AFRICASTALKING_API_KEY/USERNAME/WA_NUMBER or NOTIFY_WHATSAPP_TO not configured yet."
      );
    }

    // --- Stamp whichever channel(s) succeeded ---
    if (results.email || results.whatsapp) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, serviceRoleKey);

      const updates: Record<string, string> = {};
      const now = new Date().toISOString();
      if (results.email) updates.notified_email_at = now;
      if (results.whatsapp) updates.notified_whatsapp_at = now;

      const { error } = await supabase.from("leads").update(updates).eq("id", lead.id);
      if (error) results.errors.push(`Failed to stamp notified_*_at: ${error.message}`);
    }

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("notify-new-lead error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
