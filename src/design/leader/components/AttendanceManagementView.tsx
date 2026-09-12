'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  UserCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  UserX,
  LogOut,
  Send,
  Search,
  Filter,
  Check,
  ShieldCheck,
  FileCheck,
  ArrowRight
} from 'lucide-react';
import { TodayAttendanceRecord, AttendanceMark } from '../types';

interface AttendanceManagementViewProps {
  attendanceRecords: TodayAttendanceRecord[];
  onMarkAttendance: (volunteerId: string, status: AttendanceMark, time?: string) => void;
  onUpdateRemarks: (volunteerId: string, remarks: string) => void;
  onSubmitSummaryToOrganiser: () => void;
}

export const AttendanceManagementView: React.FC<AttendanceManagementViewProps> = ({
  attendanceRecords,
  onMarkAttendance,
  onUpdateRemarks,
  onSubmitSummaryToOrganiser
}) => {
  const [filterStatus, setFilterStatus] = useState<'All' | 'Present' | 'Absent' | 'Late'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingRemarksId, setEditingRemarksId] = useState<string | null>(null);
  const [remarksText, setRemarksText] = useState('');

  const total = attendanceRecords.length;
  const present = attendanceRecords.filter(a => a.status === 'Present').length;
  const absent = attendanceRecords.filter(a => a.status === 'Absent').length;
  const late = attendanceRecords.filter(a => a.status === 'Late').length;
  const earlyDeparture = attendanceRecords.filter(a => a.status === 'Early Departure').length;

  const isAllSubmitted = attendanceRecords.every(a => a.isSubmittedToOrganiser);

  const filteredRecords = attendanceRecords.filter(r => {
    const matchesFilter = filterStatus === 'All' || r.status === filterStatus;
    const matchesSearch = r.volunteerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStartRemarks = (record: TodayAttendanceRecord) => {
    setEditingRemarksId(record.volunteerId);
    setRemarksText(record.remarks || '');
  };

  const handleSaveRemarks = (volunteerId: string) => {
    onUpdateRemarks(volunteerId, remarksText);
    setEditingRemarksId(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Team Attendance Management</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Shift Roll Call
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time roll call verification for Team Alpha. Check in volunteers, mark absences, and sync signed attendance summaries to the Organiser dashboard.
          </p>
        </div>

        <button
          onClick={onSubmitSummaryToOrganiser}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
        >
          <FileCheck className="w-4 h-4" />
          <span>Submit Attendance Summary to Organiser</span>
        </button>
      </div>

      {/* Operational Workflow Bar (Section 2.4 Specification) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Operational Verification Workflow:
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-slate-300 text-slate-800 flex items-center justify-center text-[10px]">1</span>
            <span>Volunteer Arrives</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">2</span>
            <span>Leader Verifies Attendance</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">3</span>
            <span>Attendance Recorded</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">4</span>
            <span>Organiser Dashboard Updated</span>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Team
          </span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{total}</span>
          <span className="text-[11px] text-slate-500">Assigned to Leader</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
            Present on Duty
          </span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">{present}</span>
          <span className="text-[11px] text-emerald-600 font-semibold">90% Coverage</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
            Late Arrival
          </span>
          <span className="text-2xl font-black text-amber-700 mt-1 block">{late}</span>
          <span className="text-[11px] text-amber-600 font-medium">Transit Delay</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block">
            Absent
          </span>
          <span className="text-2xl font-black text-rose-700 mt-1 block">{absent}</span>
          <span className="text-[11px] text-rose-600 font-medium">1 Excused</span>
        </div>
      </div>

      {/* Roster Controls: Search & Filter Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search team members by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white"
            />
          </div>

          {/* Filter Pills */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold">
            {(['All', 'Present', 'Late', 'Absent'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterStatus(filter)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  filterStatus === filter ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Table List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Volunteer Member</th>
                <th className="py-3 px-4">Check-In</th>
                <th className="py-3 px-4">Check-Out</th>
                <th className="py-3 px-4">Attendance Status</th>
                <th className="py-3 px-4">Leader Remarks</th>
                <th className="py-3 px-4 text-right">Quick Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((rec) => (
                <tr key={rec.volunteerId} className="hover:bg-slate-50/70">
                  {/* Name & Avatar */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={rec.avatar}
                        alt={rec.volunteerName}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-slate-900 block">{rec.volunteerName}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{rec.volunteerRole}</span>
                      </div>
                    </div>
                  </td>

                  {/* Check-in Time */}
                  <td className="py-3 px-4">
                    {rec.checkInTime ? (
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        {rec.checkInTime}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Not recorded</span>
                    )}
                  </td>

                  {/* Check-out Time */}
                  <td className="py-3 px-4">
                    {rec.checkOutTime ? (
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <LogOut className="w-3.5 h-3.5 text-blue-600" />
                        {rec.checkOutTime}
                      </span>
                    ) : (
                      <span className="text-slate-400">--:--</span>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        rec.status === 'Present'
                          ? 'bg-emerald-100 text-emerald-800'
                          : rec.status === 'Late'
                          ? 'bg-amber-100 text-amber-800'
                          : rec.status === 'Absent'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {rec.status === 'Present' && <CheckCircle2 className="w-3 h-3" />}
                      {rec.status === 'Late' && <Clock className="w-3 h-3" />}
                      {rec.status === 'Absent' && <UserX className="w-3 h-3" />}
                      {rec.status}
                    </span>
                  </td>

                  {/* Remarks */}
                  <td className="py-3 px-4 max-w-xs">
                    {editingRemarksId === rec.volunteerId ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={remarksText}
                          onChange={(e) => setRemarksText(e.target.value)}
                          className="p-1 text-xs border border-slate-300 rounded-md w-full"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveRemarks(rec.volunteerId)}
                          className="p-1 bg-emerald-600 text-white rounded-md"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => handleStartRemarks(rec)}
                        className="cursor-pointer text-slate-600 hover:text-slate-900 group flex items-center gap-1"
                        title="Click to edit remarks"
                      >
                        <span className="truncate">{rec.remarks || 'Add remark...'}</span>
                      </div>
                    )}
                  </td>

                  {/* Action Buttons: Check In, Check Out, Absent, Late, Early Departure */}
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      {rec.status !== 'Present' && (
                        <button
                          onClick={() => onMarkAttendance(rec.volunteerId, 'Present', '08:00 AM')}
                          className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg transition-colors cursor-pointer"
                          title="Check In Volunteer"
                        >
                          Check In
                        </button>
                      )}

                      {rec.status === 'Present' && !rec.checkOutTime && (
                        <button
                          onClick={() => onMarkAttendance(rec.volunteerId, 'Present', undefined)}
                          className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg transition-colors cursor-pointer"
                          title="Check Out Volunteer"
                        >
                          Check Out
                        </button>
                      )}

                      <button
                        onClick={() => onMarkAttendance(rec.volunteerId, 'Late', '08:15 AM')}
                        className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold rounded-lg transition-colors cursor-pointer"
                        title="Mark Late Arrival"
                      >
                        Late
                      </button>

                      <button
                        onClick={() => onMarkAttendance(rec.volunteerId, 'Absent')}
                        className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg transition-colors cursor-pointer"
                        title="Mark Absent"
                      >
                        Absent
                      </button>

                      <button
                        onClick={() => onMarkAttendance(rec.volunteerId, 'Early Departure')}
                        className="px-2 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold rounded-lg transition-colors cursor-pointer"
                        title="Record Early Departure"
                      >
                        Early Dep
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
