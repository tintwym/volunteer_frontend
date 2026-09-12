'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Hourglass, 
  Search, 
  Filter, 
  Download, 
  PlusCircle, 
  FileSpreadsheet, 
  ShieldCheck,
  TrendingUp,
  Award
} from 'lucide-react';
import { ServiceRecord, VolunteerProfile } from '../types';

interface ReportsHoursViewProps {
  profile: VolunteerProfile;
  serviceRecords: ServiceRecord[];
  onOpenLogHours: () => void;
  setActiveTab: (tab: string) => void;
}

export const ReportsHoursView: React.FC<ReportsHoursViewProps> = ({
  profile,
  serviceRecords,
  onOpenLogHours,
  setActiveTab
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Verified total and pending total
  const verifiedRecords = serviceRecords.filter(r => r.status === 'verified');
  const pendingRecords = serviceRecords.filter(r => r.status === 'pending');
  const totalVerifiedHours = verifiedRecords.reduce((sum, r) => sum + r.hours, 0);
  const totalPendingHours = pendingRecords.reduce((sum, r) => sum + r.hours, 0);

  // Economic valuation based on Independent Sector volunteer rate ($31.80/hr in US)
  const economicValue = Math.round(totalVerifiedHours * 31.80);

  // Category breakdown calculation
  const categoryHours: Record<string, number> = {};
  verifiedRecords.forEach(r => {
    categoryHours[r.category] = (categoryHours[r.category] || 0) + r.hours;
  });

  const categoryList = Object.entries(categoryHours).map(([cat, hrs]) => ({
    name: cat,
    hours: hrs,
    percentage: Math.round((hrs / totalVerifiedHours) * 100)
  })).sort((a, b) => b.hours - a.hours);

  // Monthly breakdown
  const monthlyData = [
    { month: 'Apr 2026', hours: 4.0, shifts: 1 },
    { month: 'May 2026', hours: 10.0, shifts: 2 },
    { month: 'Jun 2026', hours: 9.0, shifts: 2 },
    { month: 'Jul 2026', hours: 14.0, shifts: 3 },
    { month: 'Aug 2026', hours: 15.5, shifts: 4 },
    { month: 'Sep 2026', hours: 4.5, shifts: 1, pending: 4.5 },
  ];

  const maxMonthHours = 20;

  // Filtered records
  const filteredRecords = serviceRecords.filter(record => {
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    const matchesSearch = 
      record.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.supervisorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.verificationCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Date', 'Event Title', 'Organization', 'Category', 'Hours', 'Status', 'Supervisor', 'Verification Code'];
    const rows = serviceRecords.map(r => [
      r.date,
      `"${r.eventTitle}"`,
      `"${r.organization}"`,
      r.category,
      r.hours,
      r.status,
      `"${r.supervisorName}"`,
      r.verificationCode
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `volunteer_service_transcript_${profile.name.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Service Hours Tracking & Engagement Metrics
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Official transcript of verified hours, community economic impact, and supervisor sign-offs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenLogHours}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log External Hours</span>
          </button>
        </div>
      </div>

      {/* 4 Impact Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Verified Hours</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {totalVerifiedHours} <span className="text-xs font-medium text-slate-500">hrs</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            100% verified by coordinators
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Verification</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Hourglass className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {totalPendingHours} <span className="text-xs font-medium text-slate-500">hrs</span>
          </div>
          <div className="mt-1 text-[11px] text-amber-700 font-medium">
            1 log submitted recently
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Economic Impact</span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ${economicValue.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Value @ $31.80/hr labor rate
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Shifts Attended</span>
            <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {verifiedRecords.length} <span className="text-xs font-medium text-slate-500">sessions</span>
          </div>
          <div className="mt-1 text-[11px] text-teal-800 font-semibold">
            0 absences / 100% reliable
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid: Category Breakdown & Monthly Hours Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Service by Cause / Category</h2>
              <p className="text-xs text-slate-500">Distribution of your {totalVerifiedHours} hours</p>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              5 Impact Sectors
            </span>
          </div>

          <div className="space-y-3">
            {categoryList.map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{cat.name}</span>
                  <span className="text-slate-500 font-medium">
                    <strong className="text-slate-900 font-bold">{cat.hours} hrs</strong> ({cat.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trend Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Monthly Volunteer Hours (2026)</h2>
              <p className="text-xs text-slate-500">Pace and consistency over the past 6 months</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-800 font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>+35% in Aug</span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
            {monthlyData.map((d) => {
              const heightPct = Math.min(100, Math.round((d.hours / maxMonthHours) * 100));
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div className="text-[11px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.hours}h
                  </div>
                  <div className="w-full max-w-[36px] bg-slate-100 rounded-t-lg relative flex flex-col justify-end overflow-hidden" style={{ height: '80%' }}>
                    <div 
                      className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all rounded-t-lg"
                      style={{ height: `${heightPct}%` }}
                      title={`${d.month}: ${d.hours} hours (${d.shifts} shifts)`}
                    />
                  </div>
                  <div className="text-[10px] font-medium text-slate-500 truncate w-full text-center">
                    {d.month.split(' ')[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Itemized Service History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table controls */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Itemized Service Records</h2>
            <p className="text-xs text-slate-500">Every session is certified with a supervisor sign-off code</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search event or supervisor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
              />
            </div>

            {/* Status filter tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${filterStatus === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
              >
                All ({serviceRecords.length})
              </button>
              <button
                onClick={() => setFilterStatus('verified')}
                className={`px-2.5 py-1 rounded-md transition-colors ${filterStatus === 'verified' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500'}`}
              >
                Verified ({verifiedRecords.length})
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-2.5 py-1 rounded-md transition-colors ${filterStatus === 'pending' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-500'}`}
              >
                Pending ({pendingRecords.length})
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Event & Organization</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Hours</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Supervisor & Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-medium whitespace-nowrap text-slate-900">
                    {record.date}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{record.eventTitle}</div>
                    <div className="text-[11px] text-slate-400">{record.organization}</div>
                    {record.notes && (
                      <div className="text-[10px] text-slate-500 italic mt-0.5 line-clamp-1">
                        "{record.notes}"
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {record.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-950 text-sm whitespace-nowrap">
                    +{record.hours}h
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {record.status === 'verified' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        <Hourglass className="w-3 h-3" />
                        Pending Sign-off
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-900">{record.supervisorName}</div>
                    <div className="font-mono text-[10px] text-slate-400">{record.verificationCode}</div>
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
