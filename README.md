# course catalog

project for **Advanced Web Technologies** (Lab 1 + Lab 2).

A small course catalog built with **Next.js 16 (App Router)** + **TypeScript** +
**Tailwind CSS** + **shadcn/ui**. Data is mocked in `lib/courses.ts` with a fake
300 ms delay so the loading state is visible.

## pages

- `/` — home
- `/about` - about the project
- `/courses` - list of all courses
- `/courses/[id]` - single course page with a like button

## lab 1 - routing and data

- App Router, file-based routing
- Server components, `await getCourses()`
- One client component - `components/LikeButton.tsx` (`'use client'`)
- Dynamic route `/courses/[id]`, `generateStaticParams`
- `not-found.tsx`, `loading.tsx`
- Shared navigation `Home / Courses / About` in `app/layout.tsx`

## lab 2 - styling (Tailwind + shadcn/ui)

- Installed shadcn/ui, added `Button` and `Card`
- `CourseCard.tsx` rewritten with `Card / CardHeader / CardTitle / CardContent / Button`
  (still a **Server Component**, no `'use client'`)
- `LikeButton.tsx` uses the shadcn/ui `Button`
- `/courses` — responsive grid: **1 → 2 (sm) → 3 (lg) → 4 (xl)** columns
- Card hover effect: `hover:shadow-md hover:border-blue-300 transition`
- Navigation: `flex`, `gap`, padding, hover state, bottom border
- Responsiveness verified via DevTools (phone / tablet / desktop)

## Project structure

```
app/
├── layout.tsx
├── page.tsx
├── globals.css
├── about/page.tsx
└── courses/
    ├── page.tsx
    ├── not-found.tsx
    └── [id]/
        ├── page.tsx
        └── loading.tsx
components/
├── CourseCard.tsx
├── LikeButton.tsx
└── ui/            # shadcn/ui
lib/
├── courses.ts
└── utils.ts
```

## Run

```bash
npm install
npm run dev      
npm run build   
```