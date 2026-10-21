'use client';
// @ts-nocheck

import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  CheckCircle2,
  Calendar,
  Award,
  MessageSquare,
  Plus,
  Clock,
  Sparkles,
  ShieldCheck,
  ClipboardCheck,
  Settings,
} from 'lucide-react';
import { ThemeCycleButton } from '@/components/theme/ThemeCycleButton';
import { User } from '../types';

interface NavbarProps {
  currentUser: User;
  onOpenNewShiftModal: () => void;
  onOpenLogHoursModal: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onNavigateToTab: (tab: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenNewShiftModal,
  onOpenLogHoursModal,
  searchQuery,
  setSearchQuery,
  onNavigateToTab,
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const notifications = [
    {
      id: 'n-1',
      title: 'Volunteer Shift Full',
      desc: 'Coastal Cleanup & Habitat Restoration reached 20/20 volunteers.',
      time: '15m ago',
      icon: Calendar,
      color: 'text-emerald-600 bg-emerald-50',
      tab: 'scheduling',
    },
    {
      id: 'n-2',
      title: 'Milestone Ready for Approval',
      desc: 'Marcus Vance logged 142.5 hrs. Century Club certificate ready to issue.',
      time: '2h ago',
      icon: Award,
      color: 'text-amber-600 bg-amber-50',
      tab: 'recognition',
    },
    {
      id: 'n-3',
      title: 'New Volunteer Application',
      desc: 'David Kalu signed up for Emergency Food Pantry shift.',
      time: '3h ago',
      icon: MessageSquare,
      color: 'text-indigo-600 bg-indigo-50',
      tab: 'scheduling',
    },
    {
      id: 'n-4',
      title: 'Automated 24h Reminder Sent',
      desc: 'Reminders successfully dispatched to 18 registered volunteers.',
      time: '1d ago',
      icon: CheckCircle2,
      color: 'text-teal-600 bg-teal-50',
      tab: 'automations',
    },
  ];

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isOrganizer = currentUser.role === 'organizer';

  return (
    <header
      id="top-navbar"
      className="sticky top-0 z-20 flex h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6 dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Global Search */}
      <div className="flex-1 max-w-md relative">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search shifts, channels, volunteers, skills..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Organizer Workspace Badge */}
        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100">Organizer Mode</span>
            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-extrabold uppercase text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Lead
            </span>
          </div>
        </div>

        {/* Organizer Action Buttons */}
        <button
          id="header-create-shift-button"
          onClick={onOpenNewShiftModal}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden md:inline">Post Opportunity</span>
        </button>

        <button
          id="header-verify-hours-button"
          onClick={onOpenLogHoursModal}
          className="hidden lg:flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          title="Verify or credit volunteer service hours"
        >
          <ClipboardCheck className="w-4 h-4 text-emerald-600" />
          <span>Credit / Verify Hours</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            id="notifications-bell-button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative rounded-xl p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:w-96 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 px-2 pb-2.5 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Activity Notifications</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded-full">
                    4 new
                  </span>
                </div>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="text-[11px] text-slate-400 hover:text-slate-600"
                >
                  Mark all read
                </button>
              </div>

              <div className="mt-2 space-y-1 max-h-80 overflow-y-auto">
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <button
                      key={n.id}
                      onClick={() => {
                        onNavigateToTab(n.tab);
                        setNotificationsOpen(false);
                      }}
                      className="w-full text-left flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className={`p-2 rounded-xl shrink-0 ${n.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-slate-900 truncate">
                            {n.title}
                          </p>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                          {n.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <ThemeCycleButton className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100" />

        {/* Settings button */}
        <button
          type="button"
          id="navbar-settings-btn"
          onClick={() => onNavigateToTab('settings')}
          className="relative rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          title="Platform Settings"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-2 dark:border-slate-700">
          <button
            type="button"
            onClick={() => onNavigateToTab('settings')}
            className="rounded-full ring-2 ring-emerald-500/20 hover:ring-emerald-500/50 transition-all cursor-pointer"
            title="Account Settings"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
