'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { 
  Mail, 
  CheckCheck, 
  Calendar, 
  Award, 
  Clock, 
  FileCheck2, 
  ExternalLink, 
  Bell, 
  SlidersHorizontal,
  X
} from 'lucide-react';
import { AutomatedEmailNotification } from '../types';

interface NotificationsViewProps {
  notifications: AutomatedEmailNotification[];
  onMarkAsRead: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onMarkAsRead,
  setActiveTab
}) => {
  const [selectedEmail, setSelectedEmail] = useState<AutomatedEmailNotification | null>(null);
  const [emailPreferences, setEmailPreferences] = useState({
    shiftConfirmations: true,
    shiftReminders: true,
    hourVerifications: true,
    milestoneBadges: true,
    directorLetters: true,
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case 'event_signup':
        return <Calendar className="w-4 h-4 text-emerald-600" />;
      case 'shift_reminder':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'hours_verified':
        return <CheckCheck className="w-4 h-4 text-blue-600" />;
      case 'badge_unlocked':
        return <Award className="w-4 h-4 text-amber-500" />;
      case 'certificate_ready':
        return <FileCheck2 className="w-4 h-4 text-indigo-600" />;
      default:
        return <Mail className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleOpenEmail = (email: AutomatedEmailNotification) => {
    setSelectedEmail(email);
    onMarkAsRead(email.id);
  };

  const handleActionClick = (tab?: string) => {
    if (tab) {
      setActiveTab(tab);
      setSelectedEmail(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Automated Email Notifications Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Review all transaction receipts, shift reminders, hour approvals, and certificate notices dispatched to your email address.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
            Recipient: maya.chen@example.org
          </span>
        </div>
      </div>

      {/* Main Email Inbox View & Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Email List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Dispatched Emails ({notifications.length})
            </h2>
            <span className="text-xs text-slate-400">Click any message to preview full HTML email</span>
          </div>

          <div className="divide-y divide-slate-100">
            {notifications.map((email) => (
              <div
                key={email.id}
                onClick={() => handleOpenEmail(email)}
                className={`p-4 flex items-start gap-3.5 cursor-pointer transition-colors hover:bg-slate-50 ${
                  !email.isRead ? 'bg-emerald-50/40 font-medium' : ''
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-100 shrink-0 mt-0.5">
                  {getIconForType(email.type)}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {email.senderName}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {email.timestamp}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-800 truncate">
                    {email.subject}
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-1">
                    {email.previewText}
                  </p>
                </div>

                {!email.isRead && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Email Delivery Preferences */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Delivery Preferences</h3>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Configure which automated notifications are pushed instantly to your inbox:
          </p>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer">
              <span className="text-slate-700 font-medium">Shift Registration Confirmations</span>
              <input
                type="checkbox"
                checked={emailPreferences.shiftConfirmations}
                onChange={(e) => setEmailPreferences({ ...emailPreferences, shiftConfirmations: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer">
              <span className="text-slate-700 font-medium">24-Hour Shift Reminders</span>
              <input
                type="checkbox"
                checked={emailPreferences.shiftReminders}
                onChange={(e) => setEmailPreferences({ ...emailPreferences, shiftReminders: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer">
              <span className="text-slate-700 font-medium">Supervisor Hours Approvals</span>
              <input
                type="checkbox"
                checked={emailPreferences.hourVerifications}
                onChange={(e) => setEmailPreferences({ ...emailPreferences, hourVerifications: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer">
              <span className="text-slate-700 font-medium">Milestone Badge Unlocks</span>
              <input
                type="checkbox"
                checked={emailPreferences.milestoneBadges}
                onChange={(e) => setEmailPreferences({ ...emailPreferences, milestoneBadges: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </label>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-xl text-[11px] text-emerald-900">
            Automated notifications ensure you never miss attendance check-ins or verification milestones.
          </div>
        </div>
      </div>

      {/* Email Preview Modal */}
      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-700">Email Notification Preview</span>
              </div>
              <button
                onClick={() => setSelectedEmail(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Email Metadata */}
            <div className="p-4 border-b border-slate-100 space-y-1.5 text-xs bg-white">
              <div><strong className="text-slate-500">From:</strong> <span className="text-slate-800">{selectedEmail.senderName} &lt;{selectedEmail.senderEmail}&gt;</span></div>
              <div><strong className="text-slate-500">To:</strong> <span className="text-slate-800">{selectedEmail.recipientEmail}</span></div>
              <div><strong className="text-slate-500">Subject:</strong> <span className="text-slate-900 font-bold">{selectedEmail.subject}</span></div>
              <div className="text-[11px] text-slate-400">{selectedEmail.timestamp}</div>
            </div>

            {/* Email HTML Body */}
            <div 
              className="p-6 overflow-y-auto text-xs sm:text-sm text-slate-700 space-y-3"
              dangerouslySetInnerHTML={{ __html: selectedEmail.htmlContent }}
            />

            {/* Modal Footer with Action */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedEmail(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>

              {selectedEmail.actionLabel && (
                <button
                  onClick={() => handleActionClick(selectedEmail.actionUrlTab)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>{selectedEmail.actionLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
