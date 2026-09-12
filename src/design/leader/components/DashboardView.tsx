'use client';
// @ts-nocheck

import React from 'react';
import {
  Users,
  Clock,
  CalendarCheck,
  Award,
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Send,
  FileSpreadsheet,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  UserPlus
} from 'lucide-react';
import { Volunteer, ShiftEvent, Badge, CertificateRecord } from '../types';

interface DashboardViewProps {
  volunteers: Volunteer[];
  shifts: ShiftEvent[];
  certificates: CertificateRecord[];
  onSelectTab: (tabId: string) => void;
  onVerifyVolunteerHours: (volunteerId: string) => void;
  onOpenScheduleModal: () => void;
  onOpenAddVolunteerModal: () => void;
  onOpenQuickBroadcast: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  volunteers,
  shifts,
  certificates,
  onSelectTab,
  onVerifyVolunteerHours,
  onOpenScheduleModal,
  onOpenAddVolunteerModal,
  onOpenQuickBroadcast
}) => {
  const activeVolunteers = volunteers.filter(v => v.status === 'Active');
  const onboardingVolunteers = volunteers.filter(v => v.status === 'On-boarding');
  const totalVerifiedHours = volunteers.reduce((acc, v) => acc + v.verifiedHours, 0);
  const totalPendingHours = volunteers.reduce((acc, v) => acc + v.pendingHours, 0);
  const upcomingShifts = shifts.filter(s => s.status === 'Upcoming');

  const pendingClearanceVolunteers = volunteers.filter(v => v.backgroundCheckStatus === 'Pending');
  const pendingHoursVolunteers = volunteers.filter(v => v.pendingHours > 0);

  // Average attendance rate
  const avgAttendance = Math.round(
    volunteers.reduce((acc, v) => acc + v.attendanceRate, 0) / (volunteers.length || 1)
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome & Leader Status Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Volunteer Leader Administrative Console
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Welcome back, Coordinator Sarah
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              You have <span className="text-emerald-400 font-semibold">{upcomingShifts.length} upcoming events</span> coordinated this week and <span className="text-amber-300 font-semibold">{totalPendingHours} volunteer service hours</span> awaiting administrative verification.
            </p>
          </div>

          {/* Quick Command Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenScheduleModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 shadow-sm transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>New Shift Schedule</span>
            </button>
            <button
              onClick={onOpenAddVolunteerModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 shadow-sm transition-colors cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-emerald-700" />
              <span>Add Volunteer</span>
            </button>
            <button
              onClick={onOpenQuickBroadcast}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4 text-teal-400" />
              <span>Broadcast Notice</span>
            </button>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Volunteers */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Roster Strength
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{volunteers.length}</span>
            <span className="text-xs font-medium text-emerald-600">
              {activeVolunteers.length} Active • {onboardingVolunteers.length} Onboarding
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100 text-slate-500">
            <span>Background Approved</span>
            <span className="font-semibold text-slate-800">
              {volunteers.filter(v => v.backgroundCheckStatus === 'Approved').length}/{volunteers.length}
            </span>
          </div>
        </div>

        {/* Verified Service Hours */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Verified Service Hours
            </span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalVerifiedHours}</span>
            <span className="text-xs font-medium text-slate-500">hrs logged</span>
            {totalPendingHours > 0 && (
              <span className="ml-auto text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                +{totalPendingHours} hrs pending
              </span>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100 text-slate-500">
            <span>Avg. per volunteer</span>
            <span className="font-semibold text-slate-800">
              {Math.round(totalVerifiedHours / (volunteers.length || 1))} hrs
            </span>
          </div>
        </div>

        {/* Upcoming Coordinated Shifts */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Upcoming Shifts
            </span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{upcomingShifts.length}</span>
            <span className="text-xs font-medium text-slate-500">scheduled events</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100 text-slate-500">
            <span>Total Slots Filled</span>
            <span className="font-semibold text-slate-800">
              {upcomingShifts.reduce((acc, s) => acc + s.assignedVolunteerIds.length, 0)} / {upcomingShifts.reduce((acc, s) => acc + s.requiredVolunteers, 0)} slots
            </span>
          </div>
        </div>

        {/* Attendance Reliability Rate */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Shift Reliability Rate
            </span>
            <div className="p-2 rounded-lg bg-teal-50 text-teal-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{avgAttendance}%</span>
            <span className="text-xs font-medium text-emerald-600 flex items-center">
              Excellent record
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100 text-slate-500">
            <span>Certificates Issued</span>
            <span className="font-semibold text-slate-800">{certificates.length} granted</span>
          </div>
        </div>
      </div>

      {/* Urgent Leader Action Bar */}
      {(pendingHoursVolunteers.length > 0 || pendingClearanceVolunteers.length > 0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-900">
                Leader Action Required ({pendingHoursVolunteers.length + pendingClearanceVolunteers.length} items)
              </h3>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                {pendingHoursVolunteers.length} volunteer(s) have submitted {totalPendingHours} service hours awaiting your verification. {pendingClearanceVolunteers.length} recruit(s) are awaiting background check approval.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            {pendingHoursVolunteers.length > 0 && (
              <button
                onClick={() => onSelectTab('roster')}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              >
                Review & Verify Hours &rarr;
              </button>
            )}
            <button
              onClick={() => onSelectTab('roster')}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-amber-900 border border-amber-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Open Roster Admin
            </button>
          </div>
        </div>
      )}

      {/* 2-Column Grid: Coordinated Upcoming Events & Recent Recognition */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Upcoming Events with Slot Tracking */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Active Shift Coordination</h2>
              <p className="text-xs text-slate-500">Live roster capacity & leader supervisor status</p>
            </div>
            <button
              onClick={() => onSelectTab('scheduling')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Full Schedule Tool</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {upcomingShifts.map((shift) => {
              const filledSlots = shift.assignedVolunteerIds?.length || 0;
              const requiredCount = shift.requiredVolunteers || 1;
              const pctFilled = Math.min(100, Math.round((filledSlots / requiredCount) * 100));
              const isFull = filledSlots >= (shift.requiredVolunteers || 0);

              return (
                <div
                  key={shift.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all bg-slate-50/40"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{shift.title}</span>
                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-slate-200 text-slate-700">
                          {shift.category}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>📅 {shift.date} • {shift.startTime} - {shift.endTime}</span>
                        <span>📍 {shift.location.split('-')[0]}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-800">
                          {filledSlots} / {shift.requiredVolunteers} Volunteers
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {isFull ? (
                            <span className="text-emerald-600 font-semibold">Fully Staffed</span>
                          ) : (
                            <span className="text-amber-600 font-semibold">
                              {shift.requiredVolunteers - filledSlots} spots open
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => onSelectTab('scheduling')}
                        className="px-2.5 py-1.5 text-xs font-semibold bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 rounded-lg transition-colors cursor-pointer"
                      >
                        Manage Roster
                      </button>
                    </div>
                  </div>

                  {/* Progress bar for roster fullness */}
                  <div className="mt-3 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFull ? 'bg-emerald-500' : pctFilled >= 50 ? 'bg-teal-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${pctFilled}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Volunteer Recognition & Leader Milestones */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Milestone Honors</h2>
                <p className="text-xs text-slate-500">Accredited service recognition</p>
              </div>
              <button
                onClick={() => onSelectTab('recognition')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Certificates</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {certificates.map((cert) => (
                <div key={cert.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {cert.volunteerName}
                    </div>
                    <div className="text-[11px] text-emerald-700 font-semibold">
                      {cert.hours} Hours Official Certificate
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Issued {cert.issuedDate} • {cert.certificateNumber}
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Prompt to Award */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 text-xs">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-700" />
                  <span>Eligible for 50-Hour Badge</span>
                </div>
                <p className="text-emerald-800 text-[11px] mt-1">
                  Marcus Vance has verified 58 hours. Issue official appreciation letter and Silver Pillar badge.
                </p>
                <button
                  onClick={() => onSelectTab('recognition')}
                  className="mt-2.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[11px] font-semibold cursor-pointer"
                >
                  Issue Recognition Now
                </button>
              </div>
            </div>
          </div>

          {/* Leader Audit Trail Indicator */}
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Admin Signatory: Sarah Jenkins
            </span>
            <span className="text-[11px] text-slate-400">Non-Profit Accredited</span>
          </div>
        </div>
      </div>
    </div>
  );
};
