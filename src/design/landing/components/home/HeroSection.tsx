'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, MapPin, Calendar, ArrowRight, HeartHandshake, Sparkles, Users } from 'lucide-react';
import { FadeIn, motion } from '@/components/motion/ui';

export const HeroSection: React.FC = () => {
  const { setPage, setIsAuthModalOpen, t, setOpportunitySearchQuery } = useApp();
  const [interestQuery, setInterestQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [dateQuery, setDateQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = [interestQuery, locationQuery, dateQuery]
      .map((part) => part.trim())
      .filter(Boolean);
    setOpportunitySearchQuery(parts.join(' '));
    setPage('opportunities');
  };

  return (
    <section 
      id="hero-section"
      className="relative min-h-[640px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-stone-900 text-white"
    >
      {/* Background Photography with Warm Tint and Subtle Zoom */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1800&auto=format&fit=crop&q=85"
          alt="Diverse volunteers collaborating in a community kitchen and food drive"
          className="w-full h-full object-cover object-center brightness-[0.42] contrast-[1.08]"
          referrerPolicy="no-referrer"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 8, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-transparent to-stone-950/60"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        <FadeIn delay={0.05}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold backdrop-blur-md mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.hero.badge}</span>
            <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
            <span>10,000+ Active Neighbors</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.12} y={22}>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-3xl leading-[1.15] drop-shadow-sm">
            “Make a Difference. Be Part of Something Bigger.”
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-5 text-base sm:text-lg md:text-xl text-stone-200 font-normal max-w-2xl leading-relaxed">
            Discover volunteer opportunities, connect with your community, stay informed, and see the impact people are making every day.
          </p>
        </FadeIn>

        <FadeIn delay={0.28}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <button
              onClick={() => setPage('opportunities')}
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center gap-2 group transform active:scale-98"
            >
              <span>{t.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/25 transition-all shadow-sm"
            >
              {t.hero.secondaryCta}
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={0.38} y={28} className="mt-12 w-full max-w-4xl">
          <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/30 dark:border-stone-700/60 text-stone-900 dark:text-stone-100">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3">
              <div className="sm:col-span-4 flex items-center gap-2.5 px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700">
                <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                <div className="flex-1 text-left min-w-0">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 leading-none mb-1">
                    What are you interested in?
                  </label>
                  <input
                    type="text"
                    value={interestQuery}
                    onChange={(e) => setInterestQuery(e.target.value)}
                    placeholder="e.g. Garden, Mentoring, Food"
                    className="w-full text-xs font-medium bg-transparent text-stone-900 dark:text-stone-100 outline-none placeholder:text-stone-400"
                  />
                </div>
              </div>

            {/* Location */}
            <div className="sm:col-span-4 flex items-center gap-2.5 px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="flex-1 text-left">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-400 leading-none mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="City, neighborhood, or Remote"
                  className="w-full text-xs font-medium bg-transparent text-stone-900 dark:text-stone-100 outline-none placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* Date */}
            <div className="sm:col-span-2 flex items-center gap-2.5 px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700">
              <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="flex-1 text-left">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-400 leading-none mb-1">
                  Date
                </label>
                <input
                  type="text"
                  value={dateQuery}
                  onChange={(e) => setDateQuery(e.target.value)}
                  placeholder="This weekend"
                  className="w-full text-xs font-medium bg-transparent text-stone-900 dark:text-stone-100 outline-none placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full h-full py-3 sm:py-0 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
        </FadeIn>

        <FadeIn delay={0.48}>
        <div className="mt-5 flex items-center gap-4 text-xs text-stone-300">
          <div className="flex -space-x-2">
            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-stone-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" referrerPolicy="no-referrer" />
            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-stone-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Avatar" referrerPolicy="no-referrer" />
            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-stone-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Avatar" referrerPolicy="no-referrer" />
          </div>
          <span>Joined by 1,400+ neighbors volunteering this month</span>
        </div>
        </FadeIn>
      </div>
    </section>
  );
};
