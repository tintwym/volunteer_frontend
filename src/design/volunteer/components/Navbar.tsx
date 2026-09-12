'use client';
// @ts-nocheck

import React from 'react';
import { 
  HeartHandshake, 
  Bell, 
  MessageSquare, 
  Award,
  Clock,
  Menu,
  X,
  Settings
} from 'lucide-react';
import { VolunteerProfile } from '../types';

interface NavbarProps {
  profile: VolunteerProfile;
  unreadNotificationsCount: number;
  unreadMessagesCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenLogHours?: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  unreadNotificationsCount,
  unreadMessagesCount,
  activeTab,
  setActiveTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-200 group-hover:bg-emerald-700 transition-colors">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight">
                  Volunteer<span className="text-emerald-600">Hub</span>
                </span>
                <span className="text-xs font-medium text-slate-600 block">
                  Volunteer Portal & Impact Hub
                </span>
              </div>
            </button>
          </div>

          {/* Quick Metrics Bar in Center (desktop) */}
          <div className="hidden lg:flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Service:</span>
              <strong className="text-slate-900 font-bold">{profile.totalHours} hrs</strong>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Milestone Level:</span>
              <span className="font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                Gold Volunteer
              </span>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Messaging Quick Button */}
            <button
              id="navbar-messages-btn"
              onClick={() => setActiveTab('messages')}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Organizer Messages"
            >
              <MessageSquare className="w-5 h-5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            {/* Notifications Quick Button */}
            <button
              id="navbar-notifications-btn"
              onClick={() => setActiveTab('notifications')}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Automated Email Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* System Settings Quick Button */}
            <button
              id="navbar-settings-btn"
              onClick={() => setActiveTab('settings')}
              className={`p-2 rounded-lg transition-colors ${
                activeTab === 'settings'
                  ? 'bg-emerald-100 text-emerald-900 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Volunteer & System Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Volunteer Profile Badge */}
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200 hover:opacity-80 transition-opacity text-left"
              title="View Profile Settings"
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-emerald-500/20"
              />
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1">
                  {profile.name}
                </div>
                <div className="text-[11px] text-slate-600 leading-none">
                  {profile.role}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
