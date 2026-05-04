# Frontend architecture — School Recover

This document describes the React + Vite + Tailwind frontend: routing, mock data boundaries, and each major UI surface so backend integration can replace mocks without reshaping the UI.

## Stack

- **React 18** with **TypeScript**
- **Vite 6** for bundling
- **Tailwind CSS 3** with theme extensions in `tailwind.config.js` (palette: `primary`, `text`, `secondText`, etc.)
- **React Router 6** for client-side navigation
- **Mock session** via `sessionStorage` — not secure; for demos only

## Folder map

| Path | Purpose |
|------|---------|
| `src/App.tsx` | Router + `/dashboard` vs marketing chrome (Nav / Footer / Bottom hidden on dashboards) |
| `src/context/MockAuthProvider.tsx` | Session provider — swap for real auth provider |
| `src/context/mockAuthContext.ts` | Context object + value typing |
| `src/hooks/useMockAuth.ts` | Consumer hook |
| `src/auth/dashboardPaths.ts` | Pure helpers (`dashboardPathForRole`) kept outside context for fast-refresh hygiene |
| `src/types/models.ts` | Shared TypeScript shapes — aim to mirror JSON from future APIs |
| `src/data/*.ts` | Mock catalogs and dashboard payloads — replace with `fetch`/`axios` layers |
| `src/pages/` | Route-level screens |
| `src/components/` | Reusable marketing + dashboard building blocks |
| `src/components/dashboard/` | Layout shell and KPI/table primitives |
| `src/components/Reuseable/` | Cross-page cards (hero tiles, course tiles, mentors) |

## Routes

| Path | Screen |
|------|--------|
| `/` | Home (composed sections) |
| `/courses` | Filterable catalog |
| `/courses/:courseId` | Syllabus + enroll CTA |
| `/pricing`, `/about`, `/faq`, `/contact` | Marketing |
| `/login`, `/signup` | Auth UX (mock role + session) |
| `/dashboard/student`, `/teacher`, `/admin` | Role dashboards |

## Integration contracts (suggested)

Replace mock modules with HTTP calls while preserving types in `src/types/models.ts`:

- **Courses:** `GET /courses`, `GET /courses/:id`, `POST /courses/:id/enroll`
- **Student:** `GET /students/me/enrollments`, `GET /students/me/assignments`, `GET /students/me/messages`
- **Teacher:** `GET /teacher/cohorts`, `GET /teacher/grading-queue`, `GET /teacher/analytics/engagement`
- **Admin:** `GET /admin/metrics`, `GET /admin/users?search=`, `GET /admin/courses?status=`, report exports
- **Auth:** OAuth or password flow returning `{ user, token }` — hydrate context instead of `MockAuthProvider`

## UI components (inventory)

### Marketing layout

- **`Nav`** — Sticky header; desktop links + mobile sheet; shows Dashboard / Log out when mock session exists.
- **`Footer`** — Multi-column links + contact; uses `.page-container` horizontal rhythm.
- **`Bottom`** — Copyright strip + social icons.

### Home sections

- **`Hero`** — Headline, CTAs to `/signup` and `/courses`, illustration, three **`HeroCard`** tiles (instruction/training metaphor).
- **`Stats`**, **`ClientMatters`**, **`Features`**, **`ExpertTeachers`**, **`About`**, **`Testimonial`**, **`Pricing`**, **`PopularCourses`** (`CardMentors` grid fed by `featuredInstructors`), **`FAQ`**, **`WatchCourses`** (newsletter form mock).

### Catalog

- **`CourseCard`** — Gradient thumbnail tile, meta, link to `/courses/:courseId`.

### Auth pages

- **`Login` / `Signup`** — Social placeholders; role `<select>` drives mock session + redirect via `src/auth/dashboardPaths.ts`.

### Dashboard shell (`DashboardLayout`)

- **Premium rail:** dark gradient sidebar (`#0c0e12`), emerald wash, icon capsules, active-state glow bar, hash-aware nav (`dashNav.ts`).
- **Canvas:** `.dash-analytic-surface` grid + subtle brand radial (see `index.css`).
- **Header:** breadcrumb line, optional ⌘K search affordance, Live pulse, catalog link, avatar initials + logout.
- Sticky full-height rail on desktop; frosted executive header; children use `scroll-mt-36` section anchors.

### Dashboard primitives

- **`DashboardStatCard`** — Title, value, hint, optional icon.
- **`ProgressBar`** — Accessible `role="progressbar"`.
- **`StatusBadge`** — Tone variants for tables.

### Role pages

- **Student:** KPI row, enrollments joined to `courses`, assignments table, inbox list.
- **Teacher:** Cohort cards, grading queue with actions, CSS bar “chart” from weekly mock series.
- **Admin:** KPI row, searchable users table, filterable courses table, report placeholders.

## Detailed UI surface checklist

Use this when handing off to design or backend: each entry maps **component → user-visible behavior → mock seam**.

| Component file | What users see | Backend tie-in |
|----------------|----------------|----------------|
| `Nav.tsx` | Primary IA; auth-aware Dashboard / Log out | Replace session reads with auth SDK |
| `Hero.tsx` | Hero headline + CTAs | CMS or marketing JSON |
| `HeroCard.tsx` | Three benefit tiles under hero | Copy CMS |
| `Stats.tsx` | Metric strip | `GET /stats` |
| `ClientMatters.tsx` | Logo cloud | Partner logos endpoint |
| `Features.tsx` | Six capability tiles | CMS/features endpoint |
| `ExpertTeachers.tsx` | Mentor carousel/grid | `GET /instructors` |
| `About.tsx` | Split narrative + stat quad | CMS |
| `Testimonial.tsx` | Quotes carousel | `GET /testimonials` |
| `Pricing.tsx` | Three tiers + CTA links | Billing catalog |
| `PopularCourses.tsx` | Featured instructors (`CardMentors`) | `GET /instructors?featured=true` |
| `FAQ.tsx` | Accordion | `GET /faq` |
| `WatchCourses.tsx` | Newsletter capture | `POST /newsletter` |
| `CourseCard.tsx` | Catalog tile | Same rows as catalog API |
| `Footer.tsx` / `Bottom.tsx` | Links + legal + social | CMS/footer fragment |
| `Login.tsx` / `Signup.tsx` | Forms + demo role | OAuth/password endpoints |
| `Courses.tsx` | Search + category pills | Paginated catalog API |
| `CourseDetail.tsx` | Syllabus bullets + enroll | Course detail + enrollment mutation |
| `AboutPage.tsx` etc. | Page chrome wrappers | CMS shells |
| `Contact.tsx` | Lead topic select | `POST /contact` |
| `DashboardLayout.tsx` | Sidebar/top bar chrome | Role claims / SSO metadata |
| `DashboardStatCard.tsx` | KPI tiles | Metrics aggregates |
| `ProgressBar.tsx` | Percent visuals | Lesson completion ratios |
| `StatusBadge.tsx` | Workflow chips | Enum maps |
| `*Dashboard.tsx` (pages) | Role workspaces | Replace arrays under `src/data/` |

## Styling notes

- Global typography scales live in `src/index.css` (`h1`–`h6`, `.btn`, `.small`).
- **`section`** utility applies large vertical section padding site-wide; prefer **`footer`** / **`div`** for chrome that should not inherit that spacing (see `Footer` / `Bottom`).
- **`.page-container`** constrains horizontal padding and max width for forms and secondary pages.

## Commands

```bash
npm run dev      # local dev
npm run build    # production bundle
npm run preview  # serve built app
```
