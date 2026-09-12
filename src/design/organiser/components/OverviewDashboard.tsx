'use client';
// @ts-nocheck

import React from 'react';
import {
  Calendar,
  Clock,
  Award,
  Users,
  MessageSquare,
  MailCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Share2,
  CalendarCheck,
} from 'lucide-react';
import {
  User,
  VolunteerShift,
  Channel,
  EmailDeliveryLog,
  Badge,
} from '../types';
import { ActiveTab } from './Sidebar';

interface OverviewDashboardProps {
  currentUser?: User;
  shifts?: VolunteerShift[];
  channels?: Channel[];
  deliveryLogs?: EmailDeliveryLog[];
  badges?: Badge[];
  onNavigate?: (tab: ActiveTab) => void;
  onOpenLogHoursModal?: () => void;
  onOpenNewShiftModal?: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  currentUser = { id: 'u1', name: 'User', role: 'volunteer', email: 'user@example.com' } as unknown as User,
  shifts = [],
  channels = [],
  deliveryLogs = [],
  badges = [],
  onNavigate = (_tab?: ActiveTab) => {},
  onOpenLogHoursModal = () => {},
  onOpenNewShiftModal = () => {},
}) => {
  const isOrganizer = currentUser?.role === 'organizer';

  // Shifts for organizer
  const upcomingShifts = (shifts || []).filter((s) => s.status === 'upcoming');
  const nextShift = upcomingShifts[0] || (shifts || [])[0];
  const unlockedBadges = (badges || []).filter((b) => b.isUnlocked);

  return (
    <div id="overview-dashboard" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold backdrop-blur-xs border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>HopeHarbor Volunteer Management Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {isOrganizer
                ? 'You have 6 active volunteer programs and 348 registered participants across coastal restoration, food security, and education.'
                : `You have completed ${currentUser.totalHours} verified service hours across our community initiatives. Your Century Club milestone certificate is ready!`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {isOrganizer ? (
              <>
                <button
                  onClick={onOpenNewShiftModal}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Post New Opportunity</span>
                </button>
                <button
                  onClick={() => onNavigate('automations')}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
                >
                  Notification Center
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onOpenLogHoursModal}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Log Service Hours</span>
                </button>
                <button
                  onClick={() => onNavigate('recognition')}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>View Certificate</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Snapshot Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigate('reports')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-emerald-500 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {isOrganizer ? 'Total Community Hours' : 'My Verified Hours'}
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {isOrganizer ? '4,824.5' : currentUser.totalHours}
            <span className="text-xs text-slate-400 font-medium ml-1">hrs</span>
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            {isOrganizer ? '$161,572 Economic Value' : '100% Verified by Coordinators'}
          </p>
        </div>

        <div
          onClick={() => onNavigate('scheduling')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-emerald-500 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Upcoming Shifts
            </span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {upcomingShifts.length}
            <span className="text-xs text-slate-400 font-medium ml-1">active</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Next: {nextShift?.date || 'None'}
          </p>
        </div>

        <div
          onClick={() => onNavigate('recognition')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-emerald-500 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Milestone Recognition
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {badges.length}
            <span className="text-xs text-slate-400 font-medium ml-1">tiers</span>
          </p>
          <p className="text-[11px] text-amber-700 font-semibold mt-1">
            Certificates & Awards Active
          </p>
        </div>

        <div
          onClick={() => onNavigate('messaging')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-emerald-500 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Crew Channels
            </span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {channels.length}
            <span className="text-xs text-slate-400 font-medium ml-1">active</span>
          </p>
          <p className="text-[11px] text-indigo-600 font-semibold mt-1">
            Live Dispatch Connected
          </p>
        </div>
      </div>

      {/* Main Content Split: Next Shift & Broadcasts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Shift Feature Card */}
        {nextShift && (
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Next Scheduled Service Shift
                </span>
                <span className="text-xs text-slate-400">
                  {nextShift.date} • {nextShift.startTime}
                </span>
              </div>

              <div className="pt-4 space-y-3">
                <h2 className="text-lg font-bold text-slate-900">
                  {nextShift.title}
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {nextShift.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate">{nextShift.location}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Duration: {nextShift.durationHours} Hours</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200 flex items-center gap-2.5 text-xs text-teal-900">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>
                    Automated calendar invite & site parking passes have been dispatched to your email.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Coordinator: {nextShift.organizerName}
              </span>
              <button
                onClick={() => onNavigate('scheduling')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>View All Shifts</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Live Organizer Announcements Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Coordinator Broadcasts
              </h2>
              <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                Live
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-1 text-amber-950">
                <div className="flex items-center gap-1.5 font-bold text-amber-800 text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Urgent Operational Advisory</span>
                </div>
                <p className="leading-relaxed">
                  Pacific Cove Sanctuary parking voucher now available in Lot 4 for Saturday cleanups.
                </p>
                <p className="text-[10px] text-amber-700 font-semibold pt-1">
                  Posted by Elena Rostova • 10:45 AM
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1 text-slate-700">
                <p className="font-semibold text-slate-900">
                  🎉 Milestone Achieved: 4,800 Collective Service Hours!
                </p>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Thank you to all volunteers for making our third quarter our most impactful yet.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-right">
            <button
              onClick={() => onNavigate('messaging')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 ml-auto"
            >
              <span>Open Crew Chat</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recognition & Milestones Teaser */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-300 text-amber-600 flex items-center justify-center text-2xl shrink-0">
            🥇
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-900">
                Century Club Milestone (100h) Verified
              </h3>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                Unlocked
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Official verified certificate of service, recommendation letterhead, and social share assets are available.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate('recognition')}
            className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors"
          >
            Preview Certificate
          </button>
          <button
            onClick={() => onNavigate('recognition')}
            className="text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 px-3.5 py-2 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share to LinkedIn</span>
          </button>
        </div>
      </div>
    </div>
  );
};
