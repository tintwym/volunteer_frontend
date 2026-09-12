'use client';
// @ts-nocheck

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CURRENT_ORGANIZER,
  CURRENT_VOLUNTEER,
  OTHER_USERS,
  INITIAL_SHIFTS,
  INITIAL_CHANNELS,
  INITIAL_MESSAGES,
  EMAIL_AUTOMATIONS,
  EMAIL_DELIVERY_LOGS,
  BADGES,
  CERTIFICATE_TEMPLATE,
  APPRECIATION_LETTER,
  REPORT_METRICS,
} from './data/mockData';
import {
  User,
  UserRole,
  VolunteerShift,
  Channel,
  Message,
  EmailAutomationTrigger,
  EmailDeliveryLog,
  Badge,
  CertificateData,
  AppreciationLetterData,
  ReportMetrics,
} from './types';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { OverviewDashboard } from './components/OverviewDashboard';
import { SchedulingView } from './components/SchedulingView';
import { MessagingView } from './components/MessagingView';
import { AutomationsView } from './components/AutomationsView';
import { ReportingView } from './components/ReportingView';
import { RecognitionView } from './components/RecognitionView';
import { LogHoursModal } from './components/LogHoursModal';
import { CreateShiftModal } from './components/CreateShiftModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';

// Organiser Modules (1.1 - 1.15)
import { OrganiserDashboardView } from './components/OrganiserDashboardView';
import { EventManagementView } from './components/EventManagementView';
import { VolunteerManagementView } from './components/VolunteerManagementView';
import { LeaderManagementView } from './components/LeaderManagementView';
import { TeamManagementView } from './components/TeamManagementView';
import { TaskManagementView } from './components/TaskManagementView';
import { ScheduleShiftView } from './components/ScheduleShiftView';
import { AttendanceManagementView } from './components/AttendanceManagementView';
import { CommunicationModuleView } from './components/CommunicationModuleView';
import { TrainingDocumentsView } from './components/TrainingDocumentsView';
import { IncidentManagementView } from './components/IncidentManagementView';
import { ApprovalManagementView } from './components/ApprovalManagementView';
import { UserRoleManagementView } from './components/UserRoleManagementView';
import { SettingsView } from './components/SettingsView';
import { AnimatedPage, motion } from '@/components/motion/ui';

import {
  MOCK_ORGANISER_EVENTS,
  MOCK_VOLUNTEER_ROSTER,
  MOCK_VOLUNTEER_LEADERS,
  MOCK_OPERATIONAL_TEAMS,
  MOCK_OPERATIONAL_TASKS,
  MOCK_OPERATIONAL_SHIFTS,
  MOCK_ATTENDANCE_RECORDS,
  MOCK_BROADCAST_ANNOUNCEMENTS,
  MOCK_TRAINING_MATERIALS,
  MOCK_INCIDENTS,
  MOCK_APPROVAL_REQUESTS,
  MOCK_FEEDBACK_SURVEYS,
  INITIAL_SYSTEM_SETTINGS,
} from './data/organiserMockData';
import {
  OrganiserEvent,
  DetailedVolunteerProfile,
  VolunteerLeaderProfile,
  OperationalTeam,
  OperationalTask,
  OperationalShiftSchedule,
  AttendanceRecordItem,
  BroadcastAnnouncement,
  TrainingMaterial,
  IncidentReport,
  ApprovalRequestItem,
  FeedbackSurveyItem,
  OrganiserSystemSettings,
} from './types';

function safeParse<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    const parsed = JSON.parse(item);
    if (parsed === null || parsed === undefined) return fallback;
    if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // User State - Organiser Lead
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_ORGANIZER);

  // Core Data States
  const [shifts, setShifts] = useState<VolunteerShift[]>(() =>
    safeParse('vmp_shifts', INITIAL_SHIFTS)
  );

  const [channels, setChannels] = useState<Channel[]>(() =>
    safeParse('vmp_channels', INITIAL_CHANNELS)
  );

  const [messages, setMessages] = useState<Message[]>(() =>
    safeParse('vmp_messages', INITIAL_MESSAGES)
  );

  const [automations, setAutomations] = useState<EmailAutomationTrigger[]>(() =>
    safeParse('vmp_automations', EMAIL_AUTOMATIONS)
  );

  const [deliveryLogs, setDeliveryLogs] = useState<EmailDeliveryLog[]>(() =>
    safeParse('vmp_logs', EMAIL_DELIVERY_LOGS)
  );

  const [badges, setBadges] = useState<Badge[]>(() =>
    safeParse('vmp_badges', BADGES)
  );

  const [certificate, setCertificate] = useState<CertificateData>(CERTIFICATE_TEMPLATE);
  const [appreciationLetter, setAppreciationLetter] = useState<AppreciationLetterData>(APPRECIATION_LETTER);
  const [metrics, setMetrics] = useState<ReportMetrics>(REPORT_METRICS);

  // Organiser Modules State (1.1 - 1.15)
  const [organiserEvents, setOrganiserEvents] = useState<OrganiserEvent[]>(() =>
    safeParse('vmp_org_events', MOCK_ORGANISER_EVENTS)
  );

  const [volunteerRoster, setVolunteerRoster] = useState<DetailedVolunteerProfile[]>(() =>
    safeParse('vmp_org_roster', MOCK_VOLUNTEER_ROSTER)
  );

  const [volunteerLeaders, setVolunteerLeaders] = useState<VolunteerLeaderProfile[]>(() =>
    safeParse('vmp_org_leaders', MOCK_VOLUNTEER_LEADERS)
  );

  const [operationalTeams, setOperationalTeams] = useState<OperationalTeam[]>(() =>
    safeParse('vmp_org_teams', MOCK_OPERATIONAL_TEAMS)
  );

  const [operationalTasks, setOperationalTasks] = useState<OperationalTask[]>(() =>
    safeParse('vmp_org_tasks', MOCK_OPERATIONAL_TASKS)
  );

  const [operationalShifts, setOperationalShifts] = useState<OperationalShiftSchedule[]>(() =>
    safeParse('vmp_org_shifts', MOCK_OPERATIONAL_SHIFTS)
  );

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecordItem[]>(() =>
    safeParse('vmp_org_attendance', MOCK_ATTENDANCE_RECORDS)
  );

  const [broadcastAnnouncements, setBroadcastAnnouncements] = useState<BroadcastAnnouncement[]>(() =>
    safeParse('vmp_org_announcements', MOCK_BROADCAST_ANNOUNCEMENTS)
  );

  const [trainingMaterials, setTrainingMaterials] = useState<TrainingMaterial[]>(() =>
    safeParse('vmp_org_training', MOCK_TRAINING_MATERIALS)
  );

  const [incidentReports, setIncidentReports] = useState<IncidentReport[]>(() =>
    safeParse('vmp_org_incidents', MOCK_INCIDENTS)
  );

  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequestItem[]>(() =>
    safeParse('vmp_org_approvals', MOCK_APPROVAL_REQUESTS)
  );

  const [feedbackSurveys, setFeedbackSurveys] = useState<FeedbackSurveyItem[]>(() =>
    safeParse('vmp_org_surveys', MOCK_FEEDBACK_SURVEYS)
  );

  const [systemSettings, setSystemSettings] = useState<OrganiserSystemSettings>(() =>
    safeParse('vmp_system_settings', INITIAL_SYSTEM_SETTINGS)
  );

  // Persist Organiser data
  useEffect(() => {
    localStorage.setItem('vmp_org_events', JSON.stringify(organiserEvents));
  }, [organiserEvents]);
  useEffect(() => {
    localStorage.setItem('vmp_org_roster', JSON.stringify(volunteerRoster));
  }, [volunteerRoster]);
  useEffect(() => {
    localStorage.setItem('vmp_org_leaders', JSON.stringify(volunteerLeaders));
  }, [volunteerLeaders]);
  useEffect(() => {
    localStorage.setItem('vmp_org_teams', JSON.stringify(operationalTeams));
  }, [operationalTeams]);
  useEffect(() => {
    localStorage.setItem('vmp_org_tasks', JSON.stringify(operationalTasks));
  }, [operationalTasks]);
  useEffect(() => {
    localStorage.setItem('vmp_org_shifts', JSON.stringify(operationalShifts));
  }, [operationalShifts]);
  useEffect(() => {
    localStorage.setItem('vmp_org_attendance', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);
  useEffect(() => {
    localStorage.setItem('vmp_org_announcements', JSON.stringify(broadcastAnnouncements));
  }, [broadcastAnnouncements]);
  useEffect(() => {
    localStorage.setItem('vmp_org_training', JSON.stringify(trainingMaterials));
  }, [trainingMaterials]);
  useEffect(() => {
    localStorage.setItem('vmp_org_incidents', JSON.stringify(incidentReports));
  }, [incidentReports]);
  useEffect(() => {
    localStorage.setItem('vmp_org_approvals', JSON.stringify(approvalRequests));
  }, [approvalRequests]);
  useEffect(() => {
    localStorage.setItem('vmp_org_surveys', JSON.stringify(feedbackSurveys));
  }, [feedbackSurveys]);
  useEffect(() => {
    localStorage.setItem('vmp_system_settings', JSON.stringify(systemSettings));
  }, [systemSettings]);

  // Modals state
  const [isLogHoursModalOpen, setIsLogHoursModalOpen] = useState(false);
  const [isCreateShiftModalOpen, setIsCreateShiftModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type?: 'success' | 'info' } | null>(null);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('vmp_shifts', JSON.stringify(shifts));
  }, [shifts]);

  useEffect(() => {
    localStorage.setItem('vmp_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('vmp_automations', JSON.stringify(automations));
  }, [automations]);

  useEffect(() => {
    localStorage.setItem('vmp_logs', JSON.stringify(deliveryLogs));
  }, [deliveryLogs]);

  useEffect(() => {
    localStorage.setItem('vmp_badges', JSON.stringify(badges));
  }, [badges]);

  // Toast Helper
  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleResetAllData = () => {
    localStorage.clear();
    setShifts(INITIAL_SHIFTS);
    setMessages(INITIAL_MESSAGES);
    setAutomations(EMAIL_AUTOMATIONS);
    setDeliveryLogs(EMAIL_DELIVERY_LOGS);
    setBadges(BADGES);
    setOrganiserEvents(MOCK_ORGANISER_EVENTS);
    setVolunteerRoster(MOCK_VOLUNTEER_ROSTER);
    setVolunteerLeaders(MOCK_VOLUNTEER_LEADERS);
    setOperationalTeams(MOCK_OPERATIONAL_TEAMS);
    setOperationalTasks(MOCK_OPERATIONAL_TASKS);
    setOperationalShifts(MOCK_OPERATIONAL_SHIFTS);
    setAttendanceRecords(MOCK_ATTENDANCE_RECORDS);
    setBroadcastAnnouncements(MOCK_BROADCAST_ANNOUNCEMENTS);
    setTrainingMaterials(MOCK_TRAINING_MATERIALS);
    setIncidentReports(MOCK_INCIDENTS);
    setApprovalRequests(MOCK_APPROVAL_REQUESTS);
    setFeedbackSurveys(MOCK_FEEDBACK_SURVEYS);
    setSystemSettings(INITIAL_SYSTEM_SETTINGS);
    showToast('All platform data reset to factory initial state.');
  };

  const handleExportAllData = () => {
    const exportPayload = {
      exportTimestamp: new Date().toISOString(),
      organization: systemSettings.organizationName,
      version: '2.5.0',
      systemSettings,
      events: organiserEvents,
      volunteers: volunteerRoster,
      leaders: volunteerLeaders,
      teams: operationalTeams,
      tasks: operationalTasks,
      shifts: operationalShifts,
      attendance: attendanceRecords,
      announcements: broadcastAnnouncements,
      incidents: incidentReports,
      training: trainingMaterials,
      feedback: feedbackSurveys,
      legacyShifts: shifts,
      messages,
      automations,
      badges,
    };

    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `hopeharbor-platform-backup-${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Full platform backup exported successfully.');
  };

  // Sign up for shift
  const handleSignUp = (shiftId: string) => {
    setShifts((prev) =>
      prev.map((shift) => {
        if (shift.id === shiftId) {
          const already = shift.attendees.some((a) => a.userId === currentUser.id);
          if (already) return shift;

          const updatedAttendees = [
            ...shift.attendees,
            {
              userId: currentUser.id,
              userName: currentUser.name,
              userEmail: currentUser.email,
              avatar: currentUser.avatar,
              status: 'confirmed' as const,
            },
          ];

          return {
            ...shift,
            attendees: updatedAttendees,
            registeredCount: shift.registeredCount + 1,
          };
        }
        return shift;
      })
    );

    const shift = shifts.find((s) => s.id === shiftId);
    showToast(
      `RSVP Confirmed for "${shift?.title || 'Shift'}". Automated confirmation & calendar ICS sent to ${currentUser.email}!`
    );

    // Append automated confirmation email log
    const newLog: EmailDeliveryLog = {
      id: `log-${Date.now()}`,
      recipientEmail: currentUser.email,
      recipientName: currentUser.name,
      templateName: 'Shift Confirmation & Calendar Invite',
      subject: `Confirmed: You are signed up for ${shift?.title || 'Volunteer Shift'}!`,
      sentAt: 'Just now',
      status: 'delivered',
      shiftTitle: shift?.title,
    };
    setDeliveryLogs((prev) => [newLog, ...prev]);

    // Update automation sent counter
    setAutomations((prev) =>
      prev.map((a) =>
        a.category === 'confirmation'
          ? { ...a, totalSent: a.totalSent + 1, lastTriggered: 'Just now' }
          : a
      )
    );
  };

  // Cancel shift RSVP
  const handleCancelRegistration = (shiftId: string) => {
    setShifts((prev) =>
      prev.map((shift) => {
        if (shift.id === shiftId) {
          return {
            ...shift,
            attendees: (shift.attendees || []).filter((a) => a.userId !== currentUser.id),
            registeredCount: Math.max(0, shift.registeredCount - 1),
          };
        }
        return shift;
      })
    );
    showToast('Registration cancelled. Slot reopened for waitlist.');
  };

  // Organizer: Check in and update shift attendance
  const handleUpdateShiftAttendance = (
    shiftId: string,
    attendeeId: string,
    newStatus: 'confirmed' | 'checked-in' | 'completed' | 'waitlist'
  ) => {
    let duration = 0;
    setShifts((prev) =>
      prev.map((shift) => {
        if (shift.id === shiftId) {
          duration = shift.durationHours;
          return {
            ...shift,
            attendees: shift.attendees.map((att) =>
              att.userId === attendeeId
                ? { ...att, status: newStatus, hoursLogged: duration }
                : att
            ),
          };
        }
        return shift;
      })
    );

    showToast(`Verified ${duration} hours for volunteer! Milestone recorded.`);
  };

  // Log Hours Handler
  const handleLogHours = (data: {
    shiftId?: string;
    activityTitle: string;
    hours: number;
    date: string;
    supervisor: string;
    notes: string;
  }) => {
    const updatedTotal = currentUser.totalHours + data.hours;
    setCurrentUser((prev) => ({
      ...prev,
      totalHours: updatedTotal,
    }));

    // Update Certificate & Letter hours
    setCertificate((prev) => ({
      ...prev,
      hoursVerified: updatedTotal,
    }));
    setAppreciationLetter((prev) => ({
      ...prev,
      hoursVerified: updatedTotal,
    }));

    // Update Badges Progress
    setBadges((prev) =>
      prev.map((badge) => {
        if (badge.category === 'hours') {
          const newProgress = Math.min(badge.maxProgress, updatedTotal);
          const shouldUnlock = updatedTotal >= badge.maxProgress;
          return {
            ...badge,
            progress: updatedTotal,
            isUnlocked: shouldUnlock,
            unlockedAt: shouldUnlock && !badge.isUnlocked ? 'Today' : badge.unlockedAt,
          };
        }
        return badge;
      })
    );

    // Update Metrics
    setMetrics((prev) => ({
      ...prev,
      totalHours: prev.totalHours + data.hours,
      economicImpactValue: (prev.totalHours + data.hours) * 33.49,
    }));

    // Trigger celebration fireworks
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });

    showToast(
      `Successfully logged ${data.hours} hours for "${data.activityTitle}"! Milestone updated.`
    );

    // Automated recognition email dispatched
    const newLog: EmailDeliveryLog = {
      id: `log-${Date.now()}`,
      recipientEmail: currentUser.email,
      recipientName: currentUser.name,
      templateName: 'Hours Logged & Milestone Certificate Ready',
      subject: `Celebrate! ${data.hours} hours verified + New Milestone Recorded!`,
      sentAt: 'Just now',
      status: 'delivered',
      shiftTitle: data.activityTitle,
    };
    setDeliveryLogs((prev) => [newLog, ...prev]);
  };

  // Organizer: Create New Shift
  const handleCreateShift = (newShift: Partial<VolunteerShift>) => {
    const shift: VolunteerShift = {
      id: `shift-${Date.now()}`,
      title: newShift.title || 'Untitled Shift',
      organization: newShift.organization || 'HopeHarbor Volunteer Alliance',
      cause: newShift.cause || 'Community Aid',
      description: newShift.description || '',
      location: newShift.location || 'Main Center',
      isRemote: Boolean(newShift.isRemote),
      date: newShift.date || '2026-09-25',
      startTime: newShift.startTime || '10:00',
      endTime: newShift.endTime || '14:00',
      durationHours: newShift.durationHours || 4,
      capacity: newShift.capacity || 15,
      registeredCount: 0,
      status: 'upcoming',
      organizerId: currentUser.id,
      organizerName: currentUser.name,
      skillsRequired: newShift.skillsRequired || [],
      automatedReminders: Boolean(newShift.automatedReminders),
      coordinatorContact: currentUser.email,
      attendees: [],
    };

    setShifts((prev) => [shift, ...prev]);
    showToast(`Opportunity "${shift.title}" published! Ready for volunteer signups.`);
  };

  // Send Chat Message
  const handleSendMessage = (
    channelId: string,
    content: string,
    isUrgent?: boolean,
    attachmentName?: string
  ) => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      channelId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      senderAvatar: currentUser.avatar,
      content,
      timestamp: 'Just now',
      isUrgent,
      reactions: [],
      attachmentName,
      attachmentType: attachmentName ? 'pdf' : undefined,
    };

    setMessages((prev) => [...prev, newMsg]);

    // Update channel snippet
    setChannels((prev) =>
      prev.map((c) =>
        c.id === channelId
          ? {
              ...c,
              lastMessage: content,
              lastMessageTime: 'Just now',
            }
          : c
      )
    );

    // Real-time simulated response to organizer
    setTimeout(() => {
      const activeVolunteer = CURRENT_VOLUNTEER;
      const volunteerReplies = [
        "Received loud and clear, Elena! The squad will assemble 15 minutes early for orientation.",
        "Thank you Elena! I've confirmed attendance with my team and reviewed the logistics checklist.",
        "Understood! Bringing two additional supply crates as requested.",
        "Thanks for the prompt coordination, Elena! Glad to be on site for this initiative.",
      ];
      const randomReply = volunteerReplies[Math.floor(Math.random() * volunteerReplies.length)];

      const replyMsg: Message = {
        id: `msg-reply-${Date.now()}`,
        channelId,
        senderId: activeVolunteer.id,
        senderName: activeVolunteer.name,
        senderRole: 'participant',
        senderAvatar: activeVolunteer.avatar,
        content: randomReply,
        timestamp: 'Just now',
        reactions: [{ emoji: '👍', count: 1, users: [currentUser.id] }],
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1200);
  };

  // Add Message Reaction
  const handleAddReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === messageId) {
          const existing = m.reactions.find((r) => r.emoji === emoji);
          if (existing) {
            return {
              ...m,
              reactions: m.reactions.map((r) =>
                r.emoji === emoji ? { ...r, count: r.count + 1 } : r
              ),
            };
          } else {
            return {
              ...m,
              reactions: [...m.reactions, { emoji, count: 1, users: [currentUser.id] }],
            };
          }
        }
        return m;
      })
    );
  };

  // Toggle Automation
  const handleToggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
    showToast('Automation trigger status updated.');
  };

  // Trigger Test Email
  const handleTriggerTestEmail = (templateId: string) => {
    const found = automations.find((a) => a.id === templateId);
    if (!found) return;

    const newLog: EmailDeliveryLog = {
      id: `log-${Date.now()}`,
      recipientEmail: currentUser.email,
      recipientName: currentUser.name,
      templateName: found.name,
      subject: `[TEST] ${found.subjectTemplate.replace('{{shift_title}}', 'Coastal Cleanup')}`,
      sentAt: 'Just now',
      status: 'delivered',
      shiftTitle: 'Coastal Cleanup & Habitat Restoration',
    };

    setDeliveryLogs((prev) => [newLog, ...prev]);
    setAutomations((prev) =>
      prev.map((a) =>
        a.id === templateId
          ? { ...a, totalSent: a.totalSent + 1, lastTriggered: 'Just now' }
          : a
      )
    );
  };

  // Filter shifts based on global search if applicable
  const unreadMessagesCount = (channels || []).reduce((acc, c) => acc + (c?.unreadCount || 0), 0);
  const upcomingShiftsCount = (operationalShifts || []).filter((s) => s.status === 'published').length || (shifts || []).filter((s) => s.status === 'upcoming').length;
  const pendingApprovalsCount = (approvalRequests || []).filter((r) => r.status === 'pending').length;
  const openIncidentsCount = (incidentReports || []).filter((i) => i.status === 'open' || i.status === 'investigating').length;

  return (
    <motion.div
      className="flex h-screen bg-slate-50 font-sans-body overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-50 animate-fade-in border border-slate-700">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-semibold">{toastMessage.text}</p>
        </div>
      )}

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        currentUser={currentUser}
        unreadCount={unreadMessagesCount}
        upcomingShiftsCount={upcomingShiftsCount}
        pendingApprovalsCount={pendingApprovalsCount}
        openIncidentsCount={openIncidentsCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          currentUser={currentUser}
          onOpenNewShiftModal={() => setActiveTab('scheduling')}
          onOpenLogHoursModal={() => setIsLogHoursModalOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onNavigateToTab={(tab) => setActiveTab(tab)}
        />

        {/* View Switcher: All 15 Organiser Modules */}
        <main className="flex-1 overflow-y-auto">
          <AnimatedPage id={activeTab}>
          {/* 1.1 Dashboard */}
          {activeTab === 'overview' && (
            <OrganiserDashboardView
              events={organiserEvents}
              volunteers={volunteerRoster}
              leaders={volunteerLeaders}
              teams={operationalTeams}
              tasks={operationalTasks}
              shifts={operationalShifts}
              attendance={attendanceRecords}
              incidents={incidentReports}
              approvals={approvalRequests}
              onNavigate={(tab) => setActiveTab(tab as ActiveTab)}
              onOpenCreateEvent={() => setActiveTab('events')}
              onOpenCreateTask={() => setActiveTab('tasks')}
              onOpenCreateTeam={() => setActiveTab('teams')}
              onOpenBroadcast={() => setActiveTab('communication')}
            />
          )}

          {/* 1.2 Event Management */}
          {activeTab === 'events' && (
            <EventManagementView
              events={organiserEvents}
              onCreateEvent={(newEvent) => {
                setOrganiserEvents((prev) => [newEvent, ...prev]);
                showToast(`Event "${newEvent.name}" created successfully!`);
              }}
              onUpdateEvent={(id, patch) => {
                setOrganiserEvents((prev) =>
                  prev.map((e) => (e.id === id ? { ...e, ...patch } : e))
                );
                showToast('Event updated.');
              }}
              onDeleteEvent={(id) => {
                setOrganiserEvents((prev) => prev.filter((e) => e.id !== id));
                showToast('Event archived/deleted.');
              }}
            />
          )}

          {/* 1.3 Volunteer Management */}
          {activeTab === 'volunteers' && (
            <VolunteerManagementView
              volunteers={volunteerRoster}
              teams={operationalTeams}
              onUpdateStatus={(volId, newStatus) => {
                setVolunteerRoster((prev) =>
                  prev.map((v) => (v.id === volId ? { ...v, status: newStatus } : v))
                );
                showToast(`Volunteer status changed to ${newStatus}.`);
              }}
              onAssignTeam={(volId, teamId) => {
                setVolunteerRoster((prev) =>
                  prev.map((v) => (v.id === volId ? { ...v, teamId } : v))
                );
                showToast('Volunteer reassigned to squad.');
              }}
            />
          )}

          {/* 1.4 Volunteer Leader Management */}
          {activeTab === 'leaders' && (
            <LeaderManagementView
              leaders={volunteerLeaders}
              teams={operationalTeams}
              onAppointLeader={(leader) => {
                setVolunteerLeaders((prev) => [leader, ...prev]);
                showToast(`Appointed ${leader.name} as Volunteer Leader!`);
              }}
              onUpdateLeaderStatus={(id, status) => {
                setVolunteerLeaders((prev) =>
                  prev.map((l) => (l.id === id ? { ...l, status } : l))
                );
                showToast(`Leader status updated to ${status}.`);
              }}
              onRemoveLeader={(id) => {
                setVolunteerLeaders((prev) => prev.filter((l) => l.id !== id));
                showToast('Leader role revoked.');
              }}
            />
          )}

          {/* 1.5 Team/Group Management */}
          {activeTab === 'teams' && (
            <TeamManagementView
              teams={operationalTeams}
              leaders={volunteerLeaders}
              volunteers={volunteerRoster}
              onCreateTeam={(newTeam) => {
                setOperationalTeams((prev) => [newTeam, ...prev]);
                showToast(`Team "${newTeam.name}" created!`);
              }}
              onUpdateTeam={(id, patch) => {
                setOperationalTeams((prev) =>
                  prev.map((t) => (t.id === id ? { ...t, ...patch } : t))
                );
                showToast('Team modified.');
              }}
              onDeleteTeam={(id) => {
                setOperationalTeams((prev) => prev.filter((t) => t.id !== id));
                showToast('Team removed.');
              }}
            />
          )}

          {/* 1.6 Task Management */}
          {activeTab === 'tasks' && (
            <TaskManagementView
              tasks={operationalTasks}
              teams={operationalTeams}
              events={organiserEvents}
              onCreateTask={(newTask) => {
                setOperationalTasks((prev) => [newTask, ...prev]);
                showToast(`Task "${newTask.title}" added to board.`);
              }}
              onUpdateTaskStatus={(id, status) => {
                setOperationalTasks((prev) =>
                  prev.map((t) => (t.id === id ? { ...t, status } : t))
                );
                showToast(`Task marked as ${status}.`);
              }}
              onDeleteTask={(id) => {
                setOperationalTasks((prev) => prev.filter((t) => t.id !== id));
                showToast('Task removed.');
              }}
            />
          )}

          {/* 1.7 Schedule Management & Shifts */}
          {activeTab === 'scheduling' && (
            <ScheduleShiftView
              shifts={operationalShifts}
              teams={operationalTeams}
              events={organiserEvents}
              onCreateShift={(newShift) => {
                setOperationalShifts((prev) => [newShift, ...prev]);
                showToast(`Shift "${newShift.title}" scheduled!`);
              }}
              onUpdateShift={(id, patch) => {
                setOperationalShifts((prev) =>
                  prev.map((s) => (s.id === id ? { ...s, ...patch } : s))
                );
                showToast('Shift details updated.');
              }}
            />
          )}

          {/* 1.8 Attendance Management */}
          {activeTab === 'attendance' && (
            <AttendanceManagementView
              records={attendanceRecords}
              onCorrectAttendance={(id, checkInStatus, verifiedHours) => {
                setAttendanceRecords((prev) =>
                  prev.map((r) =>
                    r.id === id ? { ...r, checkInStatus, verifiedHours } : r
                  )
                );
                showToast('Attendance and verified service hours updated.');
              }}
            />
          )}

          {/* 1.9 Communication: Broadcast & Multi-channel Dispatch */}
          {activeTab === 'communication' && (
            <CommunicationModuleView
              announcements={broadcastAnnouncements}
              onSendAnnouncement={(newAnnouncement) => {
                setBroadcastAnnouncements((prev) => [newAnnouncement, ...prev]);
                showToast(
                  `Broadcast "${newAnnouncement.title}" dispatched via ${newAnnouncement.channels.join(', ')}!`
                );
              }}
            />
          )}

          {/* Real-Time Live Messaging */}
          {activeTab === 'messaging' && (
            <MessagingView
              channels={channels}
              messages={messages}
              currentUser={currentUser}
              onSendMessage={handleSendMessage}
              onAddReaction={handleAddReaction}
            />
          )}

          {/* Automated Email Notifications */}
          {activeTab === 'automations' && (
            <AutomationsView
              automations={automations}
              deliveryLogs={deliveryLogs}
              currentUser={currentUser}
              onToggleAutomation={handleToggleAutomation}
              onTriggerTestEmail={handleTriggerTestEmail}
            />
          )}

          {/* 1.10 Training & Documents */}
          {activeTab === 'training' && (
            <TrainingDocumentsView
              materials={trainingMaterials}
              volunteers={volunteerRoster}
              onAddMaterial={(mat) => {
                setTrainingMaterials((prev) => [mat, ...prev]);
                showToast(`Document "${mat.title}" uploaded!`);
              }}
              onSendReminder={(matId) => {
                showToast('Mandatory compliance reminder broadcasted to pending volunteers.');
              }}
            />
          )}

          {/* 1.11 Incident Management */}
          {activeTab === 'incidents' && (
            <IncidentManagementView
              incidents={incidentReports}
              events={organiserEvents}
              onCreateIncident={(newInc) => {
                setIncidentReports((prev) => [newInc, ...prev]);
                showToast(`Incident ticket ${newInc.id} logged.`);
              }}
              onUpdateStatus={(id, status) => {
                setIncidentReports((prev) =>
                  prev.map((i) => (i.id === id ? { ...i, status } : i))
                );
                showToast(`Incident status marked as ${status}.`);
              }}
              onAddResolutionNote={(id, note) => {
                setIncidentReports((prev) =>
                  prev.map((i) => (i.id === id ? { ...i, resolutionNotes: note } : i))
                );
                showToast('Resolution log updated.');
              }}
            />
          )}

          {/* 1.12 Approval Management */}
          {activeTab === 'approvals' && (
            <ApprovalManagementView
              requests={approvalRequests}
              onDecideRequest={(id, decision, reason) => {
                setApprovalRequests((prev) =>
                  prev.map((r) =>
                    r.id === id
                      ? {
                          ...r,
                          status: decision,
                          decisionReason: reason,
                          decidedAt: new Date().toISOString().split('T')[0],
                        }
                      : r
                  )
                );
                showToast(`Request ${decision.toUpperCase()} successfully.`);
              }}
              onBatchApprove={(ids) => {
                setApprovalRequests((prev) =>
                  prev.map((r) =>
                    ids.includes(r.id)
                      ? {
                          ...r,
                          status: 'approved',
                          decidedAt: new Date().toISOString().split('T')[0],
                        }
                      : r
                  )
                );
                showToast(`${ids.length} requests batch approved.`);
              }}
            />
          )}

          {/* 1.13 Reports & Analytics */}
          {activeTab === 'reports' && (
            <ReportingView
              metrics={metrics}
              currentUser={currentUser}
            />
          )}

          {/* Recognition, Badges, Milestone Certificates & Social Sharing */}
          {activeTab === 'recognition' && (
            <RecognitionView
              badges={badges}
              certificate={certificate}
              appreciationLetter={appreciationLetter}
              currentUser={currentUser}
              onUpdateCertificate={(c) => setCertificate(c)}
              onUpdateLetter={(l) => setAppreciationLetter(l)}
            />
          )}

          {/* 1.15 User & Role Management */}
          {activeTab === 'roles' && (
            <UserRoleManagementView />
          )}

          {/* Platform Settings */}
          {activeTab === 'settings' && (
            <SettingsView
              settings={systemSettings}
              onUpdateSettings={(newSettings) => {
                setSystemSettings(newSettings);
                showToast('System settings updated and saved.');
              }}
              onResetAllData={handleResetAllData}
              onExportAllData={handleExportAllData}
              currentUser={currentUser}
            />
          )}
          </AnimatedPage>
        </main>
      </div>

      {/* Modals */}
      {isLogHoursModalOpen && (
        <LogHoursModal
          shifts={shifts}
          onClose={() => setIsLogHoursModalOpen(false)}
          onSubmitHours={handleLogHours}
        />
      )}

      {isCreateShiftModalOpen && (
        <CreateShiftModal
          onClose={() => setIsCreateShiftModalOpen(false)}
          onCreateShift={handleCreateShift}
        />
      )}
    </motion.div>
  );
}
