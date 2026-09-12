'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bell, Shield, Smartphone, Send, Check } from 'lucide-react';

export const NotificationsModal: React.FC = () => {
  const { 
    isNotificationsModalOpen, 
    setIsNotificationsModalOpen, 
    currentUser, 
    updateNotificationSettings,
    addToast 
  } = useApp();

  const [settings, setSettings] = useState(currentUser.notificationSettings);
  const [testingStatus, setTestingStatus] = useState<'idle' | 'sent'>('idle');

  if (!isNotificationsModalOpen) return null;

  const handleToggle = (key: keyof typeof settings) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    updateNotificationSettings(updated);
  };

  const handleTestPush = async () => {
    setTestingStatus('sent');
    
    // Check browser notification permission if available
    if ('Notification' in window && Notification.permission !== 'granted') {
      try {
        await Notification.requestPermission();
      } catch {
        // fallback
      }
    }

    // Trigger in-app native notification or simulated push alert
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('CommonGround Push Notification', {
          body: '🌱 New volunteer shift matching your skills: "Weekend Urban Farm Caregiver" needs 3 volunteers!',
          icon: '/favicon.svg'
        });
      } catch {
        // fallback
      }
    }

    addToast({
      type: 'info',
      title: 'Push Notification Triggered',
      message: '🌱 [Push Alert] "Weekend Urban Farm Caregiver" has 3 open spots nearby. Tap to apply!'
    });

    setTimeout(() => setTestingStatus('idle'), 3000);
  };

  return (
    <div 
      id="notifications-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notifications-title"
    >
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 id="notifications-title" className="text-base font-bold text-stone-900 dark:text-stone-100 font-editorial">
                Push Notification Settings
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Configure real-time community alerts and updates
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsNotificationsModalOpen(false)}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3">
            <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 dark:text-emerald-200">
              <span className="font-semibold block mb-0.5">Real-Time Community Alerts</span>
              Receive instant updates when emergency supply requests arise or when volunteer spots open in your neighborhood.
            </div>
          </div>

          <div className="space-y-3 divide-y divide-stone-100 dark:divide-stone-800 text-sm">
            <div className="flex items-center justify-between pt-2">
              <div>
                <div className="font-medium text-stone-800 dark:text-stone-200">Desktop / Device Push</div>
                <div className="text-xs text-stone-500">Live notifications for your saved causes</div>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('pushEnabled')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.pushEnabled ? 'bg-emerald-600' : 'bg-stone-300 dark:bg-stone-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.pushEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <div className="font-medium text-stone-800 dark:text-stone-200">New Opportunity Alerts</div>
                <div className="text-xs text-stone-500">When shifts matching your skills are posted</div>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('opportunityAlerts')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.opportunityAlerts ? 'bg-emerald-600' : 'bg-stone-300 dark:bg-stone-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.opportunityAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <div className="font-medium text-stone-800 dark:text-stone-200">Event & Shift Reminders</div>
                <div className="text-xs text-stone-500">24-hour reminder before registered activities</div>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('eventReminders')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.eventReminders ? 'bg-emerald-600' : 'bg-stone-300 dark:bg-stone-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.eventReminders ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <div className="font-medium text-stone-800 dark:text-stone-200">Weekly Community Digest</div>
                <div className="text-xs text-stone-500">Curated impact stats and uplifting stories</div>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('impactDigest')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.impactDigest ? 'bg-emerald-600' : 'bg-stone-300 dark:bg-stone-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.impactDigest ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="pt-3">
            <button
              onClick={handleTestPush}
              disabled={testingStatus === 'sent'}
              className="w-full py-2.5 px-4 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              {testingStatus === 'sent' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Test Notification Sent!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-emerald-600" />
                  <span>Send Test Push Notification Now</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-4 bg-stone-50 dark:bg-stone-850 border-t border-stone-200 dark:border-stone-800 flex justify-end">
          <button
            onClick={() => setIsNotificationsModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
