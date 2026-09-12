'use client';
// @ts-nocheck

import React from 'react';
import { Sliders, MapPin, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { AppSettings, VolunteerProfile } from '../../types';

interface CommitmentTravelSettingsProps {
  settings: AppSettings;
  profile: VolunteerProfile;
  onChange: (updated: Partial<AppSettings>) => void;
}

export const CommitmentTravelSettings: React.FC<CommitmentTravelSettingsProps> = ({
  settings,
  profile,
  onChange
}) => {
  const currentWeeklyAvg = 12.5;
  const capacityPercent = Math.min(100, Math.round((currentWeeklyAvg / settings.maxWeeklyHours) * 100));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Maximum Travel Radius */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <MapPin className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Shift Travel Radius</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600 font-medium">Service Radius Limit</span>
            <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {settings.travelRadiusMiles} Miles
            </span>
          </div>

          <input
            type="range"
            min="3"
            max="50"
            step="1"
            value={settings.travelRadiusMiles}
            onChange={(e) => onChange({ travelRadiusMiles: parseInt(e.target.value, 10) })}
            className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
          />

          <div className="flex justify-between text-[11px] text-slate-400 font-medium">
            <span>Neighborhood (3 mi)</span>
            <span>Metro (20 mi)</span>
            <span>Regional (50 mi)</span>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Matching Recommendation Engine</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Events and emergency call-outs beyond <strong>{settings.travelRadiusMiles} miles</strong> from your zip code will be flagged with a commute warning.
            </p>
          </div>
        </div>
      </div>

      {/* Weekly Hours Ceiling & Burnout Safeguard */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Clock className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Weekly Service Ceiling</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600 font-medium">Max Weekly Target</span>
            <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {settings.maxWeeklyHours} Hours / Week
            </span>
          </div>

          <input
            type="range"
            min="5"
            max="40"
            step="5"
            value={settings.maxWeeklyHours}
            onChange={(e) => onChange({ maxWeeklyHours: parseInt(e.target.value, 10) })}
            className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
          />

          <div className="flex justify-between text-[11px] text-slate-400 font-medium">
            <span>Casual (5h)</span>
            <span>Standard (20h)</span>
            <span>Full-Time Cap (40h)</span>
          </div>

          {/* Real-time Workload Gauge */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Current Week Utilization:</span>
              <span className="font-bold text-slate-900">{currentWeeklyAvg}h of {settings.maxWeeklyHours}h ({capacityPercent}%)</span>
            </div>

            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  capacityPercent > 85 ? 'bg-amber-500' : 'bg-emerald-600'
                }`}
                style={{ width: `${capacityPercent}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-500">
              Helps volunteer coordinators prevent double-booking and safeguards against volunteer exhaustion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
