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
  Filter,
  Compass,
  Trees,
  Apple,
  Star,
  Gem,
  Infinity as InfinityIcon
} from 'lucide-react';
import { DigitalBadge, VolunteerProfile } from '../types';
import { currentHourMilestone } from '../data/milestones';

const RARITY_STYLES: Record<string, string> = {
  Immortal: 'bg-gradient-to-r from-rose-600 to-amber-500 text-white',
  Mythic: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-950 dark:text-fuchsia-200',
  Diamond: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200',
  Platinum: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200',
  Gold: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/80 dark:text-yellow-200',
  Silver: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100',
  Bronze: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
};

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
  const activeTier = currentHourMilestone(profile.totalHours);

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
      case 'Compass': return <Compass className="w-6 h-6" />;
      case 'Trees': return <Trees className="w-6 h-6" />;
      case 'Apple': return <Apple className="w-6 h-6" />;
      case 'Star': return <Star className="w-6 h-6" />;
      case 'Gem': return <Gem className="w-6 h-6" />;
      case 'Infinity': return <InfinityIcon className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  const filterBtn = (active: boolean, activeTone: string) =>
    `rounded-lg px-3 py-1.5 transition-all ${
      active
        ? `bg-white shadow-xs dark:bg-slate-700 dark:text-slate-100 ${activeTone}`
        : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
    }`;

  return (
    <div className="space-y-6">
      {/* Header Banner — saturated gradient keeps white text in both themes */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 p-6 text-white shadow-sm sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
            <Sparkles className="h-3.5 w-3.5 text-amber-200" />
            <span>Milestone Honors</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Digital Badges & Civic Milestones
          </h1>
          <p className="mt-1 max-w-xl text-xs text-amber-100 sm:text-sm">
            You have earned <strong className="text-white">{earnedCount} of {badges.length} digital badges</strong> celebrating your service milestones and environmental impact. Share your achievements to inspire others!
          </p>
        </div>

        <div className="flex items-center gap-3 self-start rounded-xl border border-white/20 bg-black/10 p-3 backdrop-blur-xs sm:self-auto">
          <div className="text-right">
            <div className="text-xs text-amber-100">Active Tier</div>
            <div className="text-lg font-bold text-white">{activeTier?.title ?? 'New Volunteer'}</div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xs font-bold text-amber-600 shadow-md">
            {activeTier ? `${activeTier.hours}h+` : '0h'}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <Filter className="h-3.5 w-3.5" />
            Filter Badges:
          </span>
          <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={filterBtn(filter === 'all', 'text-slate-900')}
            >
              All ({badges.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('earned')}
              className={filterBtn(filter === 'earned', 'text-emerald-800 dark:text-emerald-300')}
            >
              Earned ({earnedCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('locked')}
              className={filterBtn(filter === 'locked', 'text-amber-800 dark:text-amber-300')}
            >
              In Progress ({badges.length - earnedCount})
            </button>
          </div>
        </div>

        <span className="text-xs text-slate-500 dark:text-slate-400">
          Total Service Hours: <strong className="text-slate-900 dark:text-slate-100">{profile.totalHours} hrs</strong>
        </span>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredBadges.map((badge) => {
          const progressPercent = Math.min(100, Math.round((badge.currentProgress / badge.targetProgress) * 100));

          return (
            <div
              key={badge.id}
              className={`
                relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all
                ${badge.earned 
                  ? `${badge.colorTheme.bg} ${badge.colorTheme.border} shadow-xs hover:shadow-md` 
                  : 'border-slate-200 bg-slate-50/70 opacity-90 dark:border-slate-700 dark:bg-slate-900/80'}
              `}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className={`rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  RARITY_STYLES[badge.rarity] ?? RARITY_STYLES.Bronze
                }`}>
                  {badge.rarity}
                </span>

                {badge.earned ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/80 px-2 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" /> Earned
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                    <Lock className="h-3 w-3" /> Locked
                  </span>
                )}
              </div>

              <div className="mb-4 space-y-3">
                <div className={`
                  mx-auto flex h-14 w-14 items-center justify-center rounded-2xl shadow-xs transition-transform hover:scale-105
                  ${badge.earned ? `${badge.colorTheme.accent} text-white` : 'bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-400'}
                `}>
                  {getBadgeIcon(badge.iconName)}
                </div>

                <div className="text-center">
                  <h3 className={`text-base font-bold ${badge.earned ? badge.colorTheme.text : 'text-slate-700 dark:text-slate-200'}`}>
                    {badge.title}
                  </h3>
                  <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {badge.category}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {badge.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-200/60 pt-3 text-xs dark:border-slate-700">
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <span>Progress</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">
                    {badge.currentProgress} / {badge.targetProgress} {badge.progressUnit}
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-700">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      badge.earned ? 'bg-emerald-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {badge.earned ? (
                  <div className="pt-1 text-center text-[11px] text-slate-500 dark:text-slate-400">
                    Unlocked on {badge.earnedDate}
                  </div>
                ) : (
                  <div className="pt-1 text-center text-[11px] font-medium text-amber-700 dark:text-amber-300">
                    Needs {+(badge.targetProgress - badge.currentProgress).toFixed(1)} more {badge.progressUnit}
                  </div>
                )}
              </div>

              {badge.earned && (
                <button
                  type="button"
                  onClick={() => onOpenShareModal(badge)}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-xs transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-800"
                >
                  <Share2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
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
