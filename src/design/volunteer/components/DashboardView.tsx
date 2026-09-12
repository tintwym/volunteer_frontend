'use client';
// @ts-nocheck

import React from 'react';
import { 
  Clock, 
  Calendar, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  PlusCircle, 
  FileCheck2, 
  Share2, 
  AlertCircle,
  MapPin,
  Users,
  Sparkles,
  ExternalLink,
  MessageSquare,
  QrCode,
  CheckSquare,
  GraduationCap,
  FolderOpen,
  Send,
  ShieldAlert,
  Circle,
  Check,
  UserCheck
} from 'lucide-react';
import { 
  VolunteerProfile, 
  VolunteerEvent, 
  ServiceRecord, 
  DigitalBadge, 
  AutomatedEmailNotification,
  VolunteerTask,
  TeamInfo
} from '../types';

interface DashboardViewProps {
  profile: VolunteerProfile;
  events: VolunteerEvent[];
  serviceRecords: ServiceRecord[];
  badges: DigitalBadge[];
  notifications: AutomatedEmailNotification[];
  tasks: VolunteerTask[];
  teams: TeamInfo[];
  setActiveTab: (tab: string) => void;
  onOpenLogHours: () => void;
  onOpenShareModal: (badge: DigitalBadge) => void;
  onSelectEvent: (event: VolunteerEvent) => void;
  onToggleTaskStatus?: (taskId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  events,
  serviceRecords,
  badges,
  notifications,
  tasks,
  teams,
  setActiveTab,
  onOpenLogHours,
  onOpenShareModal,
  onSelectEvent,
  onToggleTaskStatus
}) => {
  const signedUpEvents = events.filter(e => e.isSignedUp);
  const nextEvent = signedUpEvents[0] || events[0];
  const earnedBadges = badges.filter(b => b.earned);
  const recentVerifiedRecords = serviceRecords.filter(r => r.status === 'verified').slice(0, 3);
  const unreadNotification = notifications.find(n => !n.isRead);

  // Filter tasks for upcoming event
  const currentEventTasks = tasks.filter(t => t.eventId === nextEvent?.id || t.eventTitle.includes('Festival'));
  const currentTeam = teams.find(t => t.eventId === nextEvent?.id) || teams[0];

  return (
    <div className="space-y-6">
      {/* 3.1 Welcome Banner: Personal Volunteer Greeting */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-2xl p-6 text-white shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pr-8">
          <Award className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/60 border border-emerald-400/30 text-emerald-100 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Welcome, Volunteer • Gold Service Tier</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Welcome back, {profile.name}!
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-5">
            You have contributed <strong className="text-white font-bold">{profile.totalHours} verified service hours</strong> across Seattle community programs. Your next assignment is ready for check-in.
          </p>

          <div className="flex flex-wrap gap-2.5">
            <button
              id="dashboard-attendance-btn"
              onClick={() => setActiveTab('attendance')}
              className="bg-white text-emerald-900 hover:bg-emerald-50 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <QrCode className="w-4 h-4 text-emerald-700" />
              <span>Shift Attendance & Check-in</span>
            </button>

            <button
              id="dashboard-get-certificate-btn"
              onClick={() => setActiveTab('certificates')}
              className="bg-emerald-600/70 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl border border-emerald-400/30 transition-all flex items-center gap-2"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Official Service Certificate</span>
            </button>

            <button
              id="dashboard-tasks-btn"
              onClick={() => setActiveTab('tasks')}
              className="bg-emerald-900/60 hover:bg-emerald-900 text-emerald-100 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl border border-emerald-500/20 transition-all flex items-center gap-2"
            >
              <CheckSquare className="w-4 h-4" />
              <span>My Tasks ({currentEventTasks.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Automated Email Alert Banner */}
      {unreadNotification && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start justify-between gap-3 text-amber-900 shadow-xs">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Automated System Notification
              </div>
              <div className="text-sm font-semibold text-amber-950 mt-0.5">
                {unreadNotification.subject}
              </div>
              <p className="text-xs text-amber-800 mt-0.5">
                {unreadNotification.previewText}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('notifications')}
            className="shrink-0 text-xs font-semibold text-amber-800 hover:text-amber-950 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            Open Notice
          </button>
        </div>
      )}

      {/* Section 3.1 SPECIFICATION HIGHLIGHT: Personal Upcoming Event & Assigned Tasks Card */}
      <div className="bg-white border-2 border-emerald-500/20 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Section 3.1 • Volunteer Operational Overview
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Upcoming Event Assignment</h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>Checked In • Shift Active</span>
            </span>
            <button
              onClick={() => setActiveTab('attendance')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-lg"
            >
              Manage Attendance
            </button>
          </div>
        </div>

        {/* 4 Core Dimensions: Event, Shift, Team, Leader */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4 border-b border-slate-100 text-xs">
          {/* Upcoming Event */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Upcoming Event
            </span>
            <h3 className="text-sm font-bold text-slate-900">{nextEvent.title}</h3>
            <span className="text-emerald-700 font-semibold mt-1 block">12 Sept 2026</span>
          </div>

          {/* Shift */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Shift Time
            </span>
            <h3 className="text-sm font-bold text-slate-900">8:00 AM – 12:00 PM</h3>
            <span className="text-slate-500 mt-1 block">4.0 Verified Service Hours</span>
          </div>

          {/* Team */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Assigned Team
            </span>
            <h3 className="text-sm font-bold text-slate-900">{currentTeam?.teamName || 'Registration Team'}</h3>
            <span className="text-slate-500 mt-1 block">{currentTeam?.meetingPoint.split(',')[0]}</span>
          </div>

          {/* Leader */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Team Leader
            </span>
            <h3 className="text-sm font-bold text-slate-900">{currentTeam?.leader.name || 'Marcus Reed'}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-slate-500">Team Leader</span>
              <button
                onClick={() => setActiveTab('messages')}
                className="text-[11px] text-emerald-700 font-semibold hover:underline"
              >
                (Chat)
              </button>
            </div>
          </div>
        </div>

        {/* Section 3.1 Tasks Checklist:
            Tasks
            ✓ Setup
            ○ Registration
            ○ Crowd Assistance */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <h4 className="text-sm font-bold text-slate-900">
                Shift Duties & Task Progress
              </h4>
            </div>
            <button
              onClick={() => setActiveTab('tasks')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Open Task Manager</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentEventTasks.map((task) => {
              const isDone = task.status === 'Completed';
              const isInProg = task.status === 'In Progress';

              return (
                <div
                  key={task.id}
                  onClick={() => onToggleTaskStatus && onToggleTaskStatus(task.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isDone
                      ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                      : isInProg
                      ? 'bg-amber-50/60 border-amber-300 text-amber-950'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="mt-0.5">
                    {isDone ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-400 flex items-center justify-center">
                        {isInProg && <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold leading-tight ${isDone ? 'line-through text-slate-500' : ''}`}>
                        {task.title.split('&')[0]}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                        isDone ? 'bg-emerald-100 text-emerald-800' : isInProg ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 truncate">
                      {task.location}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4 Core Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Hours */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Verified Hours</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {profile.totalHours} <span className="text-sm font-medium text-slate-500">hrs</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <span className="text-emerald-700 font-semibold flex items-center">
              +{profile.pendingHours}h pending approval
            </span>
          </div>
        </div>

        {/* Upcoming Shifts */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Shifts</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {signedUpEvents.length} <span className="text-sm font-medium text-slate-500">registered</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <span className="text-blue-700 font-semibold">Next shift: Sep 12</span>
          </div>
        </div>

        {/* Badges Earned */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Milestone Badges</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {earnedBadges.length} <span className="text-sm font-medium text-slate-500">/ {badges.length}</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <span className="text-amber-700 font-semibold">Latest: 50h Gold Heart</span>
          </div>
        </div>

        {/* Reliability */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Reliability Score</span>
            <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {profile.impactScore}%
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <span className="text-teal-700 font-semibold">14/14 shifts on-time</span>
          </div>
        </div>
      </div>

      {/* Main Content Split: Quick Modules Access & Recent Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Quick Actions Grid + Recent Verified Hours */}
        <div className="lg:col-span-2 space-y-6">
          {/* Volunteer Module Quick Action Matrix */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-3">Volunteer Operational Hub</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <button
                onClick={() => setActiveTab('attendance')}
                className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition-all group"
              >
                <QrCode className="w-5 h-5 text-emerald-600 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-slate-900 block">Check-in Terminal</span>
                <span className="text-[11px] text-slate-500">GPS & QR validation</span>
              </button>

              <button
                onClick={() => setActiveTab('team')}
                className="p-3 bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-xl text-left transition-all group"
              >
                <Users className="w-5 h-5 text-purple-600 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-slate-900 block">My Volunteer Team</span>
                <span className="text-[11px] text-slate-500">Leader & squad members</span>
              </button>

              <button
                onClick={() => setActiveTab('training')}
                className="p-3 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left transition-all group"
              >
                <GraduationCap className="w-5 h-5 text-indigo-600 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-slate-900 block">Required Training</span>
                <span className="text-[11px] text-slate-500">Quizzes & certifications</span>
              </button>

              <button
                onClick={() => setActiveTab('documents')}
                className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-left transition-all group"
              >
                <FolderOpen className="w-5 h-5 text-blue-600 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-slate-900 block">Event Documents</span>
                <span className="text-[11px] text-slate-500">Venue map & handbooks</span>
              </button>

              <button
                onClick={() => setActiveTab('requests')}
                className="p-3 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-xl text-left transition-all group"
              >
                <Send className="w-5 h-5 text-amber-600 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-slate-900 block">Submit Request</span>
                <span className="text-[11px] text-slate-500">Shift change / absence</span>
              </button>

              <button
                onClick={() => setActiveTab('incidents')}
                className="p-3 bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-300 rounded-xl text-left transition-all group"
              >
                <ShieldAlert className="w-5 h-5 text-red-600 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-slate-900 block">Report Incident</span>
                <span className="text-[11px] text-slate-500">Safety & hazard log</span>
              </button>
            </div>
          </div>

          {/* Recent Verified Service Hours Feed */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Recent Verified Service Records
              </h3>
              <button
                onClick={() => setActiveTab('reports')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>Full Hours Transcript</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {recentVerifiedRecords.map((record) => (
                <div key={record.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-900 truncate">
                        {record.eventTitle}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
                        Verified
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {record.organization} &bull; {record.date} &bull; Supervisor: {record.supervisorName}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-emerald-950">
                      +{record.hours} hrs
                    </span>
                    <div className="text-[10px] font-mono text-slate-400">
                      {record.verificationCode}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Milestone Badges & Quick Links */}
        <div className="space-y-6">
          {/* Milestone Badges Mini Panel */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Earned Milestones</h3>
              <button
                onClick={() => setActiveTab('badges')}
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {earnedBadges.slice(0, 3).map((badge) => (
                <div
                  key={badge.id}
                  className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{badge.title}</h4>
                      <p className="text-[11px] text-slate-500">{badge.criterion}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenShareModal(badge)}
                    className="p-1.5 text-slate-400 hover:text-emerald-700 rounded-lg hover:bg-white transition-colors"
                    title="Share Badge"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('certificates')}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Download Official Certificate</span>
            </button>
          </div>

          {/* Quick Team Announcement Preview */}
          {currentTeam?.announcements && currentTeam.announcements.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Team Announcement</span>
                <span className="text-[10px] font-bold uppercase text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  {currentTeam.announcements[1]?.priority === 'urgent' ? 'Urgent Alert' : 'Leader Update'}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                "{currentTeam.announcements[1]?.text || currentTeam.announcements[0]?.text}"
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>By {currentTeam.leader.name}</span>
                <button
                  onClick={() => setActiveTab('team')}
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  View Team Board →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
