'use client';
// @ts-nocheck

import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ListFilter,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  Plus,
  Share2,
  CalendarCheck,
  CalendarPlus,
  ArrowRight,
  Filter,
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight,
  X,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { VolunteerShift, CauseCategory, User } from '../types';

interface SchedulingViewProps {
  shifts?: VolunteerShift[];
  currentUser: User;
  onSignUp: (shiftId: string) => void;
  onCancelRegistration: (shiftId: string) => void;
  onOpenCreateShiftModal: () => void;
  onOpenLogHoursModal: (shift?: VolunteerShift) => void;
  onUpdateShiftAttendance?: (shiftId: string, attendeeId: string, status: any) => void;
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

export const SchedulingView: React.FC<SchedulingViewProps> = ({
  shifts = [],
  currentUser,
  onSignUp,
  onCancelRegistration,
  onOpenCreateShiftModal,
  onOpenLogHoursModal,
  onUpdateShiftAttendance,
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'calendar'>('cards');
  const [selectedCause, setSelectedCause] = useState<string>('all');
  const [filterRegisteredOnly, setFilterRegisteredOnly] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedShiftForDetails, setSelectedShiftForDetails] = useState<VolunteerShift | null>(null);
  const [selectedShiftForRoster, setSelectedShiftForRoster] = useState<VolunteerShift | null>(null);

  const isOrganizer = currentUser?.role === 'organizer';

  // Filtered shifts
  const filteredShifts = useMemo(() => {
    return (shifts || []).filter((shift) => {
      const matchesCause = selectedCause === 'all' || shift.cause === selectedCause;
      const matchesSearch =
        (shift.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (shift.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (shift.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const isRegistered = (shift.attendees || []).some((a) => a.userId === currentUser?.id && a.status !== 'cancelled');
      const matchesRegistered = !filterRegisteredOnly || isRegistered;

      return matchesCause && matchesSearch && matchesRegistered;
    });
  }, [shifts, selectedCause, searchTerm, filterRegisteredOnly, currentUser?.id]);

  const getCauseBadgeColor = (cause: CauseCategory) => {
    switch (cause) {
      case 'Environment':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Food Security':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Education':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Community Aid':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Disaster Relief':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  // Helper for generating Google Calendar link
  const makeGoogleCalendarUrl = (shift: VolunteerShift) => {
    const title = encodeURIComponent(shift.title);
    const details = encodeURIComponent(`${shift.description}\n\nLocation: ${shift.location}`);
    const loc = encodeURIComponent(shift.location);
    const startIso = `${shift.date.replace(/-/g, '')}T${shift.startTime.replace(':', '')}00Z`;
    const endIso = `${shift.date.replace(/-/g, '')}T${shift.endTime.replace(':', '')}00Z`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${loc}`;
  };

  return (
    <div id="scheduling-container" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Volunteer Scheduling & Shifts
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {filteredShifts.length} Opportunities
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Discover community initiatives, claim volunteer shifts, monitor slot capacity, and sync with your automated calendar and email alerts.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Calendar / List View toggle */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
            <button
              id="view-cards-button"
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'cards' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              List View
            </button>
            <button
              id="view-calendar-button"
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'calendar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Calendar Schedule
            </button>
          </div>

          {isOrganizer && (
            <button
              id="open-create-shift-button"
              onClick={onOpenCreateShiftModal}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Shift</span>
            </button>
          )}

          {!isOrganizer && (
            <button
              id="open-log-hours-button"
              onClick={() => onOpenLogHoursModal()}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-colors"
            >
              <CalendarCheck className="w-4 h-4 text-emerald-400" />
              <span>Log Completed Shift</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by role, location, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              id="filter-my-shifts"
              onClick={() => setFilterRegisteredOnly(!filterRegisteredOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap ${
                filterRegisteredOnly
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {filterRegisteredOnly ? '✓ My Confirmed Shifts Only' : 'Show My Shifts Only'}
            </button>
          </div>
        </div>

        {/* Cause Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider shrink-0 mr-1">
            Causes:
          </span>
          <button
            onClick={() => setSelectedCause('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors shrink-0 ${
              selectedCause === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Causes
          </button>
          {CAUSES.map((cause) => (
            <button
              key={cause}
              onClick={() => setSelectedCause(cause)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors shrink-0 ${
                selectedCause === cause
                  ? 'bg-emerald-700 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cause}
            </button>
          ))}
        </div>
      </div>

      {/* Main View: Cards vs Calendar */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredShifts.map((shift) => {
            const isRegistered = shift.attendees.some(
              (a) => a.userId === currentUser.id && a.status !== 'cancelled'
            );
            const spotsRemaining = Math.max(0, shift.capacity - shift.registeredCount);
            const fillPercentage = Math.min(100, Math.round((shift.registeredCount / shift.capacity) * 100));
            const isFull = spotsRemaining === 0;

            return (
              <div
                key={shift.id}
                id={`shift-card-${shift.id}`}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar of card */}
                  <div className="p-4 pb-3 border-b border-slate-100 flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getCauseBadgeColor(
                        shift.cause
                      )}`}
                    >
                      {shift.cause}
                    </span>

                    {shift.status === 'completed' ? (
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Completed
                      </span>
                    ) : isRegistered ? (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Signed Up
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-500">
                        {spotsRemaining} {spotsRemaining === 1 ? 'spot' : 'spots'} left
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-3">
                    <h2 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {shift.title}
                    </h2>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {shift.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>
                          {shift.date} • {shift.startTime} - {shift.endTime} ({shift.durationHours} hrs)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{shift.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Coordinator: {shift.organizerName}</span>
                      </div>
                    </div>

                    {/* Capacity Progress */}
                    <div className="pt-2">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                        <span>Capacity: {shift.registeredCount} / {shift.capacity} Filled</span>
                        <span>{fillPercentage}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            fillPercentage >= 100
                              ? 'bg-rose-500'
                              : fillPercentage > 75
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${fillPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Skills pills */}
                    {shift.skillsRequired && shift.skillsRequired.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {shift.skillsRequired.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 pt-2 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedShiftForDetails(shift)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1.5"
                  >
                    View Details
                  </button>

                  <div className="flex items-center gap-2">
                    {isOrganizer ? (
                      <button
                        onClick={() => setSelectedShiftForRoster(shift)}
                        className="text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Roster ({shift.attendees.length})</span>
                      </button>
                    ) : isRegistered ? (
                      <button
                        onClick={() => onCancelRegistration(shift.id)}
                        className="text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl transition-colors"
                      >
                        Cancel RSVP
                      </button>
                    ) : isFull ? (
                      <button
                        disabled
                        className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-xl cursor-not-allowed"
                      >
                        Shift Full
                      </button>
                    ) : (
                      <button
                        onClick={() => onSignUp(shift.id)}
                        className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1.5 rounded-xl transition-colors shadow-sm"
                      >
                        Sign Up
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Calendar View Mode */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">September 2026 Schedule</h2>
              <p className="text-xs text-slate-500">Upcoming volunteer sessions and crew rosters</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Confirmed
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ml-2" /> Open Shifts
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mt-4 text-center">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-xs font-bold text-slate-400 uppercase tracking-wider py-2">
                {day}
              </div>
            ))}

            {/* Calendar Cells Simulation for Sept 2026 */}
            {Array.from({ length: 35 }).map((_, i) => {
              const dayNumber = i - 0; // September starting day alignment
              const isValidDay = dayNumber >= 1 && dayNumber <= 30;
              const dateString = isValidDay ? `2026-09-${String(dayNumber).padStart(2, '0')}` : null;
              const dayShifts = dateString ? (shifts || []).filter((s) => s.date === dateString) : [];

              return (
                <div
                  key={i}
                  className={`min-h-[90px] p-1.5 rounded-xl border text-left transition-colors ${
                    isValidDay
                      ? 'bg-slate-50/50 border-slate-200 hover:bg-slate-50'
                      : 'bg-slate-50/20 border-transparent text-slate-300'
                  }`}
                >
                  {isValidDay && (
                    <>
                      <span className="text-xs font-bold text-slate-700 block mb-1">
                        {dayNumber}
                      </span>
                      <div className="space-y-1">
                        {dayShifts.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => setSelectedShiftForDetails(s)}
                            className="w-full text-left p-1 rounded bg-emerald-100 hover:bg-emerald-200 border border-emerald-200 text-emerald-900 text-[10px] font-semibold truncate block transition-colors"
                          >
                            {s.startTime} {s.title}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Shift Details Modal */}
      {selectedShiftForDetails && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getCauseBadgeColor(
                    selectedShiftForDetails.cause
                  )}`}
                >
                  {selectedShiftForDetails.cause}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">
                  {selectedShiftForDetails.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedShiftForDetails.organization}
                </p>
              </div>
              <button
                onClick={() => setSelectedShiftForDetails(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs text-slate-600">
              <p className="leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {selectedShiftForDetails.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Schedule
                  </span>
                  <p className="font-bold text-slate-900 mt-1">
                    {selectedShiftForDetails.date}
                  </p>
                  <p className="text-slate-600">
                    {selectedShiftForDetails.startTime} - {selectedShiftForDetails.endTime} ({selectedShiftForDetails.durationHours} hrs)
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Capacity & Slots
                  </span>
                  <p className="font-bold text-slate-900 mt-1">
                    {selectedShiftForDetails.registeredCount} of {selectedShiftForDetails.capacity} Filled
                  </p>
                  <p className="text-emerald-700 font-medium">
                    {Math.max(0, selectedShiftForDetails.capacity - selectedShiftForDetails.registeredCount)} Spots Open
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Location:</span>
                    <span>{selectedShiftForDetails.location}</span>
                    {selectedShiftForDetails.addressDetails && (
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        {selectedShiftForDetails.addressDetails}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Coordinator Contact:</span>
                    <span>{selectedShiftForDetails.coordinatorContact}</span>
                  </div>
                </div>
              </div>

              {selectedShiftForDetails.skillsRequired.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-900 block mb-1.5">
                    Skills & Gear Recommended:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedShiftForDetails.skillsRequired.map((s, i) => (
                      <span
                        key={i}
                        className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg text-xs font-medium"
                      >
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Automated Notifications Badge */}
              <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
                <div className="text-[11px] text-teal-900">
                  <span className="font-bold block">Automated Email Notifications Active</span>
                  <span>Registered participants automatically receive calendar ICS invites and 24-hour SMS/Email reminders.</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <a
                href={makeGoogleCalendarUrl(selectedShiftForDetails)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <CalendarPlus className="w-4 h-4 text-emerald-600" />
                <span>Add to Google Calendar</span>
              </a>

              <div className="flex items-center gap-2">
                {selectedShiftForDetails.attendees.some(
                  (a) => a.userId === currentUser.id && a.status !== 'cancelled'
                ) ? (
                  <button
                    onClick={() => {
                      onCancelRegistration(selectedShiftForDetails.id);
                      setSelectedShiftForDetails(null);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
                  >
                    Cancel Registration
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onSignUp(selectedShiftForDetails.id);
                      setSelectedShiftForDetails(null);
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    Confirm Sign Up
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shift Roster Drawer (Organizer View) */}
      {selectedShiftForRoster && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Crew Roster & Check-In
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedShiftForRoster.title} ({selectedShiftForRoster.date})
                </p>
              </div>
              <button
                onClick={() => setSelectedShiftForRoster(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
                <span>Registered Volunteers ({selectedShiftForRoster.attendees.length})</span>
                <span>Attendance Status</span>
              </div>

              {selectedShiftForRoster.attendees.map((attendee) => (
                <div
                  key={attendee.userId}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={attendee.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                      alt={attendee.userName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{attendee.userName}</p>
                      <p className="text-[11px] text-slate-500">{attendee.userEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full capitalize ${
                        attendee.status === 'confirmed'
                          ? 'bg-blue-100 text-blue-800'
                          : attendee.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {attendee.status}
                    </span>

                    {attendee.status !== 'completed' && onUpdateShiftAttendance && (
                      <button
                        onClick={() => {
                          onUpdateShiftAttendance(selectedShiftForRoster.id, attendee.userId, 'completed');
                        }}
                        className="text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg transition-colors"
                      >
                        Check-in & Verify {selectedShiftForRoster.durationHours}h
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 text-right">
              <button
                onClick={() => setSelectedShiftForRoster(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Close Roster
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
