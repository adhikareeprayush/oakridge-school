import { Link } from "react-router-dom";
import type { Course } from "../../types/models";

interface CourseCardProps {
  course: Course;
}

/**
 * Catalog tile — used on `/courses` and cross-linked from marketing sections.
 */
const CourseCard = ({ course }: CourseCardProps) => (
  <article className="flex flex-col overflow-hidden rounded-2xl border border-lightGray2 bg-white accentuedDropShadow transition-shadow hover:shadow-lg">
    <div
      className={`h-36 bg-gradient-to-br ${course.thumbnailClass} shrink-0`}
      aria-hidden
    />
    <div className="flex flex-1 flex-col gap-3 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-fadedPrimary px-2.5 py-0.5 text-xs font-bold text-primary">
          {course.category}
        </span>
        <span className="text-xs font-semibold text-secondText">{course.level}</span>
      </div>
      <h3 className="text-lg font-bold leading-snug text-text">{course.title}</h3>
      <p className="line-clamp-2 text-sm text-secondText">{course.description}</p>
      <div className="small flex flex-wrap gap-x-4 gap-y-1 text-secondText">
        <span>{course.lessonsCount} lessons</span>
        <span>{course.durationHours}h</span>
        <span>★ {course.rating}</span>
      </div>
      <div className="mt-auto flex items-center justify-between pt-2">
        <p className="text-lg font-bold text-text">
          {course.price === 0 ? "Free" : `$${course.price}`}
        </p>
        <Link
          to={`/courses/${course.id}`}
          className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:opacity-90"
        >
          View course
        </Link>
      </div>
    </div>
  </article>
);

export default CourseCard;
