import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CourseCardProps = {
  id: string;
  title: string;
  description: string;
  credits: number;
  likes: number;
};

export default function CourseCard({
  id,
  title,
  description,
  credits,
  likes,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`} className="block">
      <Card className="hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition h-full">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-sm font-medium">{credits} credits</span>
            <Button variant="ghost" size="sm">
              ♥ {likes}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}