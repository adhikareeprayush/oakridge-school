/** Domain shapes used across mock data; mirror your future API responses. */

export type UserRole = "student" | "teacher" | "admin";

export interface MockUser {
  name: string;
  email: string;
  role: UserRole;
}

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorId: string;
  category: string;
  level: CourseLevel;
  durationHours: number;
  lessonsCount: number;
  rating: number;
  studentsCount: number;
  price: number;
  /** Tailwind gradient classes for placeholder hero tiles */
  thumbnailClass: string;
  description: string;
  syllabus: string[];
}

export interface StudentEnrollment {
  courseId: string;
  progressPercent: number;
  lastActivityLabel: string;
  nextLessonTitle: string;
}

export interface StudentAssignment {
  id: string;
  courseTitle: string;
  title: string;
  dueLabel: string;
  status: "pending" | "submitted" | "graded";
  score?: number;
}

export interface StudentMessage {
  id: string;
  from: string;
  preview: string;
  timeLabel: string;
  unread: boolean;
}

export interface TeacherClassSummary {
  id: string;
  title: string;
  studentsCount: number;
  avgProgress: number;
  nextSessionLabel: string;
}

export interface TeacherSubmissionQueueItem {
  id: string;
  studentName: string;
  assignmentTitle: string;
  submittedLabel: string;
}

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "invited" | "suspended";
  joinedLabel: string;
}

export interface AdminCourseRow {
  id: string;
  title: string;
  instructor: string;
  status: "published" | "draft" | "review";
  enrollments: number;
}

export interface AdminMetric {
  label: string;
  value: string;
  changeLabel: string;
  positive: boolean;
}
