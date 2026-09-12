'use client';
// @ts-nocheck

import React from 'react';
import {
  Lock,
  KeyRound,
  ShieldCheck,
  UserCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { OrganiserSystemSettings } from '../../types';

interface SecurityAccessModuleProps {
  settings: OrganiserSystemSettings;
  onChange: <K extends keyof OrganiserSystemSettings>(
    key: K,
    value: OrganiserSystemSettings[K]
  ) => void;
}

export const SecurityAccessModule: React.FC<SecurityAccessModuleProps> = ({
  settings,
  onChange,
}) => {
  return (
    <div id="module-security-access" className="space-y-6">
      {/* Authentication Security Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-300/60">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Authentication & Session Security
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Multi-factor protection, automatic session logouts, and access boundaries.
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center px-2.5 py-1 text-[11px] font-semibold rounded-full bg-slate-100 text-slate-800 border border-slate-300">
            Security Module
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Enforce 2FA */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  Enforce Two-Factor Authentication (2FA)
                </p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Mandates TOTP / Authenticator code verification for all accounts with Organizer or Volunteer Leader permissions.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input
                type="checkbox"
                id="toggle-2fa"
                checked={settings.twoFactorEnforced ?? true}
                onChange={(e) => onChange('twoFactorEnforced', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Session Timeout */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  Session Inactivity Timeout
                </p>
              </div>
              <p className="text-xs text-slate-500">
                Automatically disconnects unattended browser sessions.
              </p>
            </div>
            <div className="w-32 shrink-0">
              <select
                id="settings-session-timeout"
                value={settings.sessionTimeoutMinutes ?? 60}
                onChange={(e) => onChange('sessionTimeoutMinutes', parseInt(e.target.value) || 60)}
                className="w-full px-3 py-1.5 text-xs sm:text-sm font-semibold bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value={15}>15 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={60}>1 Hour</option>
                <option value={240}>4 Hours</option>
                <option value={480}>8 Hours</option>
              </select>
            </div>
          </div>
        </div>

        {/* Role Matrix Preview */}
        <div className="pt-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
            Role Permission Matrix Overview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Organizers</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                  Full Admin
                </span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Complete read/write permissions for events, rosters, broadcasts, approvals, financial metrics, and all platform settings.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Volunteer Leaders</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-semibold">
                  Squad Lead
                </span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Assigned team management, check-in kiosk access, attendance verification, shift logs, and field safety escalations.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Volunteers</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                  Member
                </span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Opportunity browsing, self shift sign-ups, personal verified hours ledger, badge achievements, and official certificates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
