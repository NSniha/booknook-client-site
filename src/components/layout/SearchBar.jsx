"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { CATEGORIES } from "@/lib/validation";
import Select from "@/components/shared/Select";

export default function SearchBar({ onSearch, compact = false }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  function submit(event) {
    event.preventDefault();
    const query = new URLSearchParams();
    if (search.trim()) query.set("search", search.trim());
    if (category) query.set("category", category);
    router.push(`/books${query.size ? `?${query}` : ""}`);
    onSearch?.();
  }
  return (
    <form
      onSubmit={submit}
      role="search"
      className={`flex min-w-0 items-center rounded-full bg-muted p-1 ${compact ? "w-full" : "max-w-xl flex-1"}`}
    >
      {!compact && (
        <Select
          ariaLabel="Search category"
          value={category}
          onChange={setCategory}
          options={[{ value: "", label: "All categories" }, ...CATEGORIES.map((value) => ({ value, label: value }))]}
          className="ml-3 hidden w-44 shrink-0 border-r xl:block"
          buttonClassName="py-2 pl-1 pr-4 text-base"
          menuClassName="min-w-[220px]"
        />
      )}
      <input
        aria-label="Search books by title or author"
        type="search"
        maxLength={120}
        placeholder="Find your next favourite book…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full min-w-0 bg-transparent px-4 py-2.5 text-base outline-none placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        className="flex min-h-10 shrink-0 items-center gap-2 rounded-full bg-accent px-4 text-base font-medium text-background"
        aria-label="Search books"
      >
        <Search size={16} />
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
}
