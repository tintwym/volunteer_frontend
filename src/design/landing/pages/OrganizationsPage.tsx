'use client';
// @ts-nocheck

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, MapPin, Building2, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

export const OrganizationsPage: React.FC = () => {
  const { organizations, setSelectedOrgId, setPage, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Agriculture & Food Security', 'Social Services & Homelessness', 'Youth & STEM Education', 'Veterans & Civic Health'];

  const filteredOrgs = useMemo(() => {
    return organizations.filter(org => {
      if (categoryFilter !== 'All' && org.category !== categoryFilter) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          org.name.toLowerCase().includes(q) ||
          org.mission.toLowerCase().includes(q) ||
          org.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [organizations, searchTerm, categoryFilter]);

  return (
    <div id="organizations-directory-page" className="py-10 bg-stone-50 dark:bg-stone-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Community Partners</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-stone-900 dark:text-stone-100 tracking-tight">
            Nonprofit & Community Organizations
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-2 leading-relaxed">
            Discover verified nonprofits, grassroots collectives, urban farms, and civic mutual aid groups actively powering neighborhood change.
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-xs mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-600 dark:text-teal-400"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search organizations by name, cause, city..."
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 py-2 pl-10 pr-3 text-xs text-stone-900 outline-none focus:ring-2 focus:ring-teal-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder:text-stone-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap ${
                  categoryFilter === cat
                    ? 'bg-teal-600 text-white font-semibold shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrgs.map((org) => (
            <div
              key={org.id}
              className="rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-500/40 transition-all duration-300 flex flex-col group"
            >
              {/* Cover Photo */}
              <div className="relative h-40 overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={org.coverPhoto}
                  alt={org.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {org.isVerified && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-[10px] font-bold text-teal-700 dark:text-teal-400 flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified 501(c)(3)</span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5 pt-0 relative flex-1 flex flex-col justify-between">
                <div className="-mt-10 mb-3 flex items-end justify-between">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white dark:border-stone-900 shadow-md bg-white shrink-0">
                    <img
                      src={org.logo}
                      alt={org.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>{org.opportunitiesCount} opportunities</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-editorial text-stone-900 dark:text-stone-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {org.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{org.location}</span>
                  </div>

                  <p className="mt-3 text-xs text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                    {org.mission}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">
                    Est. {org.establishedYear}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedOrgId(org.id);
                      setPage('organization-profile');
                    }}
                    className="px-4 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 hover:bg-teal-600 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
