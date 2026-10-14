import { apiFetch, type AuthResponse, type AuthUser, type Role } from "@/lib/auth";

// ------------------------------------------------------------------ types

export type EventStatus = "DRAFT" | "OPEN" | "CLOSED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type RegistrationStatus =
  | "CONFIRMED"
  | "WAITLIST"
  | "CANCELLED"
  | "CHECKED_IN"
  | "COMPLETED"
  | "NO_SHOW";
export type HourStatus = "PENDING" | "APPROVED" | "REJECTED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
export type IncidentSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type Channel = "GENERAL" | "LEADERS" | "ANNOUNCEMENTS";

export interface ApiEvent {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  venue: string | null;
  address: string | null;
  remote: boolean;
  meetingLink: string | null;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm[:ss]
  endTime: string;
  durationHours: number;
  capacity: number;
  registeredCount: number;
  waitlistCount: number;
  status: EventStatus;
  imageUrl: string | null;
  checkInCode: string | null;
  myRegistrationStatus: RegistrationStatus | null;
  createdAt: string;
}

export interface EventInput {
  name: string;
  description?: string | null;
  category?: string | null;
  venue?: string | null;
  address?: string | null;
  remote?: boolean;
  meetingLink?: string | null;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  status?: EventStatus;
  imageUrl?: string | null;
}

export interface ApiRegistration {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  venue: string | null;
  userId: string;
  userName: string;
  userEmail: string;
  status: RegistrationStatus;
  checkedInAt: string | null;
  checkedOutAt: string | null;
  hours: number | null;
  notes: string | null;
}

export interface ApiHourLog {
  id: string;
  userId: string;
  userName: string;
  eventId: string | null;
  eventName: string | null;
  workDate: string;
  hours: number;
  description: string | null;
  status: HourStatus;
  source: "ATTENDANCE" | "MANUAL";
  reviewedByName: string | null;
  reviewedAt: string | null;
  reviewNote: string | null;
  createdAt: string;
}

export interface ApiBadge {
  hours: number;
  title: string;
  tier: string;
  earned: boolean;
  earnedDate: string | null;
  progress: number;
}

export interface ApiBadgeSummary {
  totalHours: number;
  current: ApiBadge | null;
  next: ApiBadge;
  badges: ApiBadge[];
}

export interface ApiMySummary {
  totalHours: number;
  pendingHourLogs: number;
  upcomingRegistrations: number;
  completedEvents: number;
  openTasks: number;
  unreadNotifications: number;
  currentBadge: ApiBadge | null;
  nextBadge: ApiBadge;
}

export interface ApiOrganizationSummary {
  totalApprovedHours: number;
  activeVolunteers: number;
  activeLeaders: number;
  upcomingEvents: number;
  completedEvents: number;
  pendingHourApprovals: number;
  openIncidents: number;
  openTasks: number;
}

export interface ApiTask {
  id: string;
  title: string;
  description: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  assigneeId: string | null;
  assigneeName: string | null;
  dueDate: string | null;
  eventId: string | null;
  eventName: string | null;
  createdByName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskInput {
  title: string;
  description?: string | null;
  priority?: TaskPriority;
  assigneeId?: string | null;
  dueDate?: string | null;
  eventId?: string | null;
}

export interface ApiIncident {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: "OPEN" | "RESOLVED";
  eventId: string | null;
  eventName: string | null;
  reportedById: string | null;
  reportedByName: string | null;
  resolution: string | null;
  resolvedByName: string | null;
  resolvedAt: string | null;
  createdAt: string;
}

export interface ApiMessage {
  id: string;
  channel: Channel;
  senderId: string | null;
  senderName: string;
  senderRole: Role | null;
  content: string;
  urgent: boolean;
  createdAt: string;
}

export interface ApiNotification {
  id: string;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  read: boolean;
  createdAt: string;
}

export interface ApiMember {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  role: Role;
  active: boolean;
  totalHours: number;
  joinedAt: string;
}

export interface ApiInvitation {
  id: string;
  email: string;
  role: Role;
  token: string;
  expiresAt: string;
  invitePath: string;
}

// -------------------------------------------------------------- endpoints

const json = (body: unknown): RequestInit => ({ body: JSON.stringify(body) });
const get = <T,>(path: string) => apiFetch<T>(path);
const send = <T,>(method: string, path: string, body?: unknown) =>
  apiFetch<T>(path, { method, ...(body === undefined ? {} : json(body)) });

export const api = {
  events: {
    list: (upcoming = false) => get<ApiEvent[]>(`/api/events${upcoming ? "?upcoming=true" : ""}`),
    get: (id: string) => get<ApiEvent>(`/api/events/${id}`),
    create: (input: EventInput) => send<ApiEvent>("POST", "/api/events", input),
    update: (id: string, input: EventInput) => send<ApiEvent>("PUT", `/api/events/${id}`, input),
    remove: (id: string) => send<void>("DELETE", `/api/events/${id}`),
    regenerateCode: (id: string) => send<ApiEvent>("POST", `/api/events/${id}/check-in-code`),
    register: (id: string) => send<ApiRegistration>("POST", `/api/events/${id}/register`),
    cancel: (id: string) => send<void>("DELETE", `/api/events/${id}/register`),
    checkIn: (id: string, code: string) =>
      send<ApiRegistration>("POST", `/api/events/${id}/check-in`, { code }),
    checkOut: (id: string) => send<ApiRegistration>("POST", `/api/events/${id}/check-out`),
    registrations: (id: string) => get<ApiRegistration[]>(`/api/events/${id}/registrations`),
    staffCheckIn: (id: string, regId: string) =>
      send<ApiRegistration>("POST", `/api/events/${id}/registrations/${regId}/check-in`),
    staffCheckOut: (id: string, regId: string) =>
      send<ApiRegistration>("POST", `/api/events/${id}/registrations/${regId}/check-out`),
    noShow: (id: string, regId: string) =>
      send<ApiRegistration>("POST", `/api/events/${id}/registrations/${regId}/no-show`),
  },
  hours: {
    mine: () => get<ApiHourLog[]>("/api/hours/mine"),
    list: (status?: HourStatus) => get<ApiHourLog[]>(`/api/hours${status ? `?status=${status}` : ""}`),
    submit: (input: { workDate: string; hours: number; description?: string; eventId?: string | null }) =>
      send<ApiHourLog>("POST", "/api/hours", input),
    review: (id: string, input: { approve: boolean; note?: string; hours?: number }) =>
      send<ApiHourLog>("POST", `/api/hours/${id}/review`, input),
    remove: (id: string) => send<void>("DELETE", `/api/hours/${id}`),
  },
  me: {
    summary: () => get<ApiMySummary>("/api/me/summary"),
    badges: () => get<ApiBadgeSummary>("/api/me/badges"),
    registrations: () => get<ApiRegistration[]>("/api/me/registrations"),
    tasks: () => get<ApiTask[]>("/api/me/tasks"),
    notifications: (limit = 50) =>
      get<{ unreadCount: number; items: ApiNotification[] }>(`/api/me/notifications?limit=${limit}`),
    markRead: (id: string) => send<ApiNotification>("POST", `/api/me/notifications/${id}/read`),
    markAllRead: () => send<void>("POST", "/api/me/notifications/read-all"),
  },
  tasks: {
    list: () => get<ApiTask[]>("/api/tasks"),
    create: (input: TaskInput) => send<ApiTask>("POST", "/api/tasks", input),
    update: (id: string, input: TaskInput) => send<ApiTask>("PUT", `/api/tasks/${id}`, input),
    setStatus: (id: string, status: TaskStatus) =>
      send<ApiTask>("PATCH", `/api/tasks/${id}/status`, { status }),
    remove: (id: string) => send<void>("DELETE", `/api/tasks/${id}`),
  },
  incidents: {
    list: () => get<ApiIncident[]>("/api/incidents"),
    report: (input: { title: string; description: string; severity: IncidentSeverity; eventId?: string | null }) =>
      send<ApiIncident>("POST", "/api/incidents", input),
    resolve: (id: string, resolution: string) =>
      send<ApiIncident>("POST", `/api/incidents/${id}/resolve`, { resolution }),
  },
  messages: {
    list: (channel: Channel, limit = 100) => get<ApiMessage[]>(`/api/messages/${channel}?limit=${limit}`),
    post: (channel: Channel, content: string, urgent = false) =>
      send<ApiMessage>("POST", `/api/messages/${channel}`, { content, urgent }),
  },
  members: {
    list: () => get<ApiMember[]>("/api/members"),
    update: (id: string, input: { role?: Role; active?: boolean }) =>
      send<ApiMember>("PATCH", `/api/members/${id}`, input),
    badges: (id: string) => get<ApiBadgeSummary>(`/api/members/${id}/badges`),
    invite: (email: string, role: Role) => send<ApiInvitation>("POST", "/api/invitations", { email, role }),
  },
  dashboard: {
    organization: () => get<ApiOrganizationSummary>("/api/dashboard/organization"),
  },
  account: {
    config: () => get<{ googleEnabled: boolean; googleWebClientId: string | null }>("/api/auth/config"),
    forgotPassword: (email: string) => send<{ message: string }>("POST", "/api/auth/forgot-password", { email }),
    resetPassword: (token: string, password: string) =>
      send<{ message: string }>("POST", "/api/auth/reset-password", { token, password }),
    updateProfile: (input: { fullName?: string; phone?: string }) =>
      send<AuthUser>("PATCH", "/api/auth/me", input),
    changePassword: (currentPassword: string, newPassword: string) =>
      send<AuthResponse>("POST", "/api/auth/change-password", { currentPassword, newPassword }),
    google: (idToken: string, organizationName?: string) =>
      send<AuthResponse>("POST", "/api/auth/google", { idToken, organizationName }),
  },
};

// ---------------------------------------------------------------- helpers

/** "14:00:00" -> "02:00 PM" */
export function formatTime(value: string | null | undefined): string {
  if (!value) return "";
  const [h, m] = value.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** "2026-10-17" -> "Sat, Oct 17, 2026" (parsed as a local date, not UTC). */
export function formatDate(value: string | null | undefined): string {
  if (!value) return "";
  const [y, mo, d] = value.split("-").map(Number);
  return new Date(y, mo - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatClock(iso: string | null | undefined): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export function timeAgo(iso: string): string {
  const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 86400 * 7) return `${Math.floor(seconds / 86400)}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Initials avatar as an inline SVG, so real accounts never show a stock photo. */
export function avatarFor(name: string | null | undefined): string {
  const initials =
    (name ?? "?")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]!.toUpperCase())
      .join("") || "?";
  const palette = ["#059669", "#0284c7", "#7c3aed", "#db2777", "#d97706", "#0f766e"];
  let hash = 0;
  for (const ch of name ?? "") hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const color = palette[hash % palette.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="${color}"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="38" font-weight="600" fill="#fff">${escapeHtml(initials)}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function errorMessage(err: unknown, fallback = "Something went wrong. Please try again."): string {
  return err instanceof Error && err.message ? err.message : fallback;
}
