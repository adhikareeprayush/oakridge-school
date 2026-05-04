import type { Course } from "../types/models";

/**
 * Replace with `GET /api/courses` — keep field names aligned for drop-in mapping.
 */
export const courses: Course[] = [
  {
    id: "crs-react-fundamentals",
    title: "React Fundamentals",
    instructor: "Sarah Lin",
    instructorId: "usr-sarah",
    category: "Development",
    level: "Beginner",
    durationHours: 12,
    lessonsCount: 42,
    rating: 4.8,
    studentsCount: 3840,
    price: 49,
    thumbnailClass: "from-emerald-500 to-teal-700",
    description:
      "Components, hooks, state, and routing — build real UI with patterns used in production React apps.",
    syllabus: [
      "JSX and component model",
      "useState, useEffect, custom hooks",
      "React Router and layouts",
      "Forms and accessibility basics",
      "Performance checklist",
    ],
  },
  {
    id: "crs-ts-productive",
    title: "TypeScript for Application Developers",
    instructor: "Marcus Webb",
    instructorId: "usr-marcus",
    category: "Development",
    level: "Intermediate",
    durationHours: 18,
    lessonsCount: 56,
    rating: 4.9,
    studentsCount: 2210,
    price: 69,
    thumbnailClass: "from-sky-600 to-indigo-800",
    description:
      "Strong typing for APIs, generics, utility types, and refactoring JavaScript codebases with confidence.",
    syllabus: [
      "Types vs interfaces",
      "Generics and constraints",
      "Zod or runtime validation (integration-ready)",
      "Patterns for React + TS",
      "Publishing shared internal types",
    ],
  },
  {
    id: "crs-ui-design-systems",
    title: "UI Systems & Design Tokens",
    instructor: "Elena Rossi",
    instructorId: "usr-elena",
    category: "Design",
    level: "Intermediate",
    durationHours: 10,
    lessonsCount: 28,
    rating: 4.7,
    studentsCount: 980,
    price: 59,
    thumbnailClass: "from-violet-500 to-fuchsia-700",
    description:
      "Ship cohesive interfaces: tokens, components, documentation, and handoff between design and engineering.",
    syllabus: [
      "Token naming and structure",
      "Building a primitive library",
      "Documentation with Storybook-style workflows",
      "Accessibility in systems",
      "Governance and versioning",
    ],
  },
  {
    id: "crs-data-literacy",
    title: "Data Literacy for Leaders",
    instructor: "James Okonkwo",
    instructorId: "usr-james",
    category: "Business",
    level: "Beginner",
    durationHours: 6,
    lessonsCount: 18,
    rating: 4.6,
    studentsCount: 5120,
    price: 0,
    thumbnailClass: "from-amber-500 to-orange-700",
    description:
      "Read dashboards, spot biases in metrics, and ask better questions — without a statistics degree.",
    syllabus: [
      "Metric definitions that matter",
      "Sampling and survivorship bias",
      "Forecasting basics",
      "Stakeholder communication",
    ],
  },
  {
    id: "crs-python-analytics",
    title: "Python for Analytics",
    instructor: "Priya Natarajan",
    instructorId: "usr-priya",
    category: "Data",
    level: "Beginner",
    durationHours: 14,
    lessonsCount: 36,
    rating: 4.85,
    studentsCount: 2890,
    price: 55,
    thumbnailClass: "from-lime-600 to-green-800",
    description:
      "Notebooks, pandas workflows, and clean charts — from messy CSVs to reproducible reports.",
    syllabus: [
      "Environment setup",
      "pandas essentials",
      "Visualization principles",
      "Sharing notebooks responsibly",
    ],
  },
  {
    id: "crs-cyber-awareness",
    title: "Cybersecurity Awareness",
    instructor: "Daniel Höller",
    instructorId: "usr-daniel",
    category: "Security",
    level: "Beginner",
    durationHours: 4,
    lessonsCount: 14,
    rating: 4.5,
    studentsCount: 12000,
    price: 0,
    thumbnailClass: "from-slate-700 to-slate-900",
    description:
      "Phishing, passwords, MFA, and safe remote work — practical habits for every role.",
    syllabus: [
      "Threat models in plain language",
      "Password managers and MFA",
      "Email and link safety",
      "Incident reporting",
    ],
  },
];

export const courseCategories = [
  "All",
  ...Array.from(new Set(courses.map((c) => c.category))),
] as const;

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}
