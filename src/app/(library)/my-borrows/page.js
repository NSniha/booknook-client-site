import { requireUser } from "@/lib/require-user";
import PageHeading from "@/components/shared/PageHeading";
import MyBorrows from "@/components/borrows/MyBorrows";

export const metadata = { title: "My Borrows" };
export const dynamic = "force-dynamic";
export default async function MyBorrowsPage() {
  await requireUser("/my-borrows");
  return (
    <>
      <PageHeading
        title="My Borrows"
        eyebrow="The stories keeping you company"
        description="Your current reads, together in one place. Keep an eye on your return dates and pass the next chapter on when you’re ready."
      />
      <MyBorrows />
    </>
  );
}
