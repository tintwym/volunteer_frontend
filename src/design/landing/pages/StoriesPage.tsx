'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VolunteerStory } from '../types';
import { 
  BookOpen, 
  Quote, 
  HeartHandshake, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Building2 
} from 'lucide-react';

export const StoriesPage: React.FC = () => {
  const { stories, opportunities, openApplyModal, setPage } = useApp();
  const [selectedStory, setSelectedStory] = useState<VolunteerStory>(stories[0]);

  return (
    <div id="stories-index-page" className="py-10 bg-stone-50 dark:bg-stone-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Stories That Inspire</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-stone-900 dark:text-stone-100 tracking-tight">
            Voices from the Field: Reflections of Volunteer Life
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-2 leading-relaxed">
            Real stories, personal transformations, and heartfelt insights from neighbors who chose to show up for others.
          </p>
        </div>

        {/* Featured Story In-Depth Readout */}
        <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xl overflow-hidden mb-12 grid grid-cols-1 lg:grid-cols-12">
          {/* Volunteer Portrait Column */}
          <div className="lg:col-span-5 relative min-h-[380px] sm:min-h-[480px] bg-stone-800 overflow-hidden">
            <img
              src={selectedStory.avatar}
              alt={selectedStory.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-[11px] font-semibold border border-emerald-500/40">
                Featured Volunteer Story
              </span>
              <h3 className="text-2xl font-bold font-editorial">{selectedStory.name}</h3>
              <p className="text-xs text-stone-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{selectedStory.organization} • {selectedStory.role}</span>
              </p>
              <div className="text-[11px] text-stone-400 pt-1">
                {selectedStory.hoursContributed} hours contributed to date
              </div>
            </div>
          </div>

          {/* Full Narrative Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div>
              <Quote className="w-10 h-10 text-rose-500/30 mb-2" />
              <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 dark:text-stone-100 leading-tight">
                “{selectedStory.storyTitle}”
              </h2>

              <p className="mt-4 text-base font-medium text-emerald-700 dark:text-emerald-400 leading-relaxed font-editorial">
                {selectedStory.shortIntroduction}
              </p>

              <div className="mt-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed space-y-3 whitespace-pre-line">
                <p>{selectedStory.fullStory}</p>
              </div>
            </div>

            {/* Related Volunteer Shift Connector */}
            {selectedStory.relatedOpportunityId && (
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-0.5">
                    Inspired by {selectedStory.name.split(' ')[0]}?
                  </span>
                  <p className="text-xs text-stone-700 dark:text-stone-300 font-medium">
                    Serve alongside the team at {selectedStory.organization}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const matched = opportunities.find(o => o.id === selectedStory.relatedOpportunityId);
                    if (matched) {
                      openApplyModal(matched);
                    } else {
                      setPage('opportunities');
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm flex items-center gap-1.5"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Join this Opportunity</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stories Library Grid */}
        <div>
          <h3 className="text-xl font-bold font-editorial text-stone-900 dark:text-stone-100 mb-6">
            More Voices That Inspire
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div
                key={story.id}
                onClick={() => {
                  setSelectedStory(story);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                  selectedStory.id === story.id
                    ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/30 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-emerald-400 hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={story.avatar}
                      alt={story.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-stone-200 dark:ring-stone-700"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 transition-colors">
                        {story.name}
                      </h4>
                      <span className="text-xs text-stone-500 block truncate">
                        {story.organization}
                      </span>
                    </div>
                  </div>

                  <h5 className="text-base font-bold font-editorial text-stone-900 dark:text-stone-100 line-clamp-2 leading-snug">
                    “{story.storyTitle}”
                  </h5>

                  <p className="mt-2 text-xs text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                    {story.shortIntroduction}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>Read full experience</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
