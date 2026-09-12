'use client';
// @ts-nocheck

import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Check, 
  Plus, 
  MessageSquare, 
  ShieldCheck, 
  Award,
  AlertCircle
} from 'lucide-react';
import { VolunteerEvent } from '../types';
import confetti from 'canvas-confetti';

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: VolunteerEvent | null;
  onToggleSignup: (eventId: string) => void;
  onMessageOrganizer: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  isOpen,
  onClose,
  event,
  onToggleSignup,
  onMessageOrganizer
}) => {
  if (!isOpen || !event) return null;

  const spotsLeft = event.spotsTotal - event.spotsFilled;

  const handleSignup = () => {
    if (!event.isSignedUp) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
    onToggleSignup(event.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 flex items-start justify-between bg-slate-50">
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800">
              {event.category}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {event.title}
            </h3>
            <p className="text-xs text-slate-500">{event.organization}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-slate-700">
          {/* Key details bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Shift Date</span>
              <span className="font-semibold text-slate-800">{event.formattedDate}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Shift Hours</span>
              <span className="font-semibold text-slate-800">{event.startTime} - {event.endTime}</span>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Awarded Credit</span>
              <span className="font-bold text-emerald-700">+{event.hours} Verified Hours</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Meeting Spot & Directions</span>
              <span className="text-slate-600">{event.location}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <span className="font-bold text-slate-900 block">Activity Description</span>
            <p className="leading-relaxed text-slate-600">{event.description}</p>
          </div>

          {/* Requirements & Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <span className="font-bold text-slate-900 block">Volunteer Requirements</span>
              <ul className="space-y-1">
                {event.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 text-slate-600">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-900 block">Skills or Equipment</span>
              <div className="flex flex-wrap gap-1.5">
                {event.skillsNeeded.map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Capacity status */}
          <div className="p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-xl flex items-center justify-between">
            <span className="font-semibold text-emerald-950 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-600" />
              Capacity: {event.spotsFilled} of {event.spotsTotal} spots filled
            </span>
            <span className="text-emerald-800 font-bold">
              {spotsLeft > 0 ? `${spotsLeft} spots remaining` : 'Waitlist only'}
            </span>
          </div>

          {/* Organizer Card */}
          <div className="border-t border-slate-100 pt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <img
                src={event.organizer.avatar}
                alt={event.organizer.name}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <div className="font-bold text-slate-900">{event.organizer.name}</div>
                <div className="text-[11px] text-slate-400">{event.organizer.role}</div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onMessageOrganizer();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Contact Organizer</span>
            </button>
          </div>
        </div>

        {/* Modal Footer with Sign Up Action */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
          >
            Close
          </button>

          <button
            onClick={handleSignup}
            className={`
              px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-xs
              ${event.isSignedUp 
                ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'}
            `}
          >
            {event.isSignedUp ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Registered (Click to Withdraw)</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Confirm Shift Registration</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
