'use client';
// @ts-nocheck

import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Bookmark, 
  HeartHandshake, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const NewsArticlePage: React.FC = () => {
  const { 
    selectedArticleId, 
    newsArticles, 
    setPage, 
    setSelectedArticleId, 
    addToast,
    opportunities,
    openApplyModal 
  } = useApp();

  const article = newsArticles.find(n => n.id === selectedArticleId) || newsArticles[0];
  const relatedArticles = newsArticles.filter(n => n.id !== article.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    addToast({
      type: 'info',
      title: 'Link Copied',
      message: 'Article link copied to your clipboard.'
    });
  };

  return (
    <article id="news-article-single" className="py-10 bg-white dark:bg-stone-900 min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation back */}
        <button
          onClick={() => setPage('news')}
          className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Community News</span>
        </button>

        {/* Category badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold">
            {article.category}
          </span>
          <button
            onClick={handleShare}
            className="p-2 rounded-xl text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1 text-xs font-medium"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share Story</span>
          </button>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-stone-900 dark:text-stone-100 leading-tight">
          {article.headline}
        </h1>

        {/* Author / Org Byline */}
        <div className="mt-6 pb-6 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
              {article.author.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-stone-900 dark:text-stone-100">{article.author}</div>
              <div className="text-[11px] text-stone-500">{article.organization}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              {article.publicationDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="my-8 rounded-3xl overflow-hidden shadow-lg border border-stone-200 dark:border-stone-800 max-h-[460px]">
          <img
            src={article.imageUrl}
            alt={article.headline}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Article Summary Lead */}
        <p className="text-lg sm:text-xl font-medium text-stone-700 dark:text-stone-200 leading-relaxed font-editorial border-l-4 border-emerald-500 pl-4 mb-8">
          {article.summary}
        </p>

        {/* Full Article Body */}
        <div className="prose prose-stone dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-4 text-stone-800 dark:text-stone-200">
          {article.content ? (
            <p className="whitespace-pre-line leading-loose">{article.content}</p>
          ) : (
            <>
              <p>
                Neighborhood-driven action continues to define the spirit of community service this season. Local organizers and dedicated volunteers gathered to deliver critical resources, establish sustainable community infrastructure, and ensure that no family is left behind.
              </p>
              <p>
                "When neighbors show up for neighbors, the entire fabric of our city transforms," noted project directors during Saturday's morning gathering. "It isn't just about the physical hours logged; it is about the quiet dignity, companionship, and long-term hope we build together."
              </p>
              <p>
                From clean energy initiatives to food security pantries and after-school math tutoring, collective volunteer efforts have reached over 1,200 households this quarter alone. Organizers encourage all community members to consider taking on an upcoming shift.
              </p>
            </>
          )}
        </div>

        {/* Related Call to Action Box */}
        <div className="my-12 p-6 sm:p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Turn Inspiration into Action
            </span>
            <h3 className="text-xl font-bold font-editorial text-stone-900 dark:text-stone-100">
              Ready to help create the next community story?
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 max-w-md">
              Sign up for a volunteer shift with local organizations leading initiatives like this today.
            </p>
          </div>

          <button
            onClick={() => setPage('opportunities')}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <span>Browse Open Volunteer Shifts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* More Community News */}
        <div className="pt-10 border-t border-stone-200 dark:border-stone-800">
          <h3 className="text-xl font-bold font-editorial text-stone-900 dark:text-stone-100 mb-6">
            Related Dispatches & News
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedArticles.map(rel => (
              <div
                key={rel.id}
                onClick={() => {
                  setSelectedArticleId(rel.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer rounded-2xl p-3 border border-stone-200 dark:border-stone-800 hover:border-amber-500 transition-all bg-stone-50/40 dark:bg-stone-850/40"
              >
                <div className="h-28 rounded-xl overflow-hidden mb-2 bg-stone-100 dark:bg-stone-800">
                  <img
                    src={rel.imageUrl}
                    alt={rel.headline}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] font-bold text-amber-600 uppercase">
                  {rel.category}
                </span>
                <h4 className="text-xs font-bold font-editorial text-stone-900 dark:text-stone-100 group-hover:text-amber-600 line-clamp-2 mt-1">
                  {rel.headline}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
