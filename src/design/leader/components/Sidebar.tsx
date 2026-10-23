'use client';
// @ts-nocheck

import React from 'react';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  UserCheck,
  CalendarDays,
  MessageSquareText,
  AlertTriangle,
  GraduationCap,
  HelpCircle,
  TrendingUp,
  Star,
  Mail,
  Award,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  Settings
} from 'lucide-react';
import { SignOutButton } from '@/components/auth/SignOutButton';
import { useTheme } from '@/components/theme/ThemeProvider';
import { CollapsedNavTooltip } from '@/components/ui/CollapsedNavTooltip';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  openIncidentsCount: number;
  pendingRequestsCount: number;
  unreadMessagesCount: number;
  inProgressTasksCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  openIncidentsCount,
  pendingRequestsCount,
  unreadMessagesCount,
  inProgressTasksCount
}) => {
  const { isDark } = useTheme();

  const navSections = [
    {
      heading: 'Operations',
      items: [
        {
          id: 'dashboard',
          label: 'Leader Dashboard',
          icon: LayoutDashboard,
          badge: null
        },
        {
          id: 'my_team',
          label: 'My Team (20)',
          icon: Users,
          badge: 'Assigned',
          badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
        },
        {
          id: 'tasks',
          label: 'Task Management',
          icon: CheckSquare,
          badge: inProgressTasksCount > 0 ? `${inProgressTasksCount} active` : null,
          badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
        },
        {
          id: 'attendance',
          label: 'Team Attendance',
          icon: UserCheck,
          badge: '18 / 20',
          badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
        },
        {
          id: 'schedule',
          label: 'Shift Schedule',
          icon: CalendarDays,
          badge: null
        },
        {
          id: 'communication',
          label: 'Comms & Relay',
          icon: MessageSquareText,
          badge: unreadMessagesCount > 0 ? `${unreadMessagesCount} new` : 'Broadcast',
          badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
        }
      ]
    },
    {
      heading: 'Supervision & Safety',
      items: [
        {
          id: 'incidents',
          label: 'Incident Reporting',
          icon: AlertTriangle,
          badge: openIncidentsCount > 0 ? `${openIncidentsCount} open` : null,
          badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
        },
        {
          id: 'training',
          label: 'Training Readiness',
          icon: GraduationCap,
          badge: '1 action',
          badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
        },
        {
          id: 'requests',
          label: 'Support Requests',
          icon: HelpCircle,
          badge: pendingRequestsCount > 0 ? `${pendingRequestsCount} pending` : null,
          badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
        },
        {
          id: 'progress',
          label: 'Progress Monitoring',
          icon: TrendingUp,
          badge: null
        },
        {
          id: 'feedback',
          label: 'Volunteer Feedback',
          icon: Star,
          badge: '7 dims',
          badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
        }
      ]
    },
    {
      heading: 'Recognition & Automation',
      items: [
        {
          id: 'emails',
          label: 'Automated Notifications',
          icon: Mail,
          badge: null
        },
        {
          id: 'recognition',
          label: 'Recognition & Badges',
          icon: Award,
          badge: 'Certificates',
          badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
        }
      ]
    },
    {
      heading: 'System & Admin',
      items: [
        {
          id: 'settings',
          label: 'Portal Settings',
          icon: Settings,
          badge: null
        }
      ]
    }
  ];

  return (
    <aside
      className={`relative flex h-full min-h-0 flex-col transition-all duration-300 ease-in-out select-none z-20 shrink-0 border-r
        bg-white text-slate-700 border-slate-200
        dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800
        ${isCollapsed ? 'w-[4.5rem]' : 'w-64'}`}
    >
      {/* Brand */}
      <div
        className={`shrink-0 h-14 flex items-center border-b border-slate-200 dark:border-slate-800 ${
          isCollapsed ? 'justify-center px-2' : 'justify-between px-3'
        }`}
      >
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white shrink-0">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="text-sm font-bold text-slate-900 dark:text-white tracking-wide block truncate">
                CAN Leader Portal
              </span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-medium">
                Team Alpha Supervisor
              </span>
            </div>
          </div>
        ) : (
          <div className="w-9 h-9 rounded-lg bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white">
            <HeartHandshake className="w-5 h-5" />
          </div>
        )}

        <button
          type="button"
          onClick={onToggleCollapse}
          className={
            isCollapsed
              ? 'absolute -right-3 top-4 z-10 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-sm flex items-center justify-center text-slate-500 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-emerald-600 transition-colors cursor-pointer'
              : 'p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shrink-0'
          }
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav fills remaining height and scrolls; items stay at the top */}
      <nav
        className={`flex-1 min-h-0 overflow-y-auto py-3 ${
          isCollapsed
            ? 'px-2 space-y-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            : 'px-3 space-y-4'
        }`}
      >
        {navSections.map((section, sIdx) => (
          <div key={section.heading} className="space-y-1">
            {!isCollapsed ? (
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 pb-1">
                {section.heading}
              </div>
            ) : (
              sIdx > 0 && (
                <div className="mx-2 mb-2 border-t border-slate-200 dark:border-slate-800" aria-hidden />
              )
            )}

            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <CollapsedNavTooltip
                  key={item.id}
                  label={item.label}
                  enabled={isCollapsed}
                >
                  <button
                    type="button"
                    onClick={() => onSelectTab(item.id)}
                    aria-label={item.label}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-emerald-600 font-semibold text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white'
                    } ${isCollapsed ? 'justify-center px-2' : ''}`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`}
                    />

                    {!isCollapsed && (
                      <div className="flex min-w-0 flex-1 items-center justify-between text-left">
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`ml-1.5 shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : item.badgeColor ||
                                  'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                </CollapsedNavTooltip>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Sign out directly under the menu, not stranded at the screen bottom */}
      <div className="shrink-0 border-t border-slate-200 dark:border-slate-800 p-3">
        <SignOutButton
          compact={isCollapsed}
          tone={isDark ? 'dark' : 'light'}
          className="w-full"
        />
      </div>
    </aside>
  );
};
