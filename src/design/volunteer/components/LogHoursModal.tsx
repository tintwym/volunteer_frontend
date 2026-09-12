'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { X, Clock, PlusCircle, User, Mail, Calendar, Sparkles } from 'lucide-react';
import { EventCategory, ServiceRecord } from '../types';
import confetti from 'canvas-confetti';

interface LogHoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitHours: (record: Omit<ServiceRecord, 'id' | 'status' | 'verificationCode'>) => void;
}

export const LogHoursModal: React.FC<LogHoursModalProps> = ({
  isOpen,
  onClose,
  onSubmitHours
}) => {
  const [eventTitle, setEventTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [category, setCategory] = useState<EventCategory>('Community Aid');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState('3.5');
  const [supervisorName, setSupervisorName] = useState('');
  const [supervisorEmail, setSupervisorEmail] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim() || !organization.trim() || !hours) return;

    onSubmitHours({
      eventTitle,
      organization,
      category,
      date,
      hours: parseFloat(hours) || 1,
      supervisorName: supervisorName || 'Self-Reported / Community Lead',
      supervisorEmail: supervisorEmail || 'supervisor@example.org',
      notes
    });

    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Log External Volunteer Hours</h3>
              <p className="text-[11px] text-slate-500">Submit completed community hours for supervisor verification</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Event or Activity Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Neighborhood Clean-up & Food Drive"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Hosting Organization *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Westside Community League"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Impact Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
              >
                <option value="Environment">Environment</option>
                <option value="Food Relief">Food Relief</option>
                <option value="Education & Youth">Education & Youth</option>
                <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                <option value="Animal Welfare">Animal Welfare</option>
                <option value="Community Aid">Community Aid</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Date Completed *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Hours Contributed *
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="24"
                required
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-100">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Supervisor / Coordinator Name
              </label>
              <input
                type="text"
                placeholder="e.g. Dr. Thomas Lee"
                value={supervisorName}
                onChange={(e) => setSupervisorName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Supervisor Email
              </label>
              <input
                type="email"
                placeholder="e.g. t.lee@org.org"
                value={supervisorEmail}
                onChange={(e) => setSupervisorEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Description of Tasks & Outcomes
            </label>
            <textarea
              rows={2}
              placeholder="Briefly describe what you worked on (e.g. sorted 100 food items, guided participants)..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
            />
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
            Logged hours are marked as <strong>Pending</strong> until signed off by the named coordinator. Once approved, hours are added to your official certificate transcript.
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              Submit Service Hours
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
