'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowRightLeft,
  X,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { OperationalShiftSchedule } from '../types';

interface ScheduleShiftViewProps {
  shifts?: OperationalShiftSchedule[];
  teams?: any[];
  events?: any[];
  onCreateShift?: (shift: OperationalShiftSchedule) => void;
  onUpdateShift?: ((shift: OperationalShiftSchedule) => void) | ((shiftId: string, patch: Partial<OperationalShiftSchedule>) => void) | any;
}

export const ScheduleShiftView: React.FC<ScheduleShiftViewProps> = ({
  shifts = [],
  teams = [],
  events = [],
  onCreateShift,
  onUpdateShift,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShiftForSwap, setSelectedShiftForSwap] = useState<OperationalShiftSchedule | null>(null);

  // Form states
  const [formName, setFormName] = useState('Twilight Staging Shift');
  const [formTimeWindow, setFormTimeWindow] = useState('17:00–21:00');
  const [formTeamName, setFormTeamName] = useState('Logistics');
  const [formLeader, setFormLeader] = useState('Marcus Vance');
  const [formRequired, setFormRequired] = useState(12);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newShift: OperationalShiftSchedule = {
      id: `shf-${Date.now()}`,
      name: formName,
      timeWindow: formTimeWindow,
      teamId: 'team-log-1',
      teamName: formTeamName,
      assignedLeader: formLeader,
      requiredVolunteers: Number(formRequired),
      assignedVolunteers: Math.min(Number(formRequired), 8),
      status: 'Scheduled',
      swapRequestsCount: 0,
      coveragePercentage: Math.round((8 / (Number(formRequired) || 1)) * 100),
    };

    if (onCreateShift) onCreateShift(newShift);
    setIsModalOpen(false);
  };

  return (
    <div id="schedule-shift-view" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Schedule & Shift Management</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
              {(shifts || []).length} Active Shifts
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Configure time windows (Morning, Afternoon, Evening), set volunteer staffing targets, monitor live shift coverage, and review swap requests.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Shift Window</span>
        </button>
      </div>

      {/* Shifts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {shifts.map((shift) => (
          <div
            key={shift.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  <span>{shift.timeWindow}</span>
                </span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    shift.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800 animate-pulse'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {shift.status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900">{shift.name}</h3>
                <p className="text-xs text-slate-500">{shift.teamName} • Leader: <strong>{shift.assignedLeader}</strong></p>
              </div>

              {/* Staffing Fulfillment Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-600">Volunteer Headcount</span>
                  <span className={shift.assignedVolunteers >= shift.requiredVolunteers ? 'text-emerald-600' : 'text-amber-600'}>
                    {shift.assignedVolunteers} / {shift.requiredVolunteers} ({shift.coveragePercentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      shift.coveragePercentage >= 100 ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(100, shift.coveragePercentage)}%` }}
                  />
                </div>
              </div>

              {shift.swapRequestsCount > 0 && (
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-bold">
                    <ArrowRightLeft className="w-3.5 h-3.5 text-amber-600" />
                    <span>{shift.swapRequestsCount} Shift Swap Requests</span>
                  </span>
                  <button
                    onClick={() => setSelectedShiftForSwap(shift)}
                    className="text-amber-800 font-bold hover:underline cursor-pointer"
                  >
                    Review
                  </button>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Standard 4-hr rotation</span>
              <button
                onClick={() => setSelectedShiftForSwap(shift)}
                className="font-bold text-teal-700 hover:text-teal-800 cursor-pointer"
              >
                Shift Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Shift Swap Modal */}
      {selectedShiftForSwap && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">{selectedShiftForSwap.name} Swaps</h3>
              <button
                onClick={() => setSelectedShiftForSwap(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600">
                Pending volunteer shift swap requests for <strong>{selectedShiftForSwap.name} ({selectedShiftForSwap.timeWindow})</strong>:
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span>Chloe Bennett ↔ Devon Miller</span>
                  <span className="text-amber-700">Pending</span>
                </div>
                <p className="text-slate-500">Reason: College exam Friday night; volunteer swapping to Sunday shift.</p>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => {
                      alert('Shift swap approved.');
                      setSelectedShiftForSwap(null);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg"
                  >
                    Approve Swap
                  </button>
                  <button
                    onClick={() => setSelectedShiftForSwap(null)}
                    className="text-slate-500 px-3 py-1.5 hover:bg-slate-200 rounded-lg"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedShiftForSwap(null)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Shift Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Add Shift Window</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Shift Name</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Time Window (e.g. 8:00–12:00)</label>
                <input
                  type="text"
                  required
                  value={formTimeWindow}
                  onChange={(e) => setFormTimeWindow(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Team</label>
                <input
                  type="text"
                  required
                  value={formTeamName}
                  onChange={(e) => setFormTeamName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Leader</label>
                <input
                  type="text"
                  required
                  value={formLeader}
                  onChange={(e) => setFormLeader(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Required Volunteers</label>
                <input
                  type="number"
                  required
                  value={formRequired}
                  onChange={(e) => setFormRequired(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-2 font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Create Shift
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
