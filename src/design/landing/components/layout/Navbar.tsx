'use client';
// @ts-nocheck

import React, { useState } from 'react';
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
  UserPlus
} from 'lucide-react';

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
    isDarkMode, 
    toggleDarkMode,
    language,
    setLanguage,
    t
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

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

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'zh', label: 'Mandarin Chinese', native: '中文' },
    { code: 'ms', label: 'Malay', native: 'Bahasa Melayu' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' }
  ];

  return (
    <header 
      id="main-header"
      className="sticky top-0 z-40 w-full bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
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

        {/* Desktop Navigation */}
        <nav 
          id="desktop-navigation"
          className="hidden xl:flex items-center gap-1 text-sm font-medium text-stone-600 dark:text-stone-300"
          aria-label="Main Navigation"
        >
          {navLinks.map((item) => {
            const isActive = page === item.id || 
              (item.id === 'news' && page === 'news-article') ||
              (item.id === 'gallery' && page === 'photo-story') ||
              (item.id === 'organizations' && page === 'organization-profile');

            return (
              <button
                key={item.id}
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

        {/* Right Action Icons & Auth */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Global Search Button */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="p-2.5 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Search platform (Opportunities, News, Events)"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => setIsNotificationsModalOpen(true)}
            className="relative p-2.5 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Push Notification Settings"
            aria-label="Push notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-stone-900"></span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="px-2.5 py-1.5 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              aria-label="Select language"
              aria-expanded={langDropdownOpen}
            >
              <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="uppercase tracking-wide">{language}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {langDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-52 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 p-1.5 z-50 text-xs animate-in fade-in"
              >
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 border-b border-stone-100 dark:border-stone-800 mb-1">
                  Languages
                </div>
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium flex items-center justify-between transition-colors ${
                      language === lang.code
                        ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 font-semibold'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-xs">{lang.label}</div>
                      <div className="text-[10px] text-stone-400">{lang.native}</div>
                    </div>
                    {language === lang.code && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile / Log In / Sign Up into System Area */}
          <div id="navbar-auth-profile-area" className="flex items-center">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors border border-stone-200 dark:border-stone-700 bg-white/50 dark:bg-stone-850/50"
                  aria-label="User profile and account menu"
                  aria-expanded={userDropdownOpen}
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-emerald-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 max-w-[110px] truncate leading-tight">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium capitalize">
                      {userRole}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 ml-0.5" />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 p-2 z-50 animate-in fade-in"
                  >
                    <div className="px-3.5 py-2.5 border-b border-stone-100 dark:border-stone-800">
                      <div className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">
                        {currentUser.name}
                      </div>
                      <div className="text-[11px] text-stone-500 truncate">{currentUser.email}</div>
                      <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Logged In ({userRole})
                      </div>
                    </div>

                    <div className="py-1 space-y-0.5 text-xs font-medium">
                      <button
                        onClick={() => handleNavClick('profile')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      >
                        <User className="w-4 h-4 text-emerald-600" />
                        <span>{t.nav.myProfile} (Hours & Badges)</span>
                      </button>

                      <button
                        onClick={() => handleNavClick('org-dashboard')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-teal-600" />
                        <span>{t.nav.orgDashboard} (CMS)</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          window.location.href = '/login';
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      >
                        <LogIn className="w-4 h-4 text-blue-600" />
                        <span>Switch Account / Re-login</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-stone-100 dark:border-stone-800">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
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
                onClick={() => { window.location.href = '/login'; }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold transition-all shadow-sm shadow-emerald-600/20"
                aria-label="Log in or sign up into the system"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t.nav.signInSignUp}</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
            aria-label="Open mobile navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer"
          className="xl:hidden bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200"
        >
          <div className="grid grid-cols-2 gap-1.5 pt-2">
            {navLinks.map((item) => {
              const isActive = page === item.id;
              return (
                <button
                  key={item.id}
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
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.location.href = '/login';
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
                  onClick={() => handleNavClick('profile')}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    {t.nav.myProfile} ({currentUser.name})
                  </span>
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    {userRole}
                  </span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
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
    </header>
  );
};
