'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  Clock,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  X,
  Plus,
  ArrowUpRight,
  UserCheck
} from 'lucide-react';
import { Volunteer, TodayAttendanceRecord } from '../types';

interface MyTeamViewProps {
  volunteers: Volunteer[];
  attendance: TodayAttendanceRecord[];
  onAssignToTask: (volunteer: Volunteer) => void;
}

export const MyTeamView: React.FC<MyTeamViewProps> = ({
  volunteers,
  attendance,
  onAssignToTask
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'All' | 'Team Lead' | 'Specialist' | 'Volunteer' | 'New Recruit'>('All');
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);

  const filteredVolunteers = volunteers.filter(v => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole = filterRole === 'All' || v.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">My Team Roster</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Assigned Team: Team Alpha ({volunteers.length} Volunteers)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Supervise assigned volunteers, review verified operational skill sets, access emergency contacts, and delegate shift roles.
          </p>
        </div>
      </div>

      {/* Scope Restriction Notice (Section 2 Permissions) */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Volunteer Leader Permissions:</strong> You hold administrative control over your assigned 20 team members. Organiser-level event permissions are required to modify unrelated teams.
          </span>
        </div>
        <span className="text-[11px] font-bold text-slate-400 shrink-0">Zone: Lobby & Registration</span>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search volunteers by name or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white"
          />
        </div>

        <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold overflow-x-auto">
          {(['All', 'Team Lead', 'Specialist', 'Volunteer', 'New Recruit'] as const).map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filterRole === role ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Volunteers Grid (20 Members) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVolunteers.map((vol) => {
          const todayStatus = attendance.find(a => a.volunteerId === vol.id);

          return (
            <div
              key={vol.id}
              className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={vol.avatar}
                      alt={vol.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                    />
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">{vol.name}</h2>
                      <span className="text-xs text-slate-400 font-medium block">{vol.role}</span>
                      <span
                        className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-bold mt-1 ${
                          todayStatus?.status === 'Present'
                            ? 'bg-emerald-100 text-emerald-800'
                            : todayStatus?.status === 'Late'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        Today: {todayStatus?.status || 'Assigned'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Quick Info */}
                <div className="mt-3 space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{vol.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{vol.phone}</span>
                  </div>
                </div>

                {/* Operational Skills */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Skills & Qualifications:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {vol.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => setSelectedVolunteer(vol)}
                  className="font-bold text-slate-700 hover:text-slate-900 underline cursor-pointer"
                >
                  View Profile & Ice &rarr;
                </button>

                <button
                  onClick={() => onAssignToTask(vol)}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Delegate Task
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Volunteer Profile & Emergency Contact Drawer / Modal */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedVolunteer.avatar}
                  alt={selectedVolunteer.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedVolunteer.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{selectedVolunteer.role} &bull; Member since {selectedVolunteer.joinedDate}</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 inline-block mt-1">
                    Background Check: {selectedVolunteer.backgroundCheckStatus}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedVolunteer(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Emergency Contact (ICE) Card */}
            <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5" />
                Emergency Contact (In Case of Incident)
              </span>
              <p className="font-bold text-slate-900 text-sm">{selectedVolunteer.emergencyContact.name}</p>
              <p className="text-slate-700">Relationship: <strong>{selectedVolunteer.emergencyContact.relationship}</strong></p>
              <p className="text-rose-900 font-bold flex items-center gap-1 mt-1">
                <Phone className="w-3.5 h-3.5" />
                {selectedVolunteer.emergencyContact.phone}
              </p>
            </div>

            {/* Attendance & Service Stats */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xl font-bold text-slate-900 block">{selectedVolunteer.verifiedHours}h</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Verified Hours</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xl font-bold text-emerald-700 block">{selectedVolunteer.attendanceRate}%</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Attendance Rate</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xl font-bold text-blue-700 block">{selectedVolunteer.shiftsCompleted}</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Shifts Completed</span>
              </div>
            </div>

            {/* Leader Notes */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
              <strong className="text-slate-800 block mb-1">Leader Supervision Notes:</strong>
              {selectedVolunteer.notes}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
