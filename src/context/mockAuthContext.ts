import { createContext } from "react";
import type { MockUser } from "../types/models";

export interface MockAuthContextValue {
  user: MockUser | null;
  login: (user: MockUser) => void;
  logout: () => void;
  dashboardPath: string | null;
}

export const MockAuthContext = createContext<MockAuthContextValue | null>(null);
