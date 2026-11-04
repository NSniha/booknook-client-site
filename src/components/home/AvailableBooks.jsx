import BookShelf from "./BookShelf";
export default function AvailableBooks() {
  return (
    <BookShelf
      title="Ready for your next chapter"
      available
      offset={6}
      href="/books?available=true"
    />
  );
}
