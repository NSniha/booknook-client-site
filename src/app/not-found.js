import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

export const metadata = { title: "Page Not Found" };
export default function NotFound() {
  return (
    <section className="container flex min-h-[60vh] flex-col items-center justify-center py-18 text-center">
      <span className="mb-7 flex items-center gap-5 font-display text-8xl text-accent">
        <span>4</span>
        <BookOpen size={64} strokeWidth={1} />
        <span>4</span>
      </span>
      <p className="eyebrow mb-4">An unexpected plot twist</p>
      <h1 className="font-display text-page">This page lost its place.</h1>
      <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
        The chapter you’re looking for isn’t here. Let’s find our way back to a
        story that is.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Home
        <ArrowUpRight size={17} />
      </Link>
    </section>
  );
}
