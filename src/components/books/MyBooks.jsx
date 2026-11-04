"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Pencil,
  Trash2,
  LoaderCircle,
  ArrowLeft,
  ArrowRight,
  TriangleAlert,
} from "lucide-react";
import { toast } from "sonner";
import { useBooks } from "@/hooks/use-books";
import { apiRequest } from "@/lib/api";
import { formatDate } from "@/lib/validation";
import BookImage from "./BookImage";
import Modal from "@/components/shared/Modal";
import Spinner from "@/components/shared/Spinner";
import EmptyState from "@/components/shared/EmptyState";

export default function MyBooks() {
  const [page, setPage] = useState(1);
  const { data, loading, error, reload } = useBooks(
    `mine=true&limit=12&page=${page}`,
    true,
  );
  const [selected, setSelected] = useState(null);
  const [busy, setBusy] = useState(false);
  async function remove() {
    if (busy || !selected) return;
    setBusy(true);
    try {
      const result = await apiRequest(`/books/${selected._id}`, {
        method: "DELETE",
        authenticated: true,
      });
      toast.success(result.message);
      setSelected(null);
      if (data.books.length === 1 && page > 1) setPage((p) => p - 1);
      else reload();
    } catch (err) {
      if (err.status !== 401) toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="container pb-18">
      {loading ? (
        <Spinner label="Gathering the books you’ve shared…" />
      ) : error ? (
        <EmptyState
          title="We couldn’t open your shelf"
          description={error}
          onRetry={reload}
        />
      ) : !data?.books.length ? (
        <EmptyState
          title="Your shelf is waiting for its first story"
          description="Share a book you love. You’ll find it here, ready to edit, update or pass on to another reader."
          href="/add-book"
          action="Add your first book"
        />
      ) : (
        <>
          <div className="mb-5 flex items-center justify-between">
            <p className="text-base text-muted-foreground">
              {data.total} {data.total === 1 ? "book" : "books"} shared by you
            </p>
            <p className="text-base text-muted-foreground">
              Make room for another reader.
            </p>
          </div>
          <div className="panel overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-base">
              <caption className="sr-only">
                Books you have added to BookNook
              </caption>
              <thead className="border-b bg-muted/70 text-base uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-5 font-medium">Book</th>
                  <th className="px-5 py-5 font-medium">Category</th>
                  <th className="px-5 py-5 font-medium">Available / Total</th>
                  <th className="px-5 py-5 font-medium">Added</th>
                  <th className="px-6 py-5 text-right font-medium">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.books.map((book) => (
                  <tr key={book._id} className="transition hover:bg-muted/30">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/books/${book._id}`}
                          className="relative aspect-[2/3] w-12 shrink-0 overflow-hidden rounded-sm bg-muted"
                        >
                          <BookImage
                            src={book.image}
                            title={book.title}
                            sizes="48px"
                          />
                        </Link>
                        <div className="max-w-56">
                          <Link
                            href={`/books/${book._id}`}
                            className="font-display text-card hover:text-accent"
                          >
                            {book.title}
                          </Link>
                          <p className="mt-1 text-base text-muted-foreground">
                            {book.author}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <span className="rounded-full bg-muted px-3 py-1.5 text-base">
                        {book.category}
                      </span>
                    </td>
                    <td className="px-5 py-5">
                      <span
                        className={
                          book.availableCopies > 0
                            ? "text-success"
                            : "text-accent"
                        }
                      >
                        {book.availableCopies}
                      </span>
                      <span className="text-muted-foreground">
                        {" "}
                        / {book.totalCopies}
                      </span>
                    </td>
                    <td className="px-5 py-5 text-muted-foreground">
                      {formatDate(book.createdAt)}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/my-books/${book._id}/edit`}
                          className="icon-button size-9"
                          aria-label={`Edit ${book.title}`}
                        >
                          <Pencil size={14} />
                        </Link>
                        <button
                          className="icon-button size-9 text-accent"
                          onClick={() => setSelected(book)}
                          aria-label={`Delete ${book.title}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.pages > 1 && (
            <div className="mt-7 flex items-center justify-center gap-4">
              <button
                className="icon-button"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                aria-label="Previous page"
              >
                <ArrowLeft size={15} />
              </button>
              <p className="text-base text-muted-foreground">
                Page {page} of {data.pages}
              </p>
              <button
                className="icon-button"
                disabled={page >= data.pages}
                onClick={() => setPage((p) => p + 1)}
                aria-label="Next page"
              >
                <ArrowRight size={15} />
              </button>
            </div>
          )}
        </>
      )}
      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title="Remove this book?"
        busy={busy}
      >
        <span className="mb-4 grid size-12 place-items-center rounded-full bg-accent-soft text-accent">
          <TriangleAlert size={23} strokeWidth={1.5} />
        </span>
        <p className="text-base leading-7 text-muted-foreground">
          <strong className="font-medium text-foreground">
            {selected?.title}
          </strong>{" "}
          will be removed from the library. This cannot be undone. Books with
          borrowed copies must be returned before removal.
        </p>
        <div className="mt-7 flex justify-end gap-3">
          <button
            className="btn-secondary"
            onClick={() => setSelected(null)}
            disabled={busy}
          >
            Keep the book
          </button>
          <button className="btn-primary" onClick={remove} disabled={busy}>
            {busy ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
            {busy ? "Removing…" : "Delete Book"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
