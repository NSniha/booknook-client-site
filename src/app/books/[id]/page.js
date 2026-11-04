import { notFound } from "next/navigation";
import { requireUser } from "@/lib/require-user";
import BookDetails from "@/components/books/BookDetails";

export const metadata = { title: "Book Details" };
export const dynamic = "force-dynamic";

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  if (!/^[a-f\d]{24}$/i.test(id)) notFound();
  const user = await requireUser(`/books/${id}`);
  return <BookDetails id={id} user={user} />;
}
