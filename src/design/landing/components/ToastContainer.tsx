'use client';
// @ts-nocheck

import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div 
      id="toast-container"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      role="region"
      aria-live="polite"
      aria-label="Notification alerts"
    >
      <AnimatePresence>
        {toasts.map(toast => {
          const icon = {
            success: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
            info: <Info className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" />,
            warning: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />,
            error: <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
          }[toast.type];

          const borderColors = {
            success: 'border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/90 dark:bg-emerald-950/80',
            info: 'border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/80',
            warning: 'border-amber-200 dark:border-amber-800/60 bg-amber-50/90 dark:bg-amber-950/80',
            error: 'border-rose-200 dark:border-rose-800/60 bg-rose-50/90 dark:bg-rose-950/80'
          }[toast.type];

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto rounded-xl border p-4 shadow-lg backdrop-blur-md flex items-start gap-3 text-stone-900 dark:text-stone-100 ${borderColors}`}
            >
              <div className="pt-0.5">{icon}</div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold tracking-tight">{toast.title}</h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5 leading-relaxed">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1 transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
