export const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

export function passwordError(password) {
  if (password.length < 6) return "Use at least 6 characters.";
  if (password.length > 128) return "Use no more than 128 characters.";
  if (!/[A-Z]/.test(password)) return "Add at least one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Add at least one lowercase letter.";
  return "";
}

export function safeCallback(value, fallback = "/") {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    /[\\\r\n]/.test(value)
  )
    return fallback;
  try {
    const url = new URL(value, "https://booknook.local");
    if (
      url.origin !== "https://booknook.local" ||
      ["/login", "/register"].includes(url.pathname)
    )
      return fallback;
    return url.pathname + url.search + url.hash;
  } catch {
    return fallback;
  }
}

export function validateImageFile(file) {
  if (!file) return "Choose a book cover to upload.";
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    return "Use a JPG, PNG or WebP image.";
  if (file.size > 5 * 1024 * 1024) return "Keep the cover smaller than 5 MB.";
  return "";
}

export function formatDate(value) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}
