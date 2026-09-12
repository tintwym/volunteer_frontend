'use client';
// @ts-nocheck

import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, HeartHandshake, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const FeaturedOrganizationsSection: React.FC = () => {
  const { organizations, setSelectedOrgId, setPage, t } = useApp();

  return (
    <section 
      id="featured-organizations-section"
      className="py-16 sm:py-20 bg-white dark:bg-stone-900 border-t border-stone-200/80 dark:border-stone-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Nonprofits & Initiatives</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-editorial text-stone-900 dark:text-stone-100 tracking-tight">
              {t.sections.featuredOrganizations}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm mt-1 max-w-xl">
              {t.sections.featuredOrganizationsSubtitle}
            </p>
          </div>

          <button
            onClick={() => setPage('organizations')}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors group self-start md:self-auto"
          >
            <span>{t.sections.viewOrganization} Directory</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {organizations.map((org) => (
            <div
              key={org.id}
              className="rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-850/50 hover:bg-white dark:hover:bg-stone-850 overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-500/40 transition-all duration-300 flex flex-col group"
            >
              {/* Cover Photo */}
              <div className="relative h-32 overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={org.coverPhoto}
                  alt={org.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Verified badge */}
                {org.isVerified && (
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-[10px] font-bold text-teal-700 dark:text-teal-400 flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified 501(c)(3)</span>
                  </div>
                )}
              </div>

              {/* Body Content with Overlapping Logo */}
              <div className="px-5 pb-5 pt-0 relative flex-1 flex flex-col justify-between">
                {/* Logo */}
                <div className="-mt-8 mb-3 flex items-end justify-between">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white dark:border-stone-900 shadow-md bg-white shrink-0">
                    <img
                      src={org.logo}
                      alt={org.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold flex items-center gap-1">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>{org.opportunitiesCount} opportunities</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold font-editorial text-stone-900 dark:text-stone-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-1">
                    {org.name}
                  </h3>

                  <div className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">{org.location}</span>
                  </div>

                  <p className="mt-2.5 text-xs text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                    {org.mission}
                  </p>
                </div>

                {/* Card footer CTA */}
                <div className="mt-4 pt-3 border-t border-stone-200/80 dark:border-stone-800">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedOrgId(org.id);
                      setPage('organization-profile');
                    }}
                    className="w-full py-2 px-3 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-teal-50 dark:hover:bg-teal-950/40 hover:border-teal-400 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{t.sections.viewOrganization}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
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
