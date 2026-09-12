'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Award,
  Download,
  Printer,
  Calendar,
  Layers,
  Heart,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { ReportMetrics, User } from '../types';

interface ReportingViewProps {
  metrics?: ReportMetrics;
  currentUser?: User;
}

export const ReportingView: React.FC<ReportingViewProps> = ({
  metrics: propMetrics,
  currentUser,
}) => {
  const [timeRange, setTimeRange] = useState<'30d' | 'q3' | 'ytd' | 'all'>('ytd');

  const metrics = propMetrics || {
    totalHours: 1240,
    activeVolunteers: 185,
    totalShiftsCompleted: 312,
    fulfillmentRate: 94,
    economicImpactValue: 41527,
    retentionRate: 88,
    monthlyTrends: [],
    causeDistribution: [],
    topVolunteers: [],
  };

  // Export CSV handler
  const handleExportCSV = () => {
    const headers = 'Rank,Name,Hours_Logged,Shifts_Completed,Badges_Earned,Primary_Cause\n';
    const rows = (metrics.topVolunteers || [])
      .map(
        (v) =>
          `${v.rank},"${v.name}",${v.hours},${v.shiftsCount},${v.badgeCount},"${v.recentCause}"`
      )
      .join('\n');

    const monthlyHeader = '\n\nMonth,Hours_Served,Volunteers_Participating,Economic_Value_USD\n';
    const monthlyRows = (metrics.monthlyTrends || [])
      .map((m) => `${m.month},${m.hours},${m.volunteers},${m.economicValue}`)
      .join('\n');

    const blob = new Blob([headers + rows + monthlyHeader + monthlyRows], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `HopeHarbor_Volunteer_Report_${timeRange.toUpperCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  // Find max monthly hours to scale bar heights
  const maxMonthHours = Math.max(...(metrics.monthlyTrends || []).map((m) => m.hours), 1);

  return (
    <div id="reporting-container" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Volunteer Analytics & Impact Dashboard
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Verified 2026 Audit
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Real-time accounting of collective service hours, municipal economic value creation, shift fulfillment rates, and community engagement trends.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Time range selector */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === '30d' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Past 30 Days
            </button>
            <button
              onClick={() => setTimeRange('q3')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === 'q3' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Q3 2026
            </button>
            <button
              onClick={() => setTimeRange('ytd')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === 'ytd' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Year-to-Date
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs"
            title="Download CSV report"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs"
            title="Print Executive Summary"
          >
            <Printer className="w-4 h-4 text-slate-300" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Hours */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Service Hours
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {metrics.totalHours.toLocaleString()}
            <span className="text-xs text-slate-400 font-medium ml-1">hrs</span>
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs same period last year</span>
          </div>
        </div>

        {/* Economic Value */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Economic Impact Value
            </span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            ${Math.round(metrics.economicImpactValue).toLocaleString()}
          </p>
          <div className="text-[11px] text-slate-500">
            Benchmarked at <strong>$33.49/hr</strong> standard value
          </div>
        </div>

        {/* Active Volunteers */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Active Volunteer Pool
            </span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {metrics.activeVolunteers}
            <span className="text-xs text-slate-400 font-medium ml-1">volunteers</span>
          </p>
          <div className="text-[11px] text-slate-500">
            <strong>{metrics.retentionRate}%</strong> 6-month volunteer retention rate
          </div>
        </div>

        {/* Fulfillment Rate */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Shift Fulfillment Rate
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {metrics.fulfillmentRate}%
          </p>
          <div className="text-[11px] text-slate-500">
            Across <strong>{metrics.totalShiftsCompleted}</strong> completed community sessions
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Hours Trend Chart (SVG/Visual Bar Chart) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Monthly Hours Logged (2026 Trend)
                </h2>
                <p className="text-xs text-slate-500">
                  Monthly volunteer service hours delivered to municipal initiatives
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-3 h-3 rounded bg-emerald-600 inline-block" /> Hours
              </div>
            </div>

            {/* Custom Bar Graph */}
            <div className="pt-8 pb-4">
              <div className="h-56 flex items-end justify-between gap-3 px-2 border-b border-slate-200">
                {metrics.monthlyTrends.map((item, idx) => {
                  const heightPercent = Math.min(100, Math.round((item.hours / 900) * 100));
                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center gap-2 group relative h-full justify-end"
                    >
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-lg pointer-events-none whitespace-nowrap shadow-md z-10">
                        <p className="font-bold">{item.hours} Hours</p>
                        <p className="text-slate-300">{item.volunteers} Volunteers</p>
                      </div>

                      <div
                        className="w-full max-w-[36px] bg-gradient-to-t from-emerald-700 to-teal-500 rounded-t-lg transition-all group-hover:from-emerald-600 group-hover:to-teal-400"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* X Axis labels */}
              <div className="flex justify-between gap-3 px-2 pt-2 text-[11px] font-semibold text-slate-500">
                {metrics.monthlyTrends.map((item, idx) => (
                  <span key={idx} className="flex-1 text-center truncate">
                    {item.month}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span>Average hours per volunteer per month: <strong>13.8 hrs</strong></span>
            <span className="text-emerald-700 font-semibold">Consistently beating 2026 targets</span>
          </div>
        </div>

        {/* Cause / Program Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">
                Hours by Cause Focus
              </h2>
              <p className="text-xs text-slate-500">
                Distribution of community impact across focus areas
              </p>
            </div>

            <div className="space-y-4 pt-4">
              {metrics.causeDistribution.map((cause) => (
                <div key={cause.cause} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: cause.color }}
                      />
                      {cause.cause}
                    </span>
                    <span className="text-slate-500">
                      {cause.hours} hrs ({cause.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${cause.percentage}%`,
                        backgroundColor: cause.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
            Food security and environmental restoration account for <strong>64.9%</strong> of all mobilized volunteer hours.
          </div>
        </div>
      </div>

      {/* Top Volunteer Leaderboard */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              2026 Volunteer Hall of Fame & Leaderboard
            </h2>
            <p className="text-xs text-slate-500">
              Top service contributors recognized for remarkable dedication and consistency
            </p>
          </div>
          <span className="text-xs text-slate-400 font-semibold">Updated today</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-3 px-3">Rank</th>
                <th className="pb-3 px-3">Volunteer</th>
                <th className="pb-3 px-3">Total Hours Logged</th>
                <th className="pb-3 px-3">Shifts Completed</th>
                <th className="pb-3 px-3">Badges Earned</th>
                <th className="pb-3 px-3">Primary Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {metrics.topVolunteers.map((vol) => (
                <tr
                  key={vol.id}
                  className={`hover:bg-slate-50 transition-colors ${
                    vol.id === currentUser.id ? 'bg-emerald-50/50' : ''
                  }`}
                >
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs ${
                        vol.rank === 1
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : vol.rank === 2
                          ? 'bg-slate-200 text-slate-800'
                          : vol.rank === 3
                          ? 'bg-amber-700/10 text-amber-900'
                          : 'text-slate-500'
                      }`}
                    >
                      {vol.rank}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={vol.avatar}
                        alt={vol.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <p className="font-bold text-slate-900">
                          {vol.name}
                          {vol.id === currentUser.id && (
                            <span className="ml-2 text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded">
                              YOU
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-900">
                    {vol.hours} hrs
                  </td>
                  <td className="py-3.5 px-3 text-slate-600">
                    {vol.shiftsCount} shifts
                  </td>
                  <td className="py-3.5 px-3 text-slate-600">
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold text-[11px]">
                      🏆 {vol.badgeCount} Badges
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 font-medium">
                    {vol.recentCause}
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
