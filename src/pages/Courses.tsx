import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import CourseCard from "../components/Reuseable/CourseCard";
import { courseCategories, courses } from "../data/courses";

const Courses = () => {
  const [category, setCategory] = useState<(typeof courseCategories)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const catOk = category === "All" || c.category === category;
      const qOk =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [category, query]);

  return (
    <div className="bg-lightGray pb-16 pt-6 md:pt-10">
      <div className="page-container">
        <div className="rounded-2xl border border-lightGray2 bg-white px-6 py-10 accentuedDropShadow md:px-10 md:py-12">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">Catalog</p>
          <h1 className="mt-2 max-w-2xl text-3xl font-bold text-text md:text-4xl">
            Courses built for serious learners
          </h1>
          <p className="mt-4 max-w-2xl text-secondText">
            Filter and search run entirely in the client — mirror the same predicates server-side
            when you add <code className="rounded bg-lightGray px-1 text-xs">GET /courses</code>{" "}
            pagination.
          </p>

          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-md flex-1">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondText" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, instructor, topic..."
                className="w-full rounded-xl border border-lightGray2 py-3 pl-11 pr-4 text-sm outline-none ring-primary focus:ring-2"
                aria-label="Search courses"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {courseCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                    category === cat ? "bg-primary text-white" : "bg-lightGray text-text hover:bg-lightGray2"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center font-semibold text-secondText">
            No courses match — relax filters or adjust mock catalog data.
          </p>
        )}
      </div>
    </div>
  );
};

export default Courses;
