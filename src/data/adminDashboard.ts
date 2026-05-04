import type { AdminCourseRow, AdminMetric, AdminUserRow } from "../types/models";

export const adminMetrics: AdminMetric[] = [
  { label: "Active learners", value: "27.4k", changeLabel: "+4.2% vs last month", positive: true },
  { label: "Course completions", value: "8,910", changeLabel: "+1.1% vs last month", positive: true },
  { label: "MRR (mock)", value: "$184k", changeLabel: "-0.4% vs last month", positive: false },
  { label: "Support SLA", value: "97.2%", changeLabel: "+0.3 pts", positive: true },
];

export const adminUsers: AdminUserRow[] = [
  { id: "u1", name: "Aisha Khan", email: "aisha@example.com", role: "student", status: "active", joinedLabel: "Jan 2026" },
  { id: "u2", name: "Marcus Webb", email: "marcus@example.com", role: "teacher", status: "active", joinedLabel: "Mar 2024" },
  { id: "u3", name: "Priya Admin", email: "priya@example.com", role: "admin", status: "active", joinedLabel: "Jun 2023" },
  { id: "u4", name: "Invited TA", email: "ta@example.com", role: "teacher", status: "invited", joinedLabel: "Pending" },
  { id: "u5", name: "Spam Bot", email: "spam@example.com", role: "student", status: "suspended", joinedLabel: "Apr 2026" },
];

export const adminCourses: AdminCourseRow[] = [
  { id: "crs-react-fundamentals", title: "React Fundamentals", instructor: "Sarah Lin", status: "published", enrollments: 3840 },
  { id: "crs-ts-productive", title: "TypeScript for Application Developers", instructor: "Marcus Webb", status: "published", enrollments: 2210 },
  { id: "crs-new-devops", title: "DevOps Kickstart", instructor: "TBD", status: "draft", enrollments: 0 },
  { id: "crs-ui-design-systems", title: "UI Systems & Design Tokens", instructor: "Elena Rossi", status: "review", enrollments: 180 },
];
