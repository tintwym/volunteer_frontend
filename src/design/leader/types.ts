// @ts-nocheck

export type VolunteerStatus = 'Active' | 'On-boarding' | 'Inactive' | 'On Leave';
export type BackgroundCheckStatus = 'Approved' | 'Pending' | 'Expired';

export interface Badge {
  id: string;
  name: string;
  iconName: string;
  description: string;
  hoursRequired: number;
  category: 'Milestone' | 'Skill' | 'Leadership' | 'Reliability';
  dateAwarded?: string;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'Volunteer' | 'Team Lead' | 'Specialist' | 'New Recruit';
  status: VolunteerStatus;
  totalHours: number;
  verifiedHours: number;
  pendingHours: number;
  joinedDate: string;
  skills: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  backgroundCheckStatus: BackgroundCheckStatus;
  badges: Badge[];
  attendanceRate: number; // percentage
  shiftsCompleted: number;
  notes: string;
}

export type EventCategory = 
  | 'Community Food Pantry'
  | 'Youth Mentorship'
  | 'Park Revitalization'
  | 'Emergency Shelter Support'
  | 'Senior Outreach'
  | 'Disaster Relief';

export interface ShiftAttendance {
  volunteerId: string;
  status: 'Registered' | 'Attended' | 'Late' | 'Excused' | 'No-Show';
  hoursLogged: number;
  verified: boolean;
  notes?: string;
}

export interface ShiftEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. "09:00"
  endTime: string; // e.g. "13:00"
  durationHours: number;
  location: string;
  leadOrganizer: string;
  description: string;
  requiredVolunteers: number;
  assignedVolunteerIds: string[];
  waitlistVolunteerIds: string[];
  requiredSkills: string[];
  status: 'Upcoming' | 'In Progress' | 'Completed' | 'Cancelled';
  attendance: Record<string, ShiftAttendance>;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isAnnouncement?: boolean;
  priority?: 'normal' | 'urgent';
}

export interface ChatChannel {
  id: string;
  name: string;
  description: string;
  isDirect: boolean;
  recipientVolunteerId?: string;
  unreadCount: number;
}

export interface AutomatedEmailTemplate {
  id: string;
  title: string;
  triggerType: 'shift_reminder_24h' | 'shift_reminder_2h' | 'hours_confirmed' | 'milestone_achieved' | 'inactivity_checkin' | 'emergency_broadcast';
  subjectTemplate: string;
  bodyTemplate: string;
  enabled: boolean;
  lastTriggered?: string;
  sentCount: number;
}

export interface EmailLogEntry {
  id: string;
  recipientName: string;
  recipientEmail: string;
  subject: string;
  bodyHtml: string;
  timestamp: string;
  status: 'Delivered' | 'Opened' | 'Queued';
  type: string;
}

export interface CertificateRecord {
  id: string;
  volunteerId: string;
  volunteerName: string;
  hours: number;
  organization: string;
  issuedDate: string;
  signatoryLeader: string;
  signatoryTitle: string;
  programFocus: string;
  certificateNumber: string;
}

export interface AppreciationLetterRecord {
  id: string;
  volunteerId: string;
  volunteerName: string;
  date: string;
  tone: 'Warm & Inspiring' | 'Official Non-Profit Endorsement' | 'Academic / Career Recommendation';
  letterText: string;
  signatory: string;
  signatoryRole: string;
}

// ==========================================
// VOLUNTEER LEADER SPECIFIC DATA TYPES
// ==========================================

export type TaskStatus = 'Todo' | 'In Progress' | 'Review' | 'Completed' | 'Escalated';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface VolunteerSubAssignment {
  volunteerId: string;
  volunteerName: string;
  subRole: string; // e.g. "Check-in Desk", "Badge Printing", "Queue Management"
}

export interface TeamTask {
  id: string;
  title: string;
  description: string;
  zone: string;
  location: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignments: VolunteerSubAssignment[];
  deadline: string;
  completedAt?: string;
  notes: string;
  issuesReported: string[];
  isEscalated: boolean;
}

export type AttendanceMark = 'Present' | 'Late' | 'Absent' | 'Early Departure' | 'Unrecorded';

export interface TodayAttendanceRecord {
  volunteerId: string;
  volunteerName: string;
  volunteerRole: string;
  avatar: string;
  status: AttendanceMark;
  checkInTime?: string;
  checkOutTime?: string;
  remarks: string;
  isSubmittedToOrganiser: boolean;
}

export type IncidentCategory = 
  | 'Medical / First Aid'
  | 'Facility / Venue'
  | 'Equipment / Supplies'
  | 'Attendee / Conflict'
  | 'Safety / Hazard'
  | 'Staffing Shortage';

export type IncidentSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type IncidentStatus = 'Reported' | 'In Review' | 'Resolved';

export interface IncidentReport {
  id: string;
  category: IncidentCategory;
  title: string;
  description: string;
  severity: IncidentSeverity;
  affectedTeam: string;
  affectedVolunteerId?: string;
  affectedVolunteerName?: string;
  location: string;
  timestamp: string;
  status: IncidentStatus;
  reportedBy: string;
  notes: string;
  organiserResponse?: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  isMandatory: boolean;
  durationMinutes: number;
  category: string;
}

export interface VolunteerTrainingStatus {
  volunteerId: string;
  volunteerName: string;
  moduleId: string;
  moduleTitle: string;
  status: 'Completed' | 'In Progress' | 'Overdue' | 'Not Started';
  completedDate?: string;
  score?: number;
}

export type RequestCategory = 
  | 'Additional volunteers'
  | 'Equipment'
  | 'Schedule change'
  | 'Team member replacement'
  | 'Venue support'
  | 'Transportation'
  | 'Emergency assistance';

export type RequestStatus = 'Pending' | 'Approved' | 'Rejected';

export interface OperationalRequest {
  id: string;
  type: RequestCategory;
  title: string;
  description: string;
  urgency: 'Normal' | 'Urgent' | 'Critical';
  status: RequestStatus;
  submittedAt: string;
  leaderId: string;
  leaderName: string;
  teamName: string;
  organiserFeedback?: string;
  allocatedResources?: string;
}

export type OperationalRequestType = RequestCategory;
export type OperationalRequestUrgency = 'Normal' | 'Urgent' | 'Critical';

export type FeedbackRecommendation = 
  | 'Recommend for Team Lead'
  | 'Exceeds Expectations'
  | 'Consistent Contributor'
  | 'Requires Additional Mentoring'
  | 'Recommend Zone Reassignment';

export interface VolunteerFeedbackRecord {
  id: string;
  volunteerId: string;
  volunteerName: string;
  leaderName: string;
  date: string;
  ratings: {
    attendance: number; // 1-5
    reliability: number;
    teamwork: number;
    communication: number;
    taskPerformance: number;
    leadership: number;
    professionalism: number;
  };
  comments: string;
  recommendation: FeedbackRecommendation;
}

export interface OrganiserAnnouncement {
  id: string;
  title: string;
  message: string;
  organiserName: string;
  timestamp: string;
  priority: 'Normal' | 'High' | 'Urgent';
  relayedToTeam: boolean;
  suggestedTeamAction?: string;
}

