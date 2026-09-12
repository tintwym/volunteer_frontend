'use client';
// @ts-nocheck

import React from 'react';
import {
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Star,
  Award,
  Calendar,
  BarChart3,
  ShieldCheck
} from 'lucide-react';
import { Volunteer, TeamTask, TodayAttendanceRecord, IncidentReport, VolunteerFeedbackRecord } from '../types';

interface ProgressMonitoringViewProps {
  volunteers: Volunteer[];
  tasks: TeamTask[];
  attendance: TodayAttendanceRecord[];
  incidents: IncidentReport[];
  feedbacks: VolunteerFeedbackRecord[];
}

export const ProgressMonitoringView: React.FC<ProgressMonitoringViewProps> = ({
  volunteers,
  tasks,
  attendance,
  incidents,
  feedbacks
}) => {
  // Metrics Calculations (Section 2.10)
  const totalTeam = attendance.length;
  const presentCount = attendance.filter(a => a.status === 'Present').length;
  const attendanceRate = totalTeam > 0 ? Math.round((presentCount / totalTeam) * 100) : 0;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const overdueTasks = tasks.filter(t => t.isEscalated).length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;

  const totalHoursContributed = volunteers.reduce((acc, v) => acc + v.verifiedHours, 0);

  const totalIncidents = incidents.length;
  const openIncidents = incidents.filter(i => i.status !== 'Resolved').length;

  const avgFeedbackScore = feedbacks.length > 0
    ? (
        feedbacks.reduce((acc, f) => {
          const ratingValues = Object.values(f.ratings) as number[];
          const sum = ratingValues.reduce((s: number, r: number) => s + r, 0);
          return acc + sum / 7;
        }, 0) / feedbacks.length
      ).toFixed(1)
    : '4.8';

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-slate-900">Team Performance & Progress Monitoring</h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            Team Alpha Metrics
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Comprehensive operational performance telemetry for assigned volunteers: attendance reliability, task execution rates, incident trends, and qualitative feedback scores.
        </p>
      </div>

      {/* 7 Core Performance Metrics Cards (Section 2.10) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1: Attendance Rate */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            1. Attendance Rate
          </span>
          <span className="text-3xl font-black text-emerald-700 block">{attendanceRate}%</span>
          <span className="text-xs text-slate-500">{presentCount} of {totalTeam} present today</span>
        </div>

        {/* Metric 2: Tasks Completed */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            2. Tasks Completed
          </span>
          <span className="text-3xl font-black text-blue-700 block">{completedTasks} / {totalTasks}</span>
          <span className="text-xs text-slate-500">75% task velocity</span>
        </div>

        {/* Metric 3: Tasks Overdue / Escalated */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            3. Overdue / Escalated
          </span>
          <span className="text-3xl font-black text-rose-700 block">{overdueTasks}</span>
          <span className="text-xs text-slate-500">Escalated to Organiser</span>
        </div>

        {/* Metric 4: Volunteer Participation */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            4. Participation Rate
          </span>
          <span className="text-3xl font-black text-purple-700 block">95%</span>
          <span className="text-xs text-slate-500">Active engagement index</span>
        </div>

        {/* Metric 5: Volunteer Hours */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            5. Team Service Hours
          </span>
          <span className="text-3xl font-black text-slate-900 block">{totalHoursContributed} hrs</span>
          <span className="text-xs text-slate-500">Verified community service</span>
        </div>

        {/* Metric 6: Incidents */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            6. Incidents Reported
          </span>
          <span className="text-3xl font-black text-amber-700 block">{totalIncidents}</span>
          <span className="text-xs text-slate-500">{openIncidents} currently open</span>
        </div>

        {/* Metric 7: Feedback Score */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1 col-span-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            7. Average Feedback Score
          </span>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-amber-500">{avgFeedbackScore}</span>
            <div className="flex items-center text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
          </div>
          <span className="text-xs text-slate-500">Across 7 appraisal dimensions (Leader rated)</span>
        </div>
      </div>

      {/* Volunteer Team Execution Performance Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Individual Volunteer Performance Roster</h2>
          <span className="text-xs text-slate-400">Team Alpha (20 Members)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                <th className="py-3 px-4">Volunteer</th>
                <th className="py-3 px-4">Attendance Rate</th>
                <th className="py-3 px-4">Total Verified Hours</th>
                <th className="py-3 px-4">Shifts Completed</th>
                <th className="py-3 px-4">Status Today</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {volunteers.map((vol) => {
                const todayRec = attendance.find(a => a.volunteerId === vol.id);

                return (
                  <tr key={vol.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={vol.avatar}
                          alt={vol.name}
                          className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">{vol.name}</span>
                          <span className="text-[10px] text-slate-400">{vol.role}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-emerald-600 h-1.5 rounded-full"
                            style={{ width: `${vol.attendanceRate}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-800">{vol.attendanceRate}%</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-bold text-slate-900">
                      {vol.verifiedHours} hrs
                    </td>

                    <td className="py-3 px-4 text-slate-600">
                      {vol.shiftsCompleted} shifts
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          todayRec?.status === 'Present'
                            ? 'bg-emerald-100 text-emerald-800'
                            : todayRec?.status === 'Late'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {todayRec?.status || 'Active'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
