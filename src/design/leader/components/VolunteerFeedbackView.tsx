'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Star,
  Plus,
  Clock,
  CheckCircle2,
  Award,
  Sparkles,
  MessageSquare,
  User,
  X,
  Check,
  ShieldCheck,
  Search
} from 'lucide-react';
import { VolunteerFeedbackRecord, Volunteer, FeedbackRecommendation } from '../types';

interface VolunteerFeedbackViewProps {
  feedbacks: VolunteerFeedbackRecord[];
  volunteers: Volunteer[];
  onSubmitFeedback: (record: Omit<VolunteerFeedbackRecord, 'id' | 'date' | 'leaderName'>) => void;
}

export const VolunteerFeedbackView: React.FC<VolunteerFeedbackViewProps> = ({
  feedbacks,
  volunteers,
  onSubmitFeedback
}) => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [selectedVolunteerId, setSelectedVolunteerId] = useState(volunteers[0]?.id || '');
  const [ratings, setRatings] = useState({
    attendance: 5,
    reliability: 5,
    teamwork: 5,
    communication: 5,
    taskPerformance: 5,
    leadership: 4,
    professionalism: 5
  });
  const [comments, setComments] = useState('');
  const [recommendation, setRecommendation] = useState<FeedbackRecommendation>('Exceeds Expectations');

  const handleRatingChange = (key: keyof typeof ratings, val: number) => {
    setRatings(prev => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vol = volunteers.find(v => v.id === selectedVolunteerId);
    if (!vol) return;

    onSubmitFeedback({
      volunteerId: vol.id,
      volunteerName: vol.name,
      ratings,
      comments,
      recommendation
    });

    setShowModal(false);
    setComments('');
  };

  const filteredFeedbacks = feedbacks.filter(f =>
    f.volunteerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Volunteer Performance Feedback</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
              Leader-to-Organiser Evaluations
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Supervise, assess, and recommend volunteers across 7 core operational dimensions: Attendance, Reliability, Teamwork, Communication, Task Performance, Leadership, and Professionalism.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Volunteer Evaluation</span>
        </button>
      </div>

      {/* 7 Dimensions Highlight Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
          7-Dimension Operational Appraisal Framework:
        </span>
        <div className="flex flex-wrap gap-2 text-slate-700">
          <span className="px-2 py-1 bg-white border border-slate-200 rounded-md font-semibold">1. Attendance</span>
          <span className="px-2 py-1 bg-white border border-slate-200 rounded-md font-semibold">2. Reliability</span>
          <span className="px-2 py-1 bg-white border border-slate-200 rounded-md font-semibold">3. Teamwork</span>
          <span className="px-2 py-1 bg-white border border-slate-200 rounded-md font-semibold">4. Communication</span>
          <span className="px-2 py-1 bg-white border border-slate-200 rounded-md font-semibold">5. Task Performance</span>
          <span className="px-2 py-1 bg-white border border-slate-200 rounded-md font-semibold">6. Leadership Potential</span>
          <span className="px-2 py-1 bg-white border border-slate-200 rounded-md font-semibold">7. Professionalism</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter feedback by volunteer name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none shadow-xs"
        />
      </div>

      {/* Feedbacks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFeedbacks.map((fb) => {
          const avgScore = (
            (fb.ratings.attendance +
              fb.ratings.reliability +
              fb.ratings.teamwork +
              fb.ratings.communication +
              fb.ratings.taskPerformance +
              fb.ratings.leadership +
              fb.ratings.professionalism) /
            7
          ).toFixed(1);

          return (
            <div
              key={fb.id}
              className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{fb.volunteerName}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-purple-100 text-purple-800">
                      {fb.recommendation}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Evaluated on {fb.date} by {fb.leaderName}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{avgScore} / 5.0</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Composite Score</span>
                </div>
              </div>

              {/* 7 Dimensions Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {Object.entries(fb.ratings).map(([key, val]) => (
                  <div key={key} className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 capitalize block truncate">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="font-bold text-slate-900 text-xs mt-0.5 block">{val} / 5</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900 block mb-1">Leader Evaluation Notes:</strong>
                "{fb.comments}"
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Evaluation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Volunteer Performance Appraisal</h3>
                <p className="text-xs text-slate-500 mt-0.5">Leader evaluation submitted to Lead Organiser</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Volunteer Member *</label>
                <select
                  value={selectedVolunteerId}
                  onChange={(e) => setSelectedVolunteerId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                >
                  {volunteers.map(v => (
                    <option key={v.id} value={v.id}>{v.name} ({v.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Operational Recommendation *</label>
                <select
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value as FeedbackRecommendation)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                >
                  <option value="Recommend for Team Lead">Recommend for Team Lead (Promotion)</option>
                  <option value="Exceeds Expectations">Exceeds Expectations</option>
                  <option value="Consistent Contributor">Consistent Contributor</option>
                  <option value="Needs Coaching">Needs Coaching</option>
                  <option value="Not Recommended">Not Recommended</option>
                </select>
              </div>

              {/* 7 Star Sliders */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-800 block">7 Core Dimension Ratings (1 - 5):</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'attendance', label: 'Attendance' },
                    { key: 'reliability', label: 'Reliability' },
                    { key: 'teamwork', label: 'Teamwork' },
                    { key: 'communication', label: 'Communication' },
                    { key: 'taskPerformance', label: 'Task Performance' },
                    { key: 'leadership', label: 'Leadership Potential' },
                    { key: 'professionalism', label: 'Professionalism' }
                  ].map((dim) => (
                    <div key={dim.key} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="font-medium text-slate-700">{dim.label}</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => handleRatingChange(dim.key as keyof typeof ratings, star)}
                            className="p-0.5 cursor-pointer"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                star <= ratings[dim.key as keyof typeof ratings]
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Qualitative Feedback & Comments *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Specific observations, strengths demonstrated during shift, areas for growth..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Submit to Organiser
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
