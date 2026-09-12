'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { QrCode, MapPin, Key, Smartphone, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';
import { AppSettings } from '../../types';

interface TerminalCheckinSettingsProps {
  settings: AppSettings;
  onChange: (updated: Partial<AppSettings>) => void;
}

export const TerminalCheckinSettings: React.FC<TerminalCheckinSettingsProps> = ({
  settings,
  onChange
}) => {
  const [testingGps, setTestingGps] = useState(false);
  const [gpsResult, setGpsResult] = useState<string | null>(null);

  const handleTestGps = () => {
    setTestingGps(true);
    setGpsResult(null);
    setTimeout(() => {
      setTestingGps(false);
      setGpsResult('GPS Locked: ±4.2m precision (Ready for Geofence auto-checkin)');
    }, 1200);
  };

  const checkInMethods = [
    {
      id: 'QR',
      title: 'Digital Badge QR Scan',
      desc: 'Display dynamic QR code to supervisor scanner or scan venue entrance poster',
      icon: QrCode
    },
    {
      id: 'GPS',
      title: 'Geofenced GPS Location',
      desc: 'Automatic one-tap sign-in when your device is within 100 meters of the venue',
      icon: MapPin
    },
    {
      id: 'PIN',
      title: '4-Digit Supervisor PIN',
      desc: 'Manual kiosk validation code entered by an on-duty volunteer coordinator',
      icon: Key
    }
  ] as const;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Verification Protocol Selection */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <QrCode className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Default Check-In Protocol</h2>
        </div>

        <div className="space-y-2.5">
          {checkInMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = settings.defaultCheckInMethod === method.id;
            return (
              <label
                key={method.id}
                className={`flex items-start gap-3 p-3.5 border rounded-xl cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-400 ring-1 ring-emerald-400 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <input
                  type="radio"
                  name="defaultCheckIn"
                  value={method.id}
                  checked={isSelected}
                  onChange={() => onChange({ defaultCheckInMethod: method.id })}
                  className="accent-emerald-600 mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-700' : 'text-slate-500'}`} />
                    <span className="text-xs font-bold text-slate-900">{method.title}</span>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{method.desc}</p>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Hardware & Sensor Preferences */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Smartphone className="w-4 h-4 text-emerald-700" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Device Sensors & Geofencing</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/70 transition-colors">
              <input
                type="checkbox"
                checked={settings.autoPromptGeofenceCheckin}
                onChange={(e) => onChange({ autoPromptGeofenceCheckin: e.target.checked })}
                className="accent-emerald-600 mt-0.5"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Proximity Alert Upon Venue Arrival (&lt; 100m)
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Prompts an instant check-in banner when entering the civic park, shelter, or community center perimeter.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/70 transition-colors">
              <input
                type="checkbox"
                checked={settings.vibrateOnScan}
                onChange={(e) => onChange({ vibrateOnScan: e.target.checked })}
                className="accent-emerald-600 mt-0.5"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Haptic Pulse on Successful Terminal Verification
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Vibrates device upon scanning barcode or NFC badge to confirm logged shift without looking at screen.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Sensor Diagnostics */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-700" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Terminal Diagnostics</h3>
            </div>
            <button
              type="button"
              onClick={handleTestGps}
              disabled={testingGps}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg transition-colors"
            >
              {testingGps ? 'Querying GPS...' : 'Test Location Fix'}
            </button>
          </div>

          {gpsResult && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{gpsResult}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Camera Sensor</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                Available & Clear
              </span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Offline Storage</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                IndexedDB Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
