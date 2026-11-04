"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, LoaderCircle, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { formatDate } from "@/lib/validation";
import Modal from "@/components/shared/Modal";

export default function BorrowModal({ book, user, open, onClose, onBorrowed }) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const result = await apiRequest("/borrows", {
        method: "POST",
        authenticated: true,
        body: { bookId: book._id },
      });
      toast.success(result.message);
      onBorrowed();
      onClose();
      router.refresh();
    } catch (error) {
      if (error.status !== 401) toast.error(error.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Your next chapter awaits"
      busy={busy}
    >
      <p className="mb-6 text-base leading-7 text-muted-foreground">
        You’re borrowing{" "}
        <span className="font-medium text-foreground">{book.title}</span>. Take
        your time, find a comfortable corner, and enjoy.
      </p>
      <form onSubmit={submit} className="space-y-5">
        <div>
          <label className="field-label" htmlFor="borrow-name">
            Your name
          </label>
          <input
            id="borrow-name"
            readOnly
            value={user.name}
            className="field bg-muted"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="borrow-email">
            Email address
          </label>
          <input
            id="borrow-email"
            readOnly
            value={user.email}
            className="field bg-muted"
          />
        </div>
        <div className="flex items-start gap-3 rounded-lg bg-muted p-4">
          <CalendarDays className="mt-0.5 shrink-0 text-accent" size={20} />
          <p className="text-base leading-6 text-muted-foreground">
            A seven-day reading window.
            <br />
            <span className="font-medium text-foreground">
              Expected return: {formatDate(new Date(Date.now() + 7 * 86400000))}
            </span>
            <br />
            Your confirmed due date appears in My Borrows.
          </p>
        </div>
        <button disabled={busy} className="btn-primary w-full">
          {busy ? (
            <>
              <LoaderCircle size={16} className="animate-spin" />
              Confirming…
            </>
          ) : (
            <>
              Confirm Borrow
              <ArrowUpRight size={16} />
            </>
          )}
        </button>
        <p className="text-center text-base leading-5 text-muted-foreground">
          You can return the book early from My Borrows.
        </p>
      </form>
    </Modal>
  );
}
