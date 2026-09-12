'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  PlusCircle, 
  MapPin, 
  Clock, 
  Lock, 
  CheckCircle2, 
  Flame, 
  Activity, 
  LifeBuoy,
  FileSpreadsheet
} from 'lucide-react';
import { IncidentReport, IncidentCategory, IncidentUrgency } from '../types';

interface IncidentReportingViewProps {
  incidents: IncidentReport[];
  onSubmitIncident: (report: Omit<IncidentReport, 'id' | 'submittedDate' | 'status'>) => void;
}

export const IncidentReportingView: React.FC<IncidentReportingViewProps> = ({
  incidents,
  onSubmitIncident
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [category, setCategory] = useState<IncidentCategory>('Safety issue');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState<IncidentUrgency>('Medium');
  const [isRestrictedAccess, setIsRestrictedAccess] = useState(false);
  const [incidentTime, setIncidentTime] = useState('Just now (08:55 AM)');
  const [submittedToast, setSubmittedToast] = useState(false);

  const categories: IncidentCategory[] = [
    'Safety issue',
    'Medical emergency',
    'Lost item',
    'Equipment problem',
    'Conflict',
    'Harassment/misconduct',
    'Venue problem'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !location.trim()) return;

    onSubmitIncident({
      category,
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      urgency,
      isRestrictedAccess,
      incidentTime
    });

    setIsFormOpen(false);
    setTitle('');
    setDescription('');
    setLocation('');
    setIsRestrictedAccess(false);
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {submittedToast && (
        <div className="bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between text-xs font-semibold animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span>Incident report filed and logged with Event Operations.</span>
          </div>
          <button onClick={() => setSubmittedToast(false)} className="text-white/70 hover:text-white underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-red-700 font-semibold text-xs tracking-wider uppercase mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>Section 3.13 • On-Site Incident & Hazard Log</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Volunteer Incident Reporting</h1>
            <p className="text-sm text-slate-600 mt-1">
              Log operational hazards, medical situations, broken gear, or sensitive concerns directly with event directors.
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm shadow-red-200 self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report New Incident</span>
          </button>
        </div>

        {/* Emergency disclaimer banner */}
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-900">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Life Safety Immediate Notice:</span> For active medical emergencies, fires, or physical threats, call 911 immediately or notify nearby festival security before filing an in-app report.
          </div>
        </div>
      </div>

      {/* Incidents List */}
      <div className="space-y-4">
        {incidents.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <p className="font-semibold text-slate-700">No active incidents reported</p>
            <p className="text-xs text-slate-400 mt-1">All venue sectors operating under standard parameters.</p>
          </div>
        ) : (
          incidents.map((inc) => {
            const isCritical = inc.urgency === 'Critical';
            const isHigh = inc.urgency === 'High';
            const isResolved = inc.status === 'Resolved' || inc.status === 'Closed';

            return (
              <div
                key={inc.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 shadow-xs space-y-3 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded">
                      {inc.category}
                    </span>

                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isCritical
                        ? 'bg-red-600 text-white animate-pulse'
                        : isHigh
                        ? 'bg-red-100 text-red-800'
                        : inc.urgency === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {inc.urgency} Urgency
                    </span>

                    {inc.isRestrictedAccess && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Restricted Access
                      </span>
                    )}

                    <span className="text-xs text-slate-400">• {inc.submittedDate}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    isResolved 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {inc.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{inc.title}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {inc.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 pt-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate"><strong>Location:</strong> {inc.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span><strong>Observed at:</strong> {inc.incidentTime}</span>
                  </div>
                </div>

                {inc.resolutionNotes && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-0.5">
                    <span className="font-bold block">Resolution / Remediation Action:</span>
                    <p className="text-emerald-800">{inc.resolutionNotes}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Report Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <h3 className="text-base font-bold text-slate-900">File Operational Incident Report</h3>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Incident Category:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as IncidentCategory)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Incident Title / Summary:</label>
                <input
                  type="text"
                  placeholder="e.g. Water leak near Gate 2 electrical hub, lost backpack found..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Exact Location on Venue Grounds:</label>
                <input
                  type="text"
                  placeholder="e.g. Gate 2 turnstiles, 10 meters north of main info tent"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Comprehensive Description of Situation:</label>
                <textarea
                  rows={3}
                  placeholder="Describe what happened, any persons involved, immediate actions taken..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Urgency Level:</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as IncidentUrgency)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Low">Low (Informational)</option>
                    <option value="Medium">Medium (Attention Required)</option>
                    <option value="High">High (Immediate Action)</option>
                    <option value="Critical">Critical (Life Safety / Immediate Threat)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Time of Incident:</label>
                  <input
                    type="text"
                    value={incidentTime}
                    onChange={(e) => setIncidentTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Sensitive report protection checkbox */}
              <div className="p-3 bg-slate-100 rounded-xl flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="restrictedAccessCheck"
                  checked={isRestrictedAccess}
                  onChange={(e) => setIsRestrictedAccess(e.target.checked)}
                  className="accent-slate-900 mt-0.5"
                />
                <label htmlFor="restrictedAccessCheck" className="text-[11px] text-slate-700">
                  <strong>Restricted Access & Confidentiality Tag:</strong> Check if this report involves sensitive misconduct, harassment, or personal safety. Only Lead Organisers will have view access.
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors shadow-xs shadow-red-200"
                >
                  Submit Incident to Operations
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
