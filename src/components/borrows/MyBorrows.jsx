"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  BookOpenCheck,
  RotateCcw,
  LoaderCircle,
} from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { formatDate } from "@/lib/validation";
import BookImage from "@/components/books/BookImage";
import Spinner from "@/components/shared/Spinner";
import EmptyState from "@/components/shared/EmptyState";
import Modal from "@/components/shared/Modal";

export default function MyBorrows() {
  const [state, setState] = useState({ loading: true, borrows: [], error: "" });
  const [version, setVersion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setState((current) => ({ ...current, loading: true, error: "" }));
    apiRequest("/borrows", { authenticated: true, signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted)
          setState({ loading: false, borrows: data.borrows, error: "" });
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setState({ loading: false, borrows: [], error: error.message });
          if (error.status !== 401) toast.error(error.message);
        }
      });
    return () => controller.abort();
  }, [version]);
  async function returnBook() {
    if (!selected || busy) return;
    setBusy(true);
    try {
      const result = await apiRequest(`/borrows/${selected._id}`, {
        method: "DELETE",
        authenticated: true,
      });
      setState((current) => ({
        ...current,
        borrows: current.borrows.filter((item) => item._id !== selected._id),
      }));
      setSelected(null);
      toast.success(result.message);
    } catch (error) {
      if (error.status !== 401) toast.error(error.message);
    } finally {
      setBusy(false);
    }
  }
  const overdue = state.borrows.filter(
    (item) => new Date(item.returnDate) < new Date(),
  ).length;
  return (
    <div className="container pb-18">
      {state.loading ? (
        <Spinner label="Finding the stories you’re spending time with…" />
      ) : state.error ? (
        <EmptyState
          title="We couldn’t open your reading list"
          description={state.error}
          onRetry={() => setVersion((v) => v + 1)}
        />
      ) : !state.borrows.length ? (
        <EmptyState
          title="A little room for your next read"
          description="Your borrowed books will appear here with their return dates. Browse the shelves and take a story home."
          href="/books"
          action="Find a book to borrow"
        />
      ) : (
        <>
          <div className="mb-7 grid gap-4 sm:grid-cols-3">
            {[
              [BookOpenCheck, state.borrows.length, "Books with you"],
              [CalendarDays, "7 days", "Time for each chapter"],
              [RotateCcw, overdue, "Ready to return"],
            ].map(([Icon, value, label]) => (
              <div key={label} className="panel flex items-center gap-4 p-5">
                <span className="grid size-11 place-items-center rounded-full bg-muted text-accent">
                  <Icon size={21} strokeWidth={1.3} />
                </span>
                <div>
                  <p className="font-display text-panel">{value}</p>
                  <p className="mt-1 text-base text-muted-foreground">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="panel overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-base">
              <caption className="sr-only">
                Your currently borrowed books and their return dates
              </caption>
              <thead className="border-b bg-muted/70 text-base uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-5 font-medium">Book</th>
                  <th className="px-5 py-5 font-medium">Borrow date</th>
                  <th className="px-5 py-5 font-medium">Return date</th>
                  <th className="px-6 py-5 text-right font-medium">
                    Next chapter
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {state.borrows.map((item) => {
                  const late = new Date(item.returnDate) < new Date();
                  return (
                    <tr key={item._id} className="hover:bg-muted/30">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <Link
                            href={`/books/${item.bookId}`}
                            className="relative aspect-[2/3] w-13 shrink-0 overflow-hidden rounded-sm bg-muted"
                          >
                            <BookImage
                              src={item.bookImage}
                              title={item.bookTitle}
                              sizes="52px"
                            />
                          </Link>
                          <Link
                            href={`/books/${item.bookId}`}
                            className="max-w-60 font-display text-card hover:text-accent"
                          >
                            {item.bookTitle}
                          </Link>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-muted-foreground">
                        {formatDate(item.borrowDate)}
                      </td>
                      <td className="px-5 py-5">
                        <p
                          className={
                            late
                              ? "font-medium text-accent"
                              : "text-muted-foreground"
                          }
                        >
                          {formatDate(item.returnDate)}
                        </p>
                        {late && (
                          <span className="mt-1 block text-base text-accent">
                            Return date passed
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => setSelected(item)}
                          className="btn-secondary min-h-10 gap-2 px-4 py-2 text-base"
                        >
                          <RotateCcw size={13} />
                          Return Book
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-base leading-6 text-muted-foreground">
            Return your book whenever you’re ready. It will become available to
            the next reader straight away.
          </p>
        </>
      )}
      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title="Ready to pass it on?"
        busy={busy}
      >
        <p className="text-base leading-7 text-muted-foreground">
          Return{" "}
          <span className="font-medium text-foreground">
            {selected?.bookTitle}
          </span>{" "}
          to the shelves. Another reader’s next chapter could begin with yours.
        </p>
        <div className="mt-7 flex flex-wrap justify-end gap-3">
          <button
            disabled={busy}
            onClick={() => setSelected(null)}
            className="btn-secondary"
          >
            Keep reading
          </button>
          <button disabled={busy} onClick={returnBook} className="btn-primary">
            {busy ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <RotateCcw size={16} />
            )}
            {busy ? "Returning…" : "Return Book"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
