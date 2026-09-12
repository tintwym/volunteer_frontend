"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { login, signup, dashboardPathForRole, isRole, enterDemo, type Role } from "@/lib/auth";
import { validateLogin, validateSignup } from "@/lib/validation";
import { ModalMotion } from "@/components/motion/ui";
import {
  ArrowRight,
  Building2,
  HeartHandshake,
  Lock,
  Mail,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type AccountType = "volunteer" | "organization";

type AuthCardProps = {
  initialType?: AccountType;
  variant?: "page" | "modal";
  onClose?: () => void;
};

export function AuthCard({
  initialType = "volunteer",
  variant = "page",
  onClose,
}: AuthCardProps) {
  const router = useRouter();
  const { user, setSession, loading } = useAuth();
  const [accountType, setAccountType] = useState<AccountType>(initialType);
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
    if (path !== "/login") router.replace(path);
  }, [user, loading, router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (accountType === "organization") {
      const errors = validateSignup({
        fullName,
        organizationName,
        email,
        password,
      });
      setFieldErrors(errors);
      if (Object.keys(errors).length > 0) return;

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
      return;
    }

    const errors = validateLogin({ email, password });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await login({ email: email.trim(), password });
      setSession(res);
      router.push(dashboardPathForRole(res.user.role));
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  function onDemoEnter(role: Role) {
    setFormError(null);
    setFieldErrors({});
    const res = enterDemo(role);
    setSession(res);
    router.push(dashboardPathForRole(role));
  }

  const inputClass = (hasError: boolean) =>
    `w-full pl-9 pr-3 py-2 text-sm rounded-xl border bg-stone-50/50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
      hasError ? "border-rose-400" : "border-stone-300"
    }`;

  const card = (
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl">
      <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-6 text-center text-white sm:p-7">
        {variant === "modal" && onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-1.5 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        ) : (
          <Link
            href="/"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-1.5 text-white transition-colors hover:bg-white/20"
            aria-label="Back to home"
          >
            <X className="h-5 w-5" />
          </Link>
        )}

        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-xs backdrop-blur-md">
          <HeartHandshake className="h-6 w-6 text-white" />
        </div>

        <h1
          id="auth-card-title"
          className="font-editorial text-2xl font-bold"
        >
          Log In / Sign Up
        </h1>
        <p className="mx-auto mt-1.5 max-w-xs text-xs text-emerald-100">
          Access your volunteer records, log community hours, or create your
          account in one simple step.
        </p>
      </div>

      <div className="max-h-[80vh] space-y-4 overflow-y-auto p-6">
        <button
          type="button"
          onClick={() =>
            setFormError(
              "Google sign-in is coming soon. Please continue with email."
            )
          }
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs font-medium text-stone-800 shadow-xs transition-all hover:bg-stone-50 active:scale-[0.99]"
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
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-stone-200" />
          <span className="absolute bg-white px-3 text-[10px] font-bold uppercase tracking-widest text-stone-400">
            Or with email &amp; password
          </span>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-3.5">
          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setAccountType("volunteer");
                  setFieldErrors({});
                  setFormError(null);
                }}
                className={`flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs font-medium transition-all ${
                  accountType === "volunteer"
                    ? "border-emerald-600 bg-emerald-50/80 text-emerald-900 ring-1 ring-emerald-500"
                    : "border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                <HeartHandshake className="h-4 w-4 shrink-0 text-emerald-600" />
                <div>
                  <div className="font-semibold">Volunteer</div>
                  <div className="text-[10px] text-stone-500">
                    Find &amp; log hours
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAccountType("organization");
                  setFieldErrors({});
                  setFormError(null);
                }}
                className={`flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs font-medium transition-all ${
                  accountType === "organization"
                    ? "border-teal-600 bg-teal-50/80 text-teal-900 ring-1 ring-teal-500"
                    : "border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                <Building2 className="h-4 w-4 shrink-0 text-teal-600" />
                <div>
                  <div className="font-semibold">Organization</div>
                  <div className="text-[10px] text-stone-500">
                    Post &amp; coordinate
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-xs font-medium text-stone-700">
                Full Name
              </label>
              {accountType === "volunteer" && (
                <span className="text-[10px] text-stone-400">
                  Optional if returning
                </span>
              )}
            </div>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, fullName: "" }));
                }}
                placeholder="e.g. Alex Rivera"
                className={inputClass(Boolean(fieldErrors.fullName))}
              />
            </div>
            {fieldErrors.fullName && (
              <p className="mt-1 text-xs text-rose-600">{fieldErrors.fullName}</p>
            )}
          </div>

          {accountType === "organization" && (
            <div>
              <label className="mb-1 block text-xs font-medium text-stone-700">
                Organization Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  value={organizationName}
                  onChange={(e) => {
                    setOrganizationName(e.target.value);
                    setFieldErrors((prev) => ({
                      ...prev,
                      organizationName: "",
                    }));
                  }}
                  placeholder="e.g. Green Roots"
                  className={inputClass(Boolean(fieldErrors.organizationName))}
                />
              </div>
              {fieldErrors.organizationName && (
                <p className="mt-1 text-xs text-rose-600">
                  {fieldErrors.organizationName}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-medium text-stone-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, email: "" }));
                }}
                placeholder="name@example.com"
                className={inputClass(Boolean(fieldErrors.email))}
              />
            </div>
            {fieldErrors.email && (
              <p className="mt-1 text-xs text-rose-600">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-stone-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, password: "" }));
                }}
                placeholder="••••••••"
                className={inputClass(Boolean(fieldErrors.password))}
              />
            </div>
            {fieldErrors.password && (
              <p className="mt-1 text-xs text-rose-600">{fieldErrors.password}</p>
            )}
          </div>

          {formError && (
            <p className="rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-700">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold tracking-wide text-white shadow-sm shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-60"
          >
            <span>
              {submitting
                ? accountType === "organization"
                  ? "Creating…"
                  : "Signing in…"
                : "Continue to Account"}
            </span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="rounded-2xl border border-stone-200/80 bg-stone-50 p-3 text-xs">
          <div className="mb-2 flex items-center gap-1.5 font-semibold text-stone-600">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>1-Click Instant Demo Access:</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => onDemoEnter("VOLUNTEER")}
              className="rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-center text-[11px] font-medium text-stone-700 transition-colors hover:border-emerald-500"
            >
              Volunteer
            </button>
            <button
              type="button"
              onClick={() => onDemoEnter("ORGANIZER")}
              className="rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-center text-[11px] font-medium text-stone-700 transition-colors hover:border-teal-500"
            >
              Organization
            </button>
            <button
              type="button"
              onClick={() => onDemoEnter("VOLUNTEER_LEADER")}
              className="rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-center text-[11px] font-medium text-stone-700 transition-colors hover:border-amber-500"
            >
              Leader
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Prototype auth is always a modal over the landing UI with a dimmed blur backdrop.
  return (
    <ModalMotion>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-card-title"
      >
        {card}
      </div>
    </ModalMotion>
  );
}
