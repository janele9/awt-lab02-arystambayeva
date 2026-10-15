"use client";

import { useState, type FormEvent } from "react";
import type { Enrollment } from "@/lib/courses";

const API = process.env.NEXT_PUBLIC_API_URL;

type EnrollFormProps = {
  courseId: string;
};

type Status = "idle" | "sending" | "done" | "rejected" | "error";

export default function EnrollForm({ courseId }: EnrollFormProps) {
  const [studentName, setStudentName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${API}/enrollments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId, studentName }),
      });

      if (res.status === 422) {
        const body = await res.json();
        setMessage(`The server rejected the data: ${body.detail[0].msg}`);
        setStatus("rejected");
        return;
      }
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const enrollment: Enrollment = await res.json();
      setMessage(`You are enrolled. Enrollment number: ${enrollment.id}`);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mt-4 border-t border-border pt-4">
      <h2 className="mb-2 text-lg font-semibold">Enroll in this course</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Your name"
          className="rounded-md border border-slate-300 px-3 py-2 bg-background"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Enroll"}
        </button>
      </form>
      {message && (
        <p
          className={
            status === "rejected" || status === "error"
              ? "mt-2 text-red-600"
              : "mt-2 text-green-600"
          }
        >
          {message}
        </p>
      )}
    </div>
  );
}