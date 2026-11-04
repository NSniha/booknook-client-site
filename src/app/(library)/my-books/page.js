import Link from "next/link";
import { Plus } from "lucide-react";
import { requireUser } from "@/lib/require-user";
import PageHeading from "@/components/shared/PageHeading";
import MyBooks from "@/components/books/MyBooks";

export const metadata = { title: "My Books" };
export const dynamic = "force-dynamic";
export default async function MyBooksPage() {
  await requireUser("/my-books");
  return (
    <>
      <PageHeading
        title="My Books"
        eyebrow="Your contribution to the next chapter"
        description="A home for the books you’ve shared. Keep their details fresh and make it easy for another reader to discover them."
      >
        <Link href="/add-book" className="btn-primary">
          <Plus size={16} />
          Add a Book
        </Link>
      </PageHeading>
      <MyBooks />
    </>
  );
}
