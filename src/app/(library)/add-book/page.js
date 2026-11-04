import { requireUser } from "@/lib/require-user";
import PageHeading from "@/components/shared/PageHeading";
import BookForm from "@/components/books/BookForm";

export const metadata = { title: "Add Book" };
export const dynamic = "force-dynamic";
export default async function AddBookPage() {
  const user = await requireUser("/add-book");
  return (
    <>
      <PageHeading
        title="Add a Book"
        eyebrow="One shared story. So many possibilities."
        description="The book on your shelf could be someone else’s next favourite. Give it a place in our little library."
      />
      <BookForm user={user} />
    </>
  );
}
