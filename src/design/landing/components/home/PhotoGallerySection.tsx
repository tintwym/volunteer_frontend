'use client';
// @ts-nocheck

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Camera, MapPin, Building2, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { handleImageError, DEFAULT_COMMUNITY_IMAGE } from '../../utils/imageUtils';

export const PhotoGallerySection: React.FC = () => {
  const { photos, openLightbox, setPage, t } = useApp();

  // Pick top 6 dynamic photos for masonry preview on homepage
  const displayPhotos = photos.slice(0, 6);

  return (
    <section 
      id="photo-gallery-section"
      className="py-16 sm:py-20 bg-stone-100/70 dark:bg-stone-950 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-xs font-semibold mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Visual Stories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-editorial text-stone-900 dark:text-stone-100 tracking-tight">
              {t.sections.communityInAction}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm mt-1 max-w-xl">
              {t.sections.communityInActionSubtitle}
            </p>
          </div>

          <button
            onClick={() => setPage('gallery')}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors group self-start md:self-auto"
          >
            <span>{t.sections.exploreGallery}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Masonry-Style Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPhotos.map((photo, index) => {
            const isTall = index === 0 || index === 4;

            return (
              <div
                key={photo.id}
                onClick={() => openLightbox(photo)}
                className={`relative group rounded-2xl overflow-hidden cursor-pointer bg-stone-200 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-xl transition-all duration-300 ${
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

                {/* Always visible subtle bottom gradient, enhances on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Top Badge: Category */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10">
                    {photo.category}
                  </span>
                </div>

                {/* Top Right: Likes counter */}
                <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-rose-300 text-[11px] font-medium flex items-center gap-1 border border-white/10">
                  <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                  <span>{photo.likes}</span>
                </div>

                {/* Bottom details card */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white transform transition-transform">
                  <h3 className="text-base font-bold font-editorial leading-snug drop-shadow-sm line-clamp-1">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                    {photo.caption}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px] text-stone-300">
                    <div className="flex items-center gap-1.5 truncate pr-2">
                      <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{photo.location}</span>
                    </div>
                    <div className="shrink-0 text-stone-400 text-[10px]">
                      Photo: {photo.photographer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore More CTA Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold font-editorial">
              Explore Curated Photo Stories & Digital Magazines
            </h3>
            <p className="text-xs text-emerald-100 max-w-lg leading-relaxed">
              Dive into comprehensive photo-led chronicles of community action, including "Community Cleanup Day 2026" with volunteer quotes, impact statistics, and high-res imagery.
            </p>
          </div>

          <button
            onClick={() => setPage('gallery')}
            className="px-5 py-3 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-bold transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <span>{t.sections.exploreGallery}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
