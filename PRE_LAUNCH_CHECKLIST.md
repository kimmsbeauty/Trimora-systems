# Pre-Launch Checklist

Items tracked here are **blocking requirements for production launch**
(i.e. before onboarding paying customers), but do **not** block ongoing
website development. Each was deliberately left as a placeholder rather
than fabricated, per the Engineering Constitution's no-hallucination rule.

## 1. Why Choose Trimora — Differentiators 3 & 4 (Section 3.8)

**File:** `src/components/why-choose.jsx`

**Status: RESOLVED (2026-07-05, commit `d4fd589`).** Both differentiators
now use confirmed facts, not placeholders:

- **"Local support, global standards"** — email + WhatsApp
  (+254 702 904 562), same-business-day response.
- **"Data you can trust"** — Row-Level Security on all tables, PINs
  hashed (not plain text), HTTPS/TLS.

No further action needed here unless the underlying facts change.

## 2. Privacy Policy & Terms of Service

**Files:** `src/app/legal/privacy/page.js`, `src/app/legal/terms/page.js`,
`src/components/legal-section.jsx`

**Status: PUBLISHED (2026-07-05, commit `dc2d895`) — pending legal
review, not yet lawyer-reviewed final text.** Both pages now render
full policy content (replacing the prior "Coming soon" stubs), dated
Effective/Last Updated 5 July 2026. Published per explicit approval
to go live without a visible draft banner — this was a deliberate
choice, not an oversight, but it means the live text is the operative
policy for existing customers right now, not a placeholder.

**Still open — genuinely need legal input, not just facts (those parts
are now resolved, see Item 1):**
- Exact post-termination data export window (Terms §19 currently
  says "reasonable period" — needs a real number of days)
- Preferred dispute resolution path: Kenyan courts vs. a named
  arbitration/mediation body (Terms §20)
- Liability cap language (Terms §16) has **not** been reviewed by
  counsel against Kenyan contract law or the Consumer Protection Act

**Action when ready:** Have the published text reviewed by counsel
against the **Kenya Data Protection Act, 2019**, then update the
`SECTIONS` arrays in the two page files (and `why-choose.jsx` for
Item 1) with confirmed specifics in place of the current generic
language.

## 3. Lead notification (Phase 1, Item 8)

**Files:** `src/components/lead-form-modal.jsx`, Supabase `leads` table
(project: Trimora Systems, `tvzbtyggphxqnstuxllp`)

The lead capture form writes directly to Supabase and works end-to-end,
but nothing currently *notifies* you when a new lead arrives — you'd need
to check the Supabase table dashboard manually. The `leads` table already
has `notified_email_at` / `notified_whatsapp_at` columns reserved for
this.

**Status: INFRASTRUCTURE BUILT AND VERIFIED (2026-07-04) — activation
pending your API keys.** The Edge Function (`notify-new-lead`), the
Postgres trigger firing it on every `leads` INSERT, and the shared-secret
auth between them are deployed and tested end-to-end (confirmed via
`net._http_response` logs: 401 before the secret was set, 200 after).
Provider decisions are made: Resend for email (3,000/mo free, no card),
Africa's Talking for WhatsApp (reusing the same account as POS).

**What's still needed to actually send notifications** — add these as
Edge Function secrets (Supabase Dashboard → Trimora Systems project →
Edge Functions → notify-new-lead → Secrets), one at a time as each
becomes available. The function degrades gracefully per-channel, so
partial setup is fine:

```
RESEND_API_KEY
NOTIFY_EMAIL_TO
AFRICASTALKING_API_KEY
AFRICASTALKING_USERNAME
AFRICASTALKING_WA_NUMBER
NOTIFY_WHATSAPP_TO
```

`LEADS_WEBHOOK_SECRET` is already set — don't redo that one.

## 4. Lead confirmation email to the lead themselves (discovered 2026-07-05)

**Files:** `src/components/lead-form-modal.jsx` (qualification funnel, Item 3), Supabase `leads` table, `supabase/functions/send-lead-confirmation/`

While testing Item 3's funnel, found a **pre-existing trigger already in the live database** (`trg_send_lead_confirmation`) that neither this session nor its predecessor had finished: it pointed at an Edge Function that was never deployed (silently 404ing on every single lead insert) and used a literal placeholder string as its webhook secret. Not something newly built here — genuinely broken leftover scaffolding from an earlier session, only found because Item 3's testing happened to check `net._http_response` closely.

**Status: NOW FIXED AND DEPLOYED (2026-07-05).** The function is real and tested (401 → confirmed once its secret was set, same verification pattern as Item 1). Scope decision: **email-only for v1**, not WhatsApp — an unsolicited business-initiated WhatsApp message to a lead's own number likely runs into Meta/Africa's Talking's opt-in/template requirements outside a customer-initiated session, and those exact rules weren't verified, so this avoids the compliance risk rather than guessing. Phone-only leads currently get no automated confirmation (logged as a skip, not silent).

**What's still needed:**

```
LEAD_CONFIRMATION_WEBHOOK_SECRET   ✅ SET AND VERIFIED (2026-07-05) — don't redo this one
RESEND_API_KEY                     (same key as Item 1, shared)
NOTIFY_EMAIL_FROM                  (optional — defaults to support@trimorasystems.com)
CAL_BOOKING_URL                    (optional — includes a direct booking link in the email once Cal.com exists)
```

---

*Last updated: 2026-07-05 (Item 1 resolved, Item 2's support/security
sub-items resolved — only genuine legal-review items remain open)*
