'use client';
// @ts-nocheck

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { OpportunityCard } from '../opportunities/OpportunityCard';
import { Filter, ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedOpportunitiesSection: React.FC = () => {
  const { opportunities, setPage, t } = useApp();
  const [selectedCause, setSelectedCause] = useState<string>('All');
  const [modeFilter, setModeFilter] = useState<'all' | 'inPerson' | 'remote'>('all');

  const causes = ['All', 'Environment', 'Education', 'Social Impact', 'Community', 'Charity'];

  const filteredOpportunities = useMemo(() => {
    return opportunities
      .filter(opp => opp.status !== 'archived')
      .filter(opp => {
        if (selectedCause !== 'All' && opp.cause !== selectedCause) return false;
        if (modeFilter === 'remote' && !opp.isRemote) return false;
        if (modeFilter === 'inPerson' && opp.isRemote) return false;
        return true;
      })
      .slice(0, 6); // Display top 6 on homepage
  }, [opportunities, selectedCause, modeFilter]);

  return (
    <section 
      id="featured-opportunities-section"
      className="py-16 sm:py-20 bg-stone-50 dark:bg-stone-950 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Involved Locally</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-editorial text-stone-900 dark:text-stone-100 tracking-tight">
              {t.sections.featuredOpportunities}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm mt-1 max-w-xl">
              {t.sections.featuredOpportunitiesSubtitle}
            </p>
          </div>

          <button
            onClick={() => setPage('opportunities')}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors group self-start md:self-auto"
          >
            <span>{t.sections.viewAllOpportunities}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs">
          {/* Cause tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-xs">
            {causes.map((cause) => (
              <button
                key={cause}
                onClick={() => setSelectedCause(cause)}
                className={`px-3.5 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                  selectedCause === cause
                    ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {cause}
              </button>
            ))}
          </div>

          {/* Remote / In Person Segmented Switch */}
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl text-xs font-medium self-end sm:self-auto">
            <button
              onClick={() => setModeFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                modeFilter === 'all'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setModeFilter('inPerson')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                modeFilter === 'inPerson'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              In-Person
            </button>
            <button
              onClick={() => setModeFilter('remote')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                modeFilter === 'remote'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Remote
            </button>
          </div>
        </div>

        {/* Opportunity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setPage('opportunities')}
            className="px-6 py-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-emerald-500 text-stone-800 dark:text-stone-200 font-semibold text-xs transition-all shadow-xs hover:shadow-md inline-flex items-center gap-2"
          >
            <span>Explore All 2,500+ Community Opportunities</span>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
          </button>
        </div>
      </div>
    </section>
  );
};
