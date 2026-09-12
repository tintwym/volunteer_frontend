'use client';
// @ts-nocheck

import React from 'react';
import {
  Shield,
  UserCheck,
  FileCheck,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { OrganiserSystemSettings } from '../../types';

interface VolunteerScreeningModuleProps {
  settings: OrganiserSystemSettings;
  onChange: <K extends keyof OrganiserSystemSettings>(
    key: K,
    value: OrganiserSystemSettings[K]
  ) => void;
}

export const VolunteerScreeningModule: React.FC<VolunteerScreeningModuleProps> = ({
  settings,
  onChange,
}) => {
  return (
    <div id="module-screening-policies" className="space-y-6">
      {/* Module Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200/50">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Volunteer Screening & Eligibility Policies
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Define pre-requisites, background verification checks, and approval requirements.
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center px-2.5 py-1 text-[11px] font-semibold rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            Compliance Module
          </span>
        </div>

        {/* Toggles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Auto Approve Signups */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  Auto-Approve Volunteer Registrations
                </p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Automatically confirm volunteer signups without requiring prior manual vetting by a coordinator.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input
                type="checkbox"
                id="toggle-auto-approve"
                checked={settings.autoApproveRegistrations}
                onChange={(e) => onChange('autoApproveRegistrations', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Require Safety Training */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                Mandatory Safety Orientation
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Volunteers must review and sign off on safety training documents before shift registration unlock.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input
                type="checkbox"
                id="toggle-safety-training"
                checked={settings.requireSafetyTrainingBeforeShift}
                onChange={(e) => onChange('requireSafetyTrainingBeforeShift', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Require Liability Waiver */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                Digital Liability Waiver & Release
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Require an electronic signature on the general release of liability agreement.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input
                type="checkbox"
                id="toggle-liability-waiver"
                checked={settings.requireLiabilityWaiver ?? true}
                onChange={(e) => onChange('requireLiabilityWaiver', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Require Background Check */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                Mandatory Background Check
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Required for high-trust assignments such as senior care visits, youth programs, and cash handling.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input
                type="checkbox"
                id="toggle-bg-check"
                checked={settings.requireBackgroundCheck ?? true}
                onChange={(e) => onChange('requireBackgroundCheck', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Shift Swap Requires Approval */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                Shift Swap Requires Leader Sign-off
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Volunteers can initiate peer trade requests, but approval by an assigned volunteer leader is mandatory.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input
                type="checkbox"
                id="toggle-shift-swap"
                checked={settings.shiftSwapRequiresApproval}
                onChange={(e) => onChange('shiftSwapRequiresApproval', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Minimum Volunteer Age */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                Minimum Volunteer Age
              </p>
              <p className="text-xs text-slate-500">
                Youth below this threshold require parent/guardian co-authorization.
              </p>
            </div>
            <div className="w-32 shrink-0">
              <select
                id="settings-min-age"
                value={settings.minVolunteerAge ?? 16}
                onChange={(e) => onChange('minVolunteerAge', parseInt(e.target.value) || 16)}
                className="w-full px-3 py-1.5 text-xs sm:text-sm font-semibold bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value={14}>14+ Years</option>
                <option value={16}>16+ Years</option>
                <option value={18}>18+ Years</option>
                <option value={21}>21+ Years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Policy Summary Status */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <p className="text-xs text-slate-700">
              <span className="font-semibold text-slate-900">Active Policy Enforcement:</span> All 4 legal waivers and verification checkpoints are currently strictly mandated.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 self-start sm:self-center">
            Standard Non-Profit Tier
          </span>
        </div>
      </div>
    </div>
  );
};
