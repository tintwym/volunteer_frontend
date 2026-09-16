'use client';
// @ts-nocheck

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CommunityNews } from '../types';
import { Search, Calendar, User, Clock, ArrowRight, Sparkles, Newspaper } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { newsArticles, setSelectedArticleId, setPage, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Community',
    'Environment',
    'Education',
    'Social Impact',
    'Charity',
    'Youth',
    'Local News',
    'Volunteer Updates'
  ];

  const filteredArticles = useMemo(() => {
    return newsArticles.filter(art => {
      if (selectedCategory !== 'All' && art.category !== selectedCategory) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          art.headline.toLowerCase().includes(q) ||
          art.summary.toLowerCase().includes(q) ||
          art.author.toLowerCase().includes(q) ||
          art.organization.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [newsArticles, selectedCategory, searchTerm]);

  const handleReadArticle = (article: CommunityNews) => {
    setSelectedArticleId(article.id);
    setPage('news-article');
  };

  return (
    <div id="news-index-page" className="py-10 bg-stone-50 dark:bg-stone-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-2">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Community Journal & Dispatches</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-stone-900 dark:text-stone-100 tracking-tight">
            Community News & Field Reports
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-2 leading-relaxed">
            Direct dispatches, project milestones, volunteer triumphs, and grassroots perspectives from across neighborhoods.
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-xs mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600 dark:text-amber-400"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search news, topics, authors..."
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 py-2 pl-10 pr-3 text-xs text-stone-900 outline-none focus:ring-2 focus:ring-amber-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder:text-stone-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs py-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => handleReadArticle(article)}
              className="rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-500/40 cursor-pointer transition-all duration-300 flex flex-col group"
            >
              {/* Featured Image */}
              <div className="relative h-48 overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={article.imageUrl}
                  alt={article.headline}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-stone-900/85 backdrop-blur-md text-white text-[10px] font-semibold">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-1.5">
                    <span className="font-semibold text-stone-700 dark:text-stone-300 truncate">
                      {article.organization}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.publicationDate}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-editorial text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                    {article.headline}
                  </h3>

                  <p className="mt-2 text-xs text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                    <User className="w-3.5 h-3.5 text-amber-600" />
                    <span>{article.author}</span>
                  </div>

                  <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
