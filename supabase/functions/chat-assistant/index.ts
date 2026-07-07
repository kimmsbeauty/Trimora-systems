// supabase/functions/chat-assistant/index.ts
//
// Proxies chat messages from the website's floating chat widget to the
// Gemini API (Google AI Studio free tier), so GEMINI_API_KEY never
// reaches the browser. Deployed to the "Trimora Systems" Supabase
// project (tvzbtyggphxqnstuxllp).
//
// Auth: verify_jwt is left ON (default) -- unlike notify-new-lead and
// send-lead-confirmation (which are called by DB triggers with no
// logged-in user), this is called directly from the browser via
// supabase.functions.invoke(), which automatically attaches the
// project's anon key as the Bearer token. That's enough to stop
// completely anonymous/unauthenticated abuse of this endpoint without
// requiring actual user accounts (this site has none).
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

function buildErrorResponse(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  try {
    if (req.method !== "POST") {
      return buildErrorResponse("Method not allowed", 405);
    }

    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiApiKey) {
      return buildErrorResponse("Chat assistant is not configured yet.", 503);
    }

    const body = await req.json();
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!message) {
      return buildErrorResponse("Message is required.", 400);
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return buildErrorResponse(`Message too long (max ${MAX_MESSAGE_LENGTH} characters).`, 400);
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
      return buildErrorResponse("The assistant is temporarily unavailable. Please try again shortly.", status);
    }

    const geminiData = await geminiRes.json();
    const reply = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      console.error("Gemini response missing expected text:", JSON.stringify(geminiData));
      return buildErrorResponse("The assistant couldn't generate a response. Please try again.", 502);
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("chat-assistant error:", err);
    return buildErrorResponse("Something went wrong. Please try again.", 500);
  }
});
