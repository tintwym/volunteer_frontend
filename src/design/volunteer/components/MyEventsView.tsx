'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { 
  CalendarCheck, 
  MapPin, 
  Clock, 
  User, 
  Users, 
  CheckSquare, 
  AlertCircle, 
  FileText, 
  X, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { VolunteerEvent, ParticipationStatus } from '../types';

interface MyEventsViewProps {
  events: VolunteerEvent[];
  onCancelParticipation: (eventId: string) => void;
  onOpenTasks: () => void;
  onOpenTeam: () => void;
  onOpenSchedule: () => void;
}

export const MyEventsView: React.FC<MyEventsViewProps> = ({
  events,
  onCancelParticipation,
  onOpenTasks,
  onOpenTeam,
  onOpenSchedule
}) => {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Active' | 'Completed' | 'Cancelled'>('Upcoming');
  const [selectedEventForCancel, setSelectedEventForCancel] = useState<VolunteerEvent | null>(null);

  // Group events
  const getEventCategory = (e: VolunteerEvent): 'Upcoming' | 'Active' | 'Completed' | 'Cancelled' => {
    if (e.participationStatus === 'Cancelled') return 'Cancelled';
    if (e.participationStatus === 'Completed') return 'Completed';
    if (e.id === 'evt-101') return 'Active'; // Active event today
    return 'Upcoming';
  };

  const filteredEvents = events.filter(e => {
    if (!e.isSignedUp && !e.participationStatus) return false;
    return getEventCategory(e) === activeTab;
  });

  const handleConfirmCancel = () => {
    if (!selectedEventForCancel) return;
    onCancelParticipation(selectedEventForCancel.id);
    setSelectedEventForCancel(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs tracking-wider uppercase mb-1">
              <CalendarCheck className="w-4 h-4" />
              <span>Section 3.4 • Volunteer Engagements</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Events & Commitments</h1>
            <p className="text-sm text-slate-600 mt-1">
              Overview of all shifts you have registered for, active assignments, and completed community service events.
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
          {(['Upcoming', 'Active', 'Completed', 'Cancelled'] as const).map((tab) => {
            const count = events.filter(e => (e.isSignedUp || e.participationStatus) && getEventCategory(e) === tab).length;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{tab} Events</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
            <CalendarCheck className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="font-semibold text-slate-700">No {activeTab.toLowerCase()} events found</p>
            <p className="text-xs text-slate-400 mt-1">
              {activeTab === 'Upcoming' 
                ? 'Explore the Event Discovery tab to apply for open volunteer shifts.' 
                : `You do not have any records categorized as ${activeTab}.`}
            </p>
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 shadow-xs space-y-4 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded">
                    {evt.category}
                  </span>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {evt.formattedDate}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                    {evt.participationStatus || 'Approved'}
                  </span>
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {evt.hours} Verified Hours
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">{evt.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Organized by <strong>{evt.organization}</strong>
                </p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              {/* Grid with Team, Leader, Location, Instructions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs text-slate-600">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>Assigned Squad: {evt.teamName || 'Registration Team'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 pl-5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Leader: <strong>{evt.organizer.name}</strong> ({evt.organizer.role})</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 pl-5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Shift: <strong>{evt.startTime} – {evt.endTime}</strong> ({evt.duration})</span>
                  </div>
                </div>
              </div>

              {/* Shift Instructions */}
              {evt.instructions && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-0.5">
                  <span className="font-bold block">On-Site Arrival Instructions:</span>
                  <p>{evt.instructions}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenTasks}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>View Assigned Tasks</span>
                  </button>
                  <button
                    onClick={onOpenTeam}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Meet Team</span>
                  </button>
                </div>

                {activeTab === 'Upcoming' && (
                  <button
                    onClick={() => setSelectedEventForCancel(evt)}
                    className="text-xs text-red-600 hover:text-red-700 font-medium underline"
                  >
                    Cancel Participation
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cancellation Confirmation Modal */}
      {selectedEventForCancel && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-2 text-red-700 font-bold text-base mb-1">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span>Cancel Shift Registration?</span>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Are you sure you want to withdraw your participation from <strong>{selectedEventForCancel.title}</strong>? This will release your spot to the next waitlisted volunteer.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedEventForCancel(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Keep My Shift
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm shadow-red-200"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
