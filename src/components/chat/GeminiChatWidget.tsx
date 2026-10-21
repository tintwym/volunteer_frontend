"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { AnimatePresence, Spinner, motion } from "@/components/motion/ui";
import { api, errorMessage } from "@/lib/api";
import { getStoredToken, isDemoToken } from "@/lib/auth";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type ChatTurn = { id: string; role: "user" | "assistant"; content: string };

const WELCOME =
  "Hi — I’m your CommonGround assistant. Ask about your hours, upcoming events, tasks, or how to use the app.";

export function GeminiChatWidget() {
  const { user, loading, isDemo } = useAuth();
  const reactId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatTurn[]>(() => [
    { id: `${reactId}-welcome`, role: "assistant", content: WELCOME },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const demoSession = isDemo || isDemoToken(getStoredToken());
  const visible = !loading && Boolean(user) && !demoSession;

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open, sending]);

  if (!visible) return null;

  async function onSend() {
    const text = input.trim();
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
      // Skip the static welcome bubble; omit the message we just added (sent as `message`).
      const history = nextHistory
        .filter((m) => m.id !== `${reactId}-welcome`)
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
  }

  return (
    <div
      className="pointer-events-none fixed z-[75] flex flex-col items-end gap-3"
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        // Clear leader/organiser bottom-right toasts (bottom-6) and home indicator.
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
            className="pointer-events-auto flex h-[min(32rem,calc(100dvh-8rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15"
            role="dialog"
            aria-label="AI assistant"
            aria-modal="false"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 bg-emerald-700 px-4 py-3 text-white">
              <div className="flex min-w-0 items-center gap-2">
                <Sparkles className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">Assistant</p>
                  <p className="truncate text-[11px] text-emerald-100/90">
                    Context-aware · powered by Gemini
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

            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-slate-50 px-3 py-3"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-emerald-600 text-white"
                        : "border border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {sending && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
                    <Spinner className="h-3.5 w-3.5 text-emerald-600" />
                    Thinking…
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {error && (
              <p className="border-t border-amber-100 bg-amber-50 px-3 py-1.5 text-xs text-amber-800">
                {error}
              </p>
            )}

            <form
              className="flex items-end gap-2 border-t border-slate-100 bg-white p-3"
              onSubmit={(e) => {
                e.preventDefault();
                void onSend();
              }}
            >
              <label className="sr-only" htmlFor="cg-assistant-input">
                Message
              </label>
              <textarea
                id="cg-assistant-input"
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void onSend();
                  }
                }}
                placeholder="Ask about your hours, events…"
                className="min-h-[2.75rem] max-h-28 flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                disabled={sending}
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
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
        className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-900/25 transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
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
