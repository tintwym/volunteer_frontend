'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { VolunteerShift } from '../types';

interface LogHoursModalProps {
  shifts: VolunteerShift[];
  initialShift?: VolunteerShift | null;
  onClose: () => void;
  onSubmitHours: (data: {
    shiftId?: string;
    activityTitle: string;
    hours: number;
    date: string;
    supervisor: string;
    notes: string;
  }) => void;
}

export const LogHoursModal: React.FC<LogHoursModalProps> = ({
  shifts,
  initialShift,
  onClose,
  onSubmitHours,
}) => {
  const [selectedShiftId, setSelectedShiftId] = useState<string>(
    initialShift?.id || 'adhoc'
  );
  const [activityTitle, setActivityTitle] = useState<string>(
    initialShift?.title || ''
  );
  const [hours, setHours] = useState<number>(
    initialShift?.durationHours || 3
  );
  const [date, setDate] = useState<string>(
    initialShift?.date || new Date().toISOString().split('T')[0]
  );
  const [supervisor, setSupervisor] = useState<string>(
    initialShift?.organizerName || 'Elena Rostova'
  );
  const [notes, setNotes] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hours <= 0) return;

    const title =
      selectedShiftId === 'adhoc'
        ? activityTitle || 'Community Outreach & Service'
        : shifts.find((s) => s.id === selectedShiftId)?.title || activityTitle;

    onSubmitHours({
      shiftId: selectedShiftId !== 'adhoc' ? selectedShiftId : undefined,
      activityTitle: title,
      hours: Number(hours),
      date,
      supervisor,
      notes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Log Volunteer Service Hours
              </h3>
              <p className="text-xs text-slate-500">
                Recorded hours automatically route for coordinator verification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          {/* Shift selector */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Select Shift or Custom Activity
            </label>
            <select
              value={selectedShiftId}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedShiftId(val);
                if (val !== 'adhoc') {
                  const found = shifts.find((s) => s.id === val);
                  if (found) {
                    setActivityTitle(found.title);
                    setHours(found.durationHours);
                    setDate(found.date);
                    setSupervisor(found.organizerName);
                  }
                }
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            >
              <option value="adhoc">✨ Custom Service Activity / Ad-hoc Service</option>
              {shifts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.date})
                </option>
              ))}
            </select>
          </div>

          {selectedShiftId === 'adhoc' && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Activity Title
              </label>
              <input
                type="text"
                placeholder="e.g. Emergency Sandbagging, Community Pantry..."
                value={activityTitle}
                onChange={(e) => setActivityTitle(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Hours Contributed
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="24"
                value={hours}
                onChange={(e) => setHours(parseFloat(e.target.value) || 0)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Date Completed
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Coordinator / Supervisor Name
            </label>
            <input
              type="text"
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Summary of Duties / Accomplishments
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe tasks carried out, people assisted, or outcomes achieved..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
            >
              Submit & Log Hours
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
