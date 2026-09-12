"use client";

import {
  AuthUser,
  clearAuth,
  fetchMe,
  getStoredToken,
  storeAuth,
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());
  const [loading, setLoading] = useState(() => {
    const token = getStoredToken();
    if (!token) return false;
    return !isDemoToken(token);
  });

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
      localStorage.setItem("cg_auth_user", JSON.stringify(me));
    } catch {
      clearAuth();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      return;
    }

    if (isDemoToken(token)) {
      setUser(getStoredUser());
      setLoading(false);
      return;
    }

    let cancelled = false;

    void (async () => {
      try {
        const me = await fetchMe();
        if (!cancelled) {
          setUser(me);
          localStorage.setItem("cg_auth_user", JSON.stringify(me));
        }
      } catch {
        if (!cancelled) {
          clearAuth();
          setUser(null);
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
