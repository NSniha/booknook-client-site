import Link from "next/link";
import Image from "next/image";
import { featuredAuthors } from "@/data/authors";
import Reveal from "@/components/shared/Reveal";
import SectionHeader from "./SectionHeader";

export default function FeaturedAuthors() {
  return (
    <section className="section-space" id="featured-authors">
      <div className="container">
        <SectionHeader title="Meet the authors on our shelves" centered />
        <div className="grid grid-cols-4 gap-x-4 gap-y-7 lg:grid-cols-8 lg:gap-x-8">
          {featuredAuthors.map((author, i) => (
            <Reveal key={author.id} delay={i * 0.04}>
              <Link
                href={`/books?search=${encodeURIComponent(author.name)}`}
                className="group flex flex-col items-center text-center"
              >
                <span className="relative mb-4 block size-17 overflow-hidden rounded-full bg-muted ring-4 ring-transparent transition duration-300 group-hover:ring-accent-soft sm:size-21 lg:size-24">
                  {author.image ? (
                    <Image
                      src={author.image}
                      alt={`Portrait of ${author.name}`}
                      fill
                      sizes="96px"
                      className="object-cover grayscale-[15%] transition duration-500 group-hover:scale-110 group-hover:grayscale-0"
                    />
                  ) : (
                    <span className="grid size-full place-items-center font-display text-2xl text-accent">
                      {author.name
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                  )}
                </span>
                <span className="text-base leading-5 text-foreground transition group-hover:text-accent">
                  {author.name}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
