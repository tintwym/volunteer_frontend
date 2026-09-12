"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { acceptInvite, dashboardPathForRole } from "@/lib/auth";
import { validateAcceptInvite } from "@/lib/validation";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function AcceptInviteFormInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { setSession } = useAuth();
  const [token, setToken] = useState(params.get("token") ?? "");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errors = validateAcceptInvite({ token, fullName, password });
    setFieldErrors(errors);
    setFormError(null);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      const res = await acceptInvite({
        token: token.trim(),
        fullName: fullName.trim(),
        password,
      });
      setSession(res);
      router.push(dashboardPathForRole(res.user.role));
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Unable to accept invite."
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
      <p className="rounded-lg bg-stone-100 px-3 py-2 text-sm leading-snug text-stone-700">
        Leaders and volunteers join by invitation from an organizer.
      </p>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-stone-700">
          Invite token
        </label>
        <input
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            setFieldErrors((prev) => ({ ...prev, token: "" }));
          }}
          className={inputClass(Boolean(fieldErrors.token))}
        />
        {fieldErrors.token && (
          <p className="text-xs text-rose-600">{fieldErrors.token}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-stone-700">Full name</label>
        <input
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
        <label className="text-sm font-medium text-stone-700">Password</label>
        <input
          type="password"
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
        disabled={submitting}
        className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60"
      >
        {submitting ? "Joining…" : "Accept invite"}
      </button>
    </form>
  );
}

export function AcceptInviteForm() {
  return (
    <Suspense fallback={<p className="text-sm text-stone-500">Loading…</p>}>
      <AcceptInviteFormInner />
    </Suspense>
  );
}
