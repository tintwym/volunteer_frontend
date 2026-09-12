'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, MapPin, CheckCircle2, Shield, Sparkles } from 'lucide-react';

export const VolunteerApplyModal: React.FC = () => {
  const { 
    isVolunteerApplyModalOpen, 
    closeApplyModal, 
    activeApplyOpportunity, 
    submitApplication,
    currentUser 
  } = useApp();

  const [formData, setFormData] = useState({
    name: currentUser.name || 'Alex Rivera',
    email: currentUser.email || 'alex.rivera@community.org',
    phone: '(555) 234-5678',
    note: 'Excited to lend a hand and meet other community members!'
  });

  const [agreed, setAgreed] = useState(true);

  if (!isVolunteerApplyModalOpen || !activeApplyOpportunity) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    submitApplication(formData);
  };

  return (
    <div 
      id="volunteer-apply-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
    >
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 relative shrink-0">
          <button
            onClick={closeApplyModal}
            className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Volunteer Registration</span>
          </div>
          <h3 id="apply-modal-title" className="text-xl font-bold font-editorial line-clamp-2 pr-6">
            {activeApplyOpportunity.title}
          </h3>
          <p className="text-xs text-stone-300 mt-1 flex items-center gap-1">
            Organized by <strong className="text-white font-medium">{activeApplyOpportunity.organization}</strong>
          </p>
        </div>

        {/* Opportunity Quick Meta */}
        <div className="bg-stone-50 dark:bg-stone-850 p-4 border-b border-stone-200 dark:border-stone-800 grid grid-cols-2 gap-3 text-xs text-stone-600 dark:text-stone-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">{activeApplyOpportunity.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">{activeApplyOpportunity.timeCommitment}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">{activeApplyOpportunity.location}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
            <span>Remaining spots for this session:</span>
            <span className="font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
              {activeApplyOpportunity.spotsAvailable} open
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Note for the Organizer (Experience, dietary, or mobility needs)
            </label>
            <textarea
              rows={3}
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="Tell them briefly why you'd like to help or any questions you have..."
              className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="attendance-agreement"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="attendance-agreement" className="text-xs text-stone-600 dark:text-stone-400">
              I understand that organizations rely on committed volunteers. I will attend or notify them at least 24 hours in advance if unable to join.
            </label>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-200 dark:border-stone-800">
            <button
              type="button"
              onClick={closeApplyModal}
              className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!agreed}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wide transition-all shadow-md hover:shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Volunteer Registration</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
