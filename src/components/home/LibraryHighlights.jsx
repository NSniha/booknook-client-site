"use client";
import { Flower2 } from "lucide-react";
import { useHomeLibrary } from "./HomeLibraryProvider";

export default function LibraryHighlights() {
  const { data } = useHomeLibrary();
  const facts = [
    [
      data ? new Intl.NumberFormat("en").format(data.total) : "A growing",
      data
        ? data.total === 1
          ? "book to discover"
          : "books to discover"
        : "collection of books",
    ],
    ["5", "worlds to explore"],
    ["7 days", "for your next chapter"],
    ["One", "reader-powered library"],
  ];
  return (
    <section
      aria-label="A little about the library"
      className="overflow-hidden border-y bg-muted/70 py-3.5"
    >
      <div className="library-ticker" aria-hidden="true">
        {[0, 1].map((repeat) => (
          <div key={repeat} className="flex shrink-0 items-center">
            {facts.map(([value, label]) => (
              <p
                key={label}
                className="flex items-center gap-3 whitespace-nowrap px-6 text-base md:px-9"
              >
                <Flower2 size={15} className="text-gold" />
                <span>
                  <strong className="font-medium text-accent">{value}</strong>{" "}
                  <span className="text-muted-foreground">{label}</span>
                </span>
              </p>
            ))}
          </div>
        ))}
      </div>
      <p className="sr-only">
        BookNook offers five categories and seven-day book borrowing.
      </p>
    </section>
  );
}
