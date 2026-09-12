'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  UserCheck,
  Search,
  Filter,
  Download,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Edit2,
  RefreshCw,
  X,
  FileCheck2,
} from 'lucide-react';
import { AttendanceRecordItem, AttendanceStatus } from '../types';

interface AttendanceManagementViewProps {
  attendance?: AttendanceRecordItem[];
  records?: AttendanceRecordItem[];
  onCorrectAttendance?: (recordId: string, status: any, notes?: any) => void;
}

export const AttendanceManagementView: React.FC<AttendanceManagementViewProps> = ({
  attendance: propAttendance,
  records: propRecords,
  onCorrectAttendance,
}) => {
  const attendance = propAttendance || propRecords || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [teamFilter, setTeamFilter] = useState<string>('All');
  const [editingRecord, setEditingRecord] = useState<AttendanceRecordItem | null>(null);
  const [newStatus, setNewStatus] = useState<AttendanceStatus>('Present');
  const [newNotes, setNewNotes] = useState('');

  const filteredAttendance = (attendance || []).filter((rec) => {
    const matchesSearch =
      (rec.volunteerName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rec.teamName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rec.leaderName || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || rec.status === statusFilter;
    const matchesTeam = teamFilter === 'All' || rec.teamName === teamFilter;

    return matchesSearch && matchesStatus && matchesTeam;
  });

  const presentCount = (attendance || []).filter((a) => a.status === 'Present').length;
  const lateCount = (attendance || []).filter((a) => a.status === 'Late').length;
  const absentCount = (attendance || []).filter((a) => a.status === 'Absent').length;
  const excusedCount = (attendance || []).filter((a) => a.status === 'Excused').length;
  const leftEarlyCount = (attendance || []).filter((a) => a.status === 'Left Early').length;

  const handleExportCSV = () => {
    const headers = 'ID,Volunteer,Team,Leader,Shift,Date,CheckIn,CheckOut,Status,Notes\n';
    const rows = filteredAttendance
      .map(
        (r) =>
          `"${r.id}","${r.volunteerName}","${r.teamName}","${r.leaderName}","${r.shiftName}","${r.date}","${r.checkInTime}","${r.checkOutTime}","${r.status}","${r.notes || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_log_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openEditModal = (rec: AttendanceRecordItem) => {
    setEditingRecord(rec);
    setNewStatus(rec.status);
    setNewNotes(rec.notes || '');
  };

  const handleCorrectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRecord) {
      onCorrectAttendance(editingRecord.id, newStatus, newNotes);
      setEditingRecord(null);
    }
  };

  return (
    <div id="attendance-management-view" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Volunteer Attendance Monitoring</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              92% Overall Attendance
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Real-time shift attendance verification, check-in timestamps, manual status overrides, and leader audit records.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Attendance Log</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
          <span className="text-[10px] font-bold uppercase tracking-wider block text-emerald-700">Present</span>
          <span className="text-2xl font-black">{presentCount}</span>
          <p className="text-[10px] text-emerald-700 font-semibold mt-1">92% of scheduled</p>
        </div>
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950">
          <span className="text-[10px] font-bold uppercase tracking-wider block text-amber-700">Late Arrivals</span>
          <span className="text-2xl font-black">{lateCount}</span>
          <p className="text-[10px] text-amber-700 font-semibold mt-1">Average 15 mins</p>
        </div>
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950">
          <span className="text-[10px] font-bold uppercase tracking-wider block text-rose-700">Unexcused Absent</span>
          <span className="text-2xl font-black">{absentCount}</span>
          <p className="text-[10px] text-rose-700 font-semibold mt-1">Standby dispatched</p>
        </div>
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950">
          <span className="text-[10px] font-bold uppercase tracking-wider block text-blue-700">Excused Leave</span>
          <span className="text-2xl font-black">{excusedCount}</span>
          <p className="text-[10px] text-blue-700 font-semibold mt-1">Prior notice given</p>
        </div>
        <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950">
          <span className="text-[10px] font-bold uppercase tracking-wider block text-purple-700">Left Early</span>
          <span className="text-2xl font-black">{leftEarlyCount}</span>
          <p className="text-[10px] text-purple-700 font-semibold mt-1">Leader approved</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by volunteer name, team, or leader..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700"
          >
            <option value="All">All Attendance Statuses</option>
            <option value="Present">Present</option>
            <option value="Late">Late</option>
            <option value="Absent">Absent</option>
            <option value="Excused">Excused</option>
            <option value="Left Early">Left Early</option>
          </select>

          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700"
          >
            <option value="All">All Teams</option>
            <option value="Registration Team">Registration Team</option>
            <option value="Logistics Team">Logistics Team</option>
            <option value="Crowd Management Team">Crowd Management Team</option>
            <option value="First Aid Support Team">First Aid Support Team</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Volunteer</th>
                <th className="py-3 px-4">Team & Leader</th>
                <th className="py-3 px-4">Shift Details</th>
                <th className="py-3 px-4">Check-In / Out</th>
                <th className="py-3 px-4">Attendance Status</th>
                <th className="py-3 px-4 text-right">Manual Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredAttendance.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={rec.volunteerAvatar}
                        alt={rec.volunteerName}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <span className="font-bold text-slate-900">{rec.volunteerName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-slate-800">{rec.teamName}</span>
                      <p className="text-[11px] text-slate-400">Leader: {rec.leaderName}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      <span className="font-medium text-slate-800">{rec.shiftName}</span>
                      <p className="text-[11px] text-slate-400">{rec.date}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                    {rec.checkInTime} → {rec.checkOutTime}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        rec.status === 'Present'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : rec.status === 'Late'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : rec.status === 'Absent'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : rec.status === 'Excused'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => openEditModal(rec)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Correct</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Correction Modal */}
      {editingRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Attendance Status Override</h3>
              <button onClick={() => setEditingRecord(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Manually correct attendance for <strong>{editingRecord.volunteerName}</strong> ({editingRecord.shiftName}):
            </p>

            <form onSubmit={handleCorrectionSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as AttendanceStatus)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                >
                  <option value="Present">Present</option>
                  <option value="Late">Late</option>
                  <option value="Absent">Absent</option>
                  <option value="Excused">Excused</option>
                  <option value="Left Early">Left Early</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Audit Notes / Reason for Change</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Volunteer reported to secondary triage station; confirmed by Dr. Jenkins."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingRecord(null)}
                  className="px-3 py-2 font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Save Override
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
