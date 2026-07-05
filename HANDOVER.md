# Trimora Systems Website — Handover Document
**For:** a new Claude session with zero prior context on this project.
**As of:** 2026-07-05. Latest commit: `e4361f6` on `main`.
**Repo:** `kimmsbeauty/Trimora-systems` (the marketing website — NOT the POS product, which is a separate repo `kimmsbeauty/Trimora-POS` you should not touch here).

Read this whole document before doing anything. It tells you the rules you operate under, the current state of the project, and exactly what's open.

---

## 1. Who you're working with, and the rules that govern this work

The operator is **Lucy**, founder and sole developer of Trimora Systems (a multi-tenant SaaS platform for salons/barbershops in Kenya). She works directly with Claude as a hands-on engineering collaborator. These rules are non-negotiable and have been enforced consistently across every session on this project — violating them has real consequences for her business, not just this conversation:

1. **Greenlight Policy.** Nothing gets built without explicit approval. The cadence is: audit/scope → findings → proposal → **explicit approval** → build → verify → report. Don't batch multiple unapproved items together. Don't skip ahead because something seems obviously fine.
2. **Never fabricate.** No placeholder statistics, no invented business facts (support model, security posture, addresses, social profiles), no guessed API contracts, no assumed vendor behavior. If you don't know something and it matters, **ask**, or go verify it (web search, read the actual code, query the actual database) before asserting it. This has been tested repeatedly in this project and enforced strictly — e.g., real Africa's Talking API contract was looked up from their docs before writing code against it, rather than guessed.
3. **Verify, don't assume.** Every code change in this project has been validated with an actual `npm run build` and `npm run lint` run before being described as "done" — not just reviewed by eye. Several real bugs were only caught this way (see Section 6, "Known gotchas").
4. **One thing at a time.** Work through items in sequence. Don't silently expand scope. If you notice something adjacent that's broken, flag it — don't just fix it unasked (exception: trivial, obviously-correct fixes discovered while already verifying something, like a stale file path in a checklist — use judgment, but lean toward asking).
5. **If a decision requires her input (vendor choice, content fact, UX behavior), ask.** Don't default silently. This project has an established pattern of using quick multiple-choice questions for exactly this.
6. **Credential hygiene.** GitHub PATs are provided per-session by Lucy for pushing only, and she revokes them after the session. Never let a token persist in `git remote` config — use it inline in the push URL only, verify with `git remote -v` afterward that it didn't leak in. Never commit real secret values to git — redact them in any committed SQL/config and reference where the real value lives (Supabase Dashboard secrets, Vercel env vars) instead.
7. **No credit card tools.** Lucy has a standing constraint: no tool/service that requires a credit card, even for a "free tier." Check current terms before recommending anything (these change) — don't rely on training-data memory of what's free.

---

## 2. What Trimora Systems actually is

Multi-tenant SaaS POS platform for salons/barbershops in Kenya. Two separate codebases:
- **`kimmsbeauty/Trimora-POS`** — the actual product. Create React App, hand-rolled `db.js` using raw `fetch()` against Supabase REST API (no supabase-js there). Not what you're working on unless explicitly told otherwise.
- **`kimmsbeauty/Trimora-systems`** — the marketing website (Next.js). **This is what this document is about.**

There's also **TIP (Trimora Intelligence Platform)**, publicly branded "**Trimora AI**" (never "TIP" in user-facing copy — see `NAMING.md`). Confirmed directly by Lucy: it's a natural-language "ask your business anything" interface — Gemini handles understanding the question, but a separate layer resolves the actual answer using real business data, so Gemini itself never sees raw business records. **Status: working in internal/testing use, not yet rolled out to tenants.** Don't imply otherwise in any copy.

---

## 3. Architecture facts (verified, not assumed)

- **Framework:** Next.js 16.2.10, React 19.2.4, Tailwind v4, App Router. `npm run build` / `npm run lint` both must pass clean before anything is considered done.
- **Design tokens:** "Paper & Ink" editorial light theme (as of 2026-07-05, full re-skin from the original gold-on-black), CSS custom properties in `src/app/globals.css` (`--color-paper*`, `--color-ink*`, `--color-rule`, `--color-accent-ink`, `--color-destructive`). Fonts: Instrument Serif (display) + Work Sans Variable (body); IBM Plex Mono kept for small technical/UI labels. Contrast ratios have been verified computationally (WCAG AA) for every token pairing, both the original palette (commit `28243ea`, Item 10 QA pass) and the new one (commit `93c4b6f`) — don't assume a palette passes AA without recomputing, this project has caught real failures both times.
- **Deployment:** Vercel. Project not locatable via the Vercel MCP tools available (only `trimora-pos` showed up under the `team_9KANQimJ62tAigNKK0eemlBF` team — the website project may be under different access). **Get the live URL directly from Lucy if you need it** — don't guess a domain.
- **Two separate Supabase projects — do not confuse them:**
  - `kimmsbeauty` (id `ukoccobbjeomjwjcvrma`) — the **POS** database. Not used by the website.
  - **`Trimora Systems`** (id `tvzbtyggphxqnstuxllp`) — the **website's** database, created 2026-07-03. This is where `leads` lives. This separation was a deliberate decision (marketing-site lead data shouldn't share a blast radius with live tenant/payment data) — don't merge them.
- **Governance docs already in the repo root:** `CLAUDE.md` (imports `AGENTS.md`), `AGENTS.md`, `NAMING.md`, `PRE_LAUNCH_CHECKLIST.md`, `README.md`. Read `PRE_LAUNCH_CHECKLIST.md` for the current honest status of known gaps — it's kept up to date, not aspirational.
- **`.env.example`** documents required env vars. Real values go in `.env.local` (gitignored) locally, and in Vercel's Environment Variables dashboard for production — **already set there** as of this session (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` for the Trimora Systems project).

---

## 4. Current status — Phase 1 (Launch Readiness)

**Complete except one item.** Sequence was: contrast fix, skip link, favicon, naming standards, Card primitive reconciliation, metadata/SEO, mobile CTA, lead capture, legal restructure, full QA pass.

| # | Item | Status |
|---|---|---|
| 1 | Contrast fix (WCAG AA) | ✅ Done, recomputed and verified in Item 10 |
| 2 | Skip-to-content link | ✅ Done |
| 3 | Favicon & brand icon set | ⬜ **Still open — blocked on Lucy providing a real logo/mark file.** Do not fabricate a placeholder logo. |
| 4 | Product naming standards ("Trimora AI") | ✅ Done, verified consistent across all user-facing copy |
| 5 | Card primitive reconciliation | ✅ Done — scoped correctly to `ecosystem.jsx` only; `pos-deep-dive.jsx`'s `MockupFrame` was checked and confirmed to be a genuinely different pattern (product-screenshot chrome, not a duplicate card), not a missed gap |
| 6 | Metadata/SEO foundation | ✅ Done — `buildMetadata()` generator, `sitemap.js`, `robots.js`, `opengraph-image.js`, all 7 routes covered |
| 7 | Mobile CTA (persistent bottom bar) | ✅ Done in Phase 1 (static), then evolved into a real-time scroll-aware bar in Phase 2 Item 2 (see below) |
| 8 | Lead capture architecture | ✅ Done — see Section 5 |
| 9 | Legal page restructure (`/legal/privacy`, `/legal/terms`) | ✅ Done |
| 10 | Full-page QA pass | ✅ Done — see Section 6 for what was actually checked and one real accessibility bug that was found and fixed (modal focus trap) |

---

## 5. Current status — Phase 2 (Conversion Optimization)

Governed by a separate scope document: `trimora-phase-2-scope-document.md` (delivered to Lucy as a file, not committed to the repo — if you need its full content and it's not in your context, ask Lucy to re-share it or reconstruct the open questions from this handover). Explicit scope boundary: Phase 2 = "analytics, qualified lead funnel, trust center" per Lucy's own Next-Gen Recommendations doc. Personalization, AI-driven homepage recommendations, and the "Digital Twin"/AI-Founder-chatbot style ideas from a later document she shared are **Phase 3/4 speculative vision, not approved scope** — don't build any of that without a fresh, explicit scoping conversation.

| # | Item | Status |
|---|---|---|
| 1 | Lead notification (email + WhatsApp on new lead) | ✅ **Infrastructure built and verified end-to-end.** Activation pending Lucy's API keys — see below. |
| 2 | Smart Action Bar (real-time scroll-aware CTA) | ✅ **Built.** Real `IntersectionObserver`-driven, not a static prop. Needs a real-device/browser check (no rendering access in this environment) — ask Lucy to confirm it feels right scrolling on an actual phone. |
| 3 | Qualification funnel (multi-step lead form) | ⬜ Open. Real open questions: calendar tool (Cal.com vs Calendly — check current no-card terms before recommending), how many steps for v1 (7-step full funnel from the Next-Gen doc, or fewer to start), what "confirmation" triggers. |
| 4 | Trust Center (`/legal/security`, `/legal/compliance`, `/legal/status`) | ⬜ Open. Blocked on the same unconfirmed facts as Phase 1's "Why Choose" differentiators 3 & 4 (support model, security architecture) — check `PRE_LAUNCH_CHECKLIST.md` item 1 for the exact original wording. Don't build page shells with invented content. |
| 5 | Structured data (Organization/Product/FAQ JSON-LD) | ⬜ Blocked — needs a real business address and verified social profiles, neither confirmed anywhere. Not actionable until Lucy provides these. |
| 6 | Real social proof stats (replace `[STAT PENDING]` in `social-proof.jsx`) | ⬜ Blocked — needs at least one real number or honest qualitative claim from Lucy. Not actionable until then. |

### Item 1 details (Lead Notification) — what's built, what's needed

- `src/lib/supabase.js` — browser Supabase client, defensively `null` if env vars missing (see Section 6 gotcha #2).
- `src/components/lead-form-context.jsx` + `lead-form-modal.jsx` — the actual lead capture UI (Item 8), with full focus-trap accessibility (fixed in Item 10 QA pass).
- `supabase/functions/notify-new-lead/index.ts` — Edge Function deployed to the **Trimora Systems** project (`tvzbtyggphxqnstuxllp`), sends email via Resend and WhatsApp via Africa's Talking, stamps `notified_email_at`/`notified_whatsapp_at` independently per channel.
- `supabase/migrations/20260704_notify_new_lead_trigger.sql` — Postgres trigger firing the function via `pg_net` on every `leads` INSERT. **Secret value is redacted in this committed file** — the real value is set as an Edge Function secret in the Supabase Dashboard, not in git.
- **Verified end-to-end**, not just deployed: a real test insert returned `401` before the shared secret was set (proving auth was actually being checked), and `200` after (proving the whole pipeline works). Test rows were deleted after verification.
- **What Lucy still needs to add** (Supabase Dashboard → Trimora Systems project → Edge Functions → `notify-new-lead` → Secrets), each independently optional — the function degrades gracefully and reports which channel was skipped and why:
  ```
  RESEND_API_KEY        (provider decided: Resend, 3,000/mo free, no card — confirmed current as of 2026-07-04)
  NOTIFY_EMAIL_TO        (which email address should receive alerts)
  AFRICASTALKING_API_KEY (reuse same account as POS, per Lucy's decision)
  AFRICASTALKING_USERNAME
  AFRICASTALKING_WA_NUMBER  (the registered sending number)
  NOTIFY_WHATSAPP_TO    (which phone number should receive alerts)
  ```
  `LEADS_WEBHOOK_SECRET` is **already set** — don't ask Lucy to redo that one.

### Item 2 details (Smart Action Bar)

`src/components/mobile-action-bar.jsx` — three real-time states driven by `IntersectionObserver` watching the actual `#pos` and `#pricing` anchor IDs (confirmed to exist in `pos-deep-dive.jsx`/`pricing-cta.jsx` before building against them):
1. Before `#pos` reached → "See Trimora POS" → scrolls there
2. Past `#pos`, before `#pricing` → "See Pricing" → scrolls there
3. Past `#pricing` → "Book a Demo" → opens the lead form

Uses `usePathname()` to detect non-homepage routes (where `#pos`/`#pricing` don't exist) and falls back to "Book a Demo" there, rather than pointing at nonexistent sections.

---

## 6. Known gotchas already discovered — don't rediscover these the hard way

1. **pg_net lives in schema `net`, not `extensions.net`.** A first attempt at the notification trigger referenced `extensions.net.http_post` — this is wrong, and because plpgsql doesn't validate schema-qualified calls at `CREATE FUNCTION` time, it would have "succeeded" at deploy time and failed silently (fire-and-forget async) on the first real lead. Always verify via `select n.nspname, p.proname from pg_proc p join pg_namespace n on n.oid = p.pronamespace where p.proname = 'http_post'` rather than assuming.
2. **Never construct a Supabase client with `createClient(url ?? "", key ?? "")`.** `@supabase/supabase-js` throws *synchronously* the moment `createClient()` runs with an empty string, and if that happens at module load (which it does, in a file imported by client components), it crashes Next.js's static prerender of *every* page, including unrelated ones like `/_not-found` — not just the feature that needed the env var. The fix: export `null` when config is missing, and check for `null` at every call site. This actually happened in production on this project (see commit `c5a2222`).
3. **ESLint (`react/no-unescaped-entities`)** flags raw apostrophes in JSX text — use `&apos;`.
4. **ESLint also flags synchronous `setState` calls in a `useEffect` body** (not inside an async callback) — this surfaced a real second bug in the Smart Action Bar: an effect with an empty dependency array only runs once at mount, so route-based logic needs the route in the dependency array or it won't react to client-side navigation.
5. **Supabase MCP tool calls sometimes return `"No approval received"`** intermittently in this environment for reasons that aren't fully understood — retrying the same call sometimes works, sometimes doesn't. `list_projects`, `list_tables`, `execute_sql`, `get_publishable_keys`, `apply_migration`, and `deploy_edge_function` have all worked in this project when tried. `list_edge_functions`, `list_migrations`, and `get_project_url` failed repeatedly in one session — don't burn too much time retrying; work around it (e.g., Supabase project URLs follow the predictable pattern `https://<project-ref>.supabase.co`).
6. **The Vercel MCP tools could not locate the website's Vercel project** — only `trimora-pos` showed up under the one team returned by `list_teams`. Get live URLs directly from Lucy rather than guessing a domain or spending excessive time hunting for it via the API.
7. **GitHub push:** always push via the inline-token URL form (`git push "https://<token>@github.com/kimmsbeauty/Trimora-systems.git" main`), then run `git remote -v` immediately after to confirm the token didn't get written into the stored remote config.
8. **`Africa's Talking WhatsApp API` real contract** (verified against their own docs, not guessed): endpoint `https://chat.africastalking.com/whatsapp/message/send`, header key is **lowercase `apikey`** (not `Authorization`), body shape is `{ username, waNumber, phoneNumber, body: { message } }`. If you ever touch this integration again, don't re-derive this from memory — re-verify against current docs since APIs change.

---

## 7. Recommended next step

Per the last explicit recommendation given to Lucy (and agreed to): after Items 1 and 2, the natural next step is **Item 3 (Qualification funnel)** — but it has real open decisions (calendar tool, step depth, confirmation behavior) that need Lucy's input before building, not defaults. Ask her directly rather than assuming.

Items 4–6 aren't actionable until Lucy supplies the underlying facts (security/support model, business address/socials, one real statistic) — don't try to build around that by writing vague placeholder copy; that's exactly the pattern this project has consistently avoided.

**Also still pending from Phase 1:** the favicon (Item 3), whenever Lucy has a logo file ready.

---

## 8. A note on tone/working style

Lucy is a hands-on technical collaborator, not someone who needs hand-holding — but she has been explicit and repeated about wanting caution over speed: "don't hallucinate," "if anything not clear, ask," "proceed with caution." When in doubt, surface the uncertainty and ask a short, concrete multiple-choice question rather than guessing and moving fast. She has consistently rewarded that pattern throughout this project and pushed back when corners were cut.

---

## 9. IMPORTANT — a concurrent-session collision already happened once (2026-07-05)

This exact HANDOVER.md was written to let a new session pick up cleanly. Instead, what happened was **two sessions worked on Phase 2 Item 3 at the same time, in parallel, both starting from commit `e4361f6`, neither aware the other existed** — because Lucy had this handover doc in one chat and, separately, kept working (or started a new chat) elsewhere.

**If you're reading this and about to start work: check `git log` and `git fetch` first, before touching anything, to see if the remote has commits you don't have locally.** If it does, someone else — possibly another instance of you — is actively working on this project right now, possibly on the live Supabase database too, not just git. That's the real risk: git conflicts are recoverable, but two sessions applying migrations to the same live database at the same time is not something to treat casually.

What actually happened last time, for reference: three separate unexpected commits appeared on the remote over about 15 minutes while one session worked (`74fcb82` Item 3 wizard+WhatsApp, then `43edf0c` Item 4 Trust Center shells). Each was individually reasonable, responsibly built work — the problem was purely the lack of coordination, not the quality of either session's output. Conflicts were resolved by: inspecting the actual diverging content and live-database state before merging anything, presenting the concrete differences to Lucy, getting her explicit decision on which approach to keep (in one case, merging both rather than picking a side — she wanted lead confirmations sent via both email AND WhatsApp, whichever the lead provided), and only then merging and force-pushing nothing.

**If you find yourself in this situation again:** don't silently pick a side, don't force-push, and don't assume "leftover from a prior session" — it might be a session running right now. Ask Lucy directly, the way this was handled the first time.
