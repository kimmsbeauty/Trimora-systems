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

**Status: PUBLISHED AND LEGALLY REVIEWED (2026-07-06).** Both pages
render full policy content, dated Effective/Last Updated 5 July 2026.
Counsel reviewed the three previously-flagged items and confirmed the
text as originally drafted needs no changes:

- **Terms §19 (data export window):** "reasonable period" confirmed
  fine as-is — no fixed number of days required.
- **Terms §20 (dispute resolution):** confirmed Kenyan courts as the
  venue — the existing text already specifies this (good-faith
  negotiation → mediation → "competent courts of Kenya" if unresolved),
  so no text change was needed.
- **Terms §16 (liability cap):** confirmed fine as-is (cap at 12 months'
  fees paid, standard exclusions).

No further legal action needed on this item unless the underlying facts
or applicable law change.

## 3. Lead notification (Phase 1, Item 8)

**Files:** `src/components/lead-form-modal.jsx`, Supabase `leads` table
(project: Trimora Systems, `tvzbtyggphxqnstuxllp`)

**Status: EMAIL CHANNEL CONFIRMED WORKING (2026-07-06)** — via a
documented interim workaround, not the real production setup. No
domain is purchased/verified yet, so this uses Resend's free sandbox:
sender is `onboarding@resend.dev`, and delivery is restricted to only
the Resend account's own signup address. Confirmed via both the
function's own logged result (`{"email":true,...}`) and a real email
received with correct lead details.

**Current config (Supabase Edge Function Secrets):**
```
RESEND_API_KEY      ✅ set
NOTIFY_EMAIL_TO     ✅ set to trimorapos@gmail.com — MUST stay this
                       exact address (the literal Resend signup email)
                       until a domain is verified, or delivery breaks
                       with a 403
NOTIFY_EMAIL_FROM   ✅ set to "Trimora Systems <onboarding@resend.dev>"
LEADS_WEBHOOK_SECRET ✅ set
```

**WhatsApp channel not configured** (Africa's Talking keys absent) —
email-only for now, by choice, not a gap.

**When the domain is purchased and verified in Resend:** revisit
`NOTIFY_EMAIL_FROM` (can become a real `leads@trimorasystems.com`
sender) and `NOTIFY_EMAIL_TO` (can become any real inbox).

## 4. Lead confirmation email to the lead themselves (discovered 2026-07-05)

**Files:** `src/components/lead-form-modal.jsx` (qualification funnel, Item 3), Supabase `leads` table, `supabase/functions/send-lead-confirmation/`

While testing Item 3's funnel, found a **pre-existing trigger already in the live database** (`trg_send_lead_confirmation`) that neither this session nor its predecessor had finished: it pointed at an Edge Function that was never deployed (silently 404ing on every single lead insert) and used a literal placeholder string as its webhook secret. Not something newly built here — genuinely broken leftover scaffolding from an earlier session, only found because Item 3's testing happened to check `net._http_response` closely.

**Status: DEPLOYED, BUT GENUINELY CANNOT WORK YET (confirmed 2026-07-06)
— hard platform limitation, not a config gap.** Unlike Item 3 above,
this function emails an arbitrary lead's address, not Lucy's own Resend
signup email — Resend's sandbox mode will always reject that with a 403
until a real domain is purchased and verified. The Item 3 workaround
does not apply here; there is no sandbox-mode substitute for emailing
third parties. This was briefly and incorrectly marked "confirmed
working" on 2026-07-06 based on a false positive (Cal.com's own booking
confirmation email, mistaken for this function's email) — corrected
same day once the actual Logs-tab result was checked.

Scope decision: **email-only for v1**, not WhatsApp — an unsolicited business-initiated WhatsApp message to a lead's own number likely runs into Meta/Africa's Talking's opt-in/template requirements outside a customer-initiated session, and those exact rules weren't verified, so this avoids the compliance risk rather than guessing. Phone-only leads currently get no automated confirmation (logged as a skip, not silent).

**Current config:**

```
LEAD_CONFIRMATION_WEBHOOK_SECRET   ✅ SET AND VERIFIED
RESEND_API_KEY                     ✅ set (shared with Item 3) — present,
                                       but every send attempt for this
                                       function will fail with a 403
                                       regardless, since it targets
                                       third-party lead addresses
NOTIFY_EMAIL_FROM                  set to onboarding@resend.dev (shared
                                       secret with Item 3 — see that
                                       item's note on what to revisit
                                       once a domain exists)
CAL_BOOKING_URL                    ✅ set — https://cal.com/trimorapos-vp9pyt/trimora-systems
```

**The only real fix:** purchase and verify the domain in Resend. Once
done, this starts working immediately with no code changes needed.

## 5. Domain purchase and verification (the one real remaining blocker)

**Status: NOT YET DONE.** No domain is currently purchased or verified
in Resend. This single fact is the actual root cause keeping Item 4
hard-blocked and Item 3 running on a sandbox workaround instead of its
real setup. Nothing else on this list is currently blocked by anything
except this.

---

*Last updated: 2026-07-06 (Items 1, 2 fully resolved; Items 3 & 4
corrected to reflect actual confirmed state, not assumptions; Item 5
added as the one real remaining blocker)*
