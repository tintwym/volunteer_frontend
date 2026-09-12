'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  AlertTriangle,
  Send,
  Plus,
  ArrowRight,
  FileText,
  UserCheck
} from 'lucide-react';
import { ShiftEvent, Volunteer } from '../types';

interface TeamScheduleViewProps {
  shifts: ShiftEvent[];
  volunteers: Volunteer[];
  onRequestScheduleChange: (shiftId: string, reason: string) => void;
  onRequestReplacement: (shiftId: string, volunteerName: string) => void;
  onNotifyTeamOfShiftChange: (shiftTitle: string) => void;
}

export const TeamScheduleView: React.FC<TeamScheduleViewProps> = ({
  shifts = [],
  volunteers = [],
  onRequestScheduleChange,
  onRequestReplacement,
  onNotifyTeamOfShiftChange
}) => {
  const [selectedShiftId, setSelectedShiftId] = useState<string>(shifts[0]?.id || '');
  const [showRequestChangeModal, setShowRequestChangeModal] = useState(false);
  const [changeReason, setChangeReason] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedShift = shifts.find(s => s.id === selectedShiftId) || shifts[0] || null;

  const getAssignedVolunteersForShift = (shift: ShiftEvent | null) => {
    if (!shift || !Array.isArray(shift.assignedVolunteerIds)) return [];
    return volunteers.filter(v => shift.assignedVolunteerIds.includes(v.id));
  };

  const assignedVolunteers = getAssignedVolunteersForShift(selectedShift);

  const handleConfirmChangeRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!changeReason || !selectedShift) return;
    onRequestScheduleChange(selectedShift.id, changeReason);
    setShowRequestChangeModal(false);
    setChangeReason('');
    setToastMessage(`Schedule adjustment request transmitted to Lead Organiser!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleNotifyTeam = () => {
    if (!selectedShift) return;
    onNotifyTeamOfShiftChange(selectedShift.title);
    setToastMessage(`Shift update notification sent to all assigned volunteers for "${selectedShift.title}"`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Team Shift Schedule</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              Shift Operations
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Supervise team shift hours, station assignments, task briefings, schedule adjustment requests, and automated volunteer dispatch alerts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRequestChangeModal(true)}
            disabled={!selectedShift}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Request Shift Change
          </button>
          <button
            onClick={handleNotifyTeam}
            disabled={!selectedShift}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Notify Team of Schedule</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md flex items-center justify-between">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">&times;</button>
        </div>
      )}

      {/* Shifts Layout */}
      {shifts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
          No shifts currently scheduled for your team.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Shifts List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">
              Team Alpha Assigned Shifts
            </span>
            {shifts.map((shift) => {
              const isSelected = selectedShift?.id === shift.id;
              const filledCount = shift.assignedVolunteerIds?.length || 0;
              const requiredCount = shift.requiredVolunteers || 0;

              return (
                <div
                  key={shift.id}
                  onClick={() => setSelectedShiftId(shift.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50/50 border-emerald-300 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {shift.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        shift.status === 'In Progress'
                          ? 'bg-emerald-100 text-emerald-800'
                          : shift.status === 'Confirmed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {shift.status}
                    </span>
                  </div>

                  <h2 className="text-sm font-bold text-slate-900 mt-2">{shift.title}</h2>

                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {shift.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {shift.startTime} - {shift.endTime}
                    </span>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {filledCount} / {requiredCount} Filled
                    </span>
                    <span className="text-emerald-700 font-bold">Select Details &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Shift Details & Task Instructions (7 cols) */}
          {selectedShift && (
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Active Operational Shift
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-2">{selectedShift.title}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {selectedShift.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {selectedShift.startTime} - {selectedShift.endTime}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {selectedShift.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Task Instructions */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  Leader Task Instructions & Protocols
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {selectedShift.description}
                </p>
                <div className="pt-1 text-slate-600">
                  <strong className="text-slate-800">Operational Checkpoint:</strong> Verify thermal printer ribbon stock and ensure volunteer relief schedules are synchronized before 11:30 AM.
                </div>
              </div>

              {/* Assigned Volunteers on this Shift */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Assigned Team Volunteers ({assignedVolunteers.length})
                  </h3>
                  <span className="text-xs text-slate-400">Shift Target: {selectedShift.requiredVolunteers || 0} volunteers</span>
                </div>

                {assignedVolunteers.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    No volunteers currently assigned to this shift.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {assignedVolunteers.map((vol) => (
                      <div
                        key={vol.id}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <img
                            src={vol.avatar}
                            alt={vol.name}
                            className="w-7 h-7 rounded-full object-cover shrink-0"
                          />
                          <div className="truncate">
                            <span className="font-bold text-slate-900 block truncate">{vol.name}</span>
                            <span className="text-[10px] text-slate-400 block">{vol.role}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => onRequestReplacement(selectedShift.id, vol.name)}
                          className="text-[10px] font-bold text-rose-700 hover:underline cursor-pointer"
                          title="Request float replacement from Organiser"
                        >
                          Request Sub
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Request Shift Change Modal */}
      {showRequestChangeModal && selectedShift && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Request Shift Adjustment</h3>
            <p className="text-xs text-slate-500">
              Submit schedule modification or timing extension for "{selectedShift.title}" to Lead Organiser.
            </p>

            <form onSubmit={handleConfirmChangeRequest} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Reason for Adjustment *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Need to extend shift by 30 minutes due to delayed keynote attendee departures..."
                  value={changeReason}
                  onChange={(e) => setChangeReason(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRequestChangeModal(false)}
                  className="px-3 py-1.5 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 text-white font-bold rounded-lg"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
