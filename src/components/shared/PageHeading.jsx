import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PageHeading({
  title,
  description,
  eyebrow = "Your little corner of the reading world",
  children,
  centered = true,
}) {
  return (
    <section className="page-heading relative isolate mb-10 overflow-hidden border-b">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-52 size-[440px] rounded-full border-[45px] border-white/[0.07]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-72 -right-28 size-[480px] rotate-12 rounded-[42%] border-[50px] border-white/[0.07]" />
      <div className="container relative py-10 md:py-14">
      <nav
        aria-label="Breadcrumb"
        className={`mb-5 flex flex-wrap items-center gap-2 text-[14px] text-white/70 ${centered ? "justify-center" : ""}`}
      >
        <Link href="/" className="transition hover:text-white">
          Home
        </Link>
        <ChevronRight size={12} />
        <span aria-current="page">{title}</span>
      </nav>
      <div
        className={centered ? "flex flex-col items-center gap-6 text-center" : "flex flex-wrap items-end justify-between gap-6"}
      >
        <div>
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="text-balance font-display text-page tracking-[-0.035em]">{title}</h1>
          {description && (
            <p
              className={`mt-4 max-w-2xl text-base leading-7 text-white/80 ${centered ? "mx-auto" : ""}`}
            >
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
      </div>
    </section>
  );
}
