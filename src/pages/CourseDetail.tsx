import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiBookOpen, FiCheckCircle, FiClock } from "react-icons/fi";
import { useMockAuth } from "../hooks/useMockAuth";
import { getCourseById } from "../data/courses";

/**
 * Course syllabus view — enroll CTA simulates POST /enrollments then navigates to student dashboard.
 */
const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { login, user } = useMockAuth();
  const course = courseId ? getCourseById(courseId) : undefined;
  const [enrolled, setEnrolled] = useState(false);

  const metaLine = useMemo(() => {
    if (!course) return "";
    return `${course.lessonsCount} lessons · ${course.durationHours} hours · ${course.level}`;
  }, [course]);

  if (!course) {
    return (
      <section className="page-container flex min-h-[50vh] flex-col items-center justify-center gap-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-text">Course not found</h2>
        <p className="max-w-md text-secondText">
          No catalog entry matches this id — sync{" "}
          <code className="rounded bg-lightGray px-1 text-xs">courseId</code> with your router param.
        </p>
        <Link to="/courses" className="font-bold text-primary hover:underline">
          ← Back to catalog
        </Link>
      </section>
    );
  }

  const handleEnroll = () => {
    if (!user) {
      login({
        name: "Enrolled Student",
        email: "enrolled@example.com",
        role: "student",
      });
    }
    setEnrolled(true);
    window.setTimeout(() => navigate("/dashboard/student"), 450);
  };

  return (
    <article className="page-container py-10 md:py-14">
      <Link
        to="/courses"
        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
      >
        <FiArrowLeft aria-hidden />
        All courses
      </Link>

      <header className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-fadedPrimary px-3 py-1 text-xs font-bold text-primary">
              {course.category}
            </span>
            <span className="rounded-full bg-lightGray px-3 py-1 text-xs font-bold text-text">
              {course.level}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-text md:text-4xl">
            {course.title}
          </h1>
          <p className="mt-3 max-w-2xl text-secondText">{course.description}</p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm font-semibold text-secondText">
            <span className="flex items-center gap-2">
              <FiBookOpen className="text-primary" aria-hidden />
              {course.instructor}
            </span>
            <span className="flex items-center gap-2">
              <FiClock className="text-primary" aria-hidden />
              {metaLine}
            </span>
            <span className="flex items-center gap-2">
              ★ {course.rating} ({course.studentsCount.toLocaleString()} learners)
            </span>
          </div>
        </div>

        <aside className="rounded-2xl border border-lightGray2 bg-white p-6 accentuedDropShadow lg:sticky lg:top-28">
          <p className="text-3xl font-bold text-text">
            {course.price === 0 ? "Free" : `$${course.price}`}
          </p>
          <p className="small mt-1 text-secondText">Self-paced · Certificate included</p>
          <button
            type="button"
            onClick={handleEnroll}
            disabled={enrolled}
            className="mt-6 w-full rounded-lg bg-primary py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {enrolled ? "Redirecting…" : "Enroll (mock)"}
          </button>
          <p className="small mt-3 text-center text-secondText">
            Integrates as <code className="text-[11px]">POST /courses/:id/enroll</code>
          </p>
        </aside>
      </header>

      <section className="mt-14">
        <h2 className="text-xl font-bold text-text">What you will learn</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {course.syllabus.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-lightGray2 bg-white p-4 accentuedDropShadow"
            >
              <FiCheckCircle className="mt-0.5 shrink-0 text-success" aria-hidden />
              <span className="text-sm text-text">{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default CourseDetail;
