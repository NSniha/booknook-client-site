import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, BookOpen } from "lucide-react";
import Brand from "./Brand";
import SocialLinks from "./SocialLinks";
import { CATEGORIES } from "@/lib/validation";

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-surface">
      <div className="container flex flex-col justify-between gap-5 border-b py-10 sm:py-14 sm:flex-row sm:items-center md:py-18">
        <h2 className="font-display text-section">
          Stay in the
          <br />
          reading loop.
        </h2>
        <p className="max-w-sm text-base leading-6 text-muted-foreground">
          Find a new favourite, return to a familiar voice, and keep a little
          space in your day for a story.
        </p>
        <SocialLinks />
      </div>
      <div className="container grid gap-9 py-12 sm:py-16 sm:grid-cols-2 lg:grid-cols-[1.65fr_1fr_1fr_1fr_1.2fr] lg:gap-10 lg:py-20">
        <div>
          <Brand />
          <p className="mt-5 max-w-xs text-base leading-6 text-muted-foreground">
            A small online library for readers who love to discover, share and
            come back for another chapter.
          </p>
          <p className="mt-5 flex items-center gap-2 text-base text-accent">
            <BookOpen size={15} />
            Good books. Better company.
          </p>
        </div>
        <div>
          <h3 className="mb-5 font-display text-[22px] font-semibold">Categories</h3>
          <ul className="space-y-2.5">
            {CATEGORIES.map((category) => (
              <li key={category}>
                <Link
                  href={`/books?category=${category}`}
                  className="text-base text-muted-foreground hover:text-accent"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-5 font-display text-[22px] font-semibold">Your library</h3>
          <ul className="space-y-2.5">
            {[
              ["All Books", "/books"],
              ["Add a Book", "/add-book"],
              ["My Books", "/my-books"],
              ["My Borrows", "/my-borrows"],
              ["My Profile", "/profile"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-base text-muted-foreground hover:text-accent"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-5 font-display text-[22px] font-semibold">Explore</h3>
          <ul className="space-y-2.5">
            {[
              ["How it works", "/#how-it-works"],
              ["Reading room", "/#reading-journal"],
              ["Featured authors", "/#featured-authors"],
              ["Join the library", "/register"],
              ["Login", "/login"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-base text-muted-foreground hover:text-accent"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-5 font-display text-[22px] font-semibold">Get in touch</h3>
          <a
            href="mailto:hello@booknook.example"
            className="inline-flex items-center gap-2 text-base text-accent hover:underline"
          >
            <Mail size={14} />
            hello@booknook.example
          </a>
          <p className="mt-4 flex items-start gap-2 text-base leading-6 text-muted-foreground">
            <MapPin size={14} className="mt-1 shrink-0" />
            An online library,
            <br />
            wherever you read.
          </p>
        </div>
      </div>
      <div className="container flex flex-col justify-between gap-4 border-t py-6 text-base text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} BookNook. Every story deserves another
          reader.
        </p>
        <Link
          href="/#top"
          className="flex items-center gap-1.5 hover:text-accent"
        >
          Back to the top
          <ArrowUpRight size={12} />
        </Link>
      </div>
    </footer>
  );
}
