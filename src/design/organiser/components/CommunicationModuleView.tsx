'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Megaphone,
  Radio,
  Send,
  AlertTriangle,
  Users,
  ShieldCheck,
  Clock,
  Eye,
  CheckCheck,
  Plus,
  X,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { BroadcastAnnouncement, CommunicationLevel } from '../types';

interface CommunicationModuleViewProps {
  announcements?: BroadcastAnnouncement[];
  onSendAnnouncement?: (announcement: BroadcastAnnouncement) => void;
  onOpenChat?: () => void;
}

export const CommunicationModuleView: React.FC<CommunicationModuleViewProps> = ({
  announcements = [],
  onSendAnnouncement,
  onOpenChat,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState<CommunicationLevel>('All Volunteers');
  const [message, setMessage] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);

  const handleSendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetMap: Record<CommunicationLevel, string> = {
      'All Volunteers': 'All Active Volunteers (250)',
      'Volunteer Leaders': 'Volunteer Leaders Squad (15)',
      'Individual Team': 'Logistics & Warehouse Squad',
      'Individual Volunteer': 'Direct Volunteer Dispatch',
    };

    const newAnnouncement: BroadcastAnnouncement = {
      id: `ann-${Date.now()}`,
      title,
      level,
      targetName: targetMap[level],
      message,
      sentAt: 'Just now',
      isEmergency,
      sentBy: 'Elena Rostova (Organiser)',
      readCount: 1,
      totalRecipients: level === 'All Volunteers' ? 250 : level === 'Volunteer Leaders' ? 15 : 25,
      status: 'Sent',
    };

    onSendAnnouncement(newAnnouncement);
    setIsModalOpen(false);
    setTitle('');
    setMessage('');
    setIsEmergency(false);
  };

  return (
    <div id="communication-broadcast-view" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Communication & Broadcast Center</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
              Multi-Tier Dispatch
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Broadcast urgent advisories and operational updates across 4 distinct communication tiers: <span className="font-semibold text-slate-700">All Volunteers → Volunteer Leaders → Individual Team → Individual Volunteer</span>.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenChat}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-300 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-slate-600" />
            <span>Open Direct Channels</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Megaphone className="w-4 h-4" />
            <span>Broadcast Announcement</span>
          </button>
        </div>
      </div>

      {/* Communication Tier Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => {
            setLevel('All Volunteers');
            setIsModalOpen(true);
          }}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 cursor-pointer transition-all space-y-2 shadow-xs"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
            <Radio className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">All Volunteers</h3>
          <p className="text-xs text-slate-500">250 Registered Volunteers • SMS & App Push Alerts</p>
        </div>

        <div
          onClick={() => {
            setLevel('Volunteer Leaders');
            setIsModalOpen(true);
          }}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 cursor-pointer transition-all space-y-2 shadow-xs"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Volunteer Leaders</h3>
          <p className="text-xs text-slate-500">15 Squad Leaders • Command channel dispatch</p>
        </div>

        <div
          onClick={() => {
            setLevel('Individual Team');
            setIsModalOpen(true);
          }}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 cursor-pointer transition-all space-y-2 shadow-xs"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <Users className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Individual Team</h3>
          <p className="text-xs text-slate-500">Target specific squad (e.g. Logistics, First Aid)</p>
        </div>

        <div
          onClick={() => {
            setLevel('Individual Volunteer');
            setIsModalOpen(true);
          }}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 cursor-pointer transition-all space-y-2 shadow-xs"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
            <MessageSquare className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Individual Volunteer</h3>
          <p className="text-xs text-slate-500">Direct 1-on-1 operational assignment instructions</p>
        </div>
      </div>

      {/* Broadcast History Feed */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Recent Broadcast Dispatches</h3>
        {announcements.map((ann) => {
          const readPct = Math.round((ann.readCount / (ann.totalRecipients || 1)) * 100);

          return (
            <div
              key={ann.id}
              className={`p-5 rounded-2xl border shadow-xs transition-all space-y-3 ${
                ann.isEmergency
                  ? 'bg-rose-50/50 border-rose-300'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  {ann.isEmergency ? (
                    <span className="p-1 rounded-md bg-rose-600 text-white animate-pulse">
                      <AlertTriangle className="w-4 h-4" />
                    </span>
                  ) : (
                    <span className="p-1 rounded-md bg-amber-100 text-amber-800">
                      <Megaphone className="w-4 h-4" />
                    </span>
                  )}
                  <h4 className="font-bold text-sm text-slate-900">{ann.title}</h4>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {ann.level}
                  </span>
                </div>

                <span className="text-xs text-slate-400 font-medium">{ann.sentAt}</span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed max-w-4xl">{ann.message}</p>

              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                <span>Audience: <strong>{ann.targetName}</strong></span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-semibold text-emerald-700">
                    <CheckCheck className="w-3.5 h-3.5" />
                    {ann.readCount} / {ann.totalRecipients} ({readPct}%) Read Receipts
                  </span>
                  <span>Sent by {ann.sentBy}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Broadcast Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Broadcast Announcement</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Communication Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as CommunicationLevel)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                >
                  <option value="All Volunteers">All Volunteers (250)</option>
                  <option value="Volunteer Leaders">Volunteer Leaders Squad (15)</option>
                  <option value="Individual Team">Individual Operational Team</option>
                  <option value="Individual Volunteer">Individual Volunteer</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Broadcast Subject / Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Gate 4 Parking Access & Staging Notice"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Message Content</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write message to broadcast via SMS, app push, and leader radio..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-rose-900 block">High Priority Emergency Override</span>
                  <p className="text-[11px] text-rose-700">Sends immediate siren push notification and SMS blast.</p>
                </div>
                <input
                  type="checkbox"
                  checked={isEmergency}
                  onChange={(e) => setIsEmergency(e.target.checked)}
                  className="w-4 h-4 text-rose-600 rounded-md"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-2 font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Broadcast Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
