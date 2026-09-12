'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  MailCheck,
  Zap,
  Clock,
  Send,
  Eye,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  Inbox,
  Filter,
  Layers,
  Calendar,
  Award,
  AlertTriangle,
  X,
  ExternalLink,
} from 'lucide-react';
import { EmailAutomationTrigger, EmailDeliveryLog, User } from '../types';

interface AutomationsViewProps {
  automations?: EmailAutomationTrigger[];
  deliveryLogs?: EmailDeliveryLog[];
  currentUser: User;
  onToggleAutomation: (id: string) => void;
  onTriggerTestEmail: (templateId: string) => void;
}

export const AutomationsView: React.FC<AutomationsViewProps> = ({
  automations = [],
  deliveryLogs = [],
  currentUser,
  onToggleAutomation,
  onTriggerTestEmail,
}) => {
  const [selectedTemplateForPreview, setSelectedTemplateForPreview] = useState<EmailAutomationTrigger | null>(null);
  const [logFilter, setLogFilter] = useState<'all' | 'delivered' | 'opened' | 'clicked'>('all');
  const [testSentToast, setTestSentToast] = useState<string | null>(null);

  const handleTestEmail = (template: EmailAutomationTrigger) => {
    onTriggerTestEmail(template.id);
    setTestSentToast(`Test email "${template.name}" successfully dispatched to ${currentUser?.email}!`);
    setTimeout(() => {
      setTestSentToast(null);
    }, 4500);
  };

  const filteredLogs = (deliveryLogs || []).filter((log) => {
    if (logFilter === 'all') return true;
    return log.status === logFilter;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'confirmation':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'reminder':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'recognition':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'alert':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div id="automations-container" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Toast Alert */}
      {testSentToast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-50 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-semibold">{testSentToast}</p>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <MailCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Automated Email Notifications Engine
              </h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                {(automations || []).filter((a) => a.active).length} Active Triggers
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Zero-touch email notification system that dispatches instant registration confirmations, calendar invites, 24-hour reminders, and automated milestone recognition emails.
            </p>
          </div>
        </div>

        {/* Quick stat */}
        <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Total Dispatched</p>
            <p className="text-base font-bold text-slate-900">
              {automations.reduce((acc, a) => acc + a.totalSent, 0).toLocaleString()}
            </p>
          </div>
          <div className="border-l border-slate-200 pl-4">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Delivery Success</p>
            <p className="text-base font-bold text-emerald-600">99.8%</p>
          </div>
        </div>
      </div>

      {/* Automated Triggers Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Active Email Workflows & Triggers
          </h2>
          <span className="text-xs text-slate-400">Click preview to inspect responsive email HTML</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {automations.map((auto) => (
            <div
              key={auto.id}
              id={`auto-card-${auto.id}`}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getCategoryBadge(auto.category)}`}>
                    {auto.category.toUpperCase()}
                  </span>

                  <button
                    onClick={() => onToggleAutomation(auto.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                    title={auto.active ? 'Disable trigger' : 'Enable trigger'}
                  >
                    {auto.active ? (
                      <span className="text-emerald-600 flex items-center gap-1 font-bold">
                        <ToggleRight className="w-6 h-6 text-emerald-600" /> Active
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <ToggleLeft className="w-6 h-6 text-slate-400" /> Paused
                      </span>
                    )}
                  </button>
                </div>

                <h3 className="font-bold text-sm text-slate-900 mb-1">{auto.name}</h3>

                <div className="space-y-1.5 text-xs text-slate-500 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Trigger: <strong>{auto.eventTrigger}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Timing: {auto.timing}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600">
                  <p className="font-semibold text-slate-800 mb-1">
                    Subject: {auto.subjectTemplate}
                  </p>
                  <p className="text-slate-500 line-clamp-2 text-[11px]">
                    {auto.bodyPreview}
                  </p>
                </div>
              </div>

              {/* Card actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="text-[11px] text-slate-400">
                  Sent <strong>{auto.totalSent}</strong> times • {auto.lastTriggered}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedTemplateForPreview(auto)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>Preview Email</span>
                  </button>

                  <button
                    onClick={() => handleTestEmail(auto)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Test</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Logs & Engagement */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Live Automated Email Logs & Engagement
            </h2>
            <p className="text-xs text-slate-500">
              Real-time audit log of outbound shift reminders, confirmation digests, and open rates
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
            {(['all', 'delivered', 'opened', 'clicked'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setLogFilter(status)}
                className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                  logFilter === status
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-3 px-2">Recipient</th>
                <th className="pb-3 px-2">Template Name</th>
                <th className="pb-3 px-2">Subject</th>
                <th className="pb-3 px-2">Sent Time</th>
                <th className="pb-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-2">
                    <p className="font-bold text-slate-900">{log.recipientName}</p>
                    <p className="text-[11px] text-slate-500">{log.recipientEmail}</p>
                  </td>
                  <td className="py-3 px-2 font-medium text-slate-700">
                    {log.templateName}
                  </td>
                  <td className="py-3 px-2 text-slate-600 max-w-xs truncate">
                    {log.subject}
                  </td>
                  <td className="py-3 px-2 text-slate-500 whitespace-nowrap">
                    {log.sentAt}
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] capitalize ${
                        log.status === 'opened'
                          ? 'bg-indigo-100 text-indigo-800'
                          : log.status === 'clicked'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-teal-100 text-teal-800'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" /> {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rendered Email Preview Modal */}
      {selectedTemplateForPreview && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-md">
                  Rendered Email Client Preview
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {selectedTemplateForPreview.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTemplateForPreview(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Email Header Simulation */}
            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <div>
                <span className="text-slate-400 font-semibold">From: </span>
                <span className="text-slate-700">HopeHarbor Volunteer Alliance &lt;notifications@hopeharbor.org&gt;</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold">To: </span>
                <span className="text-slate-700">{currentUser.name} &lt;{currentUser.email}&gt;</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold">Subject: </span>
                <span className="font-bold text-slate-900">
                  {selectedTemplateForPreview.subjectTemplate
                    .replace('{{shift_title}}', 'Coastal Cleanup & Habitat Restoration')
                    .replace('{{hours_logged}}', '4.0')}
                </span>
              </div>
            </div>

            {/* Rendered Email Body */}
            <div className="mt-4 p-4 rounded-xl border border-slate-200 bg-white">
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedTemplateForPreview.fullTemplateHtml
                    .replace(/{{volunteer_name}}/g, currentUser.name)
                    .replace(/{{shift_title}}/g, 'Coastal Cleanup & Habitat Restoration')
                    .replace(/{{shift_date}}/g, 'Saturday, September 12, 2026')
                    .replace(/{{shift_time}}/g, '09:00 AM - 01:00 PM')
                    .replace(/{{shift_location}}/g, 'Pacific Cove Marine Sanctuary, Gate B')
                    .replace(/{{organizer_name}}/g, 'Elena Rostova')
                    .replace(/{{total_hours}}/g, String(currentUser.totalHours))
                    .replace(/{{hours_logged}}/g, '4.0'),
                }}
              />
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Variables like <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">&#123;&#123;volunteer_name&#125;&#125;</code> are injected automatically.
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTestEmail(selectedTemplateForPreview)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Dispatch Test To My Inbox
                </button>
                <button
                  onClick={() => setSelectedTemplateForPreview(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
