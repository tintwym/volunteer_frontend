'use client';
// @ts-nocheck

import React from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  CalendarCheck, 
  CalendarDays, 
  CheckSquare, 
  QrCode, 
  Users, 
  MessageSquare, 
  GraduationCap, 
  FolderOpen, 
  Send, 
  ShieldAlert, 
  BarChart3, 
  FileCheck2, 
  Award, 
  MessageSquareHeart, 
  User, 
  Mail,
  ShieldCheck,
  ChevronRight,
  Settings
} from 'lucide-react';
import { SignOutButton } from '@/components/auth/SignOutButton';
import { useTheme } from '@/components/theme/ThemeProvider';
import { VolunteerProfile } from '../types';
import { nextHourMilestone } from '../data/milestones';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: VolunteerProfile;
  upcomingEventsCount: number;
  unreadMessagesCount: number;
  unreadNotificationsCount: number;
  tasksCount?: number;
  earnedBadgesCount?: number;
  isOnDuty?: boolean;
  teamsCount?: number;
  documentsCount?: number;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  upcomingEventsCount,
  unreadMessagesCount,
  unreadNotificationsCount,
  tasksCount = 0,
  earnedBadgesCount = 0,
  isOnDuty = false,
  teamsCount = 0,
  documentsCount = 0,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  const { isDark } = useTheme();

  const navSections = [
    {
      title: 'Volunteer Shifts',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard Overview',
          icon: LayoutDashboard,
          badge: null,
          description: 'Personal shift & task summary'
        },
        {
          id: 'events',
          label: 'Event Discovery',
          icon: Compass,
          badge: 'Open',
          badgeColor: 'bg-emerald-100 text-emerald-800',
          description: 'Browse & register shifts'
        },
        {
          id: 'my-events',
          label: 'My Events',
          icon: CalendarCheck,
          badge: upcomingEventsCount > 0 ? `${upcomingEventsCount}` : null,
          badgeColor: 'bg-blue-100 text-blue-800',
          description: 'Manage commitments'
        },
        {
          id: 'schedule',
          label: 'My Schedule',
          icon: CalendarDays,
          badge: null,
          description: 'Timeline & shifts calendar'
        },
        {
          id: 'tasks',
          label: 'My Tasks',
          icon: CheckSquare,
          badge: tasksCount > 0 ? `${tasksCount} Active` : null,
          badgeColor: 'bg-amber-100 text-amber-900',
          description: 'Assigned duties & status'
        },
        {
          id: 'attendance',
          label: 'Attendance & Check-in',
          icon: QrCode,
          badge: isOnDuty ? 'On Duty' : null,
          badgeColor: 'bg-emerald-600 text-white',
          description: 'QR, GPS & PIN Check-in'
        }
      ]
    },
    {
      title: 'Team & Operations',
      items: [
        {
          id: 'team',
          label: 'My Team',
          icon: Users,
          badge: teamsCount > 0 ? `${teamsCount} ${teamsCount === 1 ? 'Squad' : 'Squads'}` : null,
          badgeColor: 'bg-purple-100 text-purple-800',
          description: 'Leader & squad members'
        },
        {
          id: 'messages',
          label: 'Communication',
          icon: MessageSquare,
          badge: unreadMessagesCount > 0 ? `${unreadMessagesCount} new` : null,
          badgeColor: 'bg-emerald-600 text-white',
          description: 'Chat with Team Leader'
        },
        {
          id: 'training',
          label: 'Training & Quizzes',
          icon: GraduationCap,
          badge: 'Certified',
          badgeColor: 'bg-emerald-100 text-emerald-800',
          description: 'Interactive courses'
        },
        {
          id: 'documents',
          label: 'Event Documents',
          icon: FolderOpen,
          badge: documentsCount > 0 ? `${documentsCount} Files` : null,
          badgeColor: 'bg-slate-100 text-slate-700',
          description: 'Handbooks, maps & safety'
        },
        {
          id: 'requests',
          label: 'Volunteer Requests',
          icon: Send,
          badge: 'Review',
          badgeColor: 'bg-blue-100 text-blue-800',
          description: 'Shift changes & inquiries'
        },
        {
          id: 'incidents',
          label: 'Incident Reporting',
          icon: ShieldAlert,
          badge: 'Log',
          badgeColor: 'bg-red-100 text-red-800',
          description: 'Safety hazards & issues'
        }
      ]
    },
    {
      title: 'Recognition & Profile',
      items: [
        {
          id: 'reports',
          label: 'Volunteer Hours',
          icon: BarChart3,
          badge: `${profile.totalHours}h`,
          badgeColor: 'bg-slate-100 text-slate-800',
          description: 'Track contribution & stats'
        },
        {
          id: 'certificates',
          label: 'Certificates & Letters',
          icon: FileCheck2,
          badge: 'Official',
          badgeColor: 'bg-indigo-100 text-indigo-800',
          description: 'Downloadable PDF proofs'
        },
        {
          id: 'badges',
          label: 'Badges & Milestones',
          icon: Award,
          badge: earnedBadgesCount > 0 ? `${earnedBadgesCount} Earned` : null,
          badgeColor: 'bg-amber-100 text-amber-800',
          description: 'Milestones & social sharing'
        },
        {
          id: 'feedback',
          label: 'Submit Feedback',
          icon: MessageSquareHeart,
          badge: null,
          description: 'Post-event evaluations'
        },
        {
          id: 'profile',
          label: 'Volunteer Profile',
          icon: User,
          badge: null,
          description: 'Skills, availability & privacy'
        },
        {
          id: 'settings',
          label: 'System Settings',
          icon: Settings,
          badge: null,
          description: 'Preferences, 2FA & alerts'
        }
      ]
    }
  ];

  const handleSelectTab = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  const goal = nextHourMilestone(profile.totalHours);
  const nextMilestone = goal.hours;
  const progressToNext = Math.min(100, Math.round((profile.totalHours / nextMilestone) * 100));

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden modal-backdrop"
        />
      )}

      <aside className={`
        fixed md:sticky top-16 z-40 md:z-20 h-[calc(100vh-4rem)] w-72 shrink-0
        bg-white border-r border-slate-200 dark:bg-slate-900 dark:border-slate-800
        flex flex-col transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Navigation items list */}
        <div className="flex-1 min-h-0 p-3 space-y-4 overflow-y-auto">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {section.title}
              </div>

              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`sidebar-nav-${item.id}`}
                    onClick={() => handleSelectTab(item.id)}
                    className={`
                      w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all text-xs font-medium
                      ${isActive 
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200/80 shadow-xs dark:bg-emerald-950/50 dark:text-emerald-100 dark:border-emerald-800' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/80'}
                    `}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`p-1.5 rounded-lg transition-colors ${
                        isActive ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className={`truncate text-xs ${isActive ? 'font-bold text-emerald-950 dark:text-emerald-50' : 'font-semibold text-slate-700 dark:text-slate-200'}`}>
                          {item.label}
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                          {item.description}
                        </div>
                      </div>
                    </div>

                    {item.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ml-1.5 ${item.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Milestone + sign out stay under the nav (not stuck to the screen bottom) */}
        <div className="shrink-0 border-t border-slate-200 dark:border-slate-800 p-3 space-y-2">
          <div className="bg-gradient-to-br from-emerald-50 to-slate-50 border border-emerald-200/60 rounded-xl p-3 dark:from-emerald-950/40 dark:to-slate-900 dark:border-emerald-800/50">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-950 dark:text-emerald-100 mb-1">
              <span className="flex items-center gap-1.5 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {nextMilestone}h {goal.title}
              </span>
              <span className="text-emerald-700 dark:text-emerald-300 font-bold text-xs">{progressToNext}%</span>
            </div>

            <div className="w-full bg-emerald-200/60 dark:bg-emerald-900/50 h-1.5 rounded-full overflow-hidden mb-1.5">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressToNext}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
              <span>{profile.totalHours} hrs verified</span>
              <span>{nextMilestone} hrs goal</span>
            </div>

            <button
              type="button"
              onClick={() => handleSelectTab('badges')}
              className="mt-2 w-full flex items-center justify-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-white hover:bg-emerald-50/50 py-1 px-2 rounded-lg border border-emerald-200 transition-colors dark:bg-slate-900 dark:text-emerald-300 dark:border-emerald-800 dark:hover:bg-emerald-950/40"
            >
              <span>Milestone Badges</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <SignOutButton className="w-full" tone={isDark ? 'dark' : 'light'} />
        </div>
      </aside>
    </>
  );
};
