'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Clock, 
  Award, 
  Bookmark, 
  Heart, 
  Calendar, 
  CheckCircle2, 
  Edit3, 
  Save, 
  Sparkles, 
  MapPin, 
  Mail, 
  Phone,
  ArrowRight,
  ShieldCheck,
  Sprout,
  GraduationCap,
  HeartHandshake,
  LogIn,
  UserPlus,
  LogOut
} from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const { 
    currentUser, 
    setCurrentUser, 
    opportunities, 
    openApplyModal, 
    setPage, 
    toggleSaveOpportunity,
    isLoggedIn,
    login,
    logout,
    openAuthModal,
    addToast 
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'registered' | 'saved' | 'badges'>('registered');

  const [bioInput, setBioInput] = useState(currentUser?.bio || '');
  const [availabilityInput, setAvailabilityInput] = useState(currentUser?.availability || '');

  // Logged-out form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [authRole, setAuthRole] = useState<'volunteer' | 'organization'>('volunteer');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login('email', authRole, {
      name: signUpName.trim() || undefined,
      email: loginEmail.trim() || undefined
    });
  };

  const registeredIds = currentUser?.registeredOpportunityIds || currentUser?.upcomingActivityIds || [];
  const savedIds = currentUser?.savedOpportunityIds || [];
  const registeredOpps = opportunities.filter(o => registeredIds.includes(o.id));
  const savedOpps = opportunities.filter(o => savedIds.includes(o.id));

  const handleSaveProfile = () => {
    setCurrentUser({
      ...currentUser,
      bio: bioInput,
      availability: availabilityInput
    });
    setIsEditing(false);
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your volunteer bio and availability have been saved.'
    });
  };

  const renderBadgeIcon = (badge: any) => {
    if (badge.icon) return badge.icon;
    switch (badge.iconName) {
      case 'Award': return <Award className="w-8 h-8" />;
      case 'Sprout': return <Sprout className="w-8 h-8" />;
      case 'GraduationCap': return <GraduationCap className="w-8 h-8" />;
      case 'HeartHandshake': return <HeartHandshake className="w-8 h-8" />;
      default: return <Award className="w-8 h-8" />;
    }
  };

  // If user is not logged in, show the combined Login / Sign Up into the System view
  if (!isLoggedIn) {
    return (
      <div id="user-auth-gate-page" className="py-12 bg-stone-50 dark:bg-stone-950 min-h-screen transition-colors flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-8 text-white text-center">
            <div className="w-14 h-14 mx-auto mb-3 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-sm">
              <HeartHandshake className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-editorial">
              Log In / Sign Up
            </h1>
            <p className="text-emerald-100 text-xs mt-1.5 max-w-sm mx-auto">
              Access your volunteer profile, track impact hours, or create an account in one easy step.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            {/* Quick 1-Click Google Access */}
            <div>
              <button
                type="button"
                onClick={() => login('google', authRole)}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-750 text-stone-800 dark:text-stone-100 font-medium text-xs transition-all shadow-xs active:scale-[0.99]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-stone-200 dark:border-stone-800 w-full"></div>
              <span className="bg-white dark:bg-stone-900 px-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest absolute">
                Or continue with email
              </span>
            </div>

            {/* Role Picker */}
            <div>
              <label className="block text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                Account Role
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setAuthRole('volunteer')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    authRole === 'volunteer'
                      ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-500 font-semibold'
                      : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    Volunteer
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">Find & log hours</div>
                </button>

                <button
                  type="button"
                  onClick={() => setAuthRole('organization')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    authRole === 'organization'
                      ? 'border-teal-600 bg-teal-50/80 dark:bg-teal-950/50 text-teal-900 dark:text-teal-200 ring-1 ring-teal-500 font-semibold'
                      : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-teal-600" />
                    Organization
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">Post & manage</div>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                    Your Full Name
                  </label>
                  <span className="text-[10px] text-stone-400">Optional if returning</span>
                </div>
                <input
                  type="text"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <span>Continue to Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick 1-Click Fast Logins */}
            <div className="bg-stone-50 dark:bg-stone-800/70 rounded-2xl p-3.5 border border-stone-200 dark:border-stone-700 text-xs">
              <div className="font-semibold text-stone-600 dark:text-stone-300 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Quick Instant Test Logins:</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => login('email', 'volunteer', { name: 'Alex Rivera', email: 'alex.rivera@commonground.org' })}
                  className="p-2 rounded-xl bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 hover:border-emerald-500 text-left transition-colors"
                >
                  <div className="font-bold text-stone-900 dark:text-stone-100">Alex (Volunteer)</div>
                  <div className="text-[10px] text-stone-500">124 hrs logged</div>
                </button>
                <button
                  type="button"
                  onClick={() => login('email', 'organization', { name: 'Marcus Vance', email: 'marcus@greenroots.org' })}
                  className="p-2 rounded-xl bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 hover:border-teal-500 text-left transition-colors"
                >
                  <div className="font-bold text-stone-900 dark:text-stone-100">Marcus (Org)</div>
                  <div className="text-[10px] text-stone-500">CMS access</div>
                </button>
                <button
                  type="button"
                  onClick={() => login('email', 'admin', { name: 'Admin Coordinator', email: 'admin@commonground.org' })}
                  className="p-2 rounded-xl bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 hover:border-amber-500 text-left transition-colors col-span-2 sm:col-span-1"
                >
                  <div className="font-bold text-stone-900 dark:text-stone-100">Admin</div>
                  <div className="text-[10px] text-stone-500">Full system</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="user-profile-page" className="py-10 bg-stone-50 dark:bg-stone-950 min-h-screen transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card Header */}
        <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-emerald-500/30"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-emerald-600 text-white shadow-sm" title="Active Volunteer">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 dark:text-stone-100">
                    {currentUser.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                    Volunteer Steward
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 flex items-center gap-3">
                  <span>{currentUser.email}</span>
                  <span>•</span>
                  <span>Joined October 2024</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (isEditing) handleSaveProfile();
                  else setIsEditing(true);
                }}
                className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors flex items-center gap-2"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 text-emerald-600" />
                    <span>Save Changes</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>
              <button
                onClick={() => logout()}
                className="px-3.5 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold transition-colors flex items-center gap-1.5"
                title="Log out of system"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-stone-100 dark:border-stone-800">
            <div className="text-center sm:text-left">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 block font-sans">
                {currentUser.totalHoursLogged}
              </span>
              <span className="text-xs text-stone-500 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Hours Logged</span>
              </span>
            </div>

            <div className="text-center sm:text-left">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 block font-sans">
                {currentUser?.totalHoursLogged ?? currentUser?.volunteerHours ?? 0}
              </span>
              <span className="text-xs text-stone-500 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Hours Contributed</span>
              </span>
            </div>

            <div className="text-center sm:text-left">
              <span className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400 block font-sans">
                {registeredIds.length}
              </span>
              <span className="text-xs text-stone-500 font-medium flex items-center justify-center sm:justify-start gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Shifts Registered</span>
              </span>
            </div>

            <div className="text-center sm:text-left">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 block font-sans">
                {currentUser?.badges?.length || 0}
              </span>
              <span className="text-xs text-stone-500 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>Badges Earned</span>
              </span>
            </div>

            <div className="text-center sm:text-left">
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 block font-sans">
                {savedIds.length}
              </span>
              <span className="text-xs text-stone-500 font-medium flex items-center justify-center sm:justify-start gap-1">
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved Causes</span>
              </span>
            </div>
          </div>

          {/* Bio & Availability */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                About Me
              </h3>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              ) : (
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {currentUser?.bio}
                </p>
              )}
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                Availability & Scheduling
              </h3>
              {isEditing ? (
                <input
                  type="text"
                  value={availabilityInput}
                  onChange={(e) => setAvailabilityInput(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              ) : (
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-medium">
                  {currentUser?.availability || 'Flexible availability'}
                </p>
              )}

              {/* Skills & Causes */}
              <div className="mt-4">
                <span className="text-[11px] text-stone-400 block mb-1.5 font-semibold">
                  Skills & Endorsements:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(currentUser?.skills || []).map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-medium border border-emerald-200 dark:border-emerald-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6 border-b border-stone-200 dark:border-stone-800 pb-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('registered')}
            className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${
              activeTab === 'registered'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Registered Shifts ({registeredOpps.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${
              activeTab === 'saved'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Bookmarked Opportunities ({savedOpps.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('badges')}
            className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${
              activeTab === 'badges'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Impact Milestones ({currentUser?.badges?.length || 0})</span>
          </button>
        </div>

        {/* Tab 1: Registered Shifts */}
        {activeTab === 'registered' && (
          <div>
            {registeredOpps.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {registeredOpps.map(opp => (
                  <div
                    key={opp.id}
                    className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                        <span className="font-semibold text-emerald-600">{opp.organization}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                          Confirmed Registration
                        </span>
                      </div>
                      <h4 className="text-base font-bold font-editorial text-stone-900 dark:text-stone-100">
                        {opp.title}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1">
                        {opp.date} • {opp.timeCommitment} • {opp.location}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                      <span className="text-stone-400">Shift status: Confirmed</span>
                      <button
                        onClick={() => {
                          addToast({
                            type: 'info',
                            title: 'Calendar Sync',
                            message: `Added "${opp.title}" to your personal calendar.`
                          });
                        }}
                        className="text-emerald-600 font-semibold hover:underline"
                      >
                        Add to Calendar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-stone-300 mx-auto" />
                <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200">No shifts registered yet</h4>
                <p className="text-xs text-stone-500">Find an opportunity matching your skills and register in seconds.</p>
                <button
                  onClick={() => setPage('opportunities')}
                  className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
                >
                  Browse Opportunities
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Opportunities */}
        {activeTab === 'saved' && (
          <div>
            {savedOpps.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedOpps.map(opp => (
                  <div
                    key={opp.id}
                    className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                        <span className="font-semibold text-emerald-600">{opp.organization}</span>
                        <button
                          onClick={() => toggleSaveOpportunity(opp.id)}
                          className="text-stone-400 hover:text-rose-500 text-[11px]"
                        >
                          Remove
                        </button>
                      </div>
                      <h4 className="text-base font-bold font-editorial text-stone-900 dark:text-stone-100">
                        {opp.title}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                        {opp.shortDescription}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                      <span className="text-xs text-emerald-600 font-semibold">
                        {opp.spotsAvailable} spots left
                      </span>
                      <button
                        onClick={() => openApplyModal(opp)}
                        className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                      >
                        Volunteer Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                <Bookmark className="w-10 h-10 text-stone-300 mx-auto" />
                <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200">No saved opportunities</h4>
                <p className="text-xs text-stone-500">Tap the bookmark icon on any card to save it for later review.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Badges & Milestones */}
        {activeTab === 'badges' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {(currentUser?.badges || []).map(badge => (
              <div
                key={badge.id}
                className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col items-center text-center space-y-3"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-white flex items-center justify-center text-2xl shadow-md shadow-amber-500/20">
                  {renderBadgeIcon(badge)}
                </div>
                <div>
                  <h4 className="text-base font-bold font-editorial text-stone-900 dark:text-stone-100">
                    {badge.title || (badge as any).name}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Earned {badge.earnedDate || (badge as any).dateEarned || 'Recent'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
