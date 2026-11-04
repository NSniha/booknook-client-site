import { BookOpen, Coffee, Sun, HeartHandshake } from "lucide-react";
import { readingRituals } from "@/data/home";
import Reveal from "@/components/shared/Reveal";
import SectionHeader from "./SectionHeader";

const icons = [Sun, Coffee, BookOpen, HeartHandshake];
export default function ReadingRituals() {
  return (
    <section className="section-space bg-muted">
      <div className="container">
        <SectionHeader
          title="Make a little time for reading"
          href="/#how-it-works"
          action="Start here"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {readingRituals.map((ritual, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={ritual.title} delay={i * 0.05}>
                <article className="flex h-full flex-col rounded-sm bg-surface p-6 lg:p-7">
                  <div className="mb-6 flex items-center justify-between">
                    <Icon size={24} strokeWidth={1.2} className="text-accent" />
                    <span className="font-display text-lg text-gold">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mb-3 text-lg font-semibold lg:text-xl">
                    {ritual.title}
                  </h3>
                  <p className="text-base leading-6 text-muted-foreground">
                    {ritual.text}
                  </p>
                  <p className="mt-auto pt-6 text-base uppercase tracking-wider text-accent">
                    {ritual.label}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
