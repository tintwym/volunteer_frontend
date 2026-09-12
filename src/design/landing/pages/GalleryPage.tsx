'use client';
// @ts-nocheck

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { handleImageError, DEFAULT_COMMUNITY_IMAGE } from '../utils/imageUtils';
import { 
  Camera, 
  Search, 
  Heart, 
  MapPin, 
  Building2, 
  Calendar, 
  BookOpen, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { photos, openLightbox, setPage } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedOrg, setSelectedOrg] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'All',
    'Volunteers',
    'Community Events',
    'Charity Activities',
    'Environmental Projects',
    'Fundraising Events',
    'Workshops',
    'People Helping Others'
  ];

  const organizations = [
    'All',
    'Greenway Urban Agriculture',
    'Beacon Hill Youth Center',
    'Downtown Hope Center',
    'Veterans Mutual Aid Alliance',
    'Cascadia Tree Coalition'
  ];

  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => {
      if (selectedCategory !== 'All' && photo.category !== selectedCategory) return false;
      if (selectedOrg !== 'All' && !photo.organization.toLowerCase().includes(selectedOrg.toLowerCase().split(' ')[0])) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          photo.title.toLowerCase().includes(q) ||
          photo.caption.toLowerCase().includes(q) ||
          photo.location.toLowerCase().includes(q) ||
          photo.photographer.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [photos, selectedCategory, selectedOrg, searchTerm]);

  return (
    <div id="gallery-index-page" className="py-10 bg-stone-50 dark:bg-stone-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-xs font-semibold mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Community in Action Gallery</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-stone-900 dark:text-stone-100 tracking-tight">
            Capturing the Heart of Volunteer Action
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-2 leading-relaxed">
            Everyday neighbors stepping up across environmental cleanups, soup kitchens, workshops, and youth mentoring. Tap any photo to launch the full-screen lightbox.
          </p>
        </div>

        {/* Featured Curated Photo Story Banner */}
        <div 
          onClick={() => setPage('photo-story')}
          className="mb-10 rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 to-emerald-950 text-white p-6 sm:p-8 shadow-xl cursor-pointer group border border-emerald-500/20 relative"
        >
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Curated Photo Chronicle</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial group-hover:text-emerald-300 transition-colors">
              Community Cleanup Day 2026: An Urban River Revival
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Step through our high-definition photo essay capturing 420 volunteers as they extracted 4.2 tons of plastics and revitalized 3 miles of urban wetlands. Includes volunteer voices, quotes, and impact numbers.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>View Full Photo Story</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Filters Hub */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search photos by caption, location, photographer..."
                className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto text-xs">
              <label className="text-stone-500 dark:text-stone-400 shrink-0 font-medium">Organization:</label>
              <select
                value={selectedOrg}
                onChange={(e) => setSelectedOrg(e.target.value)}
                className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 outline-none"
              >
                {organizations.map(org => <option key={org} value={org}>{org}</option>)}
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pt-1 border-t border-stone-100 dark:border-stone-800">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white font-semibold shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => {
            const isTall = index % 3 === 0;

            return (
              <div
                key={photo.id}
                onClick={() => openLightbox(photo)}
                className={`relative group rounded-2xl overflow-hidden cursor-pointer bg-stone-200 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-2xl transition-all duration-300 ${
                  isTall ? 'sm:row-span-2 min-h-[380px]' : 'min-h-[260px]'
                }`}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => handleImageError(e, DEFAULT_COMMUNITY_IMAGE)}
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 flex gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10">
                    {photo.category}
                  </span>
                </div>

                <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-rose-300 text-[11px] font-medium flex items-center gap-1 border border-white/10">
                  <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                  <span>{photo.likes}</span>
                </div>

                {/* Bottom details */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <h3 className="text-base font-bold font-editorial leading-snug line-clamp-1">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                    {photo.caption}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px] text-stone-300">
                    <div className="flex items-center gap-1.5 truncate pr-2">
                      <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                      <span className="truncate">{photo.location}</span>
                    </div>
                    <div className="shrink-0 text-stone-400 text-[10px]">
                      By {photo.photographer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
