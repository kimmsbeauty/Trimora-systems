// supabase/functions/chat-assistant/index.ts
//
// Proxies chat messages from the website's floating chat widget to the
// Gemini API (Google AI Studio free tier), so GEMINI_API_KEY never
// reaches the browser. Deployed to the "Trimora Systems" Supabase
// project (tvzbtyggphxqnstuxllp).
//
// Auth: verify_jwt MUST be disabled for this function (deploy with
// --no-verify-jwt, or toggle it off in the dashboard's function
// settings). Reasoning changed from the original version of this
// comment, which was wrong: Supabase's platform-level JWT check runs
// on every request BEFORE user code executes -- including the
// browser's OPTIONS preflight, which never carries an Authorization
// header per the CORS spec. With verify_jwt on, the gateway rejects
// the preflight itself with a 401, so this file's own OPTIONS handler
// (below) never even runs -- confirmed as the actual cause of
// "preflight request doesn't have HTTP ok status" in testing
// (2026-07-06), a different symptom from the earlier missing-headers
// bug this same day.
//
// Trade-off accepted for v1: without JWT verification, this endpoint
// can technically be called by anything (not just this site's own
// browser pages) -- CORS only restricts browser-based JavaScript, not
// direct server-to-server or scripted calls. The origin allowlist
// below is not a real security boundary on its own. If abuse of the
// free-tier Gemini quota becomes a real problem, revisit with a
// lightweight shared-secret or per-IP rate limit inside the function
// body -- not attempted here, since it's speculative until there's
// evidence of actual abuse.
//
// Cost/abuse guardrails for the free tier: hard caps on message length
// and conversation history size, since this proxies to a real (if
// free) API with its own rate limits -- a single runaway conversation
// or scripted abuse shouldn't be able to exhaust the shared daily quota
// alone.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const GEMINI_MODEL = "gemini-2.5-flash";
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_MESSAGES = 20; // 10 user/model turns

// CORS: unlike notify-new-lead and send-lead-confirmation, which are
// called server-to-server by a Postgres trigger via pg_net, this
// function is called directly from the browser via
// supabase.functions.invoke(). Without these headers -- including
// handling the OPTIONS preflight the browser sends before the actual
// POST -- the browser silently blocks the response and supabase-js
// reports a generic "FunctionsFetchError: Failed to send a request",
// which is exactly what surfaced in testing (2026-07-06).
//
// Matches, deliberately not a bare "*" since this proxies a billed
// (if free-tier) API key:
// - The real domain, once purchased/live: trimorasystems.com (+ www)
// - The current production Vercel alias: trimora-systems.vercel.app
// - Any preview deployment of this same project, e.g.
//   trimora-systems-git-<branch>-<team>.vercel.app or
//   trimora-systems-<hash>.vercel.app -- these change per branch/push
//   (confirmed happening this session with the warm-retheme branch),
//   so a fixed string would need updating every single time otherwise.
const ALLOWED_ORIGIN_PATTERN =
  /^https:\/\/(www\.)?trimorasystems\.com$|^https:\/\/trimora-systems(-[a-z0-9-]+)*\.vercel\.app$/;
const DEFAULT_ALLOWED_ORIGIN = "https://trimora-systems.vercel.app";

function corsHeaders(origin: string | null) {
  const allowOrigin = origin && ALLOWED_ORIGIN_PATTERN.test(origin) ? origin : DEFAULT_ALLOWED_ORIGIN;
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
}

// Grounded in facts already published and confirmed elsewhere on this
// site (why-choose.jsx, legal/security, legal/compliance, pos-deep-dive.jsx)
// -- deliberately does NOT include pricing figures, since none are
// published anywhere on the site; the site's own pattern is "book a
// demo" instead of listing prices, and this assistant follows the same
// pattern rather than inventing numbers.
const SYSTEM_INSTRUCTION = `You are a helpful assistant on the Trimora Systems website, answering questions about Trimora POS for visitors -- salon, barbershop, spa, and beauty-business owners in Kenya.

FACTS YOU CAN RELY ON (all confirmed, published elsewhere on this site):
- Trimora POS is a business management platform for salons, barbershops, beauty parlours, spas, and beauty shops.
- Core features: checkout and payments, staff scheduling, inventory tracking, sales reporting.
- Payments: M-Pesa (Till, Paybill, or Send Money -- configured per business) plus cash. Trimora never stores M-Pesa PINs, card numbers, or CVV codes.
- Multi-tenant by design: each business's data is fully isolated from every other business on the platform via Row-Level Security on every table.
- Security: staff/admin PINs are hashed (never stored in plain text), role-based access separates Admin and Staff permissions, all traffic runs over HTTPS/TLS, key actions are audit-logged, data is backed up on a regular automated schedule.
- Support: email and WhatsApp, same-business-day response.
- The company is Kenya-based and founder-led.
- Trimora POS is the first product on a platform intended to grow into more business tools over time.

WHAT YOU DO NOT KNOW AND MUST NOT INVENT:
- Specific prices or plan tiers. None are published. If asked about pricing, say pricing is discussed on a short demo call tailored to the business's size, and offer to help them book one.
- Exact customer count, specific client names, or usage statistics. Don't cite numbers you don't have.
- Anything about Trimora's other planned products beyond "more tools are planned" -- don't invent specific feature names or timelines for anything not listed above.

BEHAVIOR:
- Be warm, concise, and direct -- this is a small business's website, not a call center script.
- If you don't know something, say so plainly and offer to connect them with the team (email or WhatsApp) rather than guessing.
- If someone shows real interest (wants pricing, wants to sign up, asks "how do I start"), tell them the best next step is booking a short demo, and mention they can use the "Book a Demo" button on the site.
- Keep answers short -- a few sentences, not essays. This is a chat widget, not a document.
- Never discuss topics unrelated to Trimora POS, the business, or how to get in touch. Politely redirect off-topic questions back to what you can actually help with.`;

function buildErrorResponse(message: string, status: number, extraHeaders: Record<string, string>) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}

Deno.serve(async (req: Request) => {
  const headers = corsHeaders(req.headers.get("origin"));

  // Browsers send an OPTIONS preflight before the actual POST for any
  // cross-origin request with a non-simple content type (application/json
  // qualifies). It carries no body -- just needs a 2xx with the right
  // CORS headers so the browser proceeds to send the real request.
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  try {
    if (req.method !== "POST") {
      return buildErrorResponse("Method not allowed", 405, headers);
    }

    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiApiKey) {
      return buildErrorResponse("Chat assistant is not configured yet.", 503, headers);
    }

    const body = await req.json();
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!message) {
      return buildErrorResponse("Message is required.", 400, headers);
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return buildErrorResponse(`Message too long (max ${MAX_MESSAGE_LENGTH} characters).`, 400, headers);
    }

    // Trim history defensively -- both count and each entry's shape --
    // regardless of what the client sends, since this directly becomes
    // part of the billed request to Gemini.
    const trimmedHistory = history
      .slice(-MAX_HISTORY_MESSAGES)
      .filter(
        (entry: unknown): entry is { role: string; text: string } =>
          typeof entry === "object" &&
          entry !== null &&
          (entry as { role?: unknown }).role !== undefined &&
          typeof (entry as { text?: unknown }).text === "string"
      )
      .map((entry) => ({
        role: entry.role === "assistant" ? "model" : "user",
        parts: [{ text: entry.text.slice(0, MAX_MESSAGE_LENGTH) }],
      }));

    const contents = [...trimmedHistory, { role: "user", parts: [{ text: message }] }];

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "x-goog-api-key": geminiApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 400,
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      console.error(`Gemini ${geminiRes.status}:`, errorText);
      // 429 specifically means the free tier's rate limit was hit --
      // surfaced as its own status so the widget can show a specific
      // "try again in a moment" message instead of a generic error.
      const status = geminiRes.status === 429 ? 429 : 502;
      return buildErrorResponse(
        "The assistant is temporarily unavailable. Please try again shortly.",
        status,
        headers
      );
    }

    const geminiData = await geminiRes.json();
    const reply = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      console.error("Gemini response missing expected text:", JSON.stringify(geminiData));
      return buildErrorResponse("The assistant couldn't generate a response. Please try again.", 502, headers);
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...headers },
    });
  } catch (err) {
    console.error("chat-assistant error:", err);
    return buildErrorResponse("Something went wrong. Please try again.", 500, headers);
  }
});
