'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  CalendarPlus,
  MapPin,
  Clock,
  Users,
  ShieldCheck,
  X,
  Sparkles,
} from 'lucide-react';
import { VolunteerShift, CauseCategory } from '../types';

interface CreateShiftModalProps {
  onClose: () => void;
  onCreateShift: (newShift: Partial<VolunteerShift>) => void;
}

const CAUSES: CauseCategory[] = [
  'Environment',
  'Food Security',
  'Education',
  'Healthcare',
  'Animal Welfare',
  'Disaster Relief',
  'Community Aid',
];

export const CreateShiftModal: React.FC<CreateShiftModalProps> = ({
  onClose,
  onCreateShift,
}) => {
  const [title, setTitle] = useState('');
  const [cause, setCause] = useState<CauseCategory>('Environment');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isRemote, setIsRemote] = useState(false);
  const [date, setDate] = useState('2026-09-20');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('13:00');
  const [durationHours, setDurationHours] = useState(4);
  const [capacity, setCapacity] = useState(15);
  const [skillsString, setSkillsString] = useState('Teamwork, Outdoor Clothing, Water Bottle');
  const [automatedReminders, setAutomatedReminders] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const skills = skillsString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onCreateShift({
      title: title.trim(),
      cause,
      description: description.trim(),
      location: isRemote ? 'Remote (Virtual)' : location.trim() || 'HopeHarbor Main Hub',
      isRemote,
      date,
      startTime,
      endTime,
      durationHours: Number(durationHours) || 4,
      capacity: Number(capacity) || 15,
      skillsRequired: skills,
      automatedReminders,
      organization: 'HopeHarbor Volunteer Alliance',
      coordinatorContact: 'coordinator@hopeharbor.org',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CalendarPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Post New Volunteer Opportunity
              </h3>
              <p className="text-xs text-slate-500">
                Create shifts, allocate capacity, and enable automated volunteer email dispatches
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
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Shift Title
            </label>
            <input
              type="text"
              placeholder="e.g. Wildlife Habitat Marsh Restoration & Native Planting"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Cause Category
              </label>
              <select
                value={cause}
                onChange={(e) => setCause(e.target.value as CauseCategory)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              >
                {CAUSES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Capacity (Max Volunteers)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={capacity}
                onChange={(e) => setCapacity(parseInt(e.target.value) || 1)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Duration (Hours)
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={durationHours}
                onChange={(e) => setDurationHours(parseFloat(e.target.value) || 1)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-700">Location</label>
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-500">
                <input
                  type="checkbox"
                  checked={isRemote}
                  onChange={(e) => setIsRemote(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span>Remote / Virtual Shift</span>
              </label>
            </div>
            {!isRemote ? (
              <input
                type="text"
                placeholder="Address, park gate, or center venue..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required={!isRemote}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            ) : (
              <p className="p-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
                Remote Shift: Video conference link will be automatically dispatched in confirmation email.
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Description & Objectives
            </label>
            <textarea
              rows={3}
              placeholder="What will volunteers accomplish? Mention any physical requirements or special preparation..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Required Skills & Gear (Comma separated)
            </label>
            <input
              type="text"
              value={skillsString}
              onChange={(e) => setSkillsString(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          {/* Automated reminders toggle */}
          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-emerald-950">Automated Email Notifications</p>
                <p className="text-[11px] text-emerald-800">
                  Send calendar invites upon signup and 24h SMS/email reminder
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={automatedReminders}
              onChange={(e) => setAutomatedReminders(e.target.checked)}
              className="rounded text-emerald-600 w-4 h-4"
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
              Publish Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
