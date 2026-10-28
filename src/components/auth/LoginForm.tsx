"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import {
  FormNotice,
  GoogleButton,
  OrDivider,
  PasswordField,
  SubmitButton,
  TextField,
} from "@/components/auth/AuthFields";
import { AnimatePresence } from "@/components/motion/ui";
import { login, dashboardPathForRole, isRole } from "@/lib/auth";
import { validateLogin } from "@/lib/validation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const { user, setSession, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (loading || !user || !isRole(user.role)) return;
    const path = dashboardPathForRole(user.role);
    if (path !== "/login") {
      router.replace(path);
    }
  }, [user, loading, router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errors = validateLogin({ email, password });
    setFieldErrors(errors);
    setFormError(null);
    setNotice(null);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      const res = await login({ email: email.trim(), password }, remember);
      setSession(res);
      router.push(dashboardPathForRole(res.user.role));
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  function showNotice(message: string) {
    setFormError(null);
    setNotice(message);
  }

  return (
    <div className="space-y-6">
      <GoogleButton
        onClick={() =>
          showNotice("Google sign-in is coming soon. Please continue with email.")
        }
      />
      <OrDivider />

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@organization.com"
          value={email}
          error={fieldErrors.email}
          onChange={(e) => {
            setEmail(e.target.value);
            setFieldErrors((prev) => ({ ...prev, email: "" }));
          }}
        />

        <PasswordField
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          error={fieldErrors.password}
          labelAction={
            <Link
              href={email.trim() ? `/forgot-password?email=${encodeURIComponent(email.trim())}` : "/forgot-password"}
              className="text-xs font-medium text-emerald-700 hover:text-emerald-800"
            >
              Forgot password?
            </Link>
          }
          onChange={(e) => {
            setPassword(e.target.value);
            setFieldErrors((prev) => ({ ...prev, password: "" }));
          }}
        />

        <label className="flex items-center gap-2 text-sm text-stone-600">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-stone-300 accent-emerald-600"
          />
          Remember me
        </label>

        <AnimatePresence initial={false} mode="popLayout">
          {formError ? (
            <FormNotice key="error" tone="error">
              {formError}
            </FormNotice>
          ) : null}
          {notice ? (
            <FormNotice key="notice" tone="info">
              {notice}
            </FormNotice>
          ) : null}
        </AnimatePresence>

        <SubmitButton
          submitting={submitting}
          disabled={loading}
          idleLabel="Sign in"
          busyLabel="Signing in…"
        />
      </form>

      <p className="text-center text-sm text-stone-600">
        New organization?{" "}
        <Link href="/signup" className="font-semibold text-emerald-700 hover:text-emerald-800">
          Create an account
        </Link>
      </p>
    </div>
  );
}
