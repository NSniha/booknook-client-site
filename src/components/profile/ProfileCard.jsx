import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  CalendarDays,
  BookOpen,
  BookPlus,
  ShieldCheck,
} from "lucide-react";
import Avatar from "@/components/shared/Avatar";
import { formatDate } from "@/lib/validation";

export default function ProfileCard({ user }) {
  return (
    <div className="container grid gap-7 pb-18 lg:grid-cols-[1.1fr_1fr]">
      <section className="panel p-7 md:p-10">
        <div className="flex flex-wrap items-center gap-5">
          <Avatar user={user} large />
          <div>
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-base text-success">
              <ShieldCheck size={12} />
              BookNook member
            </span>
            <h2 className="font-display text-panel">{user.name}</h2>
          </div>
        </div>
        <dl className="mt-9 space-y-6 border-t pt-7">
          <div className="flex items-center gap-4">
            <Mail size={18} strokeWidth={1.3} className="text-accent" />
            <div>
              <dt className="text-base uppercase tracking-wider text-muted-foreground">
                Email address
              </dt>
              <dd className="mt-1 break-all text-base">{user.email}</dd>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <CalendarDays size={18} strokeWidth={1.3} className="text-accent" />
            <div>
              <dt className="text-base uppercase tracking-wider text-muted-foreground">
                Member since
              </dt>
              <dd className="mt-1 text-base">{formatDate(user.createdAt)}</dd>
            </div>
          </div>
        </dl>
      </section>
      <section className="space-y-5">
        {[
          [
            BookOpen,
            "Your reading corner",
            "Pick up your current reads and see when they’re due back.",
            "/my-borrows",
            "My Borrows",
          ],
          [
            BookPlus,
            "The books you’ve shared",
            "Look after your shelf, update a title or share another story.",
            "/my-books",
            "My Books",
          ],
        ].map(([Icon, title, description, href, label]) => (
          <div className="panel p-7" key={href}>
            <Icon size={25} strokeWidth={1.3} className="mb-4 text-accent" />
            <h2 className="font-display text-panel">{title}</h2>
            <p className="mb-4 mt-2 text-base leading-6 text-muted-foreground">
              {description}
            </p>
            <Link className="text-link text-base" href={href}>
              {label}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
