import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-4">Course Catalog</h1>
      <p className="text-lg mb-6">
        hello! look up the courses offered this semester
      </p>
      <Link
        href="/courses"
        className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        View courses →
      </Link>
    </main>
  );
}