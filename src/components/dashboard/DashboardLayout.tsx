import {
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiBook,
  FiHome,
  FiLogOut,
  FiMail,
  FiMenu,
  FiSearch,
  FiUsers,
  FiX,
  FiClipboard,
  FiBarChart2,
  FiExternalLink,
} from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import type { UserRole } from "../../types/models";
import { dashboardPathForRole } from "../../auth/dashboardPaths";
import { useMockAuth } from "../../hooks/useMockAuth";
import { isDashboardNavActive } from "./dashNav";
import { SITE_NAME, SITE_SHORT } from "../../constants/site";

interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
}

function navItemsForRole(role: UserRole): NavItem[] {
  switch (role) {
    case "student":
      return [
        { to: "/dashboard/student", label: "Overview", icon: <FiHome /> },
        { to: "/dashboard/student#courses", label: "My courses", icon: <FiBook /> },
        { to: "/dashboard/student#assignments", label: "Assignments", icon: <FiClipboard /> },
        { to: "/dashboard/student#inbox", label: "Messages", icon: <FiMail /> },
      ];
    case "teacher":
      return [
        { to: "/dashboard/teacher", label: "Overview", icon: <FiHome /> },
        { to: "/dashboard/teacher#classes", label: "Classes", icon: <HiOutlineAcademicCap /> },
        { to: "/dashboard/teacher#grading", label: "Grading", icon: <FiClipboard /> },
        { to: "/dashboard/teacher#insights", label: "Analytics", icon: <FiBarChart2 /> },
      ];
    case "admin":
      return [
        { to: "/dashboard/admin", label: "Overview", icon: <FiHome /> },
        { to: "/dashboard/admin#users", label: "Users", icon: <FiUsers /> },
        { to: "/dashboard/admin#courses", label: "Courses", icon: <FiBook /> },
        { to: "/dashboard/admin#reports", label: "Reports", icon: <FiBarChart2 /> },
      ];
    default:
      return [];
  }
}

function roleLabel(role: UserRole): string {
  switch (role) {
    case "student":
      return "Student";
    case "teacher":
      return "Teacher";
    case "admin":
      return "Admin";
    default:
      return role;
  }
}

function userInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "—";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface DashboardLayoutProps {
  role: UserRole;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

function scrollDashSection(container: HTMLElement, hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) {
    container.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el && container.contains(el)) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

const DashboardLayout = ({ role, title, subtitle, children }: DashboardLayoutProps) => {
  const { user, logout, dashboardPath } = useMockAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mainScrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = mainScrollRef.current;
    if (!el) return;
    scrollDashSection(el, location.hash);
  }, [location.pathname, location.hash]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const items = navItemsForRole(role);
  const displayName = user?.name ?? "Guest";
  const displayEmail = user?.email ?? "—";

  const breadcrumb = [
    "Dashboard",
    roleLabel(role),
    items.find((i) => isDashboardNavActive(location.pathname, location.hash, i.to))?.label ??
      "Overview",
  ].join(" · ");

  const handleNavClick =
    (to: string, onNavigate?: () => void) => (e: MouseEvent<HTMLAnchorElement>) => {
      onNavigate?.();
      const [path, frag] = to.split("#");
      if (location.pathname !== path) return;

      e.preventDefault();
      if (frag) void navigate(`${path}#${frag}`, { replace: false });
      else void navigate(path, { replace: false });

      requestAnimationFrame(() => {
        const c = mainScrollRef.current;
        if (c) scrollDashSection(c, frag ? `#${frag}` : "");
      });
    };

  const sidebarBody = (opts: { onNavigate?: () => void }) => (
    <>
      <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-white/10 px-4 lg:h-[56px] lg:px-4">
        <Link
          to="/"
          onClick={opts.onNavigate}
          className="group flex min-w-0 items-center gap-2.5"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white shadow-md ring-1 ring-white/20">
            {SITE_SHORT.charAt(0)}
          </span>
          <div className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-bold tracking-tight text-white">
              {SITE_NAME}
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/50">
              Dashboard
            </span>
          </div>
        </Link>
        <button
          type="button"
          className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <FiX className="text-xl" />
        </button>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-2 py-4 lg:px-3">
        <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-wider text-white/45">
          Menu
        </p>
        <nav className="flex flex-col gap-0.5">
          {items.map((item) => {
            const active = isDashboardNavActive(
              location.pathname,
              location.hash,
              item.to
            );
            return (
              <Link
                key={item.to}
                to={item.to}
                replace={false}
                onClick={handleNavClick(item.to, opts.onNavigate)}
                className={[
                  "group relative flex items-center gap-3 rounded-lg py-2 pl-3 pr-3 text-[13px] font-semibold transition-colors",
                  active
                    ? "bg-white/12 text-white shadow-inner shadow-black/10"
                    : "text-white/65 hover:bg-white/[0.07] hover:text-white",
                ].join(" ")}
              >
                {active && (
                  <span
                    className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-primary"
                    aria-hidden
                  />
                )}
                <span
                  className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-[16px] transition-colors",
                    active
                      ? "border-primary/40 bg-primary/20 text-primary"
                      : "border-white/10 bg-white/[0.04] text-white/55 group-hover:border-white/15 group-hover:text-white/90",
                  ].join(" ")}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 border-t border-white/10 pt-4">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-white/45">
            Demo role
          </p>
          <div className="flex flex-wrap gap-1.5 px-1">
            {(["student", "teacher", "admin"] as UserRole[]).map((r) => (
              <Link
                key={r}
                to={dashboardPathForRole(r)}
                onClick={opts.onNavigate}
                className={[
                  "rounded-md px-2.5 py-1 text-[10px] font-bold capitalize transition-colors",
                  r === role
                    ? "bg-primary text-white shadow-md"
                    : "bg-white/10 text-white/75 hover:bg-white/15",
                ].join(" ")}
              >
                {r}
              </Link>
            ))}
          </div>
          <Link
            to="/login"
            onClick={opts.onNavigate}
            className="mt-3 block px-3 text-xs font-semibold text-primary hover:underline"
          >
            ← Sign in
          </Link>
        </div>
      </div>

      <div className="shrink-0 border-t border-white/10 bg-black/15 p-3">
        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-darkBg font-bold text-white ring-2 ring-white/10">
            {userInitials(displayName)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-white">{displayName}</p>
            <p className="truncate text-[10px] text-white/55">{displayEmail}</p>
          </div>
        </div>
      </div>
    </>
  );

  const sidebarChrome = (opts: { onNavigate?: () => void }) => (
    <aside className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-darkBg lg:bg-gradient-to-b lg:from-darkBg lg:to-[#243547]">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 100% 80% at 0% 0%, rgba(150,187,124,0.14), transparent 55%)",
        }}
      />
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">{sidebarBody(opts)}</div>
    </aside>
  );

  return (
    <div className="dash-app flex min-h-screen bg-lightGray font-mont">
      <div className="relative hidden min-h-screen w-[248px] shrink-0 border-r border-white/10 lg:sticky lg:top-0 lg:block lg:h-screen lg:w-[260px]">
        {sidebarChrome({})}
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-label="Close overlay"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-[min(272px,88vw)] flex-col shadow-2xl">
            {sidebarChrome({ onNavigate: () => setMobileOpen(false) })}
          </div>
        </div>
      )}

      <div className="dash-analytic-surface flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-lightGray2 bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
            <div className="flex min-w-0 items-start gap-3">
              <button
                type="button"
                className="mt-0.5 shrink-0 rounded-lg border border-lightGray2 bg-white p-2 text-text lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <FiMenu className="text-xl" />
              </button>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-secondText">
                  {breadcrumb}
                </p>
                <h1 className="mt-0.5 text-lg font-bold tracking-tight text-text md:text-xl">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-1 max-w-2xl text-xs leading-relaxed text-secondText">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              <button
                type="button"
                className="hidden items-center gap-2 rounded-lg border border-lightGray2 bg-white px-3 py-2 text-[11px] text-secondText md:flex"
              >
                <FiSearch className="text-muted" aria-hidden />
                Search
              </button>

              {dashboardPath && (
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-lightGray2 bg-white px-3 py-2 text-xs font-bold text-text hover:border-primary hover:text-primary"
                >
                  Courses
                  <FiExternalLink className="text-secondText" aria-hidden />
                </Link>
              )}

              <span className="hidden items-center gap-1.5 rounded-full border border-primary/25 bg-fadedPrimary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-success md:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Live
              </span>

              <div className="hidden h-7 w-px bg-lightGray2 md:block" aria-hidden />

              <div className="flex items-center gap-2 rounded-lg border border-lightGray2 bg-white px-2 py-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-darkBg text-[10px] font-bold text-white md:hidden">
                  {userInitials(displayName)}
                </div>
                <div className="hidden text-right md:block">
                  <p className="text-[11px] font-bold leading-tight text-text">{displayName}</p>
                  <p className="text-[10px] leading-tight text-secondText">
                    {roleLabel(user?.role ?? role)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-secondText transition hover:bg-lightGray hover:text-text"
                  aria-label="Log out"
                >
                  <FiLogOut className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div
          ref={mainScrollRef}
          className="flex-1 overflow-auto py-2 md:py-3"
        >
          <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 lg:px-8">
            <div className="flex w-full min-w-0 flex-col gap-3 md:gap-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
