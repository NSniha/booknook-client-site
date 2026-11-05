"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useBooks } from "@/hooks/use-books";
import { getCategoryPath } from "@/lib/book-links";
import BookCard from "./BookCard";
import CatalogFilters from "./CatalogFilters";
import Spinner from "@/components/shared/Spinner";
import EmptyState from "@/components/shared/EmptyState";
import Modal from "@/components/shared/Modal";
import Select from "@/components/shared/Select";

function CatalogSearch({ initial, onSearch }) {
  const [value, setValue] = useState(initial);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(value.trim());
      }}
      className="relative min-w-0 flex-1"
    >
      <Search
        size={17}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
      />

      <input
        aria-label="Search this library"
        type="search"
        value={value}
        maxLength={120}
        placeholder="Search title or author"
        onChange={(event) => setValue(event.target.value)}
        className="field rounded-full py-2.5 pl-11 pr-18"
      />

      <button
        type="submit"
        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-muted px-3 py-2 text-base font-medium"
      >
        Find
      </button>
    </form>
  );
}

export default function BooksCatalog({ selectedCategory = "" }) {
  const params = useSearchParams();
  const router = useRouter();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const category = selectedCategory || params.get("category") || "";
  const available = params.get("available") === "true";
  const search = params.get("search") || "";
  const sort = params.get("sort") || "newest";
  const page = Math.max(1, Math.floor(Number(params.get("page")) || 1));

  const query = new URLSearchParams(params.toString());

  if (category) {
    query.set("category", category);
  } else {
    query.delete("category");
  }

  query.set("limit", "12");

  const { data, loading, error, reload } = useBooks(query.toString());

  function update(key, value) {
    const next = new URLSearchParams(params.toString());
    const nextCategory = key === "category" ? value : category;

    next.delete("category");

    if (key !== "category") {
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
    }

    if (key !== "page") {
      next.delete("page");
    }

    const path = getCategoryPath(nextCategory);
    const queryString = next.toString();

    router.push(`${path}${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  }

  function reset() {
    router.push("/books", { scroll: false });
  }

  const filterProps = {
    category,
    available,
    counts: data?.categories,
    update,
    onReset: reset,
  };

  return (
    <div className="container grid gap-8 pb-18 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-10">
      <aside className="hidden lg:block" aria-label="Book filters">
        <CatalogFilters {...filterProps} />
      </aside>

      <div className="min-w-0">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <CatalogSearch
            key={search}
            initial={search}
            onSearch={(value) => update("search", value)}
          />
        </div>

        <div className="mb-7 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 sm:flex sm:flex-wrap sm:justify-between">
          <p role="status" className="col-span-2 text-base text-muted-foreground">
            {loading
              ? "Opening the shelves…"
              : data?.total
                ? `Showing ${(page - 1) * 12 + 1}–${Math.min(
                    page * 12,
                    data.total,
                  )} of ${data.total} books`
                : "No matching books"}
          </p>

          <button
            type="button"
            className="btn-secondary min-h-11 px-4 py-2 text-base lg:hidden"
            onClick={() => setFiltersOpen(true)}
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>

          <Select
            ariaLabel="Sort books"
            value={sort}
            onChange={(value) => update("sort", value)}
            options={[
              { value: "newest", label: "Newest first" },
              { value: "oldest", label: "Oldest first" },
              { value: "title", label: "Title: A to Z" },
            ]}
            className="w-44 max-w-full shrink-0 justify-self-end sm:ml-auto"
            buttonClassName="rounded-full border bg-surface px-4 py-2.5 text-base"
          />
        </div>

        {(category || search || available) && (
          <div className="mb-7 flex flex-wrap gap-2">
            {[
              ["category", category],
              ["search", search && `“${search}”`],
              ["available", available && "Available now"],
            ]
              .filter(([, value]) => value)
              .map(([key, value]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => update(key, "")}
                  className="flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-base text-accent"
                >
                  {value}
                  <X size={12} />
                </button>
              ))}
          </div>
        )}

        {loading ? (
          <Spinner />
        ) : error ? (
          <EmptyState
            title="We couldn’t open the shelves"
            description={error}
            onRetry={reload}
          />
        ) : !data?.books.length ? (
          <EmptyState
            title={
              page > 1
                ? "You’ve reached the end of this shelf"
                : "No stories on this shelf yet"
            }
            description="Try another category or search for a different title or author."
            onRetry={reset}
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-7 md:gap-y-12">
            {data.books.map((book, index) => (
              <BookCard key={book._id} book={book} index={index} />
            ))}
          </div>
        )}

        {!loading && data?.pages > 1 && (
          <nav
            aria-label="Book pages"
            className="mt-12 flex flex-wrap items-center justify-center gap-2"
          >
            <button
              type="button"
              className="icon-button"
              disabled={page === 1}
              aria-label="Previous page"
              onClick={() => update("page", String(page - 1))}
            >
              <ArrowLeft size={15} />
            </button>

            {Array.from({ length: data.pages }, (_, index) => index + 1)
              .filter(
                (number) =>
                  number === 1 ||
                  number === data.pages ||
                  Math.abs(number - page) < 2,
              )
              .map((number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() => update("page", String(number))}
                  aria-current={number === page ? "page" : undefined}
                  className={`size-10 rounded-full border text-base ${
                    number === page
                      ? "border-accent bg-accent text-background"
                      : "hover:bg-muted"
                  }`}
                >
                  {number}
                </button>
              ))}

            <button
              type="button"
              className="icon-button"
              disabled={page >= data.pages}
              aria-label="Next page"
              onClick={() => update("page", String(page + 1))}
            >
              <ArrowRight size={15} />
            </button>
          </nav>
        )}
      </div>

      <Modal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Find your shelf"
      >
        <CatalogFilters {...filterProps} />

        <button
          type="button"
          onClick={() => setFiltersOpen(false)}
          className="btn-primary mt-6 w-full"
        >
          Show books
        </button>
      </Modal>
    </div>
  );
}