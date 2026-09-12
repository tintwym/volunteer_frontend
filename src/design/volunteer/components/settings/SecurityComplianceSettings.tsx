'use client';
// @ts-nocheck

import React from 'react';
import { ShieldCheck, Key, Lock, Clock, CheckCircle2, FileCheck, ShieldAlert } from 'lucide-react';
import { AppSettings } from '../../types';

interface SecurityComplianceSettingsProps {
  settings: AppSettings;
  onChange: (updated: Partial<AppSettings>) => void;
  onOpenPasswordModal: () => void;
}

export const SecurityComplianceSettings: React.FC<SecurityComplianceSettingsProps> = ({
  settings,
  onChange,
  onOpenPasswordModal
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Account Security Controls */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Lock className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Account Security & Access</h2>
        </div>

        <div className="space-y-4">
          <label className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/70 transition-colors">
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={(e) => onChange({ twoFactorAuth: e.target.checked })}
              className="accent-emerald-600 mt-0.5"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">
                  Two-Factor Authentication (2FA)
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                  Recommended
                </span>
              </div>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Requires a 6-digit one-time code sent via SMS or Authenticator App on new browser sign-ins.
              </span>
            </div>
          </label>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Inactivity Session Timeout
            </label>
            <select
              value={settings.sessionTimeoutMinutes}
              onChange={(e) => onChange({ sessionTimeoutMinutes: parseInt(e.target.value, 10) })}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="15">15 Minutes (High Security)</option>
              <option value="30">30 Minutes</option>
              <option value="60">1 Hour (Standard Kiosk)</option>
              <option value="120">2 Hours</option>
              <option value="480">8 Hours (Personal Device)</option>
            </select>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Account Password</span>
              <span className="text-[11px] text-slate-500">Last changed 42 days ago</span>
            </div>
            <button
              type="button"
              onClick={onOpenPasswordModal}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Key className="w-3.5 h-3.5 text-slate-500" />
              <span>Change Password</span>
            </button>
          </div>
        </div>
      </div>

      {/* Compliance & Legal Credentials */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Legal Compliance & Clearances</h2>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-950">Criminal Background Check</span>
              </div>
              <span className="text-[11px] text-emerald-800 mt-0.5 block">
                Verified on {settings.backgroundCheckDate} &bull; Cleared for youth, senior, and food distribution programs
              </span>
            </div>
            <span className="px-2.5 py-1 rounded text-[10px] font-extrabold bg-emerald-600 text-white shrink-0">
              CLEARED
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-900">General Liability &amp; Injury Waiver</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Digitally signed for 2026 civic season &bull; Verified legal acknowledgment
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
              SIGNED
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-900">Volunteer Code of Conduct</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Anti-harassment, privacy, and non-discrimination ethics agreement
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
              ACTIVE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
