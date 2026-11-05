"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  ShieldCheck,
  UserRound,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { formatDate } from "@/lib/validation";
import BookImage from "./BookImage";
import RelatedBooks from "./RelatedBooks";
import BorrowModal from "@/components/borrows/BorrowModal";
import Spinner from "@/components/shared/Spinner";
import EmptyState from "@/components/shared/EmptyState";
import Reveal from "@/components/shared/Reveal";
import PageHeading from "@/components/shared/PageHeading";

export default function BookDetails({ id, user }) {
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(0);
  const [borrowOpen, setBorrowOpen] = useState(false);
  const [tab, setTab] = useState("description");
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    apiRequest(`/books/${id}`, {
      authenticated: true,
      signal: controller.signal,
    })
      .then((data) => {
        if (!controller.signal.aborted) {
          setBook(data);
          setLoading(false);
          document.title = `BookNook | ${data.title}`;
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err.message);
          setLoading(false);
          if (err.status !== 401) toast.error(err.message);
        }
      });
    return () => controller.abort();
  }, [id, version]);
  if (loading) return <Spinner label="Opening this book…" />;
  if (error)
    return (
      <div className="container py-14">
        <EmptyState
          title="This chapter couldn’t be opened"
          description={error}
          onRetry={() => setVersion((v) => v + 1)}
          href="/books"
          action="Back to All Books"
        />
      </div>
    );
  return (
    <>
      <PageHeading title="Book Details" eyebrow="From our shared shelves" description="A closer look at the story you might take home next." />
      <div className="book-details container pb-14">
        <div className="grid items-start gap-9 md:grid-cols-[.85fr_1fr] md:gap-12 lg:gap-20">
          <Reveal>
            <div className="flex items-start gap-4">
              <div className="relative hidden aspect-[2/3] w-15 shrink-0 overflow-hidden rounded-sm border-2 border-accent lg:block">
                <BookImage src={book.image} title={book.title} />
              </div>
              <div className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-lg bg-muted book-cover">
                <BookImage
                  key={book.image}
                  src={book.image}
                  title={book.title}
                  priority
                  sizes="(max-width: 768px) 80vw, 400px"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mb-5 flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1 text-[14px] font-semibold uppercase tracking-wide ${book.availableCopies > 0 ? "bg-success/10 text-success" : "bg-accent-soft text-accent"}`}
              >
                {book.availableCopies > 0
                  ? "On the shelf"
                  : "Currently borrowed"}
              </span>
              <Link
                href={`/books?category=${book.category}`}
                className="text-[14px] text-muted-foreground hover:text-accent"
              >
                {book.category}
                <ArrowUpRight className="ml-1 inline" size={12} />
              </Link>
            </div>
            <h2 className="book-detail-title font-display font-semibold tracking-tight">
              {book.title}
            </h2>
            <p className="mt-4 text-[15px] text-muted-foreground">
              Written by{" "}
              <span className="font-medium text-foreground">{book.author}</span>
            </p>
            <div className="my-7 border-y py-6">
              <p className="mb-3 flex items-center gap-2 text-[15px] font-medium text-success">
                <BookOpen size={17} />
                {book.availableCopies} of {book.totalCopies} copies available
              </p>
              <p className="whitespace-pre-line text-[15px] leading-7 text-muted-foreground">
                {book.description}
              </p>
            </div>
            {book.isBorrowed ? (
              <Link href="/my-borrows" className="btn-secondary w-full">
                Already in your borrows
                <ArrowUpRight size={17} />
              </Link>
            ) : (
              <button
                onClick={() => setBorrowOpen(true)}
                disabled={book.availableCopies === 0}
                className="btn-primary w-full"
              >
                <Plus size={17} />
                {book.availableCopies === 0
                  ? "Not Available"
                  : "Borrow This Book"}
              </button>
            )}
            <ul className="my-7 space-y-4 text-[15px] text-muted-foreground">
              <li className="flex items-center gap-3">
                <CalendarDays size={16} strokeWidth={1.4} />
                Seven days to enjoy your book
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck size={16} strokeWidth={1.4} />
                Manage and return it from My Borrows
              </li>
              <li className="flex items-center gap-3">
                <UserRound size={16} strokeWidth={1.4} />
                Shared by{" "}
                <span className="font-medium text-foreground">
                  {book.ownerName}
                </span>
              </li>
            </ul>
            <div className="border-t pt-5 text-[14px] text-muted-foreground">
              <span>Added to our shelves on {formatDate(book.createdAt)}</span>
              <p className="mt-3">
                A book shared is a new possibility for another reader.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="mt-14">
          <div
            role="tablist"
            aria-label="Book information"
            className="flex gap-7 border-b"
          >
            <button
              role="tab"
              id="tab-description"
              aria-controls="book-info-panel"
              aria-selected={tab === "description"}
              onClick={() => setTab("description")}
              className={`border-b-2 pb-4 text-[15px] ${tab === "description" ? "border-accent font-semibold text-accent" : "border-transparent text-muted-foreground"}`}
            >
              About this book
            </button>
            <button
              role="tab"
              id="tab-borrowing"
              aria-controls="book-info-panel"
              aria-selected={tab === "borrowing"}
              onClick={() => setTab("borrowing")}
              className={`border-b-2 pb-4 text-[15px] ${tab === "borrowing" ? "border-accent font-semibold text-accent" : "border-transparent text-muted-foreground"}`}
            >
              Borrowing notes
            </button>
          </div>
          <div
            role="tabpanel"
            id="book-info-panel"
            aria-labelledby={`tab-${tab}`}
            className="max-w-4xl py-7 text-[15px] leading-8 text-muted-foreground"
          >
            {tab === "description" ? (
              <p className="whitespace-pre-line">{book.description}</p>
            ) : (
              <p>
                Borrowing begins when you confirm your book. We save your due
                date automatically, seven days from that moment. You can check
                the date and return the book at any time from My Borrows. One
                active copy of each title can be borrowed per reader. Available
                copies are updated after every borrow and return.
              </p>
            )}
          </div>
        </div>
      </div>
      <RelatedBooks book={book} />
      <BorrowModal
        book={book}
        user={user}
        open={borrowOpen}
        onClose={() => setBorrowOpen(false)}
        onBorrowed={() =>
          setBook((current) => ({
            ...current,
            isBorrowed: true,
            availableCopies: Math.max(0, current.availableCopies - 1),
          }))
        }
      />
    </>
  );
}
