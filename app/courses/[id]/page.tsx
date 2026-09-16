import { notFound } from "next/navigation";
import { getCourse, getCourses } from "@/lib/courses";
import LikeButton from "@/components/LikeButton";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((c) => ({ id: c.id }));
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
      <p className="text-lg text-gray-700 mb-4">{course.description}</p>
      <p className="text-gray-600 mb-6">{course.credits} credits</p>
      <LikeButton initialLikes={course.likes} />
    </main>
  );
}