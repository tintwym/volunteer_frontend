import {
  api,
  avatarFor,
  formatClock,
  toApiTime,
  toHHmm,
  todayIso,
  type ApiEvent,
  type ApiMember,
  type ApiOrganizationSummary,
  type ApiRegistration,
  type ApiTask,
  type EventInput,
  type EventStatus as ApiEventStatus,
  type TaskPriority as ApiTaskPriority,
  type TaskStatus as ApiTaskStatus,
} from "@/lib/api";
import type { AuthUser } from "@/lib/auth";
import type {
  AttendanceRecordItem,
  AttendanceStatus,
  CauseCategory,
  DetailedVolunteerProfile,
  EventStatus,
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

export interface OrganiserLiveSnapshot {
  currentUser: User;
  organiserEvents: OrganiserEvent[];
  shifts: VolunteerShift[];
  volunteerRoster: DetailedVolunteerProfile[];
  volunteerLeaders: VolunteerLeaderProfile[];
  operationalTasks: OperationalTask[];
  attendanceRecords: AttendanceRecordItem[];
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

export async function loadOrganiserData(user: AuthUser, metricsFallback: ReportMetrics, userFallback: User): Promise<OrganiserLiveSnapshot> {
  const org = user.organizationName ?? "Your organization";
  const [events, members, tasks, orgSummary] = await Promise.all([
    api.events.list(false),
    api.members.list(),
    api.tasks.list(),
    api.dashboard.organization().catch(() => null),
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
    metrics: toMetrics(orgSummary, metricsFallback),
    orgSummary,
  };
}
