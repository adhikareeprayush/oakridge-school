import { useMemo, useState } from "react";
import { FiBook, FiDownload, FiSearch, FiUsers } from "react-icons/fi";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import DashboardStatCard from "../../components/dashboard/DashboardStatCard";
import DashboardSectionHeader from "../../components/dashboard/DashboardSectionHeader";
import DashboardPanel from "../../components/dashboard/DashboardPanel";
import StatusBadge from "../../components/dashboard/StatusBadge";
import { adminCourses, adminMetrics, adminUsers } from "../../data/adminDashboard";

const tableWrap =
  "w-full min-w-0 overflow-x-auto rounded-lg border border-lightGray2 bg-white accentuedDropShadow";
const th =
  "whitespace-nowrap px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-wide text-secondText";
const td = "px-4 py-2.5 text-xs text-text";
const tr =
  "border-b border-lightGray2 transition-colors hover:bg-fadedPrimary/50 even:bg-lightGray/30";

const AdminDashboard = () => {
  const [userQuery, setUserQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState<"all" | "published" | "draft" | "review">(
    "all"
  );

  const filteredUsers = useMemo(() => {
    const q = userQuery.trim().toLowerCase();
    if (!q) return adminUsers;
    return adminUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [userQuery]);

  const filteredCourses = useMemo(() => {
    if (courseFilter === "all") return adminCourses;
    return adminCourses.filter((c) => c.status === courseFilter);
  }, [courseFilter]);

  const toneForUserStatus = (s: (typeof adminUsers)[0]["status"]) => {
    if (s === "active") return "success" as const;
    if (s === "invited") return "warning" as const;
    return "danger" as const;
  };

  const toneForCourseStatus = (s: (typeof adminCourses)[0]["status"]) => {
    if (s === "published") return "success" as const;
    if (s === "review") return "warning" as const;
    return "neutral" as const;
  };

  return (
    <DashboardLayout
      role="admin"
      title="Admin console"
      subtitle="Key metrics, users, courses, and exports."
    >
      <section className="w-full min-w-0 scroll-mt-24" aria-label="Overview metrics">
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
        {adminMetrics.map((m) => (
          <DashboardStatCard
            key={m.label}
            title={m.label}
            value={m.value}
            delta={{ label: m.changeLabel, positive: m.positive }}
            hint="Trailing period (demo)"
          />
        ))}
        </div>
      </section>

      <section id="users" className="w-full min-w-0 scroll-mt-24">
        <DashboardSectionHeader
          eyebrow="People"
          title="Users"
          description="Search filters this list on the client."
          action={
            <div className="relative w-full min-w-[200px] md:w-64">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Search…"
                className="w-full rounded-lg border border-lightGray2 bg-white py-2 pl-9 pr-3 text-xs outline-none ring-primary/30 focus:ring-2"
                aria-label="Filter users"
              />
            </div>
          }
        />
        <div className={tableWrap}>
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead className="border-b border-lightGray2 bg-lightGray/50">
              <tr>
                <th className={th}>Name</th>
                <th className={th}>Email</th>
                <th className={th}>Role</th>
                <th className={th}>Status</th>
                <th className={`${th} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className={tr}>
                  <td className={`${td} font-semibold text-text`}>{u.name}</td>
                  <td className={`${td} text-secondText`}>{u.email}</td>
                  <td className={`${td} capitalize`}>{u.role}</td>
                  <td className={td}>
                    <StatusBadge tone={toneForUserStatus(u.status)}>{u.status}</StatusBadge>
                  </td>
                  <td className={`${td} text-right`}>
                    <button
                      type="button"
                      className="text-[11px] font-bold text-primary hover:underline"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="courses" className="w-full min-w-0 scroll-mt-24">
        <DashboardSectionHeader
          eyebrow="Catalog"
          title="Courses"
          description="Filter by publication state."
          action={
            <div className="flex flex-wrap gap-1 rounded-lg border border-lightGray2 bg-lightGray/40 p-1">
              {(["all", "published", "draft", "review"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setCourseFilter(f)}
                  className={[
                    "rounded-md px-3 py-1.5 text-[10px] font-bold capitalize transition",
                    courseFilter === f
                      ? "bg-white text-text shadow-sm ring-1 ring-lightGray2"
                      : "text-secondText hover:text-text",
                  ].join(" ")}
                >
                  {f}
                </button>
              ))}
            </div>
          }
        />
        <div className={tableWrap}>
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead className="border-b border-lightGray2 bg-lightGray/50">
              <tr>
                <th className={th}>Course</th>
                <th className={th}>Instructor</th>
                <th className={th}>Status</th>
                <th className={`${th} text-right tabular-nums`}>Enrollments</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((c) => (
                <tr key={c.id} className={tr}>
                  <td className={`${td} max-w-[220px]`}>
                    <span className="font-semibold text-text">{c.title}</span>
                    <span className="mt-0.5 block text-[10px] text-secondText">{c.id}</span>
                  </td>
                  <td className={td}>{c.instructor}</td>
                  <td className={td}>
                    <StatusBadge tone={toneForCourseStatus(c.status)}>{c.status}</StatusBadge>
                  </td>
                  <td className={`${td} text-right tabular-nums font-bold text-text`}>
                    {c.enrollments.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="reports" className="w-full min-w-0 scroll-mt-24 pb-1">
        <DashboardSectionHeader
          eyebrow="Reports"
          title="Exports"
          description="Generate files or schedule sends (demo buttons)."
        />
        <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
          <DashboardPanel>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-lightGray2 bg-fadedPrimary text-primary">
                <FiUsers className="text-lg" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-text">Signups report</h3>
                <p className="mt-1 text-xs text-secondText">Monthly funnel · CSV</p>
              </div>
            </div>
            <button
              type="button"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-xs font-bold text-white hover:opacity-90"
            >
              <FiDownload aria-hidden />
              Download (demo)
            </button>
          </DashboardPanel>

          <DashboardPanel>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-lightGray2 bg-fadedPrimary text-primary">
                <FiBook className="text-lg" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-text">Completion report</h3>
                <p className="mt-1 text-xs text-secondText">By cohort · CSV</p>
              </div>
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-lg border border-lightGray2 bg-white py-2.5 text-xs font-bold text-text hover:border-primary hover:text-primary"
            >
              Schedule (demo)
            </button>
          </DashboardPanel>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default AdminDashboard;
