'use client';
// @ts-nocheck

import React, { useState, useMemo } from 'react';
import { 
  Settings as SettingsIcon,
  Globe,
  Bell,
  Clock,
  Eye,
  QrCode,
  ShieldCheck,
  Download,
  RotateCcw,
  Save,
  CheckCircle2,
  AlertTriangle,
  Key,
  Check,
  Search,
  Undo2
} from 'lucide-react';
import { AppSettings, VolunteerProfile } from '../types';
import { GeneralSettings } from './settings/GeneralSettings';
import { NotificationSettings } from './settings/NotificationSettings';
import { CommitmentTravelSettings } from './settings/CommitmentTravelSettings';
import { PrivacySharingSettings } from './settings/PrivacySharingSettings';
import { TerminalCheckinSettings } from './settings/TerminalCheckinSettings';
import { SecurityComplianceSettings } from './settings/SecurityComplianceSettings';
import { DataBackupSettings } from './settings/DataBackupSettings';

interface SettingsViewProps {
  settings: AppSettings;
  profile: VolunteerProfile;
  onUpdateSettings: (updated: AppSettings) => void;
  onUpdateProfile?: (updated: VolunteerProfile) => void;
  onResetSettings: () => void;
}

type SubTabId = 'general' | 'notifications' | 'scheduling' | 'privacy' | 'checkin' | 'security' | 'data';

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  profile,
  onUpdateSettings,
  onUpdateProfile,
  onResetSettings
}) => {
  const [formData, setFormData] = useState<AppSettings>({ ...settings });
  const [activeSubTab, setActiveSubTab] = useState<SubTabId>('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [saveToast, setSaveToast] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });
  const [passwordToast, setPasswordToast] = useState('');
  const [confirmResetModal, setConfirmResetModal] = useState(false);

  // Dirty state tracking (detect unsaved modifications)
  const isDirty = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(settings);
  }, [formData, settings]);

  const handlePartialUpdate = (partial: Partial<AppSettings>) => {
    setFormData(prev => ({
      ...prev,
      ...partial
    }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onUpdateSettings(formData);

    // Sync notification and contact sharing with profile if profile updater is available
    if (onUpdateProfile) {
      onUpdateProfile({
        ...profile,
        shareContactWithTeam: formData.shareContactWithTeam,
        notificationPreferences: {
          ...profile.notificationPreferences,
          email: formData.emailShiftConfirmation,
          sms: formData.smsShiftAlerts,
          reminder24h: formData.emailReminders24h,
          urgentAlerts: formData.smsEmergencyBroadcasts
        }
      });
    }

    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleDiscardChanges = () => {
    setFormData({ ...settings });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.current || !passwordForm.next) {
      setPasswordToast('Please fill in all password fields.');
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordToast('New passwords do not match.');
      return;
    }
    if (passwordForm.next.length < 8) {
      setPasswordToast('New password must be at least 8 characters long.');
      return;
    }

    setPasswordToast('Password updated successfully!');
    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordForm({ current: '', next: '', confirm: '' });
      setPasswordToast('');
    }, 1500);
  };

  const navItems = [
    { 
      id: 'general', 
      label: 'General & Regional', 
      icon: Globe, 
      desc: 'Timezone, language & transit mode',
      keywords: ['timezone', 'language', 'date', 'time', 'calendar', 'ics', 'transit', 'car', 'bike', 'bus']
    },
    { 
      id: 'notifications', 
      label: 'Notifications & Alerts', 
      icon: Bell, 
      desc: 'Email, SMS & quiet hours',
      keywords: ['email', 'sms', 'alerts', 'notifications', 'quiet', 'chime', 'sound', 'emergency', 'reminder', 'digest']
    },
    { 
      id: 'scheduling', 
      label: 'Travel & Workload Limits', 
      icon: Clock, 
      desc: 'Travel radius & weekly ceiling',
      keywords: ['travel', 'radius', 'miles', 'weekly', 'hours', 'ceiling', 'capacity', 'workload', 'burnout']
    },
    { 
      id: 'privacy', 
      label: 'Privacy & Squad Sharing', 
      icon: Eye, 
      desc: 'Team visibility & leaderboard',
      keywords: ['privacy', 'contact', 'leaderboard', 'squad', 'team', 'direct messages', 'emergency contact', 'phone', 'email']
    },
    { 
      id: 'checkin', 
      label: 'Check-in & Terminal Sensors', 
      icon: QrCode, 
      desc: 'QR badge, GPS geofence & PIN',
      keywords: ['qr', 'gps', 'pin', 'checkin', 'scanner', 'geofence', 'vibrate', 'haptic', 'diagnostics', 'camera']
    },
    { 
      id: 'security', 
      label: 'Security & Compliance', 
      icon: ShieldCheck, 
      desc: '2FA, background check & waivers',
      keywords: ['2fa', 'security', 'password', 'timeout', 'background', 'check', 'waiver', 'conduct', 'clearance']
    },
    { 
      id: 'data', 
      label: 'Data Portability & Backup', 
      icon: Download, 
      desc: 'Export JSON, restore & reset',
      keywords: ['export', 'backup', 'json', 'restore', 'reset', 'defaults', 'import']
    },
  ] as const;

  // Filter tabs based on search query
  const filteredNavItems = useMemo(() => {
    if (!searchQuery.trim()) return navItems;
    const q = searchQuery.toLowerCase().trim();
    return navItems.filter(item => 
      item.label.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.keywords.some(k => k.includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {saveToast && (
        <div className="bg-emerald-700 text-white px-4 py-3 rounded-xl shadow-md flex items-center justify-between text-xs font-semibold animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span>Volunteer preferences and system configuration saved successfully!</span>
          </div>
          <button 
            type="button"
            onClick={() => setSaveToast(false)} 
            className="text-emerald-100 hover:text-white underline text-xs cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 shrink-0">
              <SettingsIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Volunteer &amp; System Settings</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Active
                </span>
                {isDirty && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                    Unsaved Changes
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Manage scheduling limits, dispatch notifications, squad privacy controls, and check-in hardware sensors.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {isDirty && (
              <button
                type="button"
                onClick={handleDiscardChanges}
                className="px-3 py-2 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Discard unsaved edits"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span>Discard</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setConfirmResetModal(true)}
              className="px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Reset preferences to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Defaults</span>
            </button>
            <button
              type="button"
              onClick={() => handleSave()}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>

        {/* Search Filter Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // If user types a search query, auto-switch to first matching tab
                const firstMatch = navItems.find(item => 
                  item.label.toLowerCase().includes(e.target.value.toLowerCase()) ||
                  item.keywords.some(k => k.includes(e.target.value.toLowerCase()))
                );
                if (firstMatch) {
                  setActiveSubTab(firstMatch.id);
                }
              }}
              placeholder="Search settings (e.g., SMS, GPS, waiver, password)..."
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="text-xs text-slate-500 self-start sm:self-auto">
            Showing <strong className="text-slate-800">{filteredNavItems.length}</strong> of {navItems.length} settings sections
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 mt-4">
          {filteredNavItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`settings-tab-${tab.id}`}
                type="button"
                onClick={() => setActiveSubTab(tab.id)}
                className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span className="text-xs font-semibold leading-tight line-clamp-1">{tab.label}</span>
                </div>
                <div className="text-[10px] text-slate-400 leading-tight line-clamp-1">
                  {tab.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Settings Subsections */}
      <div>
        {activeSubTab === 'general' && (
          <GeneralSettings
            settings={formData}
            onChange={handlePartialUpdate}
          />
        )}

        {activeSubTab === 'notifications' && (
          <NotificationSettings
            settings={formData}
            onChange={handlePartialUpdate}
          />
        )}

        {activeSubTab === 'scheduling' && (
          <CommitmentTravelSettings
            settings={formData}
            profile={profile}
            onChange={handlePartialUpdate}
          />
        )}

        {activeSubTab === 'privacy' && (
          <PrivacySharingSettings
            settings={formData}
            profile={profile}
            onChange={handlePartialUpdate}
          />
        )}

        {activeSubTab === 'checkin' && (
          <TerminalCheckinSettings
            settings={formData}
            onChange={handlePartialUpdate}
          />
        )}

        {activeSubTab === 'security' && (
          <SecurityComplianceSettings
            settings={formData}
            onChange={handlePartialUpdate}
            onOpenPasswordModal={() => setShowPasswordModal(true)}
          />
        )}

        {activeSubTab === 'data' && (
          <DataBackupSettings
            settings={formData}
            profile={profile}
            onRestoreSettings={(restored) => {
              setFormData(restored);
              onUpdateSettings(restored);
              setSaveToast(true);
              setTimeout(() => setSaveToast(false), 3000);
            }}
            onRequestResetDefaults={() => setConfirmResetModal(true)}
          />
        )}
      </div>

      {/* Floating / Sticky Save Bar */}
      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>
            {isDirty ? (
              <strong className="text-amber-700">You have unsaved changes in this session</strong>
            ) : (
              'All configuration values synchronized'
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isDirty && (
            <button
              type="button"
              onClick={handleDiscardChanges}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              Discard Changes
            </button>
          )}
          <button
            type="button"
            onClick={() => handleSave()}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>
      </div>

      {/* Modal: Change Password */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Change Password</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {passwordToast && (
              <div className={`p-3 rounded-xl text-xs font-semibold ${
                passwordToast.includes('successfully') ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
              }`}>
                {passwordToast}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  New Password (min. 8 characters)
                </label>
                <input
                  type="password"
                  value={passwordForm.next}
                  onChange={(e) => setPasswordForm({ ...passwordForm, next: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Confirm Reset */}
      {confirmResetModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2.5 text-amber-700">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900">Reset to Defaults?</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              This will restore all notification channels, travel boundaries, quiet hours, and check-in sensor preferences to their standard factory default values.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmResetModal(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetSettings();
                  setFormData({ ...settings });
                  setConfirmResetModal(false);
                  setSaveToast(true);
                  setTimeout(() => setSaveToast(false), 3000);
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold"
              >
                Yes, Reset Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
