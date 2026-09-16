# Course Catalog

project for the Advanced Web Technologies course(lab1).

A small course catalog built with Next.js 16 (App Router), TypeScript
and Tailwind CSS. There is no real backend yet - courses come from a mock
module in `lib/courses.ts` that fakes a 300 ms delay so the loading state is
actually visible.

## Pages
`/` - home page with a link to the course list

`/about` - short info about the project

`/courses` - list of all courses

`/courses/[id]` - single course page with a working 'like' button

## What is implemented
File-based routing with the App Router

Server components for pages and data fetching (`await getCourses()` right in the component)

One client component - `components/LikeButton.tsx` - the only file with `'use client'`

Dynamic route `/courses/[id]` with `params` awaited as a Promise

`generateStaticParams` - all course pages are pre-rendered at build time

`app/courses/not-found.tsx` - shown when a course doesn't exist

`app/courses/[id]/loading.tsx` - loading indicator while the course is being fetched

Shared navigation (`Home / Courses / About`) in `app/layout.tsx`

## Project structure
app/
|-- layout.tsx
|-- page.tsx
|-- about/
|   |--page.tsx
|-- courses/
    |-- page.tsx
    |-- not-found.tsx
    |-- [id]/
        |-- page.tsx
        |-- loading.tsx
components/
|-- CourseCard.tsx
|-- LikeButton.tsx
lib/
|-- courses.ts

## How to run

```bash
npm install
npm run dev
Open http://localhost:3000

## Build

```bash
npm run build
```