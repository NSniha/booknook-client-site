import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import BookImage from "@/components/books/BookImage";

const covers = [
  "erasure",
  "james",
  "the-wedding-people",
  "the-midnight-library",
  "project-hail-mary",
  "the-seven-husbands-of-evelyn-hugo",
];
export default function FeaturedCollection() {
  return (
    <section className="container" aria-labelledby="featured-collection-title">
      <Reveal>
        <div className="relative grid min-h-[330px] overflow-hidden rounded-md bg-[#006b38] md:grid-cols-[3fr_2fr] lg:min-h-[360px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_50%,#085f29,transparent_70%)]" />
          <div className="relative z-10 min-w-0 px-7 py-12 text-white md:px-10 md:py-14 lg:px-12">
            <p className="mb-4 text-base text-[#e4c77f]">
              The fiction collection
            </p>
            <h2
              id="featured-collection-title"
              className="max-w-[640px] text-balance font-display text-feature font-semibold tracking-[-0.035em]"
            >
              Your next adventure is a page away.
            </h2>
            <p className="mb-6 mt-4 max-w-[520px] text-base leading-7 text-white/80">
              For the evenings when you want to get wonderfully lost in a story.
            </p>
            <Link
              href="/books?category=Fiction"
              className="inline-flex min-h-10 items-center gap-4 rounded-full bg-white px-5 py-2.5 text-base text-[#123c3d] transition hover:-translate-y-0.5"
            >
              Explore Fiction
              <ChevronRight size={12} />
            </Link>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[56%] overflow-hidden opacity-20 sm:block md:opacity-100">
            <div className="absolute -right-20 -top-40 w-[560px] lg:w-[700px]">
              <div className="feature-books">
                {covers.map((slug) => (
                  <div
                    key={slug}
                    className="hero-book relative aspect-[2/3] overflow-hidden rounded-sm"
                  >
                    <BookImage
                      src={`/images/books/${slug}.webp`}
                      title={slug.replaceAll("-", " ")}
                      sizes="210px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
