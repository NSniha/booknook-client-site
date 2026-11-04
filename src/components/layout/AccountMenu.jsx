"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, UserRound } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import Avatar from "@/components/shared/Avatar";

export default function AccountMenu({ user }) {
  const ref = useRef(null);
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const close = (event) => {
      if (!ref.current?.contains(event.target) || event.key === "Escape")
        ref.current?.removeAttribute("open");
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, []);
  async function logout() {
    setBusy(true);
    try {
      const { error } = await authClient.signOut();
      if (error) throw new Error(error.message);
      ref.current?.removeAttribute("open");
      toast.success("You have logged out. See you in the next chapter.");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error.message || "We could not log you out. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <details ref={ref} className="relative">
      <summary
        className="list-none cursor-pointer rounded-full [&::-webkit-details-marker]:hidden"
        aria-label="Open your account menu"
      >
        <Avatar key={user.image} user={user} />
      </summary>
      <div className="panel absolute right-0 top-13 z-50 w-64 p-2 shadow-xl">
        <div className="border-b px-3 py-3">
          <p className="truncate text-base font-semibold">{user.name}</p>
          <p className="mt-1 truncate text-base text-muted-foreground">
            {user.email}
          </p>
        </div>
        <Link
          href="/profile"
          onClick={() => ref.current?.removeAttribute("open")}
          className="mt-1 flex items-center gap-2 rounded-lg px-3 py-3 text-base hover:bg-muted"
        >
          <UserRound size={16} />
          My Profile
        </Link>
        <button
          disabled={busy}
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-base text-accent hover:bg-accent-soft"
        >
          <LogOut size={16} />
          {busy ? "Logging out…" : "Logout"}
        </button>
      </div>
    </details>
  );
}
