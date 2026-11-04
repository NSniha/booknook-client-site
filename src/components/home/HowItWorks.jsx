import { BookPlus, BookOpenCheck, RefreshCcw, ShieldCheck } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

const steps = [
  {
    title: "SHARE A GOOD BOOK",
    text: "Add your favourite to our shelves",
    icon: BookPlus,
  },
  {
    title: "SEVEN DAYS TO READ",
    text: "Make a little time for the next chapter",
    icon: BookOpenCheck,
  },
  {
    title: "RETURN & REPEAT",
    text: "Pass the story on when you’re ready",
    icon: RefreshCcw,
  },
  {
    title: "YOUR READING CORNER",
    text: "Keep your books and dates together",
    icon: ShieldCheck,
  },
];
export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-label="How borrowing works"
      className="border-y py-12 md:py-16"
    >
      <div className="container grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
        {steps.map(({ title, text, icon: Icon }, i) => (
          <Reveal key={title} delay={i * 0.05} className="text-center">
            <Icon
              size={30}
              strokeWidth={1.05}
              className="mx-auto mb-4 text-foreground/80"
            />
            <h2 className="how-step-title font-semibold">{title}</h2>
            <p className="mt-2 text-base text-muted-foreground">{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
