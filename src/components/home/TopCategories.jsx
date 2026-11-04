import Link from "next/link";
import { Atom, Castle, Feather, Rocket, Shapes } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import SectionHeader from "./SectionHeader";

const categories = [
  { name: "Fiction", label: "A world beyond your own", icon: Feather },
  { name: "Science", label: "Make room for wonder", icon: Atom },
  { name: "History", label: "A different point in time", icon: Castle },
  { name: "Kids", label: "Let imagination lead", icon: Rocket },
  { name: "Others", label: "Follow a new direction", icon: Shapes },
];
export default function TopCategories() {
  return (
    <section className="section-space bg-muted">
      <div className="container">
        <SectionHeader title="Top categories" action="Browse all" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {categories.map(({ name, label, icon: Icon }, i) => (
            <Reveal key={name} delay={i * 0.04}>
              <Link
                href={`/books?category=${name}`}
                className="group flex h-full min-h-40 flex-col items-center justify-center rounded-sm border bg-background/30 px-4 py-6 text-center transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-background"
              >
                <span className="relative mb-4">
                  <span className="absolute right-0 top-0 size-7 rounded-full bg-gold/15" />
                  <Icon
                    size={38}
                    strokeWidth={1}
                    className="relative text-foreground/75"
                  />
                </span>
                <h3 className="font-display text-[26px] font-semibold lg:text-[28px]">{name}</h3>
                <p className="mt-2 text-base text-muted-foreground">
                  {label}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
