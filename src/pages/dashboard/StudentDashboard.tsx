import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiBook,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import DashboardStatCard from "../../components/dashboard/DashboardStatCard";
import DashboardSectionHeader from "../../components/dashboard/DashboardSectionHeader";
import DashboardPanel from "../../components/dashboard/DashboardPanel";
import ProgressBar from "../../components/dashboard/ProgressBar";
import StatusBadge from "../../components/dashboard/StatusBadge";
import { courses } from "../../data/courses";
import {
  studentAssignments,
  studentEnrollments,
  studentMessages,
} from "../../data/studentDashboard";

const tableWrap =
  "w-full min-w-0 overflow-x-auto rounded-lg border border-lightGray2 bg-white accentuedDropShadow";
const th =
  "whitespace-nowrap px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-wide text-secondText";
const td = "px-4 py-2.5 text-xs text-text";
const tr =
  "border-b border-lightGray2 transition-colors hover:bg-fadedPrimary/50 even:bg-lightGray/30";

const StudentDashboard = () => {
  const avgProgress = Math.round(
    studentEnrollments.reduce((acc, e) => acc + e.progressPercent, 0) /
      Math.max(studentEnrollments.length, 1)
  );

  const pendingAssignments = studentAssignments.filter((a) => a.status === "pending");

  return (
    <DashboardLayout
      role="student"
      title="My learning"
      subtitle="Track progress, deadlines, and updates from your instructors."
    >
      <section className="w-full min-w-0 scroll-mt-24" aria-label="Overview metrics">
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
        <DashboardStatCard
          title="Courses enrolled"
          value={`${studentEnrollments.length}`}
          hint="Your active courses"
          icon={<FiBook className="text-[17px]" />}
        />
        <DashboardStatCard
          title="Average progress"
          value={`${avgProgress}%`}
          delta={{ label: "On track", positive: true }}
          hint="Across all enrollments"
          icon={<FiTrendingUp className="text-[17px]" />}
        />
        <DashboardStatCard
          title="Due soon"
          value={`${pendingAssignments.length}`}
          hint="Assignments awaiting submit"
          icon={<FiClock className="text-[17px]" />}
        />
        <DashboardStatCard
          title="Certificates"
          value="3"
          hint="Completed programs"
          icon={<FiCheckCircle className="text-[17px]" />}
        />
        </div>
      </section>

      <section id="courses" className="w-full min-w-0 scroll-mt-24">
        <DashboardSectionHeader
          eyebrow="Learning"
          title="My courses"
          description="Continue where you left off — each row links to the full course outline."
          action={
            <Link
              to="/courses"
              className="inline-flex items-center gap-1 rounded-lg border border-lightGray2 bg-white px-3 py-2 text-xs font-bold text-primary shadow-sm hover:bg-fadedPrimary"
            >
              Browse catalog
              <FiArrowUpRight className="text-secondText" aria-hidden />
            </Link>
          }
        />
        <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-3">
          {studentEnrollments.map((row) => {
            const course = courses.find((c) => c.id === row.courseId);
            if (!course) return null;
            return (
              <DashboardPanel key={course.id} pad="none" className="overflow-hidden p-0">
                <div className="border-b border-lightGray2 bg-lightGray/40 px-4 py-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-secondText">
                        {course.id}
                      </p>
                      <h3 className="mt-0.5 text-sm font-bold leading-snug text-text">
                        {course.title}
                      </h3>
                      <p className="mt-1 text-xs text-secondText">
                        With <span className="font-semibold text-text">{course.instructor}</span>
                      </p>
                    </div>
                    <span className="shrink-0 rounded border border-lightGray2 bg-white px-2 py-1 text-[10px] font-bold text-secondText">
                      {row.lastActivityLabel}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 px-4 py-4">
                  <div>
                    <div className="mb-1 flex justify-between text-xs font-semibold text-text">
                      <span>Progress</span>
                      <span className="tabular-nums">{row.progressPercent}%</span>
                    </div>
                    <ProgressBar value={row.progressPercent} label={`Progress for ${course.title}`} />
                  </div>
                  <p className="text-xs text-secondText">
                    Next: <span className="font-semibold text-text">{row.nextLessonTitle}</span>
                  </p>
                  <Link
                    to={`/courses/${course.id}`}
                    className="inline-block text-xs font-bold text-primary hover:underline"
                  >
                    View course →
                  </Link>
                </div>
              </DashboardPanel>
            );
          })}
        </div>
      </section>

      <section id="assignments" className="w-full min-w-0 scroll-mt-24">
        <DashboardSectionHeader
          eyebrow="Coursework"
          title="Assignments"
          description="Due dates and submission status."
        />
        <div className={tableWrap}>
          <table className="w-full min-w-[480px] border-collapse text-left">
            <thead className="border-b border-lightGray2 bg-lightGray/50">
              <tr>
                <th className={th}>Course</th>
                <th className={th}>Assignment</th>
                <th className={th}>Due</th>
                <th className={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {studentAssignments.map((a) => (
                <tr key={a.id} className={tr}>
                  <td className={`${td} font-semibold text-text`}>{a.courseTitle}</td>
                  <td className={td}>{a.title}</td>
                  <td className={`${td} text-secondText`}>{a.dueLabel}</td>
                  <td className={td}>
                    {a.status === "pending" && <StatusBadge tone="warning">Pending</StatusBadge>}
                    {a.status === "submitted" && <StatusBadge tone="neutral">Submitted</StatusBadge>}
                    {a.status === "graded" && (
                      <StatusBadge tone="success">Graded · {a.score}%</StatusBadge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="inbox" className="w-full min-w-0 scroll-mt-24 pb-1">
        <DashboardSectionHeader
          eyebrow="Inbox"
          title="Messages"
          description="Notes and reminders from instructors."
        />
        <ul className="flex w-full flex-col gap-2">
          {studentMessages.map((m) => (
            <li key={m.id} className="w-full min-w-0">
              <DashboardPanel
                pad="sm"
                className={
                  m.unread ? "border-l-[3px] border-l-primary bg-fadedPrimary/40" : ""
                }
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="text-sm font-bold text-text">{m.from}</p>
                  <span className="text-[11px] font-semibold text-secondText">{m.timeLabel}</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-secondText">{m.preview}</p>
                {m.unread && (
                  <span className="mt-2 inline-block text-[10px] font-bold uppercase tracking-wide text-primary">
                    Unread
                  </span>
                )}
              </DashboardPanel>
            </li>
          ))}
        </ul>
      </section>
    </DashboardLayout>
  );
};

export default StudentDashboard;
