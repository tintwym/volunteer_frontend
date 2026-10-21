'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Bell,
  Search,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Mail,
  UserCheck,
  ExternalLink,
  ChevronDown,
  X,
  Settings
} from 'lucide-react';
import { ThemeCycleButton } from '@/components/theme/ThemeCycleButton';
import { EmailLogEntry, Volunteer, ShiftEvent } from '../types';

interface NavbarProps {
  volunteers: Volunteer[];
  shifts: ShiftEvent[];
  emailLogs: EmailLogEntry[];
  onOpenScheduleShift: () => void;
  onOpenQuickBroadcast: () => void;
  onSelectTab: (tabId: string) => void;
  onSelectVolunteer?: (vol: Volunteer) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  volunteers,
  shifts,
  emailLogs,
  onOpenScheduleShift,
  onOpenQuickBroadcast,
  onSelectTab,
  onSelectVolunteer
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  const upcomingShifts = shifts.filter(s => s.status === 'Upcoming');
  const pendingApprovalsCount = volunteers.filter(v => v.pendingHours > 0 || v.backgroundCheckStatus === 'Pending').length;

  const filteredVolunteers = searchQuery.trim()
    ? volunteers.filter(v =>
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        v.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredShifts = searchQuery.trim()
    ? shifts.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Organization / Portal title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-100" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-base text-slate-900 sm:text-lg dark:text-slate-100">
                Community Action Network
              </span>
              <span className="hidden md:inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Leader Admin
              </span>
            </div>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              Leader Portal • Roster Management & Event Coordination
            </p>
          </div>
        </div>

        {/* Center: Search with Dropdown Results */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search volunteers by name, skill, or upcoming shifts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-sm transition-colors hover:bg-slate-100/80 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus:bg-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search dropdown */}
          {showSearchResults && searchQuery.trim() && (
            <div className="absolute left-0 right-0 z-50 mt-1.5 max-h-80 overflow-hidden overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
              {filteredVolunteers.length === 0 && filteredShifts.length === 0 ? (
                <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                  No volunteers or events found matching "{searchQuery}"
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredVolunteers.length > 0 && (
                    <div className="p-2">
                      <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Volunteers ({filteredVolunteers.length})
                      </div>
                      {filteredVolunteers.slice(0, 4).map((vol) => (
                        <div
                          key={vol.id}
                          onClick={() => {
                            if (onSelectVolunteer) onSelectVolunteer(vol);
                            onSelectTab('roster');
                            setShowSearchResults(false);
                            setSearchQuery('');
                          }}
                          className="flex cursor-pointer items-center justify-between rounded-lg p-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <div className="flex items-center gap-2.5">
                            <img src={vol.avatar} alt={vol.name} className="w-7 h-7 rounded-full object-cover" />
                            <div>
                              <div className="font-medium text-slate-800 dark:text-slate-100">{vol.name}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">{vol.role} • {vol.verifiedHours} hrs verified</div>
                            </div>
                          </div>
                          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">View Profile &rarr;</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {filteredShifts.length > 0 && (
                    <div className="p-2">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                        Shifts & Events ({filteredShifts.length})
                      </div>
                      {filteredShifts.slice(0, 3).map((shift) => (
                        <div
                          key={shift.id}
                          onClick={() => {
                            onSelectTab('schedule');
                            setShowSearchResults(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-sm"
                        >
                          <div>
                            <div className="font-medium text-slate-800">{shift.title}</div>
                            <div className="text-xs text-slate-500">{shift.date} • {shift.assignedVolunteerIds?.length || 0}/{shift.requiredVolunteers || 0} filled</div>
                          </div>
                          <span className="text-xs text-emerald-600 font-medium">Coordinate &rarr;</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Schedule Button */}
          <button
            onClick={onOpenScheduleShift}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Shift</span>
          </button>

          {/* Quick Announce Button */}
          <button
            onClick={onOpenQuickBroadcast}
            className="hidden lg:inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <Mail className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Quick Announce</span>
          </button>

          {/* Automated Notifications Center */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
              className="relative cursor-pointer rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label="Automated notifications"
            >
              <Bell className="w-5 h-5" />
              {pendingApprovalsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {pendingApprovalsCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotificationDropdown && (
              <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl sm:w-96 dark:border-slate-700 dark:bg-slate-900">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Leader Dispatch & Alerts</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Automated triggers & approvals</p>
                  </div>
                  <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">
                    Live Status
                  </span>
                </div>

                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {/* Pending hours approval alert */}
                  {pendingApprovalsCount > 0 && (
                    <div 
                      onClick={() => {
                        onSelectTab('roster');
                        setShowNotificationDropdown(false);
                      }}
                      className="p-3 hover:bg-amber-50/60 cursor-pointer transition-colors flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-900">Pending Approvals Action</p>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {pendingApprovalsCount} volunteer records require leader review or background check verification.
                        </p>
                        <span className="inline-block mt-1 text-[11px] font-medium text-amber-700">Review Roster &rarr;</span>
                      </div>
                    </div>
                  )}

                  {/* Recent automated emails sent */}
                  {emailLogs.slice(0, 3).map((log) => (
                    <div 
                      key={log.id} 
                      onClick={() => {
                        onSelectTab('emails');
                        setShowNotificationDropdown(false);
                      }}
                      className="p-3 hover:bg-slate-50 cursor-pointer transition-colors flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-medium text-slate-900 truncate">{log.subject}</p>
                          <span className="text-[10px] text-slate-400 shrink-0">{log.timestamp.split('at')[1] || log.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5">Sent to {log.recipientName}</p>
                        <span className="inline-block mt-0.5 text-[10px] text-emerald-600 font-medium">
                          Status: {log.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      onSelectTab('emails');
                      setShowNotificationDropdown(false);
                    }}
                    className="text-xs font-medium text-emerald-700 hover:text-emerald-800"
                  >
                    View All Automated Dispatch Logs &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          <ThemeCycleButton className="cursor-pointer rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white" />

          {/* Portal Settings Button */}
          <button
            onClick={() => onSelectTab('settings')}
            className="cursor-pointer rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            title="Portal Settings"
            aria-label="Portal Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Leader Profile Badge */}
          <button
            onClick={() => onSelectTab('settings')}
            className="flex cursor-pointer items-center gap-2 border-l border-slate-200 pl-2 text-left transition-opacity hover:opacity-80 sm:pl-3 dark:border-slate-700"
            title="View Leader Profile & Settings"
          >
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
              alt="Sarah Jenkins"
              className="h-8 w-8 rounded-full object-cover ring-2 ring-emerald-500/30"
            />
            <div className="hidden text-left sm:block">
              <div className="flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-slate-100">
                Sarah Jenkins
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Volunteer Leader</div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
