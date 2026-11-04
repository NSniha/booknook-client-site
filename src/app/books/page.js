import { Suspense } from "react";
import PageHeading from "@/components/shared/PageHeading";
import Spinner from "@/components/shared/Spinner";
import BooksCatalog from "@/components/books/BooksCatalog";

export const metadata = { title: "All Books" };

export default function BooksPage() {
  return (
    <>
      <PageHeading
        centered
        title="All Books"
        eyebrow="A little browsing goes a long way"
        description="Familiar favourites, unexpected discoveries and stories worth passing on. Your next good read is somewhere on these shelves."
      />
      <Suspense fallback={<Spinner />}>
        <BooksCatalog />
      </Suspense>
    </>
  );
}
