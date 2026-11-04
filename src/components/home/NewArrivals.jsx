"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useBooks } from "@/hooks/use-books";
import BookCard from "@/components/books/BookCard";
import Spinner from "@/components/shared/Spinner";
import EmptyState from "@/components/shared/EmptyState";
import SectionHeader from "./SectionHeader";

export default function NewArrivals() {
  const { data, loading, error, reload } = useBooks("sort=newest&limit=6");
  return (
    <section className="section-space">
      <div className="container">
        <SectionHeader title="This week’s new arrivals" action="Browse all" />
        {loading ? (
          <Spinner />
        ) : error ? (
          <EmptyState
            title="Our shelves are taking a moment"
            description={error}
            onRetry={reload}
          />
        ) : !data?.books.length ? (
          <EmptyState
            title="The first chapter is yours"
            description="There are no books in the library yet. Share a favourite and give the next reader somewhere to begin."
            href="/add-book"
            action="Add the first book"
          />
        ) : (
          <div className="home-book-grid">
            {data.books.map((book, i) => (
              <BookCard key={book._id} book={book} index={i} />
            ))}
          </div>
        )}
        <div className="mt-7 text-center">
          <Link href="/books" className="text-link">
            See All Books
            <ChevronRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
