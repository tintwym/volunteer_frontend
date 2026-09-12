"use client";

import { useAuth } from "@/components/auth/AuthProvider";
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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
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
    });
    setFieldErrors(errors);
    setFormError(null);

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

  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none ring-emerald-600 focus:ring-2 ${
      hasError ? "border-rose-400" : "border-stone-300"
    }`;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm leading-snug text-emerald-800">
        New accounts are created as <strong>Organizer</strong> by default.
      </p>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-stone-700">Full name</label>
        <input
          autoComplete="name"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            setFieldErrors((prev) => ({ ...prev, fullName: "" }));
          }}
          className={inputClass(Boolean(fieldErrors.fullName))}
        />
        {fieldErrors.fullName && (
          <p className="text-xs text-rose-600">{fieldErrors.fullName}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-stone-700">
          Organization name
        </label>
        <input
          value={organizationName}
          onChange={(e) => {
            setOrganizationName(e.target.value);
            setFieldErrors((prev) => ({ ...prev, organizationName: "" }));
          }}
          className={inputClass(Boolean(fieldErrors.organizationName))}
        />
        {fieldErrors.organizationName && (
          <p className="text-xs text-rose-600">
            {fieldErrors.organizationName}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-stone-700">Email</label>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setFieldErrors((prev) => ({ ...prev, email: "" }));
          }}
          className={inputClass(Boolean(fieldErrors.email))}
        />
        {fieldErrors.email && (
          <p className="text-xs text-rose-600">{fieldErrors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-stone-700">Password</label>
        <input
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setFieldErrors((prev) => ({ ...prev, password: "" }));
          }}
          className={inputClass(Boolean(fieldErrors.password))}
        />
        {fieldErrors.password && (
          <p className="text-xs text-rose-600">{fieldErrors.password}</p>
        )}
      </div>

      {formError && (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || loading}
        className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60"
      >
        {submitting ? "Creating…" : "Create organizer account"}
      </button>
      <p className="text-center text-sm text-stone-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-emerald-700">
          Sign in
        </Link>
      </p>
    </form>
  );
}
