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

if (!supabaseUrl || !supabaseAnonKey) {
  // Fails loudly in dev rather than silently no-op-ing lead submissions.
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY — lead capture form will not be able to submit."
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");
