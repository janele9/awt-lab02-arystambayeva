'use client';

import { useState } from "react";

type LikeButtonProps = {
  initialLikes: number;
};

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(initialLikes);

  return (
    <button
      onClick={() => setLikes(likes + 1)}
      className="inline-flex items-center gap-2 rounded bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"
    >
      ❤️ {likes}
    </button>
  );
}