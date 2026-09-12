'use client';
// @ts-nocheck

import React from 'react';
import { Opportunity } from '../../types';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, Users, Bookmark, BookmarkCheck, ArrowRight, Sparkles } from 'lucide-react';
import { handleImageError, DEFAULT_COMMUNITY_IMAGE, DEFAULT_AVATAR_IMAGE } from '../../utils/imageUtils';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onViewDetails?: (opportunity: Opportunity) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ 
  opportunity,
  onViewDetails 
}) => {
  const { 
    openApplyModal, 
    currentUser, 
    toggleSaveOpportunity,
    setSelectedOpportunityId,
    setPage 
  } = useApp();

  const isSaved = currentUser.savedOpportunityIds.includes(opportunity.id);

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(opportunity);
    } else {
      setSelectedOpportunityId(opportunity.id);
      setPage('opportunities');
    }
  };

  return (
    <div 
      className="group rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-500/50 dark:hover:border-emerald-500/40 transition-all duration-300 flex flex-col"
    >
      {/* Large Photo with Badges */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-stone-100 dark:bg-stone-800 cursor-pointer" onClick={handleCardClick}>
        <img
          src={opportunity.imageUrl}
          alt={opportunity.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={(e) => handleImageError(e, DEFAULT_COMMUNITY_IMAGE)}
        />
        {/* Cause / Category Badge */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 items-center">
          <span className="px-2.5 py-1 rounded-full bg-stone-900/85 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide border border-white/10">
            {opportunity.cause}
          </span>
          {opportunity.isRemote && (
            <span className="px-2 py-0.5 rounded-full bg-teal-600/90 backdrop-blur-md text-white text-[10px] font-semibold">
              Remote / Virtual
            </span>
          )}
          {opportunity.urgency === 'urgent' && (
            <span className="px-2 py-0.5 rounded-full bg-rose-600/90 backdrop-blur-md text-white text-[10px] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Urgent Need
            </span>
          )}
        </div>

        {/* Bookmark Save Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveOpportunity(opportunity.id);
          }}
          className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md transition-all ${
            isSaved 
              ? 'bg-emerald-600 text-white shadow-md' 
              : 'bg-stone-900/60 text-white hover:bg-stone-900/85'
          }`}
          title={isSaved ? 'Remove from saved' : 'Save opportunity'}
          aria-label={isSaved ? 'Remove from saved' : 'Save opportunity'}
        >
          {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>

        {/* Remaining Spots Floating Pill */}
        <div className="absolute bottom-3.5 right-3.5 px-2.5 py-1 rounded-lg bg-stone-950/80 backdrop-blur-md text-stone-200 text-[11px] font-medium flex items-center gap-1.5 border border-white/10">
          <Users className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            <strong className="text-white font-bold">{opportunity.spotsAvailable}</strong> spots available
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Organization & Location */}
          <div className="flex items-center gap-2 mb-2 text-xs text-stone-500 dark:text-stone-400 font-medium">
            <img
              src={opportunity.orgLogo}
              alt={opportunity.organization}
              className="w-5 h-5 rounded-full object-cover shrink-0 ring-1 ring-stone-200 dark:ring-stone-700"
              referrerPolicy="no-referrer"
              onError={(e) => handleImageError(e, DEFAULT_AVATAR_IMAGE)}
            />
            <span className="truncate text-stone-700 dark:text-stone-300 font-semibold">
              {opportunity.organization}
            </span>
          </div>

          {/* Opportunity Title */}
          <h3 
            onClick={handleCardClick}
            className="text-base sm:text-lg font-bold font-editorial text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {opportunity.title}
          </h3>

          {/* Short description */}
          <p className="mt-2 text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
            {opportunity.shortDescription}
          </p>

          {/* Meta specs */}
          <div className="mt-3.5 pt-3 border-t border-stone-100 dark:border-stone-800/80 grid grid-cols-1 gap-1.5 text-xs text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate font-medium">{opportunity.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate">{opportunity.timeCommitment}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate">{opportunity.location}</span>
            </div>
          </div>

          {/* Skills Required Tags */}
          {opportunity.skillsRequired && opportunity.skillsRequired.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {opportunity.skillsRequired.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-[10px] text-stone-600 dark:text-stone-400 font-medium"
                >
                  {skill}
                </span>
              ))}
              {opportunity.skillsRequired.length > 3 && (
                <span className="px-1.5 py-0.5 text-[10px] text-stone-400">
                  +{opportunity.skillsRequired.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card CTA Actions */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center gap-2">
          <button
            type="button"
            onClick={() => openApplyModal(opportunity)}
            disabled={opportunity.spotsAvailable === 0}
            className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-xs hover:shadow-emerald-600/20 text-center flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>{opportunity.spotsAvailable === 0 ? 'Full' : 'Volunteer Now'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleCardClick}
            className="py-2.5 px-3 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
