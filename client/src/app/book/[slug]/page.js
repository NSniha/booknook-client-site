import { notFound } from "next/navigation";
import { requireUser } from "@/lib/require-user";
import BookDetails from "@/components/books/BookDetails";

export const metadata = {
  title: "Book Details",
};

export const dynamic = "force-dynamic";

export default async function BookDetailsPage({ params }) {
  const { slug } = await params;

  if (
    !slug ||
    slug.length > 300 ||
    !/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(slug)
  ) {
    notFound();
  }

  const user = await requireUser(
    `/book/${encodeURIComponent(slug)}`,
  );

  return <BookDetails id={slug} user={user} />;
}