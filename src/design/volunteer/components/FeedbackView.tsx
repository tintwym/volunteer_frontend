'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { 
  MessageSquareHeart, 
  Star, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  UserCheck, 
  Clock, 
  Layers 
} from 'lucide-react';
import { EventFeedback } from '../types';

interface FeedbackViewProps {
  feedbackList: EventFeedback[];
  onSubmitFeedback: (fb: Omit<EventFeedback, 'id' | 'submittedDate'>) => void;
}

export const FeedbackView: React.FC<FeedbackViewProps> = ({
  feedbackList,
  onSubmitFeedback
}) => {
  const [eventId, setEventId] = useState('evt-101');
  const [eventTitle, setEventTitle] = useState('Community Festival 2026');
  const [ratings, setRatings] = useState({
    eventOrganisation: 5,
    teamLeader: 5,
    taskSuitability: 5,
    communication: 5,
    training: 5,
    venue: 4,
    schedule: 5,
    overallExperience: 5
  });
  const [comments, setComments] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [submittedToast, setSubmittedToast] = useState(false);

  const criteriaList = [
    { key: 'overallExperience', label: 'Overall Volunteer Experience' },
    { key: 'teamLeader', label: 'Team Leader Guidance & Support' },
    { key: 'eventOrganisation', label: 'Event Organisation & Coordination' },
    { key: 'taskSuitability', label: 'Task Suitability & Clarity' },
    { key: 'communication', label: 'Pre-Shift & On-Site Communication' },
    { key: 'training', label: 'Training & Orientation Readiness' },
    { key: 'venue', label: 'Venue Amenities, Break Room & Comfort' },
    { key: 'schedule', label: 'Shift Schedule & Pacing' },
  ];

  const handleRatingChange = (criterion: string, value: number) => {
    setRatings(prev => ({ ...prev, [criterion]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comments.trim()) return;

    onSubmitFeedback({
      eventId,
      eventTitle,
      ratings,
      comments: comments.trim(),
      suggestions: suggestions.trim()
    });

    setComments('');
    setSuggestions('');
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {submittedToast && (
        <div className="bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between text-xs font-semibold animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span>Thank you! Your post-event volunteer feedback has been recorded.</span>
          </div>
          <button onClick={() => setSubmittedToast(false)} className="text-white/70 hover:text-white underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs tracking-wider uppercase mb-1">
              <MessageSquareHeart className="w-4 h-4" />
              <span>Section 3.15 • Post-Event Feedback & Experience</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Submit Event Feedback</h1>
            <p className="text-sm text-slate-600 mt-1">
              Help non-profit organizers improve future volunteer shifts by rating organization, leadership, venue, and communication.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-right self-start sm:self-auto">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Submitted Reviews</span>
            <span className="text-lg font-bold text-slate-900">{feedbackList.length} Surveys Logged</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rating Submission Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-1">Post-Shift Evaluation Form</h2>
          <p className="text-xs text-slate-600 mb-5">
            Select 1 to 5 stars for each operational area.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Select Attended Event:</label>
              <select
                value={eventTitle}
                onChange={(e) => {
                  setEventTitle(e.target.value);
                  setEventId(e.target.value.includes('Festival') ? 'evt-101' : 'evt-102');
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="Community Festival 2026">Community Festival 2026 (Seattle Civic Events)</option>
                <option value="Weekend Fresh Food Pantry & Meal Packaging">Weekend Fresh Food Pantry & Meal Packaging (Cascadia Food)</option>
                <option value="Urban Canopy Reforestation & Tree Planting">Urban Canopy Reforestation & Tree Planting</option>
              </select>
            </div>

            {/* 8 Criteria Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {criteriaList.map((c) => {
                const currentVal = (ratings as any)[c.key] || 5;
                return (
                  <div key={c.key} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                    <span className="font-semibold text-slate-800 block text-xs truncate">
                      {c.label}
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(c.key, star)}
                          className="p-1 focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= currentVal
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-[11px] font-bold text-slate-700 ml-1.5 font-mono">
                        {currentVal} / 5
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Qualitative Comments */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Volunteer Experience Comments:
              </label>
              <textarea
                rows={3}
                placeholder="What went particularly well? How was the leadership and camaraderie on site?"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Suggestions for Next Event:
              </label>
              <textarea
                rows={2}
                placeholder="Any recommendations regarding tools, scheduling, breaks, or signage?"
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs shadow-emerald-200"
              >
                <Send className="w-4 h-4" />
                <span>Submit Evaluation</span>
              </button>
            </div>
          </form>
        </div>

        {/* Previous Feedback Archive */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900">Submitted Feedback Log</h2>
          <p className="text-xs text-slate-500">
            Records of past post-event reviews submitted under your volunteer profile.
          </p>

          <div className="space-y-4">
            {feedbackList.map((fb) => (
              <div key={fb.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 truncate max-w-[180px]">
                    {fb.eventTitle}
                  </span>
                  <span className="text-[11px] text-slate-400">{fb.submittedDate}</span>
                </div>

                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{fb.ratings.overallExperience} / 5 Overall</span>
                  <span className="text-slate-400 text-[10px] font-normal ml-2">
                    (Leader: {fb.ratings.teamLeader}/5)
                  </span>
                </div>

                <p className="text-slate-700 italic bg-white p-2.5 rounded-lg border border-slate-100">
                  "{fb.comments}"
                </p>

                {fb.suggestions && (
                  <p className="text-slate-500 text-[11px]">
                    <strong>Suggestion:</strong> {fb.suggestions}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
