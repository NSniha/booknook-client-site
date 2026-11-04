import Link from "next/link";
import { BookOpen, ArrowUpRight } from "lucide-react";

export default function EmptyState({
  title = "A new chapter starts here",
  description,
  href,
  action,
  onRetry,
}) {
  return (
    <div className="panel flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
      <span className="mb-5 grid size-14 place-items-center rounded-full bg-muted text-accent">
        <BookOpen size={25} strokeWidth={1.4} />
      </span>
      <h2 className="font-display text-panel">{title}</h2>
      <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground">
        {description}
      </p>
      {href && (
        <Link href={href} className="btn-primary mt-6">
          {action}
          <ArrowUpRight size={16} />
        </Link>
      )}
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary mt-6">
          Try again
        </button>
      )}
    </div>
  );
}
