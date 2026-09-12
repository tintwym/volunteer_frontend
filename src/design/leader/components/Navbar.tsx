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
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Organization / Portal title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-100" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">
                Community Action Network
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Leader Admin
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate">
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
              className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search dropdown */}
          {showSearchResults && searchQuery.trim() && (
            <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 max-h-80 overflow-y-auto">
              {filteredVolunteers.length === 0 && filteredShifts.length === 0 ? (
                <div className="p-4 text-center text-sm text-slate-500">
                  No volunteers or events found matching "{searchQuery}"
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filteredVolunteers.length > 0 && (
                    <div className="p-2">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
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
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-sm"
                        >
                          <div className="flex items-center gap-2.5">
                            <img src={vol.avatar} alt={vol.name} className="w-7 h-7 rounded-full object-cover" />
                            <div>
                              <div className="font-medium text-slate-800">{vol.name}</div>
                              <div className="text-xs text-slate-500">{vol.role} • {vol.verifiedHours} hrs verified</div>
                            </div>
                          </div>
                          <span className="text-xs text-emerald-600 font-medium">View Profile &rarr;</span>
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
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span>Quick Announce</span>
          </button>

          {/* Automated Notifications Center */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
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
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50">
                <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Leader Dispatch & Alerts</h4>
                    <p className="text-xs text-slate-500">Automated triggers & approvals</p>
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

          {/* Portal Settings Button */}
          <button
            onClick={() => onSelectTab('settings')}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Portal Settings"
            aria-label="Portal Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Leader Profile Badge */}
          <button
            onClick={() => onSelectTab('settings')}
            className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200 hover:opacity-80 transition-opacity cursor-pointer text-left"
            title="View Leader Profile & Settings"
          >
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
              alt="Sarah Jenkins"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
            />
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                Sarah Jenkins
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Volunteer Leader</div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
