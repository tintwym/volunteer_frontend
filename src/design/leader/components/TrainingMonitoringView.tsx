'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Send,
  ShieldCheck,
  Search,
  BookOpen,
  Filter,
  Check,
  AlertOctagon
} from 'lucide-react';
import { TrainingModule, VolunteerTrainingStatus, Volunteer } from '../types';

interface TrainingMonitoringViewProps {
  modules: TrainingModule[];
  volunteerTraining: VolunteerTrainingStatus[];
  volunteers: Volunteer[];
  onSendReminder: (volunteerName: string, moduleTitle: string) => void;
  onReportTrainingIssueToOrganiser: (volunteerName: string, reason: string) => void;
}

export const TrainingMonitoringView: React.FC<TrainingMonitoringViewProps> = ({
  modules,
  volunteerTraining,
  volunteers,
  onSendReminder,
  onReportTrainingIssueToOrganiser
}) => {
  const [activeTab, setActiveTab] = useState<'roster' | 'modules'>('roster');
  const [filterOverdueOnly, setFilterOverdueOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [reminderToast, setReminderToast] = useState<string | null>(null);

  const handleTriggerReminder = (volunteerName: string, moduleTitle: string) => {
    onSendReminder(volunteerName, moduleTitle);
    setReminderToast(`Automated training reminder email sent to ${volunteerName} for "${moduleTitle}"`);
    setTimeout(() => setReminderToast(null), 3500);
  };

  const handleReportIssue = (volunteerName: string, moduleTitle: string) => {
    onReportTrainingIssueToOrganiser(volunteerName, `Uncompleted prerequisite module: ${moduleTitle}`);
    setReminderToast(`Reported training blocker for ${volunteerName} to Lead Organiser`);
    setTimeout(() => setReminderToast(null), 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Training & Readiness Monitoring</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              Team Readiness Supervision
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Ensure all 20 team members meet mandatory safety, registration software, and accessibility standards prior to active duty.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold">
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'roster' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Volunteer Roster Readiness
          </button>
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'modules' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Curriculum & Requirements ({modules.length})
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {reminderToast && (
        <div className="p-3 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow-md flex items-center justify-between animate-fade-in">
          <span>{reminderToast}</span>
          <button onClick={() => setReminderToast(null)} className="text-white/80 hover:text-white">
            &times;
          </button>
        </div>
      )}

      {activeTab === 'roster' ? (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search volunteer readiness..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white"
              />
            </div>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={filterOverdueOnly}
                onChange={(e) => setFilterOverdueOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Show Overdue & Incomplete Only</span>
            </label>
          </div>

          {/* Volunteer Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {volunteers
              .filter(v => v.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((vol) => {
                const records = volunteerTraining.filter(vt => vt.volunteerId === vol.id);
                const hasOverdue = records.some(r => r.status === 'Overdue');
                const allCompleted = records.length > 0 && records.every(r => r.status === 'Completed');

                if (filterOverdueOnly && !hasOverdue && records.length > 0 && allCompleted) {
                  return null;
                }

                return (
                  <div
                    key={vol.id}
                    className={`p-5 rounded-2xl border bg-white shadow-xs space-y-3 ${
                      hasOverdue ? 'border-amber-300 ring-2 ring-amber-400/20' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={vol.avatar}
                          alt={vol.name}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                        />
                        <div>
                          <h3 className="text-xs font-bold text-slate-900">{vol.name}</h3>
                          <span className="text-[10px] text-slate-400 font-medium">{vol.role}</span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                          hasOverdue
                            ? 'bg-amber-100 text-amber-800'
                            : allCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {hasOverdue ? 'Action Required' : allCompleted ? 'Fully Certified' : 'Active Training'}
                      </span>
                    </div>

                    {/* Records List */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {records.length > 0 ? (
                        records.map((rec, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between gap-2"
                          >
                            <div>
                              <span className="font-semibold text-slate-800 block">
                                {rec.moduleTitle}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {rec.completedDate ? `Completed on ${rec.completedDate}` : 'Required for duty'}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                                  rec.status === 'Completed'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : rec.status === 'Overdue'
                                    ? 'bg-rose-100 text-rose-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {rec.status}
                              </span>

                              {rec.status !== 'Completed' && (
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleTriggerReminder(vol.name, rec.moduleTitle)}
                                    className="px-2 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg cursor-pointer"
                                    title="Send reminder email"
                                  >
                                    Remind
                                  </button>
                                  {rec.status === 'Overdue' && (
                                    <button
                                      onClick={() => handleReportIssue(vol.name, rec.moduleTitle)}
                                      className="px-2 py-1 text-[11px] font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg cursor-pointer"
                                      title="Report blocker to Organiser"
                                    >
                                      Report
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-slate-400 italic py-1">
                          Completed foundational orientation. No outstanding training prerequisites.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        /* Modules Tab */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((mod) => (
            <div key={mod.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      mod.isMandatory ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {mod.isMandatory ? 'Mandatory Prerequisite' : 'Elective Enrichment'}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-2">{mod.title}</h3>
                </div>
                <span className="text-xs text-slate-400 font-medium shrink-0 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {mod.durationMinutes} min
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{mod.description}</p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">
                  Category: {mod.category}
                </span>
                <span className="text-emerald-700 font-bold">Leader Supervised</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
