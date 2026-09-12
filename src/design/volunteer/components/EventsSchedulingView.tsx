'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Search, 
  Filter, 
  Check, 
  Plus, 
  CalendarDays, 
  List, 
  Download, 
  Users, 
  Video, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { VolunteerEvent, EventCategory } from '../types';
import confetti from 'canvas-confetti';

interface EventsSchedulingViewProps {
  events: VolunteerEvent[];
  onToggleSignup: (eventId: string) => void;
  onSelectEvent: (event: VolunteerEvent) => void;
  setActiveTab: (tab: string) => void;
}

export const EventsSchedulingView: React.FC<EventsSchedulingViewProps> = ({
  events,
  onToggleSignup,
  onSelectEvent,
  setActiveTab
}) => {
  const [subView, setSubView] = useState<'explore' | 'schedule'>('explore');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scheduleViewMode, setScheduleViewMode] = useState<'list' | 'calendar'>('list');

  const categories: (EventCategory | 'All')[] = [
    'All',
    'Environment',
    'Food Relief',
    'Education & Youth',
    'Healthcare & Wellness',
    'Animal Welfare',
    'Community Aid'
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const registeredEvents = events.filter(e => e.isSignedUp);

  const handleSignupClick = (event: VolunteerEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!event.isSignedUp) {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
    onToggleSignup(event.id);
  };

  // Simple ICS file generator for export to calendar
  const handleExportICS = (event: VolunteerEvent) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//VolunteerHub//Event//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description} - Verified Service: ${event.hours} hrs
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Sub-view Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Event Discovery & Shift Scheduling
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Browse verified community volunteer shifts, reserve your spot, and track your active schedule.
          </p>
        </div>

        {/* View switcher tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto shrink-0">
          <button
            id="tab-explore-events"
            onClick={() => setSubView('explore')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              subView === 'explore'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Explore Opportunities</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
              {events.length}
            </span>
          </button>

          <button
            id="tab-my-schedule"
            onClick={() => setSubView('schedule')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              subView === 'schedule'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>My Shift Schedule</span>
            {registeredEvents.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                {registeredEvents.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {subView === 'explore' ? (
        <>
          {/* Filters and Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search shifts by title, organization, neighborhood, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="text-xs text-slate-500 shrink-0 font-medium">
                  Showing {filteredEvents.length} opportunities
                </div>
              </div>
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-600 font-medium shrink-0 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-slate-600" />
                Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-medium ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredEvents.map((event) => {
              const spotsLeft = event.spotsTotal - event.spotsFilled;
              const isAlmostFull = spotsLeft <= 3 && spotsLeft > 0;

              return (
                <div
                  key={event.id}
                  onClick={() => onSelectEvent(event)}
                  className={`
                    bg-white rounded-2xl border transition-all cursor-pointer p-5 flex flex-col justify-between hover:shadow-md
                    ${event.isSignedUp ? 'border-emerald-500 ring-1 ring-emerald-500/30' : 'border-slate-200 hover:border-slate-300'}
                  `}
                >
                  <div className="space-y-3">
                    {/* Top tags and hours */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          {event.category}
                        </span>
                        {event.isVirtual ? (
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-50 text-purple-700 flex items-center gap-1">
                            <Video className="w-3 h-3" /> Virtual
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> In-Person
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-950 font-bold text-xs border border-emerald-200">
                          +{event.hours} hrs verified
                        </span>
                      </div>
                    </div>

                    {/* Title and Org */}
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-600 mt-0.5">
                        {event.organization}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Date, Time, Location details */}
                    <div className="space-y-1.5 pt-1 text-xs text-slate-600 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-semibold text-slate-900">{event.formattedDate}</span>
                        <span className="text-slate-400">&bull;</span>
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    {/* Capacity Indicator */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 flex items-center gap-1">
                          <Users className="w-3 h-3" /> Spots: {event.spotsFilled} / {event.spotsTotal} filled
                        </span>
                        {isAlmostFull && (
                          <span className="text-rose-600 font-bold">Only {spotsLeft} spots left!</span>
                        )}
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${event.spotsFilled >= event.spotsTotal ? 'bg-rose-500' : 'bg-emerald-600'}`}
                          style={{ width: `${Math.min(100, (event.spotsFilled / event.spotsTotal) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={event.organizer.avatar}
                        alt={event.organizer.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div className="text-[11px] leading-tight">
                        <div className="font-bold text-slate-800">{event.organizer.name}</div>
                        <div className="text-slate-400">{event.organizer.role}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleSignupClick(event, e)}
                        className={`
                          px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all
                          ${event.isSignedUp 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300' 
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'}
                        `}
                      >
                        {event.isSignedUp ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Registered</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Sign Up Shift</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* My Shift Schedule / Calendar View */
        <div className="space-y-5">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Your Registered Volunteer Shifts
              </h2>
              <p className="text-xs text-slate-500">
                You are registered for {registeredEvents.length} upcoming events (totaling {registeredEvents.reduce((acc, e) => acc + e.hours, 0)} hours)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setScheduleViewMode('list')}
                className={`p-2 rounded-lg text-xs font-semibold transition-colors ${
                  scheduleViewMode === 'list' ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-100'
                }`}
                title="List Agenda View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setScheduleViewMode('calendar')}
                className={`p-2 rounded-lg text-xs font-semibold transition-colors ${
                  scheduleViewMode === 'calendar' ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-100'
                }`}
                title="Calendar Grid View"
              >
                <CalendarDays className="w-4 h-4" />
              </button>
            </div>
          </div>

          {registeredEvents.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No shifts registered yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                Explore the volunteer catalog to find upcoming initiatives in environmental restoration, food distribution, or youth tutoring.
              </p>
              <button
                onClick={() => setSubView('explore')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                Find Shifts
              </button>
            </div>
          ) : scheduleViewMode === 'list' ? (
            <div className="space-y-4">
              {registeredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl border border-emerald-200/80 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        {event.category}
                      </span>
                      <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Confirmed Participant
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {event.organization} &bull; Organizer: {event.organizer.name} ({event.organizer.email})
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs text-slate-600 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        <strong>{event.formattedDate}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        {event.startTime} - {event.endTime} ({event.hours} hrs)
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {event.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-col items-end gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <button
                      onClick={() => handleExportICS(event)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      title="Download .ics Calendar Event"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Add to Calendar</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('messages')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold transition-colors"
                    >
                      Chat with Organizer
                    </button>

                    <button
                      onClick={(e) => handleSignupClick(event, e)}
                      className="text-xs text-rose-600 hover:text-rose-700 hover:underline pt-1"
                    >
                      Withdraw / Cancel Shift
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Month Calendar Grid representation */
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="text-center font-bold text-slate-900 mb-4">
                September 2026 Shift Calendar
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 mb-2">
                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-xs">
                {Array.from({ length: 35 }).map((_, idx) => {
                  const day = idx - 1; // Sept 2026 starts on Tuesday
                  const isValidDay = day >= 1 && day <= 30;
                  const matchingEvents = registeredEvents.filter(e => {
                    const eventDay = parseInt(e.date.split('-')[2], 10);
                    return isValidDay && eventDay === day;
                  });

                  return (
                    <div
                      key={idx}
                      className={`min-h-[75px] p-1.5 border rounded-lg text-left transition-colors ${
                        isValidDay 
                          ? matchingEvents.length > 0 
                            ? 'bg-emerald-50/70 border-emerald-300' 
                            : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50' 
                          : 'bg-slate-100/30 border-transparent text-slate-300'
                      }`}
                    >
                      {isValidDay && (
                        <>
                          <span className={`font-semibold ${matchingEvents.length > 0 ? 'text-emerald-900 font-bold' : 'text-slate-600'}`}>
                            {day}
                          </span>
                          {matchingEvents.map(me => (
                            <div
                              key={me.id}
                              onClick={() => onSelectEvent(me)}
                              className="mt-1 p-1 bg-emerald-600 text-white rounded text-[10px] font-medium truncate cursor-pointer shadow-xs"
                              title={`${me.title} (${me.startTime})`}
                            >
                              {me.startTime.split(' ')[0]} {me.title}
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
