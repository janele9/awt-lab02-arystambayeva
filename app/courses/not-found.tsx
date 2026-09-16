import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold mb-4">Course not found</h1>
      <p className="mb-6">
        The course you are looking for doesn't exist.
      </p>
      <Link
        href="/courses"
        className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        ← Back to courses
      </Link>
    </main>
  );
}