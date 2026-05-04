import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { MockUser } from "../types/models";
import { MockAuthContext } from "./mockAuthContext";

const STORAGE_KEY = "school-recover-mock-session";

function readStoredUser(): MockUser | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as MockUser;
    if (!parsed?.email || !parsed?.role || !parsed?.name) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(() =>
    typeof window !== "undefined" ? readStoredUser() : null
  );

  const login = useCallback((next: MockUser) => {
    setUser(next);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const dashboardPath = useMemo(() => {
    if (!user) return null;
    return `/dashboard/${user.role}`;
  }, [user]);

  const value = useMemo(
    () => ({ user, login, logout, dashboardPath }),
    [user, login, logout, dashboardPath]
  );

  return (
    <MockAuthContext.Provider value={value}>{children}</MockAuthContext.Provider>
  );
}
