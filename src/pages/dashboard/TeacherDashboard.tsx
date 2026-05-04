import { FiActivity, FiClipboard, FiTrendingUp, FiUsers } from "react-icons/fi";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import DashboardStatCard from "../../components/dashboard/DashboardStatCard";
import DashboardSectionHeader from "../../components/dashboard/DashboardSectionHeader";
import DashboardPanel from "../../components/dashboard/DashboardPanel";
import ProgressBar from "../../components/dashboard/ProgressBar";
import {
  teacherClasses,
  teacherSubmissionQueue,
  teacherWeeklyEngagementPercent,
} from "../../data/teacherDashboard";

const tableWrap =
  "w-full min-w-0 overflow-x-auto rounded-lg border border-lightGray2 bg-white accentuedDropShadow";
const th =
  "whitespace-nowrap px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-wide text-secondText";
const td = "px-4 py-2.5 text-xs text-text";
const tr =
  "border-b border-lightGray2 transition-colors hover:bg-fadedPrimary/50 even:bg-lightGray/30";

const TeacherDashboard = () => {
  const totalStudents = teacherClasses.reduce((acc, c) => acc + c.studentsCount, 0);
  const avgCohortProgress = Math.round(
    teacherClasses.reduce((acc, c) => acc + c.avgProgress, 0) /
      Math.max(teacherClasses.length, 1)
  );
  const maxBar = Math.max(...teacherWeeklyEngagementPercent, 1);

  return (
    <DashboardLayout
      role="teacher"
      title="Teaching overview"
      subtitle="Classes, grading queue, and weekly engagement snapshot."
    >
      <section className="w-full min-w-0 scroll-mt-24" aria-label="Overview metrics">
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
        <DashboardStatCard
          title="Active classes"
          value={`${teacherClasses.length}`}
          hint="Sections you lead"
          icon={<FiActivity className="text-[17px]" />}
        />
        <DashboardStatCard
          title="Total students"
          value={totalStudents.toLocaleString()}
          delta={{ label: "This term", positive: true }}
          hint="Across listed cohorts"
          icon={<FiUsers className="text-[17px]" />}
        />
        <DashboardStatCard
          title="Avg. progress"
          value={`${avgCohortProgress}%`}
          hint="Mean completion"
          icon={<FiTrendingUp className="text-[17px]" />}
        />
        <DashboardStatCard
          title="To grade"
          value={`${teacherSubmissionQueue.length}`}
          hint="Awaiting review"
          icon={<FiClipboard className="text-[17px]" />}
        />
        </div>
      </section>

      <section id="classes" className="w-full min-w-0 scroll-mt-24">
        <DashboardSectionHeader
          eyebrow="Rosters"
          title="My classes"
          description="Session schedule and cohort completion."
        />
        <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-3">
          {teacherClasses.map((c) => (
            <DashboardPanel key={c.id} pad="none" className="overflow-hidden p-0">
              <div className="border-b border-lightGray2 bg-fadedPrimary/30 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-secondText">{c.id}</p>
                <h3 className="mt-1 text-sm font-bold text-text">{c.title}</h3>
                <p className="mt-1 text-xs text-secondText">{c.nextSessionLabel}</p>
              </div>
              <div className="grid grid-cols-2 divide-x divide-lightGray2 border-b border-lightGray2 bg-white">
                <div className="px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-secondText">
                    Students
                  </p>
                  <p className="mt-0.5 tabular-nums text-xl font-bold text-text">{c.studentsCount}</p>
                </div>
                <div className="px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-secondText">
                    Progress
                  </p>
                  <p className="mt-0.5 tabular-nums text-xl font-bold text-primary">{c.avgProgress}%</p>
                </div>
              </div>
              <div className="px-4 py-4">
                <ProgressBar value={c.avgProgress} label={`Average progress for ${c.title}`} />
                <button
                  type="button"
                  className="mt-3 w-full rounded-lg border border-lightGray2 bg-lightGray/40 py-2 text-xs font-bold text-text hover:bg-fadedPrimary"
                >
                  Open roster (demo)
                </button>
              </div>
            </DashboardPanel>
          ))}
        </div>
      </section>

      <section id="grading" className="w-full min-w-0 scroll-mt-24">
        <DashboardSectionHeader
          eyebrow="Workflow"
          title="Grading queue"
          description="Submissions waiting for feedback."
        />
        <div className={tableWrap}>
          <table className="w-full min-w-[480px] border-collapse text-left">
            <thead className="border-b border-lightGray2 bg-lightGray/50">
              <tr>
                <th className={th}>Student</th>
                <th className={th}>Assignment</th>
                <th className={th}>Submitted</th>
                <th className={`${th} text-right`}>Action</th>
              </tr>
            </thead>
            <tbody>
              {teacherSubmissionQueue.map((s) => (
                <tr key={s.id} className={tr}>
                  <td className={`${td} font-semibold text-text`}>{s.studentName}</td>
                  <td className={td}>{s.assignmentTitle}</td>
                  <td className={`${td} text-secondText`}>{s.submittedLabel}</td>
                  <td className={`${td} text-right`}>
                    <button
                      type="button"
                      className="rounded-md bg-primary px-3 py-1.5 text-[11px] font-bold text-white hover:opacity-90"
                    >
                      Grade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="insights" className="w-full min-w-0 scroll-mt-24 pb-1">
        <DashboardSectionHeader
          eyebrow="Analytics"
          title="Weekly engagement"
          description="Relative activity index by day (demo data)."
        />
        <DashboardPanel pad="md" className="w-full min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-lightGray2 pb-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-secondText">
                Latest day
              </p>
              <p className="tabular-nums text-2xl font-bold text-text">
                {teacherWeeklyEngagementPercent[6]}%
              </p>
            </div>
          </div>

          <div className="relative mt-3 pb-6">
            <div className="pointer-events-none absolute bottom-6 left-0 top-0 flex w-6 flex-col justify-between text-[9px] font-semibold tabular-nums text-secondText">
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>
            <div className="grid h-36 grid-cols-7 gap-1.5 border-b border-lightGray2 pl-8">
              {teacherWeeklyEngagementPercent.map((pct, i) => (
                <div key={i} className="relative flex flex-col justify-end">
                  <div
                    className="mx-auto w-full max-w-[36px] rounded-t-md bg-primary shadow-md shadow-primary/25"
                    style={{
                      height: `${Math.max(20, Math.round((pct / maxBar) * 132))}px`,
                    }}
                    title={`Day ${i + 1}: ${pct}%`}
                  />
                  <span className="absolute -bottom-6 left-0 right-0 text-center text-[10px] font-semibold tabular-nums text-secondText">
                    D{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </DashboardPanel>
      </section>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
