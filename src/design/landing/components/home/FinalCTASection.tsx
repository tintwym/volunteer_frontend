'use client';
// @ts-nocheck

import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, HeartHandshake, Sparkles } from 'lucide-react';

export const FinalCTASection: React.FC = () => {
  const { setPage, setIsAuthModalOpen, t } = useApp();

  return (
    <section 
      id="final-cta-section"
      className="relative py-20 sm:py-28 overflow-hidden bg-stone-900 text-white"
    >
      {/* Background imagery with warm dark gradient */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
        <img
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1800&auto=format&fit=crop&q=80"
          alt="Hands planting sapling in fertile earth together"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-900/90 to-stone-950 z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-xl shadow-emerald-500/20 mb-6">
          <HeartHandshake className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
          Start Right Where You Are
        </span>

        {/* Final Headline verbatim from prompt */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-white tracking-tight leading-tight max-w-2xl">
          “Your Time. Your Community. Your Impact.”
        </h2>

        <p className="mt-4 text-sm sm:text-base text-stone-300 max-w-xl leading-relaxed">
          Whether you have two hours on a Saturday or want to lead an ongoing initiative, your hands make a measurable difference in people's lives.
        </p>

        {/* Action Buttons verbatim from prompt */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setPage('opportunities')}
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center gap-2 group"
          >
            <span>{t.cta?.findOpportunity || t.sections?.findOpportunity || 'Find an Opportunity'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-colors shadow-sm"
          >
            {t.cta?.joinCommunity || t.sections?.joinCommunity || 'Join the Community'}
          </button>
        </div>
      </div>
    </section>
  );
};
