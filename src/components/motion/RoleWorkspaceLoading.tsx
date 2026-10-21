"use client";

import { HeartHandshake } from "lucide-react";
import { motion } from "motion/react";

const easeOut = [0.22, 1, 0.36, 1] as const;

type RoleWorkspaceLoadingProps = {
  /** e.g. "organizer workspace" or "your volunteer workspace" */
  label: string;
};

/**
 * Branded full-screen loader for role portal code-splits and live boot.
 * Respects light/dark via the document `dark` class.
 */
export function RoleWorkspaceLoading({ label }: RoleWorkspaceLoadingProps) {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 px-6 text-slate-600 dark:bg-slate-950 dark:text-slate-300"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.12),_transparent_55%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.18),_transparent_50%)]"
        aria-hidden
      />

      <motion.div
        className="relative flex flex-col items-center gap-5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeOut }}
      >
        <div className="relative flex h-16 w-16 items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-2xl border-2 border-emerald-500/35 dark:border-emerald-400/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            className="absolute inset-1 rounded-xl border border-dashed border-emerald-400/50 dark:border-emerald-500/40"
            animate={{ rotate: -360 }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 dark:bg-emerald-500 dark:shadow-emerald-500/20"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <HeartHandshake className="h-6 w-6" aria-hidden />
          </motion.div>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Loading {label}
            <AnimatedEllipsis />
          </p>
          <motion.p
            className="mt-1.5 text-xs text-slate-500 dark:text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            Preparing your workspace
          </motion.p>
        </div>

        <div className="flex items-center gap-1.5 pt-1" aria-hidden>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: i * 0.16,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function AnimatedEllipsis() {
  return (
    <span className="inline-flex w-6 justify-start" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        >
          .
        </motion.span>
      ))}
    </span>
  );
}
