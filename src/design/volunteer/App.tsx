'use client';
// @ts-nocheck

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  initialProfile, 
  initialEvents, 
  initialServiceRecords, 
  initialBadges, 
  initialConversations, 
  initialEmailNotifications,
  initialTasks,
  initialAttendance,
  initialTeams,
  initialTraining,
  initialDocuments,
  initialRequests,
  initialIncidents,
  initialFeedback,
  initialSettings
} from './data/initialData';
import { mergeWithDefaultBadges, syncHourBadges } from './data/milestones';
import { 
  VolunteerProfile, 
  VolunteerEvent, 
  ServiceRecord, 
  DigitalBadge, 
  Conversation, 
  AutomatedEmailNotification,
  VolunteerTask,
  AttendanceRecord,
  TeamInfo,
  TrainingCourse,
  EventDocument,
  VolunteerRequest,
  IncidentReport,
  EventFeedback,
  TaskStatus,
  AppSettings,
  CheckInMethod
} from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { EventsSchedulingView } from './components/EventsSchedulingView';
import { MyEventsView } from './components/MyEventsView';
import { MyScheduleView } from './components/MyScheduleView';
import { MyTasksView } from './components/MyTasksView';
import { AttendanceView } from './components/AttendanceView';
import { TeamView } from './components/TeamView';
import { MessagingView } from './components/MessagingView';
import { TrainingView } from './components/TrainingView';
import { DocumentsView } from './components/DocumentsView';
import { NotificationsView } from './components/NotificationsView';
import { RequestsView } from './components/RequestsView';
import { IncidentReportingView } from './components/IncidentReportingView';
import { ReportsHoursView } from './components/ReportsHoursView';
import { FeedbackView } from './components/FeedbackView';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';
import { CertificatesLettersView } from './components/CertificatesLettersView';
import { BadgesMilestonesView } from './components/BadgesMilestonesView';
import { LogHoursModal } from './components/LogHoursModal';
import { ShareMilestoneModal } from './components/ShareMilestoneModal';
import { EventDetailModal } from './components/EventDetailModal';
import { AnimatedPage, AnimatePresence, motion, Spinner } from '@/components/motion/ui';
import { useTheme } from '@/components/theme/ThemeProvider';
import { useAuth } from '@/components/auth/AuthProvider';
import { api, errorMessage, formatDate, formatTime, todayIso, type ApiMessage, type Channel } from '@/lib/api';
import type { ThemePreference } from '@/lib/theme';
import {
  CHANNELS,
  freshBadges,
  loadVolunteerData,
  syncLiveBadges,
  toApiTaskStatus,
  toConversation,
  toProfile,
  toSeverity,
  type LiveSnapshot,
  type LocalProfileExtras
} from './live';

/** Keys that hold API data for real accounts and must never be read from or written to the browser. */
const API_BACKED = new Set([
  'vms_events', 'vms_service_records', 'vms_badges', 'vms_conversations', 'vms_notifications',
  'vms_tasks', 'vms_attendance', 'vms_incidents', 'vms_teams'
]);

const PROFILE_EXTRA_KEYS = [
  'location', 'bio', 'emergencyContact', 'skills', 'languages', 'experienceYears', 'preferredActivities',
  'certifications', 'shareContactWithTeam', 'availability', 'notificationPreferences', 'avatar'
];

export default function App() {
  const { user, isDemo, refresh: refreshSession } = useAuth();
  const live = !!user && !isDemo;
  const uid = user?.id ?? 'demo';

  const storageKey = (key: string) => (live ? `${key}:${uid}` : key);
  const loadLocal = <T,>(key: string, fallback: T): T => {
    if (live && API_BACKED.has(key)) return fallback;
    const saved = localStorage.getItem(storageKey(key));
    if (!saved) return fallback;
    try {
      return JSON.parse(saved);
    } catch {
      return fallback;
    }
  };
  const saveLocal = (key: string, value: unknown) => {
    if (live && API_BACKED.has(key)) return;
    localStorage.setItem(storageKey(key), JSON.stringify(value));
  };

  const [profileExtras, setProfileExtras] = useState<LocalProfileExtras>(() =>
    live ? loadLocal('vms_profile_extras', {}) : {}
  );
  const [liveSummary, setLiveSummary] = useState<LiveSnapshot | null>(null);

  const [profile, setProfile] = useState<VolunteerProfile>(() =>
    live ? toProfile(user, initialProfile, profileExtras, null, 0) : loadLocal('vms_profile', initialProfile)
  );

  const [events, setEvents] = useState<VolunteerEvent[]>(() => loadLocal('vms_events', live ? [] : initialEvents));
  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>(() =>
    loadLocal('vms_service_records', live ? [] : initialServiceRecords)
  );

  const [badges, setBadges] = useState<DigitalBadge[]>(() => {
    if (live) return freshBadges(initialBadges);
    const saved = localStorage.getItem('vms_badges');
    const list = saved ? mergeWithDefaultBadges(JSON.parse(saved), initialBadges) : initialBadges;
    const savedProfile = localStorage.getItem('vms_profile');
    const hours = savedProfile ? JSON.parse(savedProfile).totalHours : initialProfile.totalHours;
    return syncHourBadges(list, hours);
  });

  const [conversations, setConversations] = useState<Conversation[]>(() =>
    loadLocal('vms_conversations', live ? [] : initialConversations)
  );
  const [notifications, setNotifications] = useState<AutomatedEmailNotification[]>(() =>
    loadLocal('vms_notifications', live ? [] : initialEmailNotifications)
  );
  const [tasks, setTasks] = useState<VolunteerTask[]>(() => loadLocal('vms_tasks', live ? [] : initialTasks));
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>(() =>
    loadLocal('vms_attendance', live ? [] : initialAttendance)
  );
  const [teams] = useState<TeamInfo[]>(() => loadLocal('vms_teams', live ? [] : initialTeams));
  const [trainingCourses, setTrainingCourses] = useState<TrainingCourse[]>(() => loadLocal('vms_training', initialTraining));
  const [documents] = useState<EventDocument[]>(() => loadLocal('vms_documents', initialDocuments));
  const [requests, setRequests] = useState<VolunteerRequest[]>(() => loadLocal('vms_requests', live ? [] : initialRequests));
  const [incidents, setIncidents] = useState<IncidentReport[]>(() => loadLocal('vms_incidents', live ? [] : initialIncidents));
  const [feedbackList, setFeedbackList] = useState<EventFeedback[]>(() => loadLocal('vms_feedback', live ? [] : initialFeedback));
  const [settings, setSettings] = useState<AppSettings>(() => loadLocal('vms_settings', initialSettings));
  const [chatSeen, setChatSeen] = useState<Record<string, string>>(() => (live ? loadLocal('vms_chat_seen', {}) : {}));

  const [liveLoading, setLiveLoading] = useState(live);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [actionToast, setActionToast] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null);

  const { theme, setTheme } = useTheme();

  // Keep portal settings aligned with global theme preference
  useEffect(() => {
    setSettings((prev) =>
      prev.themeMode === theme ? prev : { ...prev, themeMode: theme as ThemePreference }
    );
  }, [theme]);

  // Navigation & Modals State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLogHoursOpen, setIsLogHoursOpen] = useState<boolean>(false);
  const [shareBadgeModal, setShareBadgeModal] = useState<DigitalBadge | null>(null);
  const [selectedEventForModal, setSelectedEventForModal] = useState<VolunteerEvent | null>(null);

  const toast = (tone: 'ok' | 'error', text: string) => {
    setActionToast({ tone, text });
    setTimeout(() => setActionToast((t) => (t?.text === text ? null : t)), 4500);
  };

  // ------------------------------------------------------------- live data

  const applySnapshot = useCallback((snap: LiveSnapshot) => {
    setLiveSummary(snap);
    setEvents(snap.events);
    setServiceRecords(snap.serviceRecords);
    setTasks(snap.tasks);
    setAttendanceHistory(snap.attendance);
    setIncidents(snap.incidents);
    setNotifications(snap.notifications);
    setBadges((prev) => syncLiveBadges(prev, snap.badgeSummary));
    setSelectedEventForModal((prev) => (prev ? snap.events.find((e) => e.id === prev.id) ?? null : prev));
  }, []);

  const reload = useCallback(async () => {
    if (!live || !user) return;
    try {
      applySnapshot(await loadVolunteerData(user));
      setLiveError(null);
    } catch (err) {
      setLiveError(errorMessage(err, 'Could not load your volunteer data.'));
    } finally {
      setLiveLoading(false);
    }
  }, [live, user, applySnapshot]);

  useEffect(() => {
    void reload();
  }, [reload]);

  // Profile and conversations are derived from several live sources.
  useEffect(() => {
    if (!live || !user) return;
    setProfile(toProfile(user, initialProfile, profileExtras, liveSummary?.summary ?? null, liveSummary?.pendingHours ?? 0));
  }, [live, user, profileExtras, liveSummary]);

  useEffect(() => {
    if (!live || !user || !liveSummary) return;
    setConversations(
      CHANNELS.map(({ channel }) => toConversation(channel, liveSummary.messages[channel], user.id, chatSeen[channel] ?? null))
    );
  }, [live, user, liveSummary, chatSeen]);

  /** Runs an API mutation, refreshes everything, and surfaces errors as a toast. */
  const mutate = async (action: () => Promise<unknown>, success?: string, rethrow = false) => {
    try {
      await action();
      await reload();
      if (success) toast('ok', success);
    } catch (err) {
      if (rethrow) throw err;
      toast('error', errorMessage(err));
    }
  };

  // ---------------------------------------------------------- persistence

  useEffect(() => {
    if (!live) saveLocal('vms_profile', profile);
  }, [profile]);
  useEffect(() => {
    if (live) saveLocal('vms_profile_extras', profileExtras);
  }, [profileExtras]);
  useEffect(() => saveLocal('vms_events', events), [events]);
  useEffect(() => saveLocal('vms_service_records', serviceRecords), [serviceRecords]);
  useEffect(() => saveLocal('vms_badges', badges), [badges]);
  useEffect(() => {
    if (!live) setBadges(prev => syncHourBadges(prev, profile.totalHours));
  }, [profile.totalHours]);
  useEffect(() => saveLocal('vms_conversations', conversations), [conversations]);
  useEffect(() => saveLocal('vms_notifications', notifications), [notifications]);
  useEffect(() => saveLocal('vms_tasks', tasks), [tasks]);
  useEffect(() => saveLocal('vms_attendance', attendanceHistory), [attendanceHistory]);
  useEffect(() => saveLocal('vms_training', trainingCourses), [trainingCourses]);
  useEffect(() => saveLocal('vms_requests', requests), [requests]);
  useEffect(() => saveLocal('vms_incidents', incidents), [incidents]);
  useEffect(() => saveLocal('vms_feedback', feedbackList), [feedbackList]);
  useEffect(() => saveLocal('vms_settings', settings), [settings]);
  useEffect(() => {
    if (live) saveLocal('vms_chat_seen', chatSeen);
  }, [chatSeen]);

  const handleResetSettings = () => {
    setSettings(initialSettings);
    localStorage.removeItem(storageKey('vms_settings'));
    setTheme(initialSettings.themeMode);
  };

  // Derived counts
  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const upcomingEventsCount = events.filter(e => e.isSignedUp).length;
  const activeTasksCount = tasks.filter(t => t.status !== 'Completed').length;

  const activeShift = useMemo(
    () => attendanceHistory.find((a) => a.status === 'Checked In') ?? null,
    [attendanceHistory]
  );

  const checkInOptions = useMemo(() => {
    if (live) {
      const today = todayIso();
      return (liveSummary?.registrations ?? [])
        .filter((r) => r.status === 'CONFIRMED' && r.eventDate >= today)
        .sort((a, b) => (a.eventDate + a.startTime).localeCompare(b.eventDate + b.startTime))
        .map((r) => ({
          eventId: r.eventId,
          label: `${r.eventName} · ${formatDate(r.eventDate)} ${formatTime(r.startTime)}`
        }));
    }
    return events
      .filter((e) => e.isSignedUp)
      .map((e) => ({ eventId: e.id, label: `${e.title} · ${e.formattedDate} ${e.startTime}` }));
  }, [live, liveSummary, events]);

  // ------------------------------------------------------------- handlers

  // Toggle Shift Registration
  const handleToggleSignup = (eventId: string) => {
    if (live) {
      const evt = events.find((e) => e.id === eventId);
      if (!evt) return;
      if (evt.isSignedUp) {
        void mutate(() => api.events.cancel(eventId), `Cancelled your spot at ${evt.title}.`);
      } else {
        void mutate(async () => {
          const reg = await api.events.register(eventId);
          toast('ok', reg.status === 'WAITLIST'
            ? `${evt.title} is full, so you're on the waitlist. We'll notify you if a spot opens.`
            : `You're registered for ${evt.title}.`);
        });
      }
      return;
    }

    setEvents(prevEvents => 
      prevEvents.map(evt => {
        if (evt.id === eventId) {
          const willBeSignedUp = !evt.isSignedUp;
          const updatedSpots = willBeSignedUp ? evt.spotsFilled + 1 : Math.max(0, evt.spotsFilled - 1);
          
          if (willBeSignedUp) {
            // Trigger automated email confirmation
            const newNotification: AutomatedEmailNotification = {
              id: `notif-${Date.now()}`,
              type: 'event_signup',
              subject: `Shift Confirmed: ${evt.title}`,
              recipientEmail: profile.email,
              senderName: `${evt.organization} via VolunteerHub`,
              senderEmail: 'notifications@volunteerhub.org',
              timestamp: 'Just now',
              isRead: false,
              previewText: `Your registration for ${evt.title} on ${evt.formattedDate} is confirmed. Credit: ${evt.hours} Verified Hours.`,
              htmlContent: `
                <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b;">
                  <h2 style="color: #059669; margin-bottom: 8px;">✅ Shift Registration Confirmed</h2>
                  <p>Dear ${profile.name}, your volunteer registration for <strong>${evt.title}</strong> has been secured.</p>
                  <table style="width: 100%; border-collapse: collapse; margin: 16px 0; background: #f8fafc; border-radius: 8px;">
                    <tr><td style="padding: 8px 12px; font-weight: bold; width: 140px;">Host:</td><td style="padding: 8px 12px;">${evt.organization}</td></tr>
                    <tr><td style="padding: 8px 12px; font-weight: bold;">Date & Time:</td><td style="padding: 8px 12px;">${evt.formattedDate} (${evt.startTime} - ${evt.endTime})</td></tr>
                    <tr><td style="padding: 8px 12px; font-weight: bold;">Meeting Spot:</td><td style="padding: 8px 12px;">${evt.location}</td></tr>
                    <tr><td style="padding: 8px 12px; font-weight: bold;">Verified Hours:</td><td style="padding: 8px 12px;">+${evt.hours} Hours upon completion</td></tr>
                    <tr><td style="padding: 8px 12px; font-weight: bold;">Supervisor:</td><td style="padding: 8px 12px;">${evt.organizer.name} (${evt.organizer.email})</td></tr>
                  </table>
                  <p style="font-size: 13px; color: #64748b;">An automated reminder will be dispatched 24 hours prior to shift commencement.</p>
                </div>
              `,
              actionLabel: 'View in Shift Schedule',
              actionUrlTab: 'schedule'
            };

            setNotifications(prev => [newNotification, ...prev]);
          }

          return {
            ...evt,
            isSignedUp: willBeSignedUp,
            spotsFilled: updatedSpots,
            signupDate: willBeSignedUp ? new Date().toISOString() : undefined,
            participationStatus: willBeSignedUp ? 'Approved' : undefined
          };
        }
        return evt;
      })
    );

    if (selectedEventForModal && selectedEventForModal.id === eventId) {
      setSelectedEventForModal(prev => prev ? {
        ...prev,
        isSignedUp: !prev.isSignedUp,
        spotsFilled: !prev.isSignedUp ? prev.spotsFilled + 1 : Math.max(0, prev.spotsFilled - 1),
        participationStatus: !prev.isSignedUp ? 'Approved' : undefined
      } : null);
    }
  };

  // Cancel Participation
  const handleCancelParticipation = (eventId: string) => {
    if (live) {
      void mutate(() => api.events.cancel(eventId), 'Your registration was cancelled.');
      return;
    }
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, isSignedUp: false, participationStatus: 'Cancelled' } : e));
  };

  // Log External Hours
  const handleSubmitExternalHours = (recordData: Omit<ServiceRecord, 'id' | 'status' | 'verificationCode'>) => {
    if (live) {
      const description = [recordData.eventTitle, recordData.organization, recordData.notes]
        .map((s) => s?.trim())
        .filter(Boolean)
        .join(' · ')
        .slice(0, 2000);
      void mutate(
        () => api.hours.submit({ workDate: recordData.date, hours: Number(recordData.hours), description }),
        `Submitted ${recordData.hours}h for approval.`
      );
      return;
    }

    const newRecord: ServiceRecord = {
      ...recordData,
      id: `rec-ext-${Date.now()}`,
      status: 'pending',
      verificationCode: `PEND-EXT-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setServiceRecords(prev => [newRecord, ...prev]);
    setProfile(prev => ({
      ...prev,
      pendingHours: prev.pendingHours + recordData.hours
    }));

    const newNotification: AutomatedEmailNotification = {
      id: `notif-${Date.now()}`,
      type: 'hours_verified',
      subject: `Service Hours Submission Received: +${recordData.hours}h for ${recordData.eventTitle}`,
      recipientEmail: profile.email,
      senderName: 'Volunteer Verification Engine',
      senderEmail: 'verification@volunteerhub.org',
      timestamp: 'Just now',
      isRead: false,
      previewText: `Your submission for ${recordData.hours} hours has been routed to supervisor ${recordData.supervisorName}.`,
      htmlContent: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b;">
          <h2 style="color: #d97706; margin-bottom: 8px;">⏳ Service Hours Pending Supervisor Review</h2>
          <p>Dear ${profile.name},</p>
          <p>Your external service submission of <strong>${recordData.hours} hours</strong> for <strong>${recordData.eventTitle}</strong> was successfully recorded.</p>
        </div>
      `,
      actionLabel: 'Check Hours Transcript',
      actionUrlTab: 'reports'
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  // Task Status Lifecycle
  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus, progressOverride?: number) => {
    const current = tasks.find((t) => t.id === taskId);
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        let progress = progressOverride ?? t.progress;
        if (newStatus === 'Completed') progress = 100;
        else if (newStatus === 'In Progress' && progress === 0) progress = 50;
        else if (newStatus === 'Accepted' && progress === 0) progress = 10;
        return { ...t, status: newStatus, progress };
      }
      return t;
    }));

    if (live && current && toApiTaskStatus(current.status) !== toApiTaskStatus(newStatus)) {
      void mutate(
        () => api.tasks.setStatus(taskId, toApiTaskStatus(newStatus)),
        newStatus === 'Completed' ? `Marked “${current.title}” as done.` : undefined
      );
    }
  };

  // Toggle quick task status on dashboard
  const handleToggleTaskStatus = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const nextStatus: TaskStatus =
      task.status === 'Completed' ? 'In Progress' :
      task.status === 'In Progress' ? 'Completed' : 'In Progress';
    handleUpdateTaskStatus(taskId, nextStatus, nextStatus === 'Completed' ? 100 : 50);
  };

  // Report Task Issue
  const handleReportTaskIssue = (taskId: string, issueText: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (live) {
      void mutate(
        () => api.incidents.report({
          title: `[Equipment problem] Task blocked: ${task.title}`.slice(0, 200),
          description: issueText,
          severity: 'MEDIUM',
          eventId: task.eventId || null
        }),
        'Problem reported. Your organizer and leaders have been notified.'
      );
      return;
    }

    setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, problemReported: issueText } : t)));

    // Auto-create a request to Team Leader
    const newReq: VolunteerRequest = {
      id: `req-auto-${Date.now()}`,
      type: 'Assistance Request',
      subject: `Task Assistance Needed: ${task.title}`,
      details: `Volunteer encountered an impediment: "${issueText}" at ${task.location}. Requesting leader guidance.`,
      status: 'Submitted',
      submittedDate: 'Just now',
      eventId: task.eventId,
      eventTitle: task.eventTitle,
      urgency: 'High'
    };
    setRequests(prev => [newReq, ...prev]);
  };

  // Attendance
  const handleCheckIn = async (method: CheckInMethod, eventId: string, code?: string) => {
    if (live) {
      await mutate(() => api.events.checkIn(eventId, code ?? ''), undefined, true);
      return;
    }
    const evt = events.find((e) => e.id === eventId);
    const now = new Date();
    const record: AttendanceRecord = {
      id: `att-${Date.now()}`,
      eventId,
      eventTitle: evt?.title ?? 'Volunteer shift',
      shiftDate: evt?.formattedDate ?? now.toLocaleDateString('en-US'),
      scheduledStart: evt?.startTime ?? '',
      scheduledEnd: evt?.endTime ?? '',
      checkInTime: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      checkOutTime: null,
      checkInAt: now.toISOString(),
      totalHours: 0,
      method,
      status: 'Checked In',
      verificationCode: `CHK-${Math.floor(1000 + Math.random() * 9000)}`,
      locationValidationStatus: method === 'Location GPS' ? 'Verified GPS' : undefined
    };
    setAttendanceHistory((prev) => [record, ...prev]);
  };

  const handleCheckOut = async (recordId: string) => {
    const record = attendanceHistory.find((a) => a.id === recordId);
    if (!record) return;
    if (live) {
      await mutate(() => api.events.checkOut(record.eventId), undefined, true);
      return;
    }
    const now = new Date();
    const started = record.checkInAt ? new Date(record.checkInAt).getTime() : now.getTime();
    const hours = Math.min(24, Math.max(0.25, Math.round(((now.getTime() - started) / 3600000) * 4) / 4));
    const completed: AttendanceRecord = {
      ...record,
      checkOutTime: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      totalHours: hours,
      status: 'Completed'
    };
    setAttendanceHistory((prev) => prev.map((a) => (a.id === recordId ? completed : a)));
    setServiceRecords((prev) => [{
      id: `rec-att-${Date.now()}`,
      eventId: record.eventId,
      eventTitle: record.eventTitle,
      organization: 'CommonGround',
      category: 'Community Aid',
      date: now.toISOString().split('T')[0],
      hours,
      supervisorName: 'Awaiting review',
      supervisorEmail: '',
      status: 'pending',
      verificationCode: record.verificationCode,
      notes: `Recorded via ${record.method} check-in/out.`
    }, ...prev]);
    setProfile((prev) => ({ ...prev, pendingHours: +(prev.pendingHours + hours).toFixed(2) }));
  };

  const handleReportAttendanceProblem = async (recordId: string, problem: string) => {
    const record = attendanceHistory.find((a) => a.id === recordId);
    if (live) {
      await mutate(
        () => api.incidents.report({
          title: `[Venue problem] Attendance issue: ${record?.eventTitle ?? 'shift'}`.slice(0, 200),
          description: problem,
          severity: 'LOW',
          eventId: record?.eventId ?? null
        }),
        undefined,
        true
      );
      return;
    }
    setAttendanceHistory((prev) =>
      prev.map((a) => (a.id === recordId ? { ...a, status: 'Problem Reported', notes: problem } : a))
    );
  };

  // Training Course Quiz Completion
  const handleCompleteCourse = (courseId: string, score: number) => {
    setTrainingCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          status: 'Completed',
          progressPercent: 100,
          score,
          completedDate: new Date().toISOString().split('T')[0],
          certificateId: `TRN-CERT-${Math.floor(1000 + Math.random() * 9000)}`
        };
      }
      return c;
    }));
  };

  // Submit Volunteer Request
  const handleSubmitRequest = (newReq: Omit<VolunteerRequest, 'id' | 'submittedDate' | 'status'>) => {
    const item: VolunteerRequest = {
      ...newReq,
      id: `req-${Date.now()}`,
      status: 'Submitted',
      submittedDate: 'Just now'
    };
    setRequests(prev => [item, ...prev]);
  };

  // Submit Incident Report
  const handleSubmitIncident = (newInc: Omit<IncidentReport, 'id' | 'submittedDate' | 'status'>) => {
    if (live) {
      const details = [
        newInc.description,
        newInc.location && `Location: ${newInc.location}`,
        newInc.incidentTime && `Time: ${newInc.incidentTime}`
      ].filter(Boolean).join('\n');
      void mutate(
        () => api.incidents.report({
          title: `[${newInc.category}] ${newInc.title}`.slice(0, 200),
          description: details,
          severity: toSeverity(newInc.urgency)
        }),
        'Incident reported. Event staff have been notified.'
      );
      return;
    }
    const item: IncidentReport = {
      ...newInc,
      id: `inc-${Date.now()}`,
      status: 'Submitted',
      submittedDate: 'Just now'
    };
    setIncidents(prev => [item, ...prev]);
  };

  // Submit Feedback
  const handleSubmitFeedback = (newFb: Omit<EventFeedback, 'id' | 'submittedDate'>) => {
    const item: EventFeedback = {
      ...newFb,
      id: `fb-${Date.now()}`,
      submittedDate: new Date().toISOString().split('T')[0]
    };
    setFeedbackList(prev => [item, ...prev]);
  };

  // Send Message in Chat
  const handleSendMessage = async (conversationId: string, text: string) => {
    if (live) {
      if (conversationId === 'ANNOUNCEMENTS') {
        throw new Error('Only organizers and leaders can post announcements. Use the General channel instead.');
      }
      await mutate(() => api.messages.post(conversationId as Channel, text), undefined, true);
      return;
    }

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: profile.id,
      senderName: profile.name,
      senderRole: 'Volunteer',
      senderAvatar: profile.avatar,
      text,
      timestamp: 'Just now',
      isVolunteer: true
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text,
            lastTimestamp: 'Just now',
            messages: [...c.messages, newMessage]
          };
        }
        return c;
      })
    );
  };

  const handleOpenConversation = useCallback((conversationId: string) => {
    if (!live || !liveSummary) return;
    const latest = (liveSummary.messages[conversationId as Channel] ?? []).reduce(
      (max: string, m: ApiMessage) => (m.createdAt > max ? m.createdAt : max),
      ''
    );
    if (latest) setChatSeen((prev) => (prev[conversationId] === latest ? prev : { ...prev, [conversationId]: latest }));
  }, [live, liveSummary]);

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
    if (live) {
      api.me.markRead(id).catch((err) => toast('error', errorMessage(err)));
    }
  };

  const handleUpdateProfile = (updated: VolunteerProfile) => {
    if (!live) {
      setProfile(updated);
      return;
    }
    const extras = Object.fromEntries(PROFILE_EXTRA_KEYS.map((k) => [k, updated[k as keyof VolunteerProfile]]));
    setProfileExtras(extras);
    const fullName = updated.name?.trim();
    const phone = updated.phone?.trim() ?? '';
    if ((fullName && fullName !== user.fullName) || phone !== (user.phone ?? '')) {
      void mutate(async () => {
        await api.account.updateProfile({ fullName: fullName || user.fullName, phone });
        await refreshSession();
      });
    }
  };

  if (live && liveLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 text-slate-500">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
          <Spinner className="h-5 w-5" />
        </div>
        <p className="text-sm font-medium">Loading your volunteer workspace…</p>
      </div>
    );
  }

  return (
    <motion.div
      className="cg-role-portal min-h-screen bg-slate-100/60 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Top Sticky Navigation Bar */}
      <Navbar
        profile={profile}
        unreadNotificationsCount={unreadNotificationsCount}
        unreadMessagesCount={unreadMessagesCount}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLogHours={() => setIsLogHoursOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {liveError && (
        <div role="alert" className="w-full px-3 sm:px-4 lg:px-6 pt-4">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200">
            <span>{liveError}</span>
            <button onClick={() => void reload()} className="font-semibold underline">Try again</button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {actionToast ? (
          <motion.div
            key="action-toast"
            role={actionToast.tone === 'error' ? 'alert' : 'status'}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className={`fixed bottom-6 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg ${
              actionToast.tone === 'error' ? 'bg-red-600' : 'bg-emerald-600'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span>{actionToast.text}</span>
              <button
                onClick={() => setActionToast(null)}
                className="shrink-0 text-xs text-white/80 underline transition-colors hover:text-white"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Full-bleed layout: sidebar + content use the full viewport width */}
      <div className="w-full flex-1 flex flex-col md:flex-row gap-0 md:gap-0 pt-0 pb-0 min-h-0">
        {/* Responsive Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          profile={profile}
          upcomingEventsCount={upcomingEventsCount}
          unreadMessagesCount={unreadMessagesCount}
          unreadNotificationsCount={unreadNotificationsCount}
          tasksCount={activeTasksCount}
          earnedBadgesCount={badges.filter((b) => b.earned).length}
          isOnDuty={!!activeShift}
          teamsCount={teams.length}
          documentsCount={documents.length}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Dynamic Content View Area */}
        <main className="flex-1 min-w-0 px-3 sm:px-4 lg:px-6 pt-4 pb-12">
          <AnimatedPage id={activeTab}>
          {/* Section 3.1: Dashboard Overview */}
          {activeTab === 'dashboard' && (
            <DashboardView
              profile={profile}
              events={events}
              serviceRecords={serviceRecords}
              badges={badges}
              notifications={notifications}
              tasks={tasks}
              teams={teams}
              isOnDuty={!!activeShift}
              setActiveTab={setActiveTab}
              onOpenLogHours={() => setIsLogHoursOpen(true)}
              onOpenShareModal={(badge) => setShareBadgeModal(badge)}
              onSelectEvent={(event) => setSelectedEventForModal(event)}
              onToggleTaskStatus={handleToggleTaskStatus}
            />
          )}

          {/* Section 3.2 & 3.3: Event Discovery & Registration */}
          {activeTab === 'events' && (
            <EventsSchedulingView
              events={events.filter((e) => !e.closed || e.isSignedUp)}
              onToggleSignup={handleToggleSignup}
              onSelectEvent={(event) => setSelectedEventForModal(event)}
              setActiveTab={setActiveTab}
            />
          )}

          {/* Section 3.4: My Events */}
          {activeTab === 'my-events' && (
            <MyEventsView
              events={events}
              onCancelParticipation={handleCancelParticipation}
              onOpenTasks={() => setActiveTab('tasks')}
              onOpenTeam={() => setActiveTab('team')}
              onOpenSchedule={() => setActiveTab('schedule')}
            />
          )}

          {/* Section 3.5: My Schedule */}
          {activeTab === 'schedule' && (
            <MyScheduleView
              events={events}
              onRequestShiftChange={() => setActiveTab('requests')}
              onCheckInNow={() => setActiveTab('attendance')}
            />
          )}

          {/* Section 3.6: My Tasks */}
          {activeTab === 'tasks' && (
            <MyTasksView
              tasks={tasks}
              onUpdateTaskStatus={handleUpdateTaskStatus}
              onReportTaskProblem={handleReportTaskIssue}
              onNavigateToLeaderChat={() => setActiveTab('messages')}
            />
          )}

          {/* Section 3.7: Team */}
          {activeTab === 'team' && (
            <TeamView
              teams={teams}
              onMessageLeader={() => setActiveTab('messages')}
              onViewSchedule={() => setActiveTab('schedule')}
            />
          )}

          {/* Section 3.8: Attendance */}
          {activeTab === 'attendance' && (
            <AttendanceView
              records={attendanceHistory}
              activeShift={activeShift}
              checkInOptions={checkInOptions}
              live={live}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
              onReportAttendanceProblem={handleReportAttendanceProblem}
            />
          )}

          {/* Section 3.8: Communication / Chat */}
          {activeTab === 'messages' && (
            <MessagingView
              conversations={conversations}
              profile={profile}
              onSendMessage={handleSendMessage}
              simulateReplies={!live}
              onOpenConversation={handleOpenConversation}
            />
          )}

          {/* Section 3.9: Training */}
          {activeTab === 'training' && (
            <TrainingView
              courses={trainingCourses}
              onCompleteCourse={handleCompleteCourse}
              onOpenCertificate={() => setActiveTab('certificates')}
            />
          )}

          {/* Section 3.10: Documents */}
          {activeTab === 'documents' && (
            <DocumentsView documents={documents} />
          )}

          {/* Section 3.11: Notifications */}
          {activeTab === 'notifications' && (
            <NotificationsView
              notifications={notifications}
              onMarkAsRead={handleMarkNotificationAsRead}
              setActiveTab={setActiveTab}
            />
          )}

          {/* Section 3.12: Requests */}
          {activeTab === 'requests' && (
            <RequestsView
              requests={requests}
              onSubmitRequest={handleSubmitRequest}
              onNavigateToLeaderChat={() => setActiveTab('messages')}
            />
          )}

          {/* Section 3.13: Incident Reporting */}
          {activeTab === 'incidents' && (
            <IncidentReportingView
              incidents={incidents}
              onSubmitIncident={handleSubmitIncident}
            />
          )}

          {/* Section 3.14: Volunteer Hours & Transcripts */}
          {activeTab === 'reports' && (
            <ReportsHoursView
              profile={profile}
              serviceRecords={serviceRecords}
              onOpenLogHours={() => setIsLogHoursOpen(true)}
              setActiveTab={setActiveTab}
            />
          )}

          {/* Section 3.15: Feedback */}
          {activeTab === 'feedback' && (
            <FeedbackView
              feedbackList={feedbackList}
              onSubmitFeedback={handleSubmitFeedback}
            />
          )}

          {/* Section 3.16: Profile & Settings */}
          {activeTab === 'profile' && (
            <ProfileView
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onNavigateToSettings={() => setActiveTab('settings')}
            />
          )}

          {/* Section 3.17: System & Volunteer Settings */}
          {activeTab === 'settings' && (
            <SettingsView
              settings={settings}
              profile={profile}
              onUpdateSettings={(updated) => {
                setSettings(updated);
                if (updated.themeMode) setTheme(updated.themeMode);
              }}
              onUpdateProfile={handleUpdateProfile}
              onResetSettings={handleResetSettings}
            />
          )}

          {/* Certificates & Letters */}
          {activeTab === 'certificates' && (
            <CertificatesLettersView profile={profile} />
          )}

          {/* Badges & Milestones */}
          {activeTab === 'badges' && (
            <BadgesMilestonesView
              badges={badges}
              profile={profile}
              onOpenShareModal={(badge) => setShareBadgeModal(badge)}
            />
          )}
          </AnimatedPage>
        </main>
      </div>

      {/* Modals */}
      <LogHoursModal
        isOpen={isLogHoursOpen}
        onClose={() => setIsLogHoursOpen(false)}
        onSubmitHours={handleSubmitExternalHours}
      />

      <ShareMilestoneModal
        isOpen={!!shareBadgeModal}
        onClose={() => setShareBadgeModal(null)}
        badge={shareBadgeModal}
        profile={profile}
      />

      <EventDetailModal
        isOpen={!!selectedEventForModal}
        onClose={() => setSelectedEventForModal(null)}
        event={selectedEventForModal}
        onToggleSignup={handleToggleSignup}
        onMessageOrganizer={() => setActiveTab('messages')}
      />
    </motion.div>
  );
}
