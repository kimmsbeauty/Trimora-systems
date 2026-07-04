// Browser Supabase client, scoped to what the marketing site actually needs:
// anonymous INSERT into `leads` only. The anon/publishable key is safe to
// expose client-side by design — RLS on `leads` restricts the anon role to
// INSERT with no SELECT/UPDATE/DELETE, so this key can never read back or
// modify existing leads, only add new ones.
//
// This project's Supabase instance is separate from the Trimora POS
// database (deliberate choice: marketing-site lead data doesn't share a
// blast radius with live tenant/payment data).
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Deliberately NOT created with fallback empty strings: @supabase/supabase-js
// throws synchronously ("supabaseUrl is required") the moment createClient()
// runs with an empty URL, which happens at *module load*, which happens
// during Next.js's static prerender — a missing env var would crash the
// entire production build (including unrelated pages like /_not-found),
// not just disable the lead form. `supabase` is `null` instead, and
// lead-form-modal.jsx checks for that before using it, showing the mailto
// fallback rather than taking the site down.
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

if (!supabase && typeof window !== "undefined") {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY — lead capture form will fall back to mailto."
  );
}
