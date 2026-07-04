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

**Files:** `src/app/privacy/page.js`, `src/app/terms/page.js`

Both are currently "Coming soon" stub pages. This is a compliance gap,
not a copywriting one.

**Status:** Blocking requirement for production launch. Must be:
- Professionally drafted (not fabricated by AI tooling)
- Reviewed for compliance with the **Kenya Data Protection Act, 2019**
- Published before onboarding any paying customer whose business or
  customer data will pass through Trimora POS or Trimora Systems

**Action when ready:** Replace stub content in both files with the
final, reviewed legal text.

---

*Last updated: 2026-07-04*
