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

interface AttendanceViewProps {
  records: AttendanceRecord[];
  activeShift: AttendanceRecord | null;
  onCheckIn: (method: CheckInMethod, eventId: string, codeInput?: string) => void;
  onCheckOut: (recordId: string) => void;
  onReportAttendanceProblem: (recordId: string, problem: string) => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  records,
  activeShift,
  onCheckIn,
  onCheckOut,
  onReportAttendanceProblem
}) => {
  const [selectedMethod, setSelectedMethod] = useState<CheckInMethod>('QR Code');
  const [eventCodeInput, setEventCodeInput] = useState('');
  const [leaderPinInput, setLeaderPinInput] = useState('');
  const [isSimulatingGps, setIsSimulatingGps] = useState(false);
  const [gpsVerified, setGpsVerified] = useState(false);
  const [showProblemModal, setShowProblemModal] = useState<string | null>(null);
  const [problemDescription, setProblemDescription] = useState('');
  const [checkInSuccessToast, setCheckInSuccessToast] = useState<string | null>(null);

  // Active elapsed timer
  const [elapsedSeconds, setElapsedSeconds] = useState(12600); // approx 3.5 hours for active shift demo

  useEffect(() => {
    let interval: any;
    if (activeShift && activeShift.status === 'Checked In') {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeShift]);

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

  const handleExecuteCheckIn = () => {
    let code = '';
    if (selectedMethod === 'Event Code') {
      if (!eventCodeInput.trim()) {
        alert('Please enter the 4-digit Event Code displayed at your volunteer check-in booth.');
        return;
      }
      code = eventCodeInput.trim();
    } else if (selectedMethod === 'Leader Confirmation') {
      if (!leaderPinInput.trim()) {
        alert('Please ask your Team Leader to enter their 4-digit supervisor authorization PIN.');
        return;
      }
      code = leaderPinInput.trim();
    }

    onCheckIn(selectedMethod, 'evt-101', code);
    setCheckInSuccessToast(`Successfully checked in via ${selectedMethod}! Shift timer is now active.`);
    setTimeout(() => setCheckInSuccessToast(null), 4000);
    setEventCodeInput('');
    setLeaderPinInput('');
  };

  const handleExecuteCheckOut = () => {
    if (!activeShift) return;
    onCheckOut(activeShift.id);
    setCheckInSuccessToast('Check-out completed! 3.5 hours logged for supervisor verification.');
    setTimeout(() => setCheckInSuccessToast(null), 4000);
  };

  const handleSubmitProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showProblemModal || !problemDescription.trim()) return;
    onReportAttendanceProblem(showProblemModal, problemDescription);
    setShowProblemModal(null);
    setProblemDescription('');
    setCheckInSuccessToast('Attendance problem report submitted to Event Operations.');
    setTimeout(() => setCheckInSuccessToast(null), 4000);
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
              <span className="text-lg font-bold text-slate-900">{totalCompletedHours.toFixed(1)} hrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Shift Clock Card */}
      <div className={`rounded-2xl p-6 border transition-all ${
        activeShift && activeShift.status === 'Checked In'
          ? 'bg-gradient-to-br from-emerald-500/10 via-white to-emerald-50/50 border-emerald-300 shadow-sm ring-1 ring-emerald-200'
          : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                activeShift && activeShift.status === 'Checked In'
                  ? 'bg-emerald-600 text-white animate-pulse'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                <span className="w-2 h-2 rounded-full bg-current" />
                {activeShift && activeShift.status === 'Checked In' ? 'Active Shift in Progress' : 'No Shift Active'}
              </span>

              {activeShift && (
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                  {activeShift.eventTitle}
                </span>
              )}
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              {activeShift && activeShift.status === 'Checked In'
                ? 'Community Festival 2026 • Registration Shift'
                : 'Ready for Your Next Shift?'}
            </h2>

            <p className="text-xs text-slate-600 max-w-xl">
              {activeShift && activeShift.status === 'Checked In'
                ? `Checked in at ${activeShift.checkInTime} via ${activeShift.method} (${activeShift.locationValidationStatus || 'Verified'}). Remember to check out when your shift ends at 12:00 PM.`
                : 'Upcoming: Saturday Sep 12 at 08:00 AM. Select your check-in method below when you arrive on site.'}
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
                {activeShift && activeShift.status === 'Checked In' ? formatElapsedTime(elapsedSeconds) : '00:00:00'}
              </div>
            </div>

            <div className="border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-4 w-full sm:w-auto">
              {activeShift && activeShift.status === 'Checked In' ? (
                <button
                  id="checkout-active-btn"
                  onClick={handleExecuteCheckOut}
                  className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-red-200 flex items-center justify-center gap-2"
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
          Choose the verification method instructed by your Team Leader or festival signage.
        </p>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {[
            { id: 'QR Code', label: 'Scan QR Code', icon: QrCode, desc: 'Booth tablet scan' },
            { id: 'Event Code', label: 'Enter Event Code', icon: KeyRound, desc: '4-digit daily PIN' },
            { id: 'Location GPS', label: 'GPS Geofence', icon: MapPin, desc: 'Venue radius check' },
            { id: 'Leader Confirmation', label: 'Leader PIN', icon: ShieldCheck, desc: 'Supervisor override' }
          ].map((m) => {
            const Icon = m.icon;
            const isSelected = selectedMethod === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMethod(m.id as CheckInMethod)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-emerald-700' : 'text-slate-500'}`} />
                <span className="text-xs font-bold text-slate-900 block leading-tight">{m.label}</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">{m.desc}</span>
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
              <h4 className="text-sm font-bold text-slate-900">Enter Today's 4-Digit Event Code</h4>
              <p className="text-xs text-slate-600">
                Found on the morning briefing whiteboard in the Volunteer Hub Tent (Demo Code: <strong>FEST26</strong> or <strong>2026</strong>).
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. FEST26"
                  value={eventCodeInput}
                  onChange={(e) => setEventCodeInput(e.target.value.toUpperCase())}
                  className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono font-bold tracking-wider text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-44 uppercase"
                />
                <button
                  onClick={handleExecuteCheckIn}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
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
                    {rec.totalHours > 0 ? `${rec.totalHours.toFixed(1)} hrs` : 'In progress'}
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
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
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
