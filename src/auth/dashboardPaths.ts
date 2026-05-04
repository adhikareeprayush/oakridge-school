import type { UserRole } from "../types/models";

export function dashboardPathForRole(role: UserRole): string {
  return `/dashboard/${role}`;
}
