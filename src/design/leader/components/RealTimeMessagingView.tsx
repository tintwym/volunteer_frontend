'use client';
// @ts-nocheck

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  MessageSquare,
  Users,
  Megaphone,
  AlertTriangle,
  Sparkles,
  Paperclip,
  CheckCheck,
  ShieldCheck,
  Hash,
  User,
  Plus
} from 'lucide-react';
import { ChatChannel, ChatMessage, Volunteer } from '../types';

interface RealTimeMessagingViewProps {
  channels: ChatChannel[];
  messages: Record<string, ChatMessage[]>;
  volunteers: Volunteer[];
  onSendMessage: (
    channelId: string,
    content: string,
    isAnnouncement?: boolean,
    priority?: 'normal' | 'urgent'
  ) => void;
  selectedChannelId?: string;
  onSelectChannel?: (id: string) => void;
}

export const RealTimeMessagingView: React.FC<RealTimeMessagingViewProps> = ({
  channels,
  messages,
  volunteers,
  onSendMessage,
  selectedChannelId,
  onSelectChannel
}) => {
  const [activeChannelId, setActiveChannelId] = useState<string>(
    selectedChannelId || channels[0]?.id || 'ch-announcements'
  );
  const [inputText, setInputText] = useState('');
  const [isUrgentAnnouncement, setIsUrgentAnnouncement] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedChannelId) {
      setActiveChannelId(selectedChannelId);
    }
  }, [selectedChannelId]);

  const activeChannel = channels.find(c => c.id === activeChannelId) || channels[0];
  const channelMessages = messages[activeChannelId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [channelMessages.length, activeChannelId]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(
      activeChannelId,
      inputText.trim(),
      isUrgentAnnouncement || activeChannelId === 'ch-announcements',
      isUrgentAnnouncement ? 'urgent' : 'normal'
    );

    setInputText('');
    setIsUrgentAnnouncement(false);
  };

  const handleQuickChip = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="h-[calc(100vh-140px)] min-h-[600px] bg-white rounded-2xl border border-slate-200 shadow-xs flex overflow-hidden">
      {/* Channels & Direct Messages Sidebar (Left) */}
      <div className="w-72 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              Coordination Comms
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              Real-Time
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Organizers, squad leads & volunteers
          </p>
        </div>

        {/* Channel List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Official Broadcast & Ops Channels */}
          <div>
            <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Channels & Operations
            </div>
            <div className="space-y-1">
              {channels
                .filter(c => !c.isDirect)
                .map(ch => {
                  const isActive = ch.id === activeChannelId;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        setActiveChannelId(ch.id);
                        if (onSelectChannel) onSelectChannel(ch.id);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'text-slate-700 hover:bg-slate-200/70'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="truncate">{ch.name}</span>
                      </div>
                      {ch.unreadCount > 0 && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            isActive ? 'bg-white text-emerald-700' : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {ch.unreadCount}
                        </span>
                      )}
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Direct Volunteer Communications */}
          <div>
            <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Direct Volunteer Chats
            </div>
            <div className="space-y-1">
              {channels
                .filter(c => c.isDirect)
                .map(ch => {
                  const isActive = ch.id === activeChannelId;
                  const vol = volunteers.find(v => v.id === ch.recipientVolunteerId);
                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        setActiveChannelId(ch.id);
                        if (onSelectChannel) onSelectChannel(ch.id);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'text-slate-700 hover:bg-slate-200/70'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <div className="relative">
                          {vol ? (
                            <img
                              src={vol.avatar}
                              alt={vol.name}
                              className="w-5 h-5 rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-4 h-4" />
                          )}
                          <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-white" />
                        </div>
                        <span className="truncate">{ch.name}</span>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Leader Broadcast Badge */}
        <div className="p-3 border-t border-slate-200 bg-white text-[11px] text-slate-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Broadcast as Sarah Jenkins (Coordinator)</span>
        </div>
      </div>

      {/* Chat Conversation Pane (Center) */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Active Channel Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>{activeChannel.name}</span>
              {activeChannel.id === 'ch-announcements' && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  Organizer Broadcast Channel
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{activeChannel.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Synced
            </span>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/40">
          {channelMessages.map((msg) => {
            const isLeader = msg.senderId.startsWith('leader');
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${
                  msg.priority === 'urgent'
                    ? 'p-3.5 bg-rose-50 border border-rose-200 rounded-xl'
                    : msg.isAnnouncement
                    ? 'p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl'
                    : ''
                }`}
              >
                <img
                  src={msg.senderAvatar}
                  alt={msg.senderName}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-2xs shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{msg.senderName}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-slate-200 text-slate-700">
                      {msg.senderRole}
                    </span>
                    {msg.priority === 'urgent' && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-rose-600 text-white flex items-center gap-0.5">
                        <AlertTriangle className="w-3 h-3" /> URGENT ALERT
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 ml-auto">{msg.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-800 mt-1.5 leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Chips & Input Form */}
        <div className="p-3 border-t border-slate-200 bg-white space-y-2">
          {/* Quick chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
              Quick:
            </span>
            <button
              type="button"
              onClick={() => handleQuickChip('🚨 Urgent reminder: Tomorrow morning food pantry shift begins at 08:30 AM sharp!')}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium whitespace-nowrap cursor-pointer"
            >
              Shift Reminder
            </button>
            <button
              type="button"
              onClick={() => handleQuickChip('📍 Location update: Staging area moved to Warehouse B, north roll-up gate.')}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium whitespace-nowrap cursor-pointer"
            >
              Location Update
            </button>
            <button
              type="button"
              onClick={() => handleQuickChip('👏 Phenomenal effort today everyone! 320 family packages sorted and delivered!')}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium whitespace-nowrap cursor-pointer"
            >
              Shoutout / Thanks
            </button>
          </div>

          {/* Urgent Announcement Checkbox */}
          <div className="flex items-center justify-between text-xs px-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 font-medium">
              <input
                type="checkbox"
                checked={isUrgentAnnouncement}
                onChange={(e) => setIsUrgentAnnouncement(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span className="flex items-center gap-1 text-[11px]">
                <Megaphone className="w-3.5 h-3.5 text-amber-600" />
                Highlight as Urgent Leader Notice (dispatches email alert)
              </span>
            </label>
            <span className="text-[10px] text-slate-400">Enter to send</span>
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              placeholder={`Message ${activeChannel.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
