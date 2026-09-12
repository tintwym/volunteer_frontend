'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { 
  Send, 
  HelpCircle, 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  AlertCircle,
  Calendar,
  Layers,
  MessageSquare,
  ShieldAlert
} from 'lucide-react';
import { VolunteerRequest, RequestType, RequestStatus } from '../types';

interface RequestsViewProps {
  requests: VolunteerRequest[];
  onSubmitRequest: (newReq: Omit<VolunteerRequest, 'id' | 'submittedDate' | 'status'>) => void;
  onNavigateToLeaderChat?: (leaderName: string) => void;
}

export const RequestsView: React.FC<RequestsViewProps> = ({
  requests,
  onSubmitRequest,
  onNavigateToLeaderChat
}) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [type, setType] = useState<RequestType>('Shift Change');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [eventTitle, setEventTitle] = useState('Community Festival 2026');
  const [urgency, setUrgency] = useState<'Normal' | 'High'>('Normal');

  const requestTypes: RequestType[] = [
    'Shift Change',
    'Absence',
    'Team Transfer',
    'Task Clarification',
    'Schedule Conflict',
    'Assistance Request'
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !details.trim()) return;

    onSubmitRequest({
      type,
      subject: subject.trim(),
      details: details.trim(),
      eventTitle,
      urgency
    });

    setIsCreateOpen(false);
    setSubject('');
    setDetails('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs tracking-wider uppercase mb-1">
              <Send className="w-4 h-4" />
              <span>Section 3.12 • Operational Communications</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Volunteer Requests & Inquiries</h1>
            <p className="text-sm text-slate-600 mt-1">
              Formally submit shift changes, absence notifications, assistance requests, and task clarifications to your Team Leader.
            </p>
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit New Request</span>
          </button>
        </div>

        {/* Workflow Diagram */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Standard Governance Workflow
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>1. Volunteer Submit</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <div className="flex items-center gap-1.5 text-blue-800 bg-blue-100 px-2.5 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>2. Volunteer Leader Review</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <div className="flex items-center gap-1.5 text-purple-800 bg-purple-100 px-2.5 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              <span>3. Approve / Reject / Escalate</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <div className="flex items-center gap-1.5 text-slate-800 bg-slate-200 px-2.5 py-1 rounded-lg">
              <span>4. Organiser Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="font-semibold text-slate-700">No requests submitted</p>
            <p className="text-xs text-slate-400 mt-1">Have a scheduling conflict or question? Submit a formal request to your leader.</p>
          </div>
        ) : (
          requests.map((req) => {
            const isApproved = req.status === 'Approved';
            const isUnderReview = req.status === 'Under Review' || req.status === 'Submitted';
            const isRejected = req.status === 'Rejected';
            const isEscalated = req.status === 'Escalated';

            return (
              <div
                key={req.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 shadow-xs space-y-3 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md">
                      {req.type}
                    </span>
                    {req.urgency === 'High' && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                        High Priority
                      </span>
                    )}
                    <span className="text-xs text-slate-400">• Submitted {req.submittedDate}</span>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 self-start sm:self-auto ${
                    isApproved 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : isUnderReview 
                      ? 'bg-blue-100 text-blue-800' 
                      : isRejected
                      ? 'bg-red-100 text-red-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {isApproved && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {isUnderReview && <Clock className="w-3.5 h-3.5" />}
                    {isRejected && <XCircle className="w-3.5 h-3.5" />}
                    {req.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">{req.subject}</h3>
                  {req.eventTitle && (
                    <span className="text-xs text-emerald-700 font-semibold mt-0.5 block">
                      Event: {req.eventTitle}
                    </span>
                  )}
                  <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    {req.details}
                  </p>
                </div>

                {/* Leader Response if provided */}
                {req.leaderResponse && (
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Team Leader Sign-off Note:</span>
                    </div>
                    <p className="pl-5 leading-relaxed">{req.leaderResponse}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Create Request Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Submit Request to Team Leader</h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Request Category:</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as RequestType)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  {requestTypes.map((rt) => (
                    <option key={rt} value={rt}>{rt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Related Event:</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject / Summary:</label>
                <input
                  type="text"
                  placeholder="e.g. Need 30 min early departure, swap shift to afternoon..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Request Details & Reason:</label>
                <textarea
                  rows={4}
                  placeholder="Explain the specific accommodation, reason for absence, or clarification required..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="font-semibold text-slate-700">Urgency Level:</label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="urgency"
                    checked={urgency === 'Normal'}
                    onChange={() => setUrgency('Normal')}
                    className="accent-emerald-600"
                  />
                  <span>Normal</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="urgency"
                    checked={urgency === 'High'}
                    onChange={() => setUrgency('High')}
                    className="accent-red-600"
                  />
                  <span className="text-red-700 font-semibold">High (Requires prompt response)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-xs"
                >
                  Send Request to Leader
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
