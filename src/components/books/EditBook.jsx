"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import BookForm from "./BookForm";
import Spinner from "@/components/shared/Spinner";
import EmptyState from "@/components/shared/EmptyState";

export default function EditBook({ id, user }) {
  const [state, setState] = useState({ loading: true, book: null, error: "" });
  useEffect(() => {
    const controller = new AbortController();
    apiRequest(`/books/${id}`, {
      authenticated: true,
      signal: controller.signal,
    })
      .then((book) => {
        if (controller.signal.aborted) return;
        if (book.ownerId !== user.id)
          throw new Error("Only the reader who added this book can edit it.");
        setState({ loading: false, book, error: "" });
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setState({ loading: false, book: null, error: error.message });
          if (error.status !== 401) toast.error(error.message);
        }
      });
    return () => controller.abort();
  }, [id, user.id]);
  if (state.loading) return <Spinner label="Opening your book…" />;
  if (state.error)
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
  return <BookForm user={user} book={state.book} />;
}
