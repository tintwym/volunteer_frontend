'use client';
// @ts-nocheck

import React from 'react';
import {
  Building2,
  FileText,
  Globe,
  Mail,
  Phone,
  DollarSign,
  Award,
  Sparkles,
} from 'lucide-react';
import { OrganiserSystemSettings } from '../../types';

interface OrganizationProfileModuleProps {
  settings: OrganiserSystemSettings;
  onChange: <K extends keyof OrganiserSystemSettings>(
    key: K,
    value: OrganiserSystemSettings[K]
  ) => void;
}

export const OrganizationProfileModule: React.FC<OrganizationProfileModuleProps> = ({
  settings,
  onChange,
}) => {
  return (
    <div id="module-org-profile" className="space-y-6">
      {/* Module Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200/50">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Organization Profile & Legal Identity
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage organization branding, public registry credentials, and valuation constants.
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center px-2.5 py-1 text-[11px] font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Active Identity
          </span>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Public Organization Name
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="settings-org-name"
                value={settings.organizationName}
                onChange={(e) => onChange('organizationName', e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="e.g. HopeHarbor Volunteer Alliance"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Legal Registered Entity Name
            </label>
            <input
              type="text"
              id="settings-legal-name"
              value={settings.legalName || ''}
              onChange={(e) => onChange('legalName', e.target.value)}
              placeholder="e.g. HopeHarbor Alliance for Community Action Inc."
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tax ID / 501(c)(3) EIN Exemption
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="settings-tax-id"
                value={settings.taxId || ''}
                onChange={(e) => onChange('taxId', e.target.value)}
                placeholder="501(c)(3) EIN: 84-9707865"
                className="w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Primary Regional Timezone
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                id="settings-timezone"
                value={settings.timezone || 'America/New_York (EST)'}
                onChange={(e) => onChange('timezone', e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                <option value="America/New_York (EST)">Eastern Time (US & Canada) - EST/EDT</option>
                <option value="America/Chicago (CST)">Central Time (US & Canada) - CST/CDT</option>
                <option value="America/Denver (MST)">Mountain Time (US & Canada) - MST/MDT</option>
                <option value="America/Los_Angeles (PST)">Pacific Time (US & Canada) - PST/PDT</option>
                <option value="Europe/London (GMT)">Greenwich Mean Time (London, GMT)</option>
                <option value="Asia/Singapore (SGT)">Singapore Standard Time (SGT, UTC+8)</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Mission Statement & Tagline
          </label>
          <textarea
            id="settings-mission"
            rows={2}
            value={settings.missionStatement || ''}
            onChange={(e) => onChange('missionStatement', e.target.value)}
            placeholder="Empowering community resilience through organized, compassionate, and impactful local volunteer mobilization."
            className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Communications & Economic Valuation Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/50">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Operations Contacts & Economic Valuation Metric
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Points of contact for volunteers and the monetary baseline for community impact reports.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Operations Support Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                id="settings-support-email"
                value={settings.supportEmail}
                onChange={(e) => onChange('supportEmail', e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Emergency Dispatch Hotline
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="settings-hotline"
                value={settings.emergencyHotline}
                onChange={(e) => onChange('emergencyHotline', e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Hourly Volunteer Economic Value ($/hr)
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                step="0.01"
                min="10"
                max="100"
                id="settings-hourly-value"
                value={settings.hourlyValueRate ?? 33.49}
                onChange={(e) => onChange('hourlyValueRate', parseFloat(e.target.value) || 33.49)}
                className="w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Independent Sector standard US rate is currently $33.49/hour.
            </p>
          </div>
        </div>

        {/* Certificate Branding Live Preview */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mt-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Certificate & Letterhead Preview</p>
              <p className="text-[11px] text-slate-500">
                Issued under "{settings.organizationName}" • {settings.taxId || 'Registered 501(c)(3)'}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
            Auto-Synchronized
          </span>
        </div>
      </div>
    </div>
  );
};
