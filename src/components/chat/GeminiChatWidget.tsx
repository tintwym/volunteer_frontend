"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { AnimatePresence, Spinner, motion } from "@/components/motion/ui";
import { api, errorMessage } from "@/lib/api";
import { getStoredToken, isDemoToken } from "@/lib/auth";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type ChatTurn = { id: string; role: "user" | "assistant"; content: string };

const WELCOME =
  "Hi — I’m your CommonGround assistant. Ask about your hours, upcoming events, tasks, or how to use the app.";

const SUGGESTIONS = [
  "How many hours do I have?",
  "What’s my next event?",
  "Any open tasks?",
] as const;

export function GeminiChatWidget() {
  const { user, loading, isDemo } = useAuth();
  const reactId = useId();
  const welcomeId = `${reactId}-welcome`;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatTurn[]>(() => [
    { id: welcomeId, role: "assistant", content: WELCOME },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const demoSession = isDemo || isDemoToken(getStoredToken());
  const visible = !loading && Boolean(user) && !demoSession;
  const showSuggestions =
    messages.length <= 1 && !sending && messages.every((m) => m.id === welcomeId || m.role === "assistant");

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open, sending]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const sendText = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || sending) return;
      setInput("");
      setError(null);
      const userTurn: ChatTurn = {
        id: `${reactId}-${Date.now()}-u`,
        role: "user",
        content: text,
      };
      const nextHistory = [...messages, userTurn];
      setMessages(nextHistory);
      setSending(true);
      try {
        const history = nextHistory
          .filter((m) => m.id !== welcomeId)
          .slice(0, -1)
          .map((m) => ({ role: m.role, content: m.content }));
        const { reply } = await api.chat.send({ message: text, history });
        setMessages((prev) => [
          ...prev,
          { id: `${reactId}-${Date.now()}-a`, role: "assistant", content: reply },
        ]);
      } catch (err) {
        setError(errorMessage(err, "Could not reach the assistant."));
        setMessages((prev) => [
          ...prev,
          {
            id: `${reactId}-${Date.now()}-err`,
            role: "assistant",
            content: "Sorry — I couldn’t answer that just now. Please try again in a moment.",
          },
        ]);
      } finally {
        setSending(false);
      }
    },
    [messages, reactId, sending, welcomeId]
  );

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[75] flex flex-col items-end gap-3"
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "max(5.5rem, calc(env(safe-area-inset-bottom) + 4.5rem))",
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex h-[min(32rem,calc(100dvh-8rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[var(--cg-border)] bg-[var(--cg-surface)] shadow-2xl shadow-stone-900/20 dark:shadow-black/50"
            role="dialog"
            aria-label="CommonGround assistant"
            aria-modal="false"
          >
            <div className="flex items-center justify-between gap-2 border-b border-emerald-800/20 bg-[var(--cg-primary-strong)] px-4 py-3 text-white">
              <div className="flex min-w-0 items-center gap-2">
                <Sparkles className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">CommonGround Assistant</p>
                  <p className="truncate text-[11px] text-emerald-100/90">
                    Hours · events · tasks
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-white/90 transition hover:bg-white/10"
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-[var(--cg-canvas)] px-3 py-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-[var(--cg-primary)] text-white"
                        : "border border-[var(--cg-border)] bg-[var(--cg-surface)] text-[var(--cg-text-primary)]"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {showSuggestions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      disabled={sending}
                      onClick={() => void sendText(prompt)}
                      className="rounded-full border border-[var(--cg-border)] bg-[var(--cg-surface)] px-3 py-1.5 text-left text-[11px] font-medium text-[var(--cg-text-secondary)] transition hover:border-[var(--cg-primary)] hover:text-[var(--cg-primary-strong)] disabled:opacity-50"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {sending && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--cg-border)] bg-[var(--cg-surface)] px-3 py-2 text-xs text-[var(--cg-text-secondary)]">
                    <Spinner className="h-3.5 w-3.5 text-[var(--cg-primary)]" />
                    Thinking…
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {error && (
              <p className="border-t border-amber-200/80 bg-amber-50 px-3 py-1.5 text-xs text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/50 dark:text-amber-100">
                {error}
              </p>
            )}

            <form
              className="flex items-end gap-2 border-t border-[var(--cg-border)] bg-[var(--cg-surface)] p-3"
              onSubmit={(e) => {
                e.preventDefault();
                void sendText(input);
              }}
            >
              <label className="sr-only" htmlFor="cg-assistant-input">
                Message
              </label>
              <textarea
                ref={inputRef}
                id="cg-assistant-input"
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void sendText(input);
                  }
                }}
                placeholder="Ask about your hours, events…"
                className="min-h-[2.75rem] max-h-28 flex-1 resize-none rounded-xl border border-[var(--cg-border)] bg-[var(--cg-surface-muted)] px-3 py-2 text-sm text-[var(--cg-text-primary)] outline-none transition placeholder:text-[var(--cg-text-tertiary)] focus:border-[var(--cg-primary)] focus:bg-[var(--cg-surface)] focus:ring-2 focus:ring-[var(--cg-primary)]/25"
                disabled={sending}
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--cg-primary)] text-white transition hover:bg-[var(--cg-primary-strong)] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                {sending ? <Spinner className="h-4 w-4" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--cg-primary)] text-white shadow-lg shadow-emerald-900/25 transition hover:bg-[var(--cg-primary-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cg-primary)]"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        aria-expanded={open}
        whileTap={{ scale: 0.96 }}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}
