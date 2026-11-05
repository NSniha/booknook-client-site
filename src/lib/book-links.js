const categorySlugs = {
  Fiction: "fiction",
  Science: "science",
  History: "history",
  Kids: "kids",
  Others: "others",
};

export function getCategoryPath(category) {
  const slug = categorySlugs[category];
  return slug ? `/books/${slug}` : "/books";
}

export function getCategoryFromSlug(slug) {
  return (
    Object.entries(categorySlugs).find(
      ([, value]) => value === slug,
    )?.[0] || null
  );
}

export function getBookPath(book) {
  if (book.slug) {
    return `/book/${encodeURIComponent(book.slug)}`;
  }

  return `/books/${book._id}`;
}