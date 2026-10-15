"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const API = process.env.NEXT_PUBLIC_API_URL;

type LikeButtonProps = {
  courseId: string;
  initialLikes: number;
};

export default function LikeButton({ courseId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [failed, setFailed] = useState(false);

  async function handleClick() {
    setFailed(false);
    try {
      const res = await fetch(`${API}/courses/${courseId}/like`, {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const course = await res.json();
      setLikes(course.likes);
    } catch {
      setFailed(true);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="sm" onClick={handleClick} className="gap-2">
        ♥ {likes}
      </Button>
      {failed && <p className="text-red-600">Failed to like the course</p>}
    </div>
  );
}