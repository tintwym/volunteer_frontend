export type Role = "ORGANIZER" | "VOLUNTEER_LEADER" | "VOLUNTEER";

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  organizationId: string | null;
  organizationName: string | null;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  user: AuthUser;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
const TOKEN_KEY = "cg_access_token";
const USER_KEY = "cg_user";
export const DEMO_TOKEN = "cg_demo_token";

const ROLES: Role[] = ["ORGANIZER", "VOLUNTEER_LEADER", "VOLUNTEER"];

const DEMO_PROFILES: Record<
  Role,
  {
    fullName: string;
    email: string;
    organizationName: string;
  }
> = {
  ORGANIZER: {
    fullName: "Marcus Vance",
    email: "marcus@greenroots.org",
    organizationName: "Green Roots Collective",
  },
  VOLUNTEER_LEADER: {
    fullName: "Jordan Lee",
    email: "jordan.lee@commonground.org",
    organizationName: "Green Roots Collective",
  },
  VOLUNTEER: {
    fullName: "Alex Rivera",
    email: "alex.rivera@commonground.org",
    organizationName: "Green Roots Collective",
  },
};

export function getApiUrl() {
  return API_URL;
}

export function isDemoToken(token: string | null | undefined): boolean {
  return token === DEMO_TOKEN;
}

export function isDemoSession(): boolean {
  return isDemoToken(getStoredToken());
}

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && ROLES.includes(value as Role);
}

export function normalizeUser(raw: unknown): AuthUser | null {
  if (!raw || typeof raw !== "object") return null;
  const data = raw as Record<string, unknown>;
  if (
    typeof data.id !== "string" ||
    typeof data.email !== "string" ||
    typeof data.fullName !== "string" ||
    !isRole(data.role)
  ) {
    return null;
  }
  return {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    role: data.role,
    organizationId:
      typeof data.organizationId === "string" ? data.organizationId : null,
    organizationName:
      typeof data.organizationName === "string" ? data.organizationName : null,
  };
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    const user = normalizeUser(JSON.parse(raw));
    if (!user) {
      clearAuth();
      return null;
    }
    return user;
  } catch {
    clearAuth();
    return null;
  }
}

export function storeAuth(response: AuthResponse) {
  const user = normalizeUser(response.user);
  if (!user || !response.accessToken) {
    throw new Error("Login response was incomplete. Please try again.");
  }
  localStorage.setItem(TOKEN_KEY, response.accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function dashboardPathForRole(role: Role | string | null | undefined): string {
  switch (role) {
    case "ORGANIZER":
      return "/organizer";
    case "VOLUNTEER_LEADER":
      return "/leader";
    case "VOLUNTEER":
      return "/volunteer";
    default:
      return "/login";
  }
}

function formatApiError(data: unknown, status: number): string {
  if (data && typeof data === "object") {
    const body = data as Record<string, unknown>;
    if (body.fields && typeof body.fields === "object") {
      const fields = body.fields as Record<string, string>;
      const messages = Object.values(fields).filter(Boolean);
      if (messages.length > 0) return messages.join(" ");
    }
    if (typeof body.message === "string" && body.message.trim()) {
      if (body.message === "Validation failed") {
        return "Please check your email and password and try again.";
      }
      return body.message;
    }
  }

  if (status === 401 || status === 403) {
    return "Invalid email or password.";
  }
  if (status >= 500) {
    return "Server error. Please try again in a moment.";
  }
  return "Unable to complete the request. Please try again.";
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error(
      "Cannot reach the API. Make sure the backend is running on " + API_URL
    );
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(formatApiError(data, res.status));
  }
  return data as T;
}

export async function signup(input: {
  fullName: string;
  email: string;
  password: string;
  organizationName: string;
}) {
  const data = await apiFetch<AuthResponse>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(input),
  });
  const user = normalizeUser(data.user);
  if (!user || !data.accessToken) {
    throw new Error("Signup succeeded but the account response was invalid.");
  }
  const normalized = { ...data, user };
  storeAuth(normalized);
  return normalized;
}

export async function login(input: { email: string; password: string }) {
  const data = await apiFetch<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
  const user = normalizeUser(data.user);
  if (!user || !data.accessToken) {
    throw new Error("Login succeeded but the account response was invalid.");
  }
  const normalized = { ...data, user };
  storeAuth(normalized);
  return normalized;
}

/** Instant prototype-style access — no API required. */
export function enterDemo(role: Role): AuthResponse {
  const profile = DEMO_PROFILES[role];
  const response: AuthResponse = {
    accessToken: DEMO_TOKEN,
    tokenType: "Bearer",
    user: {
      id: `demo-${role.toLowerCase()}`,
      email: profile.email,
      fullName: profile.fullName,
      role,
      organizationId: "demo-org-id",
      organizationName: profile.organizationName,
    },
  };
  storeAuth(response);
  return response;
}

export async function acceptInvite(input: {
  token: string;
  fullName: string;
  password: string;
}) {
  const data = await apiFetch<AuthResponse>("/api/auth/accept-invite", {
    method: "POST",
    body: JSON.stringify(input),
  });
  const user = normalizeUser(data.user);
  if (!user || !data.accessToken) {
    throw new Error("Invite accepted but the account response was invalid.");
  }
  const normalized = { ...data, user };
  storeAuth(normalized);
  return normalized;
}

export async function fetchMe() {
  const data = await apiFetch<AuthUser>("/api/auth/me");
  const user = normalizeUser(data);
  if (!user) {
    throw new Error("Your session is invalid. Please sign in again.");
  }
  return user;
}
