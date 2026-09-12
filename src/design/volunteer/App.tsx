'use client';
// @ts-nocheck

import React, { useState, useEffect } from 'react';
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
  AppSettings
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
import { AnimatedPage, motion } from '@/components/motion/ui';
import { useTheme } from '@/components/theme/ThemeProvider';
import type { ThemePreference } from '@/lib/theme';

export default function App() {
  // State with LocalStorage Fallback
  const [profile, setProfile] = useState<VolunteerProfile>(() => {
    const saved = localStorage.getItem('vms_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [events, setEvents] = useState<VolunteerEvent[]>(() => {
    const saved = localStorage.getItem('vms_events');
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>(() => {
    const saved = localStorage.getItem('vms_service_records');
    return saved ? JSON.parse(saved) : initialServiceRecords;
  });

  const [badges, setBadges] = useState<DigitalBadge[]>(() => {
    const saved = localStorage.getItem('vms_badges');
    return saved ? JSON.parse(saved) : initialBadges;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('vms_conversations');
    return saved ? JSON.parse(saved) : initialConversations;
  });

  const [notifications, setNotifications] = useState<AutomatedEmailNotification[]>(() => {
    const saved = localStorage.getItem('vms_notifications');
    return saved ? JSON.parse(saved) : initialEmailNotifications;
  });

  // Volunteer Role Module States
  const [tasks, setTasks] = useState<VolunteerTask[]>(() => {
    const saved = localStorage.getItem('vms_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('vms_attendance');
    return saved ? JSON.parse(saved) : initialAttendance;
  });

  const [teams, setTeams] = useState<TeamInfo[]>(() => {
    const saved = localStorage.getItem('vms_teams');
    return saved ? JSON.parse(saved) : initialTeams;
  });

  const [trainingCourses, setTrainingCourses] = useState<TrainingCourse[]>(() => {
    const saved = localStorage.getItem('vms_training');
    return saved ? JSON.parse(saved) : initialTraining;
  });

  const [documents, setDocuments] = useState<EventDocument[]>(() => {
    const saved = localStorage.getItem('vms_documents');
    return saved ? JSON.parse(saved) : initialDocuments;
  });

  const [requests, setRequests] = useState<VolunteerRequest[]>(() => {
    const saved = localStorage.getItem('vms_requests');
    return saved ? JSON.parse(saved) : initialRequests;
  });

  const [incidents, setIncidents] = useState<IncidentReport[]>(() => {
    const saved = localStorage.getItem('vms_incidents');
    return saved ? JSON.parse(saved) : initialIncidents;
  });

  const [feedbackList, setFeedbackList] = useState<EventFeedback[]>(() => {
    const saved = localStorage.getItem('vms_feedback');
    return saved ? JSON.parse(saved) : initialFeedback;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('vms_settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });

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

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('vms_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('vms_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('vms_service_records', JSON.stringify(serviceRecords));
  }, [serviceRecords]);

  useEffect(() => {
    localStorage.setItem('vms_badges', JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem('vms_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('vms_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('vms_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('vms_attendance', JSON.stringify(attendanceHistory));
  }, [attendanceHistory]);

  useEffect(() => {
    localStorage.setItem('vms_training', JSON.stringify(trainingCourses));
  }, [trainingCourses]);

  useEffect(() => {
    localStorage.setItem('vms_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('vms_incidents', JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem('vms_feedback', JSON.stringify(feedbackList));
  }, [feedbackList]);

  useEffect(() => {
    localStorage.setItem('vms_settings', JSON.stringify(settings));
  }, [settings]);

  const handleResetSettings = () => {
    setSettings(initialSettings);
    localStorage.removeItem('vms_settings');
    setTheme(initialSettings.themeMode);
  };

  // Derived counts
  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const upcomingEventsCount = events.filter(e => e.isSignedUp).length;
  const activeTasksCount = tasks.filter(t => t.status !== 'Completed').length;

  // Toggle Shift Registration
  const handleToggleSignup = (eventId: string) => {
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
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, isSignedUp: false, participationStatus: 'Cancelled' } : e));
  };

  // Log External Hours
  const handleSubmitExternalHours = (recordData: Omit<ServiceRecord, 'id' | 'status' | 'verificationCode'>) => {
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
  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        let progress = t.progress;
        if (newStatus === 'Completed') progress = 100;
        else if (newStatus === 'In Progress' && progress === 0) progress = 50;
        else if (newStatus === 'Accepted' && progress === 0) progress = 10;
        return { ...t, status: newStatus, progress };
      }
      return t;
    }));
  };

  // Toggle quick task status on dashboard
  const handleToggleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextStatus: TaskStatus = 
          t.status === 'Completed' ? 'In Progress' :
          t.status === 'In Progress' ? 'Completed' : 'In Progress';
        const progress = nextStatus === 'Completed' ? 100 : 50;
        return { ...t, status: nextStatus, progress };
      }
      return t;
    }));
  };

  // Report Task Issue
  const handleReportTaskIssue = (taskId: string, issueText: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: 'Blocked',
          notes: `⚠️ Volunteer Issue Logged: ${issueText}`
        };
      }
      return t;
    }));

    // Auto-create a request to Team Leader
    const task = tasks.find(t => t.id === taskId);
    if (task) {
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
    }
  };

  // Attendance Check-in / Check-out Record
  const handleRecordAttendance = (record: AttendanceRecord) => {
    setAttendanceHistory(prev => {
      const existingIdx = prev.findIndex(a => a.id === record.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = record;
        return updated;
      }
      return [record, ...prev];
    });

    // If check-out is complete with hours, add to service records!
    if (record.status === 'Completed' && record.totalHours > 0) {
      const newRec: ServiceRecord = {
        id: `rec-att-${Date.now()}`,
        eventId: record.eventId,
        eventTitle: record.eventTitle,
        organization: 'Seattle Civic Events',
        category: 'Community Aid',
        date: record.shiftDate,
        hours: record.totalHours,
        supervisorName: 'Marcus Reed',
        supervisorEmail: 'm.reed@seattlecivic.org',
        status: 'verified',
        verificationCode: record.verificationCode,
        notes: `Validated via on-site ${record.method} check-in/out terminal.`
      };
      setServiceRecords(prev => [newRec, ...prev]);
      setProfile(prev => ({
        ...prev,
        totalHours: +(prev.totalHours + record.totalHours).toFixed(1)
      }));
    }
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
  const handleSendMessage = (conversationId: string, text: string) => {
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

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  return (
    <motion.div
      className="min-h-screen bg-slate-100/60 text-slate-900 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-white"
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

      {/* Main Layout Container with Sidebar & Content */}
      <div className="max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 flex-1 flex flex-col md:flex-row gap-6 pt-4 pb-12">
        {/* Responsive Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          profile={profile}
          upcomingEventsCount={upcomingEventsCount}
          unreadMessagesCount={unreadMessagesCount}
          unreadNotificationsCount={unreadNotificationsCount}
          tasksCount={activeTasksCount}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Dynamic Content View Area */}
        <main className="flex-1 min-w-0">
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
              events={events}
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
              onReportTaskIssue={handleReportTaskIssue}
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
              attendanceHistory={attendanceHistory}
              onRecordAttendance={handleRecordAttendance}
            />
          )}

          {/* Section 3.8: Communication / Chat */}
          {activeTab === 'messages' && (
            <MessagingView
              conversations={conversations}
              profile={profile}
              onSendMessage={handleSendMessage}
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
              onUpdateProfile={(updated) => setProfile(updated)}
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
              onUpdateProfile={(updated) => setProfile(updated)}
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
