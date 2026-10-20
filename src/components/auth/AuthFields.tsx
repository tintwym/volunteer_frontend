"use client";

import { AnimatePresence, motion } from "@/components/motion/ui";
import { Eye, EyeOff } from "lucide-react";
import { useState, type InputHTMLAttributes, type ReactNode } from "react";

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 transition-[border-color,box-shadow] duration-200 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 ${
    hasError ? "border-rose-400" : "border-stone-300"
  }`;

type FieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  label: string;
  error?: string;
  labelAction?: ReactNode;
};

export function TextField({ label, error, labelAction, id, ...props }: FieldProps) {
  const inputId = id ?? props.name;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={inputId} className="text-sm font-medium text-stone-700">
          {label}
        </label>
        {labelAction}
      </div>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        className={inputClass(Boolean(error))}
        {...props}
      />
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            key={error}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 4 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden text-xs text-rose-600"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function PasswordField({ label, error, labelAction, id, ...props }: FieldProps) {
  const [visible, setVisible] = useState(false);
  const inputId = id ?? props.name;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={inputId} className="text-sm font-medium text-stone-700">
          {label}
        </label>
        {labelAction}
      </div>
      <div className="relative">
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          aria-invalid={Boolean(error)}
          className={`${inputClass(Boolean(error))} pr-10`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute inset-y-0 right-0 flex items-center rounded-r-lg px-3 text-stone-400 transition-colors duration-200 hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/30"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            key={error}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 4 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden text-xs text-rose-600"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** Official Google "G" mark (brand colors must not be altered). */
export function GoogleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

export function GoogleButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors duration-200 hover:border-stone-400 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/30"
    >
      <GoogleIcon />
      Continue with Google
    </button>
  );
}

export function OrDivider() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="w-full border-t border-stone-200" />
      <span className="absolute bg-white px-3 text-xs text-stone-400">or</span>
    </div>
  );
}

export function FormNotice({
  tone,
  children,
}: {
  tone: "error" | "info";
  children: ReactNode;
}) {
  const styles =
    tone === "error" ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-800";
  return (
    <motion.p
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.22 }}
      className={`overflow-hidden rounded-lg px-3 py-2 text-sm ${styles}`}
    >
      {children}
    </motion.p>
  );
}

export function SubmitButton({
  submitting,
  idleLabel,
  busyLabel,
  disabled,
}: {
  submitting: boolean;
  idleLabel: string;
  busyLabel: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={submitting || disabled}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-[background-color,box-shadow,transform] duration-200 hover:bg-emerald-700 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/40 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60"
    >
      {submitting ? (
        <>
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          {busyLabel}
        </>
      ) : (
        idleLabel
      )}
    </button>
  );
}
