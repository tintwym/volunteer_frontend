'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Clock,
  UserCheck,
  ArrowRightLeft,
  DollarSign,
  ShieldCheck,
  FileCheck2,
  X,
  Check,
} from 'lucide-react';
import { ApprovalRequestItem, ApprovalType } from '../types';

interface ApprovalManagementViewProps {
  approvals?: ApprovalRequestItem[];
  requests?: ApprovalRequestItem[];
  onDecideApproval?: (id: string, decision: any, reason?: string) => void;
  onDecideRequest?: (id: string, decision: any, reason?: string) => void;
  onBatchApproveAll?: () => void;
  onBatchApprove?: (ids: string[]) => void;
}

export const ApprovalManagementView: React.FC<ApprovalManagementViewProps> = ({
  approvals: propApprovals,
  requests: propRequests,
  onDecideApproval,
  onDecideRequest,
  onBatchApproveAll,
  onBatchApprove,
}) => {
  const approvals = propApprovals || propRequests || [];
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [rejectingItem, setRejectingItem] = useState<ApprovalRequestItem | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleDecide = (id: string, decision: any, reason?: string) => {
    if (onDecideApproval) onDecideApproval(id, decision, reason);
    else if (onDecideRequest) onDecideRequest(id, decision, reason);
  };

  const handleBatchApprove = () => {
    if (onBatchApproveAll) onBatchApproveAll();
    else if (onBatchApprove) {
      const pendingIds = approvals
        .filter((a) => a.status === 'Pending' || (a.status as any) === 'pending')
        .map((a) => a.id);
      onBatchApprove(pendingIds);
    }
  };

  const filteredApprovals = (approvals || []).filter((app) => {
    const matchesType = typeFilter === 'All' || app.type === typeFilter;
    const matchesSearch =
      (app.requesterName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.details || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const pendingCount = (approvals || []).filter(
    (a) => a.status === 'Pending' || (a.status as any) === 'pending'
  ).length;

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rejectingItem) {
      handleDecide(rejectingItem.id, 'Rejected', rejectionReason);
      setRejectingItem(null);
      setRejectionReason('');
    }
  };

  const getTypeIcon = (type: ApprovalType) => {
    switch (type) {
      case 'Volunteer Registration':
      case 'Volunteer registration':
        return <UserCheck className="w-4 h-4 text-emerald-600" />;
      case 'Leader Appointment':
        return <ShieldCheck className="w-4 h-4 text-indigo-600" />;
      case 'Shift Swap':
      case 'Shift change':
        return <ArrowRightLeft className="w-4 h-4 text-amber-600" />;
      case 'Leave Request':
      case 'Leave/absence':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'Expense Reimbursement':
      case 'Equipment request':
        return <DollarSign className="w-4 h-4 text-purple-600" />;
      case 'Role Change':
      case 'Team transfer':
      case 'Task reassignment':
      default:
        return <FileCheck2 className="w-4 h-4 text-teal-600" />;
    }
  };

  return (
    <div id="approval-management-view" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Approval Center</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
              {pendingCount} Pending Decisions
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Authorize registrations, leader appointments, emergency leave, shift swaps, and budget expense claims with audit trail records.
          </p>
        </div>

        {pendingCount > 0 && (
          <button
            onClick={handleBatchApprove}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Batch Approve All ({pendingCount})</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search approvals by requester or details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-900"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700"
        >
          <option value="All">All Request Categories</option>
          <option value="Volunteer Registration">Volunteer Registration</option>
          <option value="Leader Appointment">Leader Appointment</option>
          <option value="Shift Swap">Shift Swap</option>
          <option value="Leave Request">Leave Request</option>
          <option value="Expense Reimbursement">Expense Reimbursement</option>
          <option value="Role Change">Role Change</option>
        </select>
      </div>

      {/* Approvals Table / Card Stack */}
      <div className="space-y-3">
        {filteredApprovals.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5 flex-1">
              <img
                src={item.requesterAvatar}
                alt={item.requesterName}
                className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0 mt-0.5"
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="p-1 rounded-md bg-slate-100">{getTypeIcon(item.type)}</span>
                  <span className="text-xs font-bold text-slate-900">{item.requesterName}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-semibold text-slate-600">{item.type}</span>
                  <span className="text-[11px] text-slate-400">({item.submittedAt})</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">{item.details}</p>

                {item.amount && (
                  <span className="inline-block text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                    Claim Amount: ${item.amount}
                  </span>
                )}
              </div>
            </div>

            {/* Decision Status / Actions */}
            <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 justify-end">
              {item.status === 'Pending' ? (
                <>
                  <button
                    onClick={() => handleDecide(item.id, 'Approved')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>

                  <button
                    onClick={() => setRejectingItem(item)}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-rose-200 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Decline</span>
                  </button>
                </>
              ) : (
                <span
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl ${
                    item.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {item.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Reject with Reason Modal */}
      {rejectingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Decline Request</h3>
              <button onClick={() => setRejectingItem(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Decline <strong>{rejectingItem.type}</strong> for <strong>{rejectingItem.requesterName}</strong>. Please provide feedback for the applicant:
            </p>

            <form onSubmit={handleRejectSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Decline Reason</label>
                <textarea
                  rows={3}
                  required
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="e.g. Mandatory safety background check pending; missing receipt for medical triage supply..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectingItem(null)}
                  className="px-3 py-2 font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Confirm Decline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
