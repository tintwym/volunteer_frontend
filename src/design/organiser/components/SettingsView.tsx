'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Building2,
  Shield,
  Clock,
  Bell,
  Lock,
  Database,
  Save,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Sliders,
  Sparkles,
  LayoutGrid,
  Filter,
  Search,
  ExternalLink,
} from 'lucide-react';
import { OrganiserSystemSettings, User } from '../types';
import { OrganizationProfileModule } from './settings/OrganizationProfileModule';
import { VolunteerScreeningModule } from './settings/VolunteerScreeningModule';
import { ShiftOperationsModule } from './settings/ShiftOperationsModule';
import { CommunicationsEscalationModule } from './settings/CommunicationsEscalationModule';
import { SecurityAccessModule } from './settings/SecurityAccessModule';
import { DataGovernanceModule } from './settings/DataGovernanceModule';

export type SettingsModuleKey =
  | 'all'
  | 'organization'
  | 'policies'
  | 'operations'
  | 'notifications'
  | 'security'
  | 'data';

interface SettingsViewProps {
  settings: OrganiserSystemSettings;
  onUpdateSettings: (newSettings: OrganiserSystemSettings) => void;
  onResetAllData?: () => void;
  onExportAllData?: () => void;
  currentUser: User;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onResetAllData,
  onExportAllData,
  currentUser,
}) => {
  const [formData, setFormData] = useState<OrganiserSystemSettings>({ ...settings });
  const [selectedModule, setSelectedModule] = useState<SettingsModuleKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [saveSuccessToast, setSaveSuccessToast] = useState<string | null>(null);

  const hasUnsavedChanges = JSON.stringify(formData) !== JSON.stringify(settings);

  const handleChange = <K extends keyof OrganiserSystemSettings>(
    key: K,
    value: OrganiserSystemSettings[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onUpdateSettings(formData);
    setSaveSuccessToast('Module configuration successfully updated and persisted.');
    setTimeout(() => {
      setSaveSuccessToast(null);
    }, 4000);
  };

  const handleDiscard = () => {
    setFormData({ ...settings });
  };

  // Modules metadata definition
  const modulesList = [
    {
      key: 'organization' as SettingsModuleKey,
      title: 'Organization Profile & Identity',
      shortTitle: 'Organization',
      description: 'Brand naming, 501(c)(3) tax credentials, timezones, and hourly economic valuation rate.',
      icon: Building2,
      color: 'text-teal-700 bg-teal-50 border-teal-200',
      badge: 'Active Brand',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      stats: [
        { label: 'Timezone', value: (formData.timezone || 'EST').split(' ')[0] },
        { label: 'Valuation Rate', value: `$${formData.hourlyValueRate ?? 33.49}/hr` },
        { label: 'Registry', value: formData.taxId ? '501(c)(3)' : 'Standard' },
      ],
    },
    {
      key: 'policies' as SettingsModuleKey,
      title: 'Volunteer Screening & Eligibility',
      shortTitle: 'Screening Policies',
      description: 'Pre-requisite training, background screening, digital waivers, and min age rules.',
      icon: Shield,
      color: 'text-purple-700 bg-purple-50 border-purple-200',
      badge: '4 Enforced Rules',
      statusColor: 'bg-purple-50 text-purple-700 border-purple-200',
      stats: [
        { label: 'Min Age', value: `${formData.minVolunteerAge ?? 16}+` },
        { label: 'Auto-Approve', value: formData.autoApproveRegistrations ? 'Enabled' : 'Vetted' },
        { label: 'Safety Training', value: formData.requireSafetyTrainingBeforeShift ? 'Mandatory' : 'Optional' },
      ],
    },
    {
      key: 'operations' as SettingsModuleKey,
      title: 'Shift Dispatch & Attendance Kiosk',
      shortTitle: 'Operations & Shifts',
      description: 'Default event quotas, max volunteer weekly hours cap, QR code kiosk, and GPS verification.',
      icon: Clock,
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      badge: 'Field Ready',
      statusColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      stats: [
        { label: 'Default Capacity', value: `${formData.defaultEventCapacity} Vol.` },
        { label: 'Max Weekly Cap', value: `${formData.maxWeeklyVolunteerHours} hrs` },
        { label: 'QR Kiosk Mode', value: formData.enableQrKioskCheckin ? 'Active' : 'Disabled' },
      ],
    },
    {
      key: 'notifications' as SettingsModuleKey,
      title: 'Automated Communications & Alerts',
      shortTitle: 'Automations',
      description: '24-hour shift reminder emails, urgent SMS broadcasts, and incident escalation mailbox.',
      icon: Bell,
      color: 'text-teal-700 bg-teal-50 border-teal-200',
      badge: 'Automated',
      statusColor: 'bg-teal-50 text-teal-700 border-teal-200',
      stats: [
        { label: '24h Reminders', value: formData.autoSend24hReminders ? 'Enabled' : 'Off' },
        { label: 'Urgent SMS', value: formData.enableSmsUrgentAlerts ? 'Active' : 'Off' },
        { label: 'Digest Cycle', value: 'Mondays 8AM' },
      ],
    },
    {
      key: 'security' as SettingsModuleKey,
      title: 'Security, 2FA & Access Control',
      shortTitle: 'Security & 2FA',
      description: 'Multi-factor authentication rules, session timeouts, and role-based permissions matrix.',
      icon: Lock,
      color: 'text-slate-700 bg-slate-100 border-slate-300',
      badge: 'Protected',
      statusColor: 'bg-slate-100 text-slate-800 border-slate-300',
      stats: [
        { label: '2FA Requirement', value: formData.twoFactorEnforced ? 'Enforced' : 'Optional' },
        { label: 'Session Timeout', value: `${formData.sessionTimeoutMinutes ?? 60} min` },
        { label: 'Access Matrix', value: '3 Roles' },
      ],
    },
    {
      key: 'data' as SettingsModuleKey,
      title: 'Data Governance, Backups & Reset',
      shortTitle: 'Data Governance',
      description: 'Platform JSON archive exports, system diagnostics, and factory mock data reset.',
      icon: Database,
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      badge: 'HTML5 Persisted',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
      stats: [
        { label: 'Persistence', value: 'Local Storage' },
        { label: 'Backup Format', value: 'Standard JSON' },
        { label: 'System Health', value: 'Optimal' },
      ],
    },
  ];

  const filteredModules = modulesList.filter((m) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.shortTitle.toLowerCase().includes(q)
    );
  });

  return (
    <div id="settings-view" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      {saveSuccessToast && (
        <div
          id="settings-save-toast"
          className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs sm:text-sm font-medium">{saveSuccessToast}</p>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-teal-50 text-teal-700 border border-teal-200/50">
              System Administration
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">Modular Settings Architecture</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-2">
            Platform Settings & Configuration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Configure standalone operational modules across organization branding, volunteer eligibility,
            shift parameters, automated dispatches, access controls, and data governance.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {hasUnsavedChanges && (
            <button
              type="button"
              id="discard-settings-btn"
              onClick={handleDiscard}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Discard Changes
            </button>
          )}

          <button
            type="button"
            id="save-settings-primary-btn"
            onClick={() => handleSave()}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all ${
              hasUnsavedChanges
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-600/30'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{hasUnsavedChanges ? 'Save Module Config *' : 'Save All Settings'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Bar & Module Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        {/* Module Switcher Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            id="tab-module-all"
            onClick={() => setSelectedModule('all')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
              selectedModule === 'all'
                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>All Modules ({modulesList.length})</span>
          </button>

          {modulesList.map((mod) => {
            const Icon = mod.icon;
            const isCurrent = selectedModule === mod.key;
            return (
              <button
                key={mod.key}
                type="button"
                id={`tab-module-${mod.key}`}
                onClick={() => setSelectedModule(mod.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  isCurrent
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{mod.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Search */}
        {selectedModule === 'all' && (
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="search-settings-modules"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search setting modules..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        )}
      </div>

      {/* VIEW MODE 1: ALL MODULES OVERVIEW HUB */}
      {selectedModule === 'all' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.key}
                  id={`card-module-${mod.key}`}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl border ${mod.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${mod.statusColor}`}
                      >
                        {mod.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {mod.description}
                      </p>
                    </div>

                    {/* Summary Stats Matrix */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                      {mod.stats.map((stat, idx) => (
                        <div key={idx} className="bg-slate-50 p-2 rounded-lg text-center">
                          <p className="text-[10px] text-slate-400 truncate">{stat.label}</p>
                          <p className="text-xs font-bold text-slate-800 truncate mt-0.5">
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">Modular Settings</span>
                    <button
                      type="button"
                      id={`btn-configure-${mod.key}`}
                      onClick={() => setSelectedModule(mod.key)}
                      className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      <span>Configure Module</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: DEDICATED SEPARATE MODULE PANELS */}
      {selectedModule !== 'all' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Breadcrumb Header */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              id="back-to-all-modules-btn"
              onClick={() => setSelectedModule('all')}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Modules</span>
            </button>

            <span className="text-xs text-slate-400">
              Editing Module:{' '}
              <strong className="text-slate-700 font-bold capitalize">{selectedModule}</strong>
            </span>
          </div>

          {/* Module Sub-Components */}
          {selectedModule === 'organization' && (
            <OrganizationProfileModule settings={formData} onChange={handleChange} />
          )}

          {selectedModule === 'policies' && (
            <VolunteerScreeningModule settings={formData} onChange={handleChange} />
          )}

          {selectedModule === 'operations' && (
            <ShiftOperationsModule settings={formData} onChange={handleChange} />
          )}

          {selectedModule === 'notifications' && (
            <CommunicationsEscalationModule settings={formData} onChange={handleChange} />
          )}

          {selectedModule === 'security' && (
            <SecurityAccessModule settings={formData} onChange={handleChange} />
          )}

          {selectedModule === 'data' && (
            <DataGovernanceModule
              settings={formData}
              onExportAllData={onExportAllData}
              onResetAllData={onResetAllData}
            />
          )}

          {/* Bottom Save bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4 mt-6">
            <p className="text-xs text-slate-500">
              {hasUnsavedChanges
                ? 'You have unsaved changes in this module.'
                : 'All settings in this module are up to date and saved in browser storage.'}
            </p>
            <div className="flex items-center gap-2">
              {hasUnsavedChanges && (
                <button
                  type="button"
                  onClick={handleDiscard}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Discard
                </button>
              )}
              <button
                type="button"
                id="bottom-save-module-btn"
                onClick={() => handleSave()}
                className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all ${
                  hasUnsavedChanges
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-600/30'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <Save className="w-4 h-4" />
                <span>Save Module Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
