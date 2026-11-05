"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import BookForm from "./BookForm";
import Spinner from "@/components/shared/Spinner";
import EmptyState from "@/components/shared/EmptyState";

export default function EditBook({ id, user }) {
  const router = useRouter();

  const [state, setState] = useState({
    loading: true,
    book: null,
    error: "",
  });

  useEffect(() => {
    const controller = new AbortController();

    setState({
      loading: true,
      book: null,
      error: "",
    });

    apiRequest(`/books/${encodeURIComponent(id)}`, {
      authenticated: true,
      signal: controller.signal,
    })
      .then((book) => {
        if (controller.signal.aborted) return;

        if (book.ownerId !== user.id) {
          throw new Error(
            "Only the reader who added this book can edit it.",
          );
        }

        setState({
          loading: false,
          book,
          error: "",
        });

        if (book.slug && id !== book.slug) {
          router.replace(
            `/my-books/${encodeURIComponent(book.slug)}/edit`,
            { scroll: false },
          );
        }
      })
      .catch((error) => {
        if (controller.signal.aborted) return;

        setState({
          loading: false,
          book: null,
          error: error.message,
        });

        if (error.status !== 401) {
          toast.error(error.message);
        }
      });

    return () => controller.abort();
  }, [id, user.id, router]);

  if (state.loading) {
    return <Spinner label="Opening your book…" />;
  }

  if (state.error) {
    return (
      <div className="container pb-16">
        <EmptyState
          title="This book cannot be edited"
          description={state.error}
          href="/my-books"
          action="Back to My Books"
        />
      </div>
    );
  }

  if (!state.book) return null;

  return (
    <BookForm
      key={state.book._id}
      user={user}
      book={state.book}
    />
  );
}