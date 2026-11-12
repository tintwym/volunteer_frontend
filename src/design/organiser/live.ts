import {
  api,
  avatarFor,
  formatClock,
  timeAgo,
  toApiTime,
  toHHmm,
  todayIso,
  type ApiEvent,
  type ApiHourLog,
  type ApiIncident,
  type ApiMember,
  type ApiMessage,
  type ApiOrganizationSummary,
  type ApiRegistration,
  type ApiTask,
  type Channel as ApiChannel,
  type EventInput,
  type EventStatus as ApiEventStatus,
  type TaskPriority as ApiTaskPriority,
  type TaskStatus as ApiTaskStatus,
} from "@/lib/api";
import type { AuthUser } from "@/lib/auth";
import type {
  ApprovalRequestItem,
  AttendanceRecordItem,
  AttendanceStatus,
  CauseCategory,
  Channel,
  DetailedVolunteerProfile,
  EventStatus,
  IncidentReport,
  IncidentSeverity,
  IncidentType,
  Message,
  OrganiserEvent,
  OperationalTask,
  ReportMetrics,
  ShiftStatus,
  TaskPriority,
  TaskStatus,
  User,
  VolunteerLeaderProfile,
  VolunteerShift,
} from "./types";

export interface OrganiserRoleMember {
  id: string;
  name: string;
  email: string;
  role: "Organiser" | "Volunteer Leader" | "Volunteer";
  status: "Active" | "Suspended";
  lastActive: string;
  avatar: string;
}

export interface OrganiserLiveSnapshot {
  currentUser: User;
  organiserEvents: OrganiserEvent[];
  shifts: VolunteerShift[];
  volunteerRoster: DetailedVolunteerProfile[];
  volunteerLeaders: VolunteerLeaderProfile[];
  operationalTasks: OperationalTask[];
  attendanceRecords: AttendanceRecordItem[];
  approvalRequests: ApprovalRequestItem[];
  incidentReports: IncidentReport[];
  channels: Channel[];
  messages: Message[];
  roleMembers: OrganiserRoleMember[];
  metrics: ReportMetrics;
  orgSummary: ApiOrganizationSummary | null;
}

const CAUSE_MAP: Record<string, CauseCategory> = {
  environment: "Environment",
  "food security": "Food Security",
  "food relief": "Food Security",
  food: "Food Security",
  education: "Education",
  youth: "Education",
  health: "Healthcare",
  healthcare: "Healthcare",
  animals: "Animal Welfare",
  "animal welfare": "Animal Welfare",
  disaster: "Disaster Relief",
  "disaster relief": "Disaster Relief",
};

function toCause(value: string | null | undefined): CauseCategory {
  return CAUSE_MAP[(value ?? "").trim().toLowerCase()] ?? "Community Aid";
}

function toEventStatus(status: ApiEventStatus, date: string): EventStatus {
  if (status === "DRAFT") return "Draft";
  if (status === "CANCELLED") return "Cancelled";
  if (status === "COMPLETED") return "Completed";
  if (status === "CLOSED") return "Registration Closed";
  if (status === "IN_PROGRESS") return "In Progress";
  if (status === "OPEN") return date > todayIso() ? "Open for Registration" : "Upcoming";
  return "Upcoming";
}

function toShiftStatus(status: ApiEventStatus, date: string): ShiftStatus {
  if (status === "CANCELLED") return "cancelled";
  if (status === "COMPLETED" || status === "CLOSED") return "completed";
  if (status === "IN_PROGRESS") return "ongoing";
  if (date < todayIso()) return "completed";
  return "upcoming";
}

function attendeeStatus(status: ApiRegistration["status"]): VolunteerShift["attendees"][number]["status"] {
  if (status === "WAITLIST") return "waitlist";
  if (status === "CANCELLED" || status === "NO_SHOW") return "cancelled";
  if (status === "CHECKED_IN") return "checked-in";
  if (status === "COMPLETED") return "completed";
  return "confirmed";
}

export function toOrganiserEvent(e: ApiEvent, organization: string): OrganiserEvent {
  return {
    id: e.id,
    name: e.name,
    description: e.description ?? "",
    category: toCause(e.category),
    date: e.date,
    startTime: toHHmm(e.startTime),
    endTime: toHHmm(e.endTime),
    venue: e.venue ?? (e.remote ? "Online" : ""),
    address: e.address ?? "",
    maxVolunteers: e.capacity,
    requiredVolunteers: Math.min(e.capacity, Math.max(1, Math.ceil(e.capacity * 0.6))),
    registeredCount: e.registeredCount,
    confirmedCount: e.registeredCount,
    image: e.imageUrl ?? "",
    organiserName: organization,
    registrationOpenDate: e.createdAt.slice(0, 10),
    registrationCloseDate: e.date,
    status: toEventStatus(e.status, e.date),
    requirements: [],
    assignedLeaders: [],
    teams: [],
    activityHistory: [],
    remote: e.remote,
    meetingLink: e.meetingLink,
  };
}

export function toVolunteerShift(e: ApiEvent, organization: string, regs: ApiRegistration[]): VolunteerShift {
  return {
    id: e.id,
    title: e.name,
    organization,
    cause: toCause(e.category),
    description: e.description ?? "",
    location: e.remote ? "Online" : [e.venue, e.address].filter(Boolean).join(", ") || "TBC",
    isRemote: e.remote,
    date: e.date,
    startTime: toHHmm(e.startTime),
    endTime: toHHmm(e.endTime),
    durationHours: e.durationHours,
    capacity: e.capacity,
    registeredCount: e.registeredCount,
    status: toShiftStatus(e.status, e.date),
    organizerId: "",
    organizerName: organization,
    skillsRequired: [],
    automatedReminders: false,
    meetingLink: e.meetingLink ?? undefined,
    addressDetails: e.address ?? undefined,
    coordinatorContact: "",
    attendees: regs
      .filter((r) => r.eventId === e.id)
      .map((r) => ({
        userId: r.userId,
        userName: r.userName,
        userEmail: r.userEmail,
        avatar: avatarFor(r.userName),
        status: attendeeStatus(r.status),
        hoursLogged: r.hours ?? undefined,
      })),
  };
}

export function toRosterProfile(m: ApiMember): DetailedVolunteerProfile {
  return {
    id: m.id,
    name: m.fullName,
    email: m.email,
    phone: m.phone ?? "",
    avatar: avatarFor(m.fullName),
    skills: [],
    experience: "",
    languages: [],
    availability: [],
    emergencyContact: "",
    preferredActivities: [],
    previousParticipationCount: 0,
    trainingCompleted: [],
    certifications: [],
    attendanceRate: 100,
    attendanceHistory: [],
    currentTeam: "",
    currentAssignment: "",
    status: m.active ? "Active" : "Suspended",
    feedbackScore: 0,
  };
}

export function toLeaderProfile(m: ApiMember): VolunteerLeaderProfile {
  return {
    id: m.id,
    name: m.fullName,
    email: m.email,
    phone: m.phone ?? "",
    avatar: avatarFor(m.fullName),
    roleTitle: "Volunteer Leader",
    assignedEventId: "",
    assignedEventName: "",
    teamId: "",
    teamName: "",
    responsibilities: "Team coordination",
    maxVolunteers: 20,
    assignedVolunteersCount: 0,
    attendanceManagedRate: 100,
    tasksCompletedCount: 0,
    incidentsReportedCount: 0,
    messagesSentCount: 0,
    status: m.active ? "Active" : "Suspended",
    volunteers: [],
  };
}

const TASK_STATUS_UI: Record<ApiTaskStatus, TaskStatus> = {
  TODO: "Not Started",
  IN_PROGRESS: "In Progress",
  DONE: "Completed",
  CANCELLED: "Cancelled",
};

const TASK_PRIORITY_UI: Record<ApiTaskPriority, TaskPriority> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

export function toOperationalTask(t: ApiTask): OperationalTask {
  return {
    id: t.id,
    name: t.title,
    description: t.description ?? "",
    teamId: "",
    teamName: t.eventName ?? "General",
    assignedLeaderId: t.assigneeId ?? "",
    assignedLeaderName: t.assigneeName ?? t.createdByName ?? "",
    assignedVolunteers: t.assigneeId
      ? [{ id: t.assigneeId, name: t.assigneeName ?? "Assignee", avatar: avatarFor(t.assigneeName) }]
      : [],
    location: t.eventName ?? "",
    startTime: "",
    endTime: "",
    priority: TASK_PRIORITY_UI[t.priority],
    requiredSkills: [],
    instructions: t.description ?? "",
    status: TASK_STATUS_UI[t.status],
    progress: t.status === "DONE" ? 100 : t.status === "IN_PROGRESS" ? 50 : 0,
    dueDate: t.dueDate ?? "",
  };
}

export function toApiTaskStatus(status: TaskStatus): ApiTaskStatus {
  if (status === "Completed") return "DONE";
  if (status === "In Progress" || status === "Assigned") return "IN_PROGRESS";
  if (status === "Cancelled") return "CANCELLED";
  return "TODO";
}

export function toApiTaskPriority(priority: TaskPriority): ApiTaskPriority {
  if (priority === "Low") return "LOW";
  if (priority === "Medium") return "MEDIUM";
  if (priority === "High") return "HIGH";
  return "URGENT";
}

function attendanceStatus(r: ApiRegistration): AttendanceStatus {
  if (r.status === "NO_SHOW") return "Absent";
  if (r.checkedOutAt && r.status === "COMPLETED") return "Present";
  if (r.status === "CHECKED_IN") return "Present";
  return "Excused";
}

export function toAttendanceItem(r: ApiRegistration): AttendanceRecordItem {
  return {
    id: r.id,
    volunteerId: r.userId,
    volunteerName: r.userName,
    volunteerAvatar: avatarFor(r.userName),
    teamName: "",
    leaderName: "",
    shiftName: r.eventName,
    date: r.eventDate,
    checkInTime: formatClock(r.checkedInAt) ?? "—",
    checkOutTime: formatClock(r.checkedOutAt) ?? "—",
    status: attendanceStatus(r),
    notes: r.notes ?? undefined,
  };
}

function toApiEventStatus(status: EventStatus | undefined): ApiEventStatus {
  switch (status) {
    case "Draft":
      return "DRAFT";
    case "Cancelled":
    case "Archived":
      return "CANCELLED";
    case "Completed":
      return "COMPLETED";
    case "Registration Closed":
      return "CLOSED";
    case "In Progress":
      return "IN_PROGRESS";
    case "Open for Registration":
    case "Upcoming":
    default:
      return "OPEN";
  }
}

export function organiserEventToInput(e: Partial<OrganiserEvent>): EventInput {
  const venueLc = (e.venue ?? "").trim().toLowerCase();
  const remote = e.remote ?? (venueLc === "online" || venueLc === "remote");
  return {
    name: e.name ?? "Untitled event",
    description: e.description ?? null,
    category: e.category ?? null,
    venue: e.venue ?? null,
    address: e.address ?? null,
    remote,
    meetingLink: e.meetingLink ?? null,
    date: e.date ?? todayIso(),
    startTime: toApiTime(e.startTime, "09:00"),
    endTime: toApiTime(e.endTime, "12:00"),
    capacity: e.maxVolunteers ?? e.requiredVolunteers ?? 20,
    status: toApiEventStatus(e.status),
    imageUrl: e.image || null,
  };
}

export function toMetrics(summary: ApiOrganizationSummary | null, fallback: ReportMetrics): ReportMetrics {
  if (!summary) return fallback;
  return {
    ...fallback,
    totalHours: summary.totalApprovedHours,
    activeVolunteers: summary.activeVolunteers,
    totalShiftsCompleted: summary.completedEvents,
    fulfillmentRate: summary.upcomingEvents > 0 ? 85 : fallback.fulfillmentRate,
    economicImpactValue: Math.round(summary.totalApprovedHours * 33.49),
  };
}

export function toCurrentUser(user: AuthUser, base: User): User {
  return {
    ...base,
    id: user.id,
    name: user.fullName,
    email: user.email,
    role: "organizer",
    avatar: avatarFor(user.fullName),
    organization: user.organizationName ?? base.organization,
    phone: user.phone ?? base.phone,
  };
}

const INCIDENT_TYPE_PREFIX = /^\[(.+?)\]\s*/;

const UI_INCIDENT_TYPES: IncidentType[] = [
  "Volunteer injury",
  "Missing equipment",
  "Lost person",
  "Security issue",
  "Conflict",
  "Medical emergency",
  "Safety issue",
  "Volunteer misconduct",
];

function toOrganiserIncidentSeverity(severity: ApiIncident["severity"]): IncidentSeverity {
  if (severity === "LOW") return "Low";
  if (severity === "MEDIUM") return "Medium";
  if (severity === "HIGH") return "High";
  return "Critical";
}

export function toOrganiserIncident(i: ApiIncident): IncidentReport {
  const match = i.title.match(INCIDENT_TYPE_PREFIX);
  const rawType = match?.[1] ?? "";
  const type =
    (UI_INCIDENT_TYPES.find((t) => t.toLowerCase() === rawType.toLowerCase()) as IncidentType | undefined) ??
    "Safety issue";
  const title = match ? i.title.slice(match[0].length) : i.title;
  return {
    id: i.id,
    title: title || i.title,
    type,
    severity: toOrganiserIncidentSeverity(i.severity),
    reportedBy: i.reportedByName ?? "Unknown reporter",
    reportedAt: timeAgo(i.createdAt),
    assignedLeader: "Unassigned",
    location: i.eventName ?? "On site",
    status: i.status === "RESOLVED" ? "Resolved" : "Reported",
    description: i.description,
    evidence: "",
    actionTaken: i.resolution ?? "",
    notes: i.resolution
      ? [
          {
            timestamp: i.resolvedAt ? timeAgo(i.resolvedAt) : timeAgo(i.createdAt),
            author: i.resolvedByName ?? "Organiser",
            text: i.resolution,
          },
        ]
      : [],
  };
}

export function toApprovalRequestItem(h: ApiHourLog): ApprovalRequestItem {
  const status =
    h.status === "PENDING" ? "Pending" : h.status === "APPROVED" ? "Approved" : "Rejected";
  const avatar = avatarFor(h.userName);
  return {
    id: h.id,
    type: "Hour log",
    requestedBy: h.userName,
    requesterName: h.userName,
    requestorRole: "Volunteer",
    avatar,
    requesterAvatar: avatar,
    details: [
      `${h.hours} service hour${h.hours === 1 ? "" : "s"} on ${h.workDate}`,
      h.eventName ? `Event: ${h.eventName}` : null,
      h.description ? h.description : null,
      h.source === "ATTENDANCE" ? "Source: attendance check-out" : "Source: manual log",
    ]
      .filter(Boolean)
      .join(" · "),
    submittedAt: timeAgo(h.createdAt),
    status,
    remarks: h.reviewNote ?? "",
    priority: h.hours >= 8 ? "High" : h.hours >= 4 ? "Medium" : "Low",
    history: [
      {
        date: timeAgo(h.createdAt),
        action: "Hour log submitted",
        author: h.userName,
      },
      ...(h.reviewedAt
        ? [
            {
              date: timeAgo(h.reviewedAt),
              action: status,
              author: h.reviewedByName ?? "Organiser",
              note: h.reviewNote ?? undefined,
            },
          ]
        : []),
    ],
  };
}

function mapSenderRole(role: ApiMessage["senderRole"]): Message["senderRole"] {
  if (role === "ORGANIZER") return "organizer";
  if (role === "VOLUNTEER_LEADER") return "coordinator";
  return "participant";
}

export function toOrganiserMessage(m: ApiMessage): Message {
  return {
    id: m.id,
    channelId: m.channel,
    senderId: m.senderId ?? "",
    senderName: m.senderName,
    senderRole: mapSenderRole(m.senderRole),
    senderAvatar: avatarFor(m.senderName),
    content: m.content,
    timestamp: timeAgo(m.createdAt),
    isUrgent: m.urgent,
    reactions: [],
  };
}

export function buildMessagingChannels(
  general: ApiMessage[],
  announcements: ApiMessage[],
): Channel[] {
  const define = (
    id: ApiChannel,
    name: string,
    description: string,
    isAnnouncements: boolean,
    msgs: ApiMessage[],
  ): Channel => ({
    id,
    name,
    description,
    isDirect: false,
    isAnnouncements,
    unreadCount: 0,
    lastMessage: msgs[0]?.content,
    lastMessageTime: msgs[0] ? timeAgo(msgs[0].createdAt) : undefined,
  });
  return [
    define("ANNOUNCEMENTS", "Announcements", "Organiser broadcasts and urgent updates", true, announcements),
    define("GENERAL", "General", "Open channel for volunteers and leaders", false, general),
  ];
}

export function toRoleMember(m: ApiMember): OrganiserRoleMember {
  const role =
    m.role === "ORGANIZER"
      ? "Organiser"
      : m.role === "VOLUNTEER_LEADER"
        ? "Volunteer Leader"
        : "Volunteer";
  return {
    id: m.id,
    name: m.fullName,
    email: m.email,
    role,
    status: m.active ? "Active" : "Suspended",
    lastActive: timeAgo(m.joinedAt),
    avatar: avatarFor(m.fullName),
  };
}

function mergeHourLogs(pending: ApiHourLog[], all: ApiHourLog[]): ApiHourLog[] {
  const byId = new Map<string, ApiHourLog>();
  for (const h of all) byId.set(h.id, h);
  for (const h of pending) byId.set(h.id, h);
  return [...byId.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function loadOrganiserData(user: AuthUser, metricsFallback: ReportMetrics, userFallback: User): Promise<OrganiserLiveSnapshot> {
  const org = user.organizationName ?? "Your organization";
  const [events, members, tasks, orgSummary, pendingHours, allHours, incidents, generalMessages, announcementMessages] =
    await Promise.all([
    api.events.list(false),
    api.members.list(),
    api.tasks.list(),
    api.dashboard.organization().catch(() => null),
    api.hours.list("PENDING"),
    api.hours.list(),
    api.incidents.list(),
    api.messages.list("GENERAL"),
    api.messages.list("ANNOUNCEMENTS"),
  ]);

  const today = todayIso();
  const upcomingIds = events
    .filter((e) => e.status !== "DRAFT" && e.status !== "CANCELLED")
    .sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime))
    .filter((e) => e.date >= today || e.status === "IN_PROGRESS")
    .slice(0, 8)
    .map((e) => e.id);
  const regLists = await Promise.all(
    upcomingIds.map((id) => api.events.registrations(id).catch(() => [] as ApiRegistration[]))
  );
  const regs = regLists.flat();

  const volunteers = members.filter((m) => m.role === "VOLUNTEER");
  const leaders = members.filter((m) => m.role === "VOLUNTEER_LEADER");

  const hourLogs = mergeHourLogs(pendingHours, allHours);
  const channels = buildMessagingChannels(generalMessages, announcementMessages);
  const messages = [...generalMessages, ...announcementMessages]
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map(toOrganiserMessage);

  return {
    currentUser: toCurrentUser(user, userFallback),
    organiserEvents: events.filter((e) => e.status !== "DRAFT").map((e) => toOrganiserEvent(e, org)),
    shifts: events.filter((e) => e.status !== "DRAFT").map((e) => toVolunteerShift(e, org, regs)),
    volunteerRoster: volunteers.map(toRosterProfile),
    volunteerLeaders: leaders.map(toLeaderProfile),
    operationalTasks: tasks.map(toOperationalTask),
    attendanceRecords: regs
      .filter((r) => r.status === "CHECKED_IN" || r.status === "COMPLETED" || r.status === "NO_SHOW")
      .map(toAttendanceItem),
    approvalRequests: hourLogs.map(toApprovalRequestItem),
    incidentReports: incidents.map(toOrganiserIncident),
    channels,
    messages,
    roleMembers: members.map(toRoleMember),
    metrics: toMetrics(orgSummary, metricsFallback),
    orgSummary,
  };
}
