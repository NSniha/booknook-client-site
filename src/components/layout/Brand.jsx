import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Brand() {
  return (
    <Link
      href="/"
      aria-label="BookNook home"
      className="inline-flex shrink-0 items-center gap-2 text-accent sm:gap-2.5"
    >
      <span className="grid size-7 place-items-center sm:size-8 rounded-t-xl rounded-b-sm bg-accent text-background">
        <BookOpen size={20} strokeWidth={1.5} />
      </span>
      <span className="brand-name font-display text-[20px] min-[370px]:text-[24px] sm:text-[27px] font-medium tracking-[-0.04em]">
        BookNook<span className="text-gold">.</span>
      </span>
    </Link>
  );
}
