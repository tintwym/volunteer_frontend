'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  Coffee, 
  User, 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle,
  ArrowRight,
  Sparkles,
  Send
} from 'lucide-react';
import { VolunteerEvent, EventShift } from '../types';

interface MyScheduleViewProps {
  events: VolunteerEvent[];
  onRequestShiftChange: (eventTitle: string) => void;
  onCheckInNow: () => void;
}

export const MyScheduleView: React.FC<MyScheduleViewProps> = ({
  events,
  onRequestShiftChange,
  onCheckInNow
}) => {
  const [selectedMonth, setSelectedMonth] = useState('September 2026');
  const [viewMode, setViewMode] = useState<'timeline' | 'calendar'>('timeline');

  // Filter registered events
  const registeredEvents = events.filter(e => e.isSignedUp || e.participationStatus === 'Approved');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs tracking-wider uppercase mb-1">
              <CalendarDays className="w-4 h-4" />
              <span>Section 3.5 • Personal Shift Calendar</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Volunteer Schedule</h1>
            <p className="text-sm text-slate-600 mt-1">
              Confirmed shifts, arrival times, break schedules, and direct options to request shift modifications.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Timeline View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Month Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Timeline */}
      {viewMode === 'timeline' ? (
        <div className="space-y-4">
          {registeredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 shadow-xs space-y-4 transition-all"
            >
              {/* Event Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    {evt.formattedDate}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {evt.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {evt.hours} Service Hours
                  </span>
                  <button
                    onClick={() => onRequestShiftChange(evt.title)}
                    className="px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-slate-500" />
                    <span>Request Shift Change</span>
                  </button>
                </div>
              </div>

              {/* Event Title & Team */}
              <div>
                <h3 className="text-lg font-bold text-slate-900">{evt.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Organized by <strong>{evt.organization}</strong> • Assigned Team: <strong className="text-emerald-700">{evt.teamName || 'General Volunteer Pool'}</strong>
                </p>
              </div>

              {/* Shifts Breakdown */}
              <div className="space-y-3 pt-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Confirmed Shift Details & Breakdown:
                </h4>
                {evt.shifts && evt.shifts.length > 0 ? (
                  evt.shifts.map((sh) => (
                    <div
                      key={sh.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-bold text-slate-900">
                        <div className="flex items-center gap-2 text-emerald-800">
                          <Clock className="w-4 h-4 text-emerald-600" />
                          <span>Shift Time: {sh.startTime} – {sh.endTime}</span>
                        </div>
                        <span className="text-slate-600 font-normal">Activity: {sh.activity}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Location: <strong>{sh.location}</strong></span>
                        </div>
                        {sh.breakTimes && (
                          <div className="flex items-center gap-1.5 text-amber-800">
                            <Coffee className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>Break Schedule: <strong>{sh.breakTimes}</strong></span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600">
                    Standard shift: {evt.startTime} – {evt.endTime} at {evt.location}
                  </div>
                )}
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Leader: <strong>{evt.organizer.name}</strong> ({evt.organizer.email})
                </span>

                <button
                  onClick={onCheckInNow}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>Attendance Check-in</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Calendar Grid View */
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base">{selectedMonth}</h3>
            <div className="flex items-center gap-2">
              <button className="p-1 rounded hover:bg-slate-100 text-slate-600">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1 rounded hover:bg-slate-100 text-slate-600">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 pb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-xs">
            {/* Calendar Days Simulation for Sept 2026 */}
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
              const hasFest = day === 12;
              const hasPantry = day === 19;
              const hasCoast = day === 27;

              return (
                <div
                  key={day}
                  className={`min-h-[75px] p-1.5 rounded-xl border text-left flex flex-col justify-between transition-colors ${
                    hasFest
                      ? 'border-emerald-400 bg-emerald-50/60 font-bold'
                      : hasPantry
                      ? 'border-blue-400 bg-blue-50/60 font-bold'
                      : hasCoast
                      ? 'border-amber-400 bg-amber-50/60'
                      : 'border-slate-100 bg-slate-50/40 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-slate-700">{day}</span>
                  {hasFest && (
                    <span className="text-[10px] bg-emerald-600 text-white p-1 rounded font-semibold leading-tight block">
                      08:00 AM • Festival
                    </span>
                  )}
                  {hasPantry && (
                    <span className="text-[10px] bg-blue-600 text-white p-1 rounded font-semibold leading-tight block">
                      10:00 AM • Food Pantry
                    </span>
                  )}
                  {hasCoast && (
                    <span className="text-[10px] bg-amber-600 text-white p-1 rounded font-semibold leading-tight block">
                      09:00 AM • Coast Cleanup
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
