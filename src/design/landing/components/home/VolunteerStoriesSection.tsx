'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VolunteerStory } from '../../types';
import { Quote, ArrowRight, Sparkles, HeartHandshake, ChevronRight } from 'lucide-react';

export const VolunteerStoriesSection: React.FC = () => {
  const { stories, setPage, openApplyModal, opportunities, t } = useApp();
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const activeStory = stories[activeStoryIndex] || stories[0];

  return (
    <section 
      id="volunteer-stories-section"
      className="py-16 sm:py-20 bg-stone-50 dark:bg-stone-950 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Reflections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-editorial text-stone-900 dark:text-stone-100 tracking-tight">
              {t.sections.storiesThatInspire}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm mt-1 max-w-xl">
              {t.sections.storiesThatInspireSubtitle}
            </p>
          </div>

          <button
            onClick={() => setPage('stories')}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors group self-start md:self-auto"
          >
            <span>{t.sections.readVolunteerStories}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured Story Spotlight Card */}
        {activeStory && (
          <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Story Visual Left Column */}
            <div className="lg:col-span-5 relative min-h-[340px] sm:min-h-[420px] bg-stone-800 overflow-hidden">
              <img
                src={activeStory.avatar}
                alt={activeStory.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
                  Volunteer Spotlight
                </div>
                <div className="text-xl font-bold font-editorial">{activeStory.name}</div>
                <div className="text-xs text-stone-300">
                  Volunteering with <strong className="text-white">{activeStory.organization}</strong>
                </div>
                <div className="text-[11px] text-stone-400 mt-1">
                  {activeStory.hoursContributed} hours contributed • {activeStory.role}
                </div>
              </div>
            </div>

            {/* Story Narrative Right Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <Quote className="w-10 h-10 text-emerald-600/30 dark:text-emerald-400/20 mb-2" />
                <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 dark:text-stone-100 leading-tight">
                  “{activeStory.storyTitle}”
                </h3>

                <p className="mt-3 text-sm font-medium text-emerald-700 dark:text-emerald-400 leading-relaxed">
                  {activeStory.shortIntroduction}
                </p>

                <p className="mt-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-4">
                  {activeStory.fullStory}
                </p>
              </div>

              {/* Related Opportunity Quick Link */}
              {activeStory.relatedOpportunityId && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                      Inspired to help like {activeStory.name.split(' ')[0]}?
                    </span>
                    <p className="text-xs text-stone-700 dark:text-stone-300 font-medium">
                      Join the upcoming shift at {activeStory.organization}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const matched = opportunities.find(o => o.id === activeStory.relatedOpportunityId);
                      if (matched) {
                        openApplyModal(matched);
                      } else {
                        setPage('opportunities');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm"
                  >
                    Volunteer for this Cause
                  </button>
                </div>
              )}

              {/* Story selector pills */}
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {stories.map((story, idx) => (
                    <button
                      key={story.id}
                      onClick={() => setActiveStoryIndex(idx)}
                      className={`h-2.5 rounded-full transition-all ${
                        activeStoryIndex === idx
                          ? 'w-8 bg-emerald-600'
                          : 'w-2.5 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400'
                      }`}
                      aria-label={`View story by ${story.name}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setPage('stories')}
                  className="text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1"
                >
                  <span>Explore all volunteer interviews</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
