import { DigitalBadge } from '../types';

export const HOUR_MILESTONES = [
  { hours: 1, title: 'First Step Volunteer' },
  { hours: 10, title: 'Bronze Helper' },
  { hours: 25, title: 'Community Pillar' },
  { hours: 50, title: 'Golden Heart Champion' },
  { hours: 100, title: 'Century Legend' },
  { hours: 500, title: 'Platinum Master' },
  { hours: 1000, title: 'Diamond Grandmaster' },
  { hours: 2000, title: 'Mythic Overlord' },
  { hours: 5000, title: 'Immortal Sovereign' },
];

export type HourMilestone = (typeof HOUR_MILESTONES)[number];

export function currentHourMilestone(totalHours: number): HourMilestone | null {
  return [...HOUR_MILESTONES].reverse().find((m) => totalHours >= m.hours) ?? null;
}

/** The next milestone still to reach, or the top one once everything is earned. */
export function nextHourMilestone(totalHours: number): HourMilestone {
  return (
    HOUR_MILESTONES.find((m) => totalHours < m.hours) ??
    HOUR_MILESTONES[HOUR_MILESTONES.length - 1]
  );
}

const isHourMilestone = (b: DigitalBadge) =>
  b.category === 'Milestone' && b.progressUnit === 'hours';

/** Keeps hour-based milestone badges in step with the volunteer's total hours. */
export function syncHourBadges(badges: DigitalBadge[], totalHours: number): DigitalBadge[] {
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });
  let changed = false;

  const next = badges.map((b) => {
    if (!isHourMilestone(b)) return b;
    const earned = totalHours >= b.targetProgress;
    const currentProgress = Math.min(totalHours, b.targetProgress);
    const earnedDate = earned ? b.earnedDate ?? today : undefined;
    if (b.earned === earned && b.currentProgress === currentProgress && b.earnedDate === earnedDate) {
      return b;
    }
    changed = true;
    return { ...b, earned, currentProgress, earnedDate };
  });

  return changed ? next : badges;
}

/** Badges saved in the browser predate newly added ones; fill in any that are missing. */
export function mergeWithDefaultBadges(
  saved: DigitalBadge[],
  defaults: DigitalBadge[]
): DigitalBadge[] {
  const savedById = new Map(saved.map((b) => [b.id, b]));
  const defaultIds = new Set(defaults.map((b) => b.id));
  return [
    ...defaults.map((d) => savedById.get(d.id) ?? d),
    ...saved.filter((b) => !defaultIds.has(b.id)),
  ];
}
