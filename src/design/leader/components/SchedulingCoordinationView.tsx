'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  CheckCircle2,
  AlertCircle,
  Mail,
  UserPlus,
  UserMinus,
  Check,
  X,
  Sparkles,
  Filter,
  ArrowRight
} from 'lucide-react';
import { ShiftEvent, Volunteer, EventCategory } from '../types';

interface SchedulingCoordinationViewProps {
  shifts: ShiftEvent[];
  volunteers: Volunteer[];
  onAddShift: (newShift: Omit<ShiftEvent, 'id'>) => void;
  onAssignVolunteerToShift: (shiftId: string, volunteerId: string) => void;
  onRemoveVolunteerFromShift: (shiftId: string, volunteerId: string) => void;
  onUpdateAttendanceStatus: (
    shiftId: string,
    volunteerId: string,
    status: 'Attended' | 'Late' | 'Excused' | 'No-Show'
  ) => void;
  onVerifyShiftHours: (shiftId: string) => void;
  onSendShiftReminderBroadcast: (shift: ShiftEvent) => void;
}

export const SchedulingCoordinationView: React.FC<SchedulingCoordinationViewProps> = ({
  shifts,
  volunteers,
  onAddShift,
  onAssignVolunteerToShift,
  onRemoveVolunteerFromShift,
  onUpdateAttendanceStatus,
  onVerifyShiftHours,
  onSendShiftReminderBroadcast
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'all'>('upcoming');
  const [selectedShift, setSelectedShift] = useState<ShiftEvent | null>(shifts[0] || null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignDrawer, setShowAssignDrawer] = useState(false);

  // New shift form state
  const [formCategory, setFormCategory] = useState<EventCategory>('Community Food Pantry');
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState('2026-09-15');
  const [formStartTime, setFormStartTime] = useState('09:00');
  const [formEndTime, setFormEndTime] = useState('13:00');
  const [formLocation, setFormLocation] = useState('');
  const [formRequiredVolunteers, setFormRequiredVolunteers] = useState(6);
  const [formDescription, setFormDescription] = useState('');
  const [formSkills, setFormSkills] = useState<string[]>(['Food Handling']);

  const filteredShifts = shifts.filter(s => {
    if (activeTab === 'upcoming') return s.status === 'Upcoming';
    if (activeTab === 'completed') return s.status === 'Completed';
    return true;
  });

  const activeShift = shifts.find(s => s.id === selectedShift?.id) || selectedShift || shifts[0];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formLocation) return;

    // Calculate approximate duration
    const startH = parseInt(formStartTime.split(':')[0], 10);
    const endH = parseInt(formEndTime.split(':')[0], 10);
    const duration = Math.max(1, endH - startH);

    onAddShift({
      title: formTitle,
      category: formCategory,
      date: formDate,
      startTime: formStartTime,
      endTime: formEndTime,
      durationHours: duration,
      location: formLocation,
      leadOrganizer: 'Sarah Jenkins (Leader)',
      description: formDescription || 'Volunteer shift organized by Community Action Network.',
      requiredVolunteers: Number(formRequiredVolunteers),
      assignedVolunteerIds: [],
      waitlistVolunteerIds: [],
      requiredSkills: formSkills,
      status: 'Upcoming',
      attendance: {}
    });

    setShowCreateModal(false);
    setFormTitle('');
    setFormLocation('');
    setFormDescription('');
  };

  // Find assigned volunteers objects
  const assignedVolunteers = activeShift
    ? activeShift.assignedVolunteerIds
        .map(id => volunteers.find(v => v.id === id))
        .filter((v): v is Volunteer => Boolean(v))
    : [];

  // Volunteers available to be assigned (active and not yet in this shift)
  const availableVolunteers = volunteers.filter(
    v => v.status === 'Active' && !activeShift?.assignedVolunteerIds.includes(v.id)
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Scheduling & Event Coordination</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              {shifts.length} Total Events
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Plan community shifts, assign qualified volunteers from your roster, and record live attendance.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="bg-slate-100 p-1 rounded-lg flex items-center text-xs font-semibold">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'upcoming' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upcoming ({shifts.filter(s => s.status === 'Upcoming').length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'completed' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Completed ({shifts.filter(s => s.status === 'Completed').length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Events
            </button>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Shift</span>
          </button>
        </div>
      </div>

      {/* 2-Column Coordination Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Event Selector List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Events Directory ({filteredShifts.length})
          </div>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredShifts.map((shift) => {
              const isSelected = activeShift?.id === shift.id;
              const slotsFilled = shift.assignedVolunteerIds?.length || 0;
              const isFilled = slotsFilled >= (shift.requiredVolunteers || 0);

              return (
                <div
                  key={shift.id}
                  onClick={() => setSelectedShift(shift)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 inline-block mb-1">
                        {shift.category}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        {shift.title}
                      </h3>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                        shift.status === 'Upcoming'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {shift.status}
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-slate-500 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>{shift.date} • {shift.startTime} - {shift.endTime} ({shift.durationHours} hrs)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{shift.location}</span>
                    </div>
                  </div>

                  {/* Slot fullness progress bar */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-slate-700">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-semibold">{slotsFilled}</span>
                      <span className="text-slate-400">/ {shift.requiredVolunteers} filled</span>
                    </div>
                    {isFilled ? (
                      <span className="text-[10px] font-bold text-emerald-700">Full Crew</span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-700">
                        {shift.requiredVolunteers - slotsFilled} needed
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Detailed Shift Management & Roster Assignment (7 cols) */}
        {activeShift ? (
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-6">
            {/* Shift Header & Action Buttons */}
            <div className="border-b border-slate-100 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {activeShift.category}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSendShiftReminderBroadcast(activeShift)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    title="Dispatches 24-hr reminder email to all assigned volunteers"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>Send Reminder Email</span>
                  </button>
                  {activeShift.status === 'Completed' && (
                    <button
                      onClick={() => onVerifyShiftHours(activeShift.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verify All Shift Hours</span>
                    </button>
                  )}
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-900">{activeShift.title}</h2>
              <p className="text-xs text-slate-500 mt-1">{activeShift.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Shift Schedule</span>
                  <span className="font-semibold text-slate-800">
                    {activeShift.date} • {activeShift.startTime} to {activeShift.endTime} ({activeShift.durationHours} hrs)
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">On-Site Location</span>
                  <span className="font-semibold text-slate-800">{activeShift.location}</span>
                </div>
              </div>
            </div>

            {/* Roster Assignment and Attendance Controls */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Assigned Roster ({assignedVolunteers.length} / {activeShift.requiredVolunteers} Volunteers)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Leader supervision: Check-in attendance and allocate service credit.
                  </p>
                </div>
                <button
                  onClick={() => setShowAssignDrawer(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Assign Volunteer</span>
                </button>
              </div>

              {assignedVolunteers.length === 0 ? (
                <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl">
                  <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">No volunteers assigned to this shift yet.</p>
                  <button
                    onClick={() => setShowAssignDrawer(true)}
                    className="mt-2 text-xs font-semibold text-emerald-600 hover:underline"
                  >
                    + Assign from Roster
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {assignedVolunteers.map((vol) => {
                    const record = activeShift.attendance[vol.id] || {
                      status: 'Registered',
                      hoursLogged: activeShift.durationHours,
                      verified: false
                    };

                    return (
                      <div
                        key={vol.id}
                        className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={vol.avatar}
                            alt={vol.name}
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900">{vol.name}</div>
                            <div className="text-[11px] text-slate-500">
                              {vol.role} • {vol.phone}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {vol.skills.slice(0, 2).map(s => (
                                <span key={s} className="px-1.5 py-0.2 rounded bg-slate-100 text-[10px] text-slate-600">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Leader Attendance Marker */}
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <select
                            value={record.status}
                            onChange={(e) =>
                              onUpdateAttendanceStatus(
                                activeShift.id,
                                vol.id,
                                e.target.value as any
                              )
                            }
                            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border cursor-pointer ${
                              record.status === 'Attended'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : record.status === 'Late'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : record.status === 'No-Show'
                                ? 'bg-rose-50 text-rose-800 border-rose-300'
                                : 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            <option value="Registered">Registered</option>
                            <option value="Attended">Present (Attended)</option>
                            <option value="Late">Late Arrival</option>
                            <option value="Excused">Excused</option>
                            <option value="No-Show">No-Show</option>
                          </select>

                          {/* Hours status */}
                          <div className="text-right pl-2">
                            <span className="text-xs font-bold text-slate-800 block">
                              {record.hoursLogged} hrs
                            </span>
                            <span className={`text-[10px] font-semibold ${record.verified ? 'text-emerald-600' : 'text-amber-600'}`}>
                              {record.verified ? 'Verified' : 'Pending'}
                            </span>
                          </div>

                          {/* Remove from shift button */}
                          <button
                            onClick={() => onRemoveVolunteerFromShift(activeShift.id, vol.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                            title="Remove from shift"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Shift Logistics Notes */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-slate-900 block">Volunteer Leader Shift Protocol:</span>
              <p className="text-slate-600 leading-relaxed">
                Volunteers checked in as <strong className="text-emerald-700">"Present"</strong> will automatically have their service credit accredited upon shift sign-off. The automated notification engine will dispatch an email transcript with certificate progress.
              </p>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400">
            Select a shift to manage its roster and attendance.
          </div>
        )}
      </div>

      {/* Assign Volunteer Drawer / Modal */}
      {showAssignDrawer && activeShift && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Assign Volunteers to Shift</h3>
                <p className="text-xs text-slate-500 mt-0.5">{activeShift.title}</p>
              </div>
              <button onClick={() => setShowAssignDrawer(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 divide-y divide-slate-100">
              {availableVolunteers.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  All active roster members are already assigned to this event.
                </div>
              ) : (
                availableVolunteers.map((v) => {
                  const hasMatchingSkill = v.skills.some(s => activeShift.requiredSkills.includes(s));
                  return (
                    <div key={v.id} className="py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={v.avatar} alt={v.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <div className="text-xs font-bold text-slate-900">{v.name}</div>
                          <div className="text-[10px] text-slate-500">{v.role} • {v.verifiedHours} hrs verified</div>
                          {hasMatchingSkill && (
                            <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded bg-emerald-50 text-[10px] text-emerald-700 font-semibold border border-emerald-200">
                              Matches Required Skill
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onAssignVolunteerToShift(activeShift.id, v.id);
                        }}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-2xs cursor-pointer"
                      >
                        Assign
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-4 border-t border-slate-100 text-right">
              <button
                onClick={() => setShowAssignDrawer(false)}
                className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Shift Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Schedule New Volunteer Shift</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Coordinate date, location, required skillsets, and capacity.
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Shift / Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Saturday Fresh Produce Market Assembly"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Community Food Pantry">Community Food Pantry</option>
                    <option value="Youth Mentorship">Youth Mentorship</option>
                    <option value="Park Revitalization">Park Revitalization</option>
                    <option value="Emergency Shelter Support">Emergency Shelter Support</option>
                    <option value="Senior Outreach">Senior Outreach</option>
                    <option value="Disaster Relief">Disaster Relief</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Start Time</label>
                  <input
                    type="time"
                    value={formStartTime}
                    onChange={(e) => setFormStartTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">End Time</label>
                  <input
                    type="time"
                    value={formEndTime}
                    onChange={(e) => setFormEndTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Volunteers Needed</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={formRequiredVolunteers}
                    onChange={(e) => setFormRequiredVolunteers(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Location Address *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hope Center, 425 Main St Warehouse B"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description & Leader Instructions</label>
                <textarea
                  rows={2}
                  placeholder="Details for volunteers: parking, meeting point, recommended attire..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-xs cursor-pointer"
                >
                  Publish & Open Shifts
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
