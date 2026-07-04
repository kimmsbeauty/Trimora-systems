# Pre-Launch Checklist

Items tracked here are **blocking requirements for production launch**
(i.e. before onboarding paying customers), but do **not** block ongoing
website development. Each was deliberately left as a placeholder rather
than fabricated, per the Engineering Constitution's no-hallucination rule.

## 1. Why Choose Trimora — Differentiators 3 & 4 (Section 3.8)

**File:** `src/components/why-choose.jsx`

Two of the four published differentiators are placeholders pending real
confirmation:

- **"Local support, global standards"** — needs the actual support model
  (channels, hours, SLAs) before this can be more specific than the
  current generic claim.
- **"Data you can trust"** — needs the actual security architecture
  (encryption, backups, hosting, access controls) before publishing
  specific security claims.

**Status:** Published as-is (per explicit approval), not to be expanded
or made more specific until the underlying facts are confirmed.

**Action when ready:** Update the `description` fields for
`local-support` and `data-trust` in `DIFFERENTIATORS` with accurate,
specific claims once support model and security posture are finalized.

## 2. Privacy Policy & Terms of Service

**Files:** `src/app/legal/privacy/page.js`, `src/app/legal/terms/page.js`

Both are currently "Coming soon" stub pages. This is a compliance gap,
not a copywriting one.

**Status:** Blocking requirement for production launch. Must be:
- Professionally drafted (not fabricated by AI tooling)
- Reviewed for compliance with the **Kenya Data Protection Act, 2019**
- Published before onboarding any paying customer whose business or
  customer data will pass through Trimora POS or Trimora Systems

**Action when ready:** Replace stub content in both files with the
final, reviewed legal text.

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

**Action when ready:** Add a Supabase Database Webhook on `leads` INSERT
→ an Edge Function that sends an email (and/or WhatsApp via Africa's
Talking, already integrated on the POS side) and stamps the
`notified_*_at` column. Needs a transactional email provider API key
(e.g. Resend) added as a Supabase secret — not yet provisioned.

---

*Last updated: 2026-07-04*
