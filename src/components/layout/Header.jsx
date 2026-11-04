"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, ArrowUpRight, Bookmark } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Brand from "./Brand";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import AccountMenu from "./AccountMenu";
import Modal from "@/components/shared/Modal";

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Reading Room", href: "/#reading-journal" },
];
const privateLinks = [
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
];

export default function Header() {
  const { data: session, isPending } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const links = session ? [...publicLinks, ...privateLinks] : publicLinks;
  useEffect(() => setMenuOpen(false), [pathname]);
  const active = (href) =>
    pathname === href || (href === "/books" && pathname.startsWith("/books/"));
  return (
    <>
      <div className="bg-[#073f2a] text-[#f7fbf4]">
        <div className="container flex min-h-8 items-center justify-center gap-2 text-xs tracking-wide sm:justify-between sm:text-[14px]">
          <span className="flex items-center gap-2">
            <BookOpen size={13} />A little library. Endless possibilities.
          </span>
          <span className="hidden items-center gap-2 sm:flex">
            Borrow a book. Keep a story.
            <span className="text-[#d9bc82]">7 days, all yours.</span>
          </span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-3 sm:gap-7 md:h-22">
          <Brand />
          <div className="hidden min-w-0 flex-1 justify-center lg:flex">
            <SearchBar />
          </div>
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            {isPending ? (
              <span
                className="hidden h-10 w-24 animate-pulse rounded-full bg-muted sm:block"
                aria-label="Loading account"
              />
            ) : session ? (
              <AccountMenu user={session.user} />
            ) : (
              <div className="hidden items-center gap-4 sm:flex">
                <Link href="/login" className="text-[15px] hover:text-accent">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn-primary min-h-10 px-5 py-2 text-[15px]"
                >
                  Join the library
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            )}
            <button
              className="icon-button lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={19} />
            </button>
          </div>
        </div>
        <div className="hidden border-t lg:block">
          <nav
            aria-label="Main navigation"
            className="container flex h-12 items-center justify-between"
          >
            <div className="flex h-full items-center gap-5 xl:gap-7">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active(link.href) ? "page" : undefined}
                  className={`relative flex h-full items-center text-[15px] transition hover:text-accent ${active(link.href) ? "font-semibold text-accent after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-accent" : "text-foreground"}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href="/books?available=true"
              className="hidden items-center gap-2 text-[15px] text-muted-foreground hover:text-accent 2xl:flex"
            >
              <Bookmark size={14} strokeWidth={1.5} />
              Find something to read today
              <ArrowUpRight size={13} />
            </Link>
          </nav>
        </div>
      </header>
      <Modal
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="Explore BookNook"
      >
        <SearchBar compact onSearch={() => setMenuOpen(false)} />
        <div className="mt-5 flex items-center justify-between border-b pb-5 sm:hidden">
          <span className="text-base">Reading theme</span>
          <ThemeToggle />
        </div>
        <nav aria-label="Mobile navigation" className="mt-6 grid gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-3 py-3 text-[15px] ${active(link.href) ? "bg-accent-soft text-accent" : "hover:bg-muted"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {!session && !isPending && (
          <div className="mt-6 flex gap-3 border-t pt-5">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="btn-secondary flex-1 text-[15px]"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="btn-primary flex-1 text-[15px]"
            >
              Register
            </Link>
          </div>
        )}
      </Modal>
    </>
  );
}
