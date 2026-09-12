'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  ShieldAlert,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  FileText,
  Download,
  X,
  Send,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { IncidentReport, IncidentType, IncidentStatus, IncidentSeverity } from '../types';

interface IncidentManagementViewProps {
  incidents?: IncidentReport[];
  events?: any[];
  onCreateIncident?: (incident: IncidentReport) => void;
  onUpdateIncidentStatus?: (incidentId: string, status: IncidentStatus) => void;
  onUpdateStatus?: (incidentId: string, status: any) => void;
  onAddIncidentNote?: (incidentId: string, noteText: string) => void;
  onAddResolutionNote?: (incidentId: string, noteText: string) => void;
}

export const IncidentManagementView: React.FC<IncidentManagementViewProps> = ({
  incidents = [],
  onCreateIncident,
  onUpdateIncidentStatus,
  onUpdateStatus,
  onAddIncidentNote,
  onAddResolutionNote,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedIncident, setSelectedIncident] = useState<IncidentReport | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  const handleUpdateStatus = (id: string, status: IncidentStatus) => {
    if (onUpdateIncidentStatus) onUpdateIncidentStatus(id, status);
    else if (onUpdateStatus) onUpdateStatus(id, status);
  };

  const dispatchAddNote = (id: string, note: string) => {
    if (onAddIncidentNote) onAddIncidentNote(id, note);
    else if (onAddResolutionNote) onAddResolutionNote(id, note);
  };

  // Form states for Create Incident
  const [title, setTitle] = useState('');
  const [type, setType] = useState<IncidentType>('Volunteer injury');
  const [severity, setSeverity] = useState<IncidentSeverity>('Medium');
  const [location, setLocation] = useState('');
  const [assignedLeader, setAssignedLeader] = useState('Dr. Sarah Jenkins');
  const [description, setDescription] = useState('');
  const [actionTaken, setActionTaken] = useState('');

  const filteredIncidents = (incidents || []).filter((inc) => {
    const matchesSearch =
      (inc.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inc.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inc.location || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity = severityFilter === 'All' || inc.severity === severityFilter;
    const matchesStatus = statusFilter === 'All' || inc.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInc: IncidentReport = {
      id: `inc-${Date.now()}`,
      title,
      type,
      severity,
      reportedBy: 'Elena Rostova (Organiser)',
      reportedAt: 'Just now',
      assignedLeader,
      location,
      status: 'Reported',
      description,
      evidence: 'Field log documented by operations coordinator.',
      actionTaken,
      notes: [
        {
          timestamp: 'Just now',
          author: 'Elena Rostova',
          text: `Incident logged and dispatched to ${assignedLeader}.`,
        },
      ],
    };

    if (onCreateIncident) onCreateIncident(newInc);
    setIsCreateModalOpen(false);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIncident && newNoteText.trim()) {
      dispatchAddNote(selectedIncident.id, newNoteText);
      setSelectedIncident({
        ...selectedIncident,
        notes: [
          ...(selectedIncident.notes || []),
          {
            timestamp: 'Just now',
            author: 'Elena Rostova',
            text: newNoteText,
          },
        ],
      });
      setNewNoteText('');
    }
  };

  const getSeverityBadge = (sev: IncidentSeverity) => {
    switch (sev) {
      case 'Critical':
        return 'bg-rose-100 text-rose-800 border-rose-300 font-black animate-pulse';
      case 'High':
        return 'bg-amber-100 text-amber-800 border-amber-300 font-bold';
      case 'Medium':
        return 'bg-blue-100 text-blue-800 border-blue-300 font-medium';
      case 'Low':
        return 'bg-slate-100 text-slate-700 border-slate-300 font-medium';
    }
  };

  const handleExportIncidents = () => {
    const headers = 'ID,Title,Type,Severity,Status,Location,ReportedBy,ReportedAt,AssignedLeader\n';
    const rows = filteredIncidents
      .map(
        (i) =>
          `"${i.id}","${i.title}","${i.type}","${i.severity}","${i.status}","${i.location}","${i.reportedBy}","${i.reportedAt}","${i.assignedLeader}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incident_report_log_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="incident-management-view" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Incident Management & Safety Dispatch</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
              {(incidents || []).filter((i) => i.status !== 'Resolved' && i.status !== 'Closed').length} Open Incidents
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Triage operational events: volunteer injuries, missing equipment, lost persons, security issues, medical emergencies, and safety protocol enforcement.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportIncidents}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-300 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Export Incident Log</span>
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Log New Incident</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search incidents by keyword, location, or injury..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 text-slate-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700"
          >
            <option value="All">All Statuses</option>
            <option value="Reported">Reported</option>
            <option value="Under Investigation">Under Investigation</option>
            <option value="Action Required">Action Required</option>
            <option value="Escalated">Escalated</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Incident List Cards */}
      <div className="space-y-3">
        {filteredIncidents.map((inc) => (
          <div
            key={inc.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md border ${getSeverityBadge(inc.severity)}`}>
                  {inc.severity}
                </span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                  {inc.type}
                </span>
                <h3 className="font-bold text-sm text-slate-900">{inc.title}</h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">{inc.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {inc.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {inc.reportedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  Assigned: <strong>{inc.assignedLeader}</strong>
                </span>
              </div>
            </div>

            {/* Status Switcher & Detail Button */}
            <div className="flex items-center gap-3 shrink-0 justify-between lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
              <select
                value={inc.status}
                onChange={(e) => handleUpdateStatus(inc.id, e.target.value as IncidentStatus)}
                className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-800"
              >
                <option value="Reported">Reported</option>
                <option value="Under Investigation">Under Investigation</option>
                <option value="Action Required">Action Required</option>
                <option value="Escalated">Escalated</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>

              <button
                onClick={() => setSelectedIncident(inc)}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-xl hover:bg-rose-50 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Investigation Log ({inc.notes.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Incident Investigation Log Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded-md border ${getSeverityBadge(selectedIncident.severity)}`}>
                  {selectedIncident.severity} Severity
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-1">{selectedIncident.title}</h3>
              </div>
              <button onClick={() => setSelectedIncident(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
                  Action Taken So Far:
                </span>
                <p className="text-slate-600 leading-relaxed">{selectedIncident.actionTaken || 'No action recorded yet.'}</p>
                <p className="text-[11px] text-slate-400 pt-1">Evidence: {selectedIncident.evidence}</p>
              </div>

              {/* Notes Timeline */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  Investigation Notes & Radio Transcripts:
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedIncident.notes.map((n, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between font-bold text-slate-800 mb-1">
                        <span>{n.author}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{n.timestamp}</span>
                      </div>
                      <p className="text-slate-600">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                <input
                  type="text"
                  required
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Add note or update on investigation..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                />
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Post</span>
                </button>
              </form>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  handleUpdateStatus(selectedIncident.id, 'Resolved');
                  setSelectedIncident(null);
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark as Resolved</span>
              </button>
              <button
                onClick={() => setSelectedIncident(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log New Incident Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Log Operational Incident</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Incident Headline</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Volunteer Heat Exhaustion at East Dock"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as IncidentType)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="Volunteer injury">Volunteer injury</option>
                    <option value="Missing equipment">Missing equipment</option>
                    <option value="Lost person">Lost person</option>
                    <option value="Security issue">Security issue</option>
                    <option value="Medical emergency">Medical emergency</option>
                    <option value="Safety issue">Safety issue</option>
                    <option value="Volunteer misconduct">Volunteer misconduct</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Severity</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as IncidentSeverity)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Exact Location / Zone</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. North Gate Bleachers"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Incident Commander</label>
                <input
                  type="text"
                  required
                  value={assignedLeader}
                  onChange={(e) => setAssignedLeader(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Immediate Action Taken</label>
                <textarea
                  rows={2}
                  value={actionTaken}
                  onChange={(e) => setActionTaken(e.target.value)}
                  placeholder="e.g. Dispatched First Aid squad, applied ice, cleared area..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3 py-2 font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Log Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
