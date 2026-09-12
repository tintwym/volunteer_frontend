'use client';
// @ts-nocheck

import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ChevronLeft, ChevronRight, Heart, Calendar, MapPin, Camera, Building2 } from 'lucide-react';
import { handleImageError, DEFAULT_COMMUNITY_IMAGE } from '../../utils/imageUtils';

export const LightboxModal: React.FC = () => {
  const { lightboxPhoto, closeLightbox, navigateLightbox } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxPhoto) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhoto, closeLightbox, navigateLightbox]);

  if (!lightboxPhoto) return null;

  return (
    <div 
      id="lightbox-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 select-none animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={lightboxPhoto.title}
    >
      {/* Close button */}
      <button
        onClick={closeLightbox}
        className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close fullscreen view"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next controls */}
      <button
        onClick={() => navigateLightbox('prev')}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-md"
        aria-label="Previous photograph"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      <button
        onClick={() => navigateLightbox('next')}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-md"
        aria-label="Next photograph"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Main content container */}
      <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center">
        <div className="relative max-h-[72vh] overflow-hidden rounded-xl shadow-2xl flex items-center justify-center">
          <img
            src={lightboxPhoto.imageUrl}
            alt={lightboxPhoto.title}
            className="max-h-[72vh] w-auto object-contain rounded-xl"
            referrerPolicy="no-referrer"
            onError={(e) => handleImageError(e, DEFAULT_COMMUNITY_IMAGE)}
          />
        </div>

        {/* Metadata bar below image */}
        <div className="mt-4 max-w-2xl w-full bg-stone-900/80 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-500/30 mb-1.5">
                {lightboxPhoto.category}
              </span>
              <h4 className="text-lg font-bold font-editorial">{lightboxPhoto.title}</h4>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">{lightboxPhoto.caption}</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold text-rose-300 shrink-0">
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              <span>{lightboxPhoto.likes}</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] text-stone-400 gap-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lightboxPhoto.organization}</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lightboxPhoto.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lightboxPhoto.date}</span>
              </span>
            </div>
            <div className="flex items-center gap-1 text-stone-300">
              <Camera className="w-3.5 h-3.5 text-emerald-400" />
              <span>Photo by: {lightboxPhoto.photographer}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
