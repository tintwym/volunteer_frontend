export type Role = "ORGANIZER" | "VOLUNTEER_LEADER" | "VOLUNTEER";

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  organizationId: string | null;
  organizationName: string | null;
  phone?: string | null;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  user: AuthUser;
}

const CONFIGURED_API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
).replace(/\/+$/, "");

/**
 * Browser calls on deployed hosts go through the Next.js `/backend` rewrite (same origin)
 * so CORS mismatches on Render cannot block login. Localhost still hits the API URL directly.
 */
function getApiBase(): string {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host !== "localhost" && host !== "127.0.0.1") {
      return `${window.location.origin}/backend`;
    }
  }
  return CONFIGURED_API_URL;
}

const TOKEN_KEY = "cg_access_token";
/** Auth session user — keep separate from landing prototype `cg_user`. */
const USER_KEY = "cg_auth_user";
export const DEMO_TOKEN = "cg_demo_token";
export const LANDING_USER_KEY = "cg_user";
export const LANDING_LOGGED_IN_KEY = "cg_is_logged_in";

const ROLES: Role[] = ["ORGANIZER", "VOLUNTEER_LEADER", "VOLUNTEER"];

export function getApiUrl() {
  return getApiBase();
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
    phone: typeof data.phone === "string" ? data.phone : null,
  };
}

/** "Remember me" sessions live in localStorage; others only last for the tab. */
function activeStorage(): Storage {
  return sessionStorage.getItem(TOKEN_KEY) ? sessionStorage : localStorage;
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return activeStorage().getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = activeStorage().getItem(USER_KEY);
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

/** Omit `remember` to keep the current session's storage choice. */
export function storeAuth(response: AuthResponse, remember?: boolean) {
  const user = normalizeUser(response.user);
  if (!user || !response.accessToken) {
    throw new Error("Login response was incomplete. Please try again.");
  }
  const storage =
    remember === undefined
      ? activeStorage()
      : remember
        ? localStorage
        : sessionStorage;
  clearAuth();
  storage.setItem(TOKEN_KEY, response.accessToken);
  storage.setItem(USER_KEY, JSON.stringify(user));
}

export function storeUser(user: AuthUser) {
  activeStorage().setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
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

  if (status === 401) {
    return "Your session has expired. Please sign in again.";
  }
  if (status === 403) {
    return "You do not have permission to do this.";
  }
  if (status >= 500) {
    return "Server error. Please try again in a moment.";
  }
  return "Unable to complete the request. Please try again.";
}

/** `status` is 0 when the API could not be reached at all. */
export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}

function looksLikeFrontendUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host.includes("vercel.app") && !host.includes("api");
  } catch {
    return false;
  }
}

async function fetchWithColdStartRetry(
  url: string,
  init: RequestInit,
  attempts = 4
): Promise<Response> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetch(url, init);
    } catch (err) {
      lastError = err;
      // Render free tier cold starts often take ~45–60s; retry with backoff.
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, 4000 * (i + 1)));
      }
    }
  }
  throw lastError;
}

/**
 * Fire-and-forget ping so Render can wake while the user is still on the landing/login page.
 * Safe to call repeatedly; failures are ignored.
 */
export function warmupApi(): void {
  if (typeof window === "undefined") return;
  if (looksLikeFrontendUrl(CONFIGURED_API_URL)) return;
  const url = `${getApiBase()}/actuator/health/liveness`;
  void fetch(url, { method: "GET", cache: "no-store", keepalive: true }).catch(() => {
    // Ignore — cold-start retries on real API calls still apply.
  });
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  if (looksLikeFrontendUrl(CONFIGURED_API_URL)) {
    throw new ApiError(
      "NEXT_PUBLIC_API_URL points at the frontend, not the backend. Set it to your Render API URL (e.g. https://volunteer-backend-7m4w.onrender.com) and redeploy.",
      0
    );
  }

  const apiBase = getApiBase();
  const token = getStoredToken();
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token && !isDemoToken(token)) headers.set("Authorization", `Bearer ${token}`);

  let res: Response;
  try {
    res = await fetchWithColdStartRetry(`${apiBase}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new ApiError(
      `Cannot reach the API at ${CONFIGURED_API_URL}. The Render free tier may be waking up — wait about a minute and try again. If this keeps happening, confirm CORS allows this site and the backend is deployed.`,
      0
    );
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new ApiError(
      `The API at ${CONFIGURED_API_URL} did not return JSON (got ${res.status}). Check NEXT_PUBLIC_API_URL — it must be the Render backend, not the Vercel site.`,
      res.status
    );
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(formatApiError(data, res.status), res.status);
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

export async function login(
  input: { email: string; password: string },
  remember = true
) {
  const data = await apiFetch<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
  const user = normalizeUser(data.user);
  if (!user || !data.accessToken) {
    throw new Error("Login succeeded but the account response was invalid.");
  }
  const normalized = { ...data, user };
  storeAuth(normalized, remember);
  return normalized;
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
