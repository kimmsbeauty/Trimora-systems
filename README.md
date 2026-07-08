# Trimora Systems — Marketing Website

The public marketing site for [Trimora Systems](https://trimorasystems.com), a Kenya-based
business management platform. This repo covers the marketing/lead-generation site only —
the product itself (Trimora POS, covering the Trimora Beauty and Trimora Auto verticals)
lives in a separate, private repository and is not part of this codebase.

**Live:** [trimorasystems.com](https://trimorasystems.com) (production alias:
[trimora-systems.vercel.app](https://trimora-systems.vercel.app))

## What's in this repo

- Marketing pages: home, `/solutions` (hub), `/beauty`, `/auto`, `/about`, `/careers`,
  `/resources`, `/docs`, `/blog`
- Legal pages: `/legal/privacy`, `/legal/terms`, `/legal/security`, `/legal/compliance`,
  `/legal/status`
- Lead capture: a multi-step qualification form (`lead-form-modal.jsx`) and an AI chat
  widget (`chat-widget.jsx`) that can also capture leads inline
- Supabase Edge Functions (`supabase/functions/`): lead notification emails,
  lead confirmation emails, and the AI chat assistant proxy

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS v4, a custom design token system ("Warm Ember") in
  `src/app/globals.css`
- **Backend:** Supabase (Postgres + Edge Functions) for lead storage and serverless
  functions
- **Email:** [Resend](https://resend.com)
- **AI chat:** [Google Gemini](https://ai.google.dev) (`gemini-2.5-flash`, free tier)
  via a Supabase Edge Function proxy
- **Scheduling:** [Cal.com](https://cal.com) embed for demo bookings
- **Analytics:** Vercel Analytics
- **Hosting:** Vercel

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your own Supabase project keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint    # ESLint
npm run build   # production build
```

## Deployment

Pushes to `main` deploy automatically via Vercel. Supabase Edge Functions are deployed
separately and are **not** part of the Vercel deploy — see `HANDOVER.md` for the current
deploy process for each function.

## Project documentation

- `HANDOVER.md` — current project status, what's done, what's open, session-to-session
  context for anyone (human or AI) picking up work on this repo
- `PRE_LAUNCH_CHECKLIST.md` — remaining items before full public launch

## Contact

- **Email:** support@trimorasystems.com
- **WhatsApp:** +254 702 904 562

## License

MIT — see [LICENSE](./LICENSE).
