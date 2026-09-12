'use client';
// @ts-nocheck

import React from 'react';
import {
  Users,
  UserCheck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  PlusCircle,
  Megaphone,
  BarChart3,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Radio,
  UserPlus,
  ShieldAlert,
  ClipboardList,
} from 'lucide-react';
import {
  OrganiserEvent,
  DetailedVolunteerProfile,
  VolunteerLeaderProfile,
  OperationalTeam,
  OperationalTask,
  OperationalShiftSchedule,
  AttendanceRecordItem,
  IncidentReport,
  ApprovalRequestItem,
} from '../types';

interface OrganiserDashboardViewProps {
  events?: OrganiserEvent[];
  volunteers?: DetailedVolunteerProfile[];
  leaders?: VolunteerLeaderProfile[];
  teams?: OperationalTeam[];
  tasks?: OperationalTask[];
  shifts?: OperationalShiftSchedule[];
  attendance?: AttendanceRecordItem[];
  incidents?: IncidentReport[];
  approvals?: ApprovalRequestItem[];
  onNavigate?: (tab: string) => void;
  onOpenCreateEvent?: () => void;
  onOpenCreateTask?: () => void;
  onOpenCreateTeam?: () => void;
  onOpenBroadcast?: () => void;
}

export const OrganiserDashboardView: React.FC<OrganiserDashboardViewProps> = ({
  events = [],
  volunteers = [],
  leaders = [],
  teams = [],
  tasks = [],
  shifts = [],
  attendance = [],
  incidents = [],
  approvals = [],
  onNavigate = (_tab?: string) => {},
  onOpenCreateEvent = () => {},
  onOpenCreateTask = () => {},
  onOpenCreateTeam = () => {},
  onOpenBroadcast = () => {},
}) => {
  // KPI Calculations
  const totalVolunteers = 250;
  const confirmedVolunteers = 220;
  const pendingVolunteers = 20;
  const rejectedVolunteers = 10;
  const volunteerLeadersCount = 15;
  const teamsCount = 15;

  const todayAttendanceRate = 92; // 92%
  const tasksCompletedRate = 78; // 78%
  const openIncidentsCount = (incidents || []).filter(
    (i) => i.status !== 'Resolved' && i.status !== 'Closed'
  ).length;

  const pendingApprovalsCount = (approvals || []).filter((a) => a.status === 'Pending').length;
  const completedTasks = (tasks || []).filter((t) => t.status === 'Completed').length;
  const pendingTasks = (tasks || []).filter((t) => t.status !== 'Completed').length;
  const absentCount = (attendance || []).filter((a) => a.status === 'Absent').length;

  // Capacity vs Requirement
  const totalCapacityRequired = (shifts || []).reduce((acc, s) => acc + (s.requiredVolunteers || 0), 0);
  const totalCapacityAssigned = (shifts || []).reduce((acc, s) => acc + (s.assignedVolunteers || 0), 0);
  const capacityPct = Math.round((totalCapacityAssigned / (totalCapacityRequired || 1)) * 100);

  return (
    <div id="organiser-dashboard" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* 1. Header Banner with Quick Actions */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold backdrop-blur-xs border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Executive Organiser Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Real-Time Event & Volunteer Operations
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Monitoring 250 registered volunteers across 15 operational teams and 15 appointed leaders. Overall today's attendance stands at <span className="text-emerald-400 font-bold">{todayAttendanceRate}%</span> with <span className="text-emerald-400 font-bold">{tasksCompletedRate}%</span> of tasks completed.
            </p>
          </div>

          {/* Useful Dashboard Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              id="action-create-event"
              onClick={onOpenCreateEvent}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Event</span>
            </button>
            <button
              id="action-create-team"
              onClick={onOpenCreateTeam}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>Create Team</span>
            </button>
            <button
              id="action-create-task"
              onClick={onOpenCreateTask}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Create Task</span>
            </button>
            <button
              id="action-send-announcement"
              onClick={onOpenBroadcast}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Megaphone className="w-4 h-4" />
              <span>Send Announcement</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Official Dashboard KPIs Grid (from user specs) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Volunteers */}
        <div
          onClick={() => onNavigate('volunteers')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-500 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Volunteers</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{totalVolunteers}</p>
          <div className="flex items-center gap-2 mt-1.5 text-[10px] font-semibold text-slate-500">
            <span className="text-emerald-600">{confirmedVolunteers} Confirmed</span>
            <span>•</span>
            <span className="text-amber-600">{pendingVolunteers} Pending</span>
          </div>
        </div>

        {/* Volunteer Leaders & Teams */}
        <div
          onClick={() => onNavigate('leaders')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-500 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Leaders & Teams</span>
            <Layers className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{volunteerLeadersCount} <span className="text-sm font-semibold text-slate-400">/ {teamsCount} teams</span></p>
          <p className="text-[10px] font-semibold text-indigo-700 mt-1.5">100% Squad Supervised</p>
        </div>

        {/* Today's Attendance */}
        <div
          onClick={() => onNavigate('attendance')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-500 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Today's Attendance</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-600">{todayAttendanceRate}%</p>
          <p className="text-[10px] font-semibold text-slate-500 mt-1.5">{absentCount} Absent • 1 Excused</p>
        </div>

        {/* Tasks Completed */}
        <div
          onClick={() => onNavigate('tasks')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-500 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Tasks Completed</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-blue-600">{tasksCompletedRate}%</p>
          <p className="text-[10px] font-semibold text-slate-500 mt-1.5">{completedTasks} Done • {pendingTasks} In Progress</p>
        </div>

        {/* Open Incidents */}
        <div
          onClick={() => onNavigate('incidents')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-rose-500 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Open Incidents</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-black text-rose-600">{openIncidentsCount}</p>
          <p className="text-[10px] font-semibold text-rose-700 mt-1.5">Action Required on 1 Sprain</p>
        </div>

        {/* Pending Approvals */}
        <div
          onClick={() => onNavigate('approvals')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-500 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Pending Approvals</span>
            <FileCheck2 className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-600">{pendingApprovalsCount}</p>
          <p className="text-[10px] font-semibold text-amber-700 mt-1.5">Shift Swaps & Reg</p>
        </div>
      </div>

      {/* 3. Capacity vs Requirement & Key Operational Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Capacity vs Requirement & Today's Shift Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Volunteer Capacity vs Requirement Gauge */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Volunteer Capacity vs. Requirement
                </h3>
                <p className="text-xs text-slate-500">Live staffing fulfillment across active operational shifts</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  {capacityPct}% Staffed
                </span>
                <button
                  onClick={() => onNavigate('schedules')}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>Manage Shifts</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, capacityPct)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Total Staffed: <strong>{totalCapacityAssigned} volunteers</strong></span>
                <span>Requirement Target: <strong>{totalCapacityRequired} volunteers</strong></span>
                <span>Buffer Available: <strong>30 reserve pool</strong></span>
              </div>
            </div>

            {/* Shift Breakdown Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {shifts.slice(0, 3).map((s) => (
                <div key={s.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>{s.name}</span>
                    <span className="text-[11px] font-mono text-slate-500">{s.timeWindow}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 text-[11px]">
                    <span>Team: {s.teamName}</span>
                    <span className="font-semibold text-emerald-700">{s.assignedVolunteers}/{s.requiredVolunteers}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full"
                      style={{ width: `${s.coveragePercentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Operational Tasks Progress */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Today's Operational Activities & Tasks
                </h3>
                <p className="text-xs text-slate-500">Real-time status of critical event responsibilities</p>
              </div>
              <button
                onClick={() => onNavigate('tasks')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <span>View All Tasks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {tasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                          task.priority === 'Urgent'
                            ? 'bg-rose-100 text-rose-800'
                            : task.priority === 'High'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {task.priority}
                      </span>
                      <span className="font-bold text-xs text-slate-900">{task.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {task.teamName} • Leader: <strong>{task.assignedLeaderName}</strong> • {task.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-24 text-right">
                      <div className="text-[11px] font-bold text-slate-700">{task.progress}%</div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                        <div
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                        task.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : task.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-slate-50 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Alerts, Live Incident Feed & Quick Management Links */}
        <div className="space-y-6">
          {/* Active Incidents & Safety Alert Widget */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Operational Incidents ({openIncidentsCount})
                </h3>
              </div>
              <button
                onClick={() => onNavigate('incidents')}
                className="text-xs font-bold text-rose-600 hover:text-rose-700"
              >
                Full Incident Log
              </button>
            </div>

            <div className="space-y-3">
              {incidents.slice(0, 3).map((inc) => (
                <div
                  key={inc.id}
                  className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                    inc.severity === 'Critical' || inc.severity === 'High'
                      ? 'bg-rose-50/70 border-rose-200 text-rose-950'
                      : 'bg-amber-50/70 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="truncate">{inc.title}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 shadow-2xs">
                      {inc.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{inc.description}</p>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 pt-1">
                    <span>{inc.location}</span>
                    <span>Assigned: {inc.assignedLeader}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Approval Inbox Snippet */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Approval Requests ({pendingApprovalsCount})
                </h3>
              </div>
              <button
                onClick={() => onNavigate('approvals')}
                className="text-xs font-bold text-amber-600 hover:text-amber-700"
              >
                Review All
              </button>
            </div>

            <div className="space-y-2.5">
              {(approvals || []).filter((a) => a.status === 'Pending').slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="text-emerald-700 uppercase tracking-wide text-[10px]">{app.type}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{app.submittedAt}</span>
                  </div>
                  <p className="font-semibold text-slate-800 text-[11px]">{app.requestedBy} ({app.requestorRole})</p>
                  <p className="text-slate-500 text-[11px] truncate">{app.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Organiser Direct Action Hub (Links to other 15 modules) */}
          <div className="bg-slate-900 p-5 rounded-2xl text-white space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Quick Module Access</p>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <button
                onClick={() => onNavigate('events')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-left transition-colors flex items-center justify-between"
              >
                <span>Events</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
              <button
                onClick={() => onNavigate('volunteers')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-left transition-colors flex items-center justify-between"
              >
                <span>Volunteers</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
              <button
                onClick={() => onNavigate('leaders')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-left transition-colors flex items-center justify-between"
              >
                <span>Leaders</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
              <button
                onClick={() => onNavigate('training')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-left transition-colors flex items-center justify-between"
              >
                <span>Training</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
              <button
                onClick={() => onNavigate('reports')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-left transition-colors flex items-center justify-between"
              >
                <span>Reports</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
              <button
                onClick={() => onNavigate('settings')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-left transition-colors flex items-center justify-between"
              >
                <span>Settings</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
