"use client";
import { useHomeLibrary } from "./HomeLibraryProvider";
import SectionHeader from "./SectionHeader";
import BookCard from "@/components/books/BookCard";
import EmptyState from "@/components/shared/EmptyState";
import Spinner from "@/components/shared/Spinner";

export default function BookShelf({
  title,
  category,
  available = false,
  offset = 0,
  href = "/books",
}) {
  const { data, loading, error, reload } = useHomeLibrary();
  const collection = (data?.books || []).filter(
    (book) =>
      (!category || book.category === category) &&
      (!available || book.availableCopies > 0),
  );
  const start = collection.length > offset ? offset : 0;
  const books = collection.slice(start, start + 6);
  return (
    <section className="section-space">
      <div className="container">
        <SectionHeader title={title} href={href} />
        {loading ? (
          <Spinner />
        ) : error ? (
          <EmptyState
            title="A small pause between chapters"
            description={error}
            onRetry={reload}
          />
        ) : !books.length ? (
          <EmptyState
            title="More stories are on their way"
            description="Explore another shelf or add a book you would love to share."
            href="/books"
            action="Browse Books"
          />
        ) : (
          <div className="home-book-grid">
            {books.map((book, i) => (
              <BookCard key={book._id} book={book} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
