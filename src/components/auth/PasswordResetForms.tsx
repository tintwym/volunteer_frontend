"use client";

import { FormNotice, PasswordField, TextField } from "@/components/auth/AuthFields";
import { api, errorMessage } from "@/lib/api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ForgotPasswordInner() {
  const params = useSearchParams();
  const [email, setEmail] = useState(params.get("email") ?? "");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_PATTERN.test(value)) {
      setError("Enter the email address you sign in with.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await api.account.forgotPassword(value);
      setSent(true);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="space-y-5">
        <FormNotice tone="info">
          If an account exists for <strong>{email.trim()}</strong>, a reset link is on its way. The link
          expires in 30 minutes.
        </FormNotice>
        <Link
          href="/login"
          className="block w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <TextField
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="name@organization.com"
        value={email}
        error={error ?? undefined}
        onChange={(e) => {
          setEmail(e.target.value);
          setError(null);
        }}
      />
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send reset link"}
      </button>
      <p className="text-center text-sm text-stone-600">
        Remembered it?{" "}
        <Link href="/login" className="font-semibold text-emerald-700 hover:text-emerald-800">
          Sign in
        </Link>
      </p>
    </form>
  );
}

function ResetPasswordInner() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!token) {
    return (
      <div className="space-y-4">
        <FormNotice tone="error">This reset link is incomplete. Request a new one.</FormNotice>
        <Link href="/forgot-password" className="block text-center text-sm font-semibold text-emerald-700">
          Request a new link
        </Link>
      </div>
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (password.length < 8) errors.password = "Use at least 8 characters.";
    if (confirm !== password) errors.confirm = "Passwords do not match.";
    setFieldErrors(errors);
    setFormError(null);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      await api.account.resetPassword(token, password);
      setDone(true);
    } catch (err) {
      setFormError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="space-y-5">
        <FormNotice tone="info">Your password has been reset. Other devices have been signed out.</FormNotice>
        <Link
          href="/login"
          className="block w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <PasswordField
        label="New password"
        name="password"
        autoComplete="new-password"
        placeholder="At least 8 characters"
        value={password}
        error={fieldErrors.password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordField
        label="Confirm new password"
        name="confirm"
        autoComplete="new-password"
        placeholder="Re-enter your new password"
        value={confirm}
        error={fieldErrors.confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      {formError && <FormNotice tone="error">{formError}</FormNotice>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-60"
      >
        {submitting ? "Saving…" : "Reset password"}
      </button>
    </form>
  );
}

export function ForgotPasswordForm() {
  return (
    <Suspense>
      <ForgotPasswordInner />
    </Suspense>
  );
}

export function ResetPasswordForm() {
  return (
    <Suspense>
      <ResetPasswordInner />
    </Suspense>
  );
}
