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
import { ToastContainer } from './components/ToastContainer';

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
