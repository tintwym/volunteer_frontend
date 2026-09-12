'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  MessageSquare,
  Megaphone,
  Send,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Users,
  User,
  Radio,
  ArrowRight,
  ShieldCheck,
  Search,
  Share2
} from 'lucide-react';
import { OrganiserAnnouncement, Volunteer, ChatMessage, ChatChannel } from '../types';

interface CommunicationRelayViewProps {
  announcements: OrganiserAnnouncement[];
  volunteers: Volunteer[];
  channels: ChatChannel[];
  activeChannelId: string;
  messages: ChatMessage[];
  onSelectChannel: (channelId: string) => void;
  onSendMessage: (text: string) => void;
  onRelayAnnouncement: (announcementId: string, customRelayMessage: string) => void;
  onBroadcastUrgentMessage: (message: string) => void;
}

export const CommunicationRelayView: React.FC<CommunicationRelayViewProps> = ({
  announcements,
  volunteers,
  channels,
  activeChannelId,
  messages,
  onSelectChannel,
  onSendMessage,
  onRelayAnnouncement,
  onBroadcastUrgentMessage
}) => {
  const [activeTab, setActiveTab] = useState<'relay' | 'chat'>('relay');
  const [relayDrafts, setRelayDrafts] = useState<Record<string, string>>({
    'org-ann-1': 'Registration Team, please assemble at Counter A by 7:45 AM.',
    'org-ann-2': 'Elena & Priya: VIP escort team please be in position at Door 2 by 08:10 AM.',
    'org-ann-3': 'Shift A lunch break: 11:45 AM. Shift B lunch break: 12:15 PM.'
  });
  const [urgentBroadcastText, setUrgentBroadcastText] = useState('');
  const [chatInputText, setChatInputText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSendRelay = (announcement: OrganiserAnnouncement) => {
    const text = relayDrafts[announcement.id] || announcement.suggestedTeamAction;
    onRelayAnnouncement(announcement.id, text);
    setToastMessage(`Relayed message broadcasted to Team Alpha: "${text}"`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urgentBroadcastText.trim()) return;
    onBroadcastUrgentMessage(urgentBroadcastText.trim());
    setToastMessage(`URGENT BROADCAST transmitted to all 20 Team Alpha volunteers!`);
    setUrgentBroadcastText('');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;
    onSendMessage(chatInputText.trim());
    setChatInputText('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Communication & Organiser Relay</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Operational Bridge
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Receive broadcasts from Lead Organiser, translate them into actionable team instructions, broadcast urgent alerts, and converse with volunteers.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold">
          <button
            onClick={() => setActiveTab('relay')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'relay' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5 text-amber-600" />
            <span>Organiser Announcements Relay</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'chat' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            <span>Team Live Chat & Comms</span>
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md flex items-center justify-between">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">&times;</button>
        </div>
      )}

      {activeTab === 'relay' ? (
        <div className="space-y-6">
          {/* Section 2.6 Example Card: Organiser -> Leader Relay Demonstration */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-md space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Operational Supervision Pattern (Section 2.6)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-white/10 rounded-xl border border-white/10 space-y-1">
                <span className="text-[11px] font-bold text-slate-300 block">1. Organiser Broadcast:</span>
                <p className="italic text-amber-200 text-xs">"All volunteers must report to the main hall by 8:00 AM."</p>
                <span className="text-[10px] text-slate-400 block">General broad command from event leadership</span>
              </div>

              <div className="p-3.5 bg-emerald-950/70 rounded-xl border border-emerald-500/30 space-y-1">
                <span className="text-[11px] font-bold text-emerald-300 block">2. Leader Translates & Relays:</span>
                <p className="italic text-emerald-100 text-xs font-semibold">"Registration Team, please assemble at Counter A by 7:45 AM."</p>
                <span className="text-[10px] text-emerald-300/80 block">Specific, actionable team-level operational instruction</span>
              </div>
            </div>
          </div>

          {/* Urgent Team Broadcast Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-rose-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Broadcast Urgent Alert to Team Alpha
              </h3>
            </div>
            <form onSubmit={handleSendBroadcast} className="flex gap-2">
              <input
                type="text"
                placeholder="Type urgent broadcast (e.g., 'Queue spike at Door 1, all Counter A volunteers switch to dual check-in mode')..."
                value={urgentBroadcastText}
                onChange={(e) => setUrgentBroadcastText(e.target.value)}
                className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs whitespace-nowrap"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Broadcast Alert</span>
              </button>
            </form>
          </div>

          {/* Announcements Feed with Relay Form */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900">Received Organiser Announcements</h2>

            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        {ann.priority} Priority
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {ann.timestamp}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        From: <strong>{ann.organiserName}</strong>
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 mt-2">{ann.title}</h3>
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-1.5 leading-relaxed">
                      "{ann.message}"
                    </p>
                  </div>

                  {ann.relayedToTeam && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Relayed
                    </span>
                  )}
                </div>

                {/* Relay Composer */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Leader Relay Message to Team Alpha:
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={relayDrafts[ann.id] || ann.suggestedTeamAction}
                      onChange={(e) =>
                        setRelayDrafts(prev => ({ ...prev, [ann.id]: e.target.value }))
                      }
                      className="flex-1 p-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                    />
                    <button
                      onClick={() => handleSendRelay(ann)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs whitespace-nowrap"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit to Team</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Team Live Chat View */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs h-[560px] flex overflow-hidden">
          {/* Channels Sidebar */}
          <div className="w-64 border-r border-slate-200 bg-slate-50 p-3 flex flex-col justify-between shrink-0">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-2">
                Team Alpha Comms Channels
              </span>
              {channels.map((chan) => (
                <button
                  key={chan.id}
                  onClick={() => onSelectChannel(chan.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                    activeChannelId === chan.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="opacity-70">#</span>
                    <span className="truncate">{chan.name}</span>
                  </div>
                  {chan.unreadCount > 0 && activeChannelId !== chan.id && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-900">
                      {chan.unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="p-2.5 rounded-xl bg-slate-200/70 text-[11px] text-slate-600">
              <strong className="block text-slate-800">Walkie-Talkie Channel:</strong>
              CH-04 (Welcome Operations)
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 flex flex-col justify-between bg-white">
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg) => {
                const isLeader = msg.senderName.includes('Sarah Jenkins') || msg.senderRole === 'Organizer';

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isLeader ? 'flex-row-reverse' : ''}`}
                  >
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                    />
                    <div
                      className={`max-w-md p-3 rounded-2xl text-xs space-y-0.5 ${
                        isLeader
                          ? 'bg-emerald-600 text-white rounded-tr-xs'
                          : 'bg-slate-100 text-slate-800 rounded-tl-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-[10px] opacity-80">
                        <span className="font-bold">{msg.senderName}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="text-xs leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="p-3 border-t border-slate-200 flex gap-2">
              <input
                type="text"
                placeholder="Message Team Alpha volunteers..."
                value={chatInputText}
                onChange={(e) => setChatInputText(e.target.value)}
                className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
