'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Clock,
  QrCode,
  MapPin,
  Camera,
  Users,
  Timer,
  CheckCircle2,
  Eye,
  X,
} from 'lucide-react';
import { OrganiserSystemSettings } from '../../types';

interface ShiftOperationsModuleProps {
  settings: OrganiserSystemSettings;
  onChange: <K extends keyof OrganiserSystemSettings>(
    key: K,
    value: OrganiserSystemSettings[K]
  ) => void;
}

export const ShiftOperationsModule: React.FC<ShiftOperationsModuleProps> = ({
  settings,
  onChange,
}) => {
  const [showKioskPreview, setShowKioskPreview] = useState(false);

  return (
    <div id="module-shift-operations" className="space-y-6">
      {/* Scheduling Parameters Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/50">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Shift Scheduling & Capacity Parameters
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Default shift sizing quotas, volunteer burnout protection limits, and check-in windows.
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center px-2.5 py-1 text-[11px] font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
            Operations Module
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Default Shift Capacity (Volunteers)
            </label>
            <div className="relative">
              <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                min="5"
                max="500"
                id="settings-default-capacity"
                value={settings.defaultEventCapacity}
                onChange={(e) => onChange('defaultEventCapacity', parseInt(e.target.value) || 100)}
                className="w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Pre-filled capacity when creating a new shift.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Max Weekly Hours per Volunteer
            </label>
            <div className="relative">
              <Timer className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                min="10"
                max="80"
                id="settings-max-weekly-hours"
                value={settings.maxWeeklyVolunteerHours}
                onChange={(e) => onChange('maxWeeklyVolunteerHours', parseInt(e.target.value) || 40)}
                className="w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Alerts organizers if a volunteer exceeds this cap.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Check-In Grace Window (Minutes)
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                min="5"
                max="60"
                id="settings-grace-minutes"
                value={settings.checkInGraceMinutes ?? 15}
                onChange={(e) => onChange('checkInGraceMinutes', parseInt(e.target.value) || 15)}
                className="w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Window prior to shift start when check-in is allowed.</p>
          </div>
        </div>
      </div>

      {/* Attendance Technology Verification Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/50">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Attendance Verification Technologies
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Enable field check-in mechanisms for onsite tablets, smartphones, and remote tasks.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowKioskPreview(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Kiosk Preview</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* QR Code Kiosk Mode */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
                  <QrCode className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">QR Code Table Kiosk</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Volunteers flash their personalized digital volunteer pass at the tablet kiosk for instant check-in.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer self-end">
              <input
                type="checkbox"
                id="toggle-qr-kiosk"
                checked={settings.enableQrKioskCheckin ?? true}
                onChange={(e) => onChange('enableQrKioskCheckin', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Geolocation */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                  <MapPin className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">GPS Geolocation Match</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Requires volunteer's mobile device to be within 250 meters of the scheduled event coordinates.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer self-end">
              <input
                type="checkbox"
                id="toggle-geo"
                checked={settings.enableGeolocationVerification ?? false}
                onChange={(e) => onChange('enableGeolocationVerification', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Photo Verification */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
                  <Camera className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">Photo Proof of Service</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Mandatory before completing remote tasks (e.g., trail cleanup photos, meal delivery drop-off proof).
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer self-end">
              <input
                type="checkbox"
                id="toggle-photo"
                checked={settings.requirePhotoVerification ?? false}
                onChange={(e) => onChange('requirePhotoVerification', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Kiosk Mode Simulation Modal */}
      {showKioskPreview && (
        <div
          id="kiosk-preview-modal"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900">Interactive Tablet Kiosk Preview</span>
              <button
                type="button"
                onClick={() => setShowKioskPreview(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
              <p className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
                {settings.organizationName}
              </p>
              <div className="w-32 h-32 bg-white rounded-xl p-2 mx-auto flex items-center justify-center shadow-inner">
                <QrCode className="w-24 h-24 text-slate-900" />
              </div>
              <p className="text-xs text-slate-300">
                Point front camera at volunteer pass QR or badge code
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowKioskPreview(false)}
              className="w-full py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Close Kiosk Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
