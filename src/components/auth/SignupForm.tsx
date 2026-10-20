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
import { signup, dashboardPathForRole, isRole } from "@/lib/auth";
import { validateSignup } from "@/lib/validation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export function SignupForm() {
  const router = useRouter();
  const { user, setSession, loading } = useAuth();
  const [fullName, setFullName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    const errors = validateSignup({
      fullName,
      organizationName,
      email,
      password,
      confirmPassword,
    });
    setFieldErrors(errors);
    setFormError(null);
    setNotice(null);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      const res = await signup({
        fullName: fullName.trim(),
        organizationName: organizationName.trim(),
        email: email.trim(),
        password,
      });
      setSession(res);
      router.push(dashboardPathForRole(res.user.role));
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Unable to create account."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <GoogleButton
        onClick={() => {
          setFormError(null);
          setNotice("Google sign-up is coming soon. Please continue with email.");
        }}
      />
      <OrDivider />

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <TextField
          label="Full name"
          name="fullName"
          autoComplete="name"
          placeholder="e.g. Alex Rivera"
          value={fullName}
          error={fieldErrors.fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            setFieldErrors((prev) => ({ ...prev, fullName: "" }));
          }}
        />

        <TextField
          label="Organization name"
          name="organizationName"
          autoComplete="organization"
          placeholder="e.g. Green Roots"
          value={organizationName}
          error={fieldErrors.organizationName}
          onChange={(e) => {
            setOrganizationName(e.target.value);
            setFieldErrors((prev) => ({ ...prev, organizationName: "" }));
          }}
        />

        <TextField
          label="Work email"
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
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={password}
          error={fieldErrors.password}
          onChange={(e) => {
            setPassword(e.target.value);
            setFieldErrors((prev) => ({ ...prev, password: "", confirmPassword: "" }));
          }}
        />

        <PasswordField
          label="Confirm password"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          error={fieldErrors.confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setFieldErrors((prev) => ({ ...prev, confirmPassword: "" }));
          }}
        />

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
          idleLabel="Create account"
          busyLabel="Creating account…"
        />
      </form>

      <p className="text-center text-sm text-stone-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-emerald-700 hover:text-emerald-800">
          Sign in
        </Link>
      </p>
    </div>
  );
}
