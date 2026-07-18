"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, ChevronLeft } from "lucide-react";
import { track } from "@vercel/analytics";
import { supabase } from "@/lib/supabase";
import { CopyEmailButton } from "@/components/copy-email-button";

const GREETING =
  "Hi! I'm here to answer questions about Trimora POS. What would you like to know?";

const MAX_MESSAGE_LENGTH = 1000;
const BUSINESS_TYPES = ["Salon", "Spa", "Barbershop", "Car Wash / Detailing", "Other"];
const ATTENTION_CUE_STORAGE_KEY = "trimora-chat-widget-interacted";
const ATTENTION_PULSE_DURATION_MS = 2200; // brief, finite -- a couple of pulses, not an infinite loop

const initialLeadData = {
  full_name: "",
  business_name: "",
  contact_method: "email",
  contact_value: "",
  business_type: "",
  branch_count: "",
  employee_count: "",
};

// Phase 2 of 2: lead capture. Deliberately NOT the model freely
// extracting structured data from conversation -- flagged during
// planning as a real reliability risk for actual database writes (wrong
// emails, garbage data). Instead: a small embedded form, shown when the
// visitor clicks "Get in touch," reusing lead-form-modal.jsx's exact
// field shape and insert pattern -- same table, same columns, same
// graceful "no supabase client" handling -- so it automatically gets
// the same notify-new-lead / send-lead-confirmation triggers as every
// other lead source, for free, with zero new backend work.
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("chat"); // chat | lead-form | lead-success
  const [messages, setMessages] = useState([{ role: "assistant", text: GREETING }]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [leadData, setLeadData] = useState(initialLeadData);
  const [leadStatus, setLeadStatus] = useState("idle"); // idle | submitting | error
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // First-visit attention cue (audit follow-up, low priority, kept subtle
  // per explicit instruction): a small dot on the closed bubble, plus a
  // brief pulse -- a few iterations, not a looping animation, per the
  // ATTENTION_PULSE_DURATION_MS timeout below. Persisted via localStorage
  // (same pattern as cookie-notice.jsx) so it only ever shows once per
  // visitor, disappearing for good the moment they open the chat -- not
  // just for the current page load.
  const [showAttentionCue, setShowAttentionCue] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(ATTENTION_CUE_STORAGE_KEY)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShowAttentionCue(true);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPulsing(true);
        const timer = setTimeout(() => setPulsing(false), ATTENTION_PULSE_DURATION_MS);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable (private browsing, etc.) -- just skip the
      // cue rather than risk an error; it's a nice-to-have, not essential.
    }
  }, []);

  function dismissAttentionCue() {
    setShowAttentionCue(false);
    try {
      localStorage.setItem(ATTENTION_CUE_STORAGE_KEY, "1");
    } catch {
      // Same as above -- non-essential, fail silently.
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  useEffect(() => {
    if (isOpen && view === "chat") inputRef.current?.focus();
  }, [isOpen, view]);

  async function handleSend(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    if (trimmed.length > MAX_MESSAGE_LENGTH) {
      setError(`Message too long (max ${MAX_MESSAGE_LENGTH} characters).`);
      return;
    }

    const nextMessages = [...messages, { role: "user", text: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsSending(true);

    if (!supabase) {
      setError("Chat isn't available right now. Please reach out via the Contact page instead.");
      setIsSending(false);
      return;
    }

    try {
      // History sent as the prior turns only (not including the message
      // just added to `nextMessages` -- the function appends that as
      // the final "user" turn itself).
      const history = messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        text: m.text,
      }));

      const { data, error: invokeError } = await supabase.functions.invoke("chat-assistant", {
        body: { message: trimmed, history },
      });

      if (invokeError) {
        throw invokeError;
      }
      if (!data?.reply) {
        throw new Error("Empty reply");
      }

      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch (err) {
      console.error("chat-assistant request failed:", err);
      setError("Something went wrong. Please try again in a moment.");
    } finally {
      setIsSending(false);
    }
  }

  function updateLead(field, value) {
    setLeadData((prev) => ({ ...prev, [field]: value }));
  }

  function isLeadFormValid() {
    return (
      leadData.full_name.trim() &&
      leadData.business_name.trim() &&
      leadData.contact_value.trim() &&
      leadData.business_type &&
      Number(leadData.branch_count) > 0 &&
      Number(leadData.employee_count) > 0
    );
  }

  async function handleLeadSubmit(e) {
    e.preventDefault();
    if (!isLeadFormValid() || leadStatus === "submitting") return;

    setLeadStatus("submitting");

    const payload = {
      full_name: leadData.full_name.trim(),
      business_name: leadData.business_name.trim(),
      email: leadData.contact_method === "email" ? leadData.contact_value.trim() : null,
      phone: leadData.contact_method === "phone" ? leadData.contact_value.trim() : null,
      biggest_challenge: null,
      business_type: leadData.business_type,
      branch_count: Number(leadData.branch_count),
      employee_count: Number(leadData.employee_count),
      source_page: "chatbot",
    };

    if (!supabase) {
      console.error("Supabase client not configured — cannot submit lead.");
      setLeadStatus("error");
      track("lead_submit_failed", { source: "chatbot", reason: "not_configured" });
      return;
    }

    const { error: insertError } = await supabase.from("leads").insert(payload);

    if (insertError) {
      console.error("Chatbot lead submission failed:", insertError.message);
      setLeadStatus("error");
      track("lead_submit_failed", { source: "chatbot" });
      return;
    }

    track("lead_submitted", {
      source: "chatbot",
      business_type: leadData.business_type,
      branch_count: leadData.branch_count,
      employee_count: leadData.employee_count,
    });
    setView("lead-success");
    setLeadStatus("idle");
  }

  function backToChat() {
    setView("chat");
    setLeadData(initialLeadData);
    setLeadStatus("idle");
    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: "Thanks! We'll be in touch shortly. Anything else I can help with?" },
    ]);
  }

  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 sm:right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] sm:w-96 h-[28rem] max-h-[70vh] flex flex-col rounded-lg border border-rule bg-paper-2 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-rule">
            <div className="flex items-center gap-2">
              {view === "lead-form" && (
                <button
                  type="button"
                  onClick={() => setView("chat")}
                  aria-label="Back to chat"
                  className="text-ink-muted hover:text-ink transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
              )}
              <p className="font-display text-base text-ink">
                {view === "chat" && "Ask about Trimora POS"}
                {view === "lead-form" && "Get in touch"}
                {view === "lead-success" && "Thanks!"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-ink-muted hover:text-ink transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {view === "chat" && (
            <>
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-md px-3 py-2 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-accent-ink text-paper"
                          : "bg-paper text-ink border border-rule"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {isSending && (
                  <div className="flex justify-start">
                    <div className="bg-paper text-ink-muted border border-rule rounded-md px-3 py-2 text-sm flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                      Thinking…
                    </div>
                  </div>
                )}
                {error && (
                  <p className="text-xs text-destructive" role="alert">
                    {error}
                  </p>
                )}
              </div>

              <div className="border-t border-rule px-3 pt-2">
                <button
                  type="button"
                  onClick={() => setView("lead-form")}
                  className="text-xs text-accent-ink hover:underline mb-2"
                >
                  Want a demo? Get in touch →
                </button>
              </div>

              <form onSubmit={handleSend} className="flex items-center gap-2 px-3 pb-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question…"
                  maxLength={MAX_MESSAGE_LENGTH}
                  disabled={isSending}
                  className="flex-1 rounded-md border border-rule bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:border-accent-ink outline-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={isSending || !input.trim()}
                  aria-label="Send message"
                  className="flex items-center justify-center w-9 h-9 rounded-md bg-ink text-paper disabled:opacity-40 transition-opacity"
                >
                  <Send size={16} />
                </button>
              </form>
            </>
          )}

          {view === "lead-form" && (
            <form onSubmit={handleLeadSubmit} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              <div>
                <label htmlFor="chat_full_name" className="block text-xs text-ink-muted mb-1">
                  Your name
                </label>
                <input
                  id="chat_full_name"
                  type="text"
                  required
                  value={leadData.full_name}
                  onChange={(e) => updateLead("full_name", e.target.value)}
                  className="w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:border-accent-ink outline-none"
                  placeholder="Jane Wanjiru"
                />
              </div>

              <div>
                <label htmlFor="chat_business_name" className="block text-xs text-ink-muted mb-1">
                  Business name
                </label>
                <input
                  id="chat_business_name"
                  type="text"
                  required
                  value={leadData.business_name}
                  onChange={(e) => updateLead("business_name", e.target.value)}
                  className="w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:border-accent-ink outline-none"
                  placeholder="Kimm's Beauty Parlour"
                />
              </div>

              <div>
                <span className="block text-xs text-ink-muted mb-1">Reach me by</span>
                <div className="flex gap-3 mb-1.5 text-xs text-ink-muted">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="chat_contact_method"
                      checked={leadData.contact_method === "email"}
                      onChange={() => updateLead("contact_method", "email")}
                    />
                    Email
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="chat_contact_method"
                      checked={leadData.contact_method === "phone"}
                      onChange={() => updateLead("contact_method", "phone")}
                    />
                    Phone/WhatsApp
                  </label>
                </div>
                <input
                  type={leadData.contact_method === "email" ? "email" : "tel"}
                  required
                  value={leadData.contact_value}
                  onChange={(e) => updateLead("contact_value", e.target.value)}
                  className="w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:border-accent-ink outline-none"
                  placeholder={leadData.contact_method === "email" ? "jane@example.com" : "+254 7XX XXX XXX"}
                />
              </div>

              <div>
                <span className="block text-xs text-ink-muted mb-1">Business type</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {BUSINESS_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateLead("business_type", type)}
                      className={`rounded-md border px-2 py-1.5 text-xs text-left transition-colors ${
                        leadData.business_type === type
                          ? "border-accent-ink bg-accent-ink/10 text-ink"
                          : "border-rule text-ink-muted"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="chat_branch_count" className="block text-xs text-ink-muted mb-1">
                    Branches
                  </label>
                  <input
                    id="chat_branch_count"
                    type="number"
                    min="1"
                    required
                    value={leadData.branch_count}
                    onChange={(e) => updateLead("branch_count", e.target.value)}
                    className="w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:border-accent-ink outline-none"
                    placeholder="1"
                  />
                </div>
                <div>
                  <label htmlFor="chat_employee_count" className="block text-xs text-ink-muted mb-1">
                    Employees
                  </label>
                  <input
                    id="chat_employee_count"
                    type="number"
                    min="1"
                    required
                    value={leadData.employee_count}
                    onChange={(e) => updateLead("employee_count", e.target.value)}
                    className="w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:border-accent-ink outline-none"
                    placeholder="3"
                  />
                </div>
              </div>

              {leadStatus === "error" && (
                <p className="text-xs text-destructive" role="alert">
                  Something went wrong. You can also reach us directly:{" "}
                  <CopyEmailButton className="underline inline-flex items-center gap-1" />
                </p>
              )}

              <button
                type="submit"
                disabled={!isLeadFormValid() || leadStatus === "submitting"}
                className="w-full rounded-md bg-ink text-paper py-2 text-sm disabled:opacity-40 transition-opacity"
              >
                {leadStatus === "submitting" ? "Sending…" : "Request Demo"}
              </button>
            </form>
          )}

          {view === "lead-success" && (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-6">
              <p className="font-display text-lg text-ink mb-2">Thanks — we&apos;ve got it.</p>
              <p className="text-sm text-ink-muted mb-5">
                Someone from Trimora will be in touch shortly.
              </p>
              <button
                type="button"
                onClick={backToChat}
                className="text-sm text-accent-ink hover:underline"
              >
                ← Back to chat
              </button>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setIsOpen((prev) => !prev);
          if (showAttentionCue) dismissAttentionCue();
        }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-ink text-paper shadow-lg hover:opacity-90 transition-opacity"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
        {!isOpen && showAttentionCue && (
          <span className="absolute top-0.5 right-0.5" aria-hidden="true">
            {pulsing && (
              <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-accent-ink animate-ping" />
            )}
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-ink" />
          </span>
        )}
      </button>
    </div>
  );
}
