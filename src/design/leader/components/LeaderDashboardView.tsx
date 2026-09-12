'use client';
// @ts-nocheck

import React from 'react';
import {
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  HelpCircle,
  FileText,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertOctagon,
  ChevronRight,
  CheckSquare,
  MessageSquare,
  Megaphone,
  UserCheck,
  Award
} from 'lucide-react';
import {
  TeamTask,
  TodayAttendanceRecord,
  IncidentReport,
  OperationalRequest,
  OrganiserAnnouncement,
  Volunteer
} from '../types';

interface LeaderDashboardViewProps {
  volunteers: Volunteer[];
  attendance: TodayAttendanceRecord[];
  tasks: TeamTask[];
  incidents: IncidentReport[];
  requests: OperationalRequest[];
  announcements: OrganiserAnnouncement[];
  onNavigateTab: (tab: string) => void;
  onQuickUpdateTaskStatus: (taskId: string, status: 'In Progress' | 'Completed') => void;
  onRelayAnnouncement: (announcement: OrganiserAnnouncement) => void;
  onOpenReportIncidentModal: () => void;
  onOpenSubmitRequestModal: () => void;
  onSubmitAttendanceToOrganiser: () => void;
}

export const LeaderDashboardView: React.FC<LeaderDashboardViewProps> = ({
  volunteers,
  attendance,
  tasks,
  incidents,
  requests,
  announcements,
  onNavigateTab,
  onQuickUpdateTaskStatus,
  onRelayAnnouncement,
  onOpenReportIncidentModal,
  onOpenSubmitRequestModal,
  onSubmitAttendanceToOrganiser
}) => {
  // Compute Dashboard KPIs matching Section 2.1
  const totalTeam = attendance.length;
  const presentCount = attendance.filter(a => a.status === 'Present').length;
  const absentCount = attendance.filter(a => a.status === 'Absent').length;
  const lateCount = attendance.filter(a => a.status === 'Late').length;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;

  const openIncidents = incidents.filter(i => i.status !== 'Resolved').length;
  const pendingRequests = requests.filter(r => r.status === 'Pending').length;

  const activeAnnouncement = announcements[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Scope & Role Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Role: Volunteer Leader (Operational Supervisor)
            </span>
            <span className="text-xs text-slate-400 font-medium">Assigned Team: Team Alpha</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Team Alpha — Registration & Welcome Operations
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Operational supervisor bridge between Event Organiser and assigned team volunteers. Responsible for operational execution, attendance verification, task delegation, and issue escalation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenReportIncidentModal}
            className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Report Incident</span>
          </button>
          <button
            onClick={onOpenSubmitRequestModal}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
            <span>Request Support</span>
          </button>
          <button
            onClick={() => onNavigateTab('communication')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact Team</span>
          </button>
        </div>
      </div>

      {/* SECTION 2.1 DASHBOARD METRICS MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: My Team Attendance Status (20, Present 18, Absent 1, Late 1) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-600" />
                My Team Attendance
              </span>
              <button
                onClick={() => onNavigateTab('attendance')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-0.5"
              >
                Manage &rarr;
              </button>
            </div>

            <div className="mt-4 flex items-baseline justify-between border-b border-slate-100 pb-3">
              <span className="text-sm font-semibold text-slate-600">Assigned Team</span>
              <span className="text-3xl font-black text-slate-900">{totalTeam}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3 text-center">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="text-xl font-bold text-emerald-800 block">{presentCount}</span>
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Present</span>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100">
                <span className="text-xl font-bold text-rose-800 block">{absentCount}</span>
                <span className="text-[10px] font-bold text-rose-700 uppercase">Absent</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                <span className="text-xl font-bold text-amber-800 block">{lateCount}</span>
                <span className="text-[10px] font-bold text-amber-700 uppercase">Late</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Roll call complete for 08:00 AM shift</span>
            <button
              onClick={onSubmitAttendanceToOrganiser}
              className="text-[11px] font-bold text-emerald-600 hover:underline cursor-pointer"
            >
              Sync to Organiser &rarr;
            </button>
          </div>
        </div>

        {/* Card 2: Team Tasks (8, Completed 6, In Progress 2) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-blue-600" />
                Operational Tasks
              </span>
              <button
                onClick={() => onNavigateTab('tasks')}
                className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-0.5"
              >
                Manage &rarr;
              </button>
            </div>

            <div className="mt-4 flex items-baseline justify-between border-b border-slate-100 pb-3">
              <span className="text-sm font-semibold text-slate-600">Total Shift Tasks</span>
              <span className="text-3xl font-black text-slate-900">{totalTasks}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 text-center">
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
                <span className="text-xl font-bold text-blue-800 block">{completedTasks}</span>
                <span className="text-[10px] font-bold text-blue-700 uppercase">Completed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                <span className="text-xl font-bold text-amber-800 block">{inProgressTasks}</span>
                <span className="text-[10px] font-bold text-amber-700 uppercase">In Progress</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>75% team operations executed</span>
            <span className="text-emerald-700 font-bold">On Schedule</span>
          </div>
        </div>

        {/* Card 3: Issues & Requests (Open Incidents: 1, Pending Requests: 2) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                Supervision Status
              </span>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                Active Event
              </span>
            </div>

            <div className="space-y-3 mt-4">
              <div
                onClick={() => onNavigateTab('incidents')}
                className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 flex items-center justify-between cursor-pointer hover:bg-rose-100/70 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-rose-600" />
                  <span className="text-xs font-bold text-slate-900">Open Incidents</span>
                </div>
                <span className="text-base font-bold text-rose-700 px-2 py-0.5 rounded-lg bg-white border border-rose-200 shadow-2xs">
                  {openIncidents}
                </span>
              </div>

              <div
                onClick={() => onNavigateTab('requests')}
                className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between cursor-pointer hover:bg-amber-100/70 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-slate-900">Pending Requests</span>
                </div>
                <span className="text-base font-bold text-amber-700 px-2 py-0.5 rounded-lg bg-white border border-amber-200 shadow-2xs">
                  {pendingRequests}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Escalation channel to Organiser</span>
            <span className="text-purple-700 font-bold">Priority High</span>
          </div>
        </div>
      </div>

      {/* ORGANISER ANNOUNCEMENT RELAY BANNER (SECTION 2.6) */}
      {activeAnnouncement && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white shadow-md border border-slate-700">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 flex items-center gap-1">
                  <Megaphone className="w-3 h-3" />
                  Organiser Broadcast Received
                </span>
                <span className="text-xs text-slate-400">{activeAnnouncement.timestamp}</span>
              </div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                "{activeAnnouncement.message}"
              </h3>
              <p className="text-xs text-slate-300">
                From: {activeAnnouncement.organiserName}
              </p>
            </div>

            {/* Leader Relay Action Box */}
            <div className="bg-white/10 p-3 rounded-xl border border-white/15 flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-300 block">
                  Leader Relay Suggestion:
                </span>
                <p className="text-xs text-white font-medium">
                  "{activeAnnouncement.suggestedTeamAction}"
                </p>
              </div>

              <button
                onClick={() => onRelayAnnouncement(activeAnnouncement)}
                className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs whitespace-nowrap"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Relay to Team Chat</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TODAY'S OPERATIONAL EXECUTION MATRIX (SECTION 2.3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Team Tasks with Sub-assignments (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Today's Operational Task Execution</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Supervising sub-role delegations (Check-in, Registration, Queue Management)
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('tasks')}
              className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
            >
              Full Task Board &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {tasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-xl border transition-all ${
                  task.status === 'Completed'
                    ? 'bg-slate-50/70 border-slate-200 opacity-80'
                    : 'bg-white border-slate-200 shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-slate-900">{task.title}</h3>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          task.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : task.status === 'In Progress'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{task.description}</p>
                  </div>

                  {/* Quick status update button */}
                  {task.status !== 'Completed' ? (
                    <button
                      onClick={() => onQuickUpdateTaskStatus(task.id, 'Completed')}
                      className="px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:text-white bg-emerald-50 hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Mark Complete
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Done
                    </span>
                  )}
                </div>

                {/* Sub-role Delegations */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    Leader Delegations:
                  </span>
                  {task.assignments.map((asg) => (
                    <span
                      key={asg.volunteerId}
                      className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1"
                    >
                      <strong className="text-slate-900 font-semibold">{asg.volunteerName}:</strong>
                      <span className="text-emerald-700">{asg.subRole}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Team Attendance & Urgent Alerts (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quick Attendance Roster */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                Active Shift Roll Call
              </h3>
              <button
                onClick={() => onNavigateTab('attendance')}
                className="text-xs text-emerald-700 font-bold hover:underline"
              >
                View All &rarr;
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {attendance.slice(0, 6).map((record) => (
                <div
                  key={record.volunteerId}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={record.avatar}
                      alt={record.volunteerName}
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="font-bold text-slate-900 block truncate">
                        {record.volunteerName}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {record.checkInTime || 'Not checked in'}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                      record.status === 'Present'
                        ? 'bg-emerald-100 text-emerald-800'
                        : record.status === 'Late'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {record.status}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={onSubmitAttendanceToOrganiser}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center block"
            >
              Submit Attendance Summary to Organiser
            </button>
          </div>

          {/* Open Operational Incident Quick View */}
          <div className="bg-rose-50/70 rounded-2xl border border-rose-200 p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Active Incident in Zone
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white">
                Under Review
              </span>
            </div>
            <h4 className="text-xs font-bold text-rose-950">
              {incidents[0]?.title || 'Barcode Scanner Hardware Failure'}
            </h4>
            <p className="text-xs text-rose-800/80 leading-relaxed">
              {incidents[0]?.description}
            </p>
            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-[10px] text-rose-700">Affected: Counter B</span>
              <button
                onClick={() => onNavigateTab('incidents')}
                className="font-bold text-rose-900 underline cursor-pointer"
              >
                Track Escalation &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
