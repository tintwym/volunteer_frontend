'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';
import { HeartHandshake, Mail, CheckCircle2, ArrowRight, Heart, Sparkles, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setPage, t, addToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    addToast({
      type: 'success',
      title: 'Subscribed to Community News!',
      message: `We have sent a confirmation email to ${newsletterEmail}. Thank you for staying connected.`
    });
    setNewsletterEmail('');
  };

  return (
    <footer 
      id="main-footer"
      className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & Purpose Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <span className="font-editorial text-2xl font-bold text-white tracking-tight">
                CommonGround
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Connecting volunteers with grassroots non-profits, celebrating everyday changemakers, and building warm, connected neighborhoods through shared hands and open hearts.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-800/80 border border-stone-700 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified 501(c)(3) & community verified initiatives</span>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100 mb-4 font-sans">
              Engage & Discover
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => setPage('opportunities')} className="hover:text-white transition-colors">
                  Volunteer Opportunities
                </button>
              </li>
              <li>
                <button onClick={() => setPage('events')} className="hover:text-white transition-colors">
                  Upcoming Community Events
                </button>
              </li>
              <li>
                <button onClick={() => setPage('organizations')} className="hover:text-white transition-colors">
                  Nonprofit Directory
                </button>
              </li>
              <li>
                <button onClick={() => setPage('profile')} className="hover:text-white transition-colors">
                  Volunteer Profile & Account
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100 mb-4 font-sans">
              Editorial & Stories
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => setPage('news')} className="hover:text-white transition-colors">
                  Community News & Journal
                </button>
              </li>
              <li>
                <button onClick={() => setPage('gallery')} className="hover:text-white transition-colors">
                  Community in Action Photos
                </button>
              </li>
              <li>
                <button onClick={() => setPage('stories')} className="hover:text-white transition-colors">
                  Stories That Inspire
                </button>
              </li>
              <li>
                <button onClick={() => setPage('org-dashboard')} className="hover:text-white transition-colors text-teal-400 font-medium">
                  Organization CMS Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100 mb-4 font-sans flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Weekly Good News</span>
            </h4>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              Receive uplifting community updates, stories, and weekend volunteering calls right in your inbox.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>You are on the list! Welcome.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-stone-800 border border-stone-700 text-stone-100 placeholder:text-stone-500 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Subscribe to News</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for neighborhoods and communities worldwide. © 2026 CommonGround.</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Accessibility (WCAG AA)</span>
            <span>•</span>
            <span>Community Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
