'use client';
// @ts-nocheck

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  Smile,
  AlertTriangle,
  Pin,
  Users,
  Search,
  CheckCheck,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  FileText,
  Radio,
} from 'lucide-react';
import { Channel, Message, User } from '../types';

interface MessagingViewProps {
  channels?: Channel[];
  messages?: Message[];
  currentUser: User;
  onSendMessage: (channelId: string, content: string, isUrgent?: boolean, attachmentName?: string) => void;
  onAddReaction: (messageId: string, emoji: string) => void;
}

export const MessagingView: React.FC<MessagingViewProps> = ({
  channels = [],
  messages = [],
  currentUser,
  onSendMessage,
  onAddReaction,
}) => {
  const [activeChannelId, setActiveChannelId] = useState<string>('chan-announcements');
  const [inputText, setInputText] = useState<string>('');
  const [isUrgentAlert, setIsUrgentAlert] = useState<boolean>(false);
  const [selectedAttachment, setSelectedAttachment] = useState<string | null>(null);
  const [channelSearch, setChannelSearch] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChannel = (channels || []).find((c) => c.id === activeChannelId) || (channels || [])[0];
  const channelMessages = (messages || []).filter((m) => m.channelId === activeChannelId);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [channelMessages.length, activeChannelId]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedAttachment) return;

    onSendMessage(
      activeChannelId,
      inputText.trim(),
      currentUser?.role === 'organizer' && isUrgentAlert,
      selectedAttachment || undefined
    );

    setInputText('');
    setIsUrgentAlert(false);
    setSelectedAttachment(null);
  };

  const handleQuickReaction = (messageId: string, emoji: string) => {
    onAddReaction(messageId, emoji);
  };

  const isOrganizer = currentUser?.role === 'organizer';

  // Filter channels
  const filteredChannels = (channels || []).filter((c) =>
    (c.name || '').toLowerCase().includes(channelSearch.toLowerCase())
  );

  return (
    <div id="messaging-container" className="p-4 sm:p-6 max-w-7xl mx-auto h-[calc(100vh-6rem)] flex flex-col">
      {/* Top Banner */}
      <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm mb-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Real-Time Messaging & Crew Dispatch
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Live Broadcast Active
              </span>
            </h1>
            <p className="text-xs text-slate-500">
              Direct connection between volunteer coordinators and active shift crews.
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-500 hidden sm:block text-right">
          <span className="font-semibold text-slate-900">{channels.length} Channels</span> • Organizers & Participants
        </div>
      </div>

      {/* Messaging Layout */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-0">
        {/* Channels Sidebar */}
        <div className="w-full md:w-72 border-r border-slate-200 flex flex-col bg-slate-50/50 shrink-0">
          {/* Channel Search */}
          <div className="p-3 border-b border-slate-200">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={channelSearch}
                onChange={(e) => setChannelSearch(e.target.value)}
                placeholder="Search channels..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Channels List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-4">
            {/* Public Channels */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                Announcements & Squads
              </p>
              <div className="space-y-0.5 mt-1">
                {filteredChannels
                  .filter((c) => !c.isDirect)
                  .map((chan) => {
                    const isActive = chan.id === activeChannelId;
                    return (
                      <button
                        key={chan.id}
                        id={`channel-btn-${chan.id}`}
                        onClick={() => setActiveChannelId(chan.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                          isActive
                            ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">{chan.name}</span>
                        {chan.unreadCount > 0 && !isActive && (
                          <span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                            {chan.unreadCount}
                          </span>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Direct Messages */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                Direct Inquiries
              </p>
              <div className="space-y-0.5 mt-1">
                {filteredChannels
                  .filter((c) => c.isDirect)
                  .map((chan) => {
                    const isActive = chan.id === activeChannelId;
                    return (
                      <button
                        key={chan.id}
                        id={`channel-btn-${chan.id}`}
                        onClick={() => setActiveChannelId(chan.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                          isActive
                            ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <img
                          src={chan.otherParticipantAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100'}
                          alt={chan.name}
                          className="w-5 h-5 rounded-full object-cover shrink-0"
                        />
                        <span className="truncate flex-1">{chan.name}</span>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Active Channel Header */}
          <div className="h-14 px-6 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-slate-900 truncate flex items-center gap-2">
                {activeChannel.name}
                {activeChannel.isAnnouncements && (
                  <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-200 px-1.5 py-0.5 rounded font-semibold">
                    Official Broadcast
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-slate-400 truncate">
                {activeChannel.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Users className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Active Crew Online</span>
            </div>
          </div>

          {/* Urgent Announcement Banner (if any) */}
          {activeChannel.isAnnouncements && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 px-6 py-2.5 flex items-center gap-3 shrink-0 text-amber-900 text-xs">
              <Pin className="w-4 h-4 text-amber-600 shrink-0" />
              <div className="truncate flex-1">
                <span className="font-bold">Pinned Organizer Advisory: </span>
                <span>Saturday Coastal Cleanup parking voucher Lot 4 now available for all confirmed volunteers.</span>
              </div>
            </div>
          )}

          {/* Message History */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {channelMessages.map((msg) => {
              const isMine = msg.senderId === currentUser.id;
              const isSenderOrganizer = msg.senderRole === 'organizer';

              return (
                <div
                  key={msg.id}
                  id={`msg-item-${msg.id}`}
                  className={`flex items-start gap-3 group ${isMine ? 'flex-row-reverse' : ''}`}
                >
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-slate-200 mt-1"
                  />

                  <div className={`max-w-xl space-y-1 ${isMine ? 'text-right' : 'text-left'}`}>
                    {/* Header */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="font-bold text-slate-900">{msg.senderName}</span>
                      {isSenderOrganizer && (
                        <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                          ORGANIZER
                        </span>
                      )}
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed inline-block text-left shadow-2xs ${
                        msg.isUrgent
                          ? 'bg-rose-50 border border-rose-300 text-rose-950 font-medium'
                          : isMine
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {msg.isUrgent && (
                        <div className="flex items-center gap-1.5 text-rose-700 font-bold mb-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>URGENT ORGANIZER ADVISORY</span>
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{msg.content}</p>

                      {msg.attachmentName && (
                        <div
                          className={`mt-2 flex items-center gap-2 p-2 rounded-xl border text-xs font-semibold ${
                            isMine
                              ? 'bg-indigo-700/60 border-indigo-500 text-white'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <FileText className="w-4 h-4 text-emerald-500" />
                          <span className="truncate">{msg.attachmentName}</span>
                        </div>
                      )}
                    </div>

                    {/* Reactions */}
                    <div className={`flex items-center gap-1.5 pt-1 ${isMine ? 'justify-end' : 'justify-start'}`}>
                      {msg.reactions.map((react, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickReaction(msg.id, react.emoji)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors border border-slate-200"
                        >
                          <span>{react.emoji}</span>
                          <span className="text-[10px] font-semibold">{react.count}</span>
                        </button>
                      ))}

                      {/* Add quick reaction button */}
                      <button
                        onClick={() => handleQuickReaction(msg.id, '👍')}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 text-xs transition-opacity"
                        title="React with 👍"
                      >
                        +👍
                      </button>
                      <button
                        onClick={() => handleQuickReaction(msg.id, '❤️')}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 text-xs transition-opacity"
                        title="React with ❤️"
                      >
                        +❤️
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Composer */}
          <div className="p-4 border-t border-slate-200 bg-white">
            {selectedAttachment && (
              <div className="mb-2 p-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-700">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  Attached: <strong>{selectedAttachment}</strong>
                </span>
                <button
                  onClick={() => setSelectedAttachment(null)}
                  className="text-slate-400 hover:text-slate-700 text-xs"
                >
                  ✕ Remove
                </button>
              </div>
            )}

            <form onSubmit={handleSend} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  id="message-text-input"
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Message in ${activeChannel.name}...`}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />

                <button
                  type="button"
                  onClick={() =>
                    setSelectedAttachment('Site_Checklist_&_Safety_Guidelines.pdf')
                  }
                  className="p-2.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
                  title="Attach file (PDF/Doc)"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  id="send-message-button"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl shadow-sm transition-colors flex items-center justify-center shrink-0"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Urgency toggle for organizers */}
              {isOrganizer && (
                <div className="flex items-center justify-between px-1">
                  <label className="flex items-center gap-2 text-[11px] text-slate-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isUrgentAlert}
                      onChange={(e) => setIsUrgentAlert(e.target.checked)}
                      className="rounded text-rose-600 focus:ring-rose-500"
                    />
                    <span className="font-semibold text-rose-700 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Mark as Urgent Broadcast Alert (Pushes notification to all attendees)
                    </span>
                  </label>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
