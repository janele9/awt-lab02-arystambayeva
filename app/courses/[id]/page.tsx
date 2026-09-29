import { notFound } from "next/navigation";
import { getCourse, getCourses } from "@/lib/courses";
import LikeButton from "@/components/LikeButton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{course.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-lg text-muted-foreground">{course.description}</p>
          <p className="text-sm font-medium">{course.credits} credits</p>
          <div>
            <LikeButton initialLikes={course.likes} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}