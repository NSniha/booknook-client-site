"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowUpRight,
  ImagePlus,
  LoaderCircle,
  Upload,
  Link as LinkIcon,
  BookOpen,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { apiRequest, uploadCover } from "@/lib/api";
import { CATEGORIES, validateImageFile } from "@/lib/validation";
import BookImage from "./BookImage";
import Select from "@/components/shared/Select";

export default function BookForm({ user, book }) {
  const router = useRouter();
  const fileInput = useRef(null);
  const [form, setForm] = useState({
    title: book?.title || "",
    author: book?.author || "",
    category: book?.category || "Fiction",
    description: book?.description || "",
    totalCopies: book?.totalCopies || 1,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(book?.image || "");
  const [hostedUrl, setHostedUrl] = useState("");
  const [uploaded, setUploaded] = useState("");
  const [mode, setMode] = useState("upload");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const busy = Boolean(status);
  const activeCopies = book ? book.totalCopies - book.availableCopies : 0;
  useEffect(() => {
    if (!file) {
      setPreview(book?.image || "");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file, book?.image]);
  function chooseFile(event) {
    const nextFile = event.target.files?.[0];
    if (!nextFile) return;
    const invalid = validateImageFile(nextFile);
    if (invalid) {
      toast.error(invalid);
      event.target.value = "";
      return;
    }
    setFile(nextFile);
    setUploaded("");
    setError("");
  }
  function change(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }
  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const totalCopies = Number(form.totalCopies);
    let invalid = "";
    if (form.title.trim().length < 2 || form.title.trim().length > 160)
      invalid = "Book title must contain 2–160 characters.";
    else if (form.author.trim().length < 2 || form.author.trim().length > 100)
      invalid = "Author name must contain 2–100 characters.";
    else if (
      form.description.trim().length < 20 ||
      form.description.trim().length > 3000
    )
      invalid = "Description must contain 20–3000 characters.";
    else if (
      !Number.isInteger(totalCopies) ||
      totalCopies < Math.max(1, activeCopies) ||
      totalCopies > 9999
    )
      invalid = `Enter a whole number of copies between ${Math.max(1, activeCopies)} and 9999.`;
    else if (mode === "upload" && !file && !book?.image)
      invalid = "Upload a book cover before saving.";
    else if (mode === "url") {
      try {
        const url = new URL(hostedUrl.trim());
        if (
          url.protocol !== "https:" ||
          !["i.ibb.co", "i.postimg.cc"].includes(url.hostname)
        )
          throw new Error();
      } catch {
        invalid = "Use a direct HTTPS image URL from i.ibb.co or i.postimg.cc.";
      }
    }
    if (invalid) {
      setError(invalid);
      toast.error(invalid);
      return;
    }
    setError("");
    try {
      let image = mode === "url" ? hostedUrl.trim() : uploaded || book?.image;
      if (mode === "upload" && file && !uploaded) {
        setStatus("Uploading cover…");
        image = await uploadCover(file);
        setUploaded(image);
      }
      setStatus(book ? "Saving changes…" : "Adding your book…");
      const result = await apiRequest(book ? `/books/${book._id}` : "/books", {
        method: book ? "PATCH" : "POST",
        authenticated: true,
        body: {
          ...form,
          title: form.title.trim(),
          author: form.author.trim(),
          description: form.description.trim(),
          totalCopies,
          image,
        },
      });
      toast.success(result.message);
      router.push("/my-books");
      router.refresh();
    } catch (err) {
      setError(err.message);
      if (err.status !== 401) toast.error(err.message);
    } finally {
      setStatus("");
    }
  }
  return (
    <div className="container grid gap-8 pb-18 lg:grid-cols-[minmax(0,1fr)_300px]">
      <form onSubmit={submit} noValidate className="panel space-y-7 p-6 md:p-9">
        <div className="border-b pb-6">
          <h2 className="font-display text-panel">
            {book ? "A little fine-tuning." : "Tell us about your book."}
          </h2>
          <p className="mt-2 text-base leading-6 text-muted-foreground">
            A few thoughtful details help the right reader find it.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="title" className="field-label">
              Book title
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={change}
              required
              maxLength={160}
              className="field"
              placeholder="The title on the cover"
            />
          </div>
          <div>
            <label htmlFor="author" className="field-label">
              Author name
            </label>
            <input
              id="author"
              name="author"
              value={form.author}
              onChange={change}
              required
              maxLength={100}
              className="field"
              placeholder="Who wrote it?"
            />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="field-label">
              Category
            </label>
            <Select
              id="category"
              name="category"
              value={form.category}
              onChange={(value) => setForm((current) => ({ ...current, category: value }))}
              options={CATEGORIES.map((value) => ({ value, label: value }))}
              ariaLabel="Book category"
            />
          </div>
          <div>
            <label htmlFor="totalCopies" className="field-label">
              Total copies
            </label>
            <input
              id="totalCopies"
              type="number"
              name="totalCopies"
              value={form.totalCopies}
              onChange={change}
              required
              min={Math.max(1, activeCopies)}
              max={9999}
              step={1}
              className="field"
            />
            {activeCopies > 0 && (
              <p className="mt-2 text-base text-muted-foreground">
                {activeCopies} copies are currently with readers.
              </p>
            )}
          </div>
        </div>
        <fieldset>
          <legend className="field-label">Book cover</legend>
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMode("upload")}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-base ${mode === "upload" ? "border-accent bg-accent-soft text-accent" : ""}`}
            >
              <Upload size={13} />
              Upload cover
            </button>
            <button
              type="button"
              onClick={() => setMode("url")}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-base ${mode === "url" ? "border-accent bg-accent-soft text-accent" : ""}`}
            >
              <LinkIcon size={13} />
              Use hosted image
            </button>
          </div>
          {mode === "upload" ? (
            <>
              <input
                ref={fileInput}
                type="file"
                id="cover"
                accept="image/jpeg,image/png,image/webp"
                onChange={chooseFile}
                className="sr-only"
              />
              <label
                htmlFor="cover"
                className="flex cursor-pointer flex-col items-center rounded-lg border border-dashed border-accent/30 bg-muted/50 px-5 py-7 text-center transition hover:border-accent hover:bg-accent-soft"
              >
                <ImagePlus
                  size={25}
                  strokeWidth={1.3}
                  className="mb-3 text-accent"
                />
                <span className="max-w-full truncate text-base font-medium">
                  {file
                    ? file.name
                    : book
                      ? "Choose a replacement cover"
                      : "Choose a cover image"}
                </span>
                <span className="mt-2 text-base text-muted-foreground">
                  JPG, PNG or WebP · up to 5 MB · uploaded to imgbb
                </span>
              </label>
            </>
          ) : (
            <div>
              <input
                aria-label="Hosted book image URL"
                type="url"
                value={hostedUrl}
                onChange={(e) => setHostedUrl(e.target.value)}
                placeholder="https://i.postimg.cc/…/your-cover.jpg"
                className="field"
              />
              <p className="mt-3 text-base leading-6 text-muted-foreground">
                Use a direct image link from imgbb or{" "}
                <a
                  href="https://postimages.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent underline underline-offset-4"
                >
                  upload at Postimages
                </a>
                .
              </p>
            </div>
          )}
        </fieldset>
        <div>
          <label htmlFor="description" className="field-label">
            Short description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            required
            maxLength={3000}
            value={form.description}
            onChange={change}
            className="field resize-y"
            placeholder="Give the next reader a reason to turn the first page…"
          />
          <p className="mt-2 text-right text-base text-muted-foreground">
            {form.description.length}/3000 · at least 20 characters
          </p>
        </div>
        <fieldset className="rounded-lg bg-muted/60 p-5">
          <legend className="px-1 text-base font-medium">Shared by you</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="ownerName" className="field-label text-base">
                Your name
              </label>
              <input
                id="ownerName"
                readOnly
                value={user.name}
                className="field bg-muted text-muted-foreground"
              />
            </div>
            <div>
              <label htmlFor="ownerEmail" className="field-label text-base">
                Email address
              </label>
              <input
                id="ownerEmail"
                readOnly
                value={user.email}
                className="field bg-muted text-muted-foreground"
              />
            </div>
          </div>
        </fieldset>
        {error && (
          <p
            role="alert"
            className="rounded-lg bg-accent-soft p-4 text-base leading-6 text-accent"
          >
            {error}
          </p>
        )}
        <div className="flex flex-wrap justify-end gap-3 border-t pt-6">
          <Link
            href="/my-books"
            className={`btn-secondary ${busy ? "pointer-events-none opacity-50" : ""}`}
          >
            Cancel
          </Link>
          <button disabled={busy} className="btn-primary min-w-40">
            {busy ? (
              <>
                <LoaderCircle size={16} className="animate-spin" />
                {status}
              </>
            ) : (
              <>
                {book ? "Save Changes" : "Add Book"}
                <ArrowUpRight size={16} />
              </>
            )}
          </button>
        </div>
      </form>
      <aside className="space-y-5">
        <div className="panel p-6">
          <p className="eyebrow mb-5">A first impression</p>
          <div className="relative mx-auto aspect-[2/3] max-w-44 overflow-hidden rounded-md bg-muted book-cover">
            <BookImage
              key={mode === "url" ? hostedUrl : preview}
              src={
                mode === "url" &&
                /^https:\/\/(i\.ibb\.co|i\.postimg\.cc)\//.test(hostedUrl)
                  ? hostedUrl
                  : preview
              }
              title={form.title || "Your next shared book"}
            />
          </div>
          <p className="mt-5 text-center font-display text-panel">
            {form.title || "Your book belongs here."}
          </p>
          <p className="mt-2 text-center text-base text-muted-foreground">
            {form.author || "A story worth passing on"}
          </p>
        </div>
        <div className="rounded-xl bg-muted p-6">
          <BookOpen size={24} strokeWidth={1.3} className="mb-4 text-accent" />
          <h3 className="font-display text-panel">
            A little care goes a long way.
          </h3>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Choose a clear cover, check the author’s name and share an honest
            description. The next reader will thank you.
          </p>
        </div>
        <p className="flex gap-2 px-1 text-base leading-5 text-muted-foreground">
          <Info size={15} className="mt-1 shrink-0" />
          Your name is shown with your book. Your email stays private.
        </p>
      </aside>
    </div>
  );
}
