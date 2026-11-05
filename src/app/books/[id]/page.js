import { Suspense } from "react";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/require-user";
import { getCategoryFromSlug } from "@/lib/book-links";
import BookDetails from "@/components/books/BookDetails";
import BooksCatalog from "@/components/books/BooksCatalog";
import PageHeading from "@/components/shared/PageHeading";
import Spinner from "@/components/shared/Spinner";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const category = getCategoryFromSlug(id);

  return {
    title: category ? `${category} Books` : "Book Details",
  };
}

export default async function BooksRoutePage({ params }) {
  const { id } = await params;
  const category = getCategoryFromSlug(id);

  if (category) {
    return (
      <>
        <PageHeading
          centered
          title={`${category} Books`}
          eyebrow="Find your next favourite"
          description="Explore our shared shelves and discover your next good read."
        />

        <Suspense fallback={<Spinner />}>
          <BooksCatalog selectedCategory={category} />
        </Suspense>
      </>
    );
  }

  if (!/^[a-f\d]{24}$/i.test(id)) {
    notFound();
  }

  const user = await requireUser(`/books/${id}`);

  return <BookDetails id={id} user={user} />;
}