'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Clock,
  Radio,
  Sliders,
  Database,
  Download,
  Save,
  CheckCircle2,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  FileSpreadsheet,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { Volunteer, TodayAttendanceRecord, ShiftEvent } from '../types';

interface SettingsViewProps {
  volunteers: Volunteer[];
  attendance: TodayAttendanceRecord[];
  shifts: ShiftEvent[];
  onResetData?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  volunteers,
  attendance,
  shifts,
  onResetData
}) => {
  // Settings tab navigation
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'alerts' | 'protocols' | 'data'>('profile');

  // 1. Leader Profile & Station Details
  const [profile, setProfile] = useState({
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@can-events.org',
    phone: '(555) 382-9910',
    title: 'Volunteer Leader (Operational Supervisor)',
    team: 'Team Alpha',
    zone: 'Zone A - Main Lobby & Check-In Desk',
    radioChannel: 'Channel 4 (Ops & Registration)',
    emergencyContact: 'Mark Jenkins (Spouse) - (555) 382-9911',
    notes: 'Operational checkpoint supervisor responsible for 20 team members at Registration Station A & B.'
  });

  // 2. Alert & Notification Preferences
  const [alerts, setAlerts] = useState({
    incidentEscalation: true,
    lateArrivals: true,
    underCapacityNotice: true,
    broadcastSound: true,
    dailyAutoDigest: true,
    smsUrgentDispatch: false
  });

  // 3. Operational Protocols
  const [protocols, setProtocols] = useState({
    gracePeriod: '10', // 10 minutes
    autoRequestSubstitute: true,
    requireBackgroundCheck: true,
    syncReliefSchedules: true,
    defaultBreakDuration: '30', // 30 minutes
    minimumVerifiedHoursForLead: '50'
  });

  // Save feedback state
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  // CSV Export utility
  const handleExportRosterCSV = () => {
    const headers = ['ID', 'Name', 'Role', 'Status', 'Verified Hours', 'Pending Hours', 'Skills', 'Phone', 'Email'];
    const rows = volunteers.map(v => [
      v.id,
      `"${v.name}"`,
      `"${v.role}"`,
      v.status,
      v.verifiedHours,
      v.pendingHours,
      `"${v.skills.join(', ')}"`,
      `"${v.phone}"`,
      `"${v.email}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `team-alpha-roster-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportAttendanceCSV = () => {
    const headers = ['Volunteer ID', 'Name', 'Role', 'Station/Task', 'Today Status', 'Check-In Time', 'Leader Remarks'];
    const rows = attendance.map(a => [
      a.volunteerId,
      `"${a.volunteerName}"`,
      `"${a.role}"`,
      `"${a.station}"`,
      a.status,
      a.checkInTime || 'N/A',
      `"${a.remarks || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `team-alpha-attendance-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Leader & Portal Settings</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
              Supervisor Preferences
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure supervisory identity, notification thresholds, station check-in protocols, and data export routines for Team Alpha.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Preferences</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Leader configuration settings successfully saved and applied to portal session.</span>
        </div>
      )}

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('profile')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'profile'
              ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Leader Identity & Station</span>
        </button>

        <button
          onClick={() => setActiveSubTab('alerts')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'alerts'
              ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Alerts & Dispatch</span>
        </button>

        <button
          onClick={() => setActiveSubTab('protocols')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'protocols'
              ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Check-in & Shift Rules</span>
        </button>

        <button
          onClick={() => setActiveSubTab('data')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'data'
              ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Data & Export</span>
        </button>
      </div>

      {/* 1. Leader Identity & Station Tab */}
      {activeSubTab === 'profile' && (
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <User className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900">Volunteer Leader Profile</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Legal / Display Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Operational Role Title</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={e => setProfile({ ...profile, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Official Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">On-Site Direct Mobile Phone</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={e => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Operational Station Context */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Radio className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900">Assigned Team & Station Parameters</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Supervised Team</label>
                <input
                  type="text"
                  disabled
                  value={profile.team}
                  className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 cursor-not-allowed"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Assigned by Lead Organiser</span>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Assigned Operational Zone</label>
                <input
                  type="text"
                  value={profile.zone}
                  onChange={e => setProfile({ ...profile, zone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Walkie-Talkie Radio Channel</label>
                <input
                  type="text"
                  value={profile.radioChannel}
                  onChange={e => setProfile({ ...profile, radioChannel: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="font-bold text-slate-700 block mb-1">Leader Handover Notes / Station Briefing</label>
              <textarea
                rows={3}
                value={profile.notes}
                onChange={e => setProfile({ ...profile, notes: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </form>
      )}

      {/* 2. Alerts & Dispatch Tab */}
      {activeSubTab === 'alerts' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Bell className="w-4 h-4 text-emerald-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">Leader Dispatch Alerts & Notification Preferences</h2>
              <p className="text-xs text-slate-500">Configure how and when the portal notifies you during active shifts</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {/* Alert 1 */}
            <label className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer border border-slate-200">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 block">Immediate Incident Escalation Alerts</span>
                <span className="text-slate-500 block">
                  Receive high-priority banner notifications whenever safety or hardware issues are flagged on Team Alpha.
                </span>
              </div>
              <input
                type="checkbox"
                checked={alerts.incidentEscalation}
                onChange={e => setAlerts({ ...alerts, incidentEscalation: e.target.checked })}
                className="w-4 h-4 mt-1 accent-emerald-600 cursor-pointer"
              />
            </label>

            {/* Alert 2 */}
            <label className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer border border-slate-200">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 block">Late Arrival / Check-in Delay Warnings</span>
                <span className="text-slate-500 block">
                  Notify leader when assigned volunteers exceed the 10-minute check-in grace window.
                </span>
              </div>
              <input
                type="checkbox"
                checked={alerts.lateArrivals}
                onChange={e => setAlerts({ ...alerts, lateArrivals: e.target.checked })}
                className="w-4 h-4 mt-1 accent-emerald-600 cursor-pointer"
              />
            </label>

            {/* Alert 3 */}
            <label className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer border border-slate-200">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 block">Shift Under-Capacity Pre-Alerts</span>
                <span className="text-slate-500 block">
                  Flag shifts falling below 80% confirmed volunteer turnout 2 hours prior to scheduled kickoff.
                </span>
              </div>
              <input
                type="checkbox"
                checked={alerts.underCapacityNotice}
                onChange={e => setAlerts({ ...alerts, underCapacityNotice: e.target.checked })}
                className="w-4 h-4 mt-1 accent-emerald-600 cursor-pointer"
              />
            </label>

            {/* Alert 4 */}
            <label className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer border border-slate-200">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 block">Organiser Urgent Broadcast Audio Chime</span>
                <span className="text-slate-500 block">
                  Play high-visibility audio alert when Organiser transmits a Priority 1 urgent broadcast.
                </span>
              </div>
              <input
                type="checkbox"
                checked={alerts.broadcastSound}
                onChange={e => setAlerts({ ...alerts, broadcastSound: e.target.checked })}
                className="w-4 h-4 mt-1 accent-emerald-600 cursor-pointer"
              />
            </label>

            {/* Alert 5 */}
            <label className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer border border-slate-200">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 block">Automated Daily Attendance Digest to Organiser</span>
                <span className="text-slate-500 block">
                  Automatically bundle verified volunteer hours and absent summaries at the conclusion of each day's shifts.
                </span>
              </div>
              <input
                type="checkbox"
                checked={alerts.dailyAutoDigest}
                onChange={e => setAlerts({ ...alerts, dailyAutoDigest: e.target.checked })}
                className="w-4 h-4 mt-1 accent-emerald-600 cursor-pointer"
              />
            </label>
          </div>
        </div>
      )}

      {/* 3. Protocols & Shift Rules Tab */}
      {activeSubTab === 'protocols' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Shield className="w-4 h-4 text-emerald-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">Team Alpha Operational Protocols</h2>
              <p className="text-xs text-slate-500">Thresholds and validation rules enforced across registration stations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="font-bold text-slate-900 block">Check-In Grace Window</label>
              <p className="text-slate-500 text-[11px]">
                Allowed delay after shift start time before attendance status changes from "Assigned" to "Late".
              </p>
              <select
                value={protocols.gracePeriod}
                onChange={e => setProtocols({ ...protocols, gracePeriod: e.target.value })}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-semibold"
              >
                <option value="5">5 Minutes (Strict)</option>
                <option value="10">10 Minutes (Standard)</option>
                <option value="15">15 Minutes (Flexible)</option>
                <option value="30">30 Minutes (Event Rush)</option>
              </select>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="font-bold text-slate-900 block">Default Relief Break Duration</label>
              <p className="text-slate-500 text-[11px]">
                Standard meal and rest break allocated for continuous shifts exceeding 4 operational hours.
              </p>
              <select
                value={protocols.defaultBreakDuration}
                onChange={e => setProtocols({ ...protocols, defaultBreakDuration: e.target.value })}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-semibold"
              >
                <option value="15">15 Minutes (Staggered)</option>
                <option value="30">30 Minutes (Standard)</option>
                <option value="45">45 Minutes (Extended Lunch)</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <label className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer border border-slate-200">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 block">Enforce Mandatory Background Check for Cash/Desk Tasks</span>
                <span className="text-slate-500 block">
                  Restricts assigning volunteers to Registration Desk & VIP hospitality unless background check status is 'Approved'.
                </span>
              </div>
              <input
                type="checkbox"
                checked={protocols.requireBackgroundCheck}
                onChange={e => setProtocols({ ...protocols, requireBackgroundCheck: e.target.checked })}
                className="w-4 h-4 mt-1 accent-emerald-600 cursor-pointer"
              />
            </label>

            <label className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer border border-slate-200">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 block">Auto-Prompt Float Replacement on Absent Status</span>
                <span className="text-slate-500 block">
                  Automatically open Organiser float substitute request modal when marking a volunteer absent.
                </span>
              </div>
              <input
                type="checkbox"
                checked={protocols.autoRequestSubstitute}
                onChange={e => setProtocols({ ...protocols, autoRequestSubstitute: e.target.checked })}
                className="w-4 h-4 mt-1 accent-emerald-600 cursor-pointer"
              />
            </label>

            <label className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer border border-slate-200">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 block">Mandatory Relief Schedule Synchronization</span>
                <span className="text-slate-500 block">
                  Require pair rotation validation before approving 11:30 AM registration station relief.
                </span>
              </div>
              <input
                type="checkbox"
                checked={protocols.syncReliefSchedules}
                onChange={e => setProtocols({ ...protocols, syncReliefSchedules: e.target.checked })}
                className="w-4 h-4 mt-1 accent-emerald-600 cursor-pointer"
              />
            </label>
          </div>
        </div>
      )}

      {/* 4. Data & Export Tab */}
      {activeSubTab === 'data' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Download className="w-4 h-4 text-emerald-600" />
              <div>
                <h2 className="text-sm font-bold text-slate-900">Operational Data Export</h2>
                <p className="text-xs text-slate-500">Download formatted CSV reports for external event archives</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>Team Alpha Roster Export</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Includes all 20 assigned volunteers, verified hours, role classifications, skills, and contact data.
                  </p>
                </div>
                <button
                  onClick={handleExportRosterCSV}
                  className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-300 font-bold text-slate-800 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Download Roster CSV ({volunteers.length} members)</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                    <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                    <span>Today's Attendance & Shift Log</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Exports active check-in times, attendance marks (Present/Late/Absent), station assignments, and supervisor remarks.
                  </p>
                </div>
                <button
                  onClick={handleExportAttendanceCSV}
                  className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-300 font-bold text-slate-800 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>Download Attendance CSV ({attendance.length} records)</span>
                </button>
              </div>
            </div>
          </div>

          {/* System & Cache Maintenance */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Database className="w-4 h-4 text-slate-600" />
              <div>
                <h2 className="text-sm font-bold text-slate-900">System & Session Maintenance</h2>
                <p className="text-xs text-slate-500">Local cache state and demo data management</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-slate-800 block">Offline Cache Status</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">
                  All 20 team volunteer records, 5 scheduled shifts, and live incident records are stored in browser memory.
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] shrink-0">
                100% Synced (Offline Ready)
              </span>
            </div>

            {onResetData && (
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-rose-700 block">Reset Demo State</span>
                  <span className="text-[11px] text-slate-500 block">
                    Restore all task assignments, attendance marks, and incident reports to initial state.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setResetConfirmOpen(true)}
                  className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                  <span>Reset Demo Data</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {resetConfirmOpen && onResetData && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">Reset Demo Portal Data?</h3>
              <p className="text-slate-500">
                This will reset all attendance marks, delegated tasks, and reported incidents back to their default sample values.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onResetData();
                  setResetConfirmOpen(false);
                  setSaveSuccess(true);
                  setTimeout(() => setSaveSuccess(false), 3000);
                }}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-colors cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
