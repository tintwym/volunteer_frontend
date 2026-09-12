"use client";

import { apiFetch } from "@/lib/auth";
import { FormEvent, useState } from "react";

type InviteResult = {
  email: string;
  role: string;
  token: string;
  invitePath: string;
};

export function InviteMemberForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"VOLUNTEER_LEADER" | "VOLUNTEER">("VOLUNTEER");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InviteResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setResult(null);
    try {
      const data = await apiFetch<InviteResult>("/api/invitations", {
        method: "POST",
        body: JSON.stringify({ email, role }),
      });
      setResult(data);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invite failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-5">
      <h2 className="text-lg font-semibold text-stone-900">Invite member</h2>
      <p className="mt-1 text-sm text-stone-600">
        Leaders and volunteers join by invitation only.
      </p>
      <form onSubmit={onSubmit} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <input
          type="email"
          required
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none ring-emerald-600 focus:ring-2"
        />
        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value as "VOLUNTEER_LEADER" | "VOLUNTEER")
          }
          className="rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm"
        >
          <option value="VOLUNTEER">Volunteer</option>
          <option value="VOLUNTEER_LEADER">Volunteer Leader</option>
        </select>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Invite"}
        </button>
      </form>
      {error && (
        <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}
      {result && (
        <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          <p>
            Invited <strong>{result.email}</strong> as {result.role}.
          </p>
          <p className="mt-1 break-all">
            Share link:{" "}
            <a className="underline" href={result.invitePath}>
              {result.invitePath}
            </a>
          </p>
          <p className="mt-1 break-all text-xs text-emerald-800">
            Token: {result.token}
          </p>
        </div>
      )}
    </div>
  );
}
