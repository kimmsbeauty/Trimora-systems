"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const GREETING =
  "Hi! I'm here to answer questions about Trimora POS. What would you like to know?";

const MAX_MESSAGE_LENGTH = 1000;

// Phase 1 of 2 (per plan agreed with Lucy): Q&A only. Phase 2 adds a
// lead-capture mini-form shown when the visitor asks about pricing/signup
// -- reusing lead-form-modal.jsx's exact field shape and insert pattern,
// not free-text extraction by the model (too unreliable for real DB
// writes -- see conversation history for the reasoning). Not built yet;
// this widget currently only answers questions.
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", text: GREETING }]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

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
      setError("Chat isn't available right now. Please reach out via the Resources page instead.");
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

  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 sm:right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] sm:w-96 h-[28rem] max-h-[70vh] flex flex-col rounded-lg border border-rule bg-paper-2 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-rule">
            <p className="font-display text-base text-ink">Ask about Trimora POS</p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-ink-muted hover:text-ink transition-colors"
            >
              <X size={18} />
            </button>
          </div>

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

          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-rule p-3">
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
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-ink text-paper shadow-lg hover:opacity-90 transition-opacity"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
