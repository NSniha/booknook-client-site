import { requireUser } from "@/lib/require-user";
import PageHeading from "@/components/shared/PageHeading";
import ProfileCard from "@/components/profile/ProfileCard";

export const metadata = { title: "My Profile" };
export const dynamic = "force-dynamic";
export default async function ProfilePage() {
  const user = await requireUser("/profile");
  return (
    <>
      <PageHeading
        title="My Profile"
        eyebrow="A reader belongs here"
        description="Your little place in the BookNook community. One account, a shelf of shared books and a world of reading ahead."
      />
      <ProfileCard user={user} />
    </>
  );
}
