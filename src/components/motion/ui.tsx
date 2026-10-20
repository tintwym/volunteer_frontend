"use client";

import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function AnimatedPage({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        className={className}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.28, ease: easeOut }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 18,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: easeOut }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeInView({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

export function ShellEntrance({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="contents"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

/** Compact spinner for auth/submit buttons and live loaders. */
export function Spinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V2C5.373 2 0 7.373 0 14h2zm2 5.291A7.962 7.962 0 014 12H2c0 3.042 1.135 5.824 3 7.938l1-1.647z"
      />
    </svg>
  );
}

export function ModalMotion({
  children,
  onBackdropClick,
  maxWidthClass = "max-w-md",
  containerClassName = "items-center justify-center p-4",
  zClassName = "z-50",
}: {
  children: ReactNode;
  onBackdropClick?: () => void;
  maxWidthClass?: string;
  /** Flex alignment classes for the overlay shell. */
  containerClassName?: string;
  zClassName?: string;
}) {
  return (
    <motion.div
      className={`fixed inset-0 ${zClassName} flex ${containerClassName}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        onClick={onBackdropClick}
        aria-hidden
      />
      <motion.div
        className={`relative z-10 w-full ${maxWidthClass}`}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.32, ease: easeOut }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export { motion, AnimatePresence, easeOut };
