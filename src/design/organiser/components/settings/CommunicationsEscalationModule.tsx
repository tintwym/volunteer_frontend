'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Bell,
  Mail,
  Smartphone,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Send,
  Zap,
} from 'lucide-react';
import { OrganiserSystemSettings } from '../../types';

interface CommunicationsEscalationModuleProps {
  settings: OrganiserSystemSettings;
  onChange: <K extends keyof OrganiserSystemSettings>(
    key: K,
    value: OrganiserSystemSettings[K]
  ) => void;
}

export const CommunicationsEscalationModule: React.FC<CommunicationsEscalationModuleProps> = ({
  settings,
  onChange,
}) => {
  const [testSent, setTestSent] = useState(false);

  const handleTestPing = () => {
    setTestSent(true);
    setTimeout(() => {
      setTestSent(false);
    }, 4500);
  };

  return (
    <div id="module-communications-escalation" className="space-y-6">
      {/* Automations Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200/50">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Automated Notifications & Shift Alerts
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage automatic trigger deliveries for upcoming shifts and weekly digests.
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center px-2.5 py-1 text-[11px] font-semibold rounded-full bg-teal-50 text-teal-700 border border-teal-200">
            Automations Module
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 24h Reminder */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                  <Mail className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">24h Shift Reminder</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dispatches an automated email 24 hours prior with meeting location, attire, and arrival instructions.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer self-end">
              <input
                type="checkbox"
                id="toggle-auto-reminders"
                checked={settings.autoSend24hReminders}
                onChange={(e) => onChange('autoSend24hReminders', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Urgent SMS Alerts */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
                  <Smartphone className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">Urgent SMS Alerts</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Delivers critical event cancellations, sudden weather shifts, or site changes via SMS.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer self-end">
              <input
                type="checkbox"
                id="toggle-sms-urgent"
                checked={settings.enableSmsUrgentAlerts ?? true}
                onChange={(e) => onChange('enableSmsUrgentAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Weekly Digest */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
                  <Calendar className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">Weekly Digest</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Aggregates upcoming open shifts, logged hours, and badge milestones every Monday morning.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer self-end">
              <input
                type="checkbox"
                id="toggle-weekly-digest"
                checked={settings.enableWeeklyDigest ?? true}
                onChange={(e) => onChange('enableWeeklyDigest', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Critical Incident Escalation Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200/50">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Critical Safety & Incident Escalation Protocol
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Designated inbox and automatic routing for High and Critical safety events.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Incident Escalation Direct Mailbox
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                id="settings-incident-email"
                value={settings.incidentEscalationEmail}
                onChange={(e) => onChange('incidentEscalationEmail', e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="safety-director@hopeharbor.org"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Any incident logged with "High" or "Critical" priority triggers immediate notice here.
            </p>
          </div>

          <div>
            <button
              type="button"
              id="trigger-test-escalation-btn"
              onClick={handleTestPing}
              className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Simulate Incident Dispatch</span>
            </button>
            {testSent && (
              <p className="text-[11px] text-emerald-600 font-medium mt-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Test simulated alert delivered to {settings.incidentEscalationEmail}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
