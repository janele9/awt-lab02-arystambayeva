# course catalog

project for **Advanced Web Technologies** (Lab 1 + Lab 2 + Lab 5).

A small course catalog built with **Next.js 16 (App Router)** + **TypeScript** +
**Tailwind CSS** + **shadcn/ui**. Course data now lives in the FastAPI backend
in `course-catalog-api` — the old mock data in `lib/courses.ts` is gone.

## pages

- `/` — home
- `/about` — about the project
- `/courses` — list of all courses (fetched from the backend by a Server Component)
- `/courses/[id]` — single course page (like button + enroll form)
- `/filter` — electives-only filter, runs SWR in the browser

## lab 1 - routing and data

- App Router, file-based routing
- Server components, `await getCourses()`
- One client component — `components/LikeButton.tsx` (`'use client'`)
- Dynamic route `/courses/[id]`
- `not-found.tsx`, `loading.tsx`
- Shared navigation `Home / Courses / About` in `app/layout.tsx`

> `generateStaticParams` was implemented in Lab 1 and **deliberately removed**
> in Lab 5, when data moved to the backend. See "Decisions" below.

## lab 2 - styling (Tailwind + shadcn/ui)

- Installed shadcn/ui, added `Button` and `Card`
- `CourseCard.tsx` rewritten with `Card / CardHeader / CardTitle / CardContent / Button`
  (still a **Server Component**, no `'use client'`)
- `/courses` — responsive grid: **1 -> 2 (sm) -> 3 (lg) -> 4 (xl)** columns
- Card hover effect: `hover:shadow-md hover:border-blue-300 transition`
- Navigation: `flex`, `gap`, padding, hover state, bottom border
- Responsiveness verified via DevTools (phone / tablet / desktop)

## lab 5 - real backend, CORS, forms

- `lib/courses.ts` now calls the API with `fetch(..., { cache: "no-store" })`,
  checks `res.ok`, and treats 404 in `getCourse` as `undefined` (so `notFound()`
  can show `not-found.tsx`).
- Server Components (`/courses`, `/courses/[id]`) keep working unchanged —
  they talk to FastAPI server-to-server, CORS doesn't apply.
- `components/ElectiveFilter.tsx` — client component using SWR, hits the API
  straight from the browser (first real CORS request).
- `components/LikeButton.tsx` — now sends `POST /courses/{id}/like` and reads
  the new number from the server response.
- `components/EnrollForm.tsx` — sends `POST /enrollments` with a JSON body.
  Shows the server's validation message on 422.
- `app/courses/error.tsx` — client component with `retry` (not `reset`) so
  the page refetches after the backend comes back.
- `.env.local` — API address for both server and browser code.

## Project structure
```
app/
├── layout.tsx
├── page.tsx
├── globals.css
├── about/page.tsx
├── filter/page.tsx           
└── courses/
    ├── page.tsx
    ├── not-found.tsx
    ├── error.tsx             
    └── [id]/
        ├── page.tsx
        └── loading.tsx
components/
├── CourseCard.tsx
├── ElectiveFilter.tsx        
├── EnrollForm.tsx            
├── LikeButton.tsx
└── ui/                      
lib/
├── courses.ts
└── utils.ts
```

## Environment variables

Create a `.env.local` file in the project root (next to `package.json`):
```
API_URL=http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

- `API_URL` — used by Server Components (`getCourses`, `getCourse`). Stays on
  the server, never ends up in the browser bundle.
- `NEXT_PUBLIC_API_URL` — used by Client Components (`ElectiveFilter`,
  `LikeButton`, `EnrollForm`). This one is embedded into the JS the browser
  downloads, so never put secrets in it.

`.env.local` is gitignored. On startup you should see
`- Environments: .env.local` in the `npm run dev` output.

## Run

Two terminals. Backend first, then frontend.

**Terminal 1 — backend:**

```bash
cd course-catalog-api
python3 -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
fastapi dev main.py