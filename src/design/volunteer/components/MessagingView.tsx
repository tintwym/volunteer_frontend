'use client';
// @ts-nocheck

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  MessageSquare, 
  CheckCheck, 
  Paperclip, 
  Users, 
  Clock, 
  Smile, 
  Search, 
  Sparkles,
  Info
} from 'lucide-react';
import { Conversation, ChatMessage, VolunteerProfile } from '../types';

interface MessagingViewProps {
  conversations: Conversation[];
  profile: VolunteerProfile;
  onSendMessage: (conversationId: string, text: string) => void;
}

export const MessagingView: React.FC<MessagingViewProps> = ({
  conversations,
  profile,
  onSendMessage
}) => {
  const [activeConvId, setActiveConvId] = useState<string>(conversations[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [isOrganizerTyping, setIsOrganizerTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConvId) || conversations[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages, isOrganizerTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || !activeConversation) return;

    onSendMessage(activeConversation.id, text);
    if (!textToSend) setInputText('');

    // Simulate organizer typing and replying
    setIsOrganizerTyping(true);
    setTimeout(() => {
      setIsOrganizerTyping(false);
      let reply = "Thanks for the message, Maya! We have noted this on your volunteer schedule.";
      if (text.toLowerCase().includes('parking') || text.toLowerCase().includes('arrive')) {
        reply = "Free volunteer parking is reserved in Lot B right next to the entrance. Feel free to arrive 10-15 minutes early for orientation!";
      } else if (text.toLowerCase().includes('bring') || text.toLowerCase().includes('wear')) {
        reply = "We recommend comfortable clothes, sturdy closed-toe shoes, and a reusable water bottle. All heavy-duty gear and gloves are provided by us!";
      } else if (text.toLowerCase().includes('confirm') || text.toLowerCase().includes('ready')) {
        reply = "Awesome! We are counting on you and look forward to having you on the shift. See you soon!";
      }
      
      const newReplyMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        senderId: 'organizer-reply',
        senderName: activeConversation.name,
        senderRole: 'Coordinator',
        senderAvatar: activeConversation.avatar,
        text: reply,
        timestamp: 'Just now',
        isVolunteer: false
      };

      activeConversation.messages.push(newReplyMsg);
      activeConversation.lastMessage = reply;
      activeConversation.lastTimestamp = 'Just now';
      scrollToBottom();
    }, 1400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickPrompts = [
    "Confirming my attendance for this weekend's shift!",
    "Where should I park my vehicle on site?",
    "What equipment or clothes do you recommend bringing?",
    "Can I invite a friend to register as well?"
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs h-[calc(100vh-10rem)] min-h-[580px] flex overflow-hidden">
      {/* Left Column: Conversations List */}
      <div className="w-full sm:w-80 border-r border-slate-200 flex flex-col shrink-0">
        {/* Search header */}
        <div className="p-3.5 border-b border-slate-200">
          <div className="text-sm font-bold text-slate-900 mb-2">Organizer & Team Chat</div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* List of chats */}
        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
          {conversations.map((conv) => {
            const isSelected = conv.id === activeConvId;
            return (
              <button
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`w-full p-3.5 text-left flex items-start gap-3 transition-colors ${
                  isSelected ? 'bg-emerald-50/70 border-l-4 border-emerald-600' : 'hover:bg-slate-50'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={conv.avatar}
                    alt={conv.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {conv.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {conv.name}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {conv.lastTimestamp}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500 truncate">
                    {conv.role}
                  </div>

                  <div className="text-xs text-slate-600 truncate mt-1">
                    {conv.lastMessage}
                  </div>
                </div>

                {conv.unreadCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {conv.unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Chat Window */}
      {activeConversation ? (
        <div className="hidden sm:flex flex-1 flex-col justify-between bg-slate-50/40">
          {/* Active Chat Header */}
          <div className="p-3.5 bg-white border-b border-slate-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={activeConversation.avatar}
                  alt={activeConversation.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {activeConversation.isOnline && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {activeConversation.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {activeConversation.role} &bull; {activeConversation.isOnline ? 'Online & Available' : 'Offline'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <Info className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Event Coordinator Channel</span>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeConversation.messages.map((msg) => {
              const isMe = msg.isVolunteer;
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="w-7 h-7 rounded-full object-cover mb-1"
                    />
                  )}

                  <div className={`max-w-md rounded-2xl p-3 text-xs leading-relaxed ${
                    isMe 
                      ? 'bg-emerald-600 text-white rounded-br-xs shadow-xs' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs'
                  }`}>
                    {!isMe && (
                      <div className="text-[10px] font-bold text-emerald-800 mb-0.5">
                        {msg.senderName} ({msg.senderRole})
                      </div>
                    )}
                    <div>{msg.text}</div>
                    <div className={`text-[9px] mt-1 text-right flex items-center justify-end gap-1 ${
                      isMe ? 'text-emerald-100' : 'text-slate-400'
                    }`}>
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck className="w-3 h-3" />}
                    </div>
                  </div>

                  {isMe && (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-7 h-7 rounded-full object-cover mb-1 ring-1 ring-emerald-500"
                    />
                  )}
                </div>
              );
            })}

            {/* Organizer typing indicator */}
            {isOrganizerTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 pl-9 italic">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                <span>{activeConversation.name} is typing a reply...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick reply suggestions */}
          <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="text-slate-500 shrink-0 flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Quick:
            </span>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 rounded-full shrink-0 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <button 
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Attach File"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder={`Send message to ${activeConversation.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
            />

            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
              className="p-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl shadow-xs transition-colors"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
          Select a conversation to start messaging
        </div>
      )}
    </div>
  );
};
