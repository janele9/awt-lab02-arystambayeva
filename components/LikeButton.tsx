"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type LikeButtonProps = {
  initialLikes: number;
};

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(initialLikes);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLikes(likes + 1)}
      className="gap-2"
    >
      ♥ {likes}
    </Button>
  );
}