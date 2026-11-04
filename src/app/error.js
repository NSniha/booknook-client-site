"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import EmptyState from "@/components/shared/EmptyState";

export default function ErrorPage({ reset }) {
  useEffect(() => {
    toast.error("We couldn’t open this page. Please try again.", {
      id: "page-error",
    });
  }, []);
  return (
    <div className="container py-14">
      <EmptyState
        title="A small interruption in the story"
        description="This page could not be loaded. Give it another moment, or head back to the library."
        onRetry={reset}
        href="/books"
        action="Browse Books"
      />
    </div>
  );
}
