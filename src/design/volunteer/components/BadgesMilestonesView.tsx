'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  Crown, 
  TreePine, 
  Utensils, 
  Flame, 
  Share2, 
  CheckCircle2, 
  Lock, 
  Clock,
  Filter
} from 'lucide-react';
import { DigitalBadge, VolunteerProfile } from '../types';

interface BadgesMilestonesViewProps {
  badges: DigitalBadge[];
  profile: VolunteerProfile;
  onOpenShareModal: (badge: DigitalBadge) => void;
}

export const BadgesMilestonesView: React.FC<BadgesMilestonesViewProps> = ({
  badges,
  profile,
  onOpenShareModal
}) => {
  const [filter, setFilter] = useState<'all' | 'earned' | 'locked'>('all');

  const earnedCount = badges.filter(b => b.earned).length;

  const filteredBadges = badges.filter(b => {
    if (filter === 'earned') return b.earned;
    if (filter === 'locked') return !b.earned;
    return true;
  });

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Award': return <Award className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6" />;
      case 'Crown': return <Crown className="w-6 h-6" />;
      case 'TreePine': return <TreePine className="w-6 h-6" />;
      case 'Utensils': return <Utensils className="w-6 h-6" />;
      case 'Flame': return <Flame className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Milestone Honors</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Digital Badges & Civic Milestones
          </h1>
          <p className="text-amber-100 text-xs sm:text-sm mt-1 max-w-xl">
            You have earned <strong className="text-white">{earnedCount} of {badges.length} digital badges</strong> celebrating your service milestones and environmental impact. Share your achievements to inspire others!
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto bg-black/10 backdrop-blur-xs p-3 rounded-xl border border-white/20">
          <div className="text-right">
            <div className="text-xs text-amber-100">Active Tier</div>
            <div className="text-lg font-bold text-white">Gold Volunteer</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white text-amber-600 flex items-center justify-center shadow-md font-bold text-sm">
            50h+
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-slate-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Filter Badges:
          </span>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
            >
              All ({badges.length})
            </button>
            <button
              onClick={() => setFilter('earned')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'earned' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500'}`}
            >
              Earned ({earnedCount})
            </button>
            <button
              onClick={() => setFilter('locked')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'locked' ? 'bg-white text-amber-800 shadow-xs' : 'text-slate-500'}`}
            >
              In Progress ({badges.length - earnedCount})
            </button>
          </div>
        </div>

        <span className="text-xs text-slate-500">
          Total Service Hours: <strong className="text-slate-900">{profile.totalHours} hrs</strong>
        </span>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredBadges.map((badge) => {
          const progressPercent = Math.min(100, Math.round((badge.currentProgress / badge.targetProgress) * 100));

          return (
            <div
              key={badge.id}
              className={`
                rounded-2xl border p-5 flex flex-col justify-between transition-all relative overflow-hidden
                ${badge.earned 
                  ? `${badge.colorTheme.bg} ${badge.colorTheme.border} shadow-xs hover:shadow-md` 
                  : 'bg-slate-50/70 border-slate-200 opacity-80'}
              `}
            >
              {/* Top Bar with Rarity and Status */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                  badge.rarity === 'Platinum' ? 'bg-indigo-100 text-indigo-800' :
                  badge.rarity === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                  badge.rarity === 'Silver' ? 'bg-slate-200 text-slate-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {badge.rarity}
                </span>

                {badge.earned ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Earned
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                )}
              </div>

              {/* Icon & Title */}
              <div className="space-y-3 mb-4">
                <div className={`
                  w-14 h-14 rounded-2xl mx-auto flex items-center justify-center shadow-xs transition-transform hover:scale-105
                  ${badge.earned ? `${badge.colorTheme.accent} text-white` : 'bg-slate-200 text-slate-400'}
                `}>
                  {getBadgeIcon(badge.iconName)}
                </div>

                <div className="text-center">
                  <h3 className={`text-base font-bold ${badge.earned ? badge.colorTheme.text : 'text-slate-700'}`}>
                    {badge.title}
                  </h3>
                  <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">
                    {badge.category}
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>

              {/* Progress Bar / Requirement */}
              <div className="space-y-2 pt-3 border-t border-slate-200/60 text-xs">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Progress</span>
                  <span className="font-bold text-slate-800">
                    {badge.currentProgress} / {badge.targetProgress} {badge.progressUnit}
                  </span>
                </div>

                <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      badge.earned ? 'bg-emerald-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {badge.earned ? (
                  <div className="text-[11px] text-slate-500 text-center pt-1">
                    Unlocked on {badge.earnedDate}
                  </div>
                ) : (
                  <div className="text-[11px] text-amber-700 text-center font-medium pt-1">
                    Needs {badge.targetProgress - badge.currentProgress} more {badge.progressUnit}
                  </div>
                )}
              </div>

              {/* Share Milestone Action */}
              {badge.earned && (
                <button
                  onClick={() => onOpenShareModal(badge)}
                  className="mt-3 w-full py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Share Milestone</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
