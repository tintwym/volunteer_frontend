'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  MapPin, 
  MessageSquare, 
  Mail, 
  Phone, 
  Shield, 
  Bell, 
  AlertCircle,
  EyeOff,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { TeamInfo } from '../types';

interface TeamViewProps {
  teams: TeamInfo[];
  onMessageLeader: (leaderName: string) => void;
  onViewSchedule: () => void;
}

export const TeamView: React.FC<TeamViewProps> = ({
  teams,
  onMessageLeader,
  onViewSchedule
}) => {
  const [selectedTeamId, setSelectedTeamId] = useState<string>(teams[0]?.id || '');
  const currentTeam = teams.find(t => t.id === selectedTeamId) || teams[0];

  if (!currentTeam) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
        <Users className="w-10 h-10 text-slate-400 mx-auto mb-3" />
        <p className="font-semibold text-slate-800">No Assigned Teams Found</p>
        <p className="text-xs text-slate-500 mt-1">Register for an upcoming event to be assigned to a volunteer squad.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs tracking-wider uppercase mb-1">
              <Users className="w-4 h-4" />
              <span>Section 3.7 • Assigned Volunteer Squad</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Volunteer Team</h1>
            <p className="text-sm text-slate-600 mt-1">
              Connect with your Team Leader, review team responsibilities, check meeting points, and view announcements.
            </p>
          </div>

          {/* Team Switcher if multiple */}
          {teams.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Team:</span>
              <select
                value={selectedTeamId}
                onChange={(e) => setSelectedTeamId(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>{t.teamName} ({t.eventTitle.split(' ')[0]})</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Team Leader & Key Operational Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Leader Spotlight */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" /> Team Leader
            </span>
            <span className="text-[11px] text-slate-400">On Duty</span>
          </div>

          <div className="flex items-center gap-4 pt-1">
            <img
              src={currentTeam.leader.avatar}
              alt={currentTeam.leader.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/30 shadow-xs"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">{currentTeam.leader.name}</h3>
              <p className="text-xs text-slate-600 font-medium">{currentTeam.leader.role}</p>
              <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">
                {currentTeam.eventTitle}
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{currentTeam.leader.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{currentTeam.leader.email}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => onMessageLeader(currentTeam.leader.name)}
              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct Message Leader</span>
            </button>
            <button
              onClick={onViewSchedule}
              className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>View Team Shift Schedule</span>
            </button>
          </div>
        </div>

        {/* Meeting Point & Core Responsibilities */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          {/* Meeting point */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-xl flex items-start gap-3">
            <div className="p-2 bg-emerald-600 text-white rounded-lg shrink-0 mt-0.5 shadow-xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                Designated Team Meeting Point
              </span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">
                {currentTeam.meetingPoint}
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                Check in here 15 minutes prior to shift commencement to receive radio sets and credentials.
              </p>
            </div>
          </div>

          {/* Responsibilities list */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Team Operational Responsibilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentTeam.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Announcements */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-4 h-4 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">Team Leader Announcements</h3>
        </div>

        <div className="space-y-3">
          {currentTeam.announcements.map((ann) => (
            <div 
              key={ann.id}
              className={`p-4 rounded-xl border transition-all ${
                ann.priority === 'urgent'
                  ? 'bg-red-50/70 border-red-200 text-red-900'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs">{ann.author}</span>
                  <span className="text-[11px] text-slate-500 font-medium">({ann.role})</span>
                  {ann.priority === 'urgent' && (
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded-full">
                      Urgent Announcement
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400">{ann.date}</span>
              </div>
              <p className="text-xs leading-relaxed">{ann.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Members List (With Privacy Controls) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Team Members</h3>
            <p className="text-xs text-slate-500">
              Personal contact info is protected and only displayed if members enabled privacy sharing.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
            {currentTeam.members.length} Volunteers Assigned
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentTeam.members.map((member) => (
            <div 
              key={member.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-200"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold text-slate-900 block truncate">
                    {member.name}
                  </span>
                  <span className="text-[11px] text-slate-500 block truncate">
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Privacy protection notice / details */}
              <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-200/60 space-y-1">
                {member.allowContactShare ? (
                  <>
                    <div className="flex items-center gap-1.5 text-slate-700 truncate">
                      <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700 truncate">
                      <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-1.5 text-slate-400 italic">
                    <EyeOff className="w-3 h-3 shrink-0" />
                    <span>Contact hidden by privacy rule</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
