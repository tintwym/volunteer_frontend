import {
  api,
  avatarFor,
  escapeHtml,
  formatClock,
  formatDate,
  formatTime,
  timeAgo,
  todayIso,
  type ApiBadgeSummary,
  type ApiEvent,
  type ApiHourLog,
  type ApiIncident,
  type ApiMessage,
  type ApiMySummary,
  type ApiNotification,
  type ApiRegistration,
  type ApiTask,
  type Channel,
  type IncidentSeverity,
  type TaskStatus as ApiTaskStatus,
} from "@/lib/api";
import type { AuthUser } from "@/lib/auth";
import { syncHourBadges } from "./data/milestones";
import type {
  AttendanceRecord,
  AutomatedEmailNotification,
  Conversation,
  DigitalBadge,
  EventCategory,
  IncidentCategory,
  IncidentReport,
  IncidentUrgency,
  NotificationType,
  ParticipationStatus,
  ServiceRecord,
  TaskStatus,
  VolunteerEvent,
  VolunteerProfile,
  VolunteerTask,
} from "./types";

const CATEGORY_MAP: Record<string, EventCategory> = {
  environment: "Environment",
  "food security": "Food Relief",
  "food relief": "Food Relief",
  food: "Food Relief",
  education: "Education & Youth",
  "education & youth": "Education & Youth",
  youth: "Education & Youth",
  health: "Healthcare & Wellness",
  healthcare: "Healthcare & Wellness",
  "healthcare & wellness": "Healthcare & Wellness",
  animals: "Animal Welfare",
  "animal welfare": "Animal Welfare",
};

export function toCategory(value: string | null | undefined): EventCategory {
  return CATEGORY_MAP[(value ?? "").trim().toLowerCase()] ?? "Community Aid";
}

const PARTICIPATION: Record<string, ParticipationStatus> = {
  CONFIRMED: "Approved",
  CHECKED_IN: "Approved",
  WAITLIST: "Waitlisted",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
  NO_SHOW: "Rejected",
};

export function toEvent(e: ApiEvent, organization: string): VolunteerEvent {
  const status = e.myRegistrationStatus;
  const location = e.remote ? "Online" : [e.venue, e.address].filter(Boolean).join(", ") || "To be confirmed";
  return {
    id: e.id,
    title: e.name,
    organization,
    category: toCategory(e.category),
    description: e.description ?? "",
    location,
    isVirtual: e.remote,
    date: e.date,
    formattedDate: formatDate(e.date),
    startTime: formatTime(e.startTime),
    endTime: formatTime(e.endTime),
    hours: e.durationHours,
    duration: `${e.durationHours} hours`,
    spotsTotal: e.capacity,
    spotsFilled: e.registeredCount,
    isSignedUp: status === "CONFIRMED" || status === "WAITLIST" || status === "CHECKED_IN",
    closed: e.status !== "OPEN" || e.date < todayIso(),
    participationStatus: status ? PARTICIPATION[status] : undefined,
    requirements: [],
    skillsNeeded: [],
    trainingRequirements: [],
    availablePositions: [],
    shifts: [
      {
        id: `${e.id}-shift`,
        date: e.date,
        formattedDate: formatDate(e.date),
        startTime: formatTime(e.startTime),
        endTime: formatTime(e.endTime),
        activity: e.name,
        location,
      },
    ],
    instructions: e.meetingLink ? `Join online: ${e.meetingLink}` : undefined,
    organizer: { name: organization, role: "Organizer", email: "", avatar: avatarFor(organization) },
  };
}

export function toServiceRecord(h: ApiHourLog, organization: string): ServiceRecord {
  return {
    id: h.id,
    eventId: h.eventId ?? undefined,
    eventTitle: h.eventName ?? h.description ?? "Volunteer work",
    organization,
    category: "Community Aid",
    date: h.workDate,
    hours: h.hours,
    status: h.status === "APPROVED" ? "verified" : h.status === "PENDING" ? "pending" : "flagged",
    supervisorName: h.reviewedByName ?? "Awaiting review",
    supervisorEmail: "",
    verificationCode: h.id.slice(0, 8).toUpperCase(),
    notes: h.reviewNote ?? h.description ?? "",
  };
}

const TASK_STATUS: Record<ApiTaskStatus, TaskStatus> = {
  TODO: "Assigned",
  IN_PROGRESS: "In Progress",
  DONE: "Completed",
  CANCELLED: "Completed",
};

export function toApiTaskStatus(status: TaskStatus): ApiTaskStatus {
  if (status === "Completed") return "DONE";
  if (status === "In Progress") return "IN_PROGRESS";
  return "TODO";
}

export function toTask(t: ApiTask): VolunteerTask {
  const status = TASK_STATUS[t.status];
  return {
    id: t.id,
    eventId: t.eventId ?? "",
    eventTitle: t.eventName ?? "General",
    title: t.title,
    instructions: t.description ?? "",
    location: t.eventName ?? "",
    deadline: t.dueDate ? formatDate(t.dueDate) : "No deadline",
    status,
    priority: t.priority === "LOW" ? "Low" : t.priority === "MEDIUM" ? "Medium" : "High",
    assignedLeader: t.createdByName ?? "Organizer",
    progress: status === "Completed" ? 100 : status === "In Progress" ? 50 : 0,
  };
}

export function toAttendance(r: ApiRegistration): AttendanceRecord {
  const status: AttendanceRecord["status"] =
    r.status === "CHECKED_IN"
      ? "Checked In"
      : r.status === "COMPLETED"
        ? "Completed"
        : r.status === "NO_SHOW"
          ? "Missed"
          : "Pending";
  return {
    id: r.id,
    eventId: r.eventId,
    eventTitle: r.eventName,
    shiftDate: formatDate(r.eventDate),
    scheduledStart: formatTime(r.startTime),
    scheduledEnd: formatTime(r.endTime),
    checkInTime: formatClock(r.checkedInAt),
    checkOutTime: formatClock(r.checkedOutAt),
    checkInAt: r.checkedInAt ?? undefined,
    totalHours: r.hours ?? 0,
    method: "Event Code",
    status,
    verificationCode: r.id.slice(0, 8).toUpperCase(),
    notes: r.notes ?? undefined,
  };
}

const INCIDENT_PREFIX = /^\[(.+?)\]\s*/;

export function toIncident(i: ApiIncident): IncidentReport {
  const match = i.title.match(INCIDENT_PREFIX);
  const urgency: IncidentUrgency =
    i.severity === "LOW" ? "Low" : i.severity === "MEDIUM" ? "Medium" : i.severity === "HIGH" ? "High" : "Critical";
  return {
    id: i.id,
    category: (match?.[1] as IncidentCategory) ?? "Safety issue",
    title: match ? i.title.slice(match[0].length) : i.title,
    description: i.description,
    location: i.eventName ?? "",
    urgency,
    isRestrictedAccess: false,
    status: i.status === "RESOLVED" ? "Resolved" : "Submitted",
    submittedDate: formatDate(i.createdAt.slice(0, 10)),
    incidentTime: formatClock(i.createdAt) ?? "",
    resolutionNotes: i.resolution ?? undefined,
  };
}

export function toSeverity(urgency: IncidentUrgency): IncidentSeverity {
  return urgency.toUpperCase() as IncidentSeverity;
}

const NOTIFICATION_TYPE: Record<string, NotificationType> = {
  REGISTRATION_CONFIRMED: "event_signup",
  EVENT_CANCELLED: "organizer_announcement",
  HOURS_APPROVED: "hours_verified",
  HOURS_REJECTED: "hours_verified",
  BADGE_EARNED: "badge_unlocked",
  TASK_ASSIGNED: "shift_reminder",
  MESSAGE: "organizer_announcement",
};

const LINK_TAB: Record<string, [string, string]> = {
  "/hours": ["reports", "View hours"],
  "/badges": ["badges", "View badges"],
  "/tasks": ["tasks", "Open tasks"],
  "/events": ["my-events", "View my events"],
  "/messages": ["messages", "Open messages"],
  "/incidents": ["incidents", "View incidents"],
};

export function toNotification(n: ApiNotification, organization: string, email: string): AutomatedEmailNotification {
  const [tab, label] = (n.link && LINK_TAB[n.link]) || [undefined, undefined];
  const body = n.body ?? "";
  return {
    id: n.id,
    type: NOTIFICATION_TYPE[n.type] ?? "organizer_announcement",
    subject: n.title,
    recipientEmail: email,
    senderName: organization,
    senderEmail: "notifications@commonground.org",
    timestamp: timeAgo(n.createdAt),
    isRead: n.read,
    previewText: body || n.title,
    htmlContent: `<div style="font-family: sans-serif; line-height: 1.6; color: #1e293b;"><h2 style="color: #059669; margin-bottom: 8px;">${escapeHtml(
      n.title,
    )}</h2>${body ? `<p>${escapeHtml(body)}</p>` : ""}</div>`,
    actionLabel: label,
    actionUrlTab: tab,
  };
}

export const CHANNELS: { channel: Channel; name: string; role: string }[] = [
  { channel: "GENERAL", name: "General", role: "Everyone in your organization" },
  { channel: "ANNOUNCEMENTS", name: "Announcements", role: "Updates from organizers" },
];

export function toConversation(
  channel: Channel,
  messages: ApiMessage[],
  userId: string,
  lastSeen: string | null,
): Conversation {
  const meta = CHANNELS.find((c) => c.channel === channel)!;
  const ordered = [...messages].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const last = ordered[ordered.length - 1];
  return {
    id: channel,
    name: meta.name,
    role: meta.role,
    avatar: avatarFor(meta.name),
    type: "channel",
    isOnline: true,
    unreadCount: ordered.filter((m) => m.senderId !== userId && (!lastSeen || m.createdAt > lastSeen)).length,
    lastMessage: last?.content ?? "No messages yet",
    lastTimestamp: last ? timeAgo(last.createdAt) : "",
    messages: ordered.map((m) => ({
      id: m.id,
      senderId: m.senderId ?? "system",
      senderName: m.senderName,
      senderRole: m.senderRole === "ORGANIZER" ? "Organizer" : m.senderRole === "VOLUNTEER_LEADER" ? "Leader" : "Volunteer",
      senderAvatar: avatarFor(m.senderName),
      text: m.urgent ? `🚨 ${m.content}` : m.content,
      timestamp: timeAgo(m.createdAt),
      isVolunteer: m.senderId === userId,
    })),
  };
}

/** Prototype badges with the sample volunteer's progress cleared. */
export function freshBadges(badges: DigitalBadge[]): DigitalBadge[] {
  return badges.map((b) => ({ ...b, earned: false, earnedDate: undefined, currentProgress: 0 }));
}

export function syncLiveBadges(badges: DigitalBadge[], summary: ApiBadgeSummary): DigitalBadge[] {
  const earnedDates = new Map(
    summary.badges.filter((b) => b.earned && b.earnedDate).map((b) => [b.hours, b.earnedDate!]),
  );
  return syncHourBadges(badges, summary.totalHours).map((b) => {
    if (b.category !== "Milestone" || b.progressUnit !== "hours" || !b.earned) return b;
    const date = earnedDates.get(b.targetProgress);
    return date ? { ...b, earnedDate: formatDate(date) } : b;
  });
}

/** Fields the API doesn't store yet; kept in this browser, per account. */
export type LocalProfileExtras = Partial<
  Pick<
    VolunteerProfile,
    | "location"
    | "bio"
    | "emergencyContact"
    | "skills"
    | "languages"
    | "experienceYears"
    | "preferredActivities"
    | "certifications"
    | "shareContactWithTeam"
    | "availability"
    | "notificationPreferences"
    | "avatar"
  >
>;

export function toProfile(
  user: AuthUser,
  base: VolunteerProfile,
  extras: LocalProfileExtras,
  summary: ApiMySummary | null,
  pendingHours: number,
): VolunteerProfile {
  return {
    ...base,
    location: "",
    bio: "",
    emergencyContact: "",
    skills: [],
    languages: [],
    experienceYears: 0,
    preferredActivities: [],
    certifications: [],
    ...extras,
    id: user.id,
    name: user.fullName,
    email: user.email,
    phone: user.phone ?? "",
    role: "Volunteer",
    avatar: extras.avatar ?? avatarFor(user.fullName),
    joinDate: base.joinDate,
    totalHours: summary?.totalHours ?? 0,
    pendingHours,
    completedEventsCount: summary?.completedEvents ?? 0,
    impactScore: Math.round((summary?.totalHours ?? 0) * 10),
  };
}

export interface LiveSnapshot {
  events: VolunteerEvent[];
  serviceRecords: ServiceRecord[];
  tasks: VolunteerTask[];
  attendance: AttendanceRecord[];
  registrations: ApiRegistration[];
  incidents: IncidentReport[];
  notifications: AutomatedEmailNotification[];
  messages: Record<Channel, ApiMessage[]>;
  summary: ApiMySummary;
  badgeSummary: ApiBadgeSummary;
  pendingHours: number;
}

export async function loadVolunteerData(user: AuthUser): Promise<LiveSnapshot> {
  const org = user.organizationName ?? "Your organization";
  const [events, hours, summary, badgeSummary, registrations, tasks, incidents, notifications, general, announcements] =
    await Promise.all([
      api.events.list(),
      api.hours.mine(),
      api.me.summary(),
      api.me.badges(),
      api.me.registrations(),
      api.me.tasks(),
      api.incidents.list(),
      api.me.notifications(),
      api.messages.list("GENERAL"),
      api.messages.list("ANNOUNCEMENTS"),
    ]);
  return {
    events: events.filter((e) => e.status !== "DRAFT").map((e) => toEvent(e, org)),
    serviceRecords: hours.map((h) => toServiceRecord(h, org)),
    tasks: tasks.filter((t) => t.status !== "CANCELLED").map(toTask),
    attendance: registrations.filter((r) => r.checkedInAt || r.status === "NO_SHOW").map(toAttendance),
    registrations,
    incidents: incidents.map(toIncident),
    notifications: notifications.items.map((n) => toNotification(n, org, user.email)),
    messages: { GENERAL: general, ANNOUNCEMENTS: announcements, LEADERS: [] },
    summary,
    badgeSummary,
    pendingHours: hours.filter((h) => h.status === "PENDING").reduce((sum, h) => sum + h.hours, 0),
  };
}
