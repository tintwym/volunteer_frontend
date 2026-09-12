'use client';
// @ts-nocheck

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, Users, Check, ArrowRight, Sparkles } from 'lucide-react';

export const UpcomingEventsSection: React.FC = () => {
  const { events, joinEvent, setPage, t } = useApp();
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'thisWeek' | 'thisMonth'>('all');
  const [causeFilter, setCauseFilter] = useState<string>('All');

  const causes = ['All', 'Environment', 'Social Impact', 'Education', 'Charity'];

  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      if (causeFilter !== 'All' && evt.category !== causeFilter) return false;
      return true;
    });
  }, [events, causeFilter]);

  return (
    <section 
      id="upcoming-events-section"
      className="py-16 sm:py-20 bg-white dark:bg-stone-900 border-t border-stone-200/80 dark:border-stone-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 text-xs font-semibold mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Gather & Connect</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-editorial text-stone-900 dark:text-stone-100 tracking-tight">
              {t.sections.upcomingEvents}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm mt-1 max-w-xl">
              {t.sections.upcomingEventsSubtitle}
            </p>
          </div>

          <button
            onClick={() => setPage('events')}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors group self-start md:self-auto"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800">
          {/* Time range filters */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs font-medium">
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
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Cause filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {causes.map(c => (
              <button
                key={c}
                onClick={() => setCauseFilter(c)}
                className={`px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                  causeFilter === c
                    ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredEvents.map(event => (
            <div
              key={event.id}
              className="rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-850/50 hover:bg-white dark:hover:bg-stone-850 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row group"
            >
              {/* Event Image */}
              <div className="sm:w-56 h-48 sm:h-auto overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0 relative">
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

              {/* Event Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-1.5">
                    <img
                      src={event.organizerLogo}
                      alt={event.organizer}
                      className="w-4 h-4 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-semibold text-stone-700 dark:text-stone-300 truncate">
                      {event.organizer}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-editorial text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                    {event.name}
                  </h3>

                  <p className="mt-1.5 text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="mt-3 space-y-1 text-xs text-stone-500 dark:text-stone-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-medium text-stone-800 dark:text-stone-200">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* Footer RSVP Bar */}
                <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400">
                    <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong className="font-bold text-stone-900 dark:text-stone-100">{event.attendeesCount}</strong> attending
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => joinEvent(event.id)}
                    className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      event.isJoined
                        ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:shadow-md'
                    }`}
                  >
                    {event.isJoined ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Attending</span>
                      </>
                    ) : (
                      <span>{t.sections.joinEvent}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
