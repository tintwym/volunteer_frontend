'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  HelpCircle,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  X,
  Check,
  ArrowRight,
  ShieldCheck,
  Package,
  Users,
  Calendar,
  Truck,
  Building
} from 'lucide-react';
import { OperationalRequest, OperationalRequestType, OperationalRequestUrgency } from '../types';

interface OperationalRequestsViewProps {
  requests: OperationalRequest[];
  onSubmitRequest: (request: Omit<OperationalRequest, 'id' | 'status' | 'submittedAt'>) => void;
}

export const OperationalRequestsView: React.FC<OperationalRequestsViewProps> = ({
  requests,
  onSubmitRequest
}) => {
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  // Form State
  const [type, setType] = useState<OperationalRequestType>('Equipment');
  const [urgency, setUrgency] = useState<OperationalRequestUrgency>('Urgent');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    onSubmitRequest({
      type,
      urgency,
      title,
      description,
      leaderId: 'leader-sarah',
      leaderName: 'Sarah Jenkins',
      teamName: 'Team Alpha - Registration'
    });

    setShowModal(false);
    setTitle('');
    setDescription('');
  };

  const filteredRequests = requests.filter(r => {
    if (filterStatus === 'All') return true;
    return r.status === filterStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Operational Support Requests</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              Leader-to-Organiser Channel
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Request resources, equipment, float volunteers, schedule adjustments, or emergency venue support from the Lead Organiser.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Support Request</span>
        </button>
      </div>

      {/* Operational Workflow Bar (Section 2.9 Specification) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Request Life Cycle Workflow:
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-slate-300 text-slate-800 flex items-center justify-center text-[10px]">1</span>
            <span>Leader Submits Request</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">2</span>
            <span>Organiser Reviews</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">3</span>
            <span>Approved / Rejected</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">4</span>
            <span>Leader Receives Result & Resources</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold">
          {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterStatus === tab ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab} ({tab === 'All' ? requests.length : requests.filter(r => r.status === tab).length})
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((req) => (
          <div
            key={req.id}
            className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      req.urgency === 'Urgent'
                        ? 'bg-rose-100 text-rose-800'
                        : req.urgency === 'High'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {req.urgency} Urgency
                  </span>

                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Category: {req.type}
                  </span>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      req.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : req.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {req.status}
                  </span>

                  <span className="text-[11px] text-slate-400 flex items-center gap-1 ml-auto">
                    <Clock className="w-3 h-3" />
                    Submitted: {req.submittedAt}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-2">{req.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">{req.description}</p>
              </div>
            </div>

            {/* Organiser Feedback & Allocated Resources */}
            {req.allocatedResources && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-950 font-bold block">Allocated Resources:</strong>
                  <span>{req.allocatedResources}</span>
                </div>
              </div>
            )}

            {req.organiserFeedback && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
                <strong className="text-slate-800">Organiser Desk Status:</strong> {req.organiserFeedback}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Request Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Submit Operational Request</h3>
                <p className="text-xs text-slate-500 mt-0.5">Transmit need to Lead Organiser desk</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Request Type *</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as OperationalRequestType)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                >
                  <option value="Additional volunteers">Additional volunteers (Float Pool)</option>
                  <option value="Equipment">Equipment / Hardware</option>
                  <option value="Schedule change">Schedule change</option>
                  <option value="Team member replacement">Team member replacement</option>
                  <option value="Venue support">Venue support (Janitorial/Electrician)</option>
                  <option value="Transportation">Transportation / Shuttle</option>
                  <option value="Emergency assistance">Emergency assistance</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Urgency Level *</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Normal', 'High', 'Urgent'] as const).map((lvl) => (
                    <label
                      key={lvl}
                      className={`p-2 rounded-lg border text-center font-bold cursor-pointer ${
                        urgency === lvl
                          ? lvl === 'Urgent'
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-emerald-600 text-white border-emerald-600'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        checked={urgency === lvl}
                        onChange={() => setUrgency(lvl)}
                        className="sr-only"
                      />
                      <span>{lvl}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Request Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1 Backup thermal badge printer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Operational Justification *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain why this resource is required for Team Alpha's operation..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Transmit to Organiser
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
