"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { readingJournal } from "@/data/home";
import SectionHeader from "./SectionHeader";
import Modal from "@/components/shared/Modal";
import Reveal from "@/components/shared/Reveal";

export default function ReadingJournal() {
  const [selected, setSelected] = useState(null);
  return (
    <section className="section-space" id="reading-journal">
      <div className="container">
        <SectionHeader
          title="From the reading room"
          titleClassName="journal-section-title"
          href="/#reading-journal"
          action="Reading notes"
        />
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {readingJournal.map((article, i) => (
            <Reveal key={article.id} delay={i * 0.06}>
              <article className="group">
                <button
                  type="button"
                  onClick={() => setSelected(article)}
                  className="relative mb-4 block aspect-[1.9/1] w-full overflow-hidden rounded-md bg-muted text-left"
                  aria-label={`Read ${article.title}`}
                >
                  <Image
                    src={article.image}
                    alt={article.excerpt}
                    fill
                    sizes="(max-width: 768px) 95vw, 440px"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </button>
                <p className="mb-2 flex items-center gap-2 text-[14.2px] uppercase tracking-wider text-accent">
                  <BookOpen size={16} />
                  {article.category}
                  <span className="ml-1 text-muted-foreground">
                    •{" "}
                    {Math.max(
                      1,
                      Math.ceil(
                        article.paragraphs.join(" ").split(/\s+/).length / 200,
                      ),
                    )}{" "}
                    min read
                  </span>
                </p>
                <h3 className="journal-card-title font-display font-semibold lg:text-[22px]! text-[18px]!">
                  <button
                    type="button"
                    onClick={() => setSelected(article)}
                    className="text-left hover:text-accent"
                  >
                    {article.title}
                  </button>
                </h3>
                <button
                  onClick={() => setSelected(article)}
                  className="mt-3 inline-flex items-center gap-2 text-base text-muted-foreground hover:text-accent"
                >
                  Read the story
                  <ArrowUpRight size={12} />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
        <Modal
          open={Boolean(selected)}
          onClose={() => setSelected(null)}
          title={selected?.title || "Reading notes"}
        >
          {selected && (
            <>
              <p className="eyebrow mb-5">{selected.category}</p>
              <div className="relative mb-6 aspect-[1.8/1] overflow-hidden rounded-md">
                <Image
                  src={selected.image}
                  alt={selected.excerpt}
                  fill
                  sizes="460px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 text-base leading-7 text-muted-foreground">
                {selected.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </>
          )}
        </Modal>
      </div>
    </section>
  );
}
