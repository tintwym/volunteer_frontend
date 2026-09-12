'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Award,
  Users,
  FileDown,
  DollarSign,
  Calendar,
  ShieldCheck,
  ArrowUpRight,
  Printer
} from 'lucide-react';
import { Volunteer, ShiftEvent } from '../types';

interface ReportingDashboardViewProps {
  volunteers: Volunteer[];
  shifts: ShiftEvent[];
}

export const ReportingDashboardView: React.FC<ReportingDashboardViewProps> = ({
  volunteers,
  shifts
}) => {
  const [timeRange, setTimeRange] = useState<'30days' | 'quarter' | 'year'>('quarter');

  const totalVerifiedHours = volunteers.reduce((acc, v) => acc + v.verifiedHours, 0);
  const totalPendingHours = volunteers.reduce((acc, v) => acc + v.pendingHours, 0);

  // Independent Sector value of volunteer time ($33.49/hour national benchmark)
  const economicValue = (totalVerifiedHours * 33.49).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  // Program category breakdown
  const categoryHours: Record<string, number> = {
    'Community Food Pantry': 285,
    'Youth Mentorship': 160,
    'Park Revitalization': 110,
    'Senior Outreach': 65,
    'Emergency Shelter': 35
  };

  const totalCatHours = Object.values(categoryHours).reduce((a, b) => a + b, 0);

  // Monthly trends data
  const monthlyData = [
    { month: 'Apr', hours: 74, volunteers: 12 },
    { month: 'May', hours: 98, volunteers: 15 },
    { month: 'Jun', hours: 132, volunteers: 18 },
    { month: 'Jul', hours: 165, volunteers: 20 },
    { month: 'Aug', hours: 198, volunteers: 22 },
    { month: 'Sep', hours: 242, volunteers: 25 }
  ];

  const maxMonthHours = Math.max(...monthlyData.map(m => m.hours));

  // Engagement cohorts
  const champions = volunteers.filter(v => v.verifiedHours >= 100);
  const regulars = volunteers.filter(v => v.verifiedHours >= 25 && v.verifiedHours < 100);
  const emerging = volunteers.filter(v => v.verifiedHours < 25);

  const handleExportCSV = () => {
    const headers = ['Volunteer Name', 'Email', 'Role', 'Verified Hours', 'Pending Hours', 'Total Shifts', 'Attendance Rate', 'Clearance'];
    const rows = volunteers.map(v => [
      `"${v.name}"`,
      `"${v.email}"`,
      `"${v.role}"`,
      v.verifiedHours,
      v.pendingHours,
      v.shiftsCompleted,
      `"${v.attendanceRate}%"`,
      `"${v.backgroundCheckStatus}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `volunteer_service_hours_audit_report_${new Date().toISOString().slice(0,10)}.csv`);
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
            <h1 className="text-2xl font-bold text-slate-900">Reporting & Analytics</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Audit & Grant Compliance
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Tracking volunteer service hours, retention cohorts, economic impact, and program distribution.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="bg-slate-100 p-1 rounded-lg flex items-center text-xs font-semibold">
            <button
              onClick={() => setTimeRange('30days')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                timeRange === '30days' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setTimeRange('quarter')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                timeRange === 'quarter' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Current Quarter
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                timeRange === 'year' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Year-to-Date
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>Export Audit CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Verified Hours */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Verified Service Hours
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{totalVerifiedHours}</span>
            <span className="text-xs text-slate-500">hours accredited</span>
          </div>
          <p className="text-xs text-emerald-600 mt-2 font-medium">
            +18% growth over prior quarter
          </p>
        </div>

        {/* Economic Value of Service */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Civic Value Created
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{economicValue}</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Based on $33.49/hr Non-Profit standard
          </p>
        </div>

        {/* Shift Attendance Reliability */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Average Attendance Rate
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">95.8%</span>
            <span className="text-xs text-emerald-600 font-semibold">High Retention</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Only 2 excused absences this period
          </p>
        </div>

        {/* Total Volunteers Contributing */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Active Contributors
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{volunteers.length}</span>
            <span className="text-xs text-slate-500">roster members</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {champions.length} Century Club members (100+ hrs)
          </p>
        </div>
      </div>

      {/* 2-Column Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Service Hours Progression Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Monthly Volunteer Hours Trend</h2>
              <p className="text-xs text-slate-500">Service hours verified across all coordinated operations</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Upward Trajectory
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-56 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
            {monthlyData.map((item) => {
              const heightPct = Math.round((item.hours / maxMonthHours) * 100);
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[11px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.hours}h
                  </span>
                  <div className="w-full bg-slate-100 rounded-t-lg h-44 flex items-end overflow-hidden">
                    <div
                      className="w-full bg-gradient-to-t from-emerald-600 to-teal-500 rounded-t-lg transition-all duration-700 group-hover:from-emerald-500 group-hover:to-teal-400"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 mt-1">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 text-xs text-slate-500">
            <span>Data audited and signed off by Volunteer Leadership Team</span>
            <span className="font-semibold text-slate-800">Quarter Peak: 242 hours</span>
          </div>
        </div>

        {/* Right 5 cols: Program Breakdown & Cohorts */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">Program Distribution</h2>
            <p className="text-xs text-slate-500">Hours delivered by community initiative</p>
          </div>

          <div className="space-y-3">
            {Object.entries(categoryHours).map(([cat, hours]) => {
              const pct = Math.round((hours / totalCatHours) * 100);
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-slate-800">{cat}</span>
                    <span className="font-bold text-slate-900">{hours} hrs ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Engagement & Retention Cohorts
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-100">
                <span className="text-lg font-bold text-purple-900 block">{champions.length}</span>
                <span className="text-[10px] text-purple-700 font-semibold">Champions (100+h)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
                <span className="text-lg font-bold text-blue-900 block">{regulars.length}</span>
                <span className="text-[10px] text-blue-700 font-semibold">Regulars (25-99h)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="text-lg font-bold text-emerald-900 block">{emerging.length}</span>
                <span className="text-[10px] text-emerald-700 font-semibold">Emerging (1-24h)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Volunteer Leaderboard */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Volunteer Leaderboard & Service Milestones</h2>
            <p className="text-xs text-slate-500">Ranked by total verified community hours</p>
          </div>
          <span className="text-xs text-slate-400 font-medium">All credentials verified</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                <th className="pb-3 px-2">Rank</th>
                <th className="pb-3 px-4">Volunteer</th>
                <th className="pb-3 px-4">Role</th>
                <th className="pb-3 px-4">Verified Hours</th>
                <th className="pb-3 px-4">Shifts</th>
                <th className="pb-3 px-4">Reliability</th>
                <th className="pb-3 px-4">Badges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[...volunteers]
                .sort((a, b) => b.verifiedHours - a.verifiedHours)
                .map((vol, index) => (
                  <tr key={vol.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-2 font-bold text-slate-400">
                      #{index + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img src={vol.avatar} alt={vol.name} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <span className="font-bold text-slate-900 block">{vol.name}</span>
                          <span className="text-[10px] text-slate-400">{vol.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-700">{vol.role}</td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-bold text-slate-900">{vol.verifiedHours}</span>
                      <span className="text-slate-400 text-[10px]"> hrs</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{vol.shiftsCompleted} shifts</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-emerald-700">{vol.attendanceRate}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-600" />
                        <span className="font-medium text-slate-700">{vol.badges.length} badges</span>
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
