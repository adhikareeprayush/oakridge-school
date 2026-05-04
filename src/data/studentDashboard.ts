import type {
  StudentAssignment,
  StudentEnrollment,
  StudentMessage,
} from "../types/models";

export const studentEnrollments: StudentEnrollment[] = [
  {
    courseId: "crs-react-fundamentals",
    progressPercent: 62,
    lastActivityLabel: "2 hours ago",
    nextLessonTitle: "Custom hooks patterns",
  },
  {
    courseId: "crs-ts-productive",
    progressPercent: 28,
    lastActivityLabel: "Yesterday",
    nextLessonTitle: "Utility types deep dive",
  },
  {
    courseId: "crs-ui-design-systems",
    progressPercent: 91,
    lastActivityLabel: "3 days ago",
    nextLessonTitle: "Governance workshop",
  },
];

export const studentAssignments: StudentAssignment[] = [
  {
    id: "asg-1",
    courseTitle: "React Fundamentals",
    title: "Build a responsive dashboard shell",
    dueLabel: "May 8 · 11:59 PM",
    status: "pending",
  },
  {
    id: "asg-2",
    courseTitle: "TypeScript for Application Developers",
    title: "Typed API client refactor",
    dueLabel: "May 12 · 11:59 PM",
    status: "submitted",
  },
  {
    id: "asg-3",
    courseTitle: "UI Systems & Design Tokens",
    title: "Token migration checklist",
    dueLabel: "Apr 28 · 11:59 PM",
    status: "graded",
    score: 92,
  },
];

export const studentMessages: StudentMessage[] = [
  {
    id: "msg-1",
    from: "Sarah Lin",
    preview: "Great progress on the hooks module — optional reading attached.",
    timeLabel: "Today · 9:14 AM",
    unread: true,
  },
  {
    id: "msg-2",
    from: "Course Bot",
    preview: "Reminder: live Q&A tomorrow at 6 PM UTC.",
    timeLabel: "Yesterday",
    unread: false,
  },
];
