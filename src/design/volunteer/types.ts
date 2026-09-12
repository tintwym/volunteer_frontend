// @ts-nocheck

export interface VolunteerProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  phone: string;
  location: string;
  joinDate: string;
  totalHours: number;
  pendingHours: number;
  completedEventsCount: number;
  impactScore: number;
  bio: string;
  emergencyContact: string;
  skills: string[];
  languages: string[];
  experienceYears: number;
  preferredActivities: string[];
  certifications: string[];
  shareContactWithTeam: boolean;
  availability: {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
  };
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    inApp: boolean;
    reminder24h: boolean;
    urgentAlerts: boolean;
  };
}

export type EventCategory = 
  | 'Environment' 
  | 'Food Relief' 
  | 'Education & Youth' 
  | 'Healthcare & Wellness' 
  | 'Animal Welfare' 
  | 'Community Aid';

export interface EventPosition {
  id: string;
  title: string;
  spotsTotal: number;
  spotsFilled: number;
  requirements: string;
}

export interface EventShift {
  id: string;
  date: string;
  formattedDate: string;
  startTime: string;
  endTime: string;
  activity: string;
  location: string;
  breakTimes?: string;
}

export type ParticipationStatus = 
  | 'Applied' 
  | 'Pending' 
  | 'Approved' 
  | 'Rejected' 
  | 'Waitlisted' 
  | 'Cancelled' 
  | 'Completed';

export interface VolunteerEvent {
  id: string;
  title: string;
  organization: string;
  category: EventCategory;
  description: string;
  location: string;
  isVirtual: boolean;
  date: string;
  formattedDate: string;
  startTime: string;
  endTime: string;
  hours: number;
  duration: string;
  spotsTotal: number;
  spotsFilled: number;
  isSignedUp: boolean;
  signupDate?: string;
  participationStatus?: ParticipationStatus;
  selectedRole?: string;
  requirements: string[];
  skillsNeeded: string[];
  trainingRequirements: string[];
  availablePositions: EventPosition[];
  shifts: EventShift[];
  instructions?: string;
  teamName?: string;
  organizer: {
    name: string;
    role: string;
    email: string;
    avatar: string;
    phone?: string;
  };
}

export type ServiceStatus = 'verified' | 'pending' | 'flagged';

export interface ServiceRecord {
  id: string;
  eventId?: string;
  eventTitle: string;
  organization: string;
  category: EventCategory;
  date: string;
  hours: number;
  status: ServiceStatus;
  supervisorName: string;
  supervisorEmail: string;
  verificationCode: string;
  notes: string;
}

export type BadgeRarity = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface DigitalBadge {
  id: string;
  title: string;
  category: string;
  description: string;
  requirement: string;
  rarity: BadgeRarity;
  iconName: string;
  earned: boolean;
  earnedDate?: string;
  currentProgress: number;
  targetProgress: number;
  progressUnit: string;
  colorTheme: {
    bg: string;
    border: string;
    text: string;
    accent: string;
  };
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isVolunteer: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  role: string;
  avatar: string;
  type: 'direct' | 'channel';
  isOnline: boolean;
  unreadCount: number;
  lastMessage: string;
  lastTimestamp: string;
  messages: ChatMessage[];
}

export type NotificationType = 
  | 'event_signup' 
  | 'shift_reminder' 
  | 'hours_verified' 
  | 'badge_unlocked' 
  | 'certificate_ready'
  | 'organizer_announcement';

export interface AutomatedEmailNotification {
  id: string;
  type: NotificationType;
  subject: string;
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  timestamp: string;
  isRead: boolean;
  previewText: string;
  htmlContent: string;
  actionLabel?: string;
  actionUrlTab?: string;
}

// 3.6 Tasks
export type TaskStatus = 'Assigned' | 'Accepted' | 'In Progress' | 'Completed';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface VolunteerTask {
  id: string;
  eventId: string;
  eventTitle: string;
  title: string;
  instructions: string;
  location: string;
  deadline: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedLeader: string;
  progress: number;
  problemReported?: string;
}

// 3.7 Team Module
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  phone?: string;
  email?: string;
  allowContactShare: boolean;
  isLeader?: boolean;
}

export interface TeamAnnouncement {
  id: string;
  author: string;
  role: string;
  text: string;
  date: string;
  priority: 'normal' | 'urgent';
}

export interface TeamInfo {
  id: string;
  eventId: string;
  eventTitle: string;
  teamName: string;
  leader: {
    name: string;
    role: string;
    avatar: string;
    phone: string;
    email: string;
  };
  members: TeamMember[];
  responsibilities: string[];
  meetingPoint: string;
  announcements: TeamAnnouncement[];
}

// 3.8 Attendance
export type CheckInMethod = 'QR Code' | 'Event Code' | 'Location GPS' | 'Leader Confirmation' | 'Manual';
export type AttendanceStatus = 'Checked In' | 'Completed' | 'Pending' | 'Missed' | 'Problem Reported';

export interface AttendanceRecord {
  id: string;
  eventId: string;
  eventTitle: string;
  shiftDate: string;
  scheduledStart: string;
  scheduledEnd: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  totalHours: number;
  method: CheckInMethod;
  status: AttendanceStatus;
  verificationCode: string;
  locationValidationStatus?: 'Verified GPS' | 'Venue WiFi' | 'Manual Override';
  notes?: string;
}

// 3.9 Training Module
export type TrainingStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Expired';

export interface TrainingQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TrainingMaterial {
  title: string;
  type: 'pdf' | 'doc' | 'video' | 'link';
  readTime: string;
  summary: string;
}

export interface TrainingCourse {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  status: TrainingStatus;
  progressPercent: number;
  materials: TrainingMaterial[];
  quiz: TrainingQuizQuestion[];
  score?: number;
  passingScore: number;
  dueDate: string;
  completedDate?: string;
  certificateId?: string;
}

// 3.10 Documents
export type DocumentCategory = 
  | 'Guidelines' 
  | 'Code of Conduct' 
  | 'Safety' 
  | 'Venue Map' 
  | 'Emergency' 
  | 'Handbook' 
  | 'Shift Instructions';

export interface EventDocument {
  id: string;
  eventId?: string;
  eventTitle?: string;
  title: string;
  category: DocumentCategory;
  description: string;
  version: string;
  updatedDate: string;
  fileSize: string;
  fileType: string;
  contentPreview: string;
  downloadUrl?: string;
}

// 3.11 Notifications
export type SystemNotificationType = 'Informational' | 'Reminder' | 'Important' | 'Emergency';

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: SystemNotificationType;
  category: string;
  timestamp: string;
  isRead: boolean;
  actionLink?: string;
  actionLabel?: string;
}

// 3.12 Requests
export type RequestType = 
  | 'Shift Change' 
  | 'Absence' 
  | 'Team Transfer' 
  | 'Task Clarification' 
  | 'Schedule Conflict' 
  | 'Assistance Request';

export type RequestStatus = 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Escalated';

export interface VolunteerRequest {
  id: string;
  type: RequestType;
  subject: string;
  details: string;
  status: RequestStatus;
  submittedDate: string;
  eventId?: string;
  eventTitle?: string;
  leaderResponse?: string;
  urgency: 'Normal' | 'High';
}

// 3.13 Incident Reporting
export type IncidentCategory = 
  | 'Safety issue' 
  | 'Medical emergency' 
  | 'Lost item' 
  | 'Equipment problem' 
  | 'Conflict' 
  | 'Harassment/misconduct' 
  | 'Venue problem';

export type IncidentUrgency = 'Low' | 'Medium' | 'High' | 'Critical';
export type IncidentStatus = 'Submitted' | 'Investigating' | 'Resolved' | 'Closed';

export interface IncidentReport {
  id: string;
  category: IncidentCategory;
  title: string;
  description: string;
  location: string;
  urgency: IncidentUrgency;
  isRestrictedAccess: boolean;
  status: IncidentStatus;
  submittedDate: string;
  incidentTime: string;
  resolutionNotes?: string;
}

// 3.15 Feedback
export interface EventFeedback {
  id: string;
  eventId: string;
  eventTitle: string;
  submittedDate: string;
  ratings: {
    eventOrganisation: number;
    teamLeader: number;
    taskSuitability: number;
    communication: number;
    training: number;
    venue: number;
    schedule: number;
    overallExperience: number;
  };
  comments: string;
  suggestions: string;
}

export interface AppSettings {
  // General & Regional
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  preferredLanguage: string;
  travelRadiusMiles: number;
  maxWeeklyHours: number;
  transportationMode?: 'driving' | 'transit' | 'bicycle' | 'walking';
  calendarSyncEnabled?: boolean;

  // Notification & Alerts
  emailShiftConfirmation: boolean;
  emailReminders24h: boolean;
  emailMonthlyDigest: boolean;
  smsShiftAlerts: boolean;
  smsEmergencyBroadcasts: boolean;
  inAppSounds: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;

  // Privacy & Sharing
  shareContactWithTeam: boolean;
  showOnCommunityLeaderboard: boolean;
  allowDirectMessagingFromVolunteers: boolean;
  emergencyContactVisibility: 'all_supervisors' | 'team_leader_only';

  // Check-in & Hardware
  autoPromptGeofenceCheckin: boolean;
  vibrateOnScan: boolean;
  defaultCheckInMethod: 'QR' | 'GPS' | 'PIN';

  // Appearance & Accessibility
  themeMode: 'light' | 'system';
  highContrastMode: boolean;
  compactView: boolean;
  fontSizeScale: 'normal' | 'large';

  // Security & Compliance
  twoFactorAuth: boolean;
  sessionTimeoutMinutes: number;
  backgroundCheckStatus: 'Cleared' | 'Pending' | 'Expired';
  backgroundCheckDate: string;
  liabilityWaiverSigned: boolean;
  codeOfConductAccepted: boolean;
}

