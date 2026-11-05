import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getBookPath } from "@/lib/book-links";
import BookImage from "./BookImage";
import Reveal from "@/components/shared/Reveal";

export default function BookCard({ book, index = 0 }) {
  const bookPath = getBookPath(book);

  return (
    <Reveal
      delay={Math.min(index % 6, 5) * 0.04}
      className="h-full"
    >
      <article className="group flex h-full flex-col text-center">
        <Link
          href={bookPath}
          className="book-cover relative mb-4 block aspect-[2/3] overflow-hidden rounded-[5px] bg-muted transition duration-500 group-hover:-translate-y-1 group-hover:shadow-lg"
          aria-label={`View ${book.title}`}
        >
          <BookImage
            key={book.image}
            src={book.image}
            title={book.title}
          />

          {book.availableCopies === 0 && (
            <span className="absolute inset-x-0 bottom-0 bg-foreground/85 py-2 text-[15px] font-medium text-background">
              Currently borrowed
            </span>
          )}
        </Link>

        <p className="mb-1.5 text-[15px] uppercase tracking-[0.09em] text-muted-foreground">
          {book.category}
        </p>

        <h3 className="min-h-[2.5em] break-words font-display text-card font-normal">
          <Link
            href={bookPath}
            className="line-clamp-2 hover:text-accent"
          >
            {book.title}
          </Link>
        </h3>

        <p className="mb-2 mt-1.5 line-clamp-1 text-[15px] text-muted-foreground">
          {book.author}
        </p>

        <p
          className={`mb-3 text-[15px] font-medium ${
            book.availableCopies
              ? "text-accent"
              : "text-muted-foreground"
          }`}
        >
          {book.availableCopies
            ? `${book.availableCopies} copies available`
            : "Back on the shelf soon"}
        </p>

        <Link
          href={bookPath}
          className="mx-auto mt-auto inline-flex items-center justify-center gap-1.5 border-b border-transparent pb-0.5 text-[15px] text-foreground transition hover:border-accent hover:text-accent"
        >
          View Details
          <ArrowUpRight size={12} />
        </Link>
      </article>
    </Reveal>
  );
}