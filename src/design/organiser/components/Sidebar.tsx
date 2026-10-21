'use client';
// @ts-nocheck

import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  CalendarDays,
  Users,
  ShieldCheck,
  Layers,
  ClipboardList,
  UserCheck,
  MessageSquareText,
  Megaphone,
  MailCheck,
  ShieldAlert,
  BookOpen,
  CheckSquare,
  HeartHandshake,
  BarChart3,
  Award,
  KeyRound,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Clock,
} from 'lucide-react';
import { SignOutButton } from '@/components/auth/SignOutButton';
import { useTheme } from '@/components/theme/ThemeProvider';
import { User } from '../types';

export type ActiveTab =
  | 'overview'
  | 'events'
  | 'volunteers'
  | 'leaders'
  | 'teams'
  | 'tasks'
  | 'scheduling'
  | 'attendance'
  | 'messaging'
  | 'communication'
  | 'automations'
  | 'incidents'
  | 'training'
  | 'approvals'
  | 'reports'
  | 'recognition'
  | 'roles'
  | 'settings';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  currentUser: User;
  unreadCount: number;
  upcomingShiftsCount: number;
  pendingApprovalsCount?: number;
  openIncidentsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  currentUser,
  unreadCount,
  upcomingShiftsCount,
  pendingApprovalsCount = 3,
  openIncidentsCount = 1,
}) => {
  const isOrganizer = currentUser.role === 'organizer';
  const { isDark } = useTheme();

  const navSections = [
    {
      group: 'Core Operations',
      items: [
        {
          id: 'overview' as ActiveTab,
          label: 'Dashboard',
          icon: LayoutDashboard,
          badge: null,
        },
        {
          id: 'events' as ActiveTab,
          label: 'Event Management',
          icon: Calendar,
          badge: '4',
          badgeColor: 'bg-emerald-100 text-emerald-800',
        },
        {
          id: 'volunteers' as ActiveTab,
          label: 'Volunteer Roster',
          icon: Users,
          badge: '250',
          badgeColor: 'bg-slate-100 text-slate-700',
        },
        {
          id: 'leaders' as ActiveTab,
          label: 'Leader Hierarchy',
          icon: ShieldCheck,
          badge: '15',
          badgeColor: 'bg-indigo-100 text-indigo-800',
        },
        {
          id: 'teams' as ActiveTab,
          label: 'Team Management',
          icon: Layers,
          badge: null,
        },
        {
          id: 'tasks' as ActiveTab,
          label: 'Task Management',
          icon: ClipboardList,
          badge: null,
        },
        {
          id: 'scheduling' as ActiveTab,
          label: 'Schedule & Shifts',
          icon: CalendarDays,
          badge: upcomingShiftsCount > 0 ? upcomingShiftsCount : null,
          badgeColor: 'bg-teal-600 text-white',
        },
        {
          id: 'attendance' as ActiveTab,
          label: 'Attendance Audit',
          icon: UserCheck,
          badge: '92%',
          badgeColor: 'bg-emerald-600 text-white',
        },
      ],
    },
    {
      group: 'Communication & Safety',
      items: [
        {
          id: 'messaging' as ActiveTab,
          label: 'Live Messaging',
          icon: MessageSquareText,
          badge: unreadCount > 0 ? unreadCount : null,
          badgeColor: 'bg-rose-500 text-white',
        },
        {
          id: 'communication' as ActiveTab,
          label: 'Broadcast Dispatch',
          icon: Megaphone,
          badge: '4 Tiers',
          badgeColor: 'bg-amber-100 text-amber-800',
        },
        {
          id: 'automations' as ActiveTab,
          label: 'Email Automations',
          icon: MailCheck,
          badge: 'Active',
          badgeColor: 'bg-indigo-600 text-white',
        },
        {
          id: 'incidents' as ActiveTab,
          label: 'Incident Management',
          icon: ShieldAlert,
          badge: openIncidentsCount > 0 ? openIncidentsCount : null,
          badgeColor: 'bg-rose-600 text-white',
        },
      ],
    },
    {
      group: 'Governance & Impact',
      items: [
        {
          id: 'training' as ActiveTab,
          label: 'Training & Documents',
          icon: BookOpen,
          badge: null,
        },
        {
          id: 'approvals' as ActiveTab,
          label: 'Approval Center',
          icon: CheckSquare,
          badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : null,
          badgeColor: 'bg-amber-500 text-white',
        },
        {
          id: 'reports' as ActiveTab,
          label: 'Reports & Analytics',
          icon: BarChart3,
          badge: null,
        },
        {
          id: 'recognition' as ActiveTab,
          label: 'Recognition & Badges',
          icon: Award,
          badge: 'Milestones',
          badgeColor: 'bg-amber-500 text-white',
        },
        {
          id: 'roles' as ActiveTab,
          label: 'User & Role Access',
          icon: KeyRound,
          badge: null,
        },
        {
          id: 'settings' as ActiveTab,
          label: 'Platform Settings',
          icon: Settings,
          badge: null,
        },
      ],
    },
  ];

  return (
    <aside
      id="sidebar-navigation"
      className={`relative flex h-full min-h-0 flex-col bg-white border-r border-slate-200 transition-all duration-300 z-30 shrink-0 select-none dark:bg-slate-900 dark:border-slate-800 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Brand Header */}
      <div
        className={`h-20 flex items-center border-b border-slate-100 dark:border-slate-800 ${
          collapsed ? 'justify-center px-2' : 'justify-between px-4'
        }`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="font-bold text-base text-slate-900 tracking-tight leading-none truncate dark:text-slate-100">
                HopeHarbor
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1 truncate dark:text-slate-400">
                Volunteer Alliance
              </p>
            </div>
          )}
        </div>
        <button
          id="toggle-sidebar-button"
          onClick={() => setCollapsed(!collapsed)}
          className={
            collapsed
              ? 'absolute -right-3 top-7 z-10 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-emerald-700 hover:border-emerald-300 transition-colors dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:text-emerald-300'
              : 'p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors dark:hover:text-slate-200 dark:hover:bg-slate-800'
          }
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Organizer Workspace Pill */}
      {!collapsed && (
        <div className="px-3.5 py-2.5 mx-3 my-2 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-800/80 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">Organizer Hub</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              Operations Lead
            </span>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav
        className={`flex-1 min-h-0 py-3 overflow-y-auto ${
          collapsed
            ? 'px-2 space-y-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            : 'px-3 space-y-4'
        }`}
      >
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {!collapsed ? (
              <p className="px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {section.group}
              </p>
            ) : (
              sIdx > 0 && <div className="mx-2 mb-2 border-t border-slate-100 dark:border-slate-800" aria-hidden />
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-tab-${item.id}`}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center rounded-xl text-xs font-semibold transition-all relative ${
                      collapsed ? 'justify-center py-2.5' : 'gap-3 px-3 py-2'
                    } ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-600/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/80'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                    {!collapsed && (
                      <span className="flex-1 text-left truncate">{item.label}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          isActive ? 'bg-white/25 text-white' : item.badgeColor
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {collapsed && item.badge && (
                      <span
                        className={`absolute top-1.5 left-1/2 ml-1.5 w-2 h-2 rounded-full ring-2 ${
                          isActive ? 'bg-white ring-emerald-600' : 'bg-emerald-500 ring-white dark:ring-slate-900'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Impact Snapshot / Footer */}
      <div className="shrink-0 p-3 border-t border-slate-100 dark:border-slate-800">
        {!collapsed ? (
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50/60 border border-emerald-100 text-emerald-900 dark:from-emerald-950/50 dark:to-slate-900 dark:border-emerald-800/60 dark:text-emerald-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Community Impact</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <div>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">4,824.5</p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Hours served this year</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">$161,572</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Value generated</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center p-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" title="4,824.5 Hours Served">
              <Clock className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* User Card */}
        <div
          className={`mt-3 flex items-center rounded-xl transition-colors ${
            collapsed ? 'justify-center p-1' : 'gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            title={collapsed ? `${currentUser.name} — ${currentUser.title}` : undefined}
            className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
          />
          {!collapsed ? (
            <>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-900 truncate dark:text-slate-100">
                  {currentUser.name}
                </p>
                <p className="text-[11px] text-slate-500 truncate dark:text-slate-400">
                  {currentUser.title}
                </p>
              </div>
              <button
                type="button"
                id="sidebar-user-settings-btn"
                onClick={() => setActiveTab('settings')}
                className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                  activeTab === 'settings'
                    ? 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-950'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200 dark:hover:text-slate-200 dark:hover:bg-slate-700'
                }`}
                title="Platform Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </>
          ) : null}
        </div>
        <SignOutButton
          compact={collapsed}
          tone={isDark ? 'dark' : 'light'}
          className={collapsed ? 'mt-1 w-full' : 'mt-1'}
        />
      </div>
    </aside>
  );
};
