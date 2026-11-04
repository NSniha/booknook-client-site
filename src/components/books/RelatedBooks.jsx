"use client";
import { useBooks } from "@/hooks/use-books";
import BookCard from "./BookCard";
import Spinner from "@/components/shared/Spinner";

export default function RelatedBooks({ book }) {
  const { data, loading, error } = useBooks(
    new URLSearchParams({ category: book.category, limit: "4" }).toString(),
  );
  const related =
    data?.books.filter((item) => item._id !== book._id).slice(0, 3) || [];
  if (error || (!loading && !related.length)) return null;
  return (
    <section className="border-t py-14">
      <div className="container">
        <p className="eyebrow mb-3">Keep your curiosity going</p>
        <h2 className="section-title mb-9">
          More from <span className="italic">this shelf.</span>
        </h2>
        {loading ? (
          <Spinner compact />
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:max-w-4xl">
            {related.map((item, index) => (
              <BookCard key={item._id} book={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
