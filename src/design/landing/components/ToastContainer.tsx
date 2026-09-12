'use client';
// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from '@/components/motion/ui';

function ToastProgress({ durationMs }: { durationMs: number }) {
  const [remaining, setRemaining] = useState(durationMs);

  useEffect(() => {
    const started = Date.now();
    const frame = window.setInterval(() => {
      const left = Math.max(0, durationMs - (Date.now() - started));
      setRemaining(left);
      if (left <= 0) window.clearInterval(frame);
    }, 50);
    return () => window.clearInterval(frame);
  }, [durationMs]);

  const pct = Math.max(0, (remaining / durationMs) * 100);

  return (
    <div className="absolute inset-x-0 bottom-0 h-1 overflow-hidden rounded-b-xl bg-black/5 dark:bg-white/10">
      <div
        className="h-full bg-current opacity-40 transition-[width] duration-75 ease-linear"
        style={{ width: `${pct}%` }}
        aria-hidden
      />
      <span className="sr-only">
        Notification closes in {Math.ceil(remaining / 1000)} seconds
      </span>
    </div>
  );
}

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      id="toast-container"
      className="pointer-events-none fixed bottom-5 right-5 z-[70] flex w-full max-w-sm flex-col gap-2.5"
      role="region"
      aria-live="polite"
      aria-label="Notification alerts"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const durationMs = toast.durationMs ?? 5000;
          const icon = {
            success: (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            ),
            info: <Info className="h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400" />,
            warning: (
              <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
            ),
            error: <XCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />,
          }[toast.type];

          const tone = {
            success:
              'border-emerald-200 bg-emerald-50/95 text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/90 dark:text-emerald-300',
            info: 'border-sky-200 bg-sky-50/95 text-sky-700 dark:border-sky-800/60 dark:bg-sky-950/90 dark:text-sky-300',
            warning:
              'border-amber-200 bg-amber-50/95 text-amber-700 dark:border-amber-800/60 dark:bg-amber-950/90 dark:text-amber-300',
            error:
              'border-rose-200 bg-rose-50/95 text-rose-700 dark:border-rose-800/60 dark:bg-rose-950/90 dark:text-rose-300',
          }[toast.type];

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto relative overflow-hidden rounded-2xl border p-4 pb-5 shadow-lg backdrop-blur-md ${tone}`}
            >
              <div className="flex items-start gap-3 text-stone-900 dark:text-stone-100">
                <div className="pt-0.5">{icon}</div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold tracking-tight">{toast.title}</h4>
                  {toast.message && (
                    <p className="mt-0.5 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
                      {toast.message}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  className="rounded-lg p-1 text-stone-400 transition-colors hover:bg-black/5 hover:text-stone-700 dark:hover:bg-white/10 dark:hover:text-stone-200"
                  aria-label="Close notification"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ToastProgress durationMs={durationMs} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
