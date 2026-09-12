'use client';
// @ts-nocheck

import React from 'react';
import { Eye, Lock, Shield, Users, Trophy } from 'lucide-react';
import { AppSettings, VolunteerProfile } from '../../types';

interface PrivacySharingSettingsProps {
  settings: AppSettings;
  profile: VolunteerProfile;
  onChange: (updated: Partial<AppSettings>) => void;
}

export const PrivacySharingSettings: React.FC<PrivacySharingSettingsProps> = ({
  settings,
  profile,
  onChange
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Volunteer Squad Visibility */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Eye className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Volunteer Squad Visibility</h2>
        </div>

        <div className="space-y-3">
          <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/70 transition-colors">
            <input
              type="checkbox"
              checked={settings.shareContactWithTeam}
              onChange={(e) => onChange({ shareContactWithTeam: e.target.checked })}
              className="accent-emerald-600 mt-0.5"
            />
            <div>
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                Share Contact Info with Assigned Squad Members
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                When unchecked, peer volunteers only see your name and role. Phone and email show as &quot;Protected by volunteer&quot;.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/70 transition-colors">
            <input
              type="checkbox"
              checked={settings.allowDirectMessagingFromVolunteers}
              onChange={(e) => onChange({ allowDirectMessagingFromVolunteers: e.target.checked })}
              className="accent-emerald-600 mt-0.5"
            />
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Allow Direct Messages from Squad Volunteers
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Permits volunteers on your active shift to initiate direct chats in the in-app coordination hub.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/70 transition-colors">
            <input
              type="checkbox"
              checked={settings.showOnCommunityLeaderboard}
              onChange={(e) => onChange({ showOnCommunityLeaderboard: e.target.checked })}
              className="accent-emerald-600 mt-0.5"
            />
            <div>
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                Show Verified Milestones on Community Leaderboard
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Displays Century Club, Gold Heart, and community service tier badges on the regional public leaderboard.
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Emergency Information Access */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Lock className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Emergency Contact Permissions</h2>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-800 block">
                Recorded Emergency Contact
              </span>
              <strong className="text-xs text-slate-900">{profile.emergencyContact}</strong>
            </div>
            <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded">
              Verified
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Authorized Emergency Viewers
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="radio"
                  name="emergencyVisibility"
                  value="all_supervisors"
                  checked={settings.emergencyContactVisibility === 'all_supervisors'}
                  onChange={() => onChange({ emergencyContactVisibility: 'all_supervisors' })}
                  className="accent-emerald-600"
                />
                <div>
                  <span className="font-bold block">All Verified On-Duty Shift Supervisors</span>
                  <span className="text-[11px] text-slate-500 block">Recommended for workplace health and rapid incident response.</span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <input
                  type="radio"
                  name="emergencyVisibility"
                  value="team_leader_only"
                  checked={settings.emergencyContactVisibility === 'team_leader_only'}
                  onChange={() => onChange({ emergencyContactVisibility: 'team_leader_only' })}
                  className="accent-emerald-600"
                />
                <div>
                  <span className="font-bold block">Direct Team Lead Only</span>
                  <span className="text-[11px] text-slate-500 block">Restricts emergency information strictly to your primary event lead.</span>
                </div>
              </label>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2 text-[11px] text-slate-500">
            <Shield className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>Emergency medical information and contacts are encrypted and accessible strictly during active rostered hours.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
