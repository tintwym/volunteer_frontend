'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  Eye,
  AlertTriangle,
  Play,
  Filter,
  Check,
  X,
  FileText,
  Users,
  ShieldCheck
} from 'lucide-react';
import { AutomatedEmailTemplate, EmailLogEntry, Volunteer, ShiftEvent } from '../types';

interface AutomatedEmailViewProps {
  templates: AutomatedEmailTemplate[];
  emailLogs: EmailLogEntry[];
  volunteers: Volunteer[];
  shifts: ShiftEvent[];
  onToggleTemplate: (templateId: string) => void;
  onTriggerTestSend: (template: AutomatedEmailTemplate, volunteerId: string) => void;
  onSendCustomBroadcast: (recipientGroup: string, subject: string, body: string) => void;
}

export const AutomatedEmailView: React.FC<AutomatedEmailViewProps> = ({
  templates,
  emailLogs,
  volunteers,
  shifts,
  onToggleTemplate,
  onTriggerTestSend,
  onSendCustomBroadcast
}) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'logs' | 'broadcast'>('rules');
  const [previewTemplate, setPreviewTemplate] = useState<AutomatedEmailTemplate | null>(null);
  const [selectedVolunteerForTest, setSelectedVolunteerForTest] = useState<string>(volunteers[0]?.id || '');
  const [selectedLogForDetail, setSelectedLogForDetail] = useState<EmailLogEntry | null>(null);

  // Custom broadcast state
  const [broadcastAudience, setBroadcastAudience] = useState<'all' | 'shift' | 'leads'>('all');
  const [broadcastShiftId, setBroadcastShiftId] = useState(shifts[0]?.id || '');
  const [broadcastSubject, setBroadcastSubject] = useState('');
  const [broadcastBody, setBroadcastBody] = useState('');
  const [broadcastSuccessNotice, setBroadcastSuccessNotice] = useState(false);

  const totalDelivered = emailLogs.filter(l => l.status === 'Delivered' || l.status === 'Opened').length;

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject || !broadcastBody) return;

    let groupDesc = 'All Active Volunteers';
    if (broadcastAudience === 'shift') {
      const shiftObj = shifts.find(s => s.id === broadcastShiftId);
      groupDesc = shiftObj ? `Shift Crew: ${shiftObj.title}` : 'Selected Shift Volunteers';
    } else if (broadcastAudience === 'leads') {
      groupDesc = 'Team Leads & Specialists Only';
    }

    onSendCustomBroadcast(groupDesc, broadcastSubject, broadcastBody);
    setBroadcastSubject('');
    setBroadcastBody('');
    setBroadcastSuccessNotice(true);
    setTimeout(() => setBroadcastSuccessNotice(false), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Automated Email Notifications</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              {templates.filter(t => t.enabled).length} / {templates.length} Active Rules
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Automated shift reminders, post-event service hours confirmations, and milestone awards.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'rules' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Automation Rules ({templates.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'logs' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Delivery Outbox ({emailLogs.length})
          </button>
          <button
            onClick={() => setActiveTab('broadcast')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'broadcast' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Leader Broadcast
          </button>
        </div>
      </div>

      {/* TAB 1: Automation Rules */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((tmpl) => (
              <div
                key={tmpl.id}
                className={`p-5 rounded-2xl border transition-all bg-white shadow-xs ${
                  tmpl.enabled ? 'border-slate-200' : 'border-slate-200 opacity-60 bg-slate-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{tmpl.title}</h3>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                        Trigger: {tmpl.triggerType.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Enable Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tmpl.enabled}
                      onChange={() => onToggleTemplate(tmpl.id)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                  <div>
                    <strong className="text-slate-800">Subject:</strong> {tmpl.subjectTemplate}
                  </div>
                  <div className="text-slate-500 line-clamp-2 mt-1">
                    {tmpl.bodyTemplate}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-800">{tmpl.sentCount}</span> dispatches • Last: {tmpl.lastTriggered || 'Recent'}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewTemplate(tmpl)}
                      className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview Email</span>
                    </button>
                    <button
                      onClick={() => {
                        const targetVol = volunteers.find(v => v.id === selectedVolunteerForTest) || volunteers[0];
                        if (targetVol) onTriggerTestSend(tmpl, targetVol.id);
                      }}
                      className="px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:text-white bg-emerald-50 hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                      title="Trigger automated dispatch simulation"
                    >
                      <Play className="w-3 h-3" />
                      <span>Test Dispatch</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Test Dispatch Target Selector Bar */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-slate-700 font-semibold">Test Dispatch Target Volunteer:</span>
            </div>
            <select
              value={selectedVolunteerForTest}
              onChange={(e) => setSelectedVolunteerForTest(e.target.value)}
              className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
            >
              {volunteers.map(v => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.email}) • {v.verifiedHours} hrs
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* TAB 2: Delivery Outbox Logs */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Live Delivery Log & Audit Trail</h3>
              <p className="text-xs text-slate-500">
                Timestamped records of automated shift alerts and hours verification receipts.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {totalDelivered} Delivered
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Recipient</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Notification Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {emailLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{log.recipientName}</div>
                      <div className="text-[11px] text-slate-500">{log.recipientEmail}</div>
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate font-medium text-slate-800">
                      {log.subject}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {log.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                          log.status === 'Opened'
                            ? 'text-purple-700'
                            : 'text-emerald-700'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px]">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedLogForDetail(log)}
                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Leader Custom Broadcast Tool */}
      {activeTab === 'broadcast' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 max-w-3xl mx-auto space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Dispatch Leader Broadcast</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Send immediate automated emails to all registered volunteers or a specific shift crew.
            </p>
          </div>

          {broadcastSuccessNotice && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Broadcast dispatched successfully! Delivered to all recipients and logged in audit outbox.</span>
            </div>
          )}

          <form onSubmit={handleBroadcastSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Target Audience</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 ${
                    broadcastAudience === 'all'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="aud"
                    checked={broadcastAudience === 'all'}
                    onChange={() => setBroadcastAudience('all')}
                    className="sr-only"
                  />
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>All Active Volunteers ({volunteers.length})</span>
                </label>

                <label
                  className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 ${
                    broadcastAudience === 'shift'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="aud"
                    checked={broadcastAudience === 'shift'}
                    onChange={() => setBroadcastAudience('shift')}
                    className="sr-only"
                  />
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Specific Shift Crew</span>
                </label>

                <label
                  className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 ${
                    broadcastAudience === 'leads'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="aud"
                    checked={broadcastAudience === 'leads'}
                    onChange={() => setBroadcastAudience('leads')}
                    className="sr-only"
                  />
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Squad Leads & Specialists</span>
                </label>
              </div>
            </div>

            {broadcastAudience === 'shift' && (
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Shift</label>
                <select
                  value={broadcastShiftId}
                  onChange={(e) => setBroadcastShiftId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  {shifts.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.date} • {s.assignedVolunteerIds?.length || 0} volunteers assigned)
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="font-bold text-slate-700 block mb-1">Subject Line *</label>
              <input
                type="text"
                required
                placeholder="e.g. Schedule Update: Parking and Warehouse Entry Directions"
                value={broadcastSubject}
                onChange={(e) => setBroadcastSubject(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Body Content *</label>
              <textarea
                rows={5}
                required
                placeholder="Dear Volunteers, please note the following update regarding our upcoming community shift..."
                value={broadcastBody}
                onChange={(e) => setBroadcastBody(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-900"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-slate-500 text-[11px]">
                Signatory: Sarah Jenkins • Community Action Network Volunteer Leader
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Automated Email Broadcast</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Rendered Email Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold">Template Preview: {previewTemplate.title}</span>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Email Canvas Preview */}
            <div className="p-6 bg-slate-100">
              <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden max-w-md mx-auto">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-slate-900 to-teal-900 p-5 text-white text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center font-bold mb-2 shadow-xs">
                    CAN
                  </div>
                  <h4 className="font-bold text-sm tracking-wide">Community Action Network</h4>
                  <p className="text-[10px] text-emerald-300">Volunteer Leadership Services</p>
                </div>

                <div className="p-5 space-y-4 text-xs text-slate-700">
                  <div className="border-b border-slate-100 pb-2">
                    <span className="text-[11px] text-slate-400 block uppercase font-bold">Subject</span>
                    <p className="font-bold text-slate-900 text-xs mt-0.5">
                      {previewTemplate.subjectTemplate.replace('{{volunteerName}}', 'Elena Rostova').replace('{{eventName}}', 'Saturday Community Food Distribution')}
                    </p>
                  </div>

                  <div className="whitespace-pre-wrap leading-relaxed">
                    {previewTemplate.bodyTemplate
                      .replace(/{{volunteerName}}/g, 'Elena Rostova')
                      .replace(/{{eventName}}/g, 'Saturday Community Food Distribution')
                      .replace(/{{eventTime}}/g, '08:30 AM')
                      .replace(/{{location}}/g, 'Downtown Hope Center - Warehouse B')
                      .replace(/{{hoursCount}}/g, '4.5')
                      .replace(/{{totalVerifiedHours}}/g, '118')
                      .replace(/{{milestoneName}}/g, 'Century Hero (100+ Hrs)')
                      .replace(/{{skills}}/g, 'Food Handling, First Aid')}
                  </div>

                  <div className="pt-4 border-t border-slate-100 text-center">
                    <button
                      type="button"
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold text-xs shadow-xs"
                    >
                      View Live Service Transcript &rarr;
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-[10px] text-slate-400">
                  Automated notification sent by Community Action Network Alliance.
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 text-right">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log Detail Inspector Modal */}
      {selectedLogForDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Delivery Receipt</h3>
              <button onClick={() => setSelectedLogForDetail(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div><strong className="text-slate-900">Recipient:</strong> {selectedLogForDetail.recipientName} ({selectedLogForDetail.recipientEmail})</div>
              <div><strong className="text-slate-900">Subject:</strong> {selectedLogForDetail.subject}</div>
              <div><strong className="text-slate-900">Dispatched:</strong> {selectedLogForDetail.timestamp}</div>
              <div><strong className="text-slate-900">Delivery Status:</strong> <span className="text-emerald-700 font-semibold">{selectedLogForDetail.status}</span></div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: selectedLogForDetail.bodyHtml }} />
            </div>

            <div className="text-right">
              <button
                onClick={() => setSelectedLogForDetail(null)}
                className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
