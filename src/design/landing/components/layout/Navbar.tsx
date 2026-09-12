'use client';
// @ts-nocheck

import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageView, Language } from '../../types';
import {
  HeartHandshake,
  Search,
  Bell,
  Sun,
  Moon, 
  Globe, 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard,
  ChevronDown,
  LogIn,
  ExternalLink,
  Monitor,
} from 'lucide-react';
import { clearAuth, dashboardPathForRole, enterDemo } from '@/lib/auth';
import { useAuth } from '@/components/auth/AuthProvider';
import { useTheme } from '@/components/theme/ThemeProvider';
import { SignOutConfirmModal } from '../modals/SignOutConfirmModal';

export const Navbar: React.FC = () => {
  const {
    page,
    setPage,
    isLoggedIn,
    currentUser,
    userRole,
    logout,
    setIsSearchModalOpen, 
    setIsNotificationsModalOpen,
    language,
    setLanguage,
    t,
    openAuthModal,
    switchAccount,
  } = useApp();
  const { logout: logoutAuth } = useAuth();
  const { theme, cycleThemePreference, isDark } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [signOutConfirmOpen, setSignOutConfirmOpen] = useState(false);
  const userMenuRef = useRef(null);
  const langMenuRef = useRef(null);

  const displayName = currentUser?.name || currentUser?.fullName || 'Member';
  const displayEmail = currentUser?.email || '';

  useEffect(() => {
    function handlePointerDown(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const navLinks: { id: PageView; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'opportunities', label: t.nav.volunteer },
    { id: 'organizations', label: t.nav.organizations },
    { id: 'news', label: t.nav.news },
    { id: 'gallery', label: t.nav.photos },
    { id: 'events', label: t.nav.events },
    { id: 'stories', label: t.nav.stories },
  ];

  const handleNavClick = (targetPage: PageView) => {
    setPage(targetPage);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const openRoleWorkspace = () => {
    const role =
      userRole === 'organization'
        ? 'ORGANIZER'
        : userRole === 'admin'
          ? 'VOLUNTEER_LEADER'
          : 'VOLUNTEER';
    enterDemo(role);
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    window.open(dashboardPathForRole(role), '_blank', 'noopener,noreferrer');
  };

  const requestSignOut = () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    setSignOutConfirmOpen(true);
  };

  const confirmSignOut = () => {
    setSignOutConfirmOpen(false);
    logout();
    logoutAuth();
    clearAuth();
  };

  const handleSwitchAccount = () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    // Clear JWT/demo session first so /login AuthCard won't bounce back to a portal
    logoutAuth();
    clearAuth();
    switchAccount();
  };

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'zh', label: 'Mandarin Chinese', native: '中文' },
    { code: 'ms', label: 'Malay', native: 'Bahasa Melayu' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  ];

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 w-full bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
          aria-label="CommonGround Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <span className="font-editorial text-xl font-black tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-1">
              CommonGround
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mb-1"></span>
            </span>
            <span className="block text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase">
              Volunteer & Community
            </span>
          </div>
        </button>

        <nav
          id="desktop-navigation"
          className="hidden xl:flex items-center gap-1 text-sm font-medium text-stone-600 dark:text-stone-300"
          aria-label="Main Navigation"
        >
          {navLinks.map((item) => {
            const isActive =
              page === item.id ||
              (item.id === 'news' && page === 'news-article') ||
              (item.id === 'gallery' && page === 'photo-story') ||
              (item.id === 'organizations' && page === 'organization-profile');

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50/80 dark:bg-emerald-950/40'
                    : 'hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100/70 dark:hover:bg-stone-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => setIsSearchModalOpen(true)}
            className="p-2.5 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Search platform (Opportunities, News, Events)"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setIsNotificationsModalOpen(true)}
            className="relative p-2.5 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Push Notification Settings"
            aria-label="Push notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-stone-900"></span>
          </button>

          <button
            type="button"
            onClick={cycleThemePreference}
            className="p-2.5 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title={
              theme === 'system'
                ? 'Theme: System (click for Light)'
                : theme === 'light'
                  ? 'Theme: Light (click for Dark)'
                  : 'Theme: Dark (click for System)'
            }
            aria-label={`Color theme: ${theme}. Click to change.`}
          >
            {theme === 'system' ? (
              <Monitor className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            ) : isDark ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <div className="relative" ref={langMenuRef}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setUserDropdownOpen(false);
                setLangDropdownOpen((open) => !open);
              }}
              className="px-2.5 py-1.5 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              aria-label="Select language"
              aria-expanded={langDropdownOpen}
            >
              <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="uppercase tracking-wide">{language}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 p-1.5 z-[60]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-left text-xs hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-stone-800 dark:text-stone-100">{lang.label}</div>
                      <div className="text-[10px] text-stone-400">{lang.native}</div>
                    </div>
                    {language === lang.code && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div id="navbar-auth-profile-area" className="flex items-center">
            {isLoggedIn ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLangDropdownOpen(false);
                    setUserDropdownOpen((open) => !open);
                  }}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors border border-stone-200 dark:border-stone-700 bg-white/50 dark:bg-stone-850/50"
                  aria-label="User profile and account menu"
                  aria-expanded={userDropdownOpen}
                  aria-haspopup="menu"
                >
                  <img
                    src={currentUser.avatar}
                    alt={displayName}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-emerald-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 max-w-[110px] truncate leading-tight">
                      {String(displayName).split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium capitalize">
                      {userRole}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-stone-400 ml-0.5 transition-transform ${
                      userDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {userDropdownOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 p-2 z-[60]"
                  >
                    <div className="px-3.5 py-2.5 border-b border-stone-100 dark:border-stone-800">
                      <div className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">
                        {displayName}
                      </div>
                      <div className="text-[11px] text-stone-500 truncate">{displayEmail}</div>
                      <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Logged In ({userRole})
                      </div>
                    </div>

                    <div className="py-1 space-y-0.5 text-xs font-medium">
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => handleNavClick('profile')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      >
                        <User className="w-4 h-4 text-emerald-600" />
                        <span>{t.nav.myProfile} (Hours & Badges)</span>
                      </button>

                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => handleNavClick('org-dashboard')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-teal-600" />
                        <span>{t.nav.orgDashboard} (CMS)</span>
                      </button>

                      <button
                        type="button"
                        role="menuitem"
                        onClick={openRoleWorkspace}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-indigo-600" />
                        <span>Open Role Workspace</span>
                      </button>

                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleSwitchAccount}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      >
                        <LogIn className="w-4 h-4 text-blue-600" />
                        <span>Switch Account / Re-login</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-stone-100 dark:border-stone-800">
                      <button
                        type="button"
                        role="menuitem"
                        onClick={requestSignOut}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-medium transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t.nav.signOut}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="navbar-auth-btn"
                type="button"
                onClick={() => openAuthModal('signin')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold transition-all shadow-sm shadow-emerald-600/20"
                aria-label="Log in or sign up into the system"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t.nav.signInSignUp}</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
            aria-label="Open mobile navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="xl:hidden bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 pt-2 pb-6 space-y-2"
        >
          <div className="grid grid-cols-2 gap-1.5 pt-2">
            {navLinks.map((item) => {
              const isActive = page === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                      : 'bg-stone-50 dark:bg-stone-850 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleNavClick('org-dashboard')}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Organization CMS Dashboard</span>
            </button>

            {!isLoggedIn ? (
              <div className="pt-1">
                <button
                  id="mobile-navbar-auth-btn"
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('signin');
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold text-center shadow-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{t.nav.signInSignUp}</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleNavClick('profile')}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    {t.nav.myProfile} ({displayName})
                  </span>
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    {userRole}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={openRoleWorkspace}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-200 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Role Workspace</span>
                </button>
                <button
                  type="button"
                  onClick={requestSignOut}
                  className="w-full py-2.5 px-4 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-medium flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.nav.signOut}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <SignOutConfirmModal
        open={signOutConfirmOpen}
        onCancel={() => setSignOutConfirmOpen(false)}
        onConfirm={confirmSignOut}
      />
    </header>
  );
};
