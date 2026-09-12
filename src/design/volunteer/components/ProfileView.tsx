'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Award, 
  Clock, 
  Heart, 
  Bell, 
  Lock, 
  Plus, 
  X, 
  Save, 
  CheckCircle2, 
  Languages, 
  Briefcase,
  Settings as SettingsIcon
} from 'lucide-react';
import { VolunteerProfile } from '../types';

interface ProfileViewProps {
  profile: VolunteerProfile;
  onUpdateProfile: (updated: VolunteerProfile) => void;
  onNavigateToSettings?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onNavigateToSettings
}) => {
  const [formData, setFormData] = useState<VolunteerProfile>({ ...profile });
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
  const timeSlots = ['Morning (8am-12pm)', 'Afternoon (1pm-5pm)', 'Evening (5pm-9pm)'];

  const handleAddSkill = () => {
    if (!newSkill.trim() || formData.skills.includes(newSkill.trim())) return;
    setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
    setNewSkill('');
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const handleAddLanguage = () => {
    if (!newLanguage.trim() || formData.languages.includes(newLanguage.trim())) return;
    setFormData(prev => ({ ...prev, languages: [...prev.languages, newLanguage.trim()] }));
    setNewLanguage('');
  };

  const handleRemoveLanguage = (lang: string) => {
    setFormData(prev => ({ ...prev, languages: prev.languages.filter(l => l !== lang) }));
  };

  const toggleAvailabilitySlot = (day: typeof daysOfWeek[number], slot: string) => {
    setFormData(prev => {
      const current = prev.availability[day] || [];
      const updated = current.includes(slot)
        ? current.filter(s => s !== slot)
        : [...current, slot];
      return {
        ...prev,
        availability: {
          ...prev.availability,
          [day]: updated
        }
      };
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {saveToast && (
        <div className="bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between text-xs font-semibold animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span>Profile and availability preferences saved successfully!</span>
          </div>
          <button onClick={() => setSaveToast(false)} className="text-white/70 hover:text-white underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs tracking-wider uppercase mb-1">
              <User className="w-4 h-4" />
              <span>Section 3.16 • Volunteer Identity & Preferences</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Volunteer Profile & Settings</h1>
            <p className="text-sm text-slate-600 mt-1">
              Manage personal details, skills, language proficiencies, weekly shift availability, and privacy permissions.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {onNavigateToSettings && (
              <button
                type="button"
                onClick={onNavigateToSettings}
                className="px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Open system and device settings"
              >
                <SettingsIcon className="w-4 h-4 text-slate-500" />
                <span>System Settings</span>
              </button>
            )}
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs shadow-emerald-200"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card Summary & Basic Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Identity Left Column */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={formData.avatar}
                alt={formData.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-emerald-500/20 shadow-xs"
              />
              <div>
                <h3 className="text-base font-bold text-slate-900">{formData.name}</h3>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {formData.role}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">Member since {formData.joinDate}</span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Avatar Image URL:</label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Full Legal Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Email Address:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Phone Number:</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Location / City:</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Emergency Contact Person & Phone:</label>
                <input
                  type="text"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Bio & Skills Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">Volunteer Bio & Experience</h3>
              
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Personal Biography & Interests:
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Years of Active Volunteering:
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Preferred Volunteer Causes:
                  </label>
                  <input
                    type="text"
                    value={formData.preferredActivities.join(', ')}
                    onChange={(e) => setFormData({ ...formData, preferredActivities: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                    placeholder="Community Festivals, Food Packaging, Youth..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Skills & Languages */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Skills & Certifications</h3>
                <p className="text-xs text-slate-500 mb-3">
                  These tags help organizers match you to specialized roles (e.g. First Aid, Translation, Heavy Lifting).
                </p>

                {/* Skills chips */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-emerald-600 hover:text-emerald-900 focus:outline-none"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 max-w-sm">
                  <input
                    type="text"
                    placeholder="Add a new skill (e.g. Crowd Guidance)..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shrink-0"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Languages */}
              <div className="pt-3 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-slate-400" />
                  <span>Language Proficiencies:</span>
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {formData.languages.map((lang) => (
                    <span
                      key={lang}
                      className="bg-slate-100 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                    >
                      <span>{lang}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveLanguage(lang)}
                        className="text-slate-400 hover:text-slate-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 max-w-sm">
                  <input
                    type="text"
                    placeholder="Add language (e.g. Spanish - Fluent)..."
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLanguage())}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={handleAddLanguage}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shrink-0"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Availability Schedule Matrix */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Weekly Shift Availability Schedule</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click the time slots when you are generally available to attend volunteer shifts. Organizers use this to propose assignments.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                  <th className="pb-2 pl-2">Day of Week</th>
                  <th className="pb-2">Morning (8am-12pm)</th>
                  <th className="pb-2">Afternoon (1pm-5pm)</th>
                  <th className="pb-2">Evening (5pm-9pm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {daysOfWeek.map((day) => {
                  const daySlots = formData.availability[day] || [];
                  return (
                    <tr key={day} className="hover:bg-slate-50/60">
                      <td className="py-3 pl-2 font-bold capitalize text-slate-900">
                        {day}
                      </td>
                      {timeSlots.map((slot) => {
                        const isSelected = daySlots.includes(slot);
                        return (
                          <td key={slot} className="py-3">
                            <button
                              type="button"
                              onClick={() => toggleAvailabilitySlot(day, slot)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                isSelected
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                              }`}
                            >
                              {isSelected ? '✓ Available' : '+ Available'}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Privacy & Notification Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Privacy Controls */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-700" />
              <h3 className="text-base font-bold text-slate-900">Team Privacy Settings</h3>
            </div>
            <p className="text-xs text-slate-500">
              Control whether your contact details are shared with fellow volunteers in the Team module.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.shareContactWithTeam}
                  onChange={(e) => setFormData({ ...formData, shareContactWithTeam: e.target.checked })}
                  className="accent-emerald-600 mt-0.5"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Share phone and email with assigned team members
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    When unchecked, your contact details appear as "Hidden by volunteer request" to protect your personal privacy.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Notifications Preferences */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">Notification Channels</h3>
            </div>
            <p className="text-xs text-slate-500">
              Select which automated dispatch methods you prefer to receive.
            </p>

            <div className="space-y-2 text-xs text-slate-700">
              {[
                { key: 'email', label: 'Email Notifications (Receipts, Certificates, Hours verification)' },
                { key: 'sms', label: 'SMS Text Alerts (Shift check-in codes & location changes)' },
                { key: 'reminder24h', label: '24-Hour Automated Shift Reminders' },
                { key: 'urgentAlerts', label: 'Emergency Safety & Immediate Broadcasts' }
              ].map((notif) => (
                <label key={notif.key} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(formData.notificationPreferences as any)[notif.key]}
                    onChange={(e) => setFormData({
                      ...formData,
                      notificationPreferences: {
                        ...formData.notificationPreferences,
                        [notif.key]: e.target.checked
                      }
                    })}
                    className="accent-emerald-600"
                  />
                  <span>{notif.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-emerald-200 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save All Profile Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
