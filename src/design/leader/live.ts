import {
  api,
  avatarFor,
  formatClock,
  toHHmm,
  todayIso,
  type ApiEvent,
  type ApiMember,
  type ApiOrganizationSummary,
  type ApiRegistration,
  type ApiTask,
  type EventStatus,
  type TaskPriority as ApiTaskPriority,
  type TaskStatus as ApiTaskStatus,
} from "@/lib/api";
import type { AuthUser } from "@/lib/auth";
import type {
  AttendanceMark,
  EventCategory,
  ShiftEvent,
  TaskPriority,
  TaskStatus,
  TeamTask,
  TodayAttendanceRecord,
  Volunteer,
  VolunteerStatus,
} from "./types";

export type AttendanceMeta = { registrationId: string; eventId: string };

export interface LeaderLiveSnapshot {
  volunteers: Volunteer[];
  shifts: ShiftEvent[];
  tasks: TeamTask[];
  attendance: TodayAttendanceRecord[];
  attendanceMeta: Record<string, AttendanceMeta>;
  focusEventId: string | null;
  focusEventTitle: string | null;
  orgSummary: ApiOrganizationSummary | null;
}

const LEADER_CATEGORY: Record<string, EventCategory> = {
  environment: "Park Revitalization",
  "park revitalization": "Park Revitalization",
  "food security": "Community Food Pantry",
  "food relief": "Community Food Pantry",
  food: "Community Food Pantry",
  education: "Youth Mentorship",
  youth: "Youth Mentorship",
  "youth mentorship": "Youth Mentorship",
  health: "Senior Outreach",
  "senior outreach": "Senior Outreach",
  emergency: "Emergency Shelter Support",
  "emergency shelter support": "Emergency Shelter Support",
  disaster: "Disaster Relief",
  "disaster relief": "Disaster Relief",
};

function toLeaderCategory(value: string | null | undefined): EventCategory {
  return LEADER_CATEGORY[(value ?? "").trim().toLowerCase()] ?? "Community Food Pantry";
}

function eventUiStatus(status: EventStatus, date: string): ShiftEvent["status"] {
  if (status === "CANCELLED") return "Cancelled";
  if (status === "COMPLETED" || status === "CLOSED") return "Completed";
  if (status === "IN_PROGRESS") return "In Progress";
  if (date < todayIso()) return "Completed";
  return "Upcoming";
}

export function toShiftEvent(e: ApiEvent, organization: string, regs: ApiRegistration[]): ShiftEvent {
  const assigned = regs
    .filter((r) => r.eventId === e.id && r.status !== "CANCELLED" && r.status !== "WAITLIST")
    .map((r) => r.userId);
  const waitlist = regs.filter((r) => r.eventId === e.id && r.status === "WAITLIST").map((r) => r.userId);
  const attendance: ShiftEvent["attendance"] = {};
  for (const r of regs.filter((x) => x.eventId === e.id)) {
    let status: "Registered" | "Attended" | "Late" | "Excused" | "No-Show" = "Registered";
    if (r.status === "NO_SHOW") status = "No-Show";
    else if (r.status === "CHECKED_IN" || r.status === "COMPLETED") status = "Attended";
    attendance[r.userId] = {
      volunteerId: r.userId,
      status,
      hoursLogged: r.hours ?? 0,
      verified: r.status === "COMPLETED" || r.status === "CHECKED_IN",
      notes: r.notes ?? undefined,
    };
  }
  return {
    id: e.id,
    title: e.name,
    category: toLeaderCategory(e.category),
    date: e.date,
    startTime: toHHmm(e.startTime),
    endTime: toHHmm(e.endTime),
    durationHours: e.durationHours,
    location: e.remote ? "Online" : [e.venue, e.address].filter(Boolean).join(", ") || "TBC",
    leadOrganizer: organization,
    description: e.description ?? "",
    requiredVolunteers: e.capacity,
    assignedVolunteerIds: assigned,
    waitlistVolunteerIds: waitlist,
    requiredSkills: [],
    status: eventUiStatus(e.status, e.date),
    attendance,
  };
}

export function toLeaderVolunteer(m: ApiMember): Volunteer {
  const roleLabel: Volunteer["role"] =
    m.role === "VOLUNTEER_LEADER" ? "Team Lead" : m.role === "ORGANIZER" ? "Team Lead" : "Volunteer";
  const status: VolunteerStatus = m.active ? "Active" : "Inactive";
  return {
    id: m.id,
    name: m.fullName,
    email: m.email,
    phone: m.phone ?? "",
    avatar: avatarFor(m.fullName),
    role: roleLabel,
    status,
    totalHours: m.totalHours,
    verifiedHours: m.totalHours,
    pendingHours: 0,
    joinedDate: m.joinedAt.slice(0, 10),
    skills: [],
    emergencyContact: { name: "", phone: "", relationship: "" },
    backgroundCheckStatus: "Approved",
    badges: [],
    attendanceRate: 100,
    shiftsCompleted: 0,
    notes: "",
  };
}

const PRIORITY_UI: Record<ApiTaskPriority, TaskPriority> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

const STATUS_UI: Record<ApiTaskStatus, TaskStatus> = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  DONE: "Completed",
  CANCELLED: "Completed",
};

export function toLeaderTask(t: ApiTask): TeamTask {
  return {
    id: t.id,
    title: t.title,
    description: t.description ?? "",
    zone: t.eventName ?? "General",
    location: t.eventName ?? "",
    priority: PRIORITY_UI[t.priority],
    status: STATUS_UI[t.status],
    assignments: t.assigneeId
      ? [{ volunteerId: t.assigneeId, volunteerName: t.assigneeName ?? "Volunteer", subRole: "Assignee" }]
      : [],
    deadline: t.dueDate ?? "",
    completedAt: t.status === "DONE" ? t.updatedAt.slice(0, 10) : undefined,
    notes: "",
    issuesReported: [],
    isEscalated: false,
  };
}

export function toApiTaskStatus(status: TaskStatus): ApiTaskStatus | null {
  if (status === "Completed") return "DONE";
  if (status === "In Progress" || status === "Review") return "IN_PROGRESS";
  if (status === "Todo") return "TODO";
  return null; // Escalated stays client-side
}

export function toApiTaskPriority(priority: TaskPriority): ApiTaskPriority {
  if (priority === "Low") return "LOW";
  if (priority === "Medium") return "MEDIUM";
  if (priority === "High") return "HIGH";
  return "URGENT";
}

function registrationToMark(r: ApiRegistration): AttendanceMark {
  if (r.status === "NO_SHOW") return "Absent";
  if (r.status === "COMPLETED" && r.checkedOutAt) return "Present";
  if (r.status === "CHECKED_IN") return "Present";
  return "Unrecorded";
}

export function buildTodayAttendance(
  focusEventId: string | null,
  regs: ApiRegistration[],
  members: ApiMember[]
): { attendance: TodayAttendanceRecord[]; meta: Record<string, AttendanceMeta> } {
  if (!focusEventId) return { attendance: [], meta: {} };
  const eventRegs = regs.filter((r) => r.eventId === focusEventId && r.status !== "CANCELLED" && r.status !== "WAITLIST");
  const memberById = new Map(members.map((m) => [m.id, m]));
  const meta: Record<string, AttendanceMeta> = {};
  const attendance = eventRegs.map((r) => {
    meta[r.userId] = { registrationId: r.id, eventId: r.eventId };
    const member = memberById.get(r.userId);
    return {
      volunteerId: r.userId,
      volunteerName: r.userName,
      volunteerRole: member?.role === "VOLUNTEER_LEADER" ? "Team Lead" : "Volunteer",
      avatar: avatarFor(r.userName),
      status: registrationToMark(r),
      checkInTime: formatClock(r.checkedInAt) ?? undefined,
      checkOutTime: formatClock(r.checkedOutAt) ?? undefined,
      remarks: r.notes ?? "",
      isSubmittedToOrganiser: false,
    } satisfies TodayAttendanceRecord;
  });
  return { attendance, meta };
}

/** Prefer today's in-progress/open event; else nearest upcoming with registrations. */
export function pickFocusEvent(events: ApiEvent[], regs: ApiRegistration[]): ApiEvent | null {
  const today = todayIso();
  const withRegs = new Set(regs.map((r) => r.eventId));
  const candidates = events
    .filter((e) => e.status !== "CANCELLED" && e.status !== "DRAFT")
    .filter((e) => withRegs.has(e.id) || e.registeredCount > 0)
    .sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime));
  const todayHit =
    candidates.find((e) => e.date === today && (e.status === "IN_PROGRESS" || e.status === "OPEN")) ??
    candidates.find((e) => e.date === today);
  if (todayHit) return todayHit;
  return candidates.find((e) => e.date >= today) ?? candidates[candidates.length - 1] ?? null;
}

export async function loadLeaderData(user: AuthUser): Promise<LeaderLiveSnapshot> {
  const org = user.organizationName ?? "Your organization";
  const [events, members, tasks, orgSummary] = await Promise.all([
    api.events.list(false),
    api.members.list(),
    api.tasks.list(),
    api.dashboard.organization().catch(() => null),
  ]);

  const focus = pickFocusEvent(events, []);
  // Load registrations for focus + a few upcoming events (cap parallel calls)
  const eventIds = Array.from(
    new Set(
      [focus?.id, ...events.filter((e) => e.date >= todayIso()).slice(0, 5).map((e) => e.id)].filter(
        Boolean
      ) as string[]
    )
  );
  const regLists = await Promise.all(
    eventIds.map((id) => api.events.registrations(id).catch(() => [] as ApiRegistration[]))
  );
  const regs = regLists.flat();
  const focusEvent = pickFocusEvent(events, regs);
  const { attendance, meta } = buildTodayAttendance(focusEvent?.id ?? null, regs, members);

  const volunteers = members
    .filter((m) => m.role === "VOLUNTEER" || m.role === "VOLUNTEER_LEADER")
    .map(toLeaderVolunteer);

  return {
    volunteers,
    shifts: events.filter((e) => e.status !== "DRAFT").map((e) => toShiftEvent(e, org, regs)),
    tasks: tasks.filter((t) => t.status !== "CANCELLED").map(toLeaderTask),
    attendance,
    attendanceMeta: meta,
    focusEventId: focusEvent?.id ?? null,
    focusEventTitle: focusEvent?.name ?? null,
    orgSummary,
  };
}
