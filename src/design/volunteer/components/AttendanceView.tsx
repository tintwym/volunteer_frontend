'use client';
// @ts-nocheck

import React, { useState, useEffect } from 'react';
import { 
  ScanLine, 
  QrCode, 
  KeyRound, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  History,
  Timer,
  Play,
  Square,
  Sparkles,
  HelpCircle,
  Smartphone
} from 'lucide-react';
import { AttendanceRecord, CheckInMethod } from '../types';

export interface CheckInOption {
  eventId: string;
  label: string;
}

interface AttendanceViewProps {
  records: AttendanceRecord[];
  activeShift: AttendanceRecord | null;
  checkInOptions: CheckInOption[];
  /** Real accounts can only check in with the event code shown by staff. */
  live?: boolean;
  onCheckIn: (method: CheckInMethod, eventId: string, codeInput?: string) => void | Promise<void>;
  onCheckOut: (recordId: string) => void | Promise<void>;
  onReportAttendanceProblem: (recordId: string, problem: string) => void | Promise<void>;
}

const METHODS = [
  { id: 'QR Code', label: 'Scan QR Code', icon: QrCode, desc: 'Booth tablet scan' },
  { id: 'Event Code', label: 'Enter Event Code', icon: KeyRound, desc: 'Code from your leader' },
  { id: 'Location GPS', label: 'GPS Geofence', icon: MapPin, desc: 'Venue radius check' },
  { id: 'Leader Confirmation', label: 'Leader PIN', icon: ShieldCheck, desc: 'Supervisor override' }
];

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  records,
  activeShift,
  checkInOptions,
  live = false,
  onCheckIn,
  onCheckOut,
  onReportAttendanceProblem
}) => {
  const [selectedMethod, setSelectedMethod] = useState<CheckInMethod>(live ? 'Event Code' : 'QR Code');
  const [selectedEventId, setSelectedEventId] = useState(checkInOptions[0]?.eventId ?? '');
  const [eventCodeInput, setEventCodeInput] = useState('');
  const [leaderPinInput, setLeaderPinInput] = useState('');
  const [isSimulatingGps, setIsSimulatingGps] = useState(false);
  const [gpsVerified, setGpsVerified] = useState(false);
  const [showProblemModal, setShowProblemModal] = useState<string | null>(null);
  const [problemDescription, setProblemDescription] = useState('');
  const [checkInSuccessToast, setCheckInSuccessToast] = useState<string | null>(null);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const methods = live ? METHODS.filter((m) => m.id === 'Event Code') : METHODS;
  const isActive = !!activeShift && activeShift.status === 'Checked In';

  useEffect(() => {
    if (!checkInOptions.some((o) => o.eventId === selectedEventId)) {
      setSelectedEventId(checkInOptions[0]?.eventId ?? '');
    }
  }, [checkInOptions, selectedEventId]);

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [isActive]);
  const elapsedSeconds =
    isActive && activeShift.checkInAt
      ? Math.max(0, Math.floor((now - new Date(activeShift.checkInAt).getTime()) / 1000))
      : 0;

  const flash = (message: string) => {
    setErrorToast(null);
    setCheckInSuccessToast(message);
    setTimeout(() => setCheckInSuccessToast(null), 4000);
  };

  const run = async (action: () => void | Promise<void>, success: string) => {
    setBusy(true);
    try {
      await action();
      flash(success);
      return true;
    } catch (err) {
      setCheckInSuccessToast(null);
      setErrorToast(err instanceof Error && err.message ? err.message : 'Something went wrong. Please try again.');
      return false;
    } finally {
      setBusy(false);
    }
  };

  const formatElapsedTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSimulateGPS = () => {
    setIsSimulatingGps(true);
    setTimeout(() => {
      setIsSimulatingGps(false);
      setGpsVerified(true);
    }, 1200);
  };

  const handleExecuteCheckIn = async () => {
    if (isActive) {
      setErrorToast('You are already checked in. Check out of your current shift first.');
      return;
    }
    if (!selectedEventId) {
      setErrorToast('You have no confirmed shift to check in to today.');
      return;
    }
    let code = '';
    if (selectedMethod === 'Event Code') {
      if (!eventCodeInput.trim()) {
        setErrorToast('Enter the event code from your leader or the check-in desk.');
        return;
      }
      code = eventCodeInput.trim();
    } else if (selectedMethod === 'Leader Confirmation') {
      if (!leaderPinInput.trim()) {
        setErrorToast('Ask your team leader to enter their supervisor PIN.');
        return;
      }
      code = leaderPinInput.trim();
    }

    const ok = await run(
      () => onCheckIn(selectedMethod, selectedEventId, code),
      `Checked in via ${selectedMethod}. Your shift timer is running.`
    );
    if (ok) {
      setEventCodeInput('');
      setLeaderPinInput('');
      setGpsVerified(false);
    }
  };

  const handleExecuteCheckOut = async () => {
    if (!activeShift) return;
    await run(
      () => onCheckOut(activeShift.id),
      live
        ? 'Checked out. Your hours were sent to your leader for approval.'
        : 'Check-out completed. Hours logged for supervisor verification.'
    );
  };

  const handleSubmitProblem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showProblemModal || !problemDescription.trim()) return;
    const ok = await run(
      () => onReportAttendanceProblem(showProblemModal, problemDescription.trim()),
      'Attendance problem reported to event staff.'
    );
    if (ok) {
      setShowProblemModal(null);
      setProblemDescription('');
    }
  };

  const totalCompletedHours = records
    .filter(r => r.status === 'Completed')
    .reduce((sum, r) => sum + r.totalHours, 0);

  return (
    <div className="space-y-6">
      {/* Toast */}
      {checkInSuccessToast && (
        <div className="bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between text-sm font-medium animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span>{checkInSuccessToast}</span>
          </div>
          <button onClick={() => setCheckInSuccessToast(null)} className="text-white/80 hover:text-white text-xs underline">
            Dismiss
          </button>
        </div>
      )}
      {errorToast && (
        <div role="alert" className="bg-red-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between text-sm font-medium">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-200" />
            <span>{errorToast}</span>
          </div>
          <button onClick={() => setErrorToast(null)} className="text-white/80 hover:text-white text-xs underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs tracking-wider uppercase mb-1">
              <ScanLine className="w-4 h-4" />
              <span>Section 3.8 • Attendance & Digital Check-in</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Shift Attendance & Time Clock</h1>
            <p className="text-sm text-slate-600 mt-1">
              Check in and out of your volunteer assignments using QR scan, Event Code, Geofence GPS, or Leader PIN.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-right">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Logged Log Time</span>
              <span className="text-lg font-bold text-slate-900">{+totalCompletedHours.toFixed(2)} hrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Shift Clock Card */}
      <div className={`rounded-2xl p-6 border transition-all ${
        activeShift && activeShift.status === 'Checked In'
          ? 'bg-gradient-to-br from-emerald-500/10 via-white to-emerald-50/50 border-emerald-300 shadow-sm ring-1 ring-emerald-200 dark:from-emerald-950/80 dark:via-slate-900 dark:to-emerald-950/40 dark:border-emerald-700 dark:ring-emerald-800'
          : 'border-slate-200 bg-white shadow-xs dark:border-slate-700 dark:bg-slate-900'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                activeShift && activeShift.status === 'Checked In'
                  ? 'bg-emerald-600 text-white animate-pulse'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}>
                <span className="w-2 h-2 rounded-full bg-current" />
                {activeShift && activeShift.status === 'Checked In' ? 'Active Shift in Progress' : 'No Shift Active'}
              </span>

              {activeShift && (
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {activeShift.eventTitle}
                </span>
              )}
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              {isActive ? activeShift.eventTitle : 'Ready for Your Next Shift?'}
            </h2>

            <p className="text-xs text-slate-600 max-w-xl">
              {isActive
                ? `Checked in at ${activeShift.checkInTime ?? '—'} via ${activeShift.method}. Remember to check out when your shift ends at ${activeShift.scheduledEnd}.`
                : checkInOptions.length > 0
                ? `Next: ${checkInOptions[0].label}. Choose a check-in method below when you arrive on site.`
                : 'You have no confirmed shift today. Sign up for an event to check in here.'}
            </p>
          </div>

          {/* Clock Timer Display */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-center sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Shift Elapsed Time
              </span>
              <div className="text-3xl font-mono font-bold text-slate-900 flex items-center gap-1.5">
                <Timer className="w-6 h-6 text-emerald-600" />
                {formatElapsedTime(elapsedSeconds)}
              </div>
            </div>

            <div className="border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-4 w-full sm:w-auto">
              {activeShift && activeShift.status === 'Checked In' ? (
                <button
                  id="checkout-active-btn"
                  onClick={handleExecuteCheckOut}
                  disabled={busy}
                  className="w-full sm:w-auto px-5 py-2.5 disabled:opacity-60 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-red-200 flex items-center justify-center gap-2"
                >
                  <Square className="w-4 h-4" />
                  <span>Check Out Now</span>
                </button>
              ) : (
                <button
                  id="checkin-quick-btn"
                  onClick={() => {
                    const el = document.getElementById('checkin-methods-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-emerald-200 flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Check In On-Site</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Check-In Methods Selector */}
      <div id="checkin-methods-section" className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-emerald-600" />
          <span>Select Digital Check-in Method</span>
        </h3>
        <p className="text-xs text-slate-600 mb-4">
          {live
            ? 'Enter the check-in code your leader or organizer shares on site. If you can’t check in, ask them to check you in from their dashboard.'
            : 'Choose the verification method instructed by your Team Leader or festival signage.'}
        </p>

        <label className="block mb-4 max-w-md">
          <span className="block text-xs font-semibold text-slate-700 mb-1">Shift</span>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            disabled={checkInOptions.length === 0 || isActive}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
          >
            {checkInOptions.length === 0 && <option value="">No confirmed shift today</option>}
            {checkInOptions.map((o) => (
              <option key={o.eventId} value={o.eventId}>{o.label}</option>
            ))}
          </select>
        </label>

        {/* Tab Selection */}
        <div className={`grid gap-2 mb-6 ${methods.length > 1 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 max-w-xs'}`}>
          {methods.map((m) => {
            const Icon = m.icon;
            const isSelected = selectedMethod === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMethod(m.id as CheckInMethod)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500 dark:border-emerald-500 dark:bg-emerald-950/70 dark:ring-emerald-500/60'
                    : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600'
                }`}
              >
                <Icon className={`mb-1.5 h-5 w-5 ${isSelected ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-500 dark:text-slate-400'}`} />
                <span className="block text-xs font-bold leading-tight text-slate-900 dark:text-slate-100">{m.label}</span>
                <span className="mt-0.5 block text-[11px] text-slate-500 dark:text-slate-400">{m.desc}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Verification Content by Method */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          {selectedMethod === 'QR Code' && (
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-36 h-36 bg-white p-2.5 rounded-xl border border-slate-300 shadow-xs flex flex-col items-center justify-center shrink-0">
                <QrCode className="w-24 h-24 text-slate-800" />
                <span className="text-[9px] font-mono font-semibold text-slate-400 mt-1">VOL-FEST-8921</span>
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <h4 className="text-sm font-bold text-slate-900">Scan at Volunteer Terminal or Gate 2 Tablet</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Present your personal QR pass to Marcus Reed at Gate 2, or click the simulation button below to register your camera scan in real time.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleExecuteCheckIn}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
                  >
                    Simulate QR Code Scan Check-in
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedMethod === 'Event Code' && (
            <div className="max-w-md space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Enter Today's Event Code</h4>
              <p className="text-xs text-slate-600">
                {live
                  ? 'Your leader or organizer can see this code on the event page.'
                  : <>Found on the morning briefing whiteboard in the Volunteer Hub Tent (Demo Code: <strong>FEST26</strong> or <strong>2026</strong>).</>}
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={live ? 'e.g. K7Q2M9' : 'e.g. FEST26'}
                  value={eventCodeInput}
                  onChange={(e) => setEventCodeInput(e.target.value.toUpperCase())}
                  onKeyDown={(e) => { if (e.key === 'Enter') void handleExecuteCheckIn(); }}
                  className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono font-bold tracking-wider text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-44 uppercase"
                />
                <button
                  onClick={handleExecuteCheckIn}
                  disabled={busy || isActive}
                  className="px-4 py-2 disabled:opacity-60 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Verify & Check In
                </button>
              </div>
            </div>
          )}

          {selectedMethod === 'Location GPS' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Geofence Location Validation</span>
              </h4>
              <p className="text-xs text-slate-600 max-w-lg">
                Your device will ping GPS coordinates against Seattle Center Plaza boundary (Lat: 47.6205° N, Lon: 122.3493° W).
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSimulateGPS}
                  disabled={isSimulatingGps}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  {isSimulatingGps ? 'Pinging GPS Satellite...' : 'Validate GPS Geofence'}
                </button>

                {gpsVerified && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-lg flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Verified inside venue radius (12 meters from Gate 2)
                  </span>
                )}
              </div>
              {gpsVerified && (
                <div className="pt-2">
                  <button
                    onClick={handleExecuteCheckIn}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Confirm GPS Check-in
                  </button>
                </div>
              )}
            </div>
          )}

          {selectedMethod === 'Leader Confirmation' && (
            <div className="max-w-md space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Leader Supervisor PIN Confirmation</h4>
              <p className="text-xs text-slate-600">
                Ask Team Leader Marcus Reed to enter his supervisor sign-off code (Demo PIN: <strong>4492</strong>).
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  maxLength={4}
                  placeholder="****"
                  value={leaderPinInput}
                  onChange={(e) => setLeaderPinInput(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono font-bold tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-28 text-center"
                />
                <button
                  onClick={handleExecuteCheckIn}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Confirm Leader Sign-off
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Attendance History Log */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-slate-500" />
            <h3 className="text-base font-bold text-slate-900">Attendance Verification Log</h3>
          </div>
          <span className="text-xs text-slate-500">
            {records.length} Recorded Shifts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="pb-3 pl-2">Event & Shift Date</th>
                <th className="pb-3">Scheduled Time</th>
                <th className="pb-3">Check In / Out</th>
                <th className="pb-3">Method</th>
                <th className="pb-3">Hours</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {records.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 pl-2 font-medium text-slate-900">
                    <div>{rec.eventTitle}</div>
                    <div className="text-[11px] text-slate-500 font-normal">{rec.shiftDate}</div>
                  </td>
                  <td className="py-3">
                    <span className="text-slate-600 font-mono text-[11px]">
                      {rec.scheduledStart} – {rec.scheduledEnd}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="font-mono text-[11px] text-slate-900">
                      In: <span className="font-semibold">{rec.checkInTime || '—'}</span>
                    </div>
                    <div className="font-mono text-[11px] text-slate-500">
                      Out: <span className="font-semibold">{rec.checkOutTime || 'Active'}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                      {rec.method}
                    </span>
                  </td>
                  <td className="py-3 font-bold text-slate-900">
                    {rec.totalHours > 0 ? `${+rec.totalHours.toFixed(2)} hrs` : rec.status === 'Checked In' ? 'In progress' : '—'}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      rec.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rec.status === 'Checked In'
                        ? 'bg-amber-100 text-amber-800 animate-pulse'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="py-3 text-right pr-2">
                    <button
                      onClick={() => setShowProblemModal(rec.id)}
                      className="text-slate-500 hover:text-red-600 text-[11px] font-medium underline"
                      title="Report discrepancy in hours or missed check-out"
                    >
                      Report Problem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Problem Modal */}
      {showProblemModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-1">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Report Attendance Problem</span>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Did you forget to clock out, experience poor cell signal, or notice a time discrepancy? Submit an inquiry for manual supervisor adjustment.
            </p>

            <form onSubmit={handleSubmitProblem} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Describe what occurred:
                </label>
                <textarea
                  rows={3}
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="e.g. Left shift at 12:15 PM instead of 12:00 PM due to clean up, or phone battery died before checking out..."
                  required
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProblemModal(null)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={busy}
                  className="px-4 py-2 disabled:opacity-60 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                >
                  Submit Attendance Correction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
