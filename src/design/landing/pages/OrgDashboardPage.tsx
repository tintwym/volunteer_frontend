'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Users, 
  Newspaper, 
  Camera, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Sparkles,
  Calendar,
  Building2,
  Trash2,
  Check
} from 'lucide-react';

export const OrgDashboardPage: React.FC = () => {
  const { 
    opportunities, 
    addOpportunity, 
    newsArticles, 
    addNewsArticle, 
    photos, 
    addPhoto,
    applications,
    organizations,
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'opportunities' | 'applications' | 'news' | 'photos'>('opportunities');

  // New Opportunity Form state
  const [showNewOppForm, setShowNewOppForm] = useState(false);
  const [oppFormData, setOppFormData] = useState({
    title: '',
    cause: 'Environment',
    shortDescription: '',
    fullDescription: '',
    location: 'Greenway Urban Farm, Plot 4',
    date: 'Saturday, June 14, 2026',
    timeCommitment: '3 hours',
    spotsAvailable: 8,
    isRemote: false,
    skillsRequired: 'Gardening, Teamwork',
    imageUrl: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=800&auto=format&fit=crop&q=80'
  });

  // New News Form state
  const [showNewNewsForm, setShowNewNewsForm] = useState(false);
  const [newsFormData, setNewsFormData] = useState({
    headline: '',
    category: 'Community',
    summary: '',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    readTime: '3 min read'
  });

  // Handle Opportunity submission
  const handleCreateOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oppFormData.title.trim()) return;

    addOpportunity({
      title: oppFormData.title,
      organization: 'Greenway Urban Agriculture',
      organizationId: 'org-1',
      orgLogo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&auto=format&fit=crop&q=80',
      location: oppFormData.location,
      date: oppFormData.date,
      timeCommitment: oppFormData.timeCommitment,
      cause: oppFormData.cause,
      spotsAvailable: Number(oppFormData.spotsAvailable),
      totalSpots: Number(oppFormData.spotsAvailable),
      shortDescription: oppFormData.shortDescription,
      fullDescription: oppFormData.fullDescription || oppFormData.shortDescription,
      imageUrl: oppFormData.imageUrl,
      skillsRequired: oppFormData.skillsRequired.split(',').map(s => s.trim()).filter(Boolean),
      isRemote: oppFormData.isRemote,
      urgency: 'normal'
    });

    setShowNewOppForm(false);
    setOppFormData({
      title: '',
      cause: 'Environment',
      shortDescription: '',
      fullDescription: '',
      location: 'Greenway Urban Farm, Plot 4',
      date: 'Saturday, June 14, 2026',
      timeCommitment: '3 hours',
      spotsAvailable: 8,
      isRemote: false,
      skillsRequired: 'Gardening, Teamwork',
      imageUrl: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=800&auto=format&fit=crop&q=80'
    });
  };

  // Handle News submission
  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsFormData.headline.trim()) return;

    addNewsArticle({
      headline: newsFormData.headline,
      category: newsFormData.category,
      summary: newsFormData.summary,
      content: newsFormData.content,
      imageUrl: newsFormData.imageUrl,
      readTime: newsFormData.readTime,
      organization: 'Greenway Urban Agriculture',
      author: 'Elena Rostova (Program Director)'
    });

    setShowNewNewsForm(false);
    setNewsFormData({
      headline: '',
      category: 'Community',
      summary: '',
      content: '',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
      readTime: '3 min read'
    });
  };

  return (
    <div id="org-dashboard-page" className="py-10 bg-stone-50 dark:bg-stone-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-semibold mb-2">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Organizer Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-stone-900 dark:text-stone-100 tracking-tight">
              Organization CMS Dashboard
            </h1>
            <p className="text-stone-600 dark:text-stone-400 text-sm mt-1">
              Publish shifts, review volunteer registrations, publish community journal updates, and upload action photos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300">
              Active Organization: Greenway Urban Agriculture
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-stone-200 dark:border-stone-800 pb-2 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'opportunities'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Manage Shifts ({opportunities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'applications'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Volunteer Applicants ({(applications || []).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'news'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>Publish News ({newsArticles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'photos'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Photo Archive ({photos.length})</span>
          </button>
        </div>

        {/* TAB 1: Opportunities Management */}
        {activeTab === 'opportunities' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-editorial text-stone-900 dark:text-stone-100">
                Active Volunteer Opportunities
              </h2>
              <button
                onClick={() => setShowNewOppForm(!showNewOppForm)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{showNewOppForm ? 'Cancel Creation' : 'Post New Volunteer Shift'}</span>
              </button>
            </div>

            {/* Opportunity Creation Form Drawer */}
            {showNewOppForm && (
              <form onSubmit={handleCreateOpportunity} className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-teal-500/40 shadow-xl space-y-4 animate-in fade-in">
                <h3 className="text-base font-bold font-editorial text-stone-900 dark:text-stone-100">
                  Create New Volunteer Opportunity
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">Opportunity Title *</label>
                    <input
                      type="text"
                      required
                      value={oppFormData.title}
                      onChange={(e) => setOppFormData({ ...oppFormData, title: e.target.value })}
                      placeholder="e.g. Saturday Community Tree Nursery Day"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">Cause / Focus Area</label>
                    <select
                      value={oppFormData.cause}
                      onChange={(e) => setOppFormData({ ...oppFormData, cause: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none"
                    >
                      <option value="Environment">Environment</option>
                      <option value="Education">Education</option>
                      <option value="Social Impact">Social Impact</option>
                      <option value="Community">Community</option>
                      <option value="Charity">Charity</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">Date & Time</label>
                    <input
                      type="text"
                      value={oppFormData.date}
                      onChange={(e) => setOppFormData({ ...oppFormData, date: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">Time Commitment</label>
                    <input
                      type="text"
                      value={oppFormData.timeCommitment}
                      onChange={(e) => setOppFormData({ ...oppFormData, timeCommitment: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">Open Volunteer Spots</label>
                    <input
                      type="number"
                      min={1}
                      value={oppFormData.spotsAvailable}
                      onChange={(e) => setOppFormData({ ...oppFormData, spotsAvailable: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">Short Description (for card)</label>
                  <textarea
                    rows={2}
                    required
                    value={oppFormData.shortDescription}
                    onChange={(e) => setOppFormData({ ...oppFormData, shortDescription: e.target.value })}
                    placeholder="Briefly state the goal and key actions..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewOppForm(false)}
                    className="px-4 py-2 text-xs text-stone-500 hover:text-stone-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold"
                  >
                    Publish Opportunity
                  </button>
                </div>
              </form>
            )}

            {/* Opportunities List */}
            <div className="space-y-3">
              {opportunities.map(opp => (
                <div
                  key={opp.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={opp.imageUrl}
                      alt={opp.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">{opp.title}</h4>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-semibold">
                          {opp.spotsAvailable} spots remaining
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {opp.date} • {opp.timeCommitment} • {opp.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-stone-400">Status: Active</span>
                    <span className="px-3 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">
                      {opp.cause}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Applications Review */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-editorial text-stone-900 dark:text-stone-100">
              Registered Volunteer Applicants
            </h2>

            {(applications || []).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(applications || []).map(app => (
                  <div
                    key={app.id}
                    className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                          {app.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">{app.name}</h4>
                          <span className="text-[11px] text-stone-400">{app.email} • {app.phone}</span>
                        </div>
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                        {app.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-850 text-xs text-stone-700 dark:text-stone-300">
                      <span className="font-semibold block mb-0.5 text-[11px] text-stone-400">Shift:</span>
                      {app.opportunityTitle}
                    </div>

                    {app.note && (
                      <p className="text-xs text-stone-600 dark:text-stone-400 italic">
                        "{app.note}"
                      </p>
                    )}

                    <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center text-[11px] text-stone-400">
                      <span>Submitted: {new Date(app.submittedAt).toLocaleDateString()}</span>
                      <button
                        onClick={() => {
                          addToast({
                            type: 'info',
                            title: 'Confirmation Email Dispatched',
                            message: `Organizer welcome packet re-sent to ${app.email}`
                          });
                        }}
                        className="text-emerald-600 font-semibold hover:underline"
                      >
                        Contact Volunteer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 text-center rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-500">
                No active volunteer applications awaiting review.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Publish Community News */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-editorial text-stone-900 dark:text-stone-100">
                Published Community Dispatches
              </h2>
              <button
                onClick={() => setShowNewNewsForm(!showNewNewsForm)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{showNewNewsForm ? 'Cancel Creation' : 'Publish New Field Story'}</span>
              </button>
            </div>

            {showNewNewsForm && (
              <form onSubmit={handleCreateNews} className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-500/40 shadow-xl space-y-4 animate-in fade-in">
                <h3 className="text-base font-bold font-editorial text-stone-900 dark:text-stone-100">
                  Publish Community News Story
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">Headline *</label>
                  <input
                    type="text"
                    required
                    value={newsFormData.headline}
                    onChange={(e) => setNewsFormData({ ...newsFormData, headline: e.target.value })}
                    placeholder="e.g. Over 500 Native Trees Planted along Wetland Corridor"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">Category</label>
                    <select
                      value={newsFormData.category}
                      onChange={(e) => setNewsFormData({ ...newsFormData, category: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none"
                    >
                      <option value="Environment">Environment</option>
                      <option value="Community">Community</option>
                      <option value="Youth">Youth</option>
                      <option value="Social Impact">Social Impact</option>
                      <option value="Volunteer Updates">Volunteer Updates</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">Read Time Estimate</label>
                    <input
                      type="text"
                      value={newsFormData.readTime}
                      onChange={(e) => setNewsFormData({ ...newsFormData, readTime: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">Summary / Lead Paragraph *</label>
                  <textarea
                    rows={2}
                    required
                    value={newsFormData.summary}
                    onChange={(e) => setNewsFormData({ ...newsFormData, summary: e.target.value })}
                    placeholder="Short overview shown in cards..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">Full Article Narrative</label>
                  <textarea
                    rows={4}
                    value={newsFormData.content}
                    onChange={(e) => setNewsFormData({ ...newsFormData, content: e.target.value })}
                    placeholder="In-depth story, quotes, volunteer contributions..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewNewsForm(false)}
                    className="px-4 py-2 text-xs text-stone-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm"
                  >
                    Publish Article to News
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {newsArticles.map(art => (
                <div
                  key={art.id}
                  className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={art.imageUrl}
                      alt={art.headline}
                      className="w-12 h-12 rounded-xl object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 line-clamp-1">{art.headline}</h4>
                      <p className="text-xs text-stone-500">{art.category} • Published {art.publicationDate}</p>
                    </div>
                  </div>

                  <span className="text-xs text-stone-400">{art.readTime}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Photos Archive */}
        {activeTab === 'photos' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-editorial text-stone-900 dark:text-stone-100">
              Community in Action Photos
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {photos.map(p => (
                <div key={p.id} className="rounded-xl overflow-hidden aspect-square relative group bg-stone-800">
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end text-white text-[10px]">
                    <span className="font-semibold">{p.title}</span>
                    <span className="text-stone-300">{p.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
