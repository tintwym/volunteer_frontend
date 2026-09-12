'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  AlertTriangle,
  Plus,
  Clock,
  CheckCircle2,
  AlertOctagon,
  ShieldAlert,
  MapPin,
  X,
  Send,
  Filter,
  Check
} from 'lucide-react';
import { IncidentReport, IncidentCategory, IncidentSeverity, IncidentStatus, Volunteer } from '../types';

interface IncidentReportingViewProps {
  incidents: IncidentReport[];
  volunteers: Volunteer[];
  onReportIncident: (incident: Omit<IncidentReport, 'id' | 'timestamp' | 'status'>) => void;
  onEscalateIncident: (incidentId: string) => void;
  onResolveIncident: (incidentId: string, resolutionNote: string) => void;
}

export const IncidentReportingView: React.FC<IncidentReportingViewProps> = ({
  incidents,
  volunteers,
  onReportIncident,
  onEscalateIncident,
  onResolveIncident
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Open' | 'Resolved'>('All');

  // Form State
  const [category, setCategory] = useState<IncidentCategory>('Equipment / Supplies');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<IncidentSeverity>('Medium');
  const [location, setLocation] = useState('Main Entrance - Counter B');
  const [affectedVolunteerId, setAffectedVolunteerId] = useState('');
  const [leaderNotes, setLeaderNotes] = useState('');

  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [resolutionInput, setResolutionInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const affectedVol = volunteers.find(v => v.id === affectedVolunteerId);

    onReportIncident({
      category,
      title,
      description,
      severity,
      affectedTeam: 'Team Alpha - Registration',
      affectedVolunteerId: affectedVol?.id,
      affectedVolunteerName: affectedVol?.name,
      location,
      reportedBy: 'Sarah Jenkins (Leader)',
      notes: leaderNotes
    });

    setShowCreateModal(false);
    setTitle('');
    setDescription('');
    setLeaderNotes('');
  };

  const handleConfirmResolve = (incidentId: string) => {
    if (!resolutionInput.trim()) return;
    onResolveIncident(incidentId, resolutionInput.trim());
    setResolvingId(null);
    setResolutionInput('');
  };

  const filteredIncidents = incidents.filter(i => {
    if (filterStatus === 'Open') return i.status !== 'Resolved';
    if (filterStatus === 'Resolved') return i.status === 'Resolved';
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Incident Reporting & Safety</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
              Leader-Organiser Escalation Channel
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Report operational bottlenecks, equipment failures, medical situations, and staffing shortages directly to the Lead Organiser.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Report New Incident</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold">
          {(['All', 'Open', 'Resolved'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterStatus === tab ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab} Incidents ({tab === 'All' ? incidents.length : tab === 'Open' ? incidents.filter(i => i.status !== 'Resolved').length : incidents.filter(i => i.status === 'Resolved').length})
            </button>
          ))}
        </div>
      </div>

      {/* Incidents List */}
      <div className="space-y-4">
        {filteredIncidents.map((incident) => {
          const isResolved = incident.status === 'Resolved';

          return (
            <div
              key={incident.id}
              className={`p-6 rounded-2xl border transition-all bg-white shadow-xs ${
                incident.severity === 'Critical'
                  ? 'border-rose-300 ring-2 ring-rose-400/20'
                  : isResolved
                  ? 'border-slate-200 opacity-80'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Severity Badge */}
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        incident.severity === 'Critical'
                          ? 'bg-rose-600 text-white'
                          : incident.severity === 'High'
                          ? 'bg-rose-100 text-rose-800'
                          : incident.severity === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {incident.severity} Severity
                    </span>

                    {/* Category */}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {incident.category}
                    </span>

                    {/* Status */}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isResolved
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      Status: {incident.status}
                    </span>

                    <span className="text-[11px] text-slate-400 flex items-center gap-1 ml-auto">
                      <Clock className="w-3 h-3" />
                      {incident.timestamp}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{incident.title}</h3>
                  <p className="text-xs text-slate-700 leading-relaxed max-w-3xl">
                    {incident.description}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      Location: <strong className="text-slate-700">{incident.location}</strong>
                    </span>

                    {incident.affectedVolunteerName && (
                      <span className="font-medium">
                        Affected Team Member: <strong className="text-slate-700">{incident.affectedVolunteerName}</strong>
                      </span>
                    )}

                    <span>Reported by: <strong className="text-slate-700">{incident.reportedBy}</strong></span>
                  </div>

                  {/* Leader Notes */}
                  {incident.notes && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 mt-2">
                      <strong className="text-slate-800">Leader Action Note:</strong> {incident.notes}
                    </div>
                  )}

                  {/* Organiser Response */}
                  {incident.organiserResponse && (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-900 mt-2">
                      <strong className="text-emerald-950 font-bold">Organiser Resolution / Response:</strong> {incident.organiserResponse}
                    </div>
                  )}
                </div>

                {/* Actions Right */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
                  {!isResolved && (
                    <>
                      <button
                        onClick={() => onEscalateIncident(incident.id)}
                        className="px-3.5 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Escalate Urgent Issue
                      </button>

                      {resolvingId === incident.id ? (
                        <div className="space-y-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
                          <input
                            type="text"
                            placeholder="Resolution notes..."
                            value={resolutionInput}
                            onChange={(e) => setResolutionInput(e.target.value)}
                            className="p-1.5 text-xs border border-slate-300 rounded-md w-full"
                          />
                          <div className="flex items-center gap-1 text-xs">
                            <button
                              onClick={() => setResolvingId(null)}
                              className="px-2 py-1 text-slate-500"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleConfirmResolve(incident.id)}
                              className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded-md"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setResolvingId(incident.id)}
                          className="px-3.5 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark Resolved</span>
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Report Incident to Organiser</h3>
                <p className="text-xs text-slate-500 mt-0.5">Submit operational issue for immediate review</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Incident Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as IncidentCategory)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                >
                  <option value="Equipment / Supplies">Equipment / Supplies</option>
                  <option value="Staffing Shortage">Staffing Shortage</option>
                  <option value="Facility / Venue">Facility / Venue</option>
                  <option value="Medical / First Aid">Medical / First Aid</option>
                  <option value="Attendee / Conflict">Attendee / Conflict</option>
                  <option value="Safety / Hazard">Safety / Hazard</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Severity Level *</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Low', 'Medium', 'High', 'Critical'] as const).map((lvl) => (
                    <label
                      key={lvl}
                      className={`p-2 rounded-lg border text-center font-bold cursor-pointer ${
                        severity === lvl
                          ? lvl === 'Critical'
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-emerald-600 text-white border-emerald-600'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="sev"
                        checked={severity === lvl}
                        onChange={() => setSeverity(lvl)}
                        className="sr-only"
                      />
                      <span>{lvl}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Incident Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Laser scanner failure causing attendee queue backlog"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe what occurred, immediate impact on operations..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Affected Team Member</label>
                  <select
                    value={affectedVolunteerId}
                    onChange={(e) => setAffectedVolunteerId(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="">None / General Zone</option>
                    {volunteers.map(v => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Leader Action Notes</label>
                <input
                  type="text"
                  placeholder="Initial containment steps taken by Leader..."
                  value={leaderNotes}
                  onChange={(e) => setLeaderNotes(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Transmit Incident Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
