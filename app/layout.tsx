import type { Metadata } from "next";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Course Catalog",
  description: "Advanced Web Technologies course catalog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} font-sans`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <nav className="flex gap-4 px-6 py-4 border-b border-border">
            <Link
              href="/"
              className="px-3 py-2 rounded-md hover:bg-accent transition-colors"
            >
              Home
            </Link>
            <Link
              href="/courses"
              className="px-3 py-2 rounded-md hover:bg-accent transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 rounded-md hover:bg-accent transition-colors"
            >
              About
            </Link>
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}