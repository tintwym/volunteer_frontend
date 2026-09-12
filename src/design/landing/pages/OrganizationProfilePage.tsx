'use client';
// @ts-nocheck

import React from 'react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from '../components/opportunities/OpportunityCard';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  ShieldCheck, 
  ArrowLeft, 
  HeartHandshake, 
  Newspaper, 
  Camera,
  Calendar
} from 'lucide-react';

export const OrganizationProfilePage: React.FC = () => {
  const { 
    selectedOrgId, 
    organizations, 
    opportunities, 
    newsArticles, 
    photos, 
    setPage, 
    setSelectedArticleId,
    openLightbox 
  } = useApp();

  const org = organizations.find(o => o.id === selectedOrgId) || organizations[0];
  const orgOpportunities = opportunities.filter(o => o.organizationId === org.id);
  const orgNews = newsArticles.filter(n => n.organization.toLowerCase().includes(org.name.toLowerCase().split(' ')[0]));
  const orgPhotos = photos.filter(p => p.organization.toLowerCase().includes(org.name.toLowerCase().split(' ')[0]));

  return (
    <div id="organization-profile-page" className="py-8 bg-stone-50 dark:bg-stone-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <button
          onClick={() => setPage('organizations')}
          className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Organizations</span>
        </button>

        {/* Profile Card Header */}
        <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm overflow-hidden mb-10">
          {/* Cover */}
          <div className="relative h-64 sm:h-80 overflow-hidden bg-stone-800">
            <img
              src={org.coverPhoto}
              alt={org.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          </div>

          {/* Org details bar */}
          <div className="px-6 sm:px-10 pb-8 relative">
            <div className="-mt-16 sm:-mt-20 mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-white dark:border-stone-900 shadow-xl bg-white shrink-0">
                  <img
                    src={org.logo}
                    alt={org.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="pb-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 dark:text-stone-100">
                      {org.name}
                    </h1>
                    {org.isVerified && (
                      <span className="p-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400" title="Verified 501(c)(3) Nonprofit">
                        <ShieldCheck className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    <span>{org.location}</span>
                    <span>•</span>
                    <span>Est. {org.establishedYear}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://${org.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Website</span>
                </a>
                <a
                  href={`mailto:${org.contactEmail}`}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Organizer</span>
                </a>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                Our Mission
              </h3>
              <p className="text-sm sm:text-base font-medium text-stone-800 dark:text-stone-200 leading-relaxed max-w-3xl">
                “{org.mission}”
              </p>
            </div>
          </div>
        </div>

        {/* Section: Active Volunteer Opportunities */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4" />
                <span>Open Shifts</span>
              </div>
              <h2 className="text-2xl font-bold font-editorial text-stone-900 dark:text-stone-100">
                Active Volunteer Opportunities ({orgOpportunities.length})
              </h2>
            </div>
          </div>

          {orgOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orgOpportunities.map(opp => (
                <OpportunityCard key={opp.id} opportunity={opp} />
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center text-xs text-stone-500">
              All shifts are currently filled. Check back soon or contact them directly!
            </div>
          )}
        </div>

        {/* Section: Community News from this Org */}
        {orgNews.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold font-editorial text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-amber-600" />
              <span>Community News & Impact Updates</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orgNews.map(article => (
                <div
                  key={article.id}
                  onClick={() => {
                    setSelectedArticleId(article.id);
                    setPage('news-article');
                  }}
                  className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500 cursor-pointer transition-all flex flex-col sm:flex-row gap-4"
                >
                  <img
                    src={article.imageUrl}
                    alt={article.headline}
                    className="w-full sm:w-36 h-32 rounded-xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                        {article.category}
                      </span>
                      <h4 className="text-sm font-bold font-editorial text-stone-900 dark:text-stone-100 mt-1 line-clamp-2">
                        {article.headline}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                        {article.summary}
                      </p>
                    </div>
                    <div className="text-[11px] text-stone-400 mt-2">
                      {article.publicationDate} • By {article.author}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: Photos in Action */}
        {orgPhotos.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold font-editorial text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
              <Camera className="w-5 h-5 text-sky-600" />
              <span>Volunteers in Action</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {orgPhotos.map(p => (
                <div
                  key={p.id}
                  onClick={() => openLightbox(p)}
                  className="rounded-xl overflow-hidden aspect-square cursor-pointer group relative bg-stone-800"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white text-xs">
                    <span className="font-semibold line-clamp-1">{p.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
