import { BookOpen, Sparkles } from "lucide-react";
import BookImage from "@/components/books/BookImage";
import PageHeading from "@/components/shared/PageHeading";

export default function AuthShell({ children, register = false }) {
  return (
    <>
      <PageHeading title={register ? "Join BookNook" : "Login"} eyebrow="Your next chapter starts here" description={register ? "Make room for great stories and a little more curiosity." : "Pick up where your last chapter ended."} />
    <section className="container pb-10 md:pb-14">
      <div className="grid overflow-hidden rounded-xl border bg-surface lg:min-h-[670px] lg:grid-cols-[.95fr_1fr]">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#073f2a] p-12 text-[#f4f7e9] lg:flex">
          <div>
            <p className="mb-7 flex items-center gap-2 text-base uppercase tracking-[.2em] text-[#d9bc82]">
              <BookOpen size={15} />
              Make yourself at home
            </p>
            <h2 className="font-display text-feature tracking-tight">
              {register ? (
                <>
                  A new reader.
                  <br />A new{" "}
                  <span className="italic text-[#d2e4bc]">beginning.</span>
                </>
              ) : (
                <>
                  Welcome back
                  <br />
                  to your{" "}
                  <span className="italic text-[#d2e4bc]">happy place.</span>
                </>
              )}
            </h2>
            <p className="mt-6 max-w-xs text-base leading-7 text-[#ccdfd2]">
              {register
                ? "Bring your curiosity. We’ll make room on the shelves. A community of shared stories starts with you."
                : "Your next favourite story is waiting. Pick up where you left off, or turn to something new."}
            </p>
          </div>
          <div className="relative mx-auto mt-12 flex w-[90%] items-end justify-center pb-5">
            <div className="absolute -bottom-12 size-72 rounded-full border border-[#d9bc82]/25" />
            {[
              "the-midnight-library",
              "the-wedding-people",
              "project-hail-mary",
            ].map((slug, index) => (
              <div
                key={slug}
                className={`hero-book relative aspect-[2/3] w-1/3 overflow-hidden rounded-sm ${index === 0 ? "-mr-3 -rotate-12" : index === 1 ? "z-10 -translate-y-4 rotate-2" : "-ml-3 rotate-12"}`}
              >
                <BookImage
                  src={`/images/books/${slug}.webp`}
                  title={slug.replaceAll("-", " ")}
                />
              </div>
            ))}
          </div>
          <p className="relative mt-10 flex items-center gap-2 text-base tracking-wide text-[#d9bc82]">
            <Sparkles size={13} />
            Good books. Better company.
          </p>
        </div>
        <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </section>
    </>
  );
}
