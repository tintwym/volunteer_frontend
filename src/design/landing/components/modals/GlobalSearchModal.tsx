'use client';
// @ts-nocheck

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Search, 
  HeartHandshake, 
  Building2, 
  Newspaper, 
  Camera, 
  Calendar, 
  BookOpen, 
  ArrowUpRight 
} from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchModalOpen, 
    setIsSearchModalOpen,
    opportunities,
    organizations,
    newsArticles,
    photos,
    events,
    stories,
    setPage,
    setSelectedOpportunityId,
    setSelectedArticleId,
    setSelectedOrgId,
    openLightbox
  } = useApp();

  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<string>('all');

  const closeSearch = useCallback(() => {
    setIsSearchModalOpen(false);
    setQuery('');
    setActiveType('all');
  }, [setIsSearchModalOpen]);

  useEffect(() => {
    if (!isSearchModalOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isSearchModalOpen, closeSearch]);

  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return null;

    const safeOpps = opportunities || [];
    const safeOrgs = organizations || [];
    const safeNews = newsArticles || [];
    const safePhotos = photos || [];
    const safeEvents = events || [];
    const safeStories = stories || [];

    const matchedOpps = safeOpps.filter(
      o => (o.title || '').toLowerCase().includes(q) || 
           (o.organization || '').toLowerCase().includes(q) || 
           (o.cause || '').toLowerCase().includes(q) ||
           (o.location || '').toLowerCase().includes(q)
    );

    const matchedOrgs = safeOrgs.filter(
      org => (org.name || '').toLowerCase().includes(q) || 
             (org.mission || '').toLowerCase().includes(q) ||
             (org.location || '').toLowerCase().includes(q)
    );

    const matchedNews = safeNews.filter(
      n => (n.headline || '').toLowerCase().includes(q) || 
           (n.category || '').toLowerCase().includes(q) || 
           (n.summary || '').toLowerCase().includes(q)
    );

    const matchedPhotos = safePhotos.filter(
      p => (p.title || '').toLowerCase().includes(q) || 
           (p.caption || '').toLowerCase().includes(q) || 
           (p.location || '').toLowerCase().includes(q)
    );

    const matchedEvents = safeEvents.filter(
      e => (e.name || '').toLowerCase().includes(q) || 
           (e.location || '').toLowerCase().includes(q) || 
           (e.organizer || '').toLowerCase().includes(q)
    );

    const matchedStories = safeStories.filter(
      s => (s.storyTitle || '').toLowerCase().includes(q) || 
           (s.name || '').toLowerCase().includes(q) || 
           (s.shortIntroduction || '').toLowerCase().includes(q)
    );

    return {
      opportunities: matchedOpps,
      organizations: matchedOrgs,
      news: matchedNews,
      photos: matchedPhotos,
      events: matchedEvents,
      stories: matchedStories,
      totalCount: matchedOpps.length + matchedOrgs.length + matchedNews.length + matchedPhotos.length + matchedEvents.length + matchedStories.length
    };
  }, [query, opportunities, organizations, newsArticles, photos, events, stories]);

  if (!isSearchModalOpen) return null;

  return (
    <div 
      id="global-search-backdrop"
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-16 sm:pt-24 bg-stone-950/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-search-input"
      onClick={closeSearch}
    >
      <div 
        id="global-search-container"
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3 bg-stone-50/50 dark:bg-stone-850">
          <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
          <input
            id="global-search-input"
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across opportunities, organizations, news, photos, events..."
            className="w-full text-base bg-transparent text-stone-900 dark:text-stone-100 outline-none placeholder:text-stone-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={closeSearch}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="px-4 py-2.5 border-b border-stone-100 dark:border-stone-800/80 bg-white dark:bg-stone-900 flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'All Content' },
            { id: 'opportunities', label: 'Opportunities' },
            { id: 'organizations', label: 'Organizations' },
            { id: 'news', label: 'Community News' },
            { id: 'photos', label: 'Photos' },
            { id: 'events', label: 'Events' },
            { id: 'stories', label: 'Stories' }
          ].map(chip => (
            <button
              key={chip.id}
              onClick={() => setActiveType(chip.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                activeType === chip.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1">
          {!query.trim() && (
            <div className="py-12 text-center text-stone-400 space-y-2">
              <Search className="w-8 h-8 mx-auto stroke-1 text-stone-300 dark:text-stone-600" />
              <p className="text-sm font-medium">Type a keyword, cause, city, or initiative name</p>
              <p className="text-xs text-stone-500">e.g., "farm", "Seattle", "STEM", "clean water", "animals"</p>
            </div>
          )}

          {query.trim() && filteredResults && filteredResults.totalCount === 0 && (
            <div className="py-12 text-center text-stone-400 space-y-2">
              <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                No matching results found for "{query}"
              </p>
              <p className="text-xs text-stone-500">
                Try searching for broader terms like "education", "garden", "food", or "environment".
              </p>
            </div>
          )}

          {filteredResults && (
            <>
              {/* Opportunities */}
              {(activeType === 'all' || activeType === 'opportunities') && filteredResults.opportunities.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2.5 flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4" />
                    <span>Volunteer Opportunities ({filteredResults.opportunities.length})</span>
                  </div>
                  <div className="space-y-2">
                    {filteredResults.opportunities.map(opp => (
                      <div
                        key={opp.id}
                        onClick={() => {
                          setSelectedOpportunityId(opp.id);
                          setPage('opportunities');
                          closeSearch();
                        }}
                        className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <div className="min-w-0 pr-2">
                          <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 transition-colors truncate">
                            {opp.title}
                          </h4>
                          <p className="text-xs text-stone-500 mt-0.5">
                            {opp.organization} • {opp.location}
                          </p>
                        </div>
                        <span className="shrink-0 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-medium">
                          {opp.cause}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Organizations */}
              {(activeType === 'all' || activeType === 'organizations') && filteredResults.organizations.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2.5 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    <span>Organizations ({filteredResults.organizations.length})</span>
                  </div>
                  <div className="space-y-2">
                    {filteredResults.organizations.map(org => (
                      <div
                        key={org.id}
                        onClick={() => {
                          setSelectedOrgId(org.id);
                          setPage('organization-profile');
                          closeSearch();
                        }}
                        className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-teal-500 hover:bg-teal-50/40 dark:hover:bg-teal-950/20 cursor-pointer transition-all flex items-center gap-3 group"
                      >
                        <img 
                          src={org.logo} 
                          alt={org.name}
                          className="w-9 h-9 rounded-lg object-cover shrink-0" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-teal-600 transition-colors truncate">
                            {org.name}
                          </h4>
                          <p className="text-xs text-stone-500 truncate">{org.mission}</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-teal-600 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Community News */}
              {(activeType === 'all' || activeType === 'news') && filteredResults.news.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2.5 flex items-center gap-1.5">
                    <Newspaper className="w-4 h-4" />
                    <span>Community News ({filteredResults.news.length})</span>
                  </div>
                  <div className="space-y-2">
                    {filteredResults.news.map(article => (
                      <div
                        key={article.id}
                        onClick={() => {
                          setSelectedArticleId(article.id);
                          setPage('news-article');
                          closeSearch();
                        }}
                        className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-500 hover:bg-amber-50/40 dark:hover:bg-amber-950/20 cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <div className="min-w-0 pr-2">
                          <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition-colors truncate">
                            {article.headline}
                          </h4>
                          <p className="text-xs text-stone-500 mt-0.5">
                            {article.organization} • {article.publicationDate}
                          </p>
                        </div>
                        <span className="shrink-0 text-xs text-stone-400">{article.readTime}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Photos */}
              {(activeType === 'all' || activeType === 'photos') && filteredResults.photos.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2.5 flex items-center gap-1.5">
                    <Camera className="w-4 h-4" />
                    <span>Action Photos ({filteredResults.photos.length})</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {filteredResults.photos.map(photo => (
                      <div
                        key={photo.id}
                        onClick={() => {
                          openLightbox(photo);
                          closeSearch();
                        }}
                        className="relative rounded-lg overflow-hidden group cursor-pointer aspect-square bg-stone-100 dark:bg-stone-800"
                      >
                        <img 
                          src={photo.imageUrl} 
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end text-white text-[11px]">
                          <span className="font-semibold line-clamp-1">{photo.title}</span>
                          <span className="text-stone-300 text-[10px]">{photo.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events */}
              {(activeType === 'all' || activeType === 'events') && filteredResults.events.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2.5 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>Upcoming Events ({filteredResults.events.length})</span>
                  </div>
                  <div className="space-y-2">
                    {filteredResults.events.map(event => (
                      <div
                        key={event.id}
                        onClick={() => {
                          setPage('events');
                          closeSearch();
                        }}
                        className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-indigo-500 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <div className="min-w-0 pr-2">
                          <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-indigo-600 transition-colors truncate">
                            {event.name}
                          </h4>
                          <p className="text-xs text-stone-500 mt-0.5">
                            {event.date} • {event.location}
                          </p>
                        </div>
                        <span className="shrink-0 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                          {event.attendeesCount} attending
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stories */}
              {(activeType === 'all' || activeType === 'stories') && filteredResults.stories.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2.5 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>Volunteer Stories ({filteredResults.stories.length})</span>
                  </div>
                  <div className="space-y-2">
                    {filteredResults.stories.map(story => (
                      <div
                        key={story.id}
                        onClick={() => {
                          setPage('stories');
                          closeSearch();
                        }}
                        className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-rose-500 hover:bg-rose-50/40 dark:hover:bg-rose-950/20 cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <div className="min-w-0 pr-2">
                          <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-rose-600 transition-colors truncate">
                            "{story.storyTitle}"
                          </h4>
                          <p className="text-xs text-stone-500 mt-0.5">
                            By {story.name} ({story.organization})
                          </p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-rose-600 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
