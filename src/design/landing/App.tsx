'use client';
// @ts-nocheck

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { OrganizationsPage } from './pages/OrganizationsPage';
import { OrganizationProfilePage } from './pages/OrganizationProfilePage';
import { NewsPage } from './pages/NewsPage';
import { NewsArticlePage } from './pages/NewsArticlePage';
import { GalleryPage } from './pages/GalleryPage';
import { PhotoStoryPage } from './pages/PhotoStoryPage';
import { EventsPage } from './pages/EventsPage';
import { StoriesPage } from './pages/StoriesPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { OrgDashboardPage } from './pages/OrgDashboardPage';

// Modals
import { AuthModal } from './components/modals/AuthModal';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { VolunteerApplyModal } from './components/modals/VolunteerApplyModal';
import { LightboxModal } from './components/modals/LightboxModal';

// Icons
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div 
      id="toast-notifications-container"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      aria-live="polite"
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl transition-all duration-300 animate-in slide-in-from-bottom-3"
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-500" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-sky-500" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
              {toast.title}
            </h4>
            {toast.message && (
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

const AppShell: React.FC = () => {
  const { page } = useApp();

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage />;
      case 'opportunities':
        return <OpportunitiesPage />;
      case 'organizations':
        return <OrganizationsPage />;
      case 'organization-profile':
        return <OrganizationProfilePage />;
      case 'news':
        return <NewsPage />;
      case 'news-article':
        return <NewsArticlePage />;
      case 'gallery':
        return <GalleryPage />;
      case 'photo-story':
        return <PhotoStoryPage />;
      case 'events':
        return <EventsPage />;
      case 'stories':
        return <StoriesPage />;
      case 'profile':
        return <UserProfilePage />;
      case 'org-dashboard':
        return <OrgDashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans transition-colors">
      <Navbar />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />

      {/* Global Application Modals */}
      <AuthModal />
      <GlobalSearchModal />
      <NotificationsModal />
      <VolunteerApplyModal />
      <LightboxModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
