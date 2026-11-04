import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import BookImage from "@/components/books/BookImage";

const spotlights = [
  {
    category: "Science",
    label: "Feed your curiosity",
    title: "A LITTLE WONDER GOES A LONG WAY",
    book: "cosmos",
    colour: "bg-[#2b4154]",
  },
  {
    category: "History",
    label: "Meet the world before us",
    title: "THE PAST HAS A STORY TO TELL",
    book: "the-silk-roads",
    colour: "bg-[#6b3d4c]",
  },
  {
    category: "Kids",
    label: "Make reading time together",
    title: "SMALL PAGES. BIG ADVENTURES.",
    book: "the-wild-robot",
    colour: "bg-[#3e654c]",
  },
];
export default function StorySpotlights() {
  return (
    <section
      className="container pb-16 md:pb-24"
      aria-label="Find your next reading mood"
    >
      <div className="grid gap-4 md:grid-cols-3 md:gap-6">
        {spotlights.map((spotlight, i) => (
          <Reveal key={spotlight.category} delay={i * 0.06}>
            <div
              className={`relative flex h-full min-h-[225px] items-start overflow-hidden rounded-md px-5 py-7 text-white ${spotlight.colour}`}
            >
              <div className="hero-book absolute -bottom-10 -left-10 h-[225px] w-[145px] -rotate-12 overflow-hidden rounded-sm opacity-60">
                <BookImage
                  src={`/images/books/${spotlight.book}.webp`}
                  title={spotlight.book.replaceAll("-", " ")}
                  sizes="145px"
                />
              </div>
              <div className="relative z-10 ml-[24%] flex h-full flex-col">
                <p className="mb-3 text-base text-white/70">
                  {spotlight.label}
                </p>
                <h2 className="mb-5 max-w-[220px] font-display text-[28px] leading-[1.12] font-semibold lg:text-[32px]">
                  {spotlight.title}
                </h2>
                <Link
                  href={`/books?category=${spotlight.category}`}
                  className="mt-auto inline-flex min-h-8 w-fit items-center gap-3 rounded-full bg-white px-4 py-2 text-base text-[#193424] transition hover:-translate-y-0.5"
                >
                  Browse {spotlight.category}
                  <ChevronRight size={11} />
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
