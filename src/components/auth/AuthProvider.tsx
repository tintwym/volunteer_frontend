"use client";

import {
  ApiError,
  AuthUser,
  clearAuth,
  fetchMe,
  getStoredToken,
  storeAuth,
  storeUser,
  AuthResponse,
  getStoredUser,
  normalizeUser,
  isDemoToken,
} from "@/lib/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  isDemo: boolean;
  setSession: (response: AuthResponse) => void;
  refresh: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function isSessionRejected(err: unknown): boolean {
  return !(err instanceof ApiError) || err.status === 401;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Storage is only readable in the browser, so the first render must match
  // the server (no user, loading) and the session is restored after mount.
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    if (isDemoToken(token)) {
      setUser(getStoredUser());
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const me = await fetchMe();
      setUser(me);
      storeUser(me);
    } catch (err) {
      if (isSessionRejected(err)) {
        clearAuth();
        setUser(null);
      } else {
        setUser(getStoredUser());
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const token = getStoredToken();
        if (!token || isDemoToken(token)) {
          if (!cancelled) setUser(token ? getStoredUser() : null);
          return;
        }
        const me = await fetchMe();
        if (!cancelled) {
          setUser(me);
          storeUser(me);
        }
      } catch (err) {
        if (cancelled) return;
        // Keep the cached session through network blips; only a rejected token signs out.
        if (isSessionRejected(err)) {
          clearAuth();
          setUser(null);
        } else {
          setUser(getStoredUser());
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const setSession = useCallback((response: AuthResponse) => {
    const normalizedUser = normalizeUser(response.user);
    if (!normalizedUser) {
      clearAuth();
      setUser(null);
      setLoading(false);
      return;
    }
    storeAuth({ ...response, user: normalizedUser });
    setUser(normalizedUser);
    setLoading(false);
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
    setLoading(false);
  }, []);

  const isDemo = Boolean(user?.id.startsWith("demo-"));

  const value = useMemo(
    () => ({ user, loading, isDemo, setSession, refresh, logout }),
    [user, loading, isDemo, setSession, refresh, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
