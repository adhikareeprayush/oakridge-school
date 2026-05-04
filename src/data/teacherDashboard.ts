import type { TeacherClassSummary, TeacherSubmissionQueueItem } from "../types/models";

export const teacherClasses: TeacherClassSummary[] = [
  {
    id: "cls-react-may",
    title: "React Fundamentals · May cohort",
    studentsCount: 142,
    avgProgress: 54,
    nextSessionLabel: "Wed · Office hours · 5 PM UTC",
  },
  {
    id: "cls-ts-june",
    title: "TypeScript Intensive · June cohort",
    studentsCount: 88,
    avgProgress: 31,
    nextSessionLabel: "Fri · Lecture · 10 AM UTC",
  },
];

export const teacherSubmissionQueue: TeacherSubmissionQueueItem[] = [
  {
    id: "sub-1",
    studentName: "Aisha Khan",
    assignmentTitle: "Hooks refactor lab",
    submittedLabel: "35 min ago",
  },
  {
    id: "sub-2",
    studentName: "Noah Müller",
    assignmentTitle: "Router migration",
    submittedLabel: "4 hours ago",
  },
  {
    id: "sub-3",
    studentName: "Chen Wei",
    assignmentTitle: "Accessibility audit",
    submittedLabel: "Yesterday",
  },
];

/** Mock weekly engagement — replace with chart library + API series. */
export const teacherWeeklyEngagementPercent = [42, 48, 55, 52, 61, 58, 64];
