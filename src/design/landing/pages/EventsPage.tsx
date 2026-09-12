'use client';
// @ts-nocheck

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Check, 
  Search, 
  Sparkles,
  Filter 
} from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { events, joinEvent, t } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'thisWeek' | 'thisMonth'>('all');
  const [causeFilter, setCauseFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');

  const causes = ['All', 'Environment', 'Social Impact', 'Education', 'Charity', 'Community'];
  const locations = ['All', 'Greenway Urban Farm', 'Hope Center Kitchen', 'Beacon Hill Library', 'Veterans Community Center'];

  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      if (causeFilter !== 'All' && evt.category !== causeFilter) return false;
      if (locationFilter !== 'All' && !evt.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          evt.name.toLowerCase().includes(q) ||
          evt.description.toLowerCase().includes(q) ||
          evt.organizer.toLowerCase().includes(q) ||
          evt.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [events, causeFilter, locationFilter, searchTerm]);

  return (
    <div id="events-index-page" className="py-10 bg-stone-50 dark:bg-stone-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 text-xs font-semibold mb-2">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Community Calendar</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-stone-900 dark:text-stone-100 tracking-tight">
            Upcoming Community Events & Gatherings
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-2 leading-relaxed">
            Attend weekend river cleanups, farmers market distribution days, youth coding hackathons, and charity fundraisers happening in your neighborhood.
          </p>
        </div>

        {/* Filter Hub */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events, workshops, rallies..."
                className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Time Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-medium w-full sm:w-auto">
              {[
                { id: 'all', label: 'All Dates' },
                { id: 'today', label: t.common.today },
                { id: 'thisWeek', label: t.common.thisWeek },
                { id: 'thisMonth', label: t.common.thisMonth }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setTimeFilter(f.id as any)}
                  className={`px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                    timeFilter === f.id
                      ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Causes and Location filter chips */}
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-stone-400 font-medium shrink-0">Cause:</span>
              {causes.map(c => (
                <button
                  key={c}
                  onClick={() => setCauseFilter(c)}
                  className={`px-3 py-1 rounded-lg transition-colors whitespace-nowrap ${
                    causeFilter === c
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-medium shrink-0">Location:</span>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 outline-none"
              >
                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row group"
            >
              {/* Image */}
              <div className="sm:w-60 h-52 sm:h-auto overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0 relative">
                <img
                  src={event.imageUrl}
                  alt={event.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-semibold">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
                    <img
                      src={event.organizerLogo}
                      alt={event.organizer}
                      className="w-5 h-5 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-semibold text-stone-700 dark:text-stone-300">
                      {event.organizer}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-editorial text-stone-900 dark:text-stone-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                    {event.name}
                  </h3>

                  <p className="mt-2 text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>

                  <div className="mt-4 space-y-1.5 text-xs text-stone-500 dark:text-stone-400">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="font-medium text-stone-800 dark:text-stone-200">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* RSVP and attendee count */}
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400">
                    <Users className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>
                      <strong className="font-bold text-stone-900 dark:text-stone-100">{event.attendeesCount}</strong> RSVPs
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => joinEvent(event.id)}
                    className={`py-2.5 px-5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      event.isJoined
                        ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                    }`}
                  >
                    {event.isJoined ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Attending</span>
                      </>
                    ) : (
                      <span>Join Event</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
