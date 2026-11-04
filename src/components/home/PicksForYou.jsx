"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useHomeLibrary } from "./HomeLibraryProvider";
import SectionHeader from "./SectionHeader";
import BookImage from "@/components/books/BookImage";
import Reveal from "@/components/shared/Reveal";
import Spinner from "@/components/shared/Spinner";
import EmptyState from "@/components/shared/EmptyState";

export default function PicksForYou() {
  const { data, loading, error, reload } = useHomeLibrary();
  const books = data?.books || [];
  const feature = books[8] || books[0];
  const others = books.filter((book) => book._id !== feature?._id).slice(-6);
  return (
    <section className="section-space bg-muted">
      <div className="container">
        <SectionHeader
          title="Picks for your reading list"
          action="Browse all"
        />
        {loading ? (
          <Spinner />
        ) : error ? (
          <EmptyState
            title="A little inspiration is on its way"
            description={error}
            onRetry={reload}
          />
        ) : !feature ? (
          <EmptyState
            title="Your next favourite is yet to arrive"
            description="Add a book to help our little reading community grow."
            href="/add-book"
            action="Share a book"
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
            <Reveal className="h-full">
              <article className="grid h-full grid-cols-1 items-center sm:grid-cols-[.85fr_1fr] gap-5 rounded-md bg-surface p-5 md:gap-7 md:p-7">
                <Link
                  href={`/books/${feature._id}`}
                  className="book-cover relative mx-auto w-full max-w-[240px] aspect-[2/3] overflow-hidden rounded-sm"
                >
                  <BookImage
                    src={feature.image}
                    title={feature.title}
                    sizes="(max-width: 768px) 40vw, 250px"
                  />
                </Link>
                <div>
                  <p className="mb-3 text-base uppercase tracking-wider text-accent">
                    The long-weekend read
                  </p>
                  <h3 className="font-display text-[24px] leading-[1.15] md:text-[28px]">
                    <Link href={`/books/${feature._id}`}>{feature.title}</Link>
                  </h3>
                  <p className="mt-2 text-[15px] text-muted-foreground">
                    {feature.author}
                  </p>
                  <p className="mt-4 line-clamp-4 text-base leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                  <p className="mt-4 text-[15px] font-medium text-accent">
                    {feature.availableCopies} copies on the shelf
                  </p>
                  <Link
                    href={`/books/${feature._id}`}
                    className="text-link mt-4 text-[15px]"
                  >
                    View Details
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              </article>
            </Reveal>
            <div className="grid gap-5 rounded-md bg-surface p-5 sm:grid-cols-2 md:gap-x-6 md:gap-y-7 md:p-7">
              {others.map((book, i) => (
                <Reveal key={book._id} delay={i * 0.04}>
                  <article className="flex h-full items-center gap-3">
                    <Link
                      href={`/books/${book._id}`}
                      className="relative aspect-[2/3] w-16 shrink-0 overflow-hidden rounded-sm bg-muted"
                    >
                      <BookImage
                        src={book.image}
                        title={book.title}
                        sizes="64px"
                      />
                    </Link>
                    <div className="min-w-0">
                      <p className="mb-1 text-[15px] uppercase tracking-wider text-accent">
                        {book.category}
                      </p>
                      <h3 className="font-display text-[18px] leading-[1.25]">
                        <Link
                          href={`/books/${book._id}`}
                          className="line-clamp-2 hover:text-accent"
                        >
                          {book.title}
                        </Link>
                      </h3>
                      <p className="mt-1 line-clamp-1 text-[15px] text-muted-foreground">
                        {book.author}
                      </p>
                      <Link
                        href={`/books/${book._id}`}
                        className="mt-2 inline-block text-[15px] text-accent"
                      >
                        View Details →
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
