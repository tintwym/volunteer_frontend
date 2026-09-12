'use client';
// @ts-nocheck

import React from 'react';
import { Globe, Calendar, Car, Bus, Bike, Footprints, Check, CalendarSync } from 'lucide-react';
import { AppSettings } from '../../types';

interface GeneralSettingsProps {
  settings: AppSettings;
  onChange: (updated: Partial<AppSettings>) => void;
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({ settings, onChange }) => {
  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Volunteer Management System//Shift Sync//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:My Volunteer Shifts',
      'X-WR-TIMEZONE:' + (settings.timezone.split(' ')[0] || 'UTC'),
      'BEGIN:VEVENT',
      'SUMMARY:Community Garden Revitalization Shift',
      'DESCRIPTION:Assigned Shift via Volunteer Portal. Coordinator: Sarah Jenkins',
      'LOCATION:Civic Park Garden, Seattle, WA',
      'DTSTART:20260914T090000Z',
      'DTEND:20260914T130000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'volunteer_shifts_schedule.ics');
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const transitModes = [
    { id: 'driving', label: 'Driving / Carpool', icon: Car, desc: 'Highway & arterial routes' },
    { id: 'transit', label: 'Public Transit', icon: Bus, desc: 'Metro bus & light rail' },
    { id: 'bicycle', label: 'Bicycle / E-Bike', icon: Bike, desc: 'Protected bike paths' },
    { id: 'walking', label: 'Walking', icon: Footprints, desc: 'Neighborhood radius' },
  ] as const;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Regional & Localization */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Globe className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Regional & Display Localization</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              System Timezone
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => onChange({ timezone: e.target.value })}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="America/Los_Angeles (Pacific Time, UTC-7)">America/Los_Angeles (Pacific Time, UTC-7)</option>
              <option value="America/Denver (Mountain Time, UTC-6)">America/Denver (Mountain Time, UTC-6)</option>
              <option value="America/Chicago (Central Time, UTC-5)">America/Chicago (Central Time, UTC-5)</option>
              <option value="America/New_York (Eastern Time, UTC-4)">America/New_York (Eastern Time, UTC-4)</option>
              <option value="Pacific/Honolulu (Hawaii Time, UTC-10)">Pacific/Honolulu (Hawaii Time, UTC-10)</option>
              <option value="UTC (Coordinated Universal Time)">UTC (Coordinated Universal Time)</option>
            </select>
            <p className="text-[11px] text-slate-400 mt-1">
              Shift commencement times, roster reminders, and calendar exports use this timezone.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Date Formatting
              </label>
              <select
                value={settings.dateFormat}
                onChange={(e) => onChange({ dateFormat: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="MMM DD, YYYY">Sep 12, 2026</option>
                <option value="DD/MM/YYYY">12/09/2026</option>
                <option value="YYYY-MM-DD">2026-09-12</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Time Standard
              </label>
              <select
                value={settings.timeFormat}
                onChange={(e) => onChange({ timeFormat: e.target.value as '12h' | '24h' })}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="12h">12-Hour (8:00 AM – 12:00 PM)</option>
                <option value="24h">24-Hour (08:00 – 12:00)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Portal Language
            </label>
            <select
              value={settings.preferredLanguage}
              onChange={(e) => onChange({ preferredLanguage: e.target.value })}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="English (US)">English (US)</option>
              <option value="Español">Español (Spanish)</option>
              <option value="Français">Français (French)</option>
              <option value="Mandarin (Simplified)">中文 (Mandarin)</option>
              <option value="Tiếng Việt">Tiếng Việt (Vietnamese)</option>
              <option value="Tagalog">Tagalog (Filipino)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Calendar Integration & Travel Mode */}
      <div className="space-y-6">
        {/* Calendar Sync */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Calendar className="w-4 h-4 text-emerald-700" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Calendar Synchronization</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/70 transition-colors">
              <input
                type="checkbox"
                checked={settings.calendarSyncEnabled ?? true}
                onChange={(e) => onChange({ calendarSyncEnabled: e.target.checked })}
                className="accent-emerald-600 mt-0.5"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Automatic Calendar Feed (.ICS) Subscription
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Synchronizes accepted volunteer shifts directly with Google Calendar, Apple iCal, and Outlook.
                </span>
              </div>
            </label>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Universal iCal Export</span>
                <span className="text-[11px] text-slate-500">Download current scheduled shifts</span>
              </div>
              <button
                type="button"
                onClick={handleDownloadIcs}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <CalendarSync className="w-3.5 h-3.5 text-emerald-600" />
                <span>Export .ICS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Primary Transportation Mode */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Car className="w-4 h-4 text-emerald-700" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Primary Transportation Mode</h2>
          </div>

          <p className="text-xs text-slate-500">
            Used to estimate commute durations and advise on venue parking availability.
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            {transitModes.map((mode) => {
              const Icon = mode.icon;
              const isSelected = (settings.transportationMode || 'driving') === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => onChange({ transportationMode: mode.id as any })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-1 ring-emerald-400 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-700' : 'text-slate-500'}`} />
                    <span className="text-xs font-bold">{mode.label}</span>
                  </div>
                  <div className="text-[10px] text-slate-400">{mode.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
