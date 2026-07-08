# HANDOVER: Trimora Auto Kickoff — Read This Before Doing Anything

> ⚠️ **SCOPE NOTICE — read before anything else in this file.**
> This document describes the **`Trimora-POS`** repository
> (`github.com/kimmsbeauty/Trimora-POS`) and the Trimora Auto
> initiative built on top of it. It has **nothing to do with this
> repository** (`Trimora-systems`, the marketing website). It's stored
> here purely as reference material at Lucy's explicit request — no
> Trimora-POS work has been, or should be, done from within this repo
> or by whichever session is working on this website. If you're
> working on the website and looking for accurate current state,
> read `HANDOVER.md` and `PRE_LAUNCH_CHECKLIST.md` at the repo root
> instead — not this file. Added 2026-07-08.

---

**Written:** 2026-07-07, end of a long prior session on `Trimora-POS`/`Trimora-systems`.
**Purpose:** You (a new Claude session) have been given three documents — `trimora_auto_kickoff_brief.md`,
`trimora_pos_audit.md`, `trimora_first_task.md` — that lay out the Trimora Auto initiative and a proposed
first task. This handover gives you the real, directly-verified state of the codebase those documents are
about, plus the operating discipline this project runs on. Read this in full before producing the plan those
documents ask for.

---

## 1. What has NOT happened yet — read this first

**Nothing for Trimora Auto has been built.** No code, no schema, no plan has been written or approved. The
three documents you received are: a kickoff brief (constraints + what's wanted), an audit of the current repo
(written by a prior AI session, not independently verified by me in full), and a proposed "first task" (fix
the tenancy foundation before touching Auto features). Your actual job right now, per `trimora_first_task.md`,
is to **produce the Step 1–5 plan it asks for and wait for sign-off** — not to start building Auto features,
and not to start implementing the tenancy fixes either, until that plan is approved.

---

## 2. Repos and infrastructure — exact identifiers

| What | Value |
|---|---|
| POS repo | `github.com/kimmsbeauty/Trimora-POS` — this is what Trimora Auto extends |
| Marketing site repo | `github.com/kimmsbeauty/Trimora-systems` — separate product, separate concern, not part of Auto's scope |
| POS Supabase project | `ukoccobbjeomjwjcvrma` (name: "kimmsbeauty", region `eu-west-1`) |
| Website Supabase project | `tvzbtyggphxqnstuxllp` (name: "Trimora Systems", region `eu-west-1`) |
| Supabase org | `jvsgfsimywnnumeymfge` — **both projects are on the free plan** (no automated backups, no PITR — see §6) |
| Vercel team | `kimms-beauty-s-projects` |
| Vercel POS project | `trimora-pos` (project ID `prj_AjqWaTmlGNW1xEQcqJz9EiRhb67m`), production domain `trimora-pos.vercel.app` |

The operator's name across this project's own docs/commits is **Lucy** (Lucy Kimathi, per git commit
authorship seen this session) — some much older memory context may reference a different name/founder for
"Trimora Systems"; treat Lucy as the actual person you're working with unless she says otherwise.

---

## 3. Critical operating discipline — this is not optional

### 3a. Parallel-session collisions are a real, ongoing, unsolved risk
Multiple other Claude sessions have been working on this exact repo concurrently, without coordination,
repeatedly, over the course of a single day. Confirmed instances from this session alone:
- A parallel session independently built the same "Item 3" qualification funnel on the website at the same
  time I did — had to be manually reconciled with Lucy mid-session.
- A parallel session did a full visual re-skin of the website ("Paper & Ink") while I was mid-task.
- **A parallel session is (or was) actively working on a "pin reset flow" bug in `Trimora-POS` right now** —
  it reported having a fix "fully committed and merged locally" but couldn't push due to a GitHub token
  scoped only to `Trimora-systems`, not `Trimora-POS`. That fix, if it still exists, is stuck in that other
  session's own sandbox and was never retrievable by me. **This is still unresolved** — if you have any way to
  get that session's actual diff (ask Lucy), that's better than re-diagnosing blind.
- A stray, unreconciled migration file `015_allow_anon_payment_status_update.sql` exists in the repo right
  now, proposing a different fix for a bug I also fixed differently (`015_add_bookings_anon_update_payment_status.sql`,
  superseded by my later `016_staff_confirmed_payments_and_mpesa_columns.sql`). I confirmed via live
  `pg_policies` inspection that **the database currently reflects my version, not this file's** — the file is
  stale/orphaned, written by a session that (as far as I can tell) never actually applied it to the database.
  I did not delete or reconcile it — flagging it here for whoever picks this up next.

**Practical rule that held up well this session:** before making ANY change, `git fetch` and check
`git log HEAD..FETCH_HEAD --oneline` — if there's new drift, read it before touching anything, verify your own
prior work survived any merge, and re-run build/lint after merging before proceeding. Before every push, do
the same fetch-and-check again — drift can and did arrive mid-task, not just at the start.

### 3b. Greenlight Policy
Nothing gets built without explicit approval. For anything non-trivial: audit first (read the real code, query
the real database — never assume), propose a plan, flag genuine open questions and decisions that need Lucy's
input (not just style preferences), wait for explicit sign-off, then build. This is exactly the discipline
`trimora_auto_kickoff_brief.md` and `trimora_first_task.md` are themselves asking for — it's not new, it's how
this whole project has operated throughout.

### 3c. Credential hygiene
GitHub Personal Access Tokens get pasted directly into chat repeatedly throughout this project (not ideal, but
the established reality). Rules that matter:
- **Never let a token persist in git remote config.** After cloning with a token embedded in the URL,
  immediately `git remote set-url origin <token-free URL>`, then pass the token inline only on the specific
  `git push`/`git fetch` command that needs it.
- Remind Lucy to revoke each token after use — she frequently doesn't, and tokens from earlier in a session
  often turn out to still be live when tested later.
- A token can silently stop working mid-session (revoked or expired) — the failure signature is
  `fatal: could not read Password ... No such device or address`. That's not a bug in your approach; ask for a
  fresh token.
- One token was missing `workflow` scope and GitHub rejected a push touching `.github/workflows/*` with a
  clear error naming the problem — if you hit that, ask Lucy to add the `workflow` scope to the token rather
  than working around it.

### 3d. Verification standards
- **Always run the actual build before calling anything done.** `Trimora-POS` is Create React App:
  `CI=true npm run build` (the `CI=true` matters — without it, warnings can behave differently). There is
  **no lint script** in this repo's `package.json` (only `start`, `build`, `test`) — don't assume one exists.
- For any RLS/database change: apply it live via the Supabase MCP tools, then verify via direct catalog
  queries (`pg_policies`, `information_schema.column_privileges`, `pg_proc.prosrc` for function bodies) —
  don't trust a migration file's presence in git as proof of what's actually live. Migrations in this repo are
  **not auto-applied by any runner** — they're applied by hand via `apply_migration`/`execute_sql` and
  committed to the repo afterward purely for reproducibility/review. A file existing in `supabase/migrations/`
  does not mean its SQL has been run against the database.
- **A real, reproducible sandbox limitation:** testing RLS policies by using `SET LOCAL ROLE anon;` inside the
  Supabase MCP's `execute_sql` tool is unreliable in this environment — it failed even for a trivial
  `WITH CHECK (true)` control case during this session, for reasons that couldn't be fully diagnosed (possibly
  connection-pooling/transaction-boundary behavior specific to that MCP tool). Static verification (checking
  policy definitions, checking grants, evaluating each clause of a `WITH CHECK` expression manually against
  literal test values) was used instead, with an explicit note each time that a true end-to-end anon-role test
  via the real REST API (curl with the actual anon key, or a real user going through the real app) is the
  authoritative way to confirm — and should be done by Lucy or a future session with real network access, not
  assumed from static checks alone.
- Direct network access to `*.supabase.co` and most other domains is **not available** from this sandbox's
  `bash_tool` (an explicit egress allowlist blocks it) — you cannot `curl` the live REST API yourself. Use the
  Supabase MCP tools for all database interaction instead.
- Supabase MCP tools (`list_edge_functions`, `get_edge_function`, `get_logs`, occasionally
  `deploy_edge_function`) intermittently fail with a bare `"No approval received."` error with no other
  detail. Retry once or twice; don't burn excessive retries. **Important caveat discovered this session:** at
  least one deploy that reported this failure had actually silently succeeded server-side with different
  content than intended — if something seems inconsistent after a reported failure, verify the actual live
  state directly rather than assuming the reported failure means nothing happened.
- Vercel MCP tools (`list_teams`, `list_deployments`, `get_deployment`) showed the same intermittent failure
  pattern; `get_project` with the explicit project name (`trimora-pos`) and team slug
  (`kimms-beauty-s-projects`) worked reliably as a fallback — use that combination directly rather than trying
  to discover IDs via `list_teams` first.

---

## 4. Verified current state of Trimora-POS (directly confirmed this session, not just relayed from the audit)

### Auth model — three separate, parallel systems, none of them Supabase's built-in password auth for staff
1. **Device auth** (`src/lib/deviceAuth.js`) — a passwordless "silent" login establishing a real Supabase Auth
   session per device roughly every 30 days, scoped to one salon, persisted client-side.
2. **Staff/admin PIN** — a second layer on top of an already-trusted device session. PINs are bcrypt-hashed
   (`crypt(..., gen_salt('bf', 10))`) in `salon_pins`, rate-limited via `pin_login_attempts`/
   `check_pin_lockout()`. All 8 live PIN records confirmed bcrypt (no legacy weak hashes remaining).
3. **Super Admin** — real email/password Supabase Auth, gated on `app_metadata.is_super_admin` (never
   `user_metadata`, which is self-editable by any authenticated user via the client SDK — this exact
   distinction was the root cause of a real privilege-escalation vulnerability fixed this session, see §5).
4. **Sales Rep** (new this session) — same pattern as Super Admin, gated on `app_metadata.is_sales_rep`. Login
   at `/sales`. Accounts are created via a new Edge Function (`admin-create-sales-rep`), triggered from a
   "+ Add Sales Rep" button in the Super Admin dashboard's new "Requests" tab.

There is also a self-service "Forgot Admin PIN" flow (`ForgotPinPage.jsx` → Supabase recovery email →
`ResetPinPage.jsx` → `update_salon_pin` RPC) with a fairly elaborate client-side redirect-detection mechanism
in `App.jsx`'s root, built to work around Supabase's known-flaky `redirectTo`/hash-fragment handling on
recovery links. **This is the area the still-unresolved parallel session's "pin reset flow" bug likely lives
in** (see §3a) — I audited it for obvious breakage and found none from my own changes, but could not fully
verify the live email-click flow myself (no email access, no real browser). If this resurfaces, start here.

### Security fixes made this session (all verified live via direct catalog queries)
- **Privilege escalation, `admin_reset_pin`:** a legacy, unused function (superseded by
  `super_admin_reset_salon_pin`) checked the self-editable `user_metadata` claim and hashed PINs with plain
  MD5. Confirmed via full frontend grep that nothing called it. Dropped entirely.
  (`013_close_admin_reset_pin_and_subscription_plans_gap.sql`)
- **Privilege escalation, `subscription_plans` RLS policy:** same `user_metadata` vs `app_metadata` issue,
  fixed to check `app_metadata`. Same migration as above.
- **`bookings_anon_insert` hardened:** previously `WITH CHECK (true)` — anyone could insert a booking under
  any `salon_id`, including nonexistent or suspended ones. Fixed via a narrow `SECURITY DEFINER` helper
  (`salon_is_bookable(uuid)`, boolean-only, no data exposure) since `salons` itself has RLS that makes it
  invisible to `anon` directly. (`014_harden_bookings_anon_insert.sql`)
- **`bookings` anon UPDATE (payment_status):** originally there was no anon UPDATE policy on `bookings` at
  all, so the public booking page's "I've Paid"/"Pay Later" buttons were silently failing RLS every time —
  `payment_status` likely never actually left `'pending'` for any public booking. Fixed with a column-level
  `GRANT UPDATE (payment_status)` (never any other column) plus a row-level policy restricting the
  transition. This went through **two iterations**:
  - First: `pending → paid_upfront`/`pay_later` directly (`015_add_bookings_anon_update_payment_status.sql`).
  - Then, after Lucy raised the real question "how do we verify the customer actually paid?": changed to
    `pending → awaiting_confirmation`/`pay_later` — the customer's claim no longer directly confirms payment;
    a staff member must confirm it from the POS app after checking their own M-Pesa (see next item). This is
    the **current live state**, per `016_staff_confirmed_payments_and_mpesa_columns.sql`. The orphaned
    `015_allow_anon_payment_status_update.sql` (§3a) proposes yet a third variant and does **not** reflect
    live reality.
- **Known, accepted, NOT fixed:** `bookings.id` is a plain sequential `bigint`, not a random/opaque token —
  someone could enumerate IDs and flip an unrelated salon's pending booking. Real-world impact is low
  (`payment_status` is a bookkeeping flag; the actual M-Pesa transaction happens entirely outside this app),
  but a proper fix would need a random per-booking access token — flagged, not built.

### Staff-confirmed payments (interim model, built this session, live)
`BookingPage.jsx`'s "I've Paid" now sets `payment_status = 'awaiting_confirmation'` (timestamped via a new
`payment_claimed_at` column) instead of confirming directly. `POSApp.jsx`'s Appointments view shows a distinct
badge and a "Confirm Payment Received" button for these — an authenticated, salon-scoped staff action. This is
explicitly an **interim measure** while Safaricom Daraja finalization is pending (see next section) — Lucy
was clear this isn't the permanent answer, just the honest one available right now.

### Real M-Pesa Daraja STK Push infrastructure already exists — dormant, built by a different parallel session
`mpesa-stk-push` and `mpesa-callback` Edge Functions, plus `salon_mpesa_config`/`salon_mpesa_payments` tables,
already exist in this repo. Verified: 0 configured salons (consistent with Safaricom finalization being
incomplete), correctly matches Safaricom's current public STK Push API contract (verified via live web search
against Safaricom's own docs, not assumed from memory). **This is for a different flow** — staff-initiated,
in-person POS sale payment (a "Send STK Push" button during checkout) — not the public booking page's
pre-arrival flow. Confirmed the function authenticates with just the anon key (no real per-user JWT), meaning
it's technically reusable for the booking-page flow too once Safaricom is finalized — no new Daraja
scaffolding was built, since this already exists. Four columns were reserved on `bookings` specifically as the
future hook point: `payment_claimed_at`, `mpesa_receipt_number`, `mpesa_checkout_request_id`,
`mpesa_transaction_date`. The concrete gap for extending Daraja to bookings: `mpesa-callback` currently only
updates `salon_mpesa_payments`, not a linked `bookings` row.

### Sales rep onboarding requests (built this session, live, end-to-end tested successfully by Lucy)
Sales reps submit a prospective salon's details at `/sales` → lands as `pending` in a new
`salon_onboarding_requests` table → Super Admin dashboard's "Requests" tab shows Approve/Reject → **Approve
reuses the existing `create_invite` RPC** (not a parallel path to salon creation) → resulting invite link is
visible to both the approving admin and the submitting rep → normal existing `OnboardingPage.jsx` flow
(unchanged) completes the salon creation. Lucy manually tested the full chain (create rep → submit → approve
→ verify invite token live in `salon_invites`) and confirmed it works.
(`017_sales_rep_onboarding_requests.sql`)

### Backups
**Both Supabase projects are on the free plan — no automated backups, no point-in-time recovery at all**,
confirmed against Supabase's current documentation (not assumed). A stopgap was built: a scheduled GitHub
Action per repo (`.github/workflows/backup.yml`) that runs `pg_dump`, GPG-encrypts the result, and uploads it
as a private, time-limited artifact (never committed to git history, since that would put real customer PII
into permanent history). **This is dormant until Lucy adds two secrets per repo**
(`SUPABASE_DB_URL`, `BACKUP_ENCRYPTION_PASSPHRASE`) — unclear whether that's been done yet; worth checking
before assuming backups are actually running.

---

## 5. On the uploaded audit (`trimora_pos_audit.md`) — what I can independently corroborate vs. not

I can **directly confirm** these audit claims, from my own work this session:
- `KIMMS_SALON_ID`, the M-Pesa till number, and business name are hardcoded in `src/lib/constants.js` —
  confirmed by reading this file directly multiple times.
- The anon `SUPABASE_URL`/`SUPABASE_KEY` are hardcoded in the same file and committed to the repo — confirmed
  directly. Whether this is a real exposure depends entirely on RLS actually locking down every table — I
  found and fixed two real gaps in that assumption this session (§4), which is exactly the audit's own
  point that this needs re-verification, not blind trust.
- No baseline schema dump exists in the repo — I never encountered one; only incrementally-numbered
  migrations from `001` onward, confirmed via direct `ls` of the migrations folder just before writing this
  handover.
- `TENANT_TABLES` as a hardcoded list in `db.js`, and the legacy-route fallback in `currentSalon.js`/`db.js` —
  I read `db.js` directly this session (for the sales rep feature's tenant-scoping) and can confirm this
  structure exists as described.

I have **not personally verified** these audit claims (relayed from the audit document only, not independently
checked by me):
- The AI provider architecture (`src/lib/ai/`) — I never opened these files this session.
- The PWA/offline-write-queue claims — I never inspected this.
- Test coverage claims (`cartMath.test.js`, `loyalty.test.js`, etc.) — I never ran or read the test suite.
- The specific line counts given for `POSApp.jsx`/`SuperAdminDashboard.jsx` — plausible (I worked in both
  files extensively and they are genuinely large, monolithic files), but I didn't independently count lines.

Treat the unverified items as probably-accurate-but-worth-a-quick-check rather than assumed fact, consistent
with this project's own standard of not trusting a document over the live repo.

---

## 6. What to actually do next

Per `trimora_first_task.md`: produce the Step 1–5 plan (schema baseline, remove hardcoded tenant fallback,
enforceable tenant scoping, generalize `CATS`, minimal regression safety net) and **stop for sign-off** — do
not implement any of it yet, and do not start any Trimora Auto feature work until this foundation plan is
approved and (presumably) executed.

Given everything above, a few things worth folding into that plan directly rather than rediscovering:
- The schema-baseline step (Step 1) can and should include a fresh `get_advisors(type: 'security')` pass and
  full `pg_policies`/`information_schema` dump alongside the raw schema — this session found real,
  previously-unknown privilege-escalation issues this way, twice.
- Before touching `TENANT_TABLES` or the fallback logic, re-run the same "does anything actually call this"
  grep-first discipline used this session before removing `admin_reset_pin` — confirmed via full frontend
  search before deleting, not assumed dead.
- Whatever the plan proposes, apply the same fetch-before-touch, verify-live-not-just-file discipline from
  §3a/3d — this repo has had real parallel-session activity happening literally every few hours.
