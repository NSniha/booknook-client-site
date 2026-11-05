import { notFound } from "next/navigation";
import { requireUser } from "@/lib/require-user";
import PageHeading from "@/components/shared/PageHeading";
import EditBook from "@/components/books/EditBook";

export const metadata = {
  title: "Edit Book",
};

export const dynamic = "force-dynamic";

export default async function EditBookPage({ params }) {
  const { id } = await params;

  if (
    !id ||
    id.length > 300 ||
    !/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(id)
  ) {
    notFound();
  }

  const user = await requireUser(
    `/my-books/${encodeURIComponent(id)}/edit`,
  );

  return (
    <>
      <PageHeading
        title="Edit Book"
        eyebrow="Keep your story up to date"
        description="Update the details, refresh the cover or make room for a few more copies."
      />

      <EditBook id={id} user={user} />
    </>
  );
}