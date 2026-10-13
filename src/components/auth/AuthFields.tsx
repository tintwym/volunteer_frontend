"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState, type InputHTMLAttributes, type ReactNode } from "react";

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 ${
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
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
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
          className="absolute inset-y-0 right-0 flex items-center px-3 text-stone-400 hover:text-stone-600"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}

export function GoogleButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="#4285F4"
          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
        />
      </svg>
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
  return <p className={`rounded-lg px-3 py-2 text-sm ${styles}`}>{children}</p>;
}
