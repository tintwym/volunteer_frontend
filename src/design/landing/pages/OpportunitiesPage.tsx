'use client';
// @ts-nocheck

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from '../components/opportunities/OpportunityCard';
import { Opportunity } from '../types';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Filter, 
  Clock, 
  Sparkles, 
  X,
  HeartHandshake,
  CheckCircle2,
  Building2,
  Shield
} from 'lucide-react';

export const OpportunitiesPage: React.FC = () => {
  const { 
    opportunities, 
    openApplyModal, 
    selectedOpportunityId, 
    setSelectedOpportunityId,
    setPage,
    setSelectedOrgId,
    organizations,
    t 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCause, setSelectedCause] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCommitment, setSelectedCommitment] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [detailedModalOpp, setDetailedModalOpp] = useState<Opportunity | null>(null);

  // If redirected with selectedOpportunityId, pop open detail modal
  React.useEffect(() => {
    if (selectedOpportunityId) {
      const match = opportunities.find(o => o.id === selectedOpportunityId);
      if (match) {
        setDetailedModalOpp(match);
      }
    }
  }, [selectedOpportunityId, opportunities]);

  const causes = ['All', 'Environment', 'Education', 'Social Impact', 'Community', 'Charity'];
  const commitments = ['All', 'Flexible', '2-4 hours/week', 'Half day', '3-5 hours/week'];
  const locations = ['All', 'Greenway Urban Farm', 'Hope Center Kitchen', 'Beacon Hill Library', 'Veterans Community Center', 'Virtual / Online'];
  const skillsList = ['All', 'Gardening', 'Cooking', 'Tutoring', 'Compassion', 'Mentoring', 'Organizing'];

  const filtered = useMemo(() => {
    return opportunities.filter(opp => {
      if (opp.status === 'archived') return false;
      if (remoteOnly && !opp.isRemote) return false;
      if (selectedCause !== 'All' && opp.cause !== selectedCause) return false;
      if (selectedCommitment !== 'All' && opp.timeCommitment !== selectedCommitment) return false;
      if (selectedLocation !== 'All' && !opp.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
      if (selectedSkill !== 'All' && !opp.skillsRequired.includes(selectedSkill)) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesText = 
          opp.title.toLowerCase().includes(q) ||
          opp.organization.toLowerCase().includes(q) ||
          opp.shortDescription.toLowerCase().includes(q) ||
          opp.location.toLowerCase().includes(q);
        if (!matchesText) return false;
      }
      return true;
    });
  }, [opportunities, searchTerm, selectedCause, selectedLocation, selectedCommitment, selectedSkill, remoteOnly]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCause('All');
    setSelectedLocation('All');
    setSelectedCommitment('All');
    setSelectedSkill('All');
    setRemoteOnly(false);
  };

  return (
    <div id="opportunities-page" className="py-10 bg-stone-50 dark:bg-stone-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Volunteer Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-stone-900 dark:text-stone-100 tracking-tight">
            Find Meaningful Volunteer Opportunities
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-2 leading-relaxed">
            Search hundreds of shifts organized by verified local nonprofits, community gardens, youth centers, and environmental coalitions.
          </p>
        </div>

        {/* Filter & Search Hub */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-xs mb-8 space-y-4">
          {/* Main search bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by role title, organization, cause, or keywords..."
              className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter dropdowns grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {/* Cause filter */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-500 dark:text-stone-400 mb-1">
                Cause / Focus Area
              </label>
              <select
                value={selectedCause}
                onChange={(e) => setSelectedCause(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none"
              >
                {causes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Time commitment */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-500 dark:text-stone-400 mb-1">
                Time Commitment
              </label>
              <select
                value={selectedCommitment}
                onChange={(e) => setSelectedCommitment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none"
              >
                {commitments.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-500 dark:text-stone-400 mb-1">
                Location / Site
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none"
              >
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-500 dark:text-stone-400 mb-1">
                Required Skills
              </label>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none"
              >
                {skillsList.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Quick toggle chips */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 dark:border-stone-800 text-xs">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remoteOnly}
                  onChange={(e) => setRemoteOnly(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-stone-700 dark:text-stone-300 font-medium">
                  Virtual / Remote Opportunities Only
                </span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-stone-500 dark:text-stone-400 font-medium">
                Showing <strong className="text-stone-900 dark:text-stone-100">{filtered.length}</strong> opportunities
              </span>
              {(selectedCause !== 'All' || selectedLocation !== 'All' || selectedCommitment !== 'All' || selectedSkill !== 'All' || remoteOnly || searchTerm) && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Opportunities Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((opp) => (
              <OpportunityCard 
                key={opp.id} 
                opportunity={opp}
                onViewDetails={(opp) => setDetailedModalOpp(opp)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-stone-900 p-12 text-center rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3">
            <HeartHandshake className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto" />
            <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
              No matching volunteer opportunities found
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your cause, location, or skill filters, or reset all criteria to view all open opportunities.
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Detailed Opportunity Popover Modal */}
      {detailedModalOpp && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="relative h-60 overflow-hidden bg-stone-800 shrink-0">
              <img
                src={detailedModalOpp.imageUrl}
                alt={detailedModalOpp.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => {
                  setDetailedModalOpp(null);
                  setSelectedOpportunityId(null);
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-white text-xs font-semibold">
                  {detailedModalOpp.cause}
                </span>
                {detailedModalOpp.isRemote && (
                  <span className="px-3 py-1 rounded-full bg-teal-600 text-white text-xs font-semibold">
                    Remote
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <img
                  src={detailedModalOpp.orgLogo}
                  alt={detailedModalOpp.organization}
                  className="w-6 h-6 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => {
                    const matchedOrg = organizations.find(o => o.id === detailedModalOpp.organizationId);
                    if (matchedOrg) {
                      setSelectedOrgId(matchedOrg.id);
                      setPage('organization-profile');
                    }
                  }}
                  className="font-bold text-stone-800 dark:text-stone-200 hover:text-emerald-600 underline"
                >
                  {detailedModalOpp.organization}
                </button>
              </div>

              <h2 className="text-2xl font-bold font-editorial text-stone-900 dark:text-stone-100">
                {detailedModalOpp.title}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-850 text-xs text-stone-600 dark:text-stone-300">
                <div>
                  <span className="text-[10px] text-stone-400 block">Date</span>
                  <strong className="font-semibold text-stone-800 dark:text-stone-200">{detailedModalOpp.date}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Time Commitment</span>
                  <strong className="font-semibold text-stone-800 dark:text-stone-200">{detailedModalOpp.timeCommitment}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Open Spots</span>
                  <strong className="font-semibold text-emerald-600">{detailedModalOpp.spotsAvailable} remaining</strong>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                  Location & Directions
                </h4>
                <p className="text-xs text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{detailedModalOpp.location}</span>
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                  About this Volunteer Role
                </h4>
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  {detailedModalOpp.fullDescription}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                  Skills & Helpful Background
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {detailedModalOpp.skillsRequired.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium border border-emerald-200 dark:border-emerald-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 dark:bg-stone-850 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setDetailedModalOpp(null);
                  setSelectedOpportunityId(null);
                }}
                className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-400"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  openApplyModal(detailedModalOpp);
                  setDetailedModalOpp(null);
                  setSelectedOpportunityId(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Volunteer Now ({detailedModalOpp.spotsAvailable} spots left)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
