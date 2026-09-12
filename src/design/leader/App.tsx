'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  INITIAL_SHIFTS,
  INITIAL_CHANNELS,
  INITIAL_MESSAGES,
  INITIAL_EMAIL_TEMPLATES,
  INITIAL_EMAIL_LOGS,
  INITIAL_CERTIFICATES,
  INITIAL_BADGES
} from './mockData';
import {
  LEADER_ASSIGNED_VOLUNTEERS,
  INITIAL_TODAY_ATTENDANCE,
  INITIAL_TEAM_TASKS,
  INITIAL_INCIDENTS,
  INITIAL_OPERATIONAL_REQUESTS,
  INITIAL_TRAINING_MODULES,
  INITIAL_VOLUNTEER_TRAINING,
  INITIAL_FEEDBACK_RECORDS,
  INITIAL_ORGANISER_ANNOUNCEMENTS
} from './mockLeaderData';
import {
  Volunteer,
  ShiftEvent,
  ChatChannel,
  ChatMessage,
  AutomatedEmailTemplate,
  EmailLogEntry,
  CertificateRecord,
  Badge,
  TeamTask,
  TodayAttendanceRecord,
  IncidentReport,
  OperationalRequest,
  TrainingModule,
  VolunteerTrainingStatus,
  VolunteerFeedbackRecord,
  OrganiserAnnouncement,
  TaskStatus,
  AttendanceMark
} from './types';

// Components
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LeaderDashboardView } from './components/LeaderDashboardView';
import { MyTeamView } from './components/MyTeamView';
import { TeamTaskManagementView } from './components/TeamTaskManagementView';
import { AttendanceManagementView } from './components/AttendanceManagementView';
import { TeamScheduleView } from './components/TeamScheduleView';
import { CommunicationRelayView } from './components/CommunicationRelayView';
import { IncidentReportingView } from './components/IncidentReportingView';
import { TrainingMonitoringView } from './components/TrainingMonitoringView';
import { OperationalRequestsView } from './components/OperationalRequestsView';
import { ProgressMonitoringView } from './components/ProgressMonitoringView';
import { VolunteerFeedbackView } from './components/VolunteerFeedbackView';
import { AutomatedEmailView } from './components/AutomatedEmailView';
import { RecognitionMilestonesView } from './components/RecognitionMilestonesView';
import { SettingsView } from './components/SettingsView';
import { CheckCircle2, AlertCircle, X, Send } from 'lucide-react';
import { AnimatedPage, motion } from '@/components/motion/ui';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Core State (Leader Domain Scope: 20 assigned volunteers)
  const [volunteers, setVolunteers] = useState<Volunteer[]>(LEADER_ASSIGNED_VOLUNTEERS);
  const [attendance, setAttendance] = useState<TodayAttendanceRecord[]>(INITIAL_TODAY_ATTENDANCE);
  const [tasks, setTasks] = useState<TeamTask[]>(INITIAL_TEAM_TASKS);
  const [incidents, setIncidents] = useState<IncidentReport[]>(INITIAL_INCIDENTS);
  const [requests, setRequests] = useState<OperationalRequest[]>(INITIAL_OPERATIONAL_REQUESTS);
  const [trainingModules, setTrainingModules] = useState<TrainingModule[]>(INITIAL_TRAINING_MODULES);
  const [volunteerTraining, setVolunteerTraining] = useState<VolunteerTrainingStatus[]>(INITIAL_VOLUNTEER_TRAINING);
  const [feedbacks, setFeedbacks] = useState<VolunteerFeedbackRecord[]>(INITIAL_FEEDBACK_RECORDS);
  const [announcements, setAnnouncements] = useState<OrganiserAnnouncement[]>(INITIAL_ORGANISER_ANNOUNCEMENTS);

  // Platform foundation states
  const [shifts, setShifts] = useState<ShiftEvent[]>(INITIAL_SHIFTS);
  const [channels, setChannels] = useState<ChatChannel[]>(INITIAL_CHANNELS);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_MESSAGES);
  const [emailTemplates, setEmailTemplates] = useState<AutomatedEmailTemplate[]>(INITIAL_EMAIL_TEMPLATES);
  const [emailLogs, setEmailLogs] = useState<EmailLogEntry[]>(INITIAL_EMAIL_LOGS);
  const [certificates, setCertificates] = useState<CertificateRecord[]>(INITIAL_CERTIFICATES);
  const [allBadges, setAllBadges] = useState<Badge[]>(INITIAL_BADGES);

  const [selectedChannelForMessaging, setSelectedChannelForMessaging] = useState<string>('ch-team-alpha');
  const [selectedVolunteerForRecognition, setSelectedVolunteerForRecognition] = useState<Volunteer | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'alert' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'alert' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // 1. Task Handlers
  const handleUpdateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? {
              ...t,
              status,
              completedAt: status === 'Completed' ? 'Today at 08:30 AM' : undefined,
              isEscalated: status === 'Escalated' ? true : t.isEscalated
            }
          : t
      )
    );
    showToast(`Task updated to "${status}"`, 'info');
  };

  const handleAddTaskNote = (taskId: string, note: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, notes: note } : t))
    );
    showToast('Task note updated', 'success');
  };

  const handleReportTaskIssue = (taskId: string, issue: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId ? { ...t, issuesReported: [...t.issuesReported, issue] } : t
      )
    );
    showToast('Problem reported on task', 'alert');
  };

  const handleEscalateTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, isEscalated: true, status: 'Escalated' } : t))
    );
    const task = tasks.find(t => t.id === taskId);
    showToast(`Task "${task?.title}" escalated to Lead Organiser!`, 'alert');
  };

  const handleAssignVolunteerSubRole = (
    taskId: string,
    volunteerId: string,
    volunteerName: string,
    subRole: string
  ) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const filtered = t.assignments.filter(a => a.volunteerId !== volunteerId);
          return {
            ...t,
            assignments: [...filtered, { volunteerId, volunteerName, subRole }]
          };
        }
        return t;
      })
    );
    showToast(`Assigned ${volunteerName} -> ${subRole}`, 'success');
  };

  const handleRemoveAssignment = (taskId: string, volunteerId: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? { ...t, assignments: t.assignments.filter(a => a.volunteerId !== volunteerId) }
          : t
      )
    );
  };

  const handleAddNewTask = (newTask: Omit<TeamTask, 'id'>) => {
    const task: TeamTask = {
      ...newTask,
      id: `task-${Date.now()}`
    };
    setTasks(prev => [task, ...prev]);
    showToast(`Created new operational task: "${task.title}"`, 'success');
  };

  // 2. Attendance Handlers
  const handleMarkAttendance = (volunteerId: string, status: AttendanceMark, time?: string) => {
    const nowTime = time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAttendance(prev =>
      prev.map(a => {
        if (a.volunteerId === volunteerId) {
          return {
            ...a,
            status,
            checkInTime: status === 'Present' || status === 'Late' ? a.checkInTime || nowTime : undefined,
            checkOutTime: status === 'Present' && a.checkInTime && !time ? nowTime : a.checkOutTime
          };
        }
        return a;
      })
    );
    const vol = volunteers.find(v => v.id === volunteerId);
    showToast(`Attendance updated: ${vol?.name} marked ${status}`, 'success');
  };

  const handleUpdateRemarks = (volunteerId: string, remarks: string) => {
    setAttendance(prev =>
      prev.map(a => (a.volunteerId === volunteerId ? { ...a, remarks } : a))
    );
    showToast('Attendance remark saved', 'info');
  };

  const handleSubmitSummaryToOrganiser = () => {
    setAttendance(prev => prev.map(a => ({ ...a, isSubmittedToOrganiser: true })));
    showToast('Signed Attendance Summary successfully synced to Lead Organiser dashboard!', 'success');
  };

  // 3. Incident Handlers
  const handleReportIncident = (
    incidentData: Omit<IncidentReport, 'id' | 'timestamp' | 'status'>
  ) => {
    const newInc: IncidentReport = {
      ...incidentData,
      id: `inc-${Date.now()}`,
      timestamp: 'Just now',
      status: 'Reported'
    };
    setIncidents(prev => [newInc, ...prev]);
    showToast(`Incident reported to Lead Organiser: "${newInc.title}"`, 'alert');
  };

  const handleEscalateIncident = (incidentId: string) => {
    setIncidents(prev =>
      prev.map(i => (i.id === incidentId ? { ...i, severity: 'Critical', status: 'In Review' } : i))
    );
    showToast('Incident escalated to Priority Critical with Organiser desk', 'alert');
  };

  const handleResolveIncident = (incidentId: string, resolutionNote: string) => {
    setIncidents(prev =>
      prev.map(i =>
        i.id === incidentId
          ? {
              ...i,
              status: 'Resolved',
              organiserResponse: resolutionNote
            }
          : i
      )
    );
    showToast('Incident marked Resolved', 'success');
  };

  // 4. Operational Requests Handlers
  const handleSubmitOperationalRequest = (
    requestData: Omit<OperationalRequest, 'id' | 'status' | 'submittedAt'>
  ) => {
    const newReq: OperationalRequest = {
      ...requestData,
      id: `req-${Date.now()}`,
      status: 'Pending',
      submittedAt: 'Just now',
      organiserFeedback: 'Under review by Lead Organiser logistics team.'
    };
    setRequests(prev => [newReq, ...prev]);
    showToast(`Submitted support request: "${newReq.title}"`, 'success');
  };

  // 5. Training Handlers
  const handleSendTrainingReminder = (volunteerName: string, moduleTitle: string) => {
    const newLog: EmailLogEntry = {
      id: `elog-${Date.now()}`,
      recipientName: volunteerName,
      recipientEmail: 'volunteer@example.org',
      subject: `Training Reminder: Please complete "${moduleTitle}"`,
      bodyHtml: `<p>Your Volunteer Leader has sent a reminder to complete your required module "${moduleTitle}".</p>`,
      timestamp: 'Just now',
      status: 'Delivered',
      type: 'Onboarding'
    };
    setEmailLogs(prev => [newLog, ...prev]);
  };

  const handleReportTrainingIssue = (volunteerName: string, reason: string) => {
    handleReportIncident({
      category: 'Staffing Shortage',
      title: `Training Blocker: ${volunteerName}`,
      description: `${volunteerName} has incomplete mandatory module. ${reason}`,
      severity: 'Medium',
      affectedTeam: 'Team Alpha - Registration',
      affectedVolunteerName: volunteerName,
      location: 'Registration Counter',
      reportedBy: 'Sarah Jenkins (Leader)',
      notes: 'Requested Organiser permission or float swap until certified.'
    });
  };

  // 6. Feedback Handlers
  const handleSubmitFeedback = (
    feedbackData: Omit<VolunteerFeedbackRecord, 'id' | 'date' | 'leaderName'>
  ) => {
    const newFb: VolunteerFeedbackRecord = {
      ...feedbackData,
      id: `fb-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      leaderName: 'Sarah Jenkins (Leader)'
    };
    setFeedbacks(prev => [newFb, ...prev]);
    showToast(`Feedback and recommendation recorded for ${newFb.volunteerName}`, 'success');
  };

  // 7. Communication & Relay Handlers
  const handleRelayOrganiserAnnouncement = (announcementId: string, customRelayMessage: string) => {
    setAnnouncements(prev =>
      prev.map(a => (a.id === announcementId ? { ...a, relayedToTeam: true } : a))
    );

    // Push into team channel
    const relayedMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      channelId: 'ch-announcements',
      senderId: 'leader-sarah',
      senderName: 'Sarah Jenkins (Leader)',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      senderRole: 'Leader',
      content: `📢 [LEADER RELAY]: ${customRelayMessage}`,
      timestamp: 'Just now'
    };

    setMessages(prev => ({
      ...prev,
      'ch-announcements': [...(prev['ch-announcements'] || []), relayedMsg]
    }));

    showToast('Organiser announcement relayed to Team Alpha!', 'success');
  };

  const handleBroadcastUrgentMessage = (urgentText: string) => {
    const broadcastMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      channelId: 'ch-announcements',
      senderId: 'leader-sarah',
      senderName: 'Sarah Jenkins (Leader)',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      senderRole: 'Leader',
      content: `🚨 URGENT BROADCAST: ${urgentText}`,
      timestamp: 'Just now'
    };

    setMessages(prev => ({
      ...prev,
      'ch-announcements': [...(prev['ch-announcements'] || []), broadcastMsg]
    }));

    showToast('Urgent broadcast transmitted to all 20 team members!', 'alert');
  };

  const handleSendMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      channelId: selectedChannelForMessaging,
      senderId: 'leader-sarah',
      senderName: 'Sarah Jenkins (Leader)',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      senderRole: 'Leader',
      content: text,
      timestamp: 'Just now'
    };

    setMessages(prev => ({
      ...prev,
      [selectedChannelForMessaging]: [...(prev[selectedChannelForMessaging] || []), newMsg]
    }));
  };

  // 8. Schedule Handlers
  const handleRequestScheduleChange = (shiftId: string, reason: string) => {
    const shift = shifts.find(s => s.id === shiftId);
    handleSubmitOperationalRequest({
      type: 'Schedule change',
      urgency: 'Normal',
      title: `Schedule Adjustment Request for ${shift?.title || 'Shift'}`,
      description: reason,
      leaderId: 'leader-sarah',
      leaderName: 'Sarah Jenkins',
      teamName: 'Team Alpha - Registration'
    });
  };

  const handleRequestReplacement = (shiftId: string, volunteerName: string) => {
    handleSubmitOperationalRequest({
      type: 'Team member replacement',
      urgency: 'Urgent',
      title: `Replacement Volunteer for ${volunteerName}`,
      description: `Need replacement for ${volunteerName} on duty. Requesting float volunteer from Organiser reserve pool.`,
      leaderId: 'leader-sarah',
      leaderName: 'Sarah Jenkins',
      teamName: 'Team Alpha - Registration'
    });
  };

  const handleNotifyTeamOfShiftChange = (shiftTitle: string) => {
    handleBroadcastUrgentMessage(`Schedule update: please review timing and station layout for "${shiftTitle}".`);
  };

  // Recognition & Certificates Handlers
  const handleIssueCertificate = (
    volunteerId: string,
    volunteerName: string,
    hours: number,
    programFocus: string
  ) => {
    const newCert: CertificateRecord = {
      id: `cert-${Date.now()}`,
      volunteerId,
      volunteerName,
      hours,
      organization: 'Community Action Network Alliance',
      issuedDate: new Date().toISOString().split('T')[0],
      signatoryLeader: 'Sarah Jenkins',
      signatoryTitle: 'Volunteer Team Leader',
      programFocus,
      certificateNumber: `CAN-LEAD-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setCertificates(prev => [newCert, ...prev]);
    showToast(`Official Certificate of Service created for ${volunteerName}!`, 'success');
  };

  const handleAwardBadge = (volunteerId: string, badgeId: string) => {
    const badge = allBadges.find(b => b.id === badgeId);
    if (!badge) return;

    setVolunteers(prev =>
      prev.map(v => {
        if (v.id === volunteerId) {
          const hasBadge = v.badges.some(b => b.id === badgeId);
          if (hasBadge) return v;
          return {
            ...v,
            badges: [...v.badges, badge]
          };
        }
        return v;
      })
    );

    const target = volunteers.find(v => v.id === volunteerId);
    showToast(`Awarded "${badge.name}" badge to ${target?.name}!`, 'success');
  };

  const handleResetDemoData = () => {
    setVolunteers(LEADER_ASSIGNED_VOLUNTEERS);
    setAttendance(INITIAL_TODAY_ATTENDANCE);
    setTasks(INITIAL_TEAM_TASKS);
    setIncidents(INITIAL_INCIDENTS);
    setRequests(INITIAL_OPERATIONAL_REQUESTS);
    showToast('Demo portal data restored to default configuration', 'info');
  };

  const activeMessages = messages[selectedChannelForMessaging] || messages['ch-announcements'] || [];

  return (
    <motion.div
      className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-500 selection:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Top Navbar */}
      <Navbar
        volunteers={volunteers}
        shifts={shifts}
        emailLogs={emailLogs}
        onOpenScheduleShift={() => setCurrentTab('schedule')}
        onOpenQuickBroadcast={() => setCurrentTab('communication')}
        onSelectTab={(tabId) => setCurrentTab(tabId)}
        onSelectVolunteer={(vol) => {
          setSelectedVolunteerForRecognition(vol);
          setCurrentTab('my_team');
        }}
      />

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Leader Navigation Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tabId) => setCurrentTab(tabId)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          openIncidentsCount={incidents.filter(i => i.status !== 'Resolved').length}
          pendingRequestsCount={requests.filter(r => r.status === 'Pending').length}
          unreadMessagesCount={channels.reduce((acc, c) => acc + c.unreadCount, 0)}
          inProgressTasksCount={tasks.filter(t => t.status === 'In Progress').length}
        />

        {/* Content View Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <AnimatedPage id={currentTab}>
            {/* 1. Leader Dashboard (Section 2.1) */}
            {currentTab === 'dashboard' && (
              <LeaderDashboardView
                volunteers={volunteers}
                attendance={attendance}
                tasks={tasks}
                incidents={incidents}
                requests={requests}
                announcements={announcements}
                onNavigateTab={setCurrentTab}
                onQuickUpdateTaskStatus={(taskId, status) => handleUpdateTaskStatus(taskId, status)}
                onRelayAnnouncement={(ann) => handleRelayOrganiserAnnouncement(ann.id, ann.suggestedTeamAction)}
                onOpenReportIncidentModal={() => setCurrentTab('incidents')}
                onOpenSubmitRequestModal={() => setCurrentTab('requests')}
                onSubmitAttendanceToOrganiser={handleSubmitSummaryToOrganiser}
              />
            )}

            {/* 2. My Team (Section 2.2) */}
            {currentTab === 'my_team' && (
              <MyTeamView
                volunteers={volunteers}
                attendance={attendance}
                onAssignToTask={(vol) => {
                  setSelectedVolunteerForRecognition(vol);
                  setCurrentTab('tasks');
                }}
              />
            )}

            {/* 3. Task Management (Section 2.3) */}
            {currentTab === 'tasks' && (
              <TeamTaskManagementView
                tasks={tasks}
                volunteers={volunteers}
                onUpdateTaskStatus={handleUpdateTaskStatus}
                onAddTaskNote={handleAddTaskNote}
                onReportTaskIssue={handleReportTaskIssue}
                onEscalateTask={handleEscalateTask}
                onAssignVolunteerSubRole={handleAssignVolunteerSubRole}
                onRemoveAssignment={handleRemoveAssignment}
                onAddNewTask={handleAddNewTask}
              />
            )}

            {/* 4. Attendance Management (Section 2.4) */}
            {currentTab === 'attendance' && (
              <AttendanceManagementView
                attendanceRecords={attendance}
                onMarkAttendance={handleMarkAttendance}
                onUpdateRemarks={handleUpdateRemarks}
                onSubmitSummaryToOrganiser={handleSubmitSummaryToOrganiser}
              />
            )}

            {/* 5. Schedule Management (Section 2.5) */}
            {currentTab === 'schedule' && (
              <TeamScheduleView
                shifts={shifts}
                volunteers={volunteers}
                onRequestScheduleChange={handleRequestScheduleChange}
                onRequestReplacement={handleRequestReplacement}
                onNotifyTeamOfShiftChange={handleNotifyTeamOfShiftChange}
              />
            )}

            {/* 6. Communication & Relay (Section 2.6) */}
            {currentTab === 'communication' && (
              <CommunicationRelayView
                announcements={announcements}
                volunteers={volunteers}
                channels={channels}
                activeChannelId={selectedChannelForMessaging}
                messages={activeMessages}
                onSelectChannel={setSelectedChannelForMessaging}
                onSendMessage={handleSendMessage}
                onRelayAnnouncement={handleRelayOrganiserAnnouncement}
                onBroadcastUrgentMessage={handleBroadcastUrgentMessage}
              />
            )}

            {/* 7. Incident Reporting (Section 2.7) */}
            {currentTab === 'incidents' && (
              <IncidentReportingView
                incidents={incidents}
                volunteers={volunteers}
                onReportIncident={handleReportIncident}
                onEscalateIncident={handleEscalateIncident}
                onResolveIncident={handleResolveIncident}
              />
            )}

            {/* 8. Training Monitoring (Section 2.8) */}
            {currentTab === 'training' && (
              <TrainingMonitoringView
                modules={trainingModules}
                volunteerTraining={volunteerTraining}
                volunteers={volunteers}
                onSendReminder={handleSendTrainingReminder}
                onReportTrainingIssueToOrganiser={handleReportTrainingIssue}
              />
            )}

            {/* 9. Operational Requests (Section 2.9) */}
            {currentTab === 'requests' && (
              <OperationalRequestsView
                requests={requests}
                onSubmitRequest={handleSubmitOperationalRequest}
              />
            )}

            {/* 10. Progress Monitoring (Section 2.10) */}
            {currentTab === 'progress' && (
              <ProgressMonitoringView
                volunteers={volunteers}
                tasks={tasks}
                attendance={attendance}
                incidents={incidents}
                feedbacks={feedbacks}
              />
            )}

            {/* 11. Volunteer Feedback (Section 2.11) */}
            {currentTab === 'feedback' && (
              <VolunteerFeedbackView
                feedbacks={feedbacks}
                volunteers={volunteers}
                onSubmitFeedback={handleSubmitFeedback}
              />
            )}

            {/* Automated Email Notifications */}
            {currentTab === 'emails' && (
              <AutomatedEmailView
                templates={emailTemplates}
                emailLogs={emailLogs}
                volunteers={volunteers}
                shifts={shifts}
                onToggleTemplate={(templateId) => {
                  setEmailTemplates(prev =>
                    prev.map(t => (t.id === templateId ? { ...t, enabled: !t.enabled } : t))
                  );
                }}
                onTriggerTestSend={(templateId, recipientEmail) => {
                  showToast(`Test notification sent to ${recipientEmail}`, 'info');
                }}
                onSendCustomBroadcast={(subject, body, recipientsGroup) => {
                  showToast(`Dispatched broadcast to ${recipientsGroup}`, 'success');
                }}
              />
            )}

            {/* Recognition & Certificates */}
            {currentTab === 'recognition' && (
              <RecognitionMilestonesView
                volunteers={volunteers}
                certificates={certificates}
                allBadges={allBadges}
                onIssueCertificate={handleIssueCertificate}
                onAwardBadge={handleAwardBadge}
                preSelectedVolunteer={selectedVolunteerForRecognition}
              />
            )}

            {/* System & Portal Settings */}
            {currentTab === 'settings' && (
              <SettingsView
                volunteers={volunteers}
                attendance={attendance}
                shifts={shifts}
                onResetData={handleResetDemoData}
              />
            )}
            </AnimatedPage>
          </div>
        </main>
      </div>

      {/* Floating Toast Bar */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div
            className={`p-4 rounded-xl shadow-xl border flex items-center gap-3 text-xs font-semibold ${
              toastMessage.type === 'success'
                ? 'bg-slate-900 text-white border-slate-800'
                : toastMessage.type === 'alert'
                ? 'bg-rose-900 text-white border-rose-800'
                : 'bg-teal-900 text-white border-teal-800'
            }`}
          >
            {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toastMessage.type === 'alert' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            {toastMessage.type === 'info' && <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />}
            <span>{toastMessage.text}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="p-1 hover:bg-white/10 rounded-md cursor-pointer ml-2"
            >
              <X className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
