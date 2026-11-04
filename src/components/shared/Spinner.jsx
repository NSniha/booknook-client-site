import { LoaderCircle } from "lucide-react";

export default function Spinner({
  label = "Finding your next read…",
  compact = false,
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center justify-center gap-3 text-base text-muted-foreground ${compact ? "py-3" : "min-h-60 py-14"}`}
    >
      <LoaderCircle size={20} className="animate-spin text-accent" />
      <span>{label}</span>
    </div>
  );
}
