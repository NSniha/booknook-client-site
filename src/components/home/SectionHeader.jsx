import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

export default function SectionHeader({
  title,
  href = "/books",
  action = "Discover all",
  centered = false,
  titleClassName = "",
  children,
}) {
  return (
    <Reveal
      className={`shelf-heading ${centered ? "justify-center text-center" : ""}`}
    >
      <div>
        <h2 className={`section-title ${titleClassName}`}>{title}</h2>
        {children && (
          <p className="mt-3 max-w-xl text-base leading-6 text-muted-foreground">
            {children}
          </p>
        )}
      </div>
      {!centered && (
        <Link href={href} className="shelf-link">
          {action}
          <ChevronRight size={12} />
        </Link>
      )}
    </Reveal>
  );
}
