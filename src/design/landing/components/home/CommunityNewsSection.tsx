'use client';
// @ts-nocheck

import React from 'react';
import { useApp } from '../../context/AppContext';
import { CommunityNews } from '../../types';
import { Calendar, Clock, ArrowRight, User, Sparkles } from 'lucide-react';
import { handleImageError } from '../../utils/imageUtils';

export const CommunityNewsSection: React.FC = () => {
  const { newsArticles, setPage, setSelectedArticleId, t } = useApp();

  const handleArticleClick = (article: CommunityNews) => {
    setSelectedArticleId(article.id);
    setPage('news-article');
  };

  const featuredArticle = newsArticles.find(n => n.isFeatured) || newsArticles[0];
  const sideArticles = newsArticles.filter(n => n.id !== featuredArticle?.id).slice(0, 3);

  return (
    <section 
      id="community-news-section"
      className="py-16 sm:py-20 bg-white dark:bg-stone-900 border-t border-stone-200/80 dark:border-stone-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Frontline Dispatches</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-editorial text-stone-900 dark:text-stone-100 tracking-tight">
              {t.sections.communityNews}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm mt-1 max-w-xl">
              {t.sections.communityNewsSubtitle}
            </p>
          </div>

          <button
            onClick={() => setPage('news')}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors group self-start md:self-auto"
          >
            <span>{t.sections.viewAllNews}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Editorial Layout: Large Hero Story + 3 Side Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Hero News Card */}
          {featuredArticle && (
            <div 
              onClick={() => handleArticleClick(featuredArticle)}
              className="lg:col-span-7 rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850/60 group cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-72 sm:h-80 overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.headline}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e)}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-md">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 mb-2">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">
                      {featuredArticle.organization}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredArticle.publicationDate}
                    </span>
                    <span>•</span>
                    <span>{featuredArticle.readTime}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-editorial text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                    {featuredArticle.headline}
                  </h3>

                  <p className="mt-3 text-stone-600 dark:text-stone-300 text-sm leading-relaxed line-clamp-3">
                    {featuredArticle.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    <span>By {featuredArticle.author}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span>{t.sections.readMore}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 3 Secondary News Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {sideArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => handleArticleClick(article)}
                className="p-4 sm:p-5 rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850/60 hover:bg-white dark:hover:bg-stone-800 hover:shadow-md hover:border-emerald-500/40 cursor-pointer transition-all duration-200 flex flex-col sm:flex-row gap-4 group"
              >
                <div className="sm:w-36 h-32 sm:h-28 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0">
                  <img
                    src={article.imageUrl}
                    alt={article.headline}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageError(e)}
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 mb-1">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {article.category}
                      </span>
                      <span>•</span>
                      <span>{article.publicationDate}</span>
                    </div>

                    <h4 className="text-sm font-bold font-editorial text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                      {article.headline}
                    </h4>

                    <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-stone-400 pt-1">
                    <span>{article.organization}</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                      Read →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
