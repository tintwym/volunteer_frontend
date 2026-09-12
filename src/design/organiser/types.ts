// @ts-nocheck

export type UserRole = 'organizer' | 'participant' | 'coordinator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  totalHours: number;
  badgesCount: number;
  joinedDate: string;
  organization: string;
  title: string;
  phone?: string;
  emergencyContact?: string;
  skills: string[];
}

export type CauseCategory = 
  | 'Environment' 
  | 'Food Security' 
  | 'Education' 
  | 'Healthcare' 
  | 'Animal Welfare' 
  | 'Disaster Relief'
  | 'Community Aid';

export type ShiftStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface ShiftAttendee {
  userId: string;
  userName: string;
  userEmail: string;
  avatar?: string;
  status: 'confirmed' | 'checked-in' | 'completed' | 'waitlist' | 'cancelled';
  hoursLogged?: number;
  checkInTime?: string;
  checkOutTime?: string;
  notes?: string;
}

export interface VolunteerShift {
  id: string;
  title: string;
  organization: string;
  cause: CauseCategory;
  description: string;
  location: string;
  isRemote: boolean;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  durationHours: number;
  capacity: number;
  registeredCount: number;
  status: ShiftStatus;
  organizerId: string;
  organizerName: string;
  skillsRequired: string[];
  automatedReminders: boolean;
  meetingLink?: string;
  addressDetails?: string;
  coordinatorContact: string;
  attendees: ShiftAttendee[];
}

export interface MessageReaction {
  emoji: string;
  count: number;
  users: string[]; // user IDs
}

export interface Message {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isUrgent?: boolean;
  reactions: MessageReaction[];
  attachmentName?: string;
  attachmentType?: 'pdf' | 'image' | 'doc';
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  isDirect: boolean;
  isAnnouncements?: boolean;
  otherParticipantId?: string;
  otherParticipantName?: string;
  otherParticipantAvatar?: string;
  unreadCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface EmailAutomationTrigger {
  id: string;
  name: string;
  eventTrigger: string;
  timing: string;
  active: boolean;
  subjectTemplate: string;
  bodyPreview: string;
  fullTemplateHtml: string;
  totalSent: number;
  lastTriggered: string;
  category: 'reminder' | 'confirmation' | 'recognition' | 'alert' | 'followup';
}

export interface EmailDeliveryLog {
  id: string;
  recipientEmail: string;
  recipientName: string;
  templateName: string;
  subject: string;
  sentAt: string;
  status: 'delivered' | 'opened' | 'clicked' | 'pending';
  shiftTitle?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  category: 'hours' | 'milestone' | 'leadership' | 'impact';
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
  colorBg: string;
  colorBorder: string;
}

export interface CertificateData {
  id: string;
  recipientId: string;
  recipientName: string;
  hoursVerified: number;
  issueDate: string;
  verificationCode: string;
  organizationName: string;
  directorName: string;
  directorTitle: string;
  causeFocus: string;
  qrVerificationUrl: string;
  customPraise: string;
}

export interface AppreciationLetterData {
  id: string;
  recipientId: string;
  recipientName: string;
  date: string;
  organizationName: string;
  hoursVerified: number;
  achievements: string[];
  customBody: string;
  signatoryName: string;
  signatoryTitle: string;
  salutation: string;
}

export interface MonthlyTrend {
  month: string;
  hours: number;
  volunteers: number;
  economicValue: number;
}

export interface CauseMetric {
  cause: CauseCategory;
  hours: number;
  volunteersCount: number;
  percentage: number;
  color: string;
}

export interface TopVolunteerLeader {
  id: string;
  name: string;
  avatar: string;
  hours: number;
  shiftsCount: number;
  badgeCount: number;
  rank: number;
  recentCause: string;
}

export interface ReportMetrics {
  totalHours: number;
  activeVolunteers: number;
  totalShiftsCompleted: number;
  fulfillmentRate: number;
  economicImpactValue: number; // Hourly value calculated based on Independent Sector ($33.49/hr)
  retentionRate: number;
  monthlyTrends: MonthlyTrend[];
  causeDistribution: CauseMetric[];
  topVolunteers: TopVolunteerLeader[];
}

// ==========================================
// ORGANISER ROLE COMPREHENSIVE MODULE TYPES
// ==========================================

export type EventStatus =
  | 'Draft'
  | 'Open for Registration'
  | 'Registration Closed'
  | 'Upcoming'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled'
  | 'Archived';

export interface EventActivityLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
}

export interface OrganiserEvent {
  id: string;
  name: string;
  description: string;
  category: CauseCategory;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  address: string;
  maxVolunteers: number;
  requiredVolunteers: number;
  registeredCount: number;
  confirmedCount: number;
  image: string;
  organiserName: string;
  registrationOpenDate: string;
  registrationCloseDate: string;
  status: EventStatus;
  requirements: string[];
  assignedLeaders: string[];
  teams: string[];
  activityHistory: EventActivityLog[];
}

export type VolunteerDatabaseStatus = 'Active' | 'Pending' | 'Approved' | 'Rejected' | 'Suspended';

export interface VolunteerAttendanceRecord {
  eventName: string;
  date: string;
  status: 'Present' | 'Late' | 'Absent' | 'Excused' | 'Left Early';
  hours: number;
}

export interface DetailedVolunteerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  skills: string[];
  experience: string;
  languages: string[];
  availability: string[];
  emergencyContact: string;
  preferredActivities: string[];
  previousParticipationCount: number;
  trainingCompleted: string[];
  certifications: string[];
  attendanceRate: number;
  attendanceHistory: VolunteerAttendanceRecord[];
  currentTeam: string;
  currentAssignment: string;
  status: VolunteerDatabaseStatus;
  feedbackScore: number;
}

export interface VolunteerLeaderProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  roleTitle: string;
  assignedEventId: string;
  assignedEventName: string;
  teamId: string;
  teamName: string;
  responsibilities: string;
  maxVolunteers: number;
  assignedVolunteersCount: number;
  attendanceManagedRate: number;
  tasksCompletedCount: number;
  incidentsReportedCount: number;
  messagesSentCount: number;
  status: 'Active' | 'Suspended';
  volunteers: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    hours: number;
  }[];
}

export interface OperationalTeam {
  id: string;
  name: string;
  eventId: string;
  eventName: string;
  leaderId: string;
  leaderName: string;
  leaderAvatar: string;
  capacity: number;
  assignedCount: number;
  responsibilities: string;
  attendanceRate: number;
  taskCompletionRate: number;
  members: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    status: string;
  }[];
}

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TaskStatus = 'Not Started' | 'Assigned' | 'In Progress' | 'Completed' | 'Cancelled';

export interface OperationalTask {
  id: string;
  name: string;
  description: string;
  teamId: string;
  teamName: string;
  assignedLeaderId: string;
  assignedLeaderName: string;
  assignedVolunteers: {
    id: string;
    name: string;
    avatar: string;
  }[];
  location: string;
  startTime: string;
  endTime: string;
  priority: TaskPriority;
  requiredSkills: string[];
  instructions: string;
  status: TaskStatus;
  progress: number;
  dueDate: string;
}

export interface OperationalShiftSchedule {
  id: string;
  name: string; // e.g. 'Morning', 'Afternoon', 'Evening'
  timeWindow: string; // e.g. '8:00–12:00'
  teamId: string;
  teamName: string;
  assignedLeader: string;
  requiredVolunteers: number;
  assignedVolunteers: number;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  swapRequestsCount: number;
  coveragePercentage: number;
}

export type AttendanceStatus = 'Present' | 'Late' | 'Absent' | 'Excused' | 'Left Early';

export interface AttendanceRecordItem {
  id: string;
  volunteerId: string;
  volunteerName: string;
  volunteerAvatar: string;
  teamName: string;
  leaderName: string;
  shiftName: string;
  date: string;
  checkInTime: string;
  checkOutTime: string;
  status: AttendanceStatus;
  notes?: string;
  correctedBy?: string;
}

export type CommunicationLevel =
  | 'All Volunteers'
  | 'Volunteer Leaders'
  | 'Individual Team'
  | 'Individual Volunteer';

export interface BroadcastAnnouncement {
  id: string;
  title: string;
  level: CommunicationLevel;
  targetName: string;
  message: string;
  sentAt: string;
  isEmergency: boolean;
  sentBy: string;
  readCount: number;
  totalRecipients: number;
  status: 'Sent' | 'Scheduled';
}

export interface TrainingMaterial {
  id: string;
  title: string;
  category: string;
  description: string;
  type: 'document' | 'video' | 'guideline' | 'course';
  duration: string;
  isMandatory: boolean;
  completedCount: number;
  totalAssigned: number;
  url: string;
  modules: string[];
}

export type IncidentType =
  | 'Volunteer injury'
  | 'Missing equipment'
  | 'Lost person'
  | 'Security issue'
  | 'Conflict'
  | 'Medical emergency'
  | 'Safety issue'
  | 'Volunteer misconduct';

export type IncidentStatus =
  | 'Reported'
  | 'Under Investigation'
  | 'Action Required'
  | 'Escalated'
  | 'Resolved'
  | 'Closed';

export type IncidentSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface IncidentReport {
  id: string;
  title: string;
  type: IncidentType;
  severity: IncidentSeverity;
  reportedBy: string;
  reportedAt: string;
  assignedLeader: string;
  location: string;
  status: IncidentStatus;
  description: string;
  evidence: string;
  actionTaken: string;
  notes: {
    timestamp: string;
    author: string;
    text: string;
  }[];
}

export type ApprovalRequestType =
  | 'Volunteer registration'
  | 'Volunteer Registration'
  | 'Leader Appointment'
  | 'Shift change'
  | 'Shift Swap'
  | 'Team transfer'
  | 'Leave/absence'
  | 'Leave Request'
  | 'Additional volunteers'
  | 'Task reassignment'
  | 'Equipment request'
  | 'Expense Reimbursement'
  | 'Role Change'
  | 'Schedule change';

export type ApprovalType = ApprovalRequestType;

export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected' | 'Clarification Requested';

export interface ApprovalRequestItem {
  id: string;
  type: ApprovalRequestType;
  requestedBy: string;
  requestorRole: string;
  avatar: string;
  details: string;
  submittedAt: string;
  status: ApprovalStatus;
  remarks: string;
  priority: 'Low' | 'Medium' | 'High';
  history: {
    date: string;
    action: string;
    author: string;
    note?: string;
  }[];
}

export interface FeedbackSurveyResponse {
  id: string;
  respondentName: string;
  avatar: string;
  rating: number;
  feedbackText: string;
  submittedAt: string;
  sentiment: 'Positive' | 'Neutral' | 'Constructive';
  category: string;
}

export interface FeedbackSurveyItem {
  id: string;
  title: string;
  eventName?: string;
  targetGroup?: 'Volunteers' | 'Volunteer Leaders' | 'Participants/attendees' | string;
  targetAudience?: string;
  createdDate?: string;
  status: 'Active' | 'Closed';
  responsesCount?: number;
  totalResponses?: number;
  averageRating: number;
  netPromoterScore?: number;
  npsScore?: number;
  questions?: {
    id: string;
    question: string;
    type: 'rating' | 'text' | 'choice';
  }[];
  recentResponses?: {
    id: string;
    author: string;
    role: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  responses?: FeedbackSurveyResponse[];
}

export type FeedbackResponseItem = FeedbackSurveyResponse;

export interface UserRoleItem {
  id: string;
  name: string;
  email: string;
  role: 'Organiser' | 'Volunteer Leader' | 'Volunteer';
  status: 'Active' | 'Inactive' | 'Suspended';
  lastActive: string;
  assignedTeam: string;
  permissions: string[];
}

export interface OrganiserSystemSettings {
  organizationName: string;
  supportEmail: string;
  emergencyHotline: string;
  autoApproveRegistrations: boolean;
  shiftSwapRequiresApproval: boolean;
  autoSend24hReminders: boolean;
  requireSafetyTrainingBeforeShift: boolean;
  maxWeeklyVolunteerHours: number;
  defaultEventCapacity: number;
  incidentEscalationEmail: string;
  legalName?: string;
  taxId?: string;
  missionStatement?: string;
  timezone?: string;
  hourlyValueRate?: number;
  minVolunteerAge?: number;
  requireLiabilityWaiver?: boolean;
  requireBackgroundCheck?: boolean;
  requireEmergencyContact?: boolean;
  checkInGraceMinutes?: number;
  enableQrKioskCheckin?: boolean;
  enableGeolocationVerification?: boolean;
  requirePhotoVerification?: boolean;
  enableSmsUrgentAlerts?: boolean;
  enableWeeklyDigest?: boolean;
  twoFactorEnforced?: boolean;
  sessionTimeoutMinutes?: number;
}
