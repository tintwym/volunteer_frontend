'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { Bell, Smartphone, Mail, Volume2, VolumeX, AlertTriangle, Moon, Check, Sparkles } from 'lucide-react';
import { AppSettings } from '../../types';

interface NotificationSettingsProps {
  settings: AppSettings;
  onChange: (updated: Partial<AppSettings>) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ settings, onChange }) => {
  const [playedAudio, setPlayedAudio] = useState(false);

  const playTestChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.36);

      setPlayedAudio(true);
      setTimeout(() => setPlayedAudio(false), 2000);
    } catch (err) {
      console.warn('AudioContext not allowed or not supported', err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Email & SMS Channels */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Bell className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Automated Dispatch Channels</h2>
        </div>

        <div className="space-y-3">
          {/* Email Shift Confirmations */}
          <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/70 transition-colors">
            <input
              type="checkbox"
              checked={settings.emailShiftConfirmation}
              onChange={(e) => onChange({ emailShiftConfirmation: e.target.checked })}
              className="accent-emerald-600 mt-0.5"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  Shift Assignment Confirmations
                </span>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                  Email
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Immediate email voucher with venue address, supervisor contacts, and checklist when rostered.
              </p>
            </div>
          </label>

          {/* 24h Shift Reminder */}
          <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/70 transition-colors">
            <input
              type="checkbox"
              checked={settings.emailReminders24h}
              onChange={(e) => onChange({ emailReminders24h: e.target.checked })}
              className="accent-emerald-600 mt-0.5"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  24-Hour Advance Reminder
                </span>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                  Email
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Weather forecast, on-site gear recommendations, and parking access sent 24h before shift start.
              </p>
            </div>
          </label>

          {/* SMS Shift Alerts */}
          <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/70 transition-colors">
            <input
              type="checkbox"
              checked={settings.smsShiftAlerts}
              onChange={(e) => onChange({ smsShiftAlerts: e.target.checked })}
              className="accent-emerald-600 mt-0.5"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                  SMS Check-In Codes & Reminders
                </span>
                <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                  SMS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Short text with terminal verification PIN 2 hours prior to volunteer shift arrival.
              </p>
            </div>
          </label>

          {/* SMS Urgent Broadcasts */}
          <label className="flex items-start gap-3 p-3 bg-red-50/50 border border-red-200 rounded-xl cursor-pointer hover:bg-red-50 transition-colors">
            <input
              type="checkbox"
              checked={settings.smsEmergencyBroadcasts}
              onChange={(e) => onChange({ smsEmergencyBroadcasts: e.target.checked })}
              className="accent-red-600 mt-0.5"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-950 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  Urgent Severe Weather & Cancellation Alerts
                </span>
                <span className="text-[10px] uppercase font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                  Critical
                </span>
              </div>
              <p className="text-[11px] text-red-800/80 mt-0.5">
                Immediate SMS overrides in cases of venue closure, severe thunderstorms, or emergency coordinator dispatches.
              </p>
            </div>
          </label>

          {/* Monthly Digest */}
          <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/70 transition-colors">
            <input
              type="checkbox"
              checked={settings.emailMonthlyDigest}
              onChange={(e) => onChange({ emailMonthlyDigest: e.target.checked })}
              className="accent-emerald-600 mt-0.5"
            />
            <div className="flex-1">
              <span className="text-xs font-bold text-slate-900 block">
                Monthly Service Digest & Impact Infographic
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                First Monday of each month: cumulative hours certified, milestone progress, and tax deductible hours statement.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Quiet Hours & Sound Feedback */}
      <div className="space-y-6">
        {/* Quiet Hours Scheduler */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-emerald-700" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Quiet Hours Filter</h2>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.quietHoursEnabled}
                onChange={(e) => onChange({ quietHoursEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          <p className="text-xs text-slate-500">
            Non-critical notifications and shift inquiries will be paused during this rest window to respect your sleep.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Quiet Window Starts
              </label>
              <input
                type="time"
                disabled={!settings.quietHoursEnabled}
                value={settings.quietHoursStart}
                onChange={(e) => onChange({ quietHoursStart: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Quiet Window Ends
              </label>
              <input
                type="time"
                disabled={!settings.quietHoursEnabled}
                value={settings.quietHoursEnd}
                onChange={(e) => onChange({ quietHoursEnd: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* In-App Audible Feedback */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-700" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Auditory Confirmation</h2>
            </div>
            <button
              type="button"
              onClick={playTestChime}
              className="px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>{playedAudio ? 'Played Chime' : 'Test Alert Sound'}</span>
            </button>
          </div>

          <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/70 transition-colors">
            <input
              type="checkbox"
              checked={settings.inAppSounds}
              onChange={(e) => onChange({ inAppSounds: e.target.checked })}
              className="accent-emerald-600 mt-0.5"
            />
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Play Audio Tone on Check-in & New Messages
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Provides audible confirmation when barcode scanner validates badge or when a squad coordinator broadcasts a dispatch.
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
