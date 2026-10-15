import { notFound } from "next/navigation";
import { getCourse } from "@/lib/courses";
import LikeButton from "@/components/LikeButton";
import EnrollForm from "@/components/EnrollForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

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
            <LikeButton courseId={course.id} initialLikes={course.likes} />
          </div>
          <EnrollForm courseId={course.id} />
        </CardContent>
      </Card>
    </main>
  );
}