"use client";
import { useId } from "react";
import { Check, SlidersHorizontal } from "lucide-react";
import { CATEGORIES } from "@/lib/validation";

export default function CatalogFilters({
  category,
  available,
  counts,
  update,
  onReset,
}) {
  const groupId = useId();
  return (
    <div className="space-y-5">
      <div className="panel p-5">
        <h2 className="mb-5 flex items-center justify-between text-lg font-semibold">
          Your kind of story
          <SlidersHorizontal size={15} strokeWidth={1.4} />
        </h2>
        <div className="space-y-4" role="radiogroup" aria-label="Book categories">
          {["", ...CATEGORIES].map((name) => (
            <label
              key={name}
              className="flex cursor-pointer items-center gap-2.5 text-base"
            >
              <input
                type="radio"
                name={`book-category-${groupId}`}
                value={name}
                checked={category === name}
                onChange={() => update("category", name)}
                className="category-radio"
              />
              <span
                className={
                  category === name
                    ? "font-medium text-accent"
                    : "text-muted-foreground"
                }
              >
                {name || "All books"}
              </span>
              <span className="ml-auto text-base text-muted-foreground">
                {name
                  ? (counts?.[name] ?? "–")
                  : counts
                    ? Object.values(counts).reduce((sum, n) => sum + n, 0)
                    : "–"}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="panel p-5">
        <h2 className="mb-4 text-lg font-semibold">
          Ready for your next chapter?
        </h2>
        <label className="flex cursor-pointer items-start gap-2.5 text-base leading-5 text-muted-foreground">
          <input
            type="checkbox"
            checked={available}
            onChange={(e) =>
              update("available", e.target.checked ? "true" : "")
            }
            className="mt-1 size-3.5 accent-accent"
          />
          Only show available books
        </label>
      </div>
      <button className="text-link text-base" onClick={onReset}>
        Reset all filters
      </button>
      <div className="rounded-lg bg-muted p-5">
        <span className="mb-4 grid size-9 place-items-center rounded-full bg-background text-accent">
          <Check size={16} />
        </span>
        <h3 className="font-display text-[26px] font-semibold">A week of possibility.</h3>
        <p className="mt-3 text-base leading-6 text-muted-foreground">
          Every borrow gives you seven days to settle into a new story. Return
          it early whenever you’re ready.
        </p>
      </div>
    </div>
  );
}
